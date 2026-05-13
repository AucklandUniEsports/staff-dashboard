"use client";

import { useState } from "react";
import Table from "@/app/components/Table";

interface Props {
    rows: any[];
    columns: string[];
}

export default function DeleteEventsClient({ rows, columns }: Props) {
    const [events, setEvents] = useState(rows);

    const handleDelete = async (id: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this event?",
        );
        if (!confirmed) return;
        try {
            const res = await fetch(`/api/event/${id}`, { method: "DELETE" });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Failed to delete event");
            }
            setEvents((prev) => prev.filter((e) => e.id !== id));
        } catch (err) {
            console.error(err);
            alert(
                err instanceof Error ? err.message : "Failed to delete event",
            );
        }
    };
    return (
        <>
            <input
                className="input-field"
                type="text"
                placeholder="Search for an event..."
            />
            <Table columns={columns} rows={events} onDelete={handleDelete} />
        </>
    );
}
