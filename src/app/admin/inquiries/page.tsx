"use client";

import { useEffect, useState } from "react";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message: string;
  status: "new" | "read" | "replied" | "archived";
  createdAt: string;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  read: "bg-yellow-100 text-yellow-700",
  replied: "bg-green-100 text-green-700",
  archived: "bg-gray-100 text-gray-500",
};

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selected, setSelected] = useState<Inquiry | null>(null);

  async function fetchData() {
    try {
      const res = await fetch("/api/admin/inquiries");
      const json = await res.json();
      if (Array.isArray(json)) setInquiries(json);
    } catch { /* ignore */ }
  }

  useEffect(() => { fetchData(); }, []);

  async function updateStatus(id: string, status: string) {
    await fetch("/api/admin/inquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchData();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Inquiries</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Service</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {inquiries.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">No inquiries yet.</td>
                </tr>
              ) : (
                inquiries.map((inq) => (
                  <tr
                    key={inq.id}
                    onClick={() => setSelected(inq)}
                    className={`cursor-pointer hover:bg-gray-50 ${selected?.id === inq.id ? "bg-blue-50" : ""}`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{inq.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{inq.service}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[inq.status]}`}>
                        {inq.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Detail */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          {selected ? (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">{selected.name}</h2>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium text-gray-500">Email:</span> {selected.email}</p>
                {selected.phone && <p><span className="font-medium text-gray-500">Phone:</span> {selected.phone}</p>}
                {selected.company && <p><span className="font-medium text-gray-500">Company:</span> {selected.company}</p>}
                <p><span className="font-medium text-gray-500">Service:</span> {selected.service}</p>
              </div>
              <div>
                <p className="font-medium text-gray-500 text-sm mb-1">Message:</p>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{selected.message}</p>
              </div>
              <div className="flex gap-2 pt-2">
                {(["read", "replied", "archived"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(selected.id, s)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                      selected.status === s
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Select an inquiry to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
}
