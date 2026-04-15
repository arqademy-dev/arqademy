// components/admin/pages/FacilitatorsPage.tsx
"use client";

import { useState } from "react";
import { Facilitator, AVATAR_BG, AVATAR_FG, initials, normalizePhone } from "../adminData";

interface Props {
  facilitators: Facilitator[];
  onUpdate: (f: Facilitator[]) => void;
  onToast: (msg: string) => void;
}

export default function FacilitatorsPage({ facilitators, onUpdate, onToast }: Props) {
  function remove(id: number) {
    if (!confirm("Remove this facilitator?")) return;
    onUpdate(facilitators.filter(f => f.id !== id));
    onToast("Facilitator removed");
  }

  function addFac() {
    const name = prompt("Facilitator Full Name:");
    if (!name) return;
    const phone = prompt("WhatsApp Number:");
    if (!phone) return;
    onUpdate([...facilitators, { id:Date.now(), name, phone, email:"", school:"", state:"", role:"Teacher", studentsReg:0, status:"active" }]);
    onToast("Facilitator added ✓");
  }

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div>
          <div className="font-syne admin-section-title">Facilitators</div>
          <div className="admin-section-sub">All registered facilitator applications</div>
        </div>
        <button className="admin-btn-teal" onClick={addFac}>+ Add Facilitator</button>
      </div>

      <div className="admin-card-box">
        <div style={{ overflowX:"auto" }}>
          <table className="admin-table">
            <thead><tr>
              <th>Name</th><th>Phone</th><th>Email</th><th>School</th><th>State</th>
              <th>Role</th><th>Students Reg.</th><th>Status</th><th>Actions</th>
            </tr></thead>
            <tbody>
              {facilitators.map(f => {
                const ai = f.id % 5;
                return (
                  <tr key={f.id}>
                    <td>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <div className="admin-avatar" style={{ background:AVATAR_BG[ai], color:AVATAR_FG[ai], fontSize:10 }}>{initials(f.name)}</div>
                        <span style={{ fontWeight:600, fontSize:13 }}>{f.name}</span>
                      </div>
                    </td>
                    <td style={{ fontSize:13 }}>{f.phone}</td>
                    <td style={{ fontSize:12, color:"var(--muted,#6B7A8D)" }}>{f.email}</td>
                    <td style={{ fontSize:12 }}>{f.school}</td>
                    <td style={{ fontSize:12, color:"var(--muted,#6B7A8D)" }}>{f.state}</td>
                    <td style={{ fontSize:12 }}>{f.role}</td>
                    <td><span style={{ fontWeight:700, color:"var(--teal,#009E8E)" }}>{f.studentsReg}</span></td>
                    <td><span className="admin-badge admin-badge-open">Active</span></td>
                    <td>
                      <div style={{ display:"flex", gap:5 }}>
                        <button className="admin-btn-ghost admin-btn-sm" style={{ fontSize:11 }} onClick={() => window.open(`https://wa.me/${normalizePhone(f.phone)}`,"_blank")}>📱 WA</button>
                        <button className="admin-btn-danger" onClick={() => remove(f.id)}>Remove</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}