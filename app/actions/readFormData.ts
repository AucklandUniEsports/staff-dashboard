"use server";
import { uploadThumbnail } from "./uploadThumbnail";


export async function readFormData(formData: FormData) {
    const name = formData.get("name") as string;
    const dateRaw = formData.get("date-time");
    const date = dateRaw ? new Date(dateRaw as string) : undefined;
    const locationId = Number(formData.get("location"));
    const categories = formData.getAll("categories").map((id) => Number(id));
    const description = formData.get("description") as string;
    const link = formData.get("link") as string;

    const thumbnail = formData.get("thumbnail");
    let thumbnailPath: string | undefined;
    if (thumbnail instanceof File && thumbnail.size > 0) {
        const thumbnailData = await uploadThumbnail(thumbnail);
        thumbnailPath = thumbnailData.path;
    }

    return {
        name,
        date,
        dateRaw,
        locationId,
        categories,
        description,
        link,
        thumbnailPath,
    };
}
