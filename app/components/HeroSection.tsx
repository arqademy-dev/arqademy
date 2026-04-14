// components/HeroSection.tsx
"use client";

import { useEffect, useRef } from "react";

const WORDS = ["Success.", "Real Skills.", "Opportunities."];

export default function HeroSection() {
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const curRef = useRef(0);

  useEffect(() => {
    const els = wordsRef.current;
    if (!els.length) return;

    /* Show first word immediately */
    els[0].classList.add("visible");

    const interval = setInterval(() => {
      const prev = curRef.current;
      els[prev].classList.remove("visible");
      els[prev].classList.add("exit");
      setTimeout(() => els[prev].classList.remove("exit"), 500);

      curRef.current = (prev + 1) % els.length;
      els[curRef.current].classList.add("visible");
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#0D1B2A] overflow-hidden px-6 md:px-12 py-16 relative">
      {/* Radial glows */}
      <div
        className="absolute -right-[60px] -top-[100px] w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(0,158,142,0.14) 0%,transparent 70%)" }}
      />
      <div
        className="absolute bottom-[-100px] pointer-events-none"
        style={{
          left: "20%", width: "280px", height: "280px", borderRadius: "50%",
          background: "radial-gradient(circle,rgba(0,158,142,0.08) 0%,transparent 70%)",
        }}
      />

      <div className="max-w-[1240px] mx-auto w-full pl-0 md:pl-[50px]">
        <div className="relative z-10 max-w-[800px]">
          {/* Badge */}
          <div className="inline-block text-[10px] font-bold tracking-[2px] text-[#009E8E] border border-[rgba(0,158,142,0.4)] px-3 py-1 rounded-full uppercase mb-[22px]">
            Africa&apos;s Talent Pipeline
          </div>

          {/* Headline */}
          <h1
            className="font-syne font-extrabold text-white leading-[1.1] tracking-[-1.2px] mb-0"
            style={{ fontSize: "clamp(28px,4vw,48px)" }}
          >
            Turn your academic struggles into{" "}
            <br />
            <span className="inline-block relative align-bottom" style={{ width: "360px", height: "1.12em" }}>
              {WORDS.map((word, i) => (
                <span
                  key={word}
                  className="hero-word font-syne font-extrabold"
                  ref={(el) => {
                    if (el) wordsRef.current[i] = el;
                  }}
                >
                  {word}
                </span>
              ))}
            </span>
          </h1>

          {/* Subheading */}
          <p
            className="font-medium text-white/[0.68] mt-[22px] mb-[10px] max-w-[600px] leading-[1.75]"
            style={{ fontSize: "clamp(16px,1.5vw,18.5px)" }}
          >
            ARQADEMY walks with you through academic challenges, exam success,
            and building real skills that create opportunities for you and others.
          </p>
        </div>
      </div>
    </section>
  );
}