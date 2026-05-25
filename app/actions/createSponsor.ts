import { redirect } from "next/navigation";
import { SponsorService } from "@/services/SponsorService";
import { readSponsorFormData } from "./readSponsorFormData";

type ActionState = { error: boolean; message: string } | null;
export default async function createSponsor(prevState: ActionState | null, formData: FormData) {
    const { name, sponsorTierId, link, thumbnailPath } =
        await readSponsorFormData(formData);

     if (!thumbnailPath) return { error: true, message: "Thumbnail is required" };
     try {
            await SponsorService.addSponsor({
                name,
                sponsorTierId,
                link,
                thumbnailPath
            });
     } catch (error) {
            return { error: true, message: "Failed to create sponsor" };
     }

}