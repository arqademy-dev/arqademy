// components/ProgramsSection.tsx
"use client";

import { useState } from "react";

/* ── Types ── */
type FilterKey = "all" | "secondary" | "awaiting" | "undergraduate";

interface Program {
  id: string;
  title: string;
  desc: string;
  track: string;
  status: "open" | "soon";
  gradient: string;
  imgSrc: string;
  imgAlt: string;
  btnLabel: string;
}

const PROGRAMS: Program[] = [
  {
    id: "jamb",
    title: "Resit JAMB / WAEC",
    desc: "We will guide you step by step to prepare with confidence and make sure you succeed this time around.",
    track: "graduate awaiting",
    status: "open",
    gradient: "linear-gradient(135deg,#7A3B00,#D97706)",
    imgSrc: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=75&auto=format&fit=crop&crop=faces",
    imgAlt: "JAMB WAEC",
    btnLabel: "Start Here →",
  },
  {
    id: "pathway",
    title: "Prepare for University",
    desc: "We will prepare you for university and position you to access opportunities beyond the classroom.",
    track: "graduate awaiting",
    status: "open",
    gradient: "linear-gradient(135deg,#004D44,#009E8E)",
    imgSrc: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=75&auto=format&fit=crop",
    imgAlt: "Pathway Programme",
    btnLabel: "Start Here →",
  },
  {
    id: "qampus",
    title: "Build university income skills",
    desc: "Develop skills that convert your learning into earning and avoid the struggle of finding a job when you graduate.",
    track: "undergraduate",
    status: "soon",
    gradient: "linear-gradient(135deg,#003320,#00704A)",
    imgSrc: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=75&auto=format&fit=crop",
    imgAlt: "Qampus Programme",
    btnLabel: "Join Waitlist →",
  },
  {
    id: "founders",
    title: "Founders Academy",
    desc: "Have an idea? This is where we help you refine, build, and launch a startup for real impact.",
    track: "undergraduate",
    status: "soon",
    gradient: "linear-gradient(135deg,#1A2A3A,#2D4A6A)",
    imgSrc: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=75&auto=format&fit=crop",
    imgAlt: "Founders Academy",
    btnLabel: "Join Waitlist →",
  },
  {
    id: "qlamp",
    title: "Q-Lamp",
    desc: "A platform that prepares students for JAMB and WAEC within schools.",
    track: "tools secondary",
    status: "soon",
    gradient: "linear-gradient(135deg,#0A1628,#1A4080)",
    imgSrc: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=75&auto=format&fit=crop",
    imgAlt: "Q-Lamp",
    btnLabel: "Install ↓",
  },
  {
    id: "qloud",
    title: "Qloud Box",
    desc: "An offline platform that gives students in underserved communities access to resources, guides, and opportunities.",
    track: "tools secondary",
    status: "soon",
    gradient: "linear-gradient(135deg,#4A1500,#B94020)",
    imgSrc: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=75&auto=format&fit=crop",
    imgAlt: "Qloud Box",
    btnLabel: "Install ↓",
  },
];

/* ── Props passed up to ModalManager ── */
interface ProgramsSectionProps {
  onOpenModal: (type: "enroll" | "help" | "facilitator", label?: string) => void;
}

