// components/admin/pages/MessagesPage.tsx
"use client";

import { useState } from "react";
import { Conversation, AVATAR_BG, AVATAR_FG, initials, normalizePhone } from "../adminData";

interface Props {
  conversations: Conversation[];
  onUpdate: (c: Conversation[]) => void;
  onToast: (msg: string) => void;
}

export default function MessagesPage({ conversations, onUpdate, onToast }: Props) {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [input, setInput] = useState("");

  const active = conversations.find(c => c.id === activeId);

  function openThread(id: number) {
    setActiveId(id);
    onUpdate(conversations.map(c => c.id === id ? {...c, unread: false} : c));
  }

  function sendMsg() {
    if (!input.trim() || !activeId) return;
    const now = new Date().toLocaleTimeString("en",{hour:"2-digit",minute:"2-digit"});
    onUpdate(conversations.map(c => c.id === activeId
      ? {...c, messages:[...c.messages,{dir:"out" as const, text:input.trim(), time:now}]}
      : c
    ));
    setInput("");
    onToast("Message sent ✓");
  }

  return (
    <div>
      <div style={{ marginBottom:20 }}>
        <div className="font-syne admin-section-title">Messages & Help Requests</div>
        <div className="admin-section-sub">Respond directly or forward to WhatsApp</div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"280px 1fr", gap:20, minHeight:460 }}>
        {/* Thread list */}
        <div className="admin-card-box" style={{ overflowY:"auto", maxHeight:560 }}>
          <div style={{ padding:8 }}>
            {conversations.map(c => {
              const ai = c.id % 5;
              return (
                <div
                  key={c.id}
                  onClick={() => openThread(c.id)}
                  style={{
                    padding:12, borderRadius:8, cursor:"pointer", marginBottom:4,
                    display:"flex", gap:10, alignItems:"center", transition:"background 0.15s",
                    background: activeId === c.id ? "var(--teal-light,#E6F7F5)" : "transparent",
                  }}
                  onMouseOver={e => { if (activeId !== c.id) (e.currentTarget as HTMLDivElement).style.background = "var(--surface,#F7F9FC)"; }}
                  onMouseOut={e => { if (activeId !== c.id) (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
                >
                  <div className="admin-avatar" style={{ background:AVATAR_BG[c.id%5], color:AVATAR_FG[c.id%5], fontSize:11 }}>{initials(c.name)}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:"var(--text-primary,#0D1B2A)", display:"flex", alignItems:"center", gap:6 }}>
                      {c.name}
                      {c.unread && <span style={{ width:7, height:7, borderRadius:"50%", background:"var(--teal,#009E8E)", flexShrink:0 }}/>}
                    </div>
                    <div style={{ fontSize:11, color:"var(--muted,#6B7A8D)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                      {c.messages[c.messages.length-1].text}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Thread panel */}
        <div className="admin-card-box" style={{ display:"flex", flexDirection:"column", padding:0, overflow:"hidden" }}>
          {/* Header */}
          <div style={{ padding:"16px 20px", borderBottom:"1px solid var(--border,#E4E9F0)", display:"flex", alignItems:"center", gap:12 }}>
            <div className="admin-avatar" style={{ background: active ? AVATAR_BG[active.id%5] : "#E6F7F5", color: active ? AVATAR_FG[active.id%5] : "#009E8E" }}>
              {active ? initials(active.name) : "?"}
            </div>
            <div>
              <div style={{ fontWeight:700, fontSize:14, color:"var(--text-primary,#0D1B2A)" }}>{active?.name ?? "Select a conversation"}</div>
              <div style={{ fontSize:12, color:"var(--muted,#6B7A8D)" }}>{active?.phone ?? "—"}</div>
            </div>
            {active && (
              <div style={{ marginLeft:"auto" }}>
                <button className="admin-btn-ghost admin-btn-sm" onClick={() => window.open(`https://wa.me/${normalizePhone(active.phone)}`,"_blank")}>📱 Open in WhatsApp</button>
              </div>
            )}
          </div>

          {/* Messages */}
          <div style={{ flex:1, overflowY:"auto", padding:12, display:"flex", flexDirection:"column", gap:8, background:"var(--surface,#F7F9FC)", borderBottom:"1px solid var(--border,#E4E9F0)" }}>
            {active
              ? active.messages.map((m,i) => (
                <div key={i} style={{ maxWidth:"76%", padding:"9px 13px", borderRadius:12, fontSize:13, lineHeight:1.5, background: m.dir==="out" ? "var(--teal,#009E8E)" : "var(--card-bg,white)", color: m.dir==="out" ? "white" : "var(--text-primary,#0D1B2A)", alignSelf: m.dir==="out" ? "flex-end" : "flex-start", border: m.dir==="in" ? "1px solid var(--border,#E4E9F0)" : "none", borderBottomRightRadius: m.dir==="out" ? 3 : 12, borderBottomLeftRadius: m.dir==="in" ? 3 : 12 }}>
                  {m.text}
                  <div style={{ fontSize:10, opacity:0.55, marginTop:4, textAlign:"right" }}>{m.time}</div>
                </div>
              ))
              : <div style={{ textAlign:"center", color:"var(--muted,#6B7A8D)", fontSize:13, margin:"auto" }}>Select a thread to read</div>
            }
          </div>

          {/* Reply */}
          <div style={{ padding:"12px 16px", display:"flex", gap:8 }}>
            <input className="admin-input" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==="Enter" && sendMsg()} placeholder="Type a reply…" style={{ flex:1 }}/>
            <button className="admin-btn-teal admin-btn-sm" onClick={sendMsg}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}