// components/admin/pages/SettingsPage.tsx
"use client";

interface Props { onToast: (msg: string) => void; }

export default function SettingsPage({ onToast }: Props) {
  return (
    <div>
      <div style={{ marginBottom:22 }}>
        <div className="font-syne admin-section-title">Settings</div>
        <div className="admin-section-sub">Platform configuration</div>
      </div>
      <div style={{ maxWidth:520, display:"flex", flexDirection:"column", gap:18 }}>
        {/* Contact */}
        <div className="admin-card-box" style={{ padding:22 }}>
          <div className="font-syne" style={{ fontWeight:800, fontSize:15, marginBottom:16, color:"var(--text-primary,#0D1B2A)" }}>Contact Details</div>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {[["WhatsApp Number","08148810822"],["Support Email","hello@arqademy.ng"],["Brochure PDF Link","https://drive.google.com/..."]].map(([l,v]) => (
              <div key={l}>
                <label className="admin-label-sm">{l}</label>
                <input className="admin-input" defaultValue={v}/>
              </div>
            ))}
            <button className="admin-btn-teal" style={{ width:"fit-content" }} onClick={() => onToast("Contact details saved ✓")}>Save Changes</button>
          </div>
        </div>

        {/* Password */}
        <div className="admin-card-box" style={{ padding:22 }}>
          <div className="font-syne" style={{ fontWeight:800, fontSize:15, marginBottom:16, color:"var(--text-primary,#0D1B2A)" }}>Admin Password</div>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <div><label className="admin-label-sm">Current Password</label><input className="admin-input" type="password" placeholder="••••••••"/></div>
            <div><label className="admin-label-sm">New Password</label><input className="admin-input" type="password" placeholder="••••••••"/></div>
            <button className="admin-btn-teal" style={{ width:"fit-content" }} onClick={() => onToast("Password updated ✓")}>Save Changes</button>
          </div>
        </div>

        {/* Notifications */}
        <div className="admin-card-box" style={{ padding:22 }}>
          <div className="font-syne" style={{ fontWeight:800, fontSize:15, marginBottom:16, color:"var(--text-primary,#0D1B2A)" }}>Notification Preferences</div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {[["Email on new signup",true],["Email on facilitator application",true],["Daily summary digest",false]].map(([label,def]) => (
              <label key={label as string} style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer", fontSize:13, fontWeight:600, color:"var(--text-primary,#0D1B2A)" }}>
                <input type="checkbox" defaultChecked={def as boolean} style={{ accentColor:"#009E8E", width:15, height:15 }}/> {label}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}