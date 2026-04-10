import Link from "next/link";
import Table from "../components/Table";
import { cookies } from "next/headers";

const cookieStore = await cookies();

const columns = ['name'];
export default async function Events() {
  const res = await fetch(`${process.env.BETTER_AUTH_URL}/api/event`, {
      cache: "no-store",
      headers: {
          Cookie: cookieStore.toString(),
      },
  });
  
  const { data: rows} = await res.json();

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