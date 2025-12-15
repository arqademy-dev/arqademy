"use client";

import { useTeacherStore } from "@/app/stores/useTeacherStore"; // adjust path if needed
import { FileAudio, CheckCircle } from "lucide-react";
import { Dialog } from "@headlessui/react";

export default function ProcessingModal() {
  const { processing } = useTeacherStore();

  if (!processing.isProcessing) return null;

  const progress = processing.progress || 0;

  return (
    <Dialog open={true} onClose={() => {}} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70" aria-hidden="true" />

      {/* Modal Panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#0ECB83] to-[#0A3E49] rounded-full flex items-center justify-center animate-pulse">
              <FileAudio className="w-12 h-12 text-white" />
            </div>

            <Dialog.Title className="text-2xl font-bold text-[#0A3E49] mb-3">
              Analyzing Your Lesson
            </Dialog.Title>

            <p className="text-gray-600 text-lg">
              {processing.stage || "Please wait..."}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="relative w-full bg-gray-200 rounded h-6 overflow-hidden mb-6">
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#0ECB83] to-[#0A3E49] transition-all duration-700 ease-out flex items-center justify-end pr-4"
              style={{ width: `${progress}%` }}
            >
              <span className="text-white font-bold text-lg">
                {progress}%
              </span>
            </div>
          </div>

          {/* Complete Check (only show at 100%) */}
          {progress === 100 && (
            <div className="mt-6">
              <CheckCircle className="w-16 h-16 text-[#0ECB83] mx-auto animate-bounce" />
              <p className="text-[#0ECB83] font-semibold text-xl mt-4">
                Analysis Complete!
              </p>
            </div>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}