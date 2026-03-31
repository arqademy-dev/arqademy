export default function Footer() {
  return (
    <footer className="arq-landing bg-[#0D1B2A] py-6 px-6 md:px-12">
      <div className="footer-inner max-w-[1240px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="footer-logo font-syne font-extrabold text-[15px] text-white tracking-[-0.3px]">
          ARQ<span className="text-[#009E8E]">ademy</span>
        </div>

        <div className="footer-copy text-xs text-white/35 text-center md:text-left">
          © 2026 ARQademy · Built for the ones after us.
        </div>

        <div className="footer-socials flex items-center gap-2">
          <a 
            href="https://www.linkedin.com/company/103581772" 
            target="_blank"
            className="social-link w-8 h-8 flex items-center justify-center rounded-xl hover:bg-[#009E8E]/20 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.4)">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45z"/>
            </svg>
          </a>

          <a 
            href="https://web.facebook.com/profile.php?id=61579685715383" 
            target="_blank"
            className="social-link w-8 h-8 flex items-center justify-center rounded-xl hover:bg-[#009E8E]/20 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.4)">
              <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z"/>
            </svg>
          </a>

          <a 
            href="https://www.instagram.com/arqademyhq/" 
            target="_blank"
            className="social-link w-8 h-8 flex items-center justify-center rounded-xl hover:bg-[#009E8E]/20 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.4)">
              <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12c0-3.2.01-3.58.07-4.85C2.38 3.86 3.9 2.31 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16z"/>
            </svg>
          </a>

          <a 
            href="https://x.com/arqademyHQ" 
            target="_blank"
            className="social-link w-8 h-8 flex items-center justify-center rounded-xl hover:bg-[#009E8E]/20 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.4)">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}