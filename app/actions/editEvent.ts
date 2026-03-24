"use server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { uploadThumbnail } from "./createEvent";

export default async function editEvent(eventId: number, formData: FormData) {
    const name = formData.get("name") as string;
    const dateRaw = formData.get("date-time");
    if (typeof dateRaw !== "string") {
        throw new Error("Invalid date");
    }
    const date = new Date(dateRaw);
    const locationId = Number(formData.get("location"));
    const categories = formData.getAll("categories").map((id) => Number(id));
    const description = formData.get("description") as string;
    const link = formData.get("link") as string;
    const thumbnail = formData.get("thumbnail");
    let thumbnailPath: string | undefined;
    if ((thumbnail instanceof File && thumbnail.size > 0)) {
        const thumbnailData = await uploadThumbnail(thumbnail);
          thumbnailPath = thumbnailData.path;
    }
    
    
    await prisma.event.update({
        where: {
            id: eventId
        },
        data: {
            name: name,
            date: date,
            locationId: locationId,
            description: description,
            link: link,
            thumbnailPath: thumbnailPath || undefined,
            categories: {
                create: categories.map((categoryId) => ({
                    categoryId,
                })),
            },
        },
    });
    redirect(`/events/${eventId}`);
}
