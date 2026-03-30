"use server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { readFormData } from "./readFormData";

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

    await prisma.event.create({
        data: {
            name: name,
            date: date,
            locationId: locationId,
            description: description,
            link: link,
            thumbnailPath: thumbnailPath,
            categories: {
                create: categories.map(categoryId => ({
                    categoryId
                }))
            }
        }
    })
    redirect('/events');
}