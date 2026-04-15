// app/admin/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import AdminSidebar, { type AdminPage } from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import DashboardPage from "./pages/DashboardPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SignupsPage from "./pages/SignupsPage";
import FacilitatorsPage from "./pages/FacilitatorsPage";
import MessagesPage from "./pages/MessagesPage";
import ProgrammesPage from "./pages/ProgrammesPage";
import SettingsPage from "./pages/SettingsPage";
import AdminModals, { AdminModalType } from "./AdminModals";
import {
  INITIAL_SIGNUPS, INITIAL_FACILITATORS, INITIAL_PROGRAMMES,
  buildConversations, Signup, Facilitator, Programme, Conversation,
} from "./adminData";

export default function AdminPage() {
  const [activePage, setActivePage] = useState<AdminPage>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [toast, setToast] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  // Data state
  const [signups, setSignups] = useState<Signup[]>(INITIAL_SIGNUPS);
  const [facilitators, setFacilitators] = useState<Facilitator[]>(INITIAL_FACILITATORS);
  const [programmes, setProgrammes] = useState<Programme[]>(INITIAL_PROGRAMMES);
  const [conversations, setConversations] = useState<Conversation[]>(() => buildConversations(INITIAL_SIGNUPS));

  // Modal state
  const [modal, setModal] = useState<AdminModalType>(null);
  const [modalTargetId, setModalTargetId] = useState<number | null>(null);

  // Init dark mode from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("arq-theme");
    if (saved === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, []);

  function showToast(msg: string) {
    setToast(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2800);
  }

  function exportCSV() {
    const headers = ["ID","Name","Phone","State","Programme","Type","Message","Date"];
    const rows = signups.map(s => [s.id,s.name,s.phone,s.state,s.programme,s.type,s.message,s.date]);
    const csv = [headers,...rows].map(r => r.map(v => '"'+String(v).replace(/"/g,'""')+'"').join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv],{type:"text/csv"}));
    a.download = "arqademy-export-"+new Date().toISOString().slice(0,10)+".csv";
    a.click();
    showToast("CSV downloaded ✓");
  }

  const msgUnread = conversations.filter(c => c.unread).length;

  return (
    <div style={{ background:"var(--bg-main,#F7F9FC)", minHeight:"100vh" }}>
      {/* CSS variables for admin dark mode */}
      <style>{`
        :root {
          --teal:#009E8E;--teal-light:#E6F7F5;--navy:#0D1B2A;--navy2:#162334;
          --muted:#6B7A8D;--border:#E4E9F0;--surface:#F7F9FC;--bg-main:#F7F9FC;
          --bg-white:#ffffff;--text-primary:#0D1B2A;--topbar-bg:#ffffff;--card-bg:#ffffff;
        }
        html.dark {
          --teal:#00C4B0;--teal-light:#0D2E2B;--navy:#E2EAF4;--navy2:#C8D6E8;
          --muted:#8A9BB0;--border:#243447;--surface:#111D2C;--bg-main:#0A1520;
          --bg-white:#132030;--text-primary:#E2EAF4;--topbar-bg:#0F1E2E;--card-bg:#132030;
        }
        .admin-input{width:100%;padding:10px 13px;border:1.5px solid var(--border,#E4E9F0);border-radius:8px;font-size:13px;font-family:Manrope,sans-serif;color:var(--text-primary,#0D1B2A);background:var(--surface,#F7F9FC);outline:none;transition:border-color 0.18s;}
        .admin-input:focus{border-color:var(--teal,#009E8E);background:var(--bg-white,white);}
        .admin-label-sm{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:var(--muted,#6B7A8D);margin-bottom:5px;display:block;}
        .admin-stat-card{background:var(--card-bg,white);border:1px solid var(--border,#E4E9F0);border-radius:14px;padding:20px 22px;transition:background 0.2s;}
        .admin-card-box{background:var(--card-bg,white);border:1px solid var(--border,#E4E9F0);border-radius:14px;overflow:hidden;transition:background 0.2s;}
        .admin-prog-card{background:var(--card-bg,white);border:1px solid var(--border,#E4E9F0);border-radius:12px;padding:18px;transition:box-shadow 0.2s,background 0.2s;}
        .admin-prog-card:hover{box-shadow:0 6px 20px rgba(0,0,0,0.07);}
        .admin-table{width:100%;border-collapse:collapse;font-size:13px;}
        .admin-table th{text-align:left;padding:10px 14px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--muted,#6B7A8D);background:var(--surface,#F7F9FC);border-bottom:1px solid var(--border,#E4E9F0);}
        .admin-table td{padding:12px 14px;border-bottom:1px solid var(--border,#E4E9F0);vertical-align:middle;color:var(--text-primary,#0D1B2A);}
        .admin-table tr:hover td{background:var(--teal-light,#E6F7F5);}
        .admin-table tr:last-child td{border-bottom:none;}
        .admin-badge{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;}
        .admin-badge-open{background:#E6F7EF;color:#00A870;}
        .admin-badge-soon{background:#FFF3E6;color:#D97706;}
        .admin-badge-enrolled{background:#EBF5FF;color:#2563EB;}
        .admin-badge-waitlist{background:#F3F0FF;color:#7C3AED;}
        .admin-badge-help{background:#FEF2F2;color:#DC2626;}
        html.dark .admin-badge-open{background:rgba(0,168,112,0.2);color:#4ade80;}
        html.dark .admin-badge-soon{background:rgba(217,119,6,0.2);color:#fbbf24;}
        html.dark .admin-badge-enrolled{background:rgba(37,99,235,0.2);color:#60a5fa;}
        html.dark .admin-badge-waitlist{background:rgba(124,58,237,0.2);color:#a78bfa;}
        html.dark .admin-badge-help{background:rgba(220,38,38,0.2);color:#f87171;}
        .admin-btn-teal{background:var(--teal,#009E8E);color:white;border:none;padding:9px 18px;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;font-family:Manrope,sans-serif;transition:background 0.18s;display:inline-flex;align-items:center;gap:6px;}
        .admin-btn-teal:hover{background:#008478;}
        .admin-btn-ghost{background:none;color:var(--muted,#6B7A8D);border:1px solid var(--border,#E4E9F0);padding:8px 16px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;font-family:Manrope,sans-serif;transition:all 0.18s;display:inline-flex;align-items:center;gap:6px;}
        .admin-btn-ghost:hover{background:var(--surface,#F7F9FC);color:var(--text-primary,#0D1B2A);}
        .admin-btn-danger{background:#FEF2F2;color:#DC2626;border:1px solid #FCA5A5;padding:7px 14px;border-radius:7px;font-size:12px;font-weight:700;cursor:pointer;font-family:Manrope,sans-serif;}
        html.dark .admin-btn-danger{background:rgba(220,38,38,0.15);border-color:rgba(220,38,38,0.3);}
        .admin-btn-sm{padding:6px 12px !important;font-size:12px !important;border-radius:6px !important;}
        .admin-tab-btn{padding:8px 18px;border-radius:8px;font-size:13px;font-weight:700;border:none;cursor:pointer;background:none;color:var(--muted,#6B7A8D);font-family:Manrope,sans-serif;transition:all 0.18s;}
        .admin-tab-btn.active{background:var(--teal-light,#E6F7F5);color:var(--teal,#009E8E);}
        .admin-section-title{font-family:Syne,sans-serif;font-size:18px;font-weight:800;color:var(--text-primary,#0D1B2A);margin-bottom:4px;}
        .admin-section-sub{font-size:13px;color:var(--muted,#6B7A8D);}
        .admin-avatar{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;font-family:Syne,sans-serif;flex-shrink:0;}
        .admin-modal-overlay{display:none;position:fixed;inset:0;z-index:500;background:rgba(13,27,42,0.7);align-items:center;justify-content:center;padding:20px;}
        .admin-modal-overlay.open{display:flex;}
        .admin-modal-box{background:var(--card-bg,white);border-radius:16px;width:100%;max-width:480px;padding:28px;max-height:92vh;overflow-y:auto;position:relative;border:1px solid var(--border,#E4E9F0);}
        .admin-heatmap-cell{padding:0 8px;min-width:80px;height:32px;border-radius:5px;display:inline-flex;align-items:center;font-size:10px;font-weight:700;cursor:default;transition:transform 0.1s;}
        .admin-heatmap-cell:hover{transform:scale(1.1);}
        .hm0{background:#E6F7F5;color:#9ECDC8;}.hm1{background:#B2E8E2;color:#3D8C85;}.hm2{background:#6CD4C8;color:#1A6660;}.hm3{background:#009E8E;color:white;}.hm4{background:#006E62;color:white;}
        html.dark .hm0{background:rgba(0,196,176,0.08);color:#5ECFC6;} html.dark .hm1{background:rgba(0,196,176,0.18);color:#7DDDD6;} html.dark .hm2{background:rgba(0,196,176,0.35);color:#9EECE7;} html.dark .hm3{background:rgba(0,196,176,0.6);color:white;} html.dark .hm4{background:#00C4B0;color:#0A1520;}
      `}</style>

      <AdminSidebar active={activePage} onNavigate={setActivePage} collapsed={sidebarCollapsed} msgUnread={msgUnread}/>

      <div style={{ marginLeft: sidebarCollapsed ? 0 : 230, transition:"margin-left 0.3s", minHeight:"100vh" }}>
        <AdminTopbar activePage={activePage} onToggleSidebar={() => setSidebarCollapsed(c => !c)} onExport={exportCSV} onSearch={() => {}}/>

        <div style={{ padding:"28px 28px 60px" }}>
          {activePage === "dashboard"    && <DashboardPage signups={signups} onViewUser={id => { setModalTargetId(id); setModal("user"); }} onNavigate={p => setActivePage(p as AdminPage)}/>}
          {activePage === "analytics"    && <AnalyticsPage />}
          {activePage === "signups"      && <SignupsPage signups={signups} onUpdate={setSignups} onViewUser={id => { setModalTargetId(id); setModal("user"); }} onSendToUser={id => { setModalTargetId(id); setModal("send"); }}/>}
          {activePage === "facilitators" && <FacilitatorsPage facilitators={facilitators} onUpdate={setFacilitators} onToast={showToast}/>}
          {activePage === "messages"     && <MessagesPage conversations={conversations} onUpdate={setConversations} onToast={showToast}/>}
          {activePage === "programmes"   && <ProgrammesPage programmes={programmes} onUpdate={setProgrammes} onToast={showToast}/>}
          {activePage === "settings"     && <SettingsPage onToast={showToast}/>}
        </div>
      </div>

      <AdminModals open={modal} targetId={modalTargetId} signups={signups} facilitators={facilitators} onClose={() => setModal(null)} onToast={showToast}/>

      {/* Toast */}
      <div style={{ position:"fixed", bottom:24, left:"50%", transform:`translateX(-50%) translateY(${toastVisible?0:80}px)`, background:"var(--navy,#0D1B2A)", color:"white", padding:"12px 22px", borderRadius:30, fontSize:13, fontWeight:600, zIndex:9999, pointerEvents:"none", transition:"transform 0.3s", whiteSpace:"nowrap" }}>
        {toast}
      </div>
    </div>
  );
}