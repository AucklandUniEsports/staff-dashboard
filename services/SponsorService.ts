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
                thumbnailPath: data.thumbnailPath,
                link: data.link,
            },
        });
    }

    static async getAllSponsors() {
        const sponsors = await prisma.sponsor.findMany({
            include: { sponsorTier: true },
        });
        return sponsors.map(({ sponsorTier, ...s }) => ({
            ...s,
            tier: sponsorTier.name,
        }));
    }

    static async getSponsorById(id: number) {
        const sponsor = await prisma.sponsor.findUnique({ where: { id }, include: { sponsorTier: true } });
        if (!sponsor) {
            return null;
        }
        return { ...sponsor, tier: sponsor.sponsorTier.name };
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
