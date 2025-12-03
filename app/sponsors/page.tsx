import Link from "next/link";
import Table from "../components/Table";

export default function Sponsors() {
  return (
      <>
      <Link className="action-block" href={"sponsors/add-sponsor"}>+ Add a Sponsor.</Link>
      <section className="content-block">
          <input className="input-field" type="text" placeholder="Search for a sponsor..."/>
          <Table/>
      </section>
      </>
  );
}
