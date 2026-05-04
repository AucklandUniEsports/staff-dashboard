import prisma from "@/lib/prisma";
import {
    SponsorUncheckedCreateInput,
    SponsorUpdateInput,
} from "@/app/generated/prisma/models";
import { string } from "better-auth";

export class SponsorService {
    static async addSponsor(data: SponsorUncheckedCreateInput) {
        return prisma.sponsor.create({
            data: {
                name: data.name,
                sponsorTier: { connect: { id: data.sponsorTierId } },
                image_url: data.image_url,
                link: data.link,
            },
        });
    }

    static async getAllSponsors() {
        return prisma.sponsor.findMany();
    }

    static async getSponsorById(id: number) {
        const sponsor = await prisma.sponsor.findUnique({ where: { id } });
        if (!sponsor) {
            return null;
        }
        return sponsor;
    }

    static async updateSponsor(id: number, data: SponsorUpdateInput) {
        return prisma.sponsor.update({
            where: { id },
            data,
        });
    }

    static async deleteSponsor(id: number) {
        return prisma.sponsor.delete({
            where: { id },
        });
    }

    static async deleteAllCategories() {
        return prisma.sponsor.deleteMany();
    }
}
