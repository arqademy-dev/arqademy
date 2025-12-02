"use client";

import { Card } from "../../components/ui/Card";
import { 
  Trophy, 
  Flame, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  FileAudio, 
  Users, 
  Calendar,
  Headphones,
  Star
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const studentMetrics = [
  { label: "Tasks Completed", value: 78, icon: CheckCircle, color: "text-emerald-600" },
  { label: "Engagement Score", value: 85, icon: TrendingUp, color: "text-cyan-600" },
  { label: "Reward Points", value: 450, icon: Trophy, color: "text-purple-600" },
  { label: "Current Streak", value: 12, icon: Flame, color: "text-orange-600" },
];

const weeklyProgress = [
  { day: "Mon", status: "done", label: "Done" },
  { day: "Tue", status: "done", label: "Done" },
  { day: "Wed", status: "pending", label: "Pending" },
  { day: "Thu", status: "done", label: "Done" },
  { day: "Fri", status: "pending", label: "Pending" },
  { day: "Sat", status: "done", label: "Done" },
  { day: "Sun", status: "done", label: "Done" },
];

const progressTrend = [
  { week: "Week 1", completion: 60, engagement: 70 },
  { week: "Week 2", completion: 100, engagement: 85 },
  { week: "Week 3", completion: 80, engagement: 75 },
  { week: "Week 4", completion: 92, engagement: 88 },
];

const activeProjects = [
  { name: "Science Fair 2025", subject: "Physics", due: "Dec 20", progress: 78, team: 5 },
  { name: "Group Debate", subject: "English", due: "Dec 15", progress: 92, team: 4 },
  { name: "History Documentary", subject: "History", due: "Jan 10", progress: 45, team: 6 },
];

const audioLessons = [
  { title: "Fractions Made Easy", duration: "12:34", subject: "Math" },
  { title: "Photosynthesis Explained", duration: "18:21", subject: "Science" },
  { title: "World War II Summary", duration: "15:10", subject: "History" },
];

export default function StudentDashboard() {
  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0A3E49]">Hey Ahmed!</h1>
          <p className="text-gray-600 mt-1 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Tuesday, December 02, 2025 • Keep the streak alive!
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-3xl font-bold text-[#0ECB83]">450</p>
            <p className="text-sm text-gray-600 flex items-center justify-end gap-1">
              <Star className="w-4 h-4 text-yellow-500" /> Top 5 in class
            </p>
          </div>
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0ECB83] to-cyan-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            A
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {studentMetrics.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-5 text-center hover:shadow-lg transition-all border">
              <Icon className={`w-10 h-10 mx-auto mb-3 ${stat.color}`} />
              <p className="text-3xl font-bold text-[#0A3E49]">{stat.value}</p>
              <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
            </Card>
          );
        })}
      </div>

      {/* This Week's Progress */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-5">
          <Clock className="w-6 h-6 text-[#0ECB83]" />
          <h2 className="text-xl font-semibold text-[#0A3E49]">This Week's Tasks</h2>
        </div>
        <div className="grid grid-cols-7 gap-3 text-center">
          {weeklyProgress.map((day) => (
            <div key={day.day} className="space-y-2">
              <p className="text-xs text-gray-500 font-medium">{day.day}</p>
              <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center text-white font-bold text-sm
                ${day.status === "done" ? "bg-[#0ECB83]" : "bg-gray-300"}`}>
                {day.status === "done" ? <CheckCircle className="w-6 h-6" /> : "..."}
              </div>
              <p className="text-xs">{day.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <p className="text-2xl font-bold text-[#0ECB83]">5/7 Tasks Completed</p>
          <p className="text-gray-600">Great job! Only 2 more to go</p>
        </div>
      </Card>

      {/* Progress Trend */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-[#0ECB83]" />
          <h2 className="text-xl font-semibold text-[#0A3E49]">Your Progress Trend</h2>
        </div>
        <div className="h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={progressTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="completion" stroke="#0ECB83" fill="#D1FAE5" strokeWidth={3} />
              <Area type="monotone" dataKey="engagement" stroke="#06b6d4" fill="#ccfbfe" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Active Projects */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <Users className="w-7 h-7 text-[#0ECB83]" />
          <h2 className="text-xl font-semibold text-[#0A3E49]">Your Active Projects</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {activeProjects.map((project) => (
            <Card key={project.name} className="p-5 hover:shadow-xl transition-all border-2 hover:border-[#0ECB83]/30">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-[#0A3E49]">{project.name}</h3>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full font-medium">
                  {project.subject}
                </span>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  Due: <span className="font-medium">{project.due}</span>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Your Team Progress</span>
                    <span className="font-bold">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full bg-gradient-to-r from-[#0ECB83] to-cyan-500 transition-all duration-1000"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex -space-x-3">
                    {[...Array(project.team)].map((_, i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-400" />
                    ))}
                  </div>
                  <button className="text-[#0ECB83] font-medium text-sm hover:underline">
                    View Tasks →
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Audio Lessons */}
      <Card className="p-6 bg-gradient-to-br from-emerald-50 to-cyan-50 border-2 border-emerald-200">
        <div className="flex items-center gap-3 mb-5">
          <Headphones className="w-7 h-7 text-[#0ECB83]" />
          <h2 className="text-xl font-semibold text-[#0A3E49]">Latest Audio Lessons</h2>
        </div>
        <div className="space-y-4">
          {audioLessons.map((lesson) => (
            <div key={lesson.title} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#0ECB83] rounded-full flex items-center justify-center">
                  <FileAudio className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#0A3E49]">{lesson.title}</h4>
                  <p className="text-sm text-gray-600">{lesson.subject} • {lesson.duration}</p>
                </div>
              </div>
              <button className="px-6 py-3 bg-[#0ECB83] text-white rounded-xl hover:bg-[#0ab86f] transition flex items-center gap-2">
                <Headphones className="w-5 h-5" />
                Play
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}