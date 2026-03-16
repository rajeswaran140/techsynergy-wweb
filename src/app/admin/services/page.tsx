"use client";

import { useEffect, useState } from "react";
import CrudTable from "@/components/admin/CrudTable";
import FormModal from "@/components/admin/FormModal";

const fields = [
  { key: "title", label: "Title", type: "text" as const, required: true },
  { key: "slug", label: "Slug", type: "text" as const, required: true },
  { key: "description", label: "Short Description", type: "textarea" as const, required: true },
  { key: "longDescription", label: "Long Description", type: "textarea" as const },
  { key: "icon", label: "Icon Name", type: "text" as const, placeholder: "e.g. HiCode" },
  { key: "order", label: "Order", type: "number" as const },
  { key: "isActive", label: "Active", type: "checkbox" as const },
];

const columns = [
  { key: "title", label: "Title" },
  { key: "slug", label: "Slug" },
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

export default function AdminServicesPage() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>({ isActive: true, order: 0 });
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    try {
      const res = await fetch("/api/admin/services");
      const json = await res.json();
      if (Array.isArray(json)) setData(json);
    } catch { /* ignore */ }
  }

  useEffect(() => { fetchData(); }, []);

  function handleAdd() {
    setEditing(null);
    setForm({ isActive: true, order: 0, features: [] });
    setShowModal(true);
  }

  function handleEdit(item: Record<string, unknown>) {
    setEditing(item);
    setForm(item);
    setShowModal(true);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this service?")) return;
    await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
    fetchData();
  }

  async function handleSubmit() {
    setLoading(true);
    const url = editing ? `/api/admin/services/${editing.id}` : "/api/admin/services";
    const method = editing ? "PUT" : "POST";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setLoading(false);
    setShowModal(false);
    fetchData();
  }

  return (
    <>
      <CrudTable
        title="Services"
        columns={columns}
        data={data}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {showModal && (
        <FormModal
          title={editing ? "Edit Service" : "Add Service"}
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
