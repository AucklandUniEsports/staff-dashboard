import BackNav from "@/app/components/BackNav";
import StandardButton from "@/app/components/StandardButton";
import WorkInProgress from "@/app/components/WorkInProgress";
export default async function CreateEvent() {
  return (
      <>
        {/* <section className="content-block">
            <BackNav/>
            <form action="submit">
              <input className="input-field" type="text" placeholder="OurHouse Inc."/>
              <StandardButton title="Add Category." type="submit" color="grey" isLink={false}/>
            </form>
        </section> */}
        <WorkInProgress/>
      </>
  );
}
