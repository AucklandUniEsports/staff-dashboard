import Link from "next/link";
import Table from "../components/Table";
import prisma from '@/lib/prisma';
import SuccessToast from "../components/SuccessToast";

const columns = ['name', 'tier'];
export default async function Sponsors() {
  const rows = await prisma.sponsor.findMany();
  return (
      <>
          <SuccessToast />
          <Link className="action-block" href={"sponsors/add-sponsor"}>
              + Add a Sponsor.
          </Link>
          <Link className="action-block" href={"sponsors/add-sponsor-tier"}>
              + Add Sponsor Tier.
          </Link>
          <section className="content-block">
              <input
                  className="input-field"
                  type="text"
                  placeholder="Search for a sponsor..."
              />
              <Table columns={columns} rows={rows} />
          </section>
      </>
  );
}