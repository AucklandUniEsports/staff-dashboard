import prisma from "@/lib/prisma";
import EventPageClient from "./EventPageClient";


export default async function UserPage({params}:{params: Promise <{eventId: string}>}) {
  const { eventId } = await params;
  const data = await prisma.event.findUnique({
    where:{
      id: Number(eventId),
    }
  })
  if (!data) {
    return(
        <div>not found!</div>
    )
  }
  return <EventPageClient event={data} />;
}