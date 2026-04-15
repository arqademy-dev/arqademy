// components/admin/AdminTopbar.tsx
"use client";

import { useEffect, useState } from "react";
import { AdminPage } from "./AdminSidebar";

const PAGE_TITLES: Record<AdminPage, string> = {
  dashboard: "Dashboard", analytics: "Analytics & Heatmap",
  signups: "All Signups", facilitators: "Facilitators",
  messages: "Messages", programmes: "Programmes", settings: "Settings",
};

interface Props {
  activePage: AdminPage;
  onToggleSidebar: () => void;
  onExport: () => void;
  onSearch: (q: string) => void;
}

export default function AdminTopbar({ activePage, onToggleSidebar, onExport, onSearch }: Props) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("arq-theme", isDark ? "dark" : "light");
    setDark(isDark);
  }

  return (
    <div
      className="sticky top-0 z-50 flex items-center justify-between px-6"
      style={{ height:58, background:"var(--topbar-bg, white)", borderBottom:"1px solid var(--border, #E4E9F0)", transition:"background 0.2s" }}
    >
      {/* Left */}
      <div className="flex items-center gap-[14px]">
        <button onClick={onToggleSidebar} className="p-1 border-none bg-none cursor-pointer flex items-center" style={{ color:"var(--muted, #6B7A8D)", background:"none" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        <div className="font-manrope font-bold text-[14px]" style={{ color:"var(--text-primary, #0D1B2A)" }}>
          {PAGE_TITLES[activePage]}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-[10px]">
        {/* Search */}
        <div className="relative">
          <input
            className="admin-input"
            style={{ width:220, paddingLeft:34, fontSize:13 }}
            placeholder="Search users, programmes..."
            onChange={e => onSearch(e.target.value)}
          />
          <svg style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted, #6B7A8D)" strokeWidth={2}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center rounded-[8px] transition-all"
          style={{ width:36, height:36, border:"1px solid var(--border, #E4E9F0)", background:"var(--surface, #F7F9FC)", cursor:"pointer", color:"var(--muted, #6B7A8D)", flexShrink:0 }}
          title="Toggle theme"
        >
          {dark ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>

        {/* Export */}
        <button
          onClick={onExport}
          className="inline-flex items-center gap-[6px] font-bold font-manrope rounded-[8px] transition-colors"
          style={{ background:"#009E8E", color:"white", border:"none", padding:"9px 18px", fontSize:13, cursor:"pointer" }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Export CSV
        </button>
      </div>
    </div>
  );
}