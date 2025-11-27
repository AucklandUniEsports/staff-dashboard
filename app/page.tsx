import Navbar from "./components/Navbar";
import PageHeading from "./components/PageHeading";
import StandardButton from "./components/StandardButton";
import TableColumns from "./components/TableColumns";

export default function Home() {
  return (
      <>
        <PageHeading page="users" />
        <button className="action-block">+ Create a User</button>
        <section className="content-block">
          <StandardButton title="Delete User." color="red"/>
        </section>
        <section className="content-block">
          <TableColumns/>
        </section>
      </>
  );
}
