// components/admin/pages/AnalyticsPage.tsx
"use client";

import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { NIGERIA_STATES } from "../adminData";

const TRAFFIC = [
  {wk:"Wk 1",views:820,unique:260},{wk:"Wk 2",views:1040,unique:340},
  {wk:"Wk 3",views:980,unique:320},{wk:"Wk 4",views:972,unique:320},
];

const FUNNEL = [
  {label:"Visitors",value:1240,pct:100},{label:"Form Opens",value:487,pct:39},
  {label:"Submitted",value:142,pct:11.5},{label:"Enrolled",value:89,pct:7.2},
];

const DEVICE_DATA = [{name:"Mobile",value:74},{name:"Desktop",value:21},{name:"Tablet",value:5}];
const SOURCE_DATA = [
  {src:"WhatsApp",v:41},{src:"Direct",v:22},{src:"Instagram",v:18},
  {src:"Facebook",v:11},{src:"Google",v:5},{src:"Other",v:3},
];
const PIE_COLORS = ["#009E8E","#2563EB","#D97706"];

function hmClass(n: number) {
  if (n === 0) return "hm0";
  if (n < 3) return "hm1";
  if (n < 8) return "hm2";
  if (n < 15) return "hm3";
  return "hm4";
}

export default function AnalyticsPage() {
  return (
    <div>
      <div style={{ marginBottom:22 }}>
        <div className="font-syne admin-section-title">Analytics & Heatmap</div>
        <div className="admin-section-sub">Traffic patterns, conversion, and signups by state</div>
      </div>

      {/* Top metrics */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:14, marginBottom:24 }}>
        {[["Page Views","3,812","↑ 12%","up"],["Unique Visitors","1,240","↑ 8%","up"],["Bounce Rate","38%","↑ 2%","down"],["Avg. Session","3:42","↑ 18s","up"],["Form Opens","487","↑ 22%","up"],["Conversions","142","29.2%","up"]].map(([l,v,d,t]) => (
          <div key={l} className="admin-stat-card">
            <div style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"1.5px", color:"var(--muted,#6B7A8D)", marginBottom:8 }}>{l}</div>
            <div className="font-syne" style={{ fontSize:28, fontWeight:800, color:"var(--text-primary,#0D1B2A)", lineHeight:1 }}>{v}</div>
            <div style={{ fontSize:12, fontWeight:600, marginTop:6, color:t==="up"?"#00A870":t==="down"?"#E53E3E":"var(--muted)" }}>{d}</div>
          </div>
        ))}
      </div>

      {/* Traffic + Funnel */}
      <div style={{ display:"grid", gridTemplateColumns:"1.6fr 1fr", gap:20, marginBottom:24 }}>
        <div className="admin-card-box" style={{ padding:20 }}>
          <div className="font-syne" style={{ fontWeight:800, fontSize:15, marginBottom:16, color:"var(--text-primary,#0D1B2A)" }}>Weekly Traffic (4 weeks)</div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={TRAFFIC} barGap={4}>
              <XAxis dataKey="wk" tick={{fontSize:11}} tickLine={false} axisLine={false}/>
              <YAxis tick={{fontSize:11}} tickLine={false} axisLine={false} width={38}/>
              <Tooltip contentStyle={{fontSize:12,borderRadius:8}}/>
              <Legend iconSize={10} wrapperStyle={{fontSize:11}}/>
              <Bar dataKey="views" name="Page Views" fill="rgba(0,158,142,0.7)" radius={[4,4,0,0]}/>
              <Bar dataKey="unique" name="Unique Visitors" fill="rgba(0,158,142,0.22)" radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="admin-card-box" style={{ padding:20 }}>
          <div className="font-syne" style={{ fontWeight:800, fontSize:15, marginBottom:20, color:"var(--text-primary,#0D1B2A)" }}>Enrolment Funnel</div>
          {FUNNEL.map(f => (
            <div key={f.label} style={{ marginBottom:12 }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, fontWeight:600, marginBottom:4 }}>
                <span style={{ color:"var(--text-primary,#0D1B2A)" }}>{f.label}</span>
                <span style={{ color:"#009E8E" }}>{f.value.toLocaleString()} <span style={{ color:"var(--muted)", fontWeight:500 }}>({f.pct}%)</span></span>
              </div>
              <div style={{ height:10, background:"var(--border,#E4E9F0)", borderRadius:5, overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${f.pct}%`, background:"#009E8E", borderRadius:5, transition:"width 0.8s" }}/>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Heatmap */}
      <div className="admin-card-box" style={{ padding:20, marginBottom:24 }}>
        <div className="font-syne" style={{ fontWeight:800, fontSize:15, marginBottom:6, color:"var(--text-primary,#0D1B2A)" }}>Signups by Nigerian State</div>
        <div style={{ fontSize:12, color:"var(--muted,#6B7A8D)", marginBottom:16 }}>Hover to see exact count</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
          {NIGERIA_STATES.map(({s,n}) => (
            <div
              key={s}
              title={`${s}: ${n} signups`}
              className={`admin-heatmap-cell ${hmClass(n)}`}
            >
              <span style={{ marginRight:4 }}>{s}</span>
              <span style={{ opacity:0.7 }}>{n}</span>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:14 }}>
          <span style={{ fontSize:11, color:"var(--muted)" }}>Low</span>
          {["#E6F7F5","#B2E8E2","#6CD4C8","#009E8E","#006E62"].map(c => (
            <div key={c} style={{ width:20, height:12, borderRadius:3, background:c }}/>
          ))}
          <span style={{ fontSize:11, color:"var(--muted)" }}>High</span>
        </div>
      </div>

      {/* Device + Source */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        <div className="admin-card-box" style={{ padding:20 }}>
          <div className="font-syne" style={{ fontWeight:800, fontSize:15, marginBottom:16, color:"var(--text-primary,#0D1B2A)" }}>Device Breakdown</div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={DEVICE_DATA} cx="50%" cy="45%" innerRadius={46} outerRadius={68} dataKey="value">
                {DEVICE_DATA.map((_,i) => <Cell key={i} fill={PIE_COLORS[i]}/>)}
              </Pie>
              <Tooltip contentStyle={{fontSize:11,borderRadius:8}}/>
              <Legend iconSize={10} wrapperStyle={{fontSize:11}}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="admin-card-box" style={{ padding:20 }}>
          <div className="font-syne" style={{ fontWeight:800, fontSize:15, marginBottom:16, color:"var(--text-primary,#0D1B2A)" }}>Traffic Sources</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={SOURCE_DATA} layout="vertical" barSize={10}>
              <XAxis type="number" tick={{fontSize:11}} tickLine={false} axisLine={false}/>
              <YAxis type="category" dataKey="src" tick={{fontSize:11}} tickLine={false} axisLine={false} width={72}/>
              <Tooltip contentStyle={{fontSize:12,borderRadius:8}}/>
              <Bar dataKey="v" fill="rgba(0,158,142,0.75)" radius={[0,4,4,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}