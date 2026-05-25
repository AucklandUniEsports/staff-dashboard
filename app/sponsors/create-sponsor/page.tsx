import prisma from "@/lib/prisma";
import CreateSponsorClient from "./CreateSponsorClient";

export default async function CreateSponsor() {
     const sponsorTiers = await prisma.sponsorTier.findMany();
     return <CreateSponsorClient sponsorTiers={sponsorTiers} />;