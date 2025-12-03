import StandardButton from "@/app/components/StandardButton";
import { auth } from "../../lib/auth";
import { headers } from "next/headers";

export default async function CreateUser() {
  return (
      <>
        <section className="content-block">
            <input className="input-field" type="text" placeholder="Name"/>
            <input className="input-field" type="text" placeholder="Email"/>
            <input className="input-field" type="text" placeholder="Password"/>
            <StandardButton title="Create User." type="submit" color="grey" isLink={false}/>
        </section>
      </>
  );
}
