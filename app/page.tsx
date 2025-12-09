'use client'

import { useState } from 'react';
import { Button } from './components/ui/Button';
import Link from 'next/link';
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HeroOverlay from './components/HeroOverlay'
import ExtraSections from './components/Extrasection';
import Footer from './components/Footer'
import { GraduationCap, Users, UserCircle, ArrowRight, CheckCircle, Target, Award, TrendingUp } from 'lucide-react';

const HomePage = () => {

    const [showRoleSelection, setShowRoleSelection] = useState<boolean>(false);

    const scrollToRoles = () => {
      setShowRoleSelection(true);
      setTimeout(() => {
        document.getElementById('role-selection')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    };

  return (
    <div className='relative min-h-screen w-full overflow-hidden'>
      <Navbar />
        {/* Hero Section */}
        <section className="flex-1 flex flex-col items-center justify-center px-4 py-20">
          <div className="max-w-6xl w-full text-center mb-20">
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm mb-4">
              Empowering Education Through Technology
            </span>

            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl mb-6">
              TURNING SCHOOLS INTO WORLD SOLUTIONS
            </h1>

            <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
              Imagine African students equipped not only to receive, but also to create solutions for their communities and the world. 
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button onClick={scrollToRoles} size="lg" className="bg-white text-gray-900 flex items-center gap-1 hover:bg-white/90 px-8 py-6 text-lg group">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="primary" className="border-2 border-white text-white hover:bg-white/20 px-8 py-6 text-lg">
                Watch Demo
              </Button>
            </div>

            {/* Key Benefits */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>Real-time Tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>Multi-role Access</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>Detailed Analytics</span>
              </div>
            </div>
          </div>

          {/* Role Selection Cards */}

        </section>
        {/* Stats Section */}
        <div className="border-gray-100 flex flex-col items-center justify-center px-4 py-20 bg-white/5">
          <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
            {/* Single Stat */}
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold text-white">2</span>
              <span className="mt-2 text-white/90 uppercase tracking-wide text-sm">States</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold text-white">8</span>
              <span className="mt-2 text-white/90 uppercase tracking-wide text-sm">Schools</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold text-white">1200+</span>
              <span className="mt-2 text-white/90 uppercase tracking-wide text-sm">Students</span>
            </div>
          </div>
        </div>

        
      {/* Portal section for login */}
      <div id="role-selection" className="scroll-mt-20 px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          <Link
            href="/teacher"
            className="bg-white/95 backdrop-blur-sm p-8 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
                <Users className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-gray-900">Teacher Portal</h3>
              <p className="text-gray-600 text-center">
                Evaluate teaching competence and student performance
              </p>
            </div>
          </Link>

          <Link
            href="admin"
            className="bg-white/95 backdrop-blur-sm p-8 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors">
                <UserCircle className="w-12 h-12 text-purple-600" />
              </div>
              <h3 className="text-gray-900">Admin</h3>
              <p className="text-gray-600 text-center">
                Track all activities
              </p>
            </div>
          </Link>
        </div>
      </div>

       <ExtraSections />
      <Footer />
    </div>
  )
}

export default HomePage