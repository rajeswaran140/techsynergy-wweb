"use client";

import { useEffect, useState } from "react";
import CrudTable from "@/components/admin/CrudTable";
import FormModal from "@/components/admin/FormModal";

const fields = [
  { key: "title", label: "Title", type: "text" as const, required: true },
  { key: "slug", label: "Slug", type: "text" as const, required: true },
  { key: "description", label: "Description", type: "textarea" as const, required: true },
  { key: "category", label: "Category", type: "select" as const, options: [
    { value: "web", label: "Web" }, { value: "mobile", label: "Mobile" },
    { value: "cloud", label: "Cloud" }, { value: "design", label: "Design" },
  ]},
  { key: "client", label: "Client", type: "text" as const },
  { key: "liveUrl", label: "Live URL", type: "text" as const },
  { key: "imageUrl", label: "Image URL", type: "text" as const },
  { key: "isActive", label: "Active", type: "checkbox" as const },
];

const columns = [
  { key: "title", label: "Title" },
  { key: "category", label: "Category" },
  { key: "client", label: "Client" },
  {
    key: "isActive",
    label: "Status",
    render: (v: unknown) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${v ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
        {v ? "Active" : "Inactive"}
      </span>
    ),
  },
];

export default function AdminPortfolioPage() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>({ isActive: true });
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    try {
      const res = await fetch("/api/admin/portfolio");
      const json = await res.json();
      if (Array.isArray(json)) setData(json);
    } catch { /* ignore */ }
  }

  useEffect(() => { fetchData(); }, []);

  function handleAdd() {
    setEditing(null);
    setForm({ isActive: true, technologies: [] });
    setShowModal(true);
  }

  function handleEdit(item: Record<string, unknown>) {
    setEditing(item);
    setForm(item);
    setShowModal(true);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this portfolio item?")) return;
    await fetch(`/api/admin/portfolio/${id}`, { method: "DELETE" });
    fetchData();
  }

  async function handleSubmit() {
    setLoading(true);
    const url = editing ? `/api/admin/portfolio/${editing.id}` : "/api/admin/portfolio";
    const method = editing ? "PUT" : "POST";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setLoading(false);
    setShowModal(false);
    fetchData();
  }

  return (
    <>
      <CrudTable
        title="Portfolio"
        columns={columns}
        data={data}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {showModal && (
        <FormModal
          title={editing ? "Edit Portfolio Item" : "Add Portfolio Item"}
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
