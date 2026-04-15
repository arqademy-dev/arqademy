// components/admin/pages/DashboardPage.tsx
"use client";

import { useEffect } from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { Signup, AVATAR_BG, AVATAR_FG, PROG_NAMES, initials } from "../adminData";

const SIGNUP_TREND = [
  {d:"Apr 1",v:3},{d:"Apr 4",v:5},{d:"Apr 7",v:4},{d:"Apr 10",v:8},{d:"Apr 13",v:6},{d:"Apr 16",v:11},
  {d:"Apr 19",v:9},{d:"Apr 22",v:14},{d:"Apr 25",v:12},{d:"Apr 28",v:18},{d:"May 1",v:15},{d:"May 4",v:22},{d:"May 7",v:19},{d:"May 10",v:26},
];

const PROG_DIST = [
  {name:"JAMB/WAEC",value:48},{name:"Pathway",value:41},{name:"Qampus",value:18},
  {name:"Founders",value:12},{name:"Q-Lamp",value:7},{name:"Qloud Box",value:16},
];
const PIE_COLORS = ["#009E8E","#2563EB","#D97706","#7C3AED","#00A870","#E53E3E"];

interface Props {
  signups: Signup[];
  onViewUser: (id: number) => void;
  onNavigate: (page: string) => void;
}

function StatCard({ label, value, delta, deltaType }: { label: string; value: string | number; delta: string; deltaType?: "up"|"down"|"neutral" }) {
  const color = deltaType === "up" ? "#00A870" : deltaType === "down" ? "#E53E3E" : "var(--muted, #6B7A8D)";
  return (
    <div className="admin-stat-card">
      <div style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"1.5px", color:"var(--muted,#6B7A8D)", marginBottom:8 }}>{label}</div>
      <div className="font-syne" style={{ fontSize:30, fontWeight:800, color:"var(--text-primary,#0D1B2A)", lineHeight:1 }}>{value}</div>
      <div style={{ fontSize:12, fontWeight:600, marginTop:6, color }}>{delta}</div>
    </div>
  );
}

function Badge({ type }: { type: string }) {
  const map: Record<string, string> = { enrolled:"admin-badge-enrolled", waitlist:"admin-badge-waitlist", help:"admin-badge-help" };
  return <span className={`admin-badge ${map[type]||"admin-badge-enrolled"}`}>{type.charAt(0).toUpperCase()+type.slice(1)}</span>;
}

export default function DashboardPage({ signups, onViewUser, onNavigate }: Props) {
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom:22 }}>
        <div className="font-syne admin-section-title">Overview</div>
        <div className="admin-section-sub">Platform snapshot — all time</div>
      </div>

      {/* KPI cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:16, marginBottom:28 }}>
        <StatCard label="Total Signups" value="142" delta="↑ 18 this week" deltaType="up" />
        <StatCard label="Enrolled" value="89" delta="↑ 11 this week" deltaType="up" />
        <StatCard label="Waitlisted" value="31" delta="Stable" deltaType="neutral" />
        <StatCard label="Facilitators" value="22" delta="↑ 4 this month" deltaType="up" />
        <StatCard label="Help Requests" value="17" delta="↑ 3 unanswered" deltaType="down" />
        <StatCard label="Avg. Enrol Rate" value="63%" delta="↑ 5% vs last month" deltaType="up" />
      </div>

      {/* Charts row */}
      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:20, marginBottom:24 }}>
        <div className="admin-card-box" style={{ padding:20 }}>
          <div className="font-syne" style={{ fontWeight:800, fontSize:15, marginBottom:16, color:"var(--text-primary,#0D1B2A)" }}>Signups Over Time</div>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={SIGNUP_TREND}>
              <XAxis dataKey="d" tick={{fontSize:11}} tickLine={false} axisLine={false}/>
              <YAxis tick={{fontSize:11}} tickLine={false} axisLine={false} width={28}/>
              <Tooltip contentStyle={{fontSize:12,borderRadius:8}}/>
              <Line type="monotone" dataKey="v" stroke="#009E8E" strokeWidth={2} dot={{r:3,fill:"#009E8E"}} name="Signups"/>
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="admin-card-box" style={{ padding:20 }}>
          <div className="font-syne" style={{ fontWeight:800, fontSize:15, marginBottom:16, color:"var(--text-primary,#0D1B2A)" }}>By Programme</div>
          <ResponsiveContainer width="100%" height={190}>
            <PieChart>
              <Pie data={PROG_DIST} cx="50%" cy="45%" innerRadius={48} outerRadius={72} dataKey="value">
                {PROG_DIST.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{fontSize:11,borderRadius:8}}/>
              <Legend iconSize={10} wrapperStyle={{fontSize:11}}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent signups table */}
      <div className="admin-card-box">
        <div style={{ padding:"18px 20px 14px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid var(--border,#E4E9F0)" }}>
          <div className="font-syne" style={{ fontWeight:800, fontSize:15, color:"var(--text-primary,#0D1B2A)" }}>Recent Signups</div>
          <button className="admin-btn-ghost admin-btn-sm" onClick={() => onNavigate("signups")}>View All →</button>
        </div>
        <div style={{ overflowX:"auto" }}>
          <table className="admin-table">
            <thead><tr><th>Name</th><th>Programme</th><th>State</th><th>Type</th><th>Date</th><th>Action</th></tr></thead>
            <tbody>
              {signups.slice(0,8).map(s => {
                const ai = s.id % 5;
                return (
                  <tr key={s.id}>
                    <td>
                      <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                        <div className="admin-avatar" style={{ background:AVATAR_BG[ai], color:AVATAR_FG[ai], fontSize:11 }}>{initials(s.name)}</div>
                        <span style={{ fontWeight:600 }}>{s.name}</span>
                      </div>
                    </td>
                    <td style={{ fontSize:12, fontWeight:600 }}>{s.programme}</td>
                    <td style={{ fontSize:12, color:"var(--muted,#6B7A8D)" }}>{s.state}</td>
                    <td><Badge type={s.type}/></td>
                    <td style={{ fontSize:12, color:"var(--muted,#6B7A8D)" }}>{s.date}</td>
                    <td><button className="admin-btn-ghost admin-btn-sm" onClick={() => onViewUser(s.id)}>View</button></td>
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