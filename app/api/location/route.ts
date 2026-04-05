import { NextRequest, NextResponse } from "next/server";
import { LocationService } from "@/services/LocationService";
import { checkAuth } from "@/utils/checkAuth";

export const POST = checkAuth(async (req: NextRequest) => {
    try {
        const data = await req.json();
        const newLocation = await LocationService.createLocation(data);
        return NextResponse.json(
            { message: "Successfully created location", data: newLocation },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.error("Error creating location:", error);
        return NextResponse.json(
            { error: "Failed to create location" },
            { status: 500 }
        );
    }
});

export const GET = checkAuth(async () => {
    try {
        const locations = await LocationService.getAllLocations();
        return NextResponse.json(
            { message: "Successfully fetched all locations", data: locations },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error("Error fetching all locations:", error);
        return NextResponse.json(
            { error: "Failed to fetch all locations" },
            { status: 500 }
        );
    }
});

export const DELETE = checkAuth(async () => {
    try {
        const locations = await LocationService.deleteAllLocations();
        return NextResponse.json(`Deleted ${locations.count} locations.`, {
            status: 200,
        });
    } catch (error) {
        console.error("Error deleting all locations:", error);
        return NextResponse.json(
            { error: "Failed to delete all locations" },
            { status: 500 }
        );
    }
})
