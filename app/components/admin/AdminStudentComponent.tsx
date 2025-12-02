"use client";

import { useState } from "react";
import { Card } from "../ui/Card";
import {
  Search,
  TrendingUp,
  Award,
  User,
  X,
  ChevronRight,
  Calendar,
  MessageSquare,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Student {
  id: number;
  name: string;
  avatar: string;
  grade: string;
  engagement: number;
  progress: number;
  awards: number;
  trend: "up" | "down";
}

export default function AdminStudentComponent() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const students: Student[] = [
    { id: 1, name: "Ahmed Yusuf", avatar: "AY", grade: "10th", engagement: 94, progress: 91, awards: 8, trend: "up" },
    { id: 2, name: "Fatima Ali", avatar: "FA", grade: "9th", engagement: 97, progress: 95, awards: 10, trend: "up" },
    { id: 3, name: "Omar Khan", avatar: "OK", grade: "11th", engagement: 85, progress: 82, awards: 4, trend: "down" },
    { id: 4, name: "Aisha Rahman", avatar: "AR", grade: "8th", engagement: 92, progress: 89, awards: 7, trend: "up" },
    { id: 5, name: "Zainab Hassan", avatar: "ZH", grade: "10th", engagement: 89, progress: 87, awards: 6, trend: "up" },
    { id: 6, name: "Ibrahim Musa", avatar: "IM", grade: "9th", engagement: 88, progress: 85, awards: 5, trend: "up" },
  ];

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.grade.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStudentDetails = (student: Student) => ({
    weeklyProgress: [
      { week: "Week 1", engagement: 88, progress: 85 },
      { week: "Week 2", engagement: 91, progress: 89 },
      { week: "Week 3", engagement: 93, progress: 92 },
      { week: "Week 4", engagement: 95, progress: 94 },
    ],
    topSubjects: [
      { subject: "Mathematics", score: 96 },
      { subject: "Science", score: 93 },
      { subject: "English", score: 89 },
    ],
    recentActivity: [
      { action: "Completed Algebra Quiz", date: "Dec 1", score: "98%" },
      { action: "Submitted Project", date: "Nov 29", score: "A" },
      { action: "Active in Class Debate", date: "Nov 27", score: "Excellent" },
    ],
  });

  const details = selectedStudent ? getStudentDetails(selectedStudent) : null;

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search students by name or grade..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0ECB83]/30"
        />
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredStudents.map((student) => (
          <Card
            key={student.id}
            className="p-5 hover:shadow-lg transition-shadow cursor-pointer border"
            onClick={() => setSelectedStudent(student)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0ECB83] to-cyan-500 flex items-center justify-center text-white font-semibold">
                {student.avatar}
              </div>
              <div className="text-right">
                {student.trend === "up" ? (
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                ) : (
                  <TrendingUp className="w-5 h-5 text-red-500 rotate-180" />
                )}
              </div>
            </div>

            <h3 className="font-semibold text-[#0A3E49]">{student.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{student.grade} Grade</p>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Engagement</span>
                <span className="font-medium">{student.engagement}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium">{student.progress}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Awards</span>
                <span className="font-medium text-[#0ECB83]">{student.awards}</span>
              </div>
            </div>

            <button className="mt-4 w-full text-sm text-[#0ECB83] font-medium hover:underline flex items-center justify-center gap-1">
              View Profile
              <ChevronRight className="w-4 h-4" />
            </button>
          </Card>
        ))}
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && details && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedStudent(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0ECB83] to-cyan-500 flex items-center justify-center text-white text-2xl font-bold">
                  {selectedStudent.avatar}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#0A3E49]">{selectedStudent.name}</h2>
                  <p className="text-gray-600">{selectedStudent.grade} • Engagement: {selectedStudent.engagement}%</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-8">

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-3xl font-bold text-[#0ECB83]">{selectedStudent.progress}%</p>
                  <p className="text-sm text-gray-600 mt-1">Overall Progress</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-3xl font-bold text-[#0A3E49]">{selectedStudent.engagement}%</p>
                  <p className="text-sm text-gray-600 mt-1">Engagement Rate</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-3xl font-bold text-purple-600">{selectedStudent.awards}</p>
                  <p className="text-sm text-gray-600 mt-1">Awards Earned</p>
                </div>
              </div>

              {/* Chart */}
              <div>
                <h3 className="font-semibold text-[#0A3E49] mb-3">Weekly Performance</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={details.weeklyProgress}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="engagement" stroke="#0ECB83" fill="#D1FAE5" />
                      <Area type="monotone" dataKey="progress" stroke="#34D2A2" fill="#ccfbfe" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Top Subjects */}
              <div>
                <h3 className="font-semibold text-[#0A3E49] mb-3">Best Subjects</h3>
                <div className="grid grid-cols-3 gap-3">
                  {details.topSubjects.map((sub, i) => (
                    <div key={i} className="p-4 bg-emerald-50 rounded-lg text-center">
                      <p className="font-medium">{sub.subject}</p>
                      <p className="text-2xl font-bold text-[#0ECB83] mt-1">{sub.score}%</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="font-semibold text-[#0A3E49] mb-3">Recent Activity</h3>
                <div className="space-y-3">
                  {details.recentActivity.map((act, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">{act.action}</p>
                          <p className="text-xs text-gray-500">{act.date}</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-[#0ECB83]">{act.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}