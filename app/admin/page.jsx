"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Users, BookOpen, BarChart2, School, ChevronDown, GraduationCap, 
  TrendingUp, Award, X, Printer, Upload, FileAudio, Calendar, Target, Clock 
} from "lucide-react";
import { Dialog } from "@headlessui/react";
import { useAdminStore } from "@/app/stores/useAdminStore";
import { useTeacherStore } from "@/app/stores/useTeacherStore";
import TeacherDetailModal from "@/app/components/admin/TeacherDetailModal";
import AnalysisResultsModal from "@/app/components/teacher/AnalysisResultsModal";
import ProcessingModal from "@/app/components/teacher/ProcessingModal";

const Card = ({ children, className = "", onClick }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`} onClick={onClick}>
    {children}
  </div>
);

export default function AdminDashboard() {
  const {
    schools,
    teachers: allTeachers,
    students: allStudents,
    selectedTeacher,
    selectedStudent,
    selectedSchool,
    loading,
    loadAdminData,
    viewTeacherDetails,
    viewStudentDetails,
    viewSchoolDetails,
    clearSelected,
  } = useAdminStore();

  const { uploadAudio } = useTeacherStore();

  const [activeTab, setActiveTab] = useState("teachers");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSchoolState, setSelectedSchoolState] = useState(null);

  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    loadAdminData();
  }, [loadAdminData]);

  // Auto-select first school on load
  useEffect(() => {
    if (schools.length > 0 && !selectedSchoolState) {
      setSelectedSchoolState(schools[0]);
    }
  }, [schools]);

  // Filtered lists
  const teachers = selectedSchoolState
    ? allTeachers.filter(t => t.school_id === selectedSchoolState.id)
    : allTeachers;

  const students = selectedSchoolState
    ? allStudents.filter(s => s.school_id === selectedSchoolState.id)
    : allStudents;

  const handleTeacherClick = (teacher) => viewTeacherDetails(teacher.id);
  const handleStudentClick = (student) => viewStudentDetails(student.id);
  const handleSchoolClick = (school) => {
    setSelectedSchoolState(school);
    setIsDropdownOpen(false);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("audio/")) {
      setUploadedFile(file);
    }
  };

  const handleUploadAudio = () => {
    if (uploadedFile && selectedTeacher) {
      uploadAudio(uploadedFile, selectedTeacher.id);
      setUploadedFile(null);
    }
  };

  const handlePrintReport = (name) => {
    alert(`Printing report for ${name || selectedSchoolState?.school_name || "school"}...`);
    window.print();
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 flex items-center gap-2">
                <School className="w-5 h-5 text-[#34D2A2]" />
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">Manage schools, teachers & students</p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => handlePrintReport()}
                className="px-4 py-2 bg-[#0A3E49] text-white rounded-lg hover:bg-[#34D2A2] transition text-sm font-medium inline-flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Print Report</span>
              </button>

              {/* School Selector */}
              <div className="relative flex-1 sm:flex-initial">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-between gap-3 px-4 py-2.5 bg-white rounded-lg border border-gray-300 hover:border-[#34D2A2] transition w-full sm:w-auto text-left"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">
                      {selectedSchoolState?.school_name || "Select School"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {selectedSchoolState?.address || "—"} • {students.length} students
                    </p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform flex-shrink-0 ${isDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50 max-h-64 overflow-y-auto">
                    {schools.map((school) => (
                      <button
                        key={school.id}
                        onClick={() => handleSchoolClick(school)}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-[#34D2A2] hover:bg-opacity-10 transition ${
                          selectedSchoolState?.id === school.id ? "bg-[#34D2A2] bg-opacity-10 font-medium" : ""
                        }`}
                      >
                        <p className="font-medium text-gray-900">{school.school_name}</p>
                        <p className="text-xs text-gray-500">{school.address || "No address"}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="flex gap-1 bg-white rounded-lg shadow-sm p-1 border border-gray-200">
          {[
            { id: "teachers", label: "Teachers", icon: BookOpen },
            { id: "students", label: "Students", icon: Users },
            { id: "summary", label: "Summary", icon: BarChart2 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition flex-1 ${
                activeTab === tab.id
                  ? "bg-[#0A3E49] text-white shadow-sm"
                  : "text-gray-600 hover:bg-[#34D2A2] hover:bg-opacity-10"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === "teachers" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Teachers Overview</h2>
              <span className="text-sm text-gray-500">{teachers.length} total</span>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {teachers.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No teachers in this school</p>
              ) : (
                teachers.map((teacher) => (
                  <Card 
                    key={teacher.id} 
                    className="p-4 hover:shadow-md hover:border-[#34D2A2] transition cursor-pointer"
                    onClick={() => handleTeacherClick(teacher)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-12 h-12 rounded-lg bg-[#34D2A2] bg-opacity-10 flex items-center justify-center flex-shrink-0">
                          <GraduationCap className="w-6 h-6 text-[#0A3E49]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate">
                            {teacher.first_name} {teacher.last_name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {teacher.schools?.school_name || "No school"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-lg font-semibold text-gray-900">—</p>
                          <p className="text-xs text-gray-500">Students</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-[#34D2A2]">—</p>
                          <p className="text-xs text-gray-500">Performance</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-gray-900">—</p>
                          <p className="text-xs text-gray-500">Sessions</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "students" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Students Overview</h2>
              <span className="text-sm text-gray-500">{students.length} total</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {students.length === 0 ? (
                <p className="text-center text-gray-500 py-8 col-span-full">No students found</p>
              ) : (
                students.map((student) => (
                  <Card key={student.id} className="overflow-hidden hover:shadow-lg transition">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-center">
                      <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-md">
                        <span className="text-3xl font-bold text-purple-600">
                          {student.first_name[0]}{student.last_name[0]}
                        </span>
                      </div>
                      <h3 className="mt-4 text-xl font-semibold text-white">
                        {student.first_name} {student.last_name}
                      </h3>
                      <p className="text-purple-200 text-sm mt-1">
                        {student.classes?.class_name || "No class"} • {student.schools?.school_name || "No school"}
                      </p>
                    </div>

                    {/* Projects Section */}
                    <div className="p-6">
                      <h4 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-purple-600" />
                        Projects Involved In
                      </h4>

                      {student.student_projects?.length > 0 ? (
                        <div className="space-y-4">
                          {student.student_projects.map((sp) => {
                            const proj = sp.projects;
                            return (
                              <div key={sp.id} className="border-l-4 border-purple-500 pl-4">
                                <p className="font-medium text-gray-900">{proj.title}</p>
                                <p className="text-sm text-gray-600">{proj.description || "No description"}</p>
                                <div className="mt-2 flex items-center gap-3 text-sm">
                                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                                    Role: {sp.role}
                                  </span>
                                  <span className="text-gray-500">
                                    {new Date(proj.project_date).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-center text-gray-500 py-4">No projects yet</p>
                      )}
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "summary" && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">School Summary</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-[#34D2A2] bg-opacity-10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#0A3E49]" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-gray-900">{students.length}</p>
                    <p className="text-xs text-gray-500">Total Students</p>
                  </div>
                </div>
              </Card>

              <Card className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-gray-900">{teachers.length}</p>
                    <p className="text-xs text-gray-500">Total Teachers</p>
                  </div>
                </div>
              </Card>

              <Card className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-gray-900">—</p>
                    <p className="text-xs text-gray-500">Avg Performance</p>
                  </div>
                </div>
              </Card>

              <Card className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                    <Award className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-gray-900">—</p>
                    <p className="text-xs text-gray-500">Active Sessions</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Performance by Subject */}
            <Card className="p-5">
              <h3 className="text-base font-medium text-gray-900 mb-4">Performance by Subject</h3>
              <div className="space-y-3">
                <p className="text-center text-gray-500 py-4">Coming soon...</p>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Teacher Detail Modal */}
      {/* <Dialog open={!!selectedTeacher} onClose={clearSelected} className="relative z-50"> */}
       <TeacherDetailModal />
      {/* </Dialog> */}

      {/* Student Detail Modal */}
      <Dialog open={!!selectedStudent} onClose={clearSelected} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            {selectedStudent && (
              <div>
                <div className="sticky top-0 bg-white border-b border-gray-200 p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 font-semibold text-xl">
                      {selectedStudent.first_name[0]}{selectedStudent.last_name[0]}
                    </div>
                    <div>
                      <Dialog.Title className="text-xl font-semibold text-gray-900">
                        {selectedStudent.first_name} {selectedStudent.last_name}
                      </Dialog.Title>
                      <p className="text-sm text-gray-500">
                        {selectedStudent.classes?.class_name || "No class"} • {selectedStudent.schools?.school_name || "No school"}
                      </p>
                    </div>
                  </div>
                  <button onClick={clearSelected} className="text-gray-400 hover:text-gray-600">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="p-5 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Admission Number</p>
                      <p className="text-sm font-medium text-gray-900">{selectedStudent.admission_number || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Date of Birth</p>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedStudent.date_of_birth ? new Date(selectedStudent.date_of_birth).toLocaleDateString() : "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Gender</p>
                      <p className="text-sm font-medium text-gray-900">{selectedStudent.gender || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Parent Name</p>
                      <p className="text-sm font-medium text-gray-900">{selectedStudent.parent_name || "N/A"}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-xs text-gray-500 mb-1">Parent Phone</p>
                      <p className="text-sm font-medium text-gray-900">{selectedStudent.parent_phone || "N/A"}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => window.print()}
                    className="w-full px-5 py-3 bg-[#0A3E49] text-white rounded-lg hover:bg-[#34D2A2] transition font-medium flex items-center justify-center gap-2"
                  >
                    <Printer className="w-5 h-5" />
                    Print Student Report
                  </button>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* School Detail Modal */}
      <Dialog open={!!selectedSchool} onClose={clearSelected} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            {selectedSchool && (
              <div>
                <div className="sticky top-0 bg-white border-b border-gray-200 p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-lg bg-[#34D2A2] bg-opacity-10 flex items-center justify-center">
                      <School className="w-7 h-7 text-[#0A3E49]" />
                    </div>
                    <div>
                      <Dialog.Title className="text-xl font-semibold text-gray-900">
                        {selectedSchool.school_name}
                      </Dialog.Title>
                      <p className="text-sm text-gray-500">School Details</p>
                    </div>
                  </div>
                  <button onClick={clearSelected} className="text-gray-400 hover:text-gray-600">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="p-5 space-y-6">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">School Code</p>
                    <p className="text-sm font-medium text-gray-900">{selectedSchool.school_code || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Address</p>
                    <p className="text-sm font-medium text-gray-900">{selectedSchool.address || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Phone</p>
                    <p className="text-sm font-medium text-gray-900">{selectedSchool.phone || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <p className="text-sm font-medium text-gray-900">{selectedSchool.email || "N/A"}</p>
                  </div>

                  <button
                    onClick={() => window.print()}
                    className="w-full px-5 py-3 bg-[#0A3E49] text-white rounded-lg hover:bg-[#34D2A2] transition font-medium flex items-center justify-center gap-2"
                  >
                    <Printer className="w-5 h-5" />
                    Print School Report
                  </button>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>

      <ProcessingModal />

      <AnalysisResultsModal />
    </div>
  );
}