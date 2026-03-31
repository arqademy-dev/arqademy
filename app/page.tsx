'use client';

import { useState } from 'react';
import HeroSection from './components/Hero';
import { Button } from './components/ui/Button';
import ProgramsSection from './components/ProgramsSection';
import CommunitySupport from './components/CommunitySupport';
import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {
  Users,
  UserCircle,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

const HomePage = () => {
  const [showRoleSelection, setShowRoleSelection] = useState<boolean>(false);

  const scrollToRoles = () => {
    setShowRoleSelection(true);
    setTimeout(() => {
      document
        .getElementById('role-selection')
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <Navbar />

      <HeroSection />


      <ProgramsSection />

      <CommunitySupport />


      <Footer />
    </div>
  );
};

export default HomePage;