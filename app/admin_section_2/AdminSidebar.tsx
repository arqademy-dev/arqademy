// components/admin/AdminSidebar.tsx
"use client";

export type AdminPage =
  | "dashboard" | "analytics" | "signups"
  | "facilitators" | "messages" | "programmes" | "settings";

interface Props {
  active: AdminPage;
  onNavigate: (page: AdminPage) => void;
  collapsed: boolean;
  msgUnread: number;
}

const NAV_SECTIONS = [
  {
    label: "OVERVIEW",
    items: [
      { id: "dashboard" as AdminPage, label: "Dashboard", icon:<><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/> </> },
      { id: "analytics" as AdminPage, label: "Analytics & Heatmap", icon: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/> },
    ],
  },
  {
    label: "USERS",
    items: [
      { id: "signups" as AdminPage, label: "All Signups", icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></> },
      { id: "facilitators" as AdminPage, label: "Facilitators", icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.68a16 16 0 0 0 6 6l.94-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z"/> },
      { id: "messages" as AdminPage, label: "Messages", icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/> },
    ],
  },
  {
    label: "PROGRAMMES",
    items: [
      { id: "programmes" as AdminPage, label: "Programmes", icon: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></> },
    ],
  },
  {
    label: "ACCOUNT",
    items: [
      { id: "settings" as AdminPage, label: "Settings", icon: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></> },
    ],
  },
];

function NavIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{flexShrink:0}}>
      {children}
    </svg>
  );
}

export default function AdminSidebar({ active, onNavigate, collapsed, msgUnread }: Props) {
  return (
    <aside
      className={`fixed top-0 left-0 z-[100] min-h-screen flex flex-col transition-transform duration-300 ${collapsed ? "-translate-x-[230px]" : "translate-x-0"}`}
      style={{ width: 230, background: "#0A1520", borderRight: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Brand */}
      <div style={{ padding:"16px 18px 12px", borderBottom:"1px solid rgba(255,255,255,0.07)", marginBottom:10 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div className="font-syne" style={{ fontWeight:800, fontSize:17, color:"white", whiteSpace:"nowrap" }}>
            ARQ<span style={{ color:"#009E8E" }}>ADEMY</span>
            <span style={{ fontSize:9, display:"block", textAlign:"center", marginTop:5, fontWeight:700, background:"rgba(0,158,142,0.22)", color:"#00C4A0", padding:"2px 7px", borderRadius:8, letterSpacing:"0.8px", whiteSpace:"nowrap" }}>
              ADMIN
            </span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div style={{ padding:"8px 10px", flex:1, overflowY:"auto" }}>
        {NAV_SECTIONS.map(section => (
          <div key={section.label}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:"1.5px", color:"rgba(255,255,255,0.25)", padding:"0 8px", margin:"14px 0 8px" }}>
              {section.label}
            </div>
            {section.items.map(item => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  style={{
                    display:"flex", alignItems:"center", gap:10, padding:"10px 18px",
                    borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:600,
                    color: isActive ? "#009E8E" : "rgba(255,255,255,0.55)",
                    background: isActive ? "rgba(0,158,142,0.18)" : "none",
                    border:0, width:"100%", textAlign:"left", fontFamily:"Manrope,sans-serif",
                    transition:"all 0.18s",
                  }}
                >
                  <NavIcon>{item.icon}</NavIcon>
                  {item.label}
                  {item.id === "messages" && msgUnread > 0 && (
                    <span style={{ marginLeft:"auto", background:"#E53E3E", color:"white", borderRadius:10, padding:"1px 7px", fontSize:10, fontWeight:800 }}>
                      {msgUnread}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer user */}
      <div style={{ padding:"14px 18px", borderTop:"1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:32, height:32, borderRadius:"50%", background:"rgba(0,158,142,0.2)", color:"#009E8E", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:800, fontFamily:"Syne,sans-serif", flexShrink:0 }}>SA</div>
          <div>
            <div style={{ fontSize:12, fontWeight:700, color:"white" }}>Super Admin</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.35)" }}>ARQademy HQ</div>
          </div>
        </div>
      </div>
    </aside>
  );
}