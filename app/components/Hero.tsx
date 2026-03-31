'use client';

import { useState, useEffect } from 'react';

const words = ['Dream More.', 'Learn More.', 'Do More.', 'Become More.'];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setVisible(true);
      }, 450);
    }, 2600);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="arq-landing bg-[var(--arq-navy)] text-white py-16 md:py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <div className="inline-block text-xs font-bold tracking-[2px] text-[var(--arq-teal)] border border-[var(--arq-teal)]/40 px-6 py-2 rounded-full mb-6">
          Africa's Future Talent Pipeline
        </div>

        <h1 className="font-syne text-5xl md:text-6xl font-extrabold leading-tight tracking-[-1.5px] mb-8">
          Powering Next Minds To<br />
          <span className="arq-hero-word-wrap inline-block">
            <span className={`arq-hero-word ${visible ? 'visible' : 'exit'}`}>
              {words[index]}
            </span>
          </span>
        </h1>

        <p className="text-lg text-white/75 max-w-2xl leading-relaxed">
          ARQademy helps students overcome academic challenges, succeed in exams, and build skills to create opportunities for themselves and others — online or offline.
        </p>
        <p className="mt-4 text-sm text-white/60 max-w-xl">
          A system that discovers, recovers, develops and delivers Africa's talents into opportunities.
        </p>
      </div>

      {/* Background accents */}
      <div className="absolute right-10 top-20 w-80 h-80 bg-[#009E8E]/10 rounded-full blur-3xl" />
      <div className="absolute left-1/3 bottom-10 w-64 h-64 bg-[#009E8E]/5 rounded-full blur-3xl" />
    </section>
  );
}