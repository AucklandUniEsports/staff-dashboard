import BackNav from "@/app/components/BackNav";
import StandardButton from "@/app/components/StandardButton";

export default async function AddEventCategory() {
  return (
      <>
        <section className="content-block">
          <BackNav/>
          <label className="input-label" htmlFor="">Category Name</label>
          <input className="input-field" type="text" placeholder="Tekken 8"/>
          <StandardButton title="Add Category." type="submit" color="grey" isLink={false}/>
        </section>
      </>
  );
}
