import prisma from "../lib/prisma";
import { EventDTO, toEventDTO } from "@/dtos/event.dto";
import {
    EventCreateInput,
    EventUpdateInput,
} from "@/app/generated/prisma/models";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export class EventService {
    static async getAllEvents(): Promise<EventDTO[]> {
        const events = await prisma.event.findMany();
        return events.map(toEventDTO);
    }

    static async getEventById(id: number): Promise<EventDTO | null> {
        const event = await prisma.event.findUnique({
            where: { id },
            include: { categories: true },
        });
        if (!event) {
            return null;
        }
        return toEventDTO(event);
    }

    static async createEvent(data: EventCreateInput): Promise<EventDTO> {
        const event = await prisma.event.create({
            data,
        });

        return toEventDTO(event);
    }

    static async updateEvent(
        id: number,
        data: EventUpdateInput,
    ): Promise<EventDTO> {
        const event = await prisma.event.update({
            where: { id },
            data,
        });

        return toEventDTO(event);
    }

    static async deleteEvent(id: number) {
        const event = await prisma.event.findUnique({
            where: { id },
        });

        if (event?.thumbnailPath) {
            const { error } = await supabase.storage
                .from("event_thumbnails")
                .remove([event.thumbnailPath]);

            if (error) {
                console.error("Failed to delete image:", error);
            }
        }

        await prisma.categoriesOnEvents.deleteMany({
            where: { eventId: id },
        });

        const result = await prisma.event.delete({
            where: { id },
        });

        return result;
    }

    static async deleteAllEvents() {
        const events = await prisma.event.findMany({
            select: { thumbnailPath: true },
        });
        const paths = events.map((e) => e.thumbnailPath).filter(Boolean);

        if (paths.length > 0) {
            const { error } = await supabase.storage
                .from("event_thumbnails")
                .remove(paths);

            if (error) {
                console.error("Failed to delete some images:", error);
            }
        }

        const result = await prisma.event.deleteMany();

        return result;
    }
}
