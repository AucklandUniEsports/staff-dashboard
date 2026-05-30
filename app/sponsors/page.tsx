import Link from "next/link";
import Table from "../components/Table";
import { cookies } from "next/headers";
import SuccessToast from "../components/SuccessToast";

const columns = ['name', 'sponsorTier'];
export default async function Sponsors() {
  const cookieStore = await cookies();
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/sponsor`, {
      cache: "no-store",
      headers: {
          Cookie: cookieStore.toString(),
      },
  });
    const { data: rows } = await res.json();
  return (
      <>
          <SuccessToast />
          <Link className="action-block" href={"sponsors/add-sponsor"}>
              + Add a Sponsor.
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