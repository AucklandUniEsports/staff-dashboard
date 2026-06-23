"use client";

import BackNav from "@/app/components/BackNav";
import AddCategoryForm from "@/app/components/AddCategoryForm";
import { useRouter } from "next/navigation";

export default function AddCategory() {
  const router = useRouter();

  return (
    <section className="content-block">
      <BackNav />
      <AddCategoryForm onSuccess={() => router.push("/miscellaneous")} />
    </section>
  );
}
