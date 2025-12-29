import Link from "next/link";
import Table from "../components/Table";
import prisma from '@/lib/prisma';

const columns = ['name'];
export default async function Events() {
  const rows = await prisma.event.findMany();
  return (
      <>
        <Link className="action-block" href={"events/create-event"}>+ Create an Event.</Link>
        <Link className="action-block" href={"events/add-event-category"}>+ Add Event Category.</Link>
        <section className="content-block">
            <input className="input-field" type="text" placeholder="Search for an event..."/>
            <Table columns={columns} rows={rows}/>
        </section>
      </>
  );
}