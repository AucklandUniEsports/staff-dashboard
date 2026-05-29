"use client";

import { useActionState, useEffect, useState } from "react";
import BackNav from "@/app/components/BackNav";
import StandardButton from "@/app/components/StandardButton";
import CategoryTag from "@/app/components/CategoryTag";
import createSponsor from "@/app/actions/createSponsor";
import { Sponsor, SponsorTier, Prisma } from "@/app/generated/prisma/client";
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
    const [state, formAction] = useActionState(createSponsor, null);
    useEffect(() => {
        if (state?.error) toast.error(state.message);
    }, [state]);

    return (<section className="content-block">
                {!sponsor && <BackNav />}
                <ToastContainer style={{top: "112px"}}/>
    
                <form action={formAction}>
                    <input
                        accept="image/*"
                        hidden
                        id="thumbnail-upload"
                        name="thumbnail"
                        type="file"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const url = URL.createObjectURL(file);
                            setPreview(url);
                        }}
                    ></input>
                    {preview && (
                        <img
                            alt="Preview of uploaded thumbnail."
                            className="thumbnail"
                            src={preview}
                        />
                    )}
                    <label
                        className="upload-image"
                        htmlFor="thumbnail-upload"
                        id="thumbnail-upload-proxy"
                    >
                        {preview ? "Change Thumbnail" : "Upload a Thumbnail"}
                    </label>
                    <label className="input-label">Sponsor Name</label>
                    <input
                        className="input-field"
                        name="name"
                        type="text"
                        defaultValue={sponsor?.name ?? ""}
                        placeholder="AUEC"
                    />
                    <label className="input-label">Sponsor Tier</label>
                    <ul className="category-wrapper">
                        {sponsorTiers.map((sponsorTier, index) => (
                            <li key={index}>
                                <input
                                    name="sponsorTier"
                                    className="selectable-input"
                                    hidden
                                    id={sponsorTier.name}
                                    required
                                    type="radio"
                                    value={sponsorTier.id}
                                    defaultChecked={
                                        sponsor?.sponsorTierId === sponsorTier.id
                                    }
                                />
                                <CategoryTag
                                    name={sponsorTier.name}
                                    htmlFor={sponsorTier.name}
                                />
                            </li>
                        ))}
                    </ul>

                    <label className="input-label">Sponsor Link</label>
                    <input
                        name="link"
                        className="input-field"
                        type="text"
                        defaultValue={sponsor?.link ?? ""}
                        placeholder="start.gg/RAR252"
                    />
                    <StandardButton
                        title={sponsor ? "Update" : "Create Sponsor"}
                        type="submit"
                        color="grey"
                    />
                </form>
            </section>
        );




}