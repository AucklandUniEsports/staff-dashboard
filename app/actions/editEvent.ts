"use server";
import { redirect } from "next/navigation";
import { readFormData } from "./readFormData";
import { EventService } from "@/services/EventService";
type ActionState = { error: boolean; message: string } | null;

export default async function editEvent(eventId: number, prevState: ActionState | null, formData: FormData) {
        const {
            name,
            date,
            locationId,
            categories,
            description,
            link,
            thumbnailPath,
        } = await readFormData(formData);

    try {
     await EventService.updateEvent(eventId, {

            name: name || undefined,
            date: date || undefined,
            location: { connect: { id: locationId } },
            description: description || undefined,
            link: link || undefined,
            thumbnailPath: thumbnailPath || undefined,
            categories: {
                deleteMany: {},
                create: categories.map((categoryId) => ({
                    categoryId,
                })),
            
        },
    });       
    } catch {
        return { error: true, message: "Failed to edit event. Please try again." };
    }

    redirect(`/events/${eventId}?success=Event updated successfully!`);
}
