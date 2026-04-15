// components/admin/AdminModals.tsx
"use client";

import { useState } from "react";
import { Signup, Facilitator, AVATAR_BG, AVATAR_FG, initials, normalizePhone } from "./adminData";

export type AdminModalType = "user" | "send" | null;

interface Props {
  open: AdminModalType;
  targetId: number | null;
  signups: Signup[];
  facilitators: Facilitator[];
  onClose: () => void;
  onToast: (msg: string) => void;
}

export default function AdminModals({ open, targetId, signups, facilitators, onClose, onToast }: Props) {
  const [sendMsg, setSendMsg] = useState("");

  const subject = targetId
    ? (signups.find(s => s.id === targetId) || facilitators.find(f => f.id === targetId))
    : null;

  if (!open || !subject) return null;

  const ai = (subject.id ?? 0) % 5;
  const type = (subject as Signup).type ?? "enrolled";

  function doSend() {
    if (!sendMsg.trim()) { onToast("Enter a message"); return; }
    window.open(`https://wa.me/${normalizePhone(subject!.phone)}?text=${encodeURIComponent(sendMsg)}`,"_blank");
    onClose();
    onToast("Opening WhatsApp ✓");
  }

  return (
    <div className="admin-modal-overlay open" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      {open === "user" && (
        <div className="admin-modal-box" style={{ maxWidth:500 }}>
          <button style={{ position:"absolute", top:14, right:16, background:"none", border:"none", cursor:"pointer", fontSize:22, color:"var(--muted,#6B7A8D)" }} onClick={onClose}>×</button>
          <div style={{ textAlign:"center", marginBottom:20 }}>
            <div className="admin-avatar" style={{ width:52, height:52, background:AVATAR_BG[ai], color:AVATAR_FG[ai], fontSize:18, margin:"0 auto 12px" }}>{initials(subject.name)}</div>
            <div className="font-syne" style={{ fontWeight:800, fontSize:18, marginBottom:4, color:"var(--text-primary,#0D1B2A)" }}>{subject.name}</div>
            <span className={`admin-badge admin-badge-${type}`}>{type.charAt(0).toUpperCase()+type.slice(1)}</span>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:20 }}>
            {[["Phone / WA",subject.phone],["State",(subject as Signup).state||"—"],["Programme",(subject as Signup).programme||"N/A"],["Signup Date",(subject as Signup).date||"—"]].map(([label,val]) => (
              <div key={label} style={{ background:"var(--surface,#F7F9FC)", borderRadius:8, padding:12 }}>
                <div className="admin-label-sm" style={{ marginBottom:4 }}>{label}</div>
                <div style={{ fontWeight:600, fontSize:13, color:"var(--text-primary,#0D1B2A)" }}>{val}</div>
              </div>
            ))}
          </div>
          {(subject as Signup).message && (
            <div style={{ background:"#FFF3E6", borderRadius:8, padding:12, marginBottom:16, fontSize:13, color:"#92400E", fontWeight:500 }}>
              "{(subject as Signup).message}"
            </div>
          )}
          <div style={{ display:"flex", gap:8 }}>
            <button className="admin-btn-teal" style={{ flex:1 }} onClick={() => { window.open(`https://wa.me/${normalizePhone(subject.phone)}`,"_blank"); onClose(); }}>📱 Open in WhatsApp</button>
          </div>
        </div>
      )}

      {open === "send" && (
        <div className="admin-modal-box" style={{ maxWidth:420 }}>
          <button style={{ position:"absolute", top:14, right:16, background:"none", border:"none", cursor:"pointer", fontSize:22, color:"var(--muted,#6B7A8D)" }} onClick={onClose}>×</button>
          <div className="font-syne" style={{ fontWeight:800, fontSize:18, marginBottom:6, color:"var(--text-primary,#0D1B2A)" }}>Send Message</div>
          <div style={{ fontSize:13, color:"var(--muted,#6B7A8D)", marginBottom:16 }}>To: {subject.name} ({subject.phone})</div>
          <label className="admin-label-sm">Message</label>
          <textarea className="admin-input" rows={4} placeholder="Type your message..." value={sendMsg} onChange={e => setSendMsg(e.target.value)} style={{ marginBottom:12 }}/>
          <div style={{ display:"flex", gap:8 }}>
            <button className="admin-btn-teal" style={{ flex:1 }} onClick={doSend}>📱 Open in WhatsApp</button>
            <button className="admin-btn-ghost" onClick={onClose}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}