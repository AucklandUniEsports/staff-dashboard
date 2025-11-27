import Navbar from "../components/Navbar";
import PageHeading from "../components/PageHeading";
import StandardButton from "../components/StandardButton";
import TableColumns from "../components/TableColumns";

export default function Sponsors() {
  return (
      <>
        <PageHeading page="sponsors" />
        <button className="action-block">+ Add a Sponsor.</button>
        <section className="content-block">
          <TableColumns/>
        </section>
      </>
  );
}
