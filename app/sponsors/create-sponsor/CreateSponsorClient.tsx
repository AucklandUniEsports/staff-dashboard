"use client";

import { useActionState, useEffect, useState } from "react";
import BackNav from "@/app/components/BackNav";
import StandardButton from "@/app/components/StandardButton";
import CategoryTag from "@/app/components/CategoryTag";
import createEvent from "@/app/actions/createEvent";
import { Sponsor, SponsorTier, Prisma } from "@/app/generated/prisma/client";
import editEvent from "@/app/actions/editEvent";
import { toast, ToastContainer } from "react-toastify/unstyled";
import "react-toastify/dist/ReactToastify.css";

interface CreateSponsorClientProps {
    sponsor?: Sponsor;
    sponsorTiers: SponsorTier[];
}

export default function CreateSponsorClient({
    sponsor,
    sponsorTiers,
}: CreateSponsorClientProps) {
     const [preview, setPreview] = useState<string | null>(
        sponsor?.thumbnailPath
            ? `${process.env.NEXT_PUBLIC_SUPABASE_OBJECT_STORAGE_URL}${sponsor.thumbnailPath}`
            : null,
    );
    return <ToastContainer style={{ top: "112px" }} />;





}