"use client";

import { Calendar, CheckCircle } from "lucide-react";
import UploadSection from "../components/teacher/UploadSection";
import { useTeacherStore } from "@/app/stores/useTeacherStore";
import ProcessingModal from "../components/teacher/ProcessingModal";
import AnalysisResults from "../components/teacher/AnalysisResults";
import PerformanceOverview from "../components/teacher/PerformanceOverview";
import QuickStats from "../components/teacher/QuickStats";
import AnalysisResultsModal from "../components/teacher/AnalysisResultsModal";

// Get current date in nice format
const formatDate = () => {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return today.toLocaleDateString('en-US', options);
};

export default function TeacherDashboard() {
  const { user, latestAnalysis } = useTeacherStore();

  // Fallback if user not loaded
  const userName = user
    ? `${user.first_name || ''} ${user.last_name || ''}`.trim() || "Teacher"
    : "Teacher";

    console.log(user)

  const todayDate = formatDate();

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-8 bg-gray-50">
      {/* Header Greeting */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl sm:text-3xl font-semibold">
            Welcome back, {userName}!
          </h1>
          <p className="text-gray-800 mt-1 text-xs sm:text-sm flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {todayDate} • 3/4 sessions done
          </p>
        </div>
        <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-[#0ECB83] hidden sm:block" />
      </div>

      {/* 1. Upload Section */}
      <UploadSection />

      {/* 2. Latest Analysis Results (section on page) */}
      {latestAnalysis?.final_evaluation && (
        <AnalysisResults results={latestAnalysis.final_evaluation} />
      )}

      {/* 3. Performance Overview (history table) */}
      <PerformanceOverview />

      {/* 4. Quick Stats */}
      {/* <QuickStats /> */}

      {/* Global Overlays */}
      <ProcessingModal />
      <AnalysisResultsModal />  {/* One modal: after new analysis OR on history row click */}
    </div>
  );
}