import { SponsorTier } from "@/app/generated/prisma/client";
import { SponsorModel } from "@/app/generated/prisma/models";

export interface SponsorDTO {
    id: number;
    name: string;
    thumbnailPath: string;
    link: string;
    sponsorTierId: number;
    tier: string;
}

export function toSponsorDTO(
    sponsor: SponsorModel & { tier: SponsorTier }
): SponsorDTO {
     return {
          id: sponsor.id,
          name: sponsor.name,
          thumbnailPath: sponsor.thumbnailPath,
          link: sponsor.link,
          tier: sponsor.tier.name,
          sponsorTierId: sponsor.sponsorTierId,
     };
}