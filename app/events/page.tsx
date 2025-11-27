import Navbar from "../components/Navbar";
import PageHeading from "../components/PageHeading";
import StandardButton from "../components/StandardButton";
import TableColumns from "../components/TableColumns";

export default function Events() {
  return (
      <>
        <PageHeading page="events" />
        <button className="action-block">+ Create an Event.</button>
        <button className="action-block">+ Add Event Category.</button>
        <section className="content-block">
          <TableColumns/>
        </section>
      </>
  );
}
