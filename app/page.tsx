// app/page.tsx
"use client";

import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import HeroSection from "@/app/components/HeroSection";
import ProgramsSection from "@/app/components/ProgramsSection";
import Footer from "@/app/components/Footer";
import ModalManager, { ModalType } from "@/app/components/ModalManager";

export default function Home() {
  const [modal, setModal] = useState<ModalType>(null);
  const [modalLabel, setModalLabel] = useState<string | undefined>();

  function openModal(type: ModalType, label?: string) {
    setModalLabel(label);
    setModal(type);
  }

  return (
    <>
      <Navbar />
      <HeroSection />
      <ProgramsSection onOpenModal={openModal} />
      <Footer />
      <ModalManager open={modal} label={modalLabel} onClose={() => setModal(null)} />
    </>
  );
}