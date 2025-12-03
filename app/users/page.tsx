import Link from "next/link";
import Table from "../components/Table";

export default function Users() {
  return (
      <>
      <Link className="action-block" href={"users/create-user"}>+ Create an User.</Link>
      <section className="content-block">
          <input className="input-field" type="text" placeholder="Search for an user..."/>
          <Table/>
      </section>
      </>
  );
}
