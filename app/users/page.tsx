import Navbar from "../components/Navbar";
import PageHeading from "../components/PageHeading";
import StandardButton from "../components/StandardButton";
import TableColumns from "../components/TableColumns";

export default function Users() {
  return (
      <>
        <PageHeading page="users" />
        <button className="action-block">+ Create an User.</button>
        <section className="content-block">
          <TableColumns/>
        </section>
      </>
  );
}
