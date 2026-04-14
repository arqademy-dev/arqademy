// components/Navbar.tsx
"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [dark, setDark] = useState(false);

  /* Read saved preference on mount */
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDark(false);
    }
  }, []);

  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    setDark(isDark);
  }

  return (
    <nav className="bg-white dark:bg-[#0D1B2A] border-b border-[#E4E9F0] dark:border-white/[0.08] sticky top-0 z-[200] px-6 md:px-12 flex items-center justify-between h-[60px]">
      {/* Logo */}
      <div className="font-syne font-extrabold text-[20px] text-[#0D1B2A] dark:text-white tracking-[-0.5px]">
        ARQ<span className="text-[#009E8E]">ADEMY</span>
      </div>

      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-[#E4E9F0] bg-white dark:bg-[#162334] hover:bg-[#E6F7F5] dark:hover:bg-[rgba(0,158,142,0.1)] transition-all duration-300"
          aria-label="Toggle theme"
        >
          <svg
            className="w-[18px] h-[18px] text-[#009E8E] transition-all duration-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            {dark ? (
              /* Sun icon in dark mode */
              <>
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" strokeLinecap="round" />
                <line x1="12" y1="21" x2="12" y2="23" strokeLinecap="round" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" strokeLinecap="round" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" strokeLinecap="round" />
                <line x1="1" y1="12" x2="3" y2="12" strokeLinecap="round" />
                <line x1="21" y1="12" x2="23" y2="12" strokeLinecap="round" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" strokeLinecap="round" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" strokeLinecap="round" />
              </>
            ) : (
              /* Moon icon in light mode */
              <path
                d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 1 0 9.8 9.8Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </button>

        {/* Brochure */}
        
          {/* href="YOUR_GOOGLE_DRIVE_PDF_LINK"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-[7px] rounded-[7px] text-[13px] font-bold text-[#009E8E] border border-[rgba(0,158,142,0.35)] hover:bg-[#E6F7F5] dark:hover:bg-[rgba(0,158,142,0.1)] transition-colors no-underline font-manrope"
        > */}
        <a href="YOUR_GOOGLE_DRIVE_PDF_LINK" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-[7px] rounded-[7px] text-[13px] font-bold text-[#009E8E] border border-[rgba(0,158,142,0.35)] hover:bg-[#E6F7F5] dark:hover:bg-[rgba(0,158,142,0.1)] transition-colors no-underline font-manrope" >
          <svg className="w-[13px] h-[13px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Brochure
        </a>
      </div>
    </nav>
  );
}