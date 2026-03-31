'use client';

import { useState } from 'react';
import { Check, Download } from 'lucide-react';
import Image from 'next/image';
import EnrollModal from './modals/EnrollModal';
import InstallModal from './modals/InstallModal';

export default function ProgramsSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  const [showEnroll, setShowEnroll] = useState(false);
  const [showInstall, setShowInstall] = useState(false);

  const programs = [
    {
      id: 1,
      title: "JAMB / WAEC Resit Programme",
      desc: "We will guide you step by step to prepare with confidence and make sure you succeed this time around.",
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=75",
      photoClass: "p-amber",
      status: "open",
      track: "graduate awaiting",
      action: "enroll",
      buttonText: "Enrol Now →"
    },
    {
      id: 2,
      title: "Pathway Programme",
      desc: "We will prepare you for university and open up more opportunities for your future beyond the classroom.",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=75",
      photoClass: "p-teal",
      status: "open",
      track: "graduate awaiting",
      action: "enroll",
      buttonText: "Enrol Now →"
    },
    {
      id: 3,
      title: "Qampus Programme",
      desc: "Develop real tech skills that convert your learning into earning — and avoid the job-seeker queues when you graduate.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=75",
      photoClass: "p-green",
      status: "open",
      track: "undergraduate",
      action: "enroll",
      buttonText: "Enrol Now →"
    },
    {
      id: 4,
      title: "Founders Academy",
      desc: "Have an idea? This is where we help you refine, build, and launch it for real local and global impact.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=75",
      photoClass: "p-slate",
      status: "soon",
      track: "undergraduate",
      action: "enroll",
      buttonText: "Join Waitlist →"
    },
    {
      id: 5,
      title: "Q-Lamp",
      desc: "A platform that manages private schools' key activities and prepares students for JAMB and WAEC inside the school.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=75",
      photoClass: "p-blue",
      status: "open",
      track: "tools secondary",
      action: "install",
      buttonText: "Install ↓"
    },
    {
      id: 6,
      title: "Qloud Box",
      desc: "An offline platform that gives students in underserved communities access to resources, guides, and opportunities.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=75",
      photoClass: "p-rust",
      status: "open",
      track: "tools secondary underserved",
      action: "install",
      buttonText: "Install ↓"
    }
  ];

  const filteredPrograms = programs.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'soon') return p.status === 'soon';
    if (activeFilter === 'underserved') return p.track.includes('underserved');
    return p.track.includes(activeFilter);
  });

  const openModal = (program: any) => {
    setSelectedProgram(program);
    if (program.action === 'enroll') setShowEnroll(true);
    else setShowInstall(true);
  };

  return (
    <div className="arq-landing bg-white">
      <div className="shell max-w-[1240px] mx-auto px-6 md:px-12 py-10 md:py-20 flex flex-col lg:flex-row gap-10">
        
        {/* SIDEBAR */}
        <aside className="sidebar lg:w-[220px] text-white flex-shrink-0 lg:sticky lg:top-24">
          <button 
            onClick={() => setActiveFilter('all')}
            className={`sidebar-all ${activeFilter === 'all' ? 'active' : ''}`}
          >
            <span className="check">
              <Check size={12} strokeWidth={3} />
            </span>
            All Programs
          </button>

          <div className="sidebar-label mt-2">Explore by Track</div>

          <button onClick={() => setActiveFilter('secondary')} className={`sidebar-item ${activeFilter === 'secondary' ? 'active' : ''}`}>
            <span className="checkbox"><Check size={12} strokeWidth={3} /></span>
            Secondary Schools
          </button>
          <button onClick={() => setActiveFilter('awaiting')} className={`sidebar-item ${activeFilter === 'awaiting' ? 'active' : ''}`}>
            <span className="checkbox"><Check size={12} strokeWidth={3} /></span>
            Awaiting Admission
          </button>
          <button onClick={() => setActiveFilter('undergraduate')} className={`sidebar-item ${activeFilter === 'undergraduate' ? 'active' : ''}`}>
            <span className="checkbox"><Check size={12} strokeWidth={3} /></span>
            Undergraduate
          </button>

          {/* <div className="mt-8"></div> */}

          <button onClick={() => setActiveFilter('underserved')} className={`sidebar-item ${activeFilter === 'underserved' ? 'active' : ''}`}>
            <span className="checkbox"><Check size={12} strokeWidth={3} /></span>
            Underserved Communities
          </button>
          <button onClick={() => setActiveFilter('soon')} className={`sidebar-item ${activeFilter === 'soon' ? 'active' : ''}`}>
            <span className="checkbox"><Check size={12} strokeWidth={3} /></span>
            Coming Soon
          </button>
        </aside>

        {/* MAIN CARDS */}
        <main className="main flex-1">
          <div className="card-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((prog) => (
              <div key={prog.id} className="prog-card" onClick={() => openModal(prog)}>
                <div className={`card-photo ${prog.photoClass}`}>
                  <Image
                    src={prog.image}
                    alt={prog.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span className={`status-pill ${prog.status === 'open' ? 'pill-open' : 'pill-soon'}`}>
                    {prog.status === 'open' ? 'Now Open' : 'Coming Soon'}
                  </span>
                </div>
                <div className="card-body">
                  <div className="card-title">{prog.title}</div>
                  <div className="card-desc">{prog.desc}</div>
                  <div className="card-action">
                    <button 
                      onClick={(e) => { e.stopPropagation(); openModal(prog); }}
                      className={prog.action === 'enroll' ? 'btn-enroll' : 'btn-install'}
                    >
                      {prog.buttonText}
                      {prog.action === 'install' && <Download size={14} />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Modals */}
      {selectedProgram && (
        <>
          <EnrollModal 
            isOpen={showEnroll} 
            onClose={() => { setShowEnroll(false); setSelectedProgram(null); }} 
            programTitle={selectedProgram.title} 
          />
          <InstallModal 
            isOpen={showInstall} 
            onClose={() => { setShowInstall(false); setSelectedProgram(null); }} 
            programTitle={selectedProgram.title} 
          />
        </>
      )}
    </div>
  );
}