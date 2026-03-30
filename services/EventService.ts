import prisma from "../lib/prisma";
import { EventDTO, toEventDTO } from "@/dtos/event.dto";
import { EventCreateInput, EventUpdateInput } from "@/app/generated/prisma/models";

export class EventService {
    static async getAllEvents(): Promise<EventDTO[]> {
        const events = await prisma.event.findMany();
        return events.map(toEventDTO);
    }

    static async getEventById(id: number): Promise<EventDTO | null> {
        const event = await prisma.event.findUnique({ where: { id } });
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
        data: EventUpdateInput
    ): Promise<EventDTO> {
        const event = await prisma.event.update({
            where: { id },
            data,
        });

        return toEventDTO(event);
    }

    static async deleteEvent(id: number) {
        //TODO: Delete relations alongside event
        const event = await prisma.event.delete({
            where: { id },
        });

        return event;
    }

    static async deleteAllEvents() {
        const result = await prisma.event.deleteMany();
        return result;
    }
}