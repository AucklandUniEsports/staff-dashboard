import { NextRequest, NextResponse } from "next/server";
import { EventService } from "@/services/EventService";
import { checkAuth } from "@/utils/checkAuth";

export const GET = checkAuth(async (req: NextRequest, { params }: { params: { id: string } }) => {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { message: "Invalid id" },
        { status: 400 }
      );
    }
    try {
        const event = await EventService.getEventById(id);

        if (!event) {
            return NextResponse.json(
                { message: "Event not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({ message: "Event retrieved successfully", data: event });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
});

export const PUT = checkAuth(async (req: NextRequest, { params }: { params: { id: string } }) => {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { message: "Invalid id" },
        { status: 400 }
      );
    }
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
});

export const DELETE = checkAuth(async (req: NextRequest, { params }: { params: { id: string } }) => {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { message: "Invalid id" },
        { status: 400 }
      );
    }
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
});
