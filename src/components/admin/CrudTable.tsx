"use client";

import { HiPencil, HiTrash, HiPlus } from "react-icons/hi";

interface Column {
  key: string;
  label: string;
  render?: (value: unknown, item: Record<string, unknown>) => React.ReactNode;
}

interface CrudTableProps {
  title: string;
  columns: Column[];
  data: Record<string, unknown>[];
  onAdd: () => void;
  onEdit: (item: Record<string, unknown>) => void;
  onDelete: (id: string) => void;
}

export default function CrudTable({
  title,
  columns,
  data,
  onAdd,
  onEdit,
  onDelete,
}: CrudTableProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <HiPlus size={18} />
          Add New
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {col.label}
                </th>
              ))}
              <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  No items found. Click &quot;Add New&quot; to create one.
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id as string} className="hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4 text-sm text-gray-900">
                      {col.render
                        ? col.render(item[col.key], item)
                        : (item[col.key] as string)}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onEdit(item)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <HiPencil size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(item.id as string)}
                        className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <HiTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
