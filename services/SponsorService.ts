import prisma from "@/lib/prisma";
import { SponsorDTO, toSponsorDTO } from "@/dtos/sponsor.dto";
import {
    SponsorUncheckedCreateInput,
    SponsorUpdateInput,
} from "@/app/generated/prisma/models";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
);


export class SponsorService {
    static async addSponsor(data: SponsorUncheckedCreateInput): Promise<SponsorDTO> {
        const sponsor = await prisma.sponsor.create({
            data, include: { sponsorTier: true },
        });
        return toSponsorDTO(sponsor);
    }

    static async getAllSponsors() : Promise<SponsorDTO[]> {
        const sponsors = await prisma.sponsor.findMany({
            include: { sponsorTier: true },
        });
        return sponsors.map(toSponsorDTO);
    }

    static async getSponsorById(id: number): Promise<SponsorDTO | null> {
        const sponsor = await prisma.sponsor.findUnique({ where: { id }, include: { sponsorTier: true } });
        if (!sponsor) {
            return null;
        }
        return toSponsorDTO(sponsor);
    }

    static async updateSponsor(id: number, data: SponsorUpdateInput) : Promise<SponsorDTO> {
        const sponsor = await prisma.sponsor.update({
            where: { id },
            data,
            include: { sponsorTier: true },
        });
        return toSponsorDTO(sponsor);
    }

    static async deleteSponsor(id: number) {
        const sponsor = await prisma.sponsor.findUnique({
            where: { id },
        });

        if (sponsor?.thumbnailPath) {
            const { error } = await supabase.storage
            .from("sponsor_thumbnails")
            .remove([sponsor.thumbnailPath]);
            if (error) {
                console.error("Failed to delete image:", error);
            }}
        const result = await prisma.sponsor.delete({
            where: { id },
        });
        return result;
    }

    static async deleteAllSponsors() {
        const sponsors = await prisma.sponsor.findMany({
            select: { thumbnailPath: true },
        });
        const paths = sponsors.map((sponsor) => sponsor.thumbnailPath).filter(Boolean) as string[];
        if (paths.length > 0) {
            const { error } = await supabase.storage
            .from("sponsor_thumbnails")
            .remove(paths);
            if (error) {
                console.error("Failed to delete images:", error);
            }
        }
        const result = await prisma.sponsor.deleteMany();


        return result;
    }
}
