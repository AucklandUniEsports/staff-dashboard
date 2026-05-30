"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import StandardButton from "@/app/components/StandardButton";
import BackNav from "@/app/components/BackNav";
import { Sponsor, Prisma } from "@/app/generated/prisma/client";
import { usePathname } from "next/navigation";
import SuccessToast from "@/app/components/SuccessToast";
import CreateSponsorClient from "../add-sponsor/CreateSponsorClient";
import { SponsorTier } from "@/app/generated/prisma/client";

interface SponsorPageClientProps {
    sponsor: Sponsor & {sponsorTier: string};
    sponsorTiers: SponsorTier[];
}

export default function SponsorPageClient({ sponsor, sponsorTiers }: SponsorPageClientProps) {
     const [isEditing, setIsEditing] = useState(false);
     if (!sponsor) return <p>Sponsor not found!</p>;
     return (
          <section className="content-block">
              <BackNav />
              <SuccessToast />
               {sponsor.thumbnailPath && (
                    <img
                        className="thumbnail"
                        src={`${process.env.NEXT_PUBLIC_SUPABASE_OBJECT_STORAGE_URL}${sponsor.thumbnailPath}`}
                        alt="sponsor image"
                    />
                )}
               <p className="user-name">{sponsor.name}</p>
               <div className="user-info">
                    <p>Tier: {sponsor.sponsorTier}</p>
                    <p>Link: {sponsor.link}</p>
               </div>
               <StandardButton
                    title="Edit"
                    type="button"
                    color="lime"
                    onClick={() => setIsEditing(true)}
               />
               {isEditing && (
                    <div className="popup">
                         <div className="popup-content">
                              <div className="popup-header">
                                   <div className="page-heading-title">Edit Sponsor</div>
                              <StandardButton
                                title="X"
                                type="button"
                                color="lime"
                                onClick={() => setIsEditing(false)}
                            />
                              </div>
                              <CreateSponsorClient sponsor={sponsor} sponsorTiers={sponsorTiers} />
                              
                         </div>
                    </div>
               )}
          </section>
     )
}