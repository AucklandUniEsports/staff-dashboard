import Link from "next/link";
import { cookies } from "next/headers";
import SuccessToast from "../components/SuccessToast";
import DeleteEventsClient from "./delete-event/DeleteEventClient";

const columns = ["name"];
export default async function Events() {
    const cookieStore = await cookies();
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/event`, {
        cache: "no-store",
        headers: {
            Cookie: cookieStore.toString(),
        },
    });

    const { data: rows } = await res.json();

    return (
        <>
            <SuccessToast />
            <Link className="action-block" href={"events/create-event"}>
                + Create an Event.
            </Link>
            <Link className="action-block" href={"events/add-event-category"}>
                + Add Event Category.
            </Link>
            <section className="content-block">
                <DeleteEventsClient rows={rows} columns={columns} />
            </section>
        </>
    );
}
