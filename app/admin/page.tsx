"use client";

import { useState, useRef } from "react";
import { Users, BookOpen, BarChart2, School, ChevronDown, GraduationCap, TrendingUp, Award, X, Printer, Upload, FileAudio, Calendar, Target, Clock } from "lucide-react";
import { Dialog } from "@headlessui/react";

const schools = [
  { name: "Sunrise High School", location: "New York", students: 1200, teachers: 45 },
  { name: "Greenfield Academy", location: "Los Angeles", students: 950, teachers: 38 },
  { name: "St. Mary's Secondary", location: "Chicago", students: 1400, teachers: 52 },
  { name: "Oakwood Institute", location: "Houston", students: 1100, teachers: 41 },
];

const teachersData = [
  { 
    id: 1, 
    name: "Sarah Johnson", 
    subject: "Mathematics", 
    students: 120, 
    performance: 94, 
    sessions: 156,
    email: "sarah.johnson@school.edu",
    phone: "+1 (555) 123-4567",
    joinDate: "Sep 2020",
    attendance: 98,
    avgRating: 4.8,
    certifications: ["Master's in Mathematics", "Teaching License Grade 7-12"],
    recentPerformance: [
      { month: "Nov", score: 96 },
      { month: "Oct", score: 94 },
      { month: "Sep", score: 92 },
    ]
  },
  { 
    id: 2, 
    name: "Michael Chen", 
    subject: "Physics", 
    students: 98, 
    performance: 91, 
    sessions: 142,
    email: "michael.chen@school.edu",
    phone: "+1 (555) 234-5678",
    joinDate: "Jan 2021",
    attendance: 96,
    avgRating: 4.6,
    certifications: ["PhD in Physics", "Advanced Teaching Methods"],
    recentPerformance: [
      { month: "Nov", score: 93 },
      { month: "Oct", score: 91 },
      { month: "Sep", score: 89 },
    ]
  },
  { 
    id: 3, 
    name: "Emily Rodriguez", 
    subject: "English", 
    students: 135, 
    performance: 96, 
    sessions: 178,
    email: "emily.rodriguez@school.edu",
    phone: "+1 (555) 345-6789",
    joinDate: "Mar 2019",
    attendance: 99,
    avgRating: 4.9,
    certifications: ["Master's in English Literature", "ESL Certified"],
    recentPerformance: [
      { month: "Nov", score: 97 },
      { month: "Oct", score: 96 },
      { month: "Sep", score: 95 },
    ]
  },
  { 
    id: 4, 
    name: "David Kim", 
    subject: "Chemistry", 
    students: 87, 
    performance: 89, 
    sessions: 134,
    email: "david.kim@school.edu",
    phone: "+1 (555) 456-7890",
    joinDate: "Aug 2021",
    attendance: 94,
    avgRating: 4.5,
    certifications: ["Master's in Chemistry", "Lab Safety Certified"],
    recentPerformance: [
      { month: "Nov", score: 90 },
      { month: "Oct", score: 89 },
      { month: "Sep", score: 88 },
    ]
  },
  { 
    id: 5, 
    name: "Lisa Anderson", 
    subject: "Biology", 
    students: 112, 
    performance: 93, 
    sessions: 165,
    email: "lisa.anderson@school.edu",
    phone: "+1 (555) 567-8901",
    joinDate: "Jun 2020",
    attendance: 97,
    avgRating: 4.7,
    certifications: ["PhD in Biology", "Research Methods Certified"],
    recentPerformance: [
      { month: "Nov", score: 95 },
      { month: "Oct", score: 93 },
      { month: "Sep", score: 91 },
    ]
  },
  { 
    id: 6, 
    name: "James Wilson", 
    subject: "History", 
    students: 105, 
    performance: 90, 
    sessions: 148,
    email: "james.wilson@school.edu",
    phone: "+1 (555) 678-9012",
    joinDate: "Feb 2022",
    attendance: 95,
    avgRating: 4.6,
    certifications: ["Master's in History", "Cultural Studies Diploma"],
    recentPerformance: [
      { month: "Nov", score: 92 },
      { month: "Oct", score: 90 },
      { month: "Sep", score: 88 },
    ]
  },
];

const studentsData = [
  { id: 1, name: "Ahmed Hassan", grade: "Grade 9", engagement: 88, tasks: 78, streak: 12 },
  { id: 2, name: "Maria Garcia", grade: "Grade 10", engagement: 92, tasks: 85, streak: 15 },
  { id: 3, name: "John Smith", grade: "Grade 8", engagement: 76, tasks: 65, streak: 8 },
  { id: 4, name: "Yuki Tanaka", grade: "Grade 11", engagement: 95, tasks: 92, streak: 20 },
  { id: 5, name: "Fatima Ali", grade: "Grade 9", engagement: 84, tasks: 74, streak: 10 },
  { id: 6, name: "Carlos Martinez", grade: "Grade 10", engagement: 89, tasks: 81, streak: 14 },
];

