'use client';

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import StandardButton from "@/app/components/StandardButton";
import BackNav from "@/app/components/BackNav";
import { Event } from "@/app/generated/prisma/client";
import { usePathname } from "next/navigation";

export default function EventPageClient({ event }: {event:Event}) {

  const router = useRouter();
  const pathname = usePathname();


  if (!event) return <p>Event not found!</p>;

  return (
    <section className="content-block">
      <BackNav/>
      <img className="thumbnail" src={"https://hizvklozfaxggijszcab.supabase.co/storage/v1/object/public/event_thumbnails/" + event.thumbnailPath} alt="" />
      <p className="user-name">{event.name}</p>
      <div className="user-info">
        <p>Description: {event.description}</p>
        <p>Link: {event.link}</p>
      </div>
    </section>
  );
}