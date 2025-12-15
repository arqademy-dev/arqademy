"use client";

import { useEffect } from "react";
import { Calendar } from "lucide-react";
import { useTeacherStore } from "@/app/stores/useTeacherStore";
import { supabase } from "@/app/lib/supabaseClient";

export default function PerformanceOverview() {
  const { analyses, setAnalyses, setSelectedAnalysis } = useTeacherStore();

  // Fetch analysis history from Supabase
  useEffect(() => {
    const fetchAnalyses = async () => {
      const storedId = sessionStorage.getItem("arq_user_id");
      if (!storedId) return;

      const { data, error } = await supabase
        .from("analysis")
        .select("*")
        .eq("teacher_id", storedId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching analyses:", error);
        return;
      }

      setAnalyses(data || []);
    };

    fetchAnalyses();
  }, [setAnalyses]);

  const handleRowClick = (analysis) => {
    setSelectedAnalysis(analysis);
  };

  return (
    <div className="p-5 sm:p-6 bg-white rounded-2xl border">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-6 h-6 text-[#0ECB83]" />
        <h2 className="text-xl font-semibold text-[#0A3E49]">Analysis History</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-700 font-semibold border-b">
              <th className="pb-3">Date</th>
              <th className="pb-3">Rubric</th>
              <th className="pb-3 text-center">Overall Score</th>
              <th className="pb-3 text-center">Content</th>
              <th className="pb-3 text-center">Delivery</th>
            </tr>
          </thead>
          <tbody>
            {analyses.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-12 text-gray-500">
                  No analysis history yet. Upload a lesson to get started!
                </td>
              </tr>
            ) : (
              analyses.map((analysis) => {
                const final = analysis.final_evaluation || {};
                const contentScore = final.content?.content_score || 0;
                const presentationScore = final.presentation
                  ? (final.presentation.clarity + final.presentation.tempo + final.presentation.enthusiasm + (100 - final.presentation.silence)) / 4
                  : 0;

                return (
                  <tr
                    key={analysis.id}
                    onClick={() => handleRowClick(analysis)}
                    className="border-t hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="py-4">
                      {new Date(analysis.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-4 text-gray-700">
                      {analysis.rubric_id || "Unknown Rubric"}
                    </td>
                    <td className="py-4 text-center font-bold text-[#0A3E49]">
                      {Math.round(final.final_score || 0)}%
                    </td>
                    <td className="py-4 text-center">
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        {Math.round(contentScore)}%
                      </span>
                    </td>
                    <td className="py-4 text-center">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {Math.round(presentationScore)}%
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}