"use client";

import { Mic, Target, Zap, Volume2, AlignLeft, Trophy, Brain, Clock } from "lucide-react";

export default function AnalysisResults({ results }) {
  if (!results) return null;

  const metrics = [
    { label: "Clarity", value: Math.round(results.presentation.clarity), icon: Volume2, color: "text-blue-600" },
    { label: "Pacing", value: Math.round(results.presentation.tempo), icon: Clock, color: "text-purple-600" },
    { label: "Enthusiasm", value: Math.round(results.presentation.enthusiasm), icon: Zap, color: "text-yellow-600" },
    { label: "Filler Words", value: Math.round(100 - results.presentation.silence), icon: Mic, color: "text-red-600" },
    { label: "Content Alignment", value: Math.round(results.content.content_score), icon: Target, color: "text-green-600" },
    { label: "Overall Score", value: Math.round(results.final_score), icon: Trophy, color: "text-emerald-600" },
  ];

  return (
    <div className="mt-12 bg-white rounded-3xl shadow-xl p-4 border border-gray-100">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-[#0A3E49] mb-2">Lesson Analysis Complete!</h2>
        <p className="text-gray-600 text-xs">Here's how your lesson performed</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.label}
              className="bg-gradient-to-br from-gray-50 to-white p-3 rounded-2xl text-center border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <Icon className={`w-6 h-6 ${metric.color} mx-auto mb-3`} />
              <p className="text-gray-700 text-sm font-medium">{metric.label}</p>
              <p className="text-xl font-bold text-[#0A3E49] mt-2">
                {metric.value}<span className="text-lg">%</span>
              </p>
            </div>
          );
        })}
      </div>

      {/* Bonus: Embedding Similarity */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 rounded-full border border-indigo-200">
          <Brain className="w-8 h-8 text-indigo-600" />
          <div>
            <p className="text-sm text-gray-600">Semantic Relevance</p>
            <p className="text-2xl font-bold text-indigo-600">
              {(results.embedding_similarity * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}