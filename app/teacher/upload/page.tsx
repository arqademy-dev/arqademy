// app/(teacher)/upload/page.tsx
"use client";

import { useState, useRef } from "react";
import { Upload, FileAudio, X, CheckCircle, Download, ChevronDown } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";

interface CurriculumTopic {
  subject: string;
  topic: string;
  code: string;
}

const curriculumTopics: CurriculumTopic[] = [
  { subject: "Mathematics", topic: "Fractions & Decimals", code: "MATH701" },
  { subject: "English", topic: "Reading Comprehension", code: "ENG702" },
  { subject: "Science", topic: "Photosynthesis", code: "SCI703" },
  { subject: "Social Studies", topic: "Nigerian History 1800–1960", code: "SST704" },
  { subject: "Basic Technology", topic: "Simple Machines", code: "BTEC705" },
  { subject: "Civic Education", topic: "Democracy & Governance", code: "CIV706" },
];

export default function CurriculumUploadPage() {
  const [selectedTopic, setSelectedTopic] = useState<CurriculumTopic>(curriculumTopics[0]);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("audio/")) {
      setFile(droppedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && selected.type.startsWith("audio/")) {
      setFile(selected);
    }
  };

  const processUpload = () => {
    if (!file) return;
    setIsProcessing(true);
    setShowResult(false);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProcessing(false);
            setShowResult(true);
          }, 800);
          return 100;
        }
        return p + 8;
      });
    }, 200);
  };

  const reset = () => {
    setFile(null);
    setShowResult(false);
    setProgress(0);
    setIsProcessing(false);
  };

  const audioURL = file ? URL.createObjectURL(file) : null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0A3E49]">Upload Curriculum Lesson</h1>
        <p className="text-gray-600 mt-2">Every lesson must be linked to the official curriculum</p>
      </div>

      <Card className="p-8 sm:p-12 bg-gradient-to-b from-[#f0fdfa] to-white">
        {!showResult ? (
          <>
            {/* CURRICULUM SELECTOR */}
            <div className="mb-10">
              <label className="block text-lg font-bold text-[#0A3E49] mb-4">
                Select Curriculum Topic
              </label>
              <div className="relative max-w-2xl mx-auto">
                <select
                  value={selectedTopic.code}
                  onChange={(e) =>
                    setSelectedTopic(
                      curriculumTopics.find((t) => t.code === e.target.value) || curriculumTopics[0]
                    )
                  }
                  className="w-full appearance-none bg-white border-2 border-gray-300 rounded-2xl px-6 py-5 pr-14 text-lg font-medium focus:border-[#34D2A2] focus:outline-none transition-all"
                >
                  {curriculumTopics.map((t) => (
                    <option key={t.code} value={t.code}>
                      {t.subject} — {t.topic}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-7 h-7 text-gray-500 pointer-events-none" />
              </div>
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Selected Code: <span className="font-mono text-xl font-bold text-[#0A3E49]">{selectedTopic.code}</span>
                </p>
              </div>
            </div>

            {/* FILE UPLOAD AREA */}
            {!file ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-4 border-dashed rounded-3xl p-16 text-center transition-all ${
                  isDragging ? "border-[#34D2A2] bg-emerald-50" : "border-gray-300 bg-gray-50"
                }`}
              >
                <Upload className="w-20 h-20 mx-auto mb-6 text-[#34D2A2]" />
                <p className="text-2xl font-bold text-[#0A3E49] mb-3">
                  Drop audio for {selectedTopic.topic}
                </p>
                <p className="text-gray-600 mb-6">
                  Supports MP3, WAV, M4A, WEBM • Max 500MB
                </p>
                <Button
                  size="lg"
                  onClick={() => fileInputRef.current?.click()}
                  className="gap-3"
                >
                  <FileAudio className="w-6 h-6" />
                  Choose File
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="audio/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="text-center">
                <div className="bg-emerald-100 w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileAudio className="w-16 h-16 text-[#34D2A2]" />
                </div>

                <h3 className="text-2xl font-bold text-[#0A3E49] mb-2">{file.name}</h3>
                <p className="text-gray-600 mb-3">
                  {(file.size / 1024 / 1024).toFixed(2)} MB • Ready for {selectedTopic.code}
                </p>

                {isProcessing ? (
                  <div className="max-w-md mx-auto">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Analyzing with AI...</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#34D2A2] to-emerald-600 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" onClick={processUpload} className="gap-3">
                      <Upload className="w-5 h-5" />
                      Upload & Submit
                    </Button>
                    <Button size="lg" variant="secondary" onClick={reset}>
                      <X className="w-5 h-5" />
                      Change File
                    </Button>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          /* SUCCESS SCREEN – NOW SHOWS CURRICULUM */
          <div className="text-center py-12">
            <CheckCircle className="w-24 h-24 text-[#34D2A2] mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-[#0A3E49] mb-4">Lesson Uploaded Successfully!</h2>
            
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 mb-6 max-w-xl mx-auto">
              <p className="text-emerald-800 font-bold text-lg">Curriculum Match</p>
              <p className="text-2xl font-bold text-[#0A3E49] mt-2">
                {selectedTopic.subject}
              </p>
              <p className="text-lg text-gray-700">{selectedTopic.topic}</p>
              <p className="font-mono text-xl font-bold text-[#34D2A2] mt-2">{selectedTopic.code}</p>
            </div>

            <audio controls src={audioURL!} className="w-full max-w-md mx-auto mb-8" />

            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
              <p className="text-emerald-800 font-semibold text-lg mb-2">AI Analysis Result</p>
              <div className="grid grid-cols-2 gap-4 text-left">
                <div><span className="text-sm text-gray-600">Clarity</span><div className="text-2xl font-bold text-emerald-600">96%</div></div>
                <div><span className="text-sm text-gray-600">Engagement</span><div className="text-2xl font-bold text-emerald-600">91%</div></div>
                <div><span className="text-sm text-gray-600">Pacing</span><div className="text-2xl font-bold text-emerald-600">88%</div></div>
                <div><span className="text-sm text-gray-600">Reward Earned</span><div className="text-2xl font-bold text-emerald-600">+$21.00</div></div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                <Download className="w-5 h-5" />
                Download Original
              </Button>
              <Button size="lg" variant="secondary" onClick={reset}>
                Upload Another Lesson
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}