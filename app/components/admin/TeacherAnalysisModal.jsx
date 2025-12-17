"use client";

import { useState, useEffect, useRef } from "react";
import { FileAudio, Upload, X, TrendingUp } from "lucide-react";
import { useTeacherStore } from "@/app/stores/useTeacherStore";
import { supabase } from "@/app/lib/supabaseClient";

export default function TeacherAnalysisModal({ teacherId }) {
  const { startAnalysisPipeline, setSelectedAnalysis } = useTeacherStore();

  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedRubric, setSelectedRubric] = useState("");
  const [rubrics, setRubrics] = useState([]);
  const fileInputRef = useRef(null);

//   Fetch past analyses for this teacher
  useEffect(() => {
    console.log("teacherId", teacherId);    
    const fetchAnalyses = async () => {
      const { data, error } = await supabase
        .from("analysis")
        .select("*")
        .eq("teacher_id", teacherId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching analyses:", error);
      } else {
        setAnalyses(data || []);
      }
      setLoading(false);
    };

    fetchAnalyses();
  }, [teacherId]);

  // Fetch rubrics (your curriculum options)
  useEffect(() => {
    const fetchRubrics = async () => {
      // Replace with your actual rubrics source
      // Example: from a table or hardcode
      const mockRubrics = [
        { id: "lesson_1", title: "lesson_1: Cell Structure and Function" },
        { id: "lesson_2", title: "lesson_2: Nutrition in Humans and Plants" },
        { id: "lesson_3", title: "lesson_3: Photosynthesis and Plant Growth" },
        { id: "lesson_4", title: "lesson_4: Reproduction in Plants" },
        { id: "lesson_5", title: "lesson_5: Micro organisms – Beneficial & Harmful" },
      ];
      setRubrics(mockRubrics);
      setSelectedRubric(mockRubrics[0]?.id || "");
    };

    fetchRubrics();
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("audio/")) {
      setUploadedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!uploadedFile || !selectedRubric) {
      toast.error("Please select an audio file and rubric");
      return;
    }
  
    try {
      // Wait for the entire pipeline to complete
      await startAnalysisPipeline(uploadedFile, selectedRubric, teacherId);
  
      // Now it's safe — the record is saved
      const { data } = await supabase
        .from("analysis")
        .select("*")
        .eq("teacher_id", teacherId)
        .order("created_at", { ascending: false });
  
      setAnalyses(data || []);
  
      toast.success("Analysis complete! Table updated.");
    } catch (err) {
      toast.error("Upload failed");
      console.error(err);
    } finally {
      setUploadedFile(null);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Lesson Analysis History</h3>

      {/* Upload New Analysis */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Upload New Lesson Audio</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Select Rubric</label>
            <select
              value={selectedRubric}
              onChange={(e) => setSelectedRubric(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#34D2A2] focus:border-[#34D2A2]"
            >
              {rubrics.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Audio File</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:border-[#34D2A2] transition text-sm text-gray-700 font-medium text-left"
            >
              {uploadedFile ? uploadedFile.name : "Choose Audio File"}
            </button>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleUpload}
              disabled={!uploadedFile || !selectedRubric}
              className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition inline-flex items-center justify-center gap-2 ${
                uploadedFile && selectedRubric
                  ? "bg-[#0A3E49] text-white hover:bg-[#34D2A2]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Upload className="w-4 h-4" />
              Upload & Analyze
            </button>
          </div>
        </div>
      </div>

      {/* Analysis History Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-gray-700 font-medium">
              <th className="pb-3">Date</th>
              <th className="pb-3">Rubric</th>
              <th className="pb-3 text-center">Overall Score</th>
              <th className="pb-3 text-center">Content</th>
              <th className="pb-3 text-center">Delivery</th>
              <th className="pb-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  Loading analysis history...
                </td>
              </tr>
            ) : analyses.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  No analysis yet. Upload an audio to get started.
                </td>
              </tr>
            ) : (
              analyses.map((a) => {
                const final = a.final_evaluation || {};
                const contentScore = final.content?.content_score || 0;
                const presentationScore = final.presentation
                  ? Math.round(
                      (final.presentation.clarity +
                        final.presentation.tempo +
                        final.presentation.enthusiasm +
                        (100 - final.presentation.silence)) / 4
                    )
                  : 0;

                return (
                  <tr key={a.id} className="border-t hover:bg-gray-50">
                    <td className="py-3">
                      {new Date(a.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3">{a.rubric_id || "Unknown"}</td>
                    <td className="py-3 text-center font-bold">
                      {Math.round(final.final_score || 0)}%
                    </td>
                    <td className="py-3 text-center">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {Math.round(contentScore)}%
                      </span>
                    </td>
                    <td className="py-3 text-center">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {presentationScore}%
                      </span>
                    </td>
                    <td className="py-3 text-center">
                    <button
                        onClick={() => setSelectedAnalysis(a)}
                        className="text-[#34D2A2] hover:underline text-sm"
                        >
                        View Details
                        </button>
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