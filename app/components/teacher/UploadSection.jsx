"use client";

import { useState, useRef } from "react";
import { Upload, FileAudio, Target, CheckCircle, X } from "lucide-react";
import { Dialog } from "@headlessui/react";
import { useTeacherStore } from "@/app/stores/useTeacherStore"; // adjust path if needed

const rubrics = [ 
  { title: "lesson_1: Cell Structure and Function", id: "lesson_1" },
  { title: "lesson_2: Nutrition in Humans and Plants", id: "lesson_2" },
  { title: "lesson_3: Photosynthesis and Plant Growth", id: "lesson_3" },
  { title: "lesson_4: Reproduction in Plants", id: "lesson_4" },
  { title: "lesson_5: Micro organisms – Beneficial & Harmful", id: "lesson_5" }
];

export default function UploadSection() {
  const [selectedTitle, setSelectedTitle] = useState(rubrics[0].title);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const startAnalysisPipeline = useTeacherStore((state) => state.startAnalysisPipeline);

  const handleUpload = (file) => {
    setUploadedFile(file);
    setIsModalOpen(true);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("audio/")) handleUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("audio/")) handleUpload(file);
  };

  const confirmUpload = async () => {
    if (!uploadedFile) return;

    // Find the selected rubric to get the short id
    const selectedRubric = rubrics.find(r => r.title === selectedTitle);
    const curriculum_id = selectedRubric?.id || "lesson_1";

    // Trigger the full pipeline from the store
    await startAnalysisPipeline(uploadedFile, curriculum_id);

    // Close modal and reset
    setIsModalOpen(false);
    setUploadedFile(null);
  };

  return (
    <>
      <div className="p-5 sm:p-6 border-2 rounded-2xl">
        <div className="flex items-center gap-3 mb-5">
          <Upload className="w-6 h-6 text-[#0ECB83]" />
          <h2 className="text-lg sm:text-xl font-semibold">Upload Lesson</h2>
        </div>

        <select
          className="mb-4 px-4 py-2.5 rounded-xl border border-gray-300 w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#0ECB83]/30 text-black"
          value={selectedTitle}
          onChange={(e) => setSelectedTitle(e.target.value)}
        >
          {rubrics.map((r) => (
            <option key={r.id} value={r.title}>
              {r.title}
            </option>
          ))}
        </select>

        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`border-4 border-dashed rounded-2xl p-10 text-center transition-all duration-300 cursor-pointer ${
            isDragging ? "border-[#0ECB83] bg-emerald-50/50 shadow-lg" : "border-gray-300 bg-gray-50"
          }`}
        >
          <FileAudio className="w-14 h-14 text-[#0ECB83] mx-auto mb-4" />
          <p className="text-lg font-medium text-[#0A3E49] mb-1">
            {uploadedFile ? uploadedFile.name : "Drag & drop your lesson audio here"}
          </p>
          <p className="text-gray-600 text-sm mb-5">MP3, WAV, M4A, WEBM • Max 500MB</p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-3 bg-[#0ECB83] text-white rounded-xl hover:bg-[#0ab86f] transition shadow-md flex items-center gap-2 mx-auto"
          >
            <Upload className="w-5 h-5" />
            Choose File
          </button>
          <input ref={fileInputRef} type="file" accept="audio/*" onChange={handleFileSelect} className="hidden" />
        </div>
      </div>

      {/* Confirm Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <Dialog.Title className="text-xl font-bold text-[#0A3E49] flex items-center gap-3">
                <FileAudio className="w-7 h-7 text-[#0ECB83]" />
                Confirm Upload
              </Dialog.Title>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-[#0A3E49]" />
                <div>
                  <p className="text-sm text-gray-600">Curriculum</p>
                  <p className="font-semibold text-[#0A3E49]">{selectedTitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FileAudio className="w-5 h-5 text-[#0ECB83]" />
                <div>
                  <p className="text-sm text-gray-600">Audio File</p>
                  <p className="font-semibold text-[#0A3E49] truncate max-w-xs">{uploadedFile?.name || "No file"}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={confirmUpload} className="px-6 py-2.5 rounded-xl bg-[#0ECB83] text-white hover:bg-[#0ab86f] flex items-center gap-2 shadow-md">
                <CheckCircle className="w-5 h-5" />
                Confirm Upload
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}