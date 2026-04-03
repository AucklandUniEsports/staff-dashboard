import { NextRequest, NextResponse } from "next/server";
import { LocationService } from "@/services/LocationService";

export async function GET() {
    try {
        const locations = await LocationService.getAllLocations();
        return NextResponse.json(
            { message: "Successfully fetched all locations", data: location },
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
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const newUser = await LocationService.createLocation(data);
        return NextResponse.json(
            { message: "Successfully created user", data: newUser },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json(
            { error: "Failed to create user" },
            { status: 500 }
        );
    }
}

