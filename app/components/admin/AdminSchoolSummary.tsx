"use client";

import { useState } from "react";
import { Card } from "../ui/Card";
import {
  TrendingUp,
  Users,
  User,
  Award,
  ArrowUpRight,
  X,
  Building,
  Calendar,
  ChevronRight,
  Search,
  Globe,
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

interface School {
  id: number;
  name: string;
  avatar: string;
  location: string;
  teachers: number;
  students: number;
  engagement: number;
  performance: number;
  awards: number;
  trend: "up" | "down";
}

interface SchoolDetails {
  performance: { week: string; engagement: number; performance: number }[];
  topTeachers: { name: string; engagement: number; students: number }[];
  recentEvents: { event: string; date: string; participants: number }[];
}

export default function AdminSchoolSummary() {
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy Schools Data
  const schools: School[] = [
    { id: 1, name: "Central High School", avatar: "CHS", location: "New York", teachers: 45, students: 1200, engagement: 92, performance: 88, awards: 15, trend: "up" },
    { id: 2, name: "Riverdale Academy", avatar: "RA", location: "Los Angeles", teachers: 38, students: 950, engagement: 89, performance: 85, awards: 12, trend: "up" },
    { id: 3, name: "Oakwood Institute", avatar: "OI", location: "Chicago", teachers: 52, students: 1400, engagement: 95, performance: 92, awards: 18, trend: "up" },
    { id: 4, name: "Maple Grove School", avatar: "MGS", location: "Houston", teachers: 41, students: 1100, engagement: 86, performance: 83, awards: 10, trend: "down" },
    { id: 5, name: "Sunrise Education Center", avatar: "SEC", location: "Miami", teachers: 47, students: 1250, engagement: 91, performance: 89, awards: 14, trend: "up" },
  ];

  const filteredSchools = schools.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Mock per-school details
  const getSchoolDetails = (school: School): SchoolDetails => ({
    performance: [
      { week: "Week 1", engagement: 88, performance: 85 },
      { week: "Week 2", engagement: 91, performance: 88 },
      { week: "Week 3", engagement: 93, performance: 90 },
      { week: "Week 4", engagement: 95, performance: 92 },
    ],
    topTeachers: [
      { name: "Sarah J.", engagement: 96, students: 45 },
      { name: "Michael C.", engagement: 92, students: 38 },
      { name: "Emma D.", engagement: 98, students: 52 },
    ],
    recentEvents: [
      { event: "Science Fair 2025", date: "Dec 15", participants: 200 },
      { event: "Debate Competition", date: "Dec 10", participants: 150 },
      { event: "Sports Day", date: "Dec 05", participants: 300 },
    ],
  });

  const schoolDetails: SchoolDetails | null = selectedSchool ? getSchoolDetails(selectedSchool) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl font-bold text-[#0A3E49] flex items-center gap-3 justify-center sm:justify-start">
            <Globe className="w-10 h-10 text-[#0ECB83]" />
            School Summary Hub
          </h1>
          <p className="text-gray-600 mt-2">Click any school to explore its overview</p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto sm:mx-0">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search schools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-[#0ECB83]/20 text-gray-800 placeholder-gray-400"
          />
        </div>

        {/* Schools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSchools.map((school) => (
            <Card
              key={school.id}
              className="group cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-xl border border-white/20"
              onClick={() => setSelectedSchool(school)}
            >
              <div className="p-6 text-center">

                <h3 className="text-xl font-bold text-[#0A3E49]">{school.name}</h3>
                <p className="text-sm text-gray-600">{school.location}</p>

                <div className="flex justify-center gap-1 mt-2">
                  {school.trend === "up" ? (
                    <ArrowUpRight className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <ArrowUpRight className="w-5 h-5 text-red-500 rotate-180" />
                  )}
                  <span className={`text-sm font-medium ${school.trend === "up" ? "text-emerald-600" : "text-red-500"}`}>
                    {school.trend === "up" ? "+6%" : "-3%"}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <Users className="w-5 h-5 text-[#0ECB83] mx-auto mb-1" />
                    <p className="font-bold text-[#0A3E49]">{school.students}</p>
                    <p className="text-gray-500">Students</p>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="w-5 h-5 text-[#0ECB83] mx-auto mb-1" />
                    <p className="font-bold text-[#0A3E49]">{school.engagement}%</p>
                    <p className="text-gray-500">Engagement</p>
                  </div>
                </div>

                <button className="mt-6 text-xs w-full py-3 bg-[#0ECB83] text-white rounded-xl font-medium hover:bg-[#0ab86f] transition flex items-center justify-center gap-2 group-hover:gap-3">
                  view Summary
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* School Detail Modal */}
        {selectedSchool && schoolDetails && (
          <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedSchool(null)}
          >
            <div
              className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-8 bg-gradient-to-r from-[#0ECB83] to-cyan-500 text-white rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-24 h-24 rounded-full bg-white/30 backdrop-blur flex items-center justify-center text-4xl font-bold">
                      {selectedSchool.avatar}
                    </div>
                    <div>
                      <h2 className="text-4xl font-bold">{selectedSchool.name}</h2>
                      <p className="text-xl opacity-90">
                        {selectedSchool.location} • {selectedSchool.teachers} Teachers • {selectedSchool.students} Students
                      </p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedSchool(null)} className="text-white/80 hover:text-white">
                    <X className="w-9 h-9" />
                  </button>
                </div>
              </div>

              <div className="p-8 space-y-10">

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { icon: Users, label: "Total Students", value: selectedSchool.students },
                    { icon: Building, label: "Teachers", value: selectedSchool.teachers },
                    { icon: TrendingUp, label: "Engagement", value: `${selectedSchool.engagement}%` },
                    { icon: Award, label: "Awards Won", value: selectedSchool.awards },
                  ].map((stat) => (
                    <Card key={stat.label} className="p-6 text-center bg-gradient-to-br from-emerald-50 to-white border border-emerald-100">
                      <stat.icon className="w-10 h-10 text-[#0ECB83] mx-auto mb-3" />
                      <p className="text-3xl font-bold text-[#0A3E49]">{stat.value}</p>
                      <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
                    </Card>
                  ))}
                </div>

                {/* Performance Chart */}
                <Card className="p-8 bg-white/70 backdrop-blur">
                  <h3 className="text-2xl font-bold mb-6 text-[#0A3E49] flex items-center gap-3">
                    <TrendingUp className="w-7 h-7 text-[#0ECB83]" />
                    School Performance Trend
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={schoolDetails.performance}>
                        <CartesianGrid strokeDasharray="4 4" stroke="#f0f0f0" />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(255,255,255,0.95)",
                            border: "none",
                            borderRadius: "12px",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="engagement"
                          stroke="#0ECB83"
                          fill="url(#engagementGrad)"
                          strokeWidth={4}
                        />
                        <Area
                          type="monotone"
                          dataKey="performance"
                          stroke="#34D2A2"
                          fill="url(#performanceGrad)"
                          strokeWidth={4}
                        />
                        <defs>
                          <linearGradient id="engagementGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0ECB83" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#0ECB83" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="performanceGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#34D2A2" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#34D2A2" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                {/* Top Teachers */}
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-[#0A3E49]">Top Performing Teachers</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {schoolDetails.topTeachers.map((teacher, i) => (
                      <Card key={i} className="p-6 hover:shadow-xl transition bg-gradient-to-br from-white to-emerald-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0ECB83] to-cyan-500 flex items-center justify-center text-white font-bold text-xl">
                              {teacher.name[0]}
                            </div>
                            <div>
                              <p className="font-bold text-[#0A3E49]">{teacher.name}</p>
                              <p className="text-sm text-gray-600">{teacher.students} students</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-3xl font-bold text-[#0ECB83]">{teacher.engagement}%</p>
                            <p className="text-xs text-gray-500">Engagement</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Recent Events */}
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-[#0A3E49]">Recent School Events</h3>
                  <div className="space-y-4">
                    {schoolDetails.recentEvents.map((event, i) => (
                      <Card key={i} className="p-6 flex items-center justify-between hover:bg-emerald-50 transition">
                        <div className="flex items-center gap-5">
                          <Calendar className="w-12 h-12 text-[#0ECB83]" />
                          <div>
                            <p className="text-xl font-bold text-[#0A3E49]">{event.event}</p>
                            <p className="text-gray-600">{event.date} • {event.participants} participants</p>
                          </div>
                        </div>
                        <button className="px-6 py-3 bg-[#0ECB83] text-white rounded-xl hover:bg-[#0ab86f] transition font-medium">
                          View Details
                        </button>
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
  );
}