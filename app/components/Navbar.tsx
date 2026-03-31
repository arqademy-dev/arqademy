'use client';

import { BookOpen, Users } from 'lucide-react';
import { toast } from 'sonner';
import FacilitatorModal from './modals/FacilitatorModal';
import { useState } from 'react';

export default function Navbar() {
  const [showFacilitatorModal, setShowFacilitatorModal] = useState(false);

  return (
    <>
    <nav className="arq-landing sticky top-0 z-50 bg-white border-b border-[var(--arq-border)] h-16 flex items-center px-6 md:px-12">
      <div className="flex-1">
        <div className="font-syne font-bold text-2xl tracking-[-0.5px]">
          ARQ<span className="text-[var(--arq-teal)]">ademy</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <a
          href="YOUR_GOOGLE_DRIVE_PDF_LINK"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-[var(--arq-teal)] border border-[var(--arq-teal)]/35 rounded-xl hover:bg-[#E6F7F5] transition-all"
        >
          <BookOpen className="w-4 h-4" />
          Brochure
        </a>

        <button
          onClick={() => setShowFacilitatorModal(true)}
          className="flex items-center gap-2 px-5 py-2 text-sm font-semibold bg-[#009E8E] text-white rounded-xl hover:bg-[#008478]"
        >
          Facilitator Portal
        </button>
      </div>
    </nav>
    {/* Facilitator Modal */}
      <FacilitatorModal 
        isOpen={showFacilitatorModal} 
        onClose={() => setShowFacilitatorModal(false)} 
      />
    </>
  );
}