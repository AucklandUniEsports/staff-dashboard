"use client";

import BackNav from "@/app/components/BackNav";
import StandardButton from "@/app/components/StandardButton";
import { useRouter } from "next/navigation";
import createCategory from "@/app/actions/createCategory";

export default function AddEventCategory() {
  const router = useRouter();

  async function action(formData: FormData) {
    await createCategory(formData);
    router.push("/events");
  }

  return (
    <section className="content-block">
          <BackNav/>
          <form action={action}>
            <label className="input-label" htmlFor="">Category Name</label>
            <input className="input-field" name="name" type="text" placeholder="Tekken 8" required/>
            <StandardButton title="Add Category." type="submit" color="grey"/>
          </form>
    </section>
  );
}
