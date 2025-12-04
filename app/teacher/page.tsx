"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  FileAudio, 
  Upload, 
  TrendingUp, 
  Target, 
  Clock,
  CheckCircle,
  X,
  MoreHorizontal,
  Activity,
  Zap,
  Loader2,
  Cpu
} from "lucide-react";
import { Dialog } from "@headlessui/react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// --- Mock Data (Pacing Removed) ---
// We keep this as a template, but we will generate values dynamically in the simulation
const initialMetricTemplate = [
  { label: "Audio Clarity", key: "clarity", icon: FileAudio, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Alignment", key: "alignment", icon: Target, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Engagement", key: "engagement", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Voice Tone", key: "tone", icon: Activity, color: "text-rose-600", bg: "bg-rose-50" },
];

const areaChartData = [
  { week: "W1", clarity: 90, alignment: 91 },
  { week: "W2", clarity: 85, alignment: 88 },
  { week: "W3", clarity: 92, alignment: 91 },
  { week: "W4", clarity: 88, alignment: 90 },
  { week: "W5", clarity: 93, alignment: 94 },
];

const curriculumOptions = [
  "Grade 7 Term 1", "Grade 7 Term 2", "Grade 8 Term 1", "Grade 8 Term 2",
  "Physics - O Level", "Mathematics - Secondary", "English Literature"
];

export default function ModernTeacherDashboard() {
  const [selectedCurriculum, setSelectedCurriculum] = useState("Grade 7 Term 1");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // --- New States for Simulation ---
  const [analysisState, setAnalysisState] = useState<'idle' | 'processing' | 'done'>('idle');
  const [metrics, setMetrics] = useState<any[]>([]);
  const [progress, setProgress] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (file: File) => {
    setUploadedFile(file);
    setIsModalOpen(true);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  };

  // --- The Simulation Logic ---
  const startSimulation = () => {
    setIsModalOpen(false);
    setAnalysisState('processing');
    setProgress(0);

    // Simulate a progress bar filling up
    const interval = setInterval(() => {
        setProgress((prev) => {
            if (prev >= 100) {
                clearInterval(interval);
                return 100;
            }
            return prev + 2; // Speed of progress
        });
    }, 50);

    // After 3 seconds, finish and populate data
    setTimeout(() => {
        clearInterval(interval);
        
        // Generate pseudo-random results based on the "analysis"
        const generatedMetrics = initialMetricTemplate.map(m => ({
            ...m,
            value: Math.floor(Math.random() * (98 - 85 + 1) + 85) // Random score between 85 and 98
        }));
        
        setMetrics(generatedMetrics);
        setAnalysisState('done');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- Header Section --- */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Good Morning, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">Sarah</span>
            </h1>
            <p className="text-slate-500 mt-2 flex items-center gap-2 text-sm font-medium">
              <span className={`w-2 h-2 rounded-full ${analysisState === 'processing' ? 'bg-amber-500 animate-ping' : 'bg-emerald-500'}`}/>
              {analysisState === 'processing' ? 'System Analyzing...' : 'System Operational'}
            </p>
          </div>
        </header>

        {/* --- Dynamic Top Section (The Metrics) --- */}
        <div className="min-h-[140px] transition-all duration-500">
            
            {/* STATE 1: IDLE (Placeholder) */}
            {analysisState === 'idle' && (
                <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center text-slate-400 bg-slate-50/50">
                    <Cpu className="w-8 h-8 mb-2 opacity-50" />
                    <p className="font-medium text-sm">Awaiting Audio Input for Analysis</p>
                </div>
            )}

            {/* STATE 2: PROCESSING (Loading Animation) */}
            {analysisState === 'processing' && (
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-indigo-500/10 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
                            <h3 className="text-lg font-bold text-slate-800">Processing Audio Pattern...</h3>
                        </div>
                        <span className="text-indigo-600 font-mono font-bold">{progress}%</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-100 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <p className="text-xs text-slate-400 mt-3 font-mono">
                        Extracting phonemes • Analysing tonal variance • Checking curriculum alignment...
                    </p>
                </div>
            )}

            {/* STATE 3: DONE (Results Grid) */}
            {analysisState === 'done' && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {metrics.map((metric, idx) => {
                    const Icon = metric.icon;
                    return (
                    <div key={idx} className="group bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1">
                        <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-2xl ${metric.bg} ${metric.color}`}>
                            <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">
                            Excellent
                        </span>
                        </div>
                        <p className="text-slate-400 text-sm font-medium">{metric.label}</p>
                        <div className="flex items-end gap-2">
                            <p className="text-3xl font-extrabold text-slate-800 mt-1">{metric.value}<span className="text-lg text-slate-400 font-semibold">%</span></p>
                        </div>
                    </div>
                    );
                })}
                </div>
            )}
        </div>

        {/* --- Main Dashboard Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Upload Area */}
            <div className="bg-white rounded-[2rem] p-1 border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden relative group">
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${analysisState === 'processing' ? 'from-amber-400 to-orange-500' : 'from-emerald-400 to-cyan-500'}`}></div>
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                     <h2 className="text-2xl font-bold text-slate-800">Upload Lesson</h2>
                     <p className="text-slate-500 text-sm">Select curriculum to begin analysis</p>
                  </div>
                  <select 
                    value={selectedCurriculum}
                    onChange={(e) => setSelectedCurriculum(e.target.value)}
                    className="bg-slate-50 border-none text-slate-700 text-sm font-bold rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    {curriculumOptions.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>

                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 cursor-pointer
                    ${isDragging 
                      ? "border-emerald-500 bg-emerald-50/50 scale-[1.01]" 
                      : "border-slate-200 hover:border-emerald-300 hover:bg-slate-50"}`}
                >
                    {analysisState === 'processing' ? (
                         <div className="py-8">
                            <Loader2 className="w-12 h-12 text-slate-300 animate-spin mx-auto mb-4" />
                            <p className="text-slate-400 font-medium">Analysis in progress...</p>
                         </div>
                    ) : (
                        <>
                            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-200">
                                <Upload className="w-8 h-8 text-emerald-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">
                                {uploadedFile ? uploadedFile.name : "Drop audio file here"}
                            </h3>
                            <p className="text-slate-400 text-sm mb-6 max-w-sm mx-auto">
                                Support for high-fidelity MP3, WAV & AIFF.
                            </p>
                            <button 
                                onClick={() => fileInputRef.current?.click()}
                                className="px-8 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-all shadow-lg hover:shadow-emerald-500/30 active:scale-95"
                            >
                                Browse Files
                            </button>
                        </>
                    )}
                  <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileSelect} />
                </div>
              </div>
            </div>

            {/* Performance Chart */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm opacity-60 hover:opacity-100 transition-opacity">
               {/* Chart code remains same, opacity added to focus user on upload first */}
              <div className="flex items-center justify-between mb-8">
                 <h2 className="text-xl font-bold text-slate-800">Historical Trends</h2>
              </div>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={areaChartData}>
                    <defs>
                      <linearGradient id="colorClarity" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                    <Tooltip contentStyle={{borderRadius: '12px'}} />
                    <Area type="monotone" dataKey="clarity" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorClarity)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-6">
               <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                  <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-500" /> Recent Activity
                  </h3>
                  <div className="space-y-4">
                    {['Grade 7 Audio Review', 'Physics Term 2 Prep'].map((task, i) => (
                      <div key={i} className="flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                         <span className="text-sm font-medium text-slate-600">{task}</span>
                      </div>
                    ))}
                  </div>
               </div>
          </div>
        </div>
      </div>

      {/* --- Simulation Modal --- */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl shadow-slate-900/20 border border-slate-100 transform transition-all scale-100">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Start Analysis?</h3>
                <p className="text-slate-500 text-sm">This will consume 1 AI Credit</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 space-y-3 mb-8">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <FileAudio className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs text-slate-400 font-bold uppercase">File</p>
                    <p className="text-slate-800 font-medium truncate">{uploadedFile?.name}</p>
                  </div>
               </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 text-slate-600 font-semibold hover:bg-slate-50 rounded-xl transition">
                Cancel
              </button>
              <button onClick={startSimulation} className="flex-1 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 shadow-lg shadow-emerald-500/30 transition transform active:scale-95 flex items-center justify-center gap-2">
                <Zap className="w-4 h-4 fill-white" />
                Analyze Now
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}