export default function ProgramsSection({ onOpenModal }: ProgramsSectionProps) {
  const [filter, setFilter] = useState<FilterKey>("all");

  function visible(p: Program) {
    if (filter === "all") return true;
    return p.track.includes(filter);
  }

  /* Sidebar item renderer */
  function SidebarItem({ id, label }: { id: FilterKey; label: string }) {
    const active = filter === id;
    return (
      <button
        className={`sidebar-item sidebar-item-btn w-full flex items-center gap-[10px] py-2 text-[14px] font-medium cursor-pointer border-0 bg-transparent font-manrope text-left ${
          active ? "active text-[#009E8E] font-bold" : "text-[#1A2332] dark:text-slate-300"
        }`}
        onClick={() => setFilter(id)}
      >
        <span
          className="checkbox-icon w-4 h-4 rounded-[3px] flex-shrink-0 flex items-center justify-center"
          style={{
            border: active ? "none" : "1.5px solid #E4E9F0",
            background: active ? "#009E8E" : "white",
          }}
        >
          {active && (
            <svg className="w-[10px] h-[10px]" viewBox="0 0 10 8" fill="none" stroke="white" strokeWidth={2.5}>
              <polyline points="1,4 4,7 9,1" />
            </svg>
          )}
        </span>
        {label}
      </button>
    );
  }

  return (
    <div className="shell-wrap dark:bg-[#0D1B2A]">
      <div className="shell-inner max-w-[1240px] mx-auto px-6 md:px-12 pt-10 pb-20 gap-10 flex items-start">

        {/* ── SIDEBAR DESKTOP ── */}
        <aside className="sidebar-desktop w-[220px] flex-shrink-0 sticky top-[80px]">
          <div className="mb-7">
            {/* All Programs */}
            <button
              className="flex items-center gap-2 px-[14px] py-[10px] rounded-lg text-[14px] font-bold cursor-pointer mb-5 border-0 w-full text-left font-manrope transition-colors"
              style={{
                background: filter === "all" ? "#E6F7F5" : "transparent",
                color: filter === "all" ? "#009E8E" : "#6B7A8D",
              }}
              onClick={() => setFilter("all")}
            >
              <span className="w-4 h-4 bg-[#009E8E] rounded-[3px] flex items-center justify-center flex-shrink-0">
                <svg className="w-[10px] h-[10px]" viewBox="0 0 10 8" fill="none" stroke="white" strokeWidth={2.5}>
                  <polyline points="1,4 4,7 9,1" />
                </svg>
              </span>
              All Programs
            </button>

            <div className="text-[10px] font-bold tracking-[2px] text-[#6B7A8D] uppercase mb-[10px]">
              Explore by Track
            </div>

            <SidebarItem id="secondary" label="Secondary Schools" />
            <SidebarItem id="awaiting" label="Awaiting Admission" />
            <SidebarItem id="undergraduate" label="Undergraduate" />
          </div>
        </aside>

        {/* ── SIDEBAR MOBILE (chips) ── */}
        <div className="sidebar-mobile flex flex-wrap gap-2 w-full mb-4">
          {(["all", "secondary", "awaiting", "undergraduate"] as FilterKey[]).map((key) => (
            <button
              key={key}
              className={`flex items-center gap-2 px-3 py-[6px] rounded-full text-[13px] font-manrope transition-colors ${
                filter === key
                  ? "font-bold bg-[#E6F7F5] text-[#009E8E] border-0"
                  : "font-semibold border border-[#E4E9F0] bg-white text-[#1A2332]"
              }`}
              onClick={() => setFilter(key)}
            >
              {{ all: "All Programs", secondary: "Secondary Schools", awaiting: "Awaiting Admission", undergraduate: "Undergraduate" }[key]}
            </button>
          ))}
        </div>

        {/* ── MAIN ── */}
        <main className="flex-1 min-w-0">
          <div className="mb-5">
            <h2 className="font-syne font-bold text-[#1A2332] dark:text-white text-[20px] tracking-[-0.3px]">
              Choose where to start
            </h2>
          </div>

          {/* Card Grid */}
          <div className="main-grid grid gap-[22px]" id="cardGrid">
            {PROGRAMS.filter(visible).map((p) => (
              <div
                key={p.id}
                className="prog-card bg-white dark:bg-[#162334] rounded-[14px] overflow-hidden border border-[#E4E9F0] dark:border-white/[0.08] cursor-pointer flex flex-col"
              >
                {/* Image */}
                <div className="h-[170px] relative overflow-hidden" style={{ background: p.gradient }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="card-img w-full h-full object-cover block"
                    src={p.imgSrc}
                    alt={p.imgAlt}
                    onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
                  />
                  <span
                    className={`status-pill absolute top-3 left-3 z-10 text-[10px] font-bold px-[10px] py-1 rounded-full tracking-[0.3px] ${
                      p.status === "open"
                        ? "bg-[#E6F7EF] text-[#00A870]"
                        : "bg-[#FFF3E6] text-[#D97706]"
                    }`}
                  >
                    {p.status === "open" ? "Now Open" : "Coming Soon"}
                  </span>
                </div>

                {/* Body */}
                <div className="p-[18px] flex-1 flex flex-col">
                  <div className="card-title font-syne text-[16px] font-bold text-[#0D1B2A] mb-[7px] leading-[1.3] tracking-[-0.2px]">
                    {p.title}
                  </div>
                  <div className="card-desc text-[13px] text-[#6B7A8D] leading-[1.6] flex-1">
                    {p.desc}
                  </div>
                  <div className="card-action mt-[14px] pt-3 border-t border-[#E4E9F0] dark:border-white/[0.08] flex items-center">
                    <button
                      className={`inline-flex items-center gap-[5px] px-[14px] py-[6px] rounded-[6px] text-[12px] font-bold transition-colors font-manrope ${
                        p.status === "open"
                          ? "bg-[#EFF4FF] text-[#009E8E] border border-[#009E8E] hover:bg-[#DBE5FF]"
                          : "bg-[#EFF4FF] text-[#1A56DB] border border-[#C3D2F7] hover:bg-[#DBE5FF]"
                      }`}
                      onClick={() => onOpenModal("enroll", p.title)}
                    >
                      {p.btnLabel}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── FACILITATOR BANNER ── */}
          <div className="fac-banner bg-[#0D1B2A] rounded-[16px] p-7 md:p-11 mt-10 relative overflow-hidden">
            <div
              className="absolute -right-10 -top-20 w-[280px] h-[280px] rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle,rgba(0,158,142,0.18) 0%,transparent 70%)" }}
            />
            <div className="relative z-10">
              <div className="inline-block text-[10px] font-bold tracking-[2px] text-[#009E8E] border border-[rgba(0,158,142,0.4)] px-3 py-1 rounded-full uppercase mb-4">
                Partner With Us
              </div>
              <h2 className="font-syne font-extrabold text-white text-[24px] md:text-[28px] tracking-[-0.6px] mb-[10px] leading-[1.15]">
                Become a <span className="text-[#009E8E]">Facilitator</span>.<br />
                Register Students. Earn.
              </h2>
              <p className="text-[14px] text-white/60 leading-[1.7] max-w-[520px] mb-7">
                Help students in your school or community access ARQademy programmes. You handle enrolment, we handle the rest.
                Earn 5–10% commission on every student you register.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <button
                  className="px-6 py-[11px] rounded-lg text-[13px] font-bold bg-[#009E8E] text-white border-0 cursor-pointer font-manrope hover:bg-[#008478] transition-colors"
                  onClick={() => onOpenModal("facilitator")}
                >
                  Register as Facilitator →
                </button>
                <button
                  className="px-6 py-[11px] rounded-lg text-[13px] font-semibold bg-transparent text-white border border-white/25 cursor-pointer font-manrope hover:bg-white/[0.06] transition-colors"
                  onClick={() => onOpenModal("help")}
                >
                  Ask a Question
                </button>
              </div>

              {/* Feature blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-[14px]">
                {[
                  { title: "Register Students", body: "Enrol students from your school or community into any open ARQademy programme." },
                  { title: "Earn Commission",   body: "Get 5–10% on every student you successfully register. Paid reliably and on time." },
                  { title: "Track Progress",    body: "Access your facilitator portal to see all your registered students and earnings." },
                ].map((f) => (
                  <div key={f.title} className="bg-white/[0.06] border border-white/10 rounded-[10px] p-[18px]">
                    <div className="font-syne text-[13px] font-bold text-white mb-[6px]">{f.title}</div>
                    <div className="text-[12px] text-white/50 leading-[1.5]">{f.body}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}