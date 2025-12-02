"use client";

import { useState } from "react";
import AdminTeacherComponent from "../components/admin/AdminTeacherComponent";
import AdminStudentComponent from "../components/admin/AdminStudentComponent";
import AdminSchoolSummary from "../components/admin/AdminSchoolSummary";
import { Users, BookOpen, BarChart2, School, ChevronDown } from "lucide-react";

const schools = [
  { name: "Sunrise High School", location: "New York", students: 1200 },
  { name: "Greenfield Academy", location: "Los Angeles", students: 950 },
  { name: "St. Mary’s Secondary", location: "Chicago", students: 1400 },
  { name: "Oakwood Institute", location: "Houston", students: 1100 },
];

export default function AdminDashboard() {
  const [selectedSchool, setSelectedSchool] = useState(schools[0]);
  const [activeTab, setActiveTab] = useState<"teachers" | "students" | "summary">("teachers");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Title */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0A3E49] flex items-center gap-3">
                <School className="w-8 h-8 text-[#0ECB83]" />
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-1">Manage schools, teachers & students</p>
            </div>

            {/* School Selector - Compact */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all border text-left text-sm"
              >
                <div>
                  <p className="font-medium text-[#0A3E49]">{selectedSchool.name}</p>
                  <p className="text-xs text-gray-600">{selectedSchool.location} • {selectedSchool.students} students</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-[#0ECB83] transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border overflow-hidden z-0">
                  {schools.map((school) => (
                    <button
                      key={school.name}
                      onClick={() => {
                        setSelectedSchool(school);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-emerald-50 transition ${
                        selectedSchool.name === school.name ? "bg-emerald-50 font-medium" : ""
                      }`}
                    >
                      <p className="font-medium text-[#0A3E49]">{school.name}</p>
                      <p className="text-xs text-gray-600">{school.location} • {school.students} students</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs - Compact & Clean */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6">
        <div className="flex gap-1 bg-white/80 backdrop-blur rounded-xl shadow-md p-1">
          {[
            { id: "teachers", label: "Teachers", icon: BookOpen, count: 45 },
            { id: "students", label: "Students", icon: Users, count: 1200 },
            { id: "summary", label: "Summary", icon: BarChart2 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all relative ${
                activeTab === tab.id
                  ? "bg-[#0ECB83] text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="transition-opacity duration-200">
          {activeTab === "teachers" && <AdminTeacherComponent />}
          {activeTab === "students" && <AdminStudentComponent />}
          {activeTab === "summary" && <AdminSchoolSummary />}
        </div>
      </div>

      {/* Optional: Small Floating Badge (removed if too much) */}
      {/* <div className="fixed bottom-6 right-6 bg-[#0ECB83] text-white px-4 py-3 rounded-2xl shadow-lg text-center">
        <p className="text-xs opacity-90">Total Students</p>
        <p className="text-xl font-bold">3,200+</p>
      </div> */}
    </div>
  );
}