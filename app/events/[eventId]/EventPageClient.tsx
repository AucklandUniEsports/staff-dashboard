'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import StandardButton from "@/app/components/StandardButton";
import BackNav from "@/app/components/BackNav";
import { Location, Category, Prisma } from "@/app/generated/prisma/client";
import { usePathname } from "next/navigation";
import CreateEventClient from "../create-event/CreateEventClient";


type EventWithCategories = Prisma.EventGetPayload<{
    include: { categories: true }
}>;

interface EventPageClientProps {
  event: EventWithCategories;
  locations: Location[];
  categories: Category[];
}

export default function EventPageClient({ event, locations, categories }: EventPageClientProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [isEditing, setIsEditing] = useState(false);

    if (!event) return <p>Event not found!</p>;

    return (
        <section className="content-block">
            <BackNav />
            <img
                className="thumbnail"
                src={
                    "https://hizvklozfaxggijszcab.supabase.co/storage/v1/object/public/event_thumbnails/" +
                    event.thumbnailPath
                }
                alt=""
            />
            <p className="user-name">{event.name}</p>
            <div className="user-info">
                <p>Description: {event.description}</p>
                <p>Link: {event.link}</p>
            </div>
            <StandardButton
                title="Edit"
                type="button"
                color="lime"
                onClick={() => setIsEditing(true)}
            />
            {isEditing && (
                <div className="popup">
                    <div className="popup-content">
                        <div className="popup-header">             
                                   
                        <div className="page-heading-title">Edit Event</div>
                        
                            <StandardButton
                            title="X"
                            type="button"
                            color="lime"
                            onClick={() => setIsEditing(false)}
                        />
                        </div>

                        <CreateEventClient locations={locations} categories={categories} event={event} />
                    </div>
                </div>
            )}
        </section>
    );
}