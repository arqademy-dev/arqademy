// components/ModalManager.tsx
"use client";

import { useEffect, useRef, useState } from "react";

export type ModalType = "enroll" | "facilitator" | "help" | null;

interface Props {
  open: ModalType;
  label?: string;
  onClose: () => void;
}

/* ── Reusable field wrapper ── */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="modal-field mb-4">
      <label className="block text-[12px] font-bold text-[#1A2332] dark:text-slate-300 mb-1.5 tracking-[0.3px]">
        {label}
      </label>
      {children}
    </div>
  );
}

const INPUT_CLS =
  "w-full px-[14px] py-[11px] rounded-lg border-[1.5px] border-[#E4E9F0] text-[14px] font-manrope text-[#1A2332] dark:text-slate-200 outline-none bg-[#F7F9FC] dark:bg-[#0D1B2A] focus:border-[#009E8E] focus:bg-white dark:focus:bg-[#111f2e] transition-colors";

/* ── Success screen ── */
function Success({ title, body }: { title: string; body: string }) {
  return (
    <div style={{ textAlign: "center", padding: "16px 0 4px" }}>
      <div className="w-[52px] h-[52px] rounded-full bg-[#E6F7EF] flex items-center justify-center mx-auto mb-[14px]">
        <svg viewBox="0 0 24 24" className="w-[26px] h-[26px]" fill="none" stroke="#00A870" strokeWidth={2.5}>
          <polyline points="4,12 9,17 20,7" />
        </svg>
      </div>
      <h3 className="font-syne text-[18px] font-extrabold text-[#0D1B2A] dark:text-white mb-2">{title}</h3>
      <p className="text-[13px] text-[#6B7A8D] leading-[1.6]">{body}</p>
    </div>
  );
}

