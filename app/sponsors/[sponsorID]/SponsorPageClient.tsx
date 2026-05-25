"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import StandardButton from "@/app/components/StandardButton";
import BackNav from "@/app/components/BackNav";
import { Sponsor, Prisma } from "@/app/generated/prisma/client";
import { usePathname } from "next/navigation";
import SuccessToast from "@/app/components/SuccessToast";


interface SponsorPageClientProps {
    sponsor: Sponsor & {tier: string};
}

export default function SponsorPageClient({ sponsor }: SponsorPageClientProps) {
     if (!sponsor) return <p>Sponsor not found!</p>;
     return (
          <section className="content-block">
              <BackNav />
              <SuccessToast />
               {sponsor.thumbnailPath && (
                    <img
                        className="thumbnail"
                        src={sponsor.thumbnailPath}
                        alt="sponsor image"
                    />
                )}
               <p className="user-name">{sponsor.name}</p>
               <div className="user-info">
                    <p>Tier: {sponsor.tier}</p>
                    <p>Link: {sponsor.link}</p>
               </div>
          </section>
     )
}