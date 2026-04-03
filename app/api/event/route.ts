import { NextRequest, NextResponse } from "next/server";
import { EventService } from "@/services/EventService";

export async function GET() {
    try {
        const events = await EventService.getAllEvents();
        return NextResponse.json(
            { message: "Successfully fetched all Events", data: events },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error("Error fetching all events:", error);
        return NextResponse.json(
            { error: "Failed to fetch all events" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const newUser = await EventService.createEvent(data);
        return NextResponse.json(
            { message: "Successfully created event", data: newUser },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.error("Error creating event:", error);
        return NextResponse.json(
            { error: "Failed to create event" },
            { status: 500 }
        );
    }
}

export async function DELETE() {
    try {
        const events = await EventService.deleteAllEvents();
        return NextResponse.json(`Deleted ${events.count} events.`, {
            status: 200,
        });
    } catch (error) {
        console.error("Error deleting all events:", error);
        return NextResponse.json(
            { error: "Failed to delete all events" },
            { status: 500 }
        );
    }
}
