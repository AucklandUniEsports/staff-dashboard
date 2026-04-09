"use server";
import { redirect } from "next/navigation";
import { readFormData } from "./readFormData";
import { EventService } from "@/services/EventService";

export default async function createEvent(formData: FormData) {
    const {
        name,
        date,
        locationId,
        categories,
        description,
        link,
        thumbnailPath,
    } = await readFormData(formData);

    if (!date) throw new Error("Date is required");
    if (!thumbnailPath) throw new Error("Thumbnail is required");

    await EventService.createEvent({
            name: name,
            date: date,
            location: { connect: { id: locationId } },
            description: description,
            link: link,
            thumbnailPath: thumbnailPath,
            categories: {
                create: categories.map(categoryId => ({
                    categoryId
                }))
            }
        
    })
    redirect('/events');
}