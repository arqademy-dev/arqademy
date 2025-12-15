// app/(Admin)/layout.tsx
"use client";

import { useState,ReactNode } from "react";
import { TopNav } from "../components/layout/TopNav";
import { AdminSidebar } from "../components/admin/AdminSidebar";


export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br">
      {/* ✅ Top Navigation */}
      <TopNav onMenuToggle={() => setSidebarOpen(true)} />

      {/* ✅ Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* ✅ Main Content */}
      <main className="lg:ml-64 pt-16 min-h-screen">
        <div className="">{children}</div>
      </main>
    </div>
  );
}
