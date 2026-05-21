"use client";

import { useActionState, useEffect, useState } from "react";
import BackNav from "@/app/components/BackNav";
import StandardButton from "@/app/components/StandardButton";
import CategoryTag from "@/app/components/CategoryTag";
import createEvent from "@/app/actions/createEvent";
import { Sponsor, Prisma } from "@/app/generated/prisma/client";
import editEvent from "@/app/actions/editEvent";
import { toast, ToastContainer } from "react-toastify/unstyled";
import "react-toastify/dist/ReactToastify.css";

interface CreateSponsorClientProps {
    sponsor: Sponsor;
}

export default function CreateSponsorClient({
    sponsor,
}: CreateSponsorClientProps) {
     const [preview, setPreview] = useState<string | null>(
        sponsor?.image_url
            ? `${process.env.NEXT_PUBLIC_SUPABASE_OBJECT_STORAGE_URL}${sponsor.image_url}`
            : null,
    );
    return <ToastContainer style={{ top: "112px" }} />;





}