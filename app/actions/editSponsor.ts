"use server";
import { redirect } from "next/navigation";
import { SponsorService } from "@/services/SponsorService";
import { readSponsorFormData } from "./readSponsorFormData";
type ActionState = { error: boolean; message: string } | null;

export default async function editSponsor(sponsorId: number, prevState: ActionState | null, formData: FormData) {
    const { name, sponsorTierId, link, thumbnailPath } =
        await readSponsorFormData(formData);

     try {
            await SponsorService.updateSponsor(sponsorId, {
                name: name || undefined,
                sponsorTierId: sponsorTierId || undefined,
                link: link || undefined,
                thumbnailPath: thumbnailPath || undefined
            });
     } catch (error) {
            return { error: true, message: "Failed to edit sponsor" };
     }
     redirect(`/sponsors/${sponsorId}?success=Sponsor updated successfully!`);

}