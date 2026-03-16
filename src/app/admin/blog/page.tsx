"use client";

import { useEffect, useState } from "react";
import CrudTable from "@/components/admin/CrudTable";
import FormModal from "@/components/admin/FormModal";

const fields = [
  { key: "title", label: "Title", type: "text" as const, required: true },
  { key: "slug", label: "Slug", type: "text" as const, required: true },
  { key: "excerpt", label: "Excerpt", type: "textarea" as const, required: true },
  { key: "content", label: "Content", type: "textarea" as const, required: true },
  { key: "author", label: "Author", type: "text" as const, required: true },
  { key: "imageUrl", label: "Image URL", type: "text" as const },
  { key: "isPublished", label: "Published", type: "checkbox" as const },
];

const columns = [
  { key: "title", label: "Title" },
  { key: "author", label: "Author" },
  {
    key: "isPublished",
    label: "Status",
    render: (v: unknown) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${v ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
        {v ? "Published" : "Draft"}
      </span>
    ),
  },
  {
    key: "createdAt",
    label: "Date",
    render: (v: unknown) => v ? new Date(v as string).toLocaleDateString() : "—",
  },
];

export default function AdminBlogPage() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>({ isPublished: false });
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    try {
      const res = await fetch("/api/admin/blog");
      const json = await res.json();
      if (Array.isArray(json)) setData(json);
    } catch { /* ignore */ }
  }

  useEffect(() => { fetchData(); }, []);

  function handleAdd() {
    setEditing(null);
    setForm({ isPublished: false, tags: [] });
    setShowModal(true);
  }

  function handleEdit(item: Record<string, unknown>) {
    setEditing(item);
    setForm(item);
    setShowModal(true);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this blog post?")) return;
    await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    fetchData();
  }

  async function handleSubmit() {
    setLoading(true);
    const url = editing ? `/api/admin/blog/${editing.id}` : "/api/admin/blog";
    const method = editing ? "PUT" : "POST";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setLoading(false);
    setShowModal(false);
    fetchData();
  }

  return (
    <>
      <CrudTable
        title="Blog Posts"
        columns={columns}
        data={data}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {showModal && (
        <FormModal
          title={editing ? "Edit Blog Post" : "Add Blog Post"}
          fields={fields}
          values={form}
          onChange={(k, v) => setForm((f) => ({ ...f, [k]: v }))}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
          loading={loading}
        />
      )}
    </>
  );
}
