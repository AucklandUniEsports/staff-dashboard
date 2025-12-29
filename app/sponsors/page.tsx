import Link from "next/link";
import Table from "../components/Table";
import prisma from '@/lib/prisma';
import WorkInProgress from "../components/WorkInProgress";

const columns = ['name', 'tier'];
export default async function Sponsors() {
  const rows = await prisma.sponsor.findMany();
  return (
      <>
        {/* <Link className="action-block" href={"sponsors/add-sponsor"}>+ Add a Sponsor.</Link>
        <section className="content-block">
            <input className="input-field" type="text" placeholder="Search for an sponsor..."/>
            <Table columns={columns} rows={rows}/>
        </section> */}
        <WorkInProgress/>
      </>
  );
}