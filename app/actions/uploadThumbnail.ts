import { createClient } from "@supabase/supabase-js";

const apiKey = process.env.SUPABASE_SECRET_API_KEY!;
const supabase = createClient(process.env.SUPABASE_URL!, apiKey);

export async function uploadThumbnail(thumbnail: File) {
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
