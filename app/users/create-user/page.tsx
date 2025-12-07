import BackNav from "@/app/components/BackNav";
import StandardButton from "@/app/components/StandardButton";

export default async function CreateUser() {
  return (
        <section className="content-block">
            <BackNav/>
            <input className="input-field" type="text" placeholder="Name"/>
            <input className="input-field" type="text" placeholder="Email"/>
            <input className="input-field" type="text" placeholder="Password"/>
            <StandardButton title="Create User." type="submit" color="grey" isLink={false}/>
        </section>
  );
}
