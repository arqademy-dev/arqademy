// components/admin/pages/SignupsPage.tsx
"use client";

import { useState, useMemo } from "react";
import { Signup, SignupType, AVATAR_BG, AVATAR_FG, PROG_NAMES, NIGERIA_STATES, initials } from "../adminData";

interface Props {
  signups: Signup[];
  onUpdate: (updated: Signup[]) => void;
  onViewUser: (id: number) => void;
  onSendToUser: (id: number) => void;
}

function Badge({ type }: { type: string }) {
  const cls: Record<string, string> = { enrolled:"admin-badge-enrolled", waitlist:"admin-badge-waitlist", help:"admin-badge-help" };
  return <span className={`admin-badge ${cls[type]||"admin-badge-enrolled"}`}>{type.charAt(0).toUpperCase()+type.slice(1)}</span>;
}

export default function SignupsPage({ signups, onUpdate, onViewUser, onSendToUser }: Props) {
  const [filter, setFilter] = useState<SignupType | "all">("all");
  const [search, setSearch] = useState("");
  const [prog, setProg] = useState("");
  const [state, setState] = useState("");
  const states = useMemo(() => [...new Set(NIGERIA_STATES.map(x => x.s))].sort(), []);

  const filtered = useMemo(() => signups.filter(s => {
    if (filter !== "all" && s.type !== filter) return false;
    if (prog && s.programme !== prog) return false;
    if (state && s.state !== state) return false;
    const q = search.toLowerCase();
    if (q && !(s.name.toLowerCase().includes(q) || s.state.toLowerCase().includes(q) || s.programme.toLowerCase().includes(q) || s.phone.includes(q))) return false;
    return true;
  }), [signups, filter, search, prog, state]);

  function toggleSelect(id: number, checked: boolean) {
    onUpdate(signups.map(s => s.id === id ? {...s, selected: checked} : s));
  }
  function toggleAll(checked: boolean) {
    onUpdate(signups.map(s => ({...s, selected: checked})));
  }

  const selectedCount = signups.filter(s => s.selected).length;

  const TABS: {key: SignupType | "all"; label: string}[] = [
    {key:"all",label:"All"},{key:"enrolled",label:"Enrolled"},
    {key:"waitlist",label:"Waitlist"},{key:"help",label:"Help Requests"}
  ];

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, flexWrap:"wrap", gap:12 }}>
        <div>
          <div className="font-syne admin-section-title">All Signups</div>
          <div className="admin-section-sub">Every form submission from your programmes page</div>
        </div>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          {TABS.map(t => (
            <button key={t.key} onClick={() => setFilter(t.key)} className={`admin-tab-btn${filter===t.key?" active":""}`}>{t.label}</button>
          ))}
        </div>
      </div>

      {/* Filter bar */}
      <div style={{ display:"flex", gap:10, marginBottom:16, flexWrap:"wrap" }}>
        <div style={{ position:"relative", flex:1, minWidth:200 }}>
          <input className="admin-input" placeholder="Search by name, state, programme..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft:34 }}/>
          <svg style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted,#6B7A8D)" strokeWidth={2}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        </div>
        <select className="admin-input" value={prog} onChange={e => setProg(e.target.value)} style={{ width:"auto", minWidth:160 }}>
          <option value="">All Programmes</option>
          {PROG_NAMES.map(p => <option key={p}>{p}</option>)}
        </select>
        <select className="admin-input" value={state} onChange={e => setState(e.target.value)} style={{ width:"auto", minWidth:130 }}>
          <option value="">All States</option>
          {states.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="admin-card-box">
        <div style={{ overflowX:"auto" }}>
          <table className="admin-table">
            <thead><tr>
              <th><input type="checkbox" onChange={e => toggleAll(e.target.checked)} style={{ accentColor:"#009E8E" }}/></th>
              <th>Name</th><th>Phone</th><th>State</th><th>Programme</th><th>Type</th><th>Message</th><th>Date</th><th>Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map(s => {
                const ai = s.id % 5;
                return (
                  <tr key={s.id}>
                    <td><input type="checkbox" checked={s.selected} onChange={e => toggleSelect(s.id, e.target.checked)} style={{ accentColor:"#009E8E" }}/></td>
                    <td>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <div className="admin-avatar" style={{ background:AVATAR_BG[ai], color:AVATAR_FG[ai], fontSize:10 }}>{initials(s.name)}</div>
                        <span style={{ fontWeight:600, fontSize:13 }}>{s.name}</span>
                      </div>
                    </td>
                    <td style={{ fontSize:13 }}>{s.phone}</td>
                    <td style={{ fontSize:12, color:"var(--muted,#6B7A8D)" }}>{s.state}</td>
                    <td style={{ fontSize:12 }}>{s.programme}</td>
                    <td><Badge type={s.type}/></td>
                    <td>
                      {s.message
                        ? <span style={{ fontSize:12, color:"var(--muted,#6B7A8D)", maxWidth:140, display:"block", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }} title={s.message}>{s.message}</span>
                        : <span style={{ color:"var(--border,#E4E9F0)", fontSize:12 }}>—</span>}
                    </td>
                    <td style={{ fontSize:12, color:"var(--muted,#6B7A8D)" }}>{s.date}</td>
                    <td>
                      <div style={{ display:"flex", gap:5 }}>
                        <button className="admin-btn-ghost admin-btn-sm" style={{ padding:"5px 9px" }} onClick={() => onViewUser(s.id)} title="View">👁</button>
                        <button className="admin-btn-ghost admin-btn-sm" style={{ padding:"5px 9px" }} onClick={() => onSendToUser(s.id)} title="Message">💬</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ padding:"14px 18px", borderTop:"1px solid var(--border,#E4E9F0)", display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:13, color:"var(--muted,#6B7A8D)" }}>{selectedCount} selected</span>
          <button className="admin-btn-ghost admin-btn-sm">💬 Bulk WhatsApp</button>
          <button className="admin-btn-ghost admin-btn-sm">⬇ Export Selected</button>
        </div>
      </div>
    </div>
  );
}