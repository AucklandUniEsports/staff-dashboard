"use server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { readFormData } from "./readFormData";

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

    
    await prisma.event.update({
        where: {
            id: eventId,
        },
        data: {
            name: name || undefined,
            date: date || undefined,
            locationId: locationId || undefined,
            description: description || undefined,
            link: link || undefined,
            thumbnailPath: thumbnailPath || undefined,
            categories: {
                deleteMany: {},
                create: categories.map((categoryId) => ({
                    categoryId,
                })),
            },
        },
    });
    redirect(`/events/${eventId}`);
}
