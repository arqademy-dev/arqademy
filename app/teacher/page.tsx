"use client";

import { useState, useRef } from "react";
import { Card } from "../components/ui/Card";
import { 
  FileAudio, 
  Upload, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  Target, 
  Clock,
  CheckCircle,
  X
} from "lucide-react";
import { Dialog } from "@headlessui/react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import React from "react";

const audioMetrics = [
  { label: "Audio Clarity", value: 96, icon: FileAudio },
  { label: "Alignment", value: 91, icon: Target },
  { label: "Engagement", value: 88, icon: TrendingUp },
  { label: "Voice Tone", value: 93, icon: FileAudio },
  { label: "Pacing", value: 90, icon: Clock },
];

const summaryData = [
  { week: 1, mon: "90%", tue: "92%", wed: "88%", thu: "91%", fri: "95%", summary: "91%" },
  { week: 2, mon: "85%", tue: "88%", wed: "90%", thu: "87%", fri: "89%", summary: "88%" },
  { week: 3, mon: "92%", tue: "91%", wed: "90%", thu: "93%", fri: "94%", summary: "92%" },
  { week: 4, mon: "88%", tue: "90%", wed: "87%", thu: "89%", fri: "91%", summary: "89%" },
  { week: 5, mon: "93%", tue: "94%", wed: "92%", thu: "95%", fri: "96%", summary: "94%" },
];

const areaChartData = [
  { week: "Week 1", clarity: 90, alignment: 91 },
  { week: "Week 2", clarity: 85, alignment: 88 },
  { week: "Week 3", clarity: 92, alignment: 91 },
  { week: "Week 4", clarity: 88, alignment: 90 },
  { week: "Week 5", clarity: 93, alignment: 94 },
];

const curriculumOptions = [
  "Grade 7 Term 1", "Grade 7 Term 2", "Grade 8 Term 1", "Grade 8 Term 2",
  "Grade 9 Term 1", "Grade 9 Term 2", "Physics - O Level", "Chemistry - O Level",
  "Biology - O Level", "Mathematics - Secondary", "English Literature - Secondary",
  "History - Secondary",
];