const Card = ({ children, className = "", onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`} onClick={onClick}>
    {children}
  </div>
);

export default function AdminDashboard() {
  const [selectedSchool, setSelectedSchool] = useState(schools[0]);
  const [activeTab, setActiveTab] = useState<"teachers" | "students" | "summary">("teachers");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<typeof teachersData[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTeacherClick = (teacher: typeof teachersData[0]) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
    setUploadedFile(null);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("audio/")) {
      setUploadedFile(file);
    }
  };

  const handlePrintReport = (teacherName?: string) => {
    if (teacherName) {
      alert(`Printing detailed report for ${teacherName}...`);
    } else {
      alert(`Printing general school report for ${selectedSchool.name}...`);
    }
    window.print();
  };

  const handleUploadAudio = () => {
    if (uploadedFile && selectedTeacher) {
      alert(`Audio "${uploadedFile.name}" uploaded successfully for ${selectedTeacher.name}!`);
      setUploadedFile(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Title */}
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 flex items-center gap-2">
                <School className="w-5 h-5 text-[#34D2A2]" />
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">Manage schools, teachers & students</p>
            </div>

            {/* Right Side: School Selector + Print Button */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Print General Report Button */}
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
                    <p className="font-medium text-gray-900 text-sm truncate">{selectedSchool.name}</p>
                    <p className="text-xs text-gray-500">{selectedSchool.location} • {selectedSchool.students} students</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform flex-shrink-0 ${isDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
                    {schools.map((school) => (
                      <button
                        key={school.name}
                        onClick={() => {
                          setSelectedSchool(school);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-[#34D2A2] hover:bg-opacity-10 transition ${
                          selectedSchool.name === school.name ? "bg-[#34D2A2] bg-opacity-10" : ""
                        }`}
                      >
                        <p className="font-medium text-gray-900">{school.name}</p>
                        <p className="text-xs text-gray-500">{school.location} • {school.students} students</p>
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
              onClick={() => setActiveTab(tab.id as any)}
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
        
        {/* Teachers Tab */}
        {activeTab === "teachers" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Teachers Overview</h2>
              <span className="text-sm text-gray-500">{teachersData.length} total</span>
            </div>
            
            {/* Scrollable Horizontal Cards */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {teachersData.map((teacher) => (
                <Card 
                  key={teacher.id} 
                  className="p-4 hover:shadow-md hover:border-[#34D2A2] transition cursor-pointer"
                  onClick={() => handleTeacherClick(teacher)}
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Left: Avatar & Info */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-lg bg-[#34D2A2] bg-opacity-10 flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-6 h-6 text-[#0A3E49]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">{teacher.name}</h3>
                        <p className="text-sm text-gray-500">{teacher.subject}</p>
                      </div>
                    </div>

                    {/* Right: Stats */}
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-lg font-semibold text-gray-900">{teacher.students}</p>
                        <p className="text-xs text-gray-500">Students</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-[#34D2A2]">{teacher.performance}%</p>
                        <p className="text-xs text-gray-500">Performance</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-gray-900">{teacher.sessions}</p>
                        <p className="text-xs text-gray-500">Sessions</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === "students" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Students Overview</h2>
              <span className="text-sm text-gray-500">{studentsData.length} total</span>
            </div>
            
            {/* Scrollable Horizontal Cards */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {studentsData.map((student) => (
                <Card key={student.id} className="p-4 hover:shadow-md hover:border-[#34D2A2] transition">
                  <div className="flex items-start justify-between gap-4">
                    {/* Left: Avatar & Info */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 font-semibold flex-shrink-0">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">{student.name}</h3>
                        <p className="text-sm text-gray-500">{student.grade}</p>
                      </div>
                    </div>

                    {/* Right: Stats */}
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-lg font-semibold text-[#34D2A2]">{student.engagement}%</p>
                        <p className="text-xs text-gray-500">Engagement</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-gray-900">{student.tasks}</p>
                        <p className="text-xs text-gray-500">Tasks</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-orange-600">{student.streak}</p>
                        <p className="text-xs text-gray-500">Day Streak</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Summary Tab */}
        {activeTab === "summary" && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">School Summary</h2>
            
            {/* Summary Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-[#34D2A2] bg-opacity-10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#0A3E49]" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-gray-900">{selectedSchool.students}</p>
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
                    <p className="text-2xl font-semibold text-gray-900">{selectedSchool.teachers}</p>
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
                    <p className="text-2xl font-semibold text-gray-900">89%</p>
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
                    <p className="text-2xl font-semibold text-gray-900">1,240</p>
                    <p className="text-xs text-gray-500">Active Sessions</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Performance by Subject */}
            <Card className="p-5">
              <h3 className="text-base font-medium text-gray-900 mb-4">Performance by Subject</h3>
              <div className="space-y-3">
                {[
                  { subject: "Mathematics", score: 94, color: "bg-[#0A3E49]" },
                  { subject: "Physics", score: 91, color: "bg-green-600" },
                  { subject: "English", score: 96, color: "bg-purple-600" },
                  { subject: "Chemistry", score: 89, color: "bg-orange-600" },
                  { subject: "Biology", score: 93, color: "bg-teal-600" },
                ].map((item) => (
                  <div key={item.subject}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">{item.subject}</span>
                      <span className="text-sm font-medium text-gray-900">{item.score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${item.color} transition-all duration-1000`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Teacher Detail Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            {selectedTeacher && (
              <div>
                {/* Modal Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-5 flex items-center justify-between z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-lg bg-[#34D2A2] bg-opacity-10 flex items-center justify-center">
                      <GraduationCap className="w-7 h-7 text-[#0A3E49]" />
                    </div>
                    <div>
                      <Dialog.Title className="text-xl font-semibold text-gray-900">
                        {selectedTeacher.name}
                      </Dialog.Title>
                      <p className="text-sm text-gray-500">{selectedTeacher.subject} Teacher</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(false)} 
                    className="text-gray-400 hover:text-gray-600 transition"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-5 space-y-6">
                  
                  {/* Contact & Basic Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Email</p>
                        <p className="text-sm font-medium text-gray-900">{selectedTeacher.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Phone</p>
                        <p className="text-sm font-medium text-gray-900">{selectedTeacher.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Join Date</p>
                        <p className="text-sm font-medium text-gray-900">{selectedTeacher.joinDate}</p>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-2 gap-3">
                      <Card className="p-3 text-center">
                        <Target className="w-5 h-5 text-[#34D2A2] mx-auto mb-1" />
                        <p className="text-xl font-semibold text-gray-900">{selectedTeacher.performance}%</p>
                        <p className="text-xs text-gray-500">Performance</p>
                      </Card>
                      <Card className="p-3 text-center">
                        <Calendar className="w-5 h-5 text-green-600 mx-auto mb-1" />
                        <p className="text-xl font-semibold text-gray-900">{selectedTeacher.attendance}%</p>
                        <p className="text-xs text-gray-500">Attendance</p>
                      </Card>
                      <Card className="p-3 text-center">
                        <Users className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                        <p className="text-xl font-semibold text-gray-900">{selectedTeacher.students}</p>
                        <p className="text-xs text-gray-500">Students</p>
                      </Card>
                      <Card className="p-3 text-center">
                        <Clock className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                        <p className="text-xl font-semibold text-gray-900">{selectedTeacher.sessions}</p>
                        <p className="text-xs text-gray-500">Sessions</p>
                      </Card>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Certifications</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTeacher.certifications.map((cert, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1.5 bg-[#34D2A2] bg-opacity-10 text-[#0A3E49] rounded-full text-xs font-medium"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Recent Performance Trend */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Recent Performance</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {selectedTeacher.recentPerformance.map((perf) => (
                        <Card key={perf.month} className="p-3 text-center">
                          <p className="text-xs text-gray-500 mb-1">{perf.month}</p>
                          <p className="text-lg font-semibold text-[#34D2A2]">{perf.score}%</p>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Upload Audio Section */}
                  <Card className="p-4 bg-gray-50">
                    <div className="flex items-center gap-2 mb-3">
                      <FileAudio className="w-4 h-4 text-[#0A3E49]" />
                      <h3 className="text-sm font-medium text-gray-900">Upload Audio for {selectedTeacher.name}</h3>
                    </div>
                    <div className="flex gap-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="audio/*"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:border-[#34D2A2] transition text-sm text-gray-700 font-medium"
                      >
                        {uploadedFile ? uploadedFile.name : "Choose Audio File"}
                      </button>
                      <button
                        onClick={handleUploadAudio}
                        disabled={!uploadedFile}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition inline-flex items-center gap-2 ${
                          uploadedFile
                            ? "bg-[#0A3E49] text-white hover:bg-[#34D2A2]"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        <Upload className="w-4 h-4" />
                        Upload
                      </button>
                    </div>
                    {uploadedFile && (
                      <p className="text-xs text-gray-500 mt-2">Selected: {uploadedFile.name}</p>
                    )}
                  </Card>

                  {/* Print Report Button */}
                  <button
                    onClick={() => handlePrintReport(selectedTeacher.name)}
                    className="w-full px-5 py-3 bg-[#0A3E49] text-white rounded-lg hover:bg-[#34D2A2] transition font-medium inline-flex items-center justify-center gap-2"
                  >
                    <Printer className="w-5 h-5" />
                    Print Teacher Report
                  </button>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}