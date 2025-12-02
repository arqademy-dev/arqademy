// components/layout/TeacherSidebar.tsx → UPDATED
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Mic, Upload, History, BarChart3, BookOpen, Trophy, Users, LogOut, X } from "lucide-react";
import { useState } from "react";
import Logo from '../../../public/images/no_bg_logo.png'
import Image, { StaticImageData } from 'next/image';

const menu = [
  { icon: Home, label: "Dashboard", href: "/teacher" },
  { icon: Users, label: "Students", href: "/teacher/students" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TeacherSidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside className={`fixed left-0 top-16 bottom-0 w-64 bg-[#0A3E49] text-white z-50 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="flex items-center justify-between p-4 border-b border-white/10 lg:hidden">
          <span className="font-bold text-lg">Menu</span>
          <button onClick={onClose}><X className="w-6 h-6" /></button>
        </div>

        <nav className="p-4 space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                  active
                    ? "bg-[#34D2A2] text-white shadow-lg"
                    : "hover:bg-white/10 text-white/80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-white/80 w-full text-sm">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}