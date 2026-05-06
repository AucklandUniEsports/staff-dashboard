"use server";
import { redirect } from "next/navigation";
import { readFormData } from "./readFormData";
import { EventService } from "@/services/EventService";
import { success } from "better-auth";
import { error } from "console";

type ActionState = { error: boolean; message: string } | null;
export default async function createEvent(prevState: ActionState | null, formData: FormData) {
    const {
        name,
        date,
        locationId,
        categories,
        description,
        link,
        thumbnailPath,
    } = await readFormData(formData);

    if (!date) return { error: true, message: "Date is required" };
    if (!thumbnailPath) return { error: true, message: "Thumbnail is required" };
    try {
        await EventService.createEvent({
            name: name,
            date: date,
            location: { connect: { id: locationId } },
            description: description,
            link: link,
            thumbnailPath: thumbnailPath,
            categories: {
                create: categories.map((categoryId) => ({
                    categoryId,
                })),
            },
        });
    } catch {
        return { error: true, message: "Failed to create event. Please try again." };
    }

    redirect('/events?success=Event created successfully!');
}