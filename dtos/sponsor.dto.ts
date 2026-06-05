import { SponsorTier } from "@/app/generated/prisma/client";
import { SponsorModel } from "@/app/generated/prisma/models";

export interface SponsorDTO {
    id: number;
    name: string;
    thumbnailPath: string;
    link: string;
    sponsorTierId: number;
    sponsorTier: string;
}

export function toSponsorDTO(
    sponsor: SponsorModel & { sponsorTier: SponsorTier }
): SponsorDTO {
     return {
          id: sponsor.id,
          name: sponsor.name,
          thumbnailPath: sponsor.thumbnailPath,
          link: sponsor.link,
          sponsorTier: sponsor.sponsorTier.name,
          sponsorTierId: sponsor.sponsorTierId,
     };
}