export default function TeacherDashboard() {
  const [selectedCurriculum, setSelectedCurriculum] = useState("Grade 7 Term 1");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (file: File) => {
    setUploadedFile(file);
    setIsModalOpen(true);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("audio/")) handleUpload(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("audio/")) handleUpload(file);
  };

  const confirmUpload = () => {
    setIsModalOpen(false);
    alert(`Successfully uploaded: "${uploadedFile?.name}" → ${selectedCurriculum}`);
    setUploadedFile(null);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0A3E49]">Welcome back, Sarah!</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Tuesday, December 02, 2025 • 3/4 sessions done
          </p>
        </div>
        <CheckCircle className="w-10 h-10 text-[#0ECB83] hidden sm:block" />
      </div>

      {/* 1️⃣ Upload Section */}
      <Card className="p-5 sm:p-6 border-2">
        <div className="flex items-center gap-3 mb-5">
          <Upload className="w-6 h-6 text-[#0ECB83]" />
          <h2 className="text-lg sm:text-xl font-semibold text-[#0A3E49]">Upload Lesson</h2>
        </div>

        <select
          className="mb-4 px-4 py-2.5 rounded-xl border border-gray-300 w-full text-sm sm:text-base focus:outline.none focus:ring-2 focus:ring-[#0ECB83]/30 focus:border-[#0ECB83]"
          value={selectedCurriculum}
          onChange={(e) => setSelectedCurriculum(e.target.value)}
        >
          {curriculumOptions.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`border-4 border-dashed rounded-2xl p-10 text-center transition-all duration-300 cursor-pointer
            ${isDragging ? "border-[#0ECB83] bg-emerald-50/50 shadow-lg" : "border-gray-300 bg-gray-50"}`}
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
      </Card>

      {/* Confirm Upload Modal - FIXED */}
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
                  <p className="font-semibold text-[#0A3E49]">{selectedCurriculum}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FileAudio className="w-5 h-5 text-[#0ECB83]" />
                <div>
                  <p className="text-sm text-gray-600">Audio File</p>
                  <p className="font-semibold text-[#0A3E49] truncate max-w-xs">{uploadedFile?.name || "No file selected"}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmUpload}
                className="px-6 py-2.5 rounded-xl bg-[#0ECB83] text-white hover:bg-[#0ab86f] transition flex items-center gap-2 shadow-md"
              >
                <CheckCircle className="w-5 h-5" />
                Confirm Upload
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* 2️⃣ Audio Metrics with Icons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {audioMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label} className="p-5 text-center hover:shadow-lg transition-all duration-200 border">
              <Icon className="w-8 h-8 text-[#0ECB83] mx-auto mb-3" />
              <p className="text-gray-600 text-xs sm:text-sm">{metric.label}</p>
              <p className="text-2xl sm:text-3xl font-bold text-[#0ECB83] mt-1">{metric.value}%</p>
            </Card>
          );
        })}
      </div>

      {/* 3️⃣ Weekly Summary */}
      <Card className="p-5 sm:p-6 overflow-x-auto">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-6 h-6 text-[#0ECB83]" />
          <h2 className="text-lg sm:text-xl font-semibold text-[#0A3E49]">Weekly Summary</h2>
        </div>
        <div className="min-w-[640px] sm:min-w-0">
          <table className="w-full text-sm sm:text-base">
            <thead>
              <tr className="text-left text-gray-700 font-semibold border-b">
                <th className="pb-3">Week</th>
                <th className="pb-3 text-center">Mon</th>
                <th className="pb-3 text-center">Tue</th>
                <th className="pb-3 text-center">Wed</th>
                <th className="pb-3 text-center">Thu</th>
                <th className="pb-3 text-center">Fri</th>
                <th className="pb-3 text-center">Avg</th>
              </tr>
            </thead>
            <tbody>
              {summaryData.map((row) => (
                <tr key={row.week} className="border-t">
                  <td className="py-3">Week {row.week}</td>
                  {[row.mon, row.tue, row.wed, row.thu, row.fri].map((day, i) => (
                    <td key={i} className="py-3 text-center">
                      <span className="inline-block px-3 py-1.5 bg-gray-100 rounded-lg text-gray-700">{day}</span>
                    </td>
                  ))}
                  <td className="py-3 text-center">
                    <span className="inline-block px-4 py-2 bg-[#0ECB83] text-white rounded-xl font-bold">{row.summary}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 4️⃣ Performance Trends */}
      <Card className="p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-[#0ECB83]" />
          <h2 className="text-lg sm:text-xl font-semibold text-[#0A3E49]">Performance Trends</h2>
        </div>
        <div className="w-full h-72 sm:h-96">
          <ResponsiveContainer>
            <AreaChart data={areaChartData}>
              <CartesianGrid strokeDasharray="4 4" stroke="#f0f0f0" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="clarity" stroke="#0ECB83" fill="rgba(14, 203, 131, 0.2)" strokeWidth={3} />
              <Area type="monotone" dataKey="alignment" stroke="#06b6d4" fill="rgba(6, 182, 212, 0.15)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* 5️⃣ Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="p-6 text-center bg-gradient-to-br from-emerald-50 to-white border-2 border-emerald-100">
          <DollarSign className="w-10 h-10 text-[#0ECB83] mx-auto mb-2" />
          <p className="text-3xl font-bold text-[#0ECB83]">$21</p>
          <p className="text-gray-600 text-sm">Reward Earned</p>
        </Card>
        <Card className="p-6 text-center bg-gradient-to-br from-cyan-50 to-white border-2 border-cyan-100">
          <Target className="w-10 h-10 text-cyan-600 mx-auto mb-2" />
          <p className="text-3xl font-bold text-cyan-600">96%</p>
          <p className="text-gray-600 text-sm">Top Engagement</p>
        </Card>
        <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100">
          <Clock className="w-10 h-10 text-blue-600 mx-auto mb-2" />
          <p className="text-3xl font-bold text-[#0A3E49]">11AM</p>
          <p className="text-gray-600 text-sm">Next: Math</p>
        </Card>
        <Card className="p-6 text-center bg-gradient-to-br from-purple-50 to-white border-2 border-purple-100">
          <CheckCircle className="w-10 h-10 text-purple-600 mx-auto mb-2" />
          <p className="text-3xl font-bold text-purple-600">68%</p>
          <p className="text-gray-600 text-sm">Curriculum Done</p>
        </Card>
      </div>
    </div>
  );
}