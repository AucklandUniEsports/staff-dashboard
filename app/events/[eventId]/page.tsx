import EventPageClient from "./EventPageClient";
import { cookies } from "next/headers";


export default async function UserPage({
    params,
}: {
    params: Promise<{ eventId: string }>;
}) {
    const { eventId } = await params;
    const cookieStore = await cookies();

    const [eventRes, locationsRes, categoriesRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_URL}/api/event/${eventId}`, {
            cache: "no-store",
            headers: { Cookie: cookieStore.toString() },
        }),
        fetch(`${process.env.NEXT_PUBLIC_URL}/api/location`, {
            cache: "no-store",
            headers: { Cookie: cookieStore.toString() },
        }),
        fetch(`${process.env.NEXT_PUBLIC_URL}/api/category`, {
            cache: "no-store",
            headers: { Cookie: cookieStore.toString() },
        }),
    ]);
    const { data } = await eventRes.json();
    const { data: locations } = await locationsRes.json();
    const { data: categories } = await categoriesRes.json();

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
