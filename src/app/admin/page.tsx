"use client";

import { useEffect, useState } from "react";
import { HiCog, HiBriefcase, HiPencil, HiInbox } from "react-icons/hi";

interface DashboardStats {
  services: number;
  portfolio: number;
  blog: number;
  inquiries: number;
}

const statCards = [
  { key: "services" as const, label: "Services", icon: HiCog, color: "bg-blue-500" },
  { key: "portfolio" as const, label: "Portfolio Items", icon: HiBriefcase, color: "bg-purple-500" },
  { key: "blog" as const, label: "Blog Posts", icon: HiPencil, color: "bg-green-500" },
  { key: "inquiries" as const, label: "Inquiries", icon: HiInbox, color: "bg-orange-500" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    services: 0,
    portfolio: 0,
    blog: 0,
    inquiries: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const [services, portfolio, blog, inquiries] = await Promise.all([
          fetch("/api/admin/services").then((r) => r.json()),
          fetch("/api/admin/portfolio").then((r) => r.json()),
          fetch("/api/admin/blog").then((r) => r.json()),
          fetch("/api/admin/inquiries").then((r) => r.json()),
        ]);
        setStats({
          services: Array.isArray(services) ? services.length : 0,
          portfolio: Array.isArray(portfolio) ? portfolio.length : 0,
          blog: Array.isArray(blog) ? blog.length : 0,
          inquiries: Array.isArray(inquiries) ? inquiries.length : 0,
        });
      } catch {
        // API not connected yet, show zeros
      }
    }
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => (
          <div
            key={card.key}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}
              >
                <card.icon size={24} className="text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {stats[card.key]}
                </p>
                <p className="text-sm text-gray-500">{card.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Welcome to TechSynergy CMS
        </h2>
        <p className="text-gray-600">
          Manage your services, portfolio items, blog posts, and customer
          inquiries from this dashboard. Use the sidebar to navigate between
          different sections.
        </p>
      </div>
    </div>
  );
}
