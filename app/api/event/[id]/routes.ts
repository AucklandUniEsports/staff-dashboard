import { NextRequest, NextResponse } from "next/server";
import { EventService } from "@/services/EventService";

export async function GET(
    { params }: { params: Promise<{ id: number }> }
) {
    const { id } = await params;

    try {
        const event = await EventService.getEventById(id);

        if (!event) {
            return NextResponse.json(
                { message: "Event not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(event);
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    { params }: { params: Promise<{ id: number }> }
) {
    const { id } = await params;

    try {
        await EventService.deleteEvent(id);
        return NextResponse.json(
            { message: "Event deleted successfully" },
            { status: 200 }
        );
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: number }> }
) {
    const { id } = await params;
    const data = await req.json();

    try {
        const updatedEvent = await EventService.updateEvent(id, data);
        return NextResponse.json(
            { message: "Event updated successfully", data: updatedEvent },
            { status: 200 }
        );
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