export default function ModalManager({ open, label, onClose }: Props) {
  const [done, setDone] = useState(false);
  const [facTab, setFacTab] = useState<"signup" | "login">("signup");
  const overlayRef = useRef<HTMLDivElement>(null);

  /* Reset state each time a new modal opens */
  useEffect(() => {
    setDone(false);
    setFacTab("signup");
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* Escape key */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  function submit() {
    setDone(true);
    setTimeout(onClose, 3200);
  }

  if (!open) return null;

  const BOX_CLS =
    "modal-box bg-white dark:bg-[#162334] rounded-[16px] w-full max-w-[420px] p-7 md:p-8 relative shadow-[0_24px_60px_rgba(0,0,0,0.25)] max-h-[92vh] overflow-y-auto";

  /* ── Enrol / Waitlist ── */
  const enrollTitle =
    label && ["Founders Academy", "Qampus Programme", "Q-Lamp", "Qloud Box"].includes(label)
      ? `Join Waitlist — ${label}`
      : `Enrol — ${label ?? ""}`;

  return (
    <div
      ref={overlayRef}
      className="modal-overlay open fixed inset-0 z-[1000] bg-[rgba(13,27,42,0.72)] items-center justify-center p-4 md:p-5"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* ── ENROL MODAL ── */}
      {open === "enroll" && (
        <div className={BOX_CLS}>
          <CloseBtn onClose={onClose} />
          {done ? (
            <Success title="Registration Received!" body="We will contact you on WhatsApp within 24 hours to complete your enrolment. Welcome to ARQademy." />
          ) : (
            <>
              <ModalHeader title={enrollTitle} sub="Fill in your details and we will reach you on WhatsApp to complete your registration." />
              <Field label="Full Name"><input type="text" placeholder="e.g. Fatima Usman" className={INPUT_CLS} /></Field>
              <Field label="WhatsApp Number"><input type="tel" placeholder="e.g. 08012345678" className={INPUT_CLS} /></Field>
              <Field label="State"><input type="text" placeholder="e.g. Abuja, Lagos, Kano..." className={INPUT_CLS} /></Field>
              <SubmitBtn label="Submit & Get Started →" onClick={submit} />
            </>
          )}
        </div>
      )}

      {/* ── HELP MODAL ── */}
      {open === "help" && (
        <div className={BOX_CLS}>
          <CloseBtn onClose={onClose} />
          {done ? (
            <Success title="Message Received!" body="We've got your message and will reply within 24 hours. You're not alone in this." />
          ) : (
            <>
              <ModalHeader title="Ask for Help" sub="Tell us what you need. We will get back to you on WhatsApp or email within 24 hours." />
              <Field label="Your Name"><input type="text" placeholder="e.g. Emeka Obi" className={INPUT_CLS} /></Field>
              <Field label="WhatsApp or Email"><input type="text" placeholder="08012345678 or email@gmail.com" className={INPUT_CLS} /></Field>
              <Field label="What do you need help with?">
                <textarea placeholder="Describe your question or challenge..." className={`${INPUT_CLS} resize-y min-h-[90px]`} />
              </Field>
              <SubmitBtn label="Send My Message →" onClick={submit} />
            </>
          )}
        </div>
      )}

      {/* ── FACILITATOR MODAL ── */}
      {open === "facilitator" && (
        <div className={BOX_CLS}>
          <CloseBtn onClose={onClose} />
          {/* Tabs */}
          <div className="flex border border-[#E4E9F0] rounded-lg overflow-hidden mb-[22px]">
            {(["signup", "login"] as const).map((t) => (
              <button
                key={t}
                onClick={() => { setFacTab(t); setDone(false); }}
                className="flex-1 py-[10px] text-[13px] font-bold border-0 cursor-pointer font-manrope transition-colors"
                style={{
                  background: facTab === t ? "#009E8E" : "transparent",
                  color:      facTab === t ? "#fff"    : "#6B7A8D",
                  borderLeft: t === "login" ? "1px solid #E4E9F0" : undefined,
                }}
              >
                {t === "signup" ? "Sign Up" : "Login"}
              </button>
            ))}
          </div>

          {done ? (
            <Success title="Application Received!" body="Our team will contact you on WhatsApp within 24 hours to complete your registration as an official ARQademy Facilitator." />
          ) : facTab === "signup" ? (
            <>
              <ModalHeader title="Become a Facilitator" sub="Register students and earn 5–10% commission on every enrolment." />
              <div className="bg-[#E6F7F5] border border-[rgba(0,158,142,0.25)] rounded-lg px-[14px] py-3 mb-5 text-[12px] text-[#009E8E] font-semibold leading-[1.55]">
                You earn 5–10% on every student you register. We handle the rest — just enrol and get paid.
              </div>
              <Field label="Full Name"><input type="text" placeholder="e.g. Mr. Adeyemi Balogun" className={INPUT_CLS} /></Field>
              <Field label="WhatsApp Number"><input type="tel" placeholder="e.g. 08012345678" className={INPUT_CLS} /></Field>
              <Field label="Email Address"><input type="email" placeholder="e.g. teacher@school.com" className={INPUT_CLS} /></Field>
              <Field label="School Name"><input type="text" placeholder="e.g. Sunrise Secondary School" className={INPUT_CLS} /></Field>
              <Field label="State"><input type="text" placeholder="e.g. Abuja, Lagos, Taraba..." className={INPUT_CLS} /></Field>
              <Field label="Your Role">
                <select className={INPUT_CLS}>
                  <option value="">Select your role...</option>
                  {["Teacher", "Vice Principal", "Principal", "School Admin Staff", "Other"].map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </Field>
              <SubmitBtn label="Apply as Facilitator →" onClick={submit} />
            </>
          ) : (
            <>
              <ModalHeader title="Facilitator Login" sub="Enter your credentials to access the Facilitator Portal." />
              <Field label="Email or Phone"><input type="text" placeholder="08012345678 or email" className={INPUT_CLS} /></Field>
              <Field label="Password"><input type="password" placeholder="••••••••" className={INPUT_CLS} /></Field>
              <SubmitBtn label="Login to Portal →" onClick={submit} />
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Small helpers ── */
function CloseBtn({ onClose }: { onClose: () => void }) {
  return (
    <button
      className="absolute top-4 right-4 bg-none border-0 cursor-pointer text-[22px] text-[#6B7A8D] leading-none"
      onClick={onClose}
    >
      ×
    </button>
  );
}

function ModalHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <>
      <div className="modal-title font-syne text-[20px] font-extrabold text-[#0D1B2A] dark:text-white mb-1.5">{title}</div>
      <div className="modal-sub text-[13px] text-[#6B7A8D] dark:text-[#8fa3b8] mb-6 leading-[1.55]">{sub}</div>
    </>
  );
}

function SubmitBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      className="w-full py-[13px] rounded-lg text-[14px] font-bold bg-[#009E8E] text-white border-0 cursor-pointer font-manrope mt-1 hover:bg-[#008478] transition-colors"
      onClick={onClick}
    >
      {label}
    </button>
  );
}