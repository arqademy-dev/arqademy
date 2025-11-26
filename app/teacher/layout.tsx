// app/(teacher)/layout.tsx
"use client";

import { useState, type ReactNode } from "react";
import { TopNav } from "../components/layout/TopNav";
import { TeacherSidebar } from "../components/layout/TeacherSidebar";

interface TeacherLayoutProps {
  children: ReactNode;
}

export default function TeacherLayout({ children }: TeacherLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50 to-teal-50">
      {/* ✅ Top Navigation */}
      <TopNav onMenuToggle={() => setSidebarOpen(true)} />

      {/* ✅ Sidebar */}
      <TeacherSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* ✅ Main Content */}
      <main className="lg:ml-64 pt-16 min-h-screen">
        <div className="p-5 sm:p-8">{children}</div>
      </main>
    </div>
  );
}
