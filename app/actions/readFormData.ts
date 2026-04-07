"use server";
import { createClient } from "@supabase/supabase-js";

const apiKey = process.env.SUPABASE_SECRET_API_KEY ?? "";
const supabase = createClient(process.env.SUPABASE_URL ?? "", apiKey);

async function uploadThumbnail(thumbnail: File) {
    const ext = thumbnail.name.split(".").pop();
    const filePath = `${crypto.randomUUID()}.${ext}`;
    const buffer = Buffer.from(await thumbnail.arrayBuffer());
    const { data, error } = await supabase.storage
        .from("event_thumbnails")
        .upload(filePath, buffer, {
            contentType: thumbnail.type,
        });
    if (error) {
        throw error;
    }
    return data;
}

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
