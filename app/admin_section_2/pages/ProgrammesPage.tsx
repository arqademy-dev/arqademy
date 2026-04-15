// components/admin/pages/ProgrammesPage.tsx
"use client";

import { useState } from "react";
import { Programme } from "../adminData";

interface Props {
  programmes: Programme[];
  onUpdate: (p: Programme[]) => void;
  onToast: (msg: string) => void;
}

const EMPTY: Omit<Programme,"id"> = { name:"", desc:"", track:"", status:"open", cta:"", count:0 };

export default function ProgrammesPage({ programmes, onUpdate, onToast }: Props) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState<Omit<Programme,"id">>(EMPTY);
  const [editId, setEditId] = useState<number|null>(null);

  function openNew() { setForm(EMPTY); setEditId(null); setModal(true); }
  function openEdit(p: Programme) { setForm({name:p.name,desc:p.desc,track:p.track,status:p.status,cta:p.cta,count:p.count}); setEditId(p.id); setModal(true); }

  function save() {
    if (!form.name.trim()) { onToast("Programme name required"); return; }
    if (editId) {
      onUpdate(programmes.map(p => p.id===editId ? {...p,...form} : p));
    } else {
      onUpdate([...programmes, {id:Date.now(),...form}]);
    }
    setModal(false);
    onToast("Programme saved ✓");
  }

  function toggleStatus(id: number) {
    onUpdate(programmes.map(p => p.id===id ? {...p, status:p.status==="open"?"soon":"open"} : p));
    onToast("Status updated ✓");
  }

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div>
          <div className="font-syne admin-section-title">Programmes</div>
          <div className="admin-section-sub">Manage all ARQademy programmes</div>
        </div>
        <button className="admin-btn-teal" onClick={openNew}>+ New Programme</button>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:18 }}>
        {programmes.map(p => (
          <div key={p.id} className="admin-prog-card">
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:10 }}>
              <span className={`admin-badge ${p.status==="open"?"admin-badge-open":"admin-badge-soon"}`}>{p.status==="open"?"Now Open":"Coming Soon"}</span>
              <span style={{ fontSize:12, fontWeight:700, color:"var(--teal,#009E8E)" }}>{p.count} signups</span>
            </div>
            <div className="font-syne" style={{ fontWeight:800, fontSize:15, color:"var(--text-primary,#0D1B2A)", marginBottom:6 }}>{p.name}</div>
            <div style={{ fontSize:12, color:"var(--muted,#6B7A8D)", lineHeight:1.6, marginBottom:12 }}>{p.desc}</div>
            <div style={{ display:"flex", gap:8 }}>
              <button className="admin-btn-ghost admin-btn-sm" style={{ flex:1 }} onClick={() => openEdit(p)}>✏ Edit</button>
              <button className="admin-btn-ghost admin-btn-sm" style={{ fontSize:11 }} onClick={() => toggleStatus(p.id)}>Toggle Status</button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit modal */}
      {modal && (
        <div className="admin-modal-overlay open" onClick={e => { if (e.target === e.currentTarget) setModal(false); }}>
          <div className="admin-modal-box">
            <button style={{ position:"absolute", top:14, right:16, background:"none", border:"none", cursor:"pointer", fontSize:22, color:"var(--muted,#6B7A8D)" }} onClick={() => setModal(false)}>×</button>
            <div className="font-syne" style={{ fontWeight:800, fontSize:18, marginBottom:18, color:"var(--text-primary,#0D1B2A)" }}>{editId?"Edit Programme":"New Programme"}</div>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {[["Programme Name","name","text","e.g. JAMB / WAEC Resit"],["Target Audience","track","text","e.g. secondary, awaiting"],["CTA Button Label","cta","text","e.g. Start Here, Join Waitlist"]].map(([label,key,type,ph]) => (
                <div key={key}>
                  <label className="admin-label-sm">{label}</label>
                  <input className="admin-input" type={type} placeholder={ph} value={(form as Record<string,any>)[key]} onChange={e => setForm(f => ({...f,[key]:e.target.value}))}/>
                </div>
              ))}
              <div>
                <label className="admin-label-sm">Short Description</label>
                <textarea className="admin-input" rows={3} value={form.desc} onChange={e => setForm(f => ({...f,desc:e.target.value}))} placeholder="Describe what students get..."/>
              </div>
              <div>
                <label className="admin-label-sm">Status</label>
                <select className="admin-input" value={form.status} onChange={e => setForm(f => ({...f,status:e.target.value as "open"|"soon"}))}>
                  <option value="open">Now Open</option>
                  <option value="soon">Coming Soon</option>
                </select>
              </div>
              <div style={{ display:"flex", gap:10 }}>
                <button className="admin-btn-teal" style={{ flex:1 }} onClick={save}>Save Programme</button>
                <button className="admin-btn-ghost" onClick={() => setModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}