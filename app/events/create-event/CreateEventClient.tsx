"use client";

import { useState } from "react";
import BackNav from "@/app/components/BackNav";
import StandardButton from "@/app/components/StandardButton";
import CategoryTag from "@/app/components/CategoryTag";
import createEvent from "@/app/actions/createEvent";
import { Location, Category, Prisma } from "@/app/generated/prisma/client";
import editEvent from "@/app/actions/editEvent";

type EventWithCategories = Prisma.EventGetPayload<{
    include: { categories: true };
}>;

interface CreateEventClientProps {
    locations: Location[];
    categories: Category[];
    event?: EventWithCategories;
}

export default function CreateEventClient({
    locations,
    categories,
    event,
}: CreateEventClientProps) {
    const [preview, setPreview] = useState<string | null>(
        event?.thumbnailPath
            ? `${process.env.NEXT_PUBLIC_SUPABASE_OBJECT_STORAGE_URL}${event.thumbnailPath}`
            : null,
    );
    const editOrCreateEvent = event
        ? editEvent.bind(null, event.id)
        : createEvent;
    return (
        <section className="content-block">
            {!event && <BackNav />}
            <form action={editOrCreateEvent}>
                <input
                    accept="image/*"
                    hidden
                    id="thumbnail-upload"
                    name="thumbnail"
                    type="file"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const url = URL.createObjectURL(file);
                        setPreview(url);
                    }}
                ></input>
                {preview && (
                    <img
                        alt="Preview of uploaded thumbnail."
                        className="thumbnail"
                        src={preview}
                    />
                )}
                <label
                    className="upload-image"
                    htmlFor="thumbnail-upload"
                    id="thumbnail-upload-proxy"
                >
                    {preview ? "Change Thumbnail" : "Upload a Thumbnail"}
                </label>
                <label className="input-label">Event Name</label>
                <input
                    className="input-field"
                    name="name"
                    type="text"
                    defaultValue={event?.name ?? ""}
                    placeholder="Rage Art Rumble 2025 Round 2"
                />
                <label className="input-label">Date & Time</label>
                <input
                    className="input-time"
                    type="datetime-local"
                    defaultValue={
                        event?.date
                            ? new Date(event.date).toISOString().slice(0, 16)
                            : ""
                    }
                    id="meeting-time"
                    name="date-time"
                />
                <label className="input-label">Location</label>
                <ul className="category-wrapper">
                    {locations.map((location, index) => (
                        <li key={index}>
                            <input
                                name="location"
                                className="selectable-input"
                                hidden
                                id={location.name}
                                required
                                type="radio"
                                value={location.id}
                                defaultChecked={
                                    event?.locationId === location.id
                                }
                            />
                            <CategoryTag
                                name={location.name}
                                htmlFor={location.name}
                            />
                        </li>
                    ))}
                </ul>
                <label className="input-label">Categories</label>
                <ul className="category-wrapper">
                    {categories.map((category, index) => (
                        <li key={index}>
                            <input
                                name="categories"
                                className="selectable-input"
                                hidden
                                id={category.name}
                                type="checkbox"
                                value={category.id}
                                defaultChecked={event?.categories?.some(
                                    (c) => c.categoryId === category.id,
                                )}
                            />
                            <CategoryTag
                                name={category.name}
                                htmlFor={category.name}
                            />
                        </li>
                    ))}
                </ul>
                <label className="input-label">Event Description</label>
                <input
                    name="description"
                    className="input-field"
                    type="text"
                    defaultValue={event?.description ?? ""}
                    placeholder="Really dope Tekken 8/Brawllhalla Tournament."
                />
                <label className="input-label">Signup Link</label>
                <input
                    name="link"
                    className="input-field"
                    type="text"
                    defaultValue={event?.link ?? ""}
                    placeholder="start.gg/RAR252"
                />
                <StandardButton
                    title={event ? "Update" : "Create Event"}
                    type="submit"
                    color="grey"
                />
            </form>
        </section>
    );
}
