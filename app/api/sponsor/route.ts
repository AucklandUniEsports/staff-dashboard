import { NextRequest, NextResponse } from "next/server";
import { SponsorService } from "@/services/SponsorService";
import { checkAuth } from "@/utils/checkAuth";

export const POST = checkAuth(async (req: NextRequest) => {
    try {
        const data = await req.json();
        const newSponsor = await SponsorService.addSponsor(data);
        return NextResponse.json(
            { message: "Successfully created sponsor", data: newSponsor },
            {
                status: 201,
            },
        );
    } catch (error) {
        console.error("Error creating sponsor:", error);
        return NextResponse.json(
            { error: "Failed to create sponsor" },
            { status: 500 },
        );
    }
});

export const GET = checkAuth(async () => {
    try {
        const sponsors = await SponsorService.getAllSponsors();
        return NextResponse.json(
            { message: "Successfully fetched all Sponsors", data: sponsors },
            {
                status: 200,
            },
        );
    } catch (error) {
        console.error("Error fetching all sponsors:", error);
        return NextResponse.json(
            { error: "Failed to fetch all sponsors" },
            { status: 500 },
        );
    }
});

export const DELETE = checkAuth(async () => {
    try {
        const sponsors = await SponsorService.deleteAllSponsors();
        return NextResponse.json(`Deleted ${sponsors.count} sponsors.`, {
            status: 200,
        });
    } catch (error) {
        console.error("Error deleting all sponsors:", error);
        return NextResponse.json(
            { error: "Failed to delete all sponsors" },
            { status: 500 },
        );
    }
});
