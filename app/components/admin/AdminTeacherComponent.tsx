"use client";

import { useState } from "react";
import { Card } from "../ui/Card";
import { 
  TrendingUp, Upload, Mic, Target, Award, Calendar, BarChart3, Users, Clock, Star, 
  ArrowUpRight, X, User, BookOpen, MessageSquare, ChevronRight, Search
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function TeacherAnalytics() {
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy Teachers Data
  const teachers = [
    { id: 1, name: "Sarah Johnson", avatar: "SJ", subjects: ["Mathematics", "Science"], students: 45, engagement: 94, lessons: 32, rewards: "$1,280", trend: "up" },
    { id: 2, name: "Michael Chen", avatar: "MC", subjects: ["English", "Literature"], students: 38, engagement: 89, lessons: 26, rewards: "$980", trend: "up" },
    { id: 3, name: "Emma Davis", avatar: "ED", subjects: ["Physics", "Chemistry"], students: 52, engagement: 96, lessons: 38, rewards: "$1,520", trend: "up" },
    { id: 4, name: "David Ramirez", avatar: "DR", subjects: ["Biology", "Geography"], students: 41, engagement: 85, lessons: 22, rewards: "$840", trend: "down" },
    { id: 5, name: "Olivia Patel", avatar: "OP", subjects: ["History", "Civics"], students: 47, engagement: 91, lessons: 29, rewards: "$1,100", trend: "up" },
  ];

  const filteredTeachers = teachers.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Mock per-teacher data
  const getTeacherDetails = (teacher: any) => ({
    performance: [
      { week: "Week 1", engagement: 88, clarity: 94 },
      { week: "Week 2", engagement: 91, clarity: 96 },
      { week: "Week 3", engagement: 89, clarity: 95 },
      { week: "Week 4", engagement: 94, clarity: 98 },
    ],
    topStudents: [
      { name: "Ahmed K.", engagement: 98, progress: 95 },
      { name: "Fatima Z.", engagement: 96, progress: 92 },
      { name: "Yusuf M.", engagement: 94, progress: 89 },
      { name: "Aisha R.", engagement: 92, progress: 93 },
    ],
    recentLessons: [
      { title: "Introduction to Algebra", date: "Nov 28", duration: "18:42" },
      { title: "Photosynthesis Explained", date: "Nov 27", duration: "22:10" },
      { title: "World War II Overview", date: "Nov 26", duration: "15:30" },
    ]
  });

  const teacherDetails = selectedTeacher ? getTeacherDetails(selectedTeacher) : null;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Header */}
          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl font-bold text-[#0A3E49] flex items-center gap-3 justify-center sm:justify-start">
              <BarChart3 className="w-10 h-10 text-[#0ECB83]" />
              Teacher Performance 
            </h1>
            <p className="text-gray-600 mt-2 text-sm">Click any teacher to view detailed analytics</p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto sm:mx-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search teachers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-3 py-3 bg-white rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-[#0ECB83]/20 text-gray-800 placeholder-gray-400"
            />
          </div>

          {/* Teachers Grid - ALL CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTeachers.map((teacher) => (
              <Card 
                key={teacher.id}
                className="group cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-xl border border-white/20"
                onClick={() => setSelectedTeacher(teacher)}
              >
                <div className="p-6 text-center">

                  {/* Name & Trend */}
                  <h3 className="text-xl font-bold text-[#0A3E49]">{teacher.name}</h3>
                  <div className="flex justify-center gap-1 mt-2">
                    {teacher.trend === "up" ? (
                      <ArrowUpRight className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5 text-red-500 rotate-180" />
                    )}
                    <span className={`text-sm font-medium ${teacher.trend === "up" ? "text-emerald-600" : "text-red-500"}`}>
                      {teacher.trend === "up" ? "+8%" : "-3%"}
                    </span>
                  </div>

                  {/* Subjects */}
                  <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    {teacher.subjects.map((sub) => (
                      <span key={sub} className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full font-medium">
                        {sub}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <Users className="w-5 h-5 text-[#0ECB83] mx-auto mb-1" />
                      <p className="font-bold text-[#0A3E49]">{teacher.students}</p>
                      <p className="text-gray-500">Students</p>
                    </div>
                    <div className="text-center">
                      <TrendingUp className="w-5 h-5 text-[#0ECB83] mx-auto mb-1" />
                      <p className="font-bold text-[#0ECB83]">{teacher.engagement}%</p>
                      <p className="text-gray-500">Engagement</p>
                    </div>
                  </div>

                  {/* CTA */}
                  <button className="mt-6 w-full py-3 bg-[#0ECB83] text-white rounded-xl font-medium hover:bg-[#0ab86f] transition flex items-center justify-center gap-2 group-hover:gap-3">
                    View Details
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                  </button>
                </div>
              </Card>
            ))}
          </div>

          {/* Teacher Detail Modal - FULL CARD EXPERIENCE */}
          {selectedTeacher && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50" onClick={() => setSelectedTeacher(null)}>
              <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
                
                {/* Modal Header */}
                <div className="p-6 bg-gradient-to-r from-[#0ECB83] to-cyan-500 text-white rounded-t-3xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-white/30 backdrop-blur flex items-center justify-center text-3xl font-bold">
                        {selectedTeacher.avatar}
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold">{selectedTeacher.name}</h2>
                        <p className="opacity-90">Top Performing Teacher • {selectedTeacher.subjects.join(" & ")}</p>
                      </div>
                    </div>
                    <button onClick={() => setSelectedTeacher(null)} className="text-white/80 hover:text-white">
                      <X className="w-8 h-8" />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-8">

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { icon: Users, label: "Students", value: selectedTeacher.students },
                      { icon: Upload, label: "Lessons", value: selectedTeacher.lessons },
                      { icon: Award, label: "Rewards", value: selectedTeacher.rewards },
                      { icon: Star, label: "Rating", value: "4.9/5" },
                    ].map((stat) => (
                      <Card key={stat.label} className="p-5 text-center bg-gradient-to-br from-emerald-50 to-white">
                        <stat.icon className="w-8 h-8 text-[#0ECB83] mx-auto mb-2" />
                        <p className="text-2xl font-bold text-[#0A3E49]">{stat.value}</p>
                        <p className="text-gray-600 text-sm">{stat.label}</p>
                      </Card>
                    ))}
                  </div>

                  {/* Performance Chart */}
                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-[#0A3E49] flex items-center gap-3">
                      <TrendingUp className="w-6 h-6 text-[#0ECB83]" />
                      Performance Trend
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={teacherDetails?.performance || []}>
                          <CartesianGrid strokeDasharray="4 4" stroke="#f0f0f0" />
                          <XAxis dataKey="week" />
                          <YAxis />
                          <Tooltip />
                          <Area type="monotone" dataKey="engagement" stroke="#0ECB83" fill="#D1FAE5" strokeWidth={3} />
                          <Area type="monotone" dataKey="clarity" stroke="#34D2A2" fill="#ccfbfe" strokeWidth={3} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>

                  {/* Top Students */}
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-[#0A3E49]">Top Performing Students</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {teacherDetails?.topStudents.map((student, i) => (
                        <Card key={i} className="p-5 flex items-center justify-between hover:shadow-lg transition">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0ECB83] to-cyan-500 flex items-center justify-center text-white font-bold">
                              {student.name[0]}
                            </div>
                            <div>
                              <p className="font-semibold text-[#0A3E49]">{student.name}</p>
                              <p className="text-sm text-gray-600">{student.engagement}% Engagement</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-[#0ECB83]">{student.progress}%</p>
                            <p className="text-xs text-gray-500">Progress</p>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Recent Lessons */}
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-[#0A3E49]">Recent Lessons</h3>
                    <div className="space-y-3">
                      {teacherDetails?.recentLessons.map((lesson, i) => (
                        <Card key={i} className="p-4 flex items-center justify-between hover:bg-emerald-50 transition">
                          <div className="flex items-center gap-4">
                            <Mic className="w-10 h-10 text-[#0ECB83]" />
                            <div>
                              <p className="font-medium text-[#0A3E49]">{lesson.title}</p>
                              <p className="text-sm text-gray-500">{lesson.date} • {lesson.duration}</p>
                            </div>
                          </div>
                          <button className="text-[#0ECB83] font-medium hover:underline">Play</button>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}