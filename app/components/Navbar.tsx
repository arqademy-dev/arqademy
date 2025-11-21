'use client';
import { useState } from 'react';
import { FaGraduationCap, FaBars, FaTimes } from 'react-icons/fa';
import Logo from '../../public/images/no_bg_logo.png'
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

interface NavbarProps {
  onGetStarted?: () => void; // made optional so you can still render without it
}

interface ImageProp {
    src: string | StaticImageData | Blob | undefined; 
    alt?: string;
}

export default function Navbar({ onGetStarted }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative z-20  bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-white/20 rounded-lg">
                <Image src={ Logo } alt="ARQADEMY" width={40} height={40} />
              </div>
              <span className="text-white">ARQADEMY</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-white/90 hover:text-white transition-colors">
              Features
            </a>
            <a href="#vision" className="text-white/90 hover:text-white transition-colors">
              Vision
            </a>
            <a href="#about" className="text-white/90 hover:text-white transition-colors">
              About
            </a>
            <a href="#contact" className="text-white/90 hover:text-white transition-colors">
              Contact
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-white hover:bg-white/20 px-4 py-2 rounded-lg">
              Sign In
            </button>
            {onGetStarted && (
              <button
                onClick={onGetStarted}
                className="bg-white text-gray-900 hover:bg-white/90 px-4 py-2 rounded-lg"
              >
                Get Started
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
          >
            {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="flex flex-col gap-4">
              {['features', 'vision', 'about', 'contact'].map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  className="text-white/90 hover:text-white transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-2 border-t border-white/20">
                <button className="text-white hover:bg-white/20 w-full px-4 py-2 rounded-lg">
                  Sign In
                </button>
                {onGetStarted && (
                  <button
                    onClick={onGetStarted}
                    className="bg-white text-gray-900 hover:bg-white/90 w-full px-4 py-2 rounded-lg"
                  >
                    Get Started
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
