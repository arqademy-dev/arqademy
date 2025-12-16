"use client";

import { Dialog } from "@headlessui/react";
import { X, Trophy, Target, Zap, Volume2, Mic, Clock, Brain } from "lucide-react";
import { useTeacherStore } from "@/app/stores/useTeacherStore";

export default function AnalysisResultsModal() {
  const { selectedAnalysis, setSelectedAnalysis } = useTeacherStore();

  if (!selectedAnalysis?.final_evaluation) return null;

  const results = selectedAnalysis.final_evaluation;

  const metrics = [
    { label: "Clarity", value: Math.round(results.presentation.clarity), icon: Volume2, color: "text-blue-600" },
    { label: "Pacing", value: Math.round(results.presentation.tempo), icon: Clock, color: "text-purple-600" },
    { label: "Enthusiasm", value: Math.round(results.presentation.enthusiasm), icon: Zap, color: "text-yellow-600" },
    { label: "Filler Words", value: Math.round(100 - results.presentation.silence), icon: Mic, color: "text-red-600" },
    { label: "Content Alignment", value: Math.round(results.content.content_score), icon: Target, color: "text-green-600" },
    { label: "Overall Score", value: Math.round(results.final_score), icon: Trophy, color: "text-emerald-600" },
  ];

  return (
    <Dialog open={true} onClose={() => setSelectedAnalysis(null)} className="relative z-50">
      <div className="fixed inset-0 bg-black/60" />

      <div className="fixed inset-0 flex items-center justify-center p-2">
        <Dialog.Panel className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-3">
          <div className="flex justify-between items-start mb-6">
            <div>
              <Dialog.Title className="text-xl font-bold text-[#0A3E49]">
                Analysis Details
              </Dialog.Title>
              <p className="text-gray-600 mt-2">
                {new Date(selectedAnalysis.created_at).toLocaleDateString()} • {selectedAnalysis.rubric_id}
              </p>
            </div>
            <button onClick={() => setSelectedAnalysis(null)} className="text-gray-400 hover:text-gray-600">
              <X className="w-8 h-8" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
            {metrics.map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.label} className="bg-gradient-to-br from-gray-50 to-white p-2 rounded-2xl text-center border border-gray-200">
                  <Icon className={`w-6 h-6 ${m.color} mx-auto mb-4`} />
                  <p className="text-gray-700">{m.label}</p>
                  <p className="text-xl font-bold text-[#0A3E49] mt-2">
                    {m.value}<span className="text-xl">%</span>
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-4 bg-gradient-to-r from-indigo-50 to-purple-50 px-8 py-5 rounded-full border border-indigo-200">
              <Brain className="w-10 h-10 text-indigo-600" />
              <div>
                <p className="text-gray-600 font-medium">Semantic Relevance</p>
                <p className="text-3xl font-bold text-indigo-600">
                  {(results.embedding_similarity * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}