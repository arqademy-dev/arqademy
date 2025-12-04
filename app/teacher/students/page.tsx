"use client";

import React from "react";
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
  Star,
  ChevronRight,
  Target
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// --- Data ---
const studentMetrics = [
  { label: "Tasks Completed", value: 78, icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
  { label: "Engagement Score", value: 85, icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Reward Points", value: 450, icon: Trophy, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Current Streak", value: 12, icon: Flame, color: "text-orange-600", bg: "bg-orange-50" },
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

// Card Component
const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
    {children}
  </div>
);

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Welcome back, Ahmed! 👋</h1>
            <p className="text-gray-500 mt-1 text-sm flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Tuesday, December 02, 2025 • Keep the streak alive!
            </p>
          </div>
          <Card className="p-3 flex items-center gap-3 self-start sm:self-auto">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
              A
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-900 flex items-center gap-1">
                450 <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              </p>
              <p className="text-xs text-gray-500">Reward Points</p>
            </div>
          </Card>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {studentMetrics.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="p-4 text-center hover:shadow-md transition">
                <div className={`w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center ${stat.bg}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                <p className="text-gray-500 text-xs mt-0.5">{stat.label}</p>
              </Card>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Progress and Trends */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Weekly Tasks */}
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-blue-600" />
                <h2 className="text-base font-medium text-gray-900">This Week's Tasks</h2>
              </div>
              
              {/* Progress Summary */}
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-900">5/7 Tasks Completed</p>
                  <p className="text-sm font-medium text-blue-600">71%</p>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-blue-600 transition-all duration-1000"
                    style={{ width: `71%` }}
                  />
                </div>
              </div>

              {/* Day Progress */}
              <div className="grid grid-cols-7 gap-2 text-center">
                {weeklyProgress.map((day) => (
                  <div key={day.day} className="space-y-1.5">
                    <p className="text-xs text-gray-500 font-medium">{day.day}</p>
                    <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center transition-all
                      ${day.status === "done" 
                        ? "bg-green-500 text-white" 
                        : "bg-gray-200 text-gray-400"}`}>
                      {day.status === "done" ? 
                        <CheckCircle className="w-4 h-4" /> : 
                        <Target className="w-4 h-4" />
                      }
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            
            {/* Progress Trend Chart */}
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <h2 className="text-base font-medium text-gray-900">Progress Trend</h2>
              </div>
              <div className="h-64 sm:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={progressTrend}>
                    <defs>
                      <linearGradient id="colorCompletion" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="#6b7280" />
                    <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb', 
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="completion" 
                      name="Task Completion" 
                      stroke="#2563eb" 
                      fill="url(#colorCompletion)" 
                      strokeWidth={2} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="engagement" 
                      name="Engagement" 
                      stroke="#06b6d4" 
                      fill="url(#colorEngagement)" 
                      strokeWidth={2} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Right Column: Projects and Lessons */}
          <div className="space-y-6">
            
            {/* Active Projects */}
            <Card className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <h2 className="text-base font-medium text-gray-900">Active Projects</h2>
                </div>
                <button className="text-xs text-blue-600 hover:text-blue-700 transition">
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {activeProjects.map((project) => (
                  <div 
                    key={project.name} 
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900 text-sm leading-tight">{project.name}</h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{project.due}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-medium">
                        {project.subject}
                      </span>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Users className="w-3 h-3" /> 
                        <span>{project.team} members</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Audio Lessons */}
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <Headphones className="w-4 h-4 text-blue-600" />
                <h2 className="text-base font-medium text-gray-900">Latest Audio Lessons</h2>
              </div>
              <div className="space-y-2">
                {audioLessons.map((lesson) => (
                  <div 
                    key={lesson.title} 
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileAudio className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm truncate">{lesson.title}</h4>
                        <p className="text-xs text-gray-500">{lesson.subject} • {lesson.duration}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition flex-shrink-0" />
                  </div>
                ))}
              </div>
              <button className="mt-3 w-full py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition">
                Explore All Lessons
              </button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}