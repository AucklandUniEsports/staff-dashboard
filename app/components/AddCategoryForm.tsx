"use client";

import createCategory from "@/app/actions/createCategory";
import StandardButton from "./StandardButton";

interface AddCategoryFormProps {
  onSuccess: () => void;
  buttonColor?: string;
}

export default function AddCategoryForm({ onSuccess, buttonColor = "grey" }: AddCategoryFormProps) {
  async function action(formData: FormData) {
    await createCategory(formData);
    onSuccess();
  }

  return (
    <form action={action}>
      <label className="input-label" htmlFor="name">Category Name</label>
      <input className="input-field" id="name" name="name" type="text" placeholder="Tekken 8" required />
      <StandardButton title="Add Category." type="submit" color={buttonColor} />
    </form>
  );
}
