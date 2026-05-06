import { CategoriesOnEvents } from "@/app/generated/prisma/client";
import { EventModel } from "@/app/generated/prisma/models";

export interface EventDTO {
    id: number;
    name: string;
    date: Date;
    locationId: number;
    description: string;
    link: string;
    thumbnailPath: string;
    categories?: CategoriesOnEvents[];
}

export function toEventDTO(
    event: EventModel
): EventDTO {
    return {
        id: event.id,
        name: event.name,
        date: event.date,
        locationId: event.locationId,
        description: event.description,
        link: event.link,
        thumbnailPath: event.thumbnailPath,
        categories: 'categories' in event ? event.categories as CategoriesOnEvents[]: undefined,
    };
}