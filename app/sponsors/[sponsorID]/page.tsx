import prisma from "@/lib/prisma";
import SponsorPageClient from "./SponsorPageClient";
import { cookies } from "next/headers";

export default async function SponsorPage({
    params,
}: {
     params: Promise<{ sponsorID: string }>;
}) {
    const { sponsorID } = await params;
    const cookieStore = await cookies();
    const sponsorRes = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/sponsor/${sponsorID}`, {
        cache: "no-store",
        headers: { Cookie: cookieStore.toString() },
    });
    const sponsor = await sponsorRes.json();
    const sponsorTiers = await prisma.sponsorTier.findMany();
    if (!sponsor) {
        return <div>not found!</div>;
    }
    return <SponsorPageClient sponsor={sponsor} sponsorTiers={sponsorTiers} />;
}