import Link from "next/link";
import Table from "../components/Table";
import prisma from '@/lib/prisma';

const columns = ['name', 'role'];
export default async function Users() {
  const rows = await prisma.user.findMany();
  return (
      <>
      <Link className="action-block" href={"users/create-user"}>+ Create an User.</Link>
      <section className="content-block">
          <input className="input-field" type="text" placeholder="Search for an user..."/>
          <Table columns={columns} rows={rows}/>
      </section>
      </>
  );
}
