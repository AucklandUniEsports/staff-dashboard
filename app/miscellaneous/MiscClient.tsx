"use client";

import { useEffect, useState } from "react";
import CategoryTag from "../components/CategoryTag";

type Category = {
  id: number;
  name: string;
  createdAt: string;
};

export default function MiscClient() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchCategories() {
    const res = await fetch("/api/category");
    if (res.ok) {
      const { data } = await res.json();
      setCategories(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section className="content-block">
      <h2 className="input-label">Event Categories</h2>
      {loading ? (
        <p>Loading...</p>
      ) : categories.length === 0 ? (
        <p>No categories yet.</p>
      ) : (
        <ul>
          {categories.map((category) => (
            <CategoryTag key={category.id} name={category.name} />
          ))}
        </ul>
      )}
    </section>
  );
}
