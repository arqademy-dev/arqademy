// app/(Admin)/layout.tsx
"use client";

import { useState, type ReactNode } from "react";
import { TopNav } from "../components/layout/TopNav";
import { AdminSidebar } from "../components/admin/AdminSidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

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
