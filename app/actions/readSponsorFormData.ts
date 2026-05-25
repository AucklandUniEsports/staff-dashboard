import { uploadThumbnail } from "./uploadThumbnail";

export async function readSponsorFormData(formData: FormData) {
    const name = formData.get("name") as string;
    const sponsorTierId = Number(formData.get("tier"));
    const link = formData.get("link") as string;
    const thumbnail = formData.get("thumbnail");

     let thumbnailPath: string | undefined;
    if (thumbnail instanceof File && thumbnail.size > 0) {
        const thumbnailData = await uploadThumbnail(thumbnail);
        thumbnailPath = thumbnailData.path;
    }
    return {
          name,
          sponsorTierId,
          link,
          thumbnailPath,
    }
}