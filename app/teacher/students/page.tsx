// app/(teacher)/students/page.tsx
"use client";

import { useState } from "react";
import { Search, Upload, CheckCircle, Clock, AlertCircle, User, Star, TrendingUp } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";

interface Student {
  id: string;
  name: string;
  avatar: string;
  projectsCompleted: number;
  totalProjects: number;
  avgScore: number;
  rewardsEarned: number;
  lastActive: string;
  status: "active" | "behind" | "excellent";
}

const mockStudents: Student[] = [
  { id: "1", name: "Aisha Mohammed", avatar: "A", projectsCompleted: 12, totalProjects: 15, avgScore: 94, rewardsEarned: 280, lastActive: "2 hours ago", status: "excellent" },
  { id: "2", name: "Ibrahim Yusuf", avatar: "I", projectsCompleted: 8, totalProjects: 15, avgScore: 82, rewardsEarned: 190, lastActive: "1 day ago", status: "active" },
  { id: "3", name: "Fatima Ali", avatar: "F", projectsCompleted: 5, totalProjects: 15, avgScore: 71, rewardsEarned: 120, lastActive: "3 days ago", status: "behind" },
  { id: "4", name: "Omar Hassan", avatar: "O", projectsCompleted: 14, totalProjects: 15, avgScore: 96, rewardsEarned: 340, lastActive: "30 min ago", status: "excellent" },
  { id: "5", name: "Zainab Bello", avatar: "Z", projectsCompleted: 10, totalProjects: 15, avgScore: 88, rewardsEarned: 240, lastActive: "5 hours ago", status: "active" },
];

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = mockStudents.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRewards = filtered.reduce((sum, s) => sum + s.rewardsEarned, 0);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0A3E49]">My Students</h1>
        <p className="text-gray-600 mt-2">Track progress, upload projects, and celebrate success</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <Card className="p-6 bg-gradient-to-br from-[#34D2A2] to-emerald-600 text-white">
          <User className="w-10 h-10 mb-3 opacity-90" />
          <p className="text-white/90 text-sm">Total Students</p>
          <p className="text-3xl font-bold">{mockStudents.length}</p>
        </Card>
        <Card className="p-6">
          <CheckCircle className="w-10 h-10 text-[#34D2A2] mb-3" />
          <p className="text-gray-600 text-sm">Projects Submitted</p>
          <p className="text-3xl font-bold text-[#0A3E49]">49/75</p>
        </Card>
        <Card className="p-6">
          <Star className="w-10 h-10 text-[#34D2A2] mb-3" />
          <p className="text-gray-600 text-sm">Avg. Class Score</p>
          <p className="text-3xl font-bold text-[#0A3E49]">87.2%</p>
        </Card>
        <Card className="p-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <TrendingUp className="w-10 h-10 mb-3 opacity-90" />
          <p className="text-white/90 text-sm">Rewards Distributed</p>
          <p className="text-3xl font-bold">${totalRewards}</p>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-[#34D2A2] focus:outline-none"
          />
        </div>
      </Card>

      {/* Student Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((student) => {
          const progress = (student.projectsCompleted / student.totalProjects) * 100;

          return (
            <Card key={student.id} className="p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#34D2A2] to-[#0A3E49] flex items-center justify-center text-white font-bold text-xl">
                    {student.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0A3E49] text-lg">{student.name}</h3>
                    <p className="text-sm text-gray-500">{student.lastActive}</p>
                  </div>
                </div>

                {student.status === "excellent" && <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />}
                {student.status === "behind" && <AlertCircle className="w-6 h-6 text-orange-500" />}
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Project Progress</span>
                  <span className="font-medium">{student.projectsCompleted}/{student.totalProjects}</span>
                </div>
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-700 ${
                      student.status === "excellent" ? "bg-gradient-to-r from-[#34D2A2] to-emerald-500" :
                      student.status === "behind" ? "bg-orange-500" : "bg-blue-500"
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6 text-center">
                <div>
                  <p className="text-2xl font-bold text-[#0A3E49]">{student.avgScore}%</p>
                  <p className="text-xs text-gray-600">Avg Score</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#34D2A2]">${student.rewardsEarned}</p>
                  <p className="text-xs text-gray-600">Rewards</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button className="flex-1 gap-2" size="sm">
                  <Upload className="w-1 h-1" />
                  Upload Work
                </Button>
                <Button variant="secondary" size="sm">
                  View Details
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}