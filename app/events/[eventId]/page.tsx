import prisma from "@/lib/prisma";
import EventPageClient from "./EventPageClient";

export default async function UserPage({
    params,
}: {
    params: Promise<{ eventId: string }>;
}) {
    const { eventId } = await params;

    const [data, locations, categories] = await Promise.all([
        prisma.event.findUnique({
            where: { id: Number(eventId) },
            include: { categories: true },
        }),
        prisma.location.findMany(),
        prisma.category.findMany(),
    ]);

    if (!data) {
        return <div>not found!</div>;
    }
    return (
        <EventPageClient
            event={data}
            locations={locations}
            categories={categories}
        />
    );
}
