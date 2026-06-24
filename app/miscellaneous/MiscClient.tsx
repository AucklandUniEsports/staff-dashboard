"use client";

import { useEffect, useState } from "react";
import CategoryTag from "../components/CategoryTag";
import StandardButton from "../components/StandardButton";
import ConfirmModal from "../components/ConfirmModal";

type Category = {
  id: number;
  name: string;
  createdAt: string;
};

export default function MiscClient() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

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

  const confirmDelete = async () => {
    if (deletingId === null) return;
    const res = await fetch(`/api/category/${deletingId}`, { method: "DELETE" });
    if (res.ok) setCategories((prev) => prev.filter((c) => c.id !== deletingId));
    setDeletingId(null);
  };

  const handleEdit = async (id: number, newName: string) => {
    const res = await fetch(`/api/category/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });
    if (res.ok) {
      setCategories((prev) =>
        prev.map((c) => (c.id === id ? { ...c, name: newName } : c))
      );
    }
  };

  return (
    <section className="content-block">
      <h2 className="input-label">Event Categories</h2>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "12px" }}>
        <StandardButton title="+ Add Category." color="grey" link="/miscellaneous/add-category" />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : categories.length === 0 ? (
        <p>No categories yet.</p>
      ) : (
        <ul style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {categories.map((category) => (
            <CategoryTag
              key={category.id}
              name={category.name}
              onDelete={() => setDeletingId(category.id)}
              onEdit={(newName) => handleEdit(category.id, newName)}
            />
          ))}
        </ul>
      )}
      {deletingId !== null && (
        <ConfirmModal
          message="Are you sure you want to delete this category?"
          onConfirm={confirmDelete}
          onCancel={() => setDeletingId(null)}
        />
      )}
    </section>
  );
}
