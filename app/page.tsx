import Navbar from "./components/Navbar";
import PageHeading from "./components/PageHeading";
import StandardButton from "./components/StandardButton";

export default function Home() {
  return (
      <>
        <PageHeading title="Hello"/>
        <section className="content-block">
          <StandardButton title="Delete User." color="red"/>
        </section>
      </>
  );
}
