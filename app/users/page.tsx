import Navbar from "../components/Navbar";
import InputField from "../components/InputField";
import PageHeading from "../components/PageHeading";
import StandardButton from "../components/StandardButton";
import Table from "../components/Table";

export default function Users() {
  return (
      <>
        <PageHeading page="users" />
        <button className="action-block">+ Create an User.</button>
        <section className="content-block">
          <InputField placeholderText="Search for a user..."/>
          <Table/>
        </section>
      </>
  );
}
