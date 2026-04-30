import { NextRequest, NextResponse } from "next/server";
import { SponsorService } from "@/services/SponsorService";
import { checkAuth } from "@/utils/checkAuth";

export const GET = checkAuth(
    async (req: NextRequest, { params }: { params: { id: string } }) => {
        const id = Number(params.id);
        if (isNaN(id)) {
            return NextResponse.json(
                { message: "Invalid id" },
                { status: 400 },
            );
        }

        try {
            const sponsor = await SponsorService.getSponsorById(id);

            if (!sponsor) {
                return NextResponse.json(
                    { message: "Sponsor not found" },
                    { status: 404 },
                );
            }

            return NextResponse.json(sponsor);
        } catch (err) {
            console.error(err);
            return NextResponse.json(
                { message: "Internal server error" },
                { status: 500 },
            );
        }
    },
);

export const PUT = checkAuth(
    async (req: NextRequest, { params }: { params: { id: string } }) => {
        const id = Number(params.id);
        if (isNaN(id)) {
            return NextResponse.json(
                { message: "Invalid id" },
                { status: 400 },
            );
        }

        const data = await req.json();

        try {
            const updatedSponsor = await SponsorService.updateSponsor(id, data);
            return NextResponse.json(
                {
                    message: "Sponsor updated successfully",
                    data: updatedSponsor,
                },
                { status: 200 },
            );
        } catch (err) {
            console.error(err);
            return NextResponse.json(
                { message: "Internal server error" },
                { status: 500 },
            );
        }
    },
);

export const DELETE = checkAuth(
    async (req: NextRequest, { params }: { params: { id: string } }) => {
        const id = Number(params.id);
        if (isNaN(id)) {
            return NextResponse.json(
                { message: "Invalid id" },
                { status: 400 },
            );
        }

        try {
            await SponsorService.deleteSponsor(id);
            return NextResponse.json(
                { message: "Sponsor deleted successfully" },
                { status: 200 },
            );
        } catch (err) {
            console.error(err);
            return NextResponse.json(
                { message: "Internal server error" },
                { status: 500 },
            );
        }
    },
);
