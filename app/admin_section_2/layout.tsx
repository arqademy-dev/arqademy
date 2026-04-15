// app/admin/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ARQademy — Admin",
  description: "ARQademy Admin Dashboard",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}