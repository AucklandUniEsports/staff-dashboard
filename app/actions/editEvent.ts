"use server";
import { redirect } from "next/navigation";
import { readFormData } from "./readFormData";
import { EventService } from "@/services/EventService";

export default async function editEvent(eventId: number, formData: FormData) {
        const {
            name,
            date,
            locationId,
            categories,
            description,
            link,
            thumbnailPath,
        } = await readFormData(formData);

    
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
    redirect(`/events/${eventId}`);
}
