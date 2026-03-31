'use client';

import { useState } from 'react';
import GroupModal from './modals/GroupModal';
import HelpModal from './modals/HelpModal';

export default function CommunitySupport() {
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  return (
    <div className="arq-landing max-w-[1240px] mx-auto px-6 md:px-12 pb-20 bg-white">
      <div className="community-banner bg-[#0D1B2A] rounded-3xl p-10 md:p-12 relative overflow-hidden">
        
        {/* Background accent */}
        <div className="absolute right-[-40px] top-[-80px] w-[280px] h-[280px] rounded-full bg-[radial-gradient(circle,rgba(0,158,142,0.18)_0%,transparent_70%)]" />

        <div className="relative z-10">
          <div className="banner-tag inline-block text-xs font-bold tracking-[2px] text-[#009E8E] border border-[#009E8E]/40 px-5 py-1.5 rounded-full mb-6">
            Community Support
          </div>

          <h2 className="font-syne text-3xl md:text-[28px] font-extrabold leading-tight text-white tracking-[-0.6px] mb-4">
            Prepare Better.<br />
            Study with <span className="text-[#009E8E]">Others</span>.
          </h2>

          <p className="text-white/60 text-[14px] leading-relaxed max-w-[520px] mb-8">
            Doing this alone can be hard. Join others with the same goal — learn together, stay motivated, and keep moving forward until you succeed.
          </p>

          <div className="banner-actions flex flex-wrap gap-3 mb-10">
            <button 
              onClick={() => setShowGroupModal(true)}
              className="btn-teal px-8 py-3.5 text-sm font-bold rounded-xl bg-[#009E8E] text-white hover:bg-[#008478] transition-colors"
            >
              Join Study Group
            </button>
            <button 
              onClick={() => setShowHelpModal(true)}
              className="btn-outline-white px-8 py-3.5 text-sm font-semibold rounded-xl border border-white/25 text-white hover:bg-white/10 transition-colors"
            >
              Ask for Help
            </button>
          </div>

          {/* Features Grid */}
          <div className="banner-features grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="banner-feat bg-white/6 border border-white/10 rounded-2xl p-6">
              <div className="feat-label font-syne text-sm font-bold text-white mb-2">Exam Resit Group</div>
              <div className="feat-desc text-xs text-white/50 leading-relaxed">
                Find study partners who motivate you and help you solve problems when you feel lost.
              </div>
            </div>

            <div className="banner-feat bg-white/6 border border-white/10 rounded-2xl p-6">
              <div className="feat-label font-syne text-sm font-bold text-white mb-2">Pathway Programme Group</div>
              <div className="feat-desc text-xs text-white/50 leading-relaxed">
                Find students like you to build skills together and prepare early for opportunities at university.
              </div>
            </div>

            <div className="banner-feat bg-white/6 border border-white/10 rounded-2xl p-6">
              <div className="feat-label font-syne text-sm font-bold text-white mb-2">Qampus Programme Group</div>
              <div className="feat-desc text-xs text-white/50 leading-relaxed">
                Build real tech skills with others and turn your learning into earning.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <GroupModal 
        isOpen={showGroupModal} 
        onClose={() => setShowGroupModal(false)} 
      />
      <HelpModal 
        isOpen={showHelpModal} 
        onClose={() => setShowHelpModal(false)} 
      />
    </div>
  );
}