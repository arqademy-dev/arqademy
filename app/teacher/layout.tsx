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
    <div className="min-h-screen ">
      {/* ✅ Top Navigation */}
      <TopNav onMenuToggle={() => setSidebarOpen(true)} />

      {/* ✅ Sidebar */}
      <TeacherSidebar
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
