// app/(teacher)/reports/page.tsx
"use client";

import { TrendingUp, TrendingDown, DollarSign, Mic, Award, Calendar } from "lucide-react";
import { Card } from "../../components/ui/Card";

export default function ReportsPage() {
  // Mock data
  const monthlyEarnings = [1200, 1850, 2200, 1950, 2800, 3240];
  const months = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];

  const weeklyData = [
    { day: "Mon", sessions: 8, earnings: 184 },
    { day: "Tue", sessions: 12, earnings: 276 },
    { day: "Wed", sessions: 10, earnings: 230 },
    { day: "Thu", sessions: 15, earnings: 345 },
    { day: "Fri", sessions: 9, earnings: 207 },
    { day: "Sat", sessions: 5, earnings: 115 },
    { day: "Sun", sessions: 3, earnings: 69 },
  ];

  const maxEarnings = Math.max(...monthlyEarnings);
  const maxWeekly = Math.max(...weeklyData.map(d => d.earnings));

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0A3E49]">Reports & Analytics</h1>
        <p className="text-gray-600 mt-2">Track your performance, earnings, and impact over time</p>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <Card className="p-6 bg-gradient-to-br from-[#34D2A2] to-emerald-600 text-white">
          <DollarSign className="w-10 h-10 mb-3 opacity-90" />
          <p className="text-white/90 text-sm">Total Earnings</p>
          <p className="text-3xl font-bold">$12,340</p>
          <p className="text-sm mt-2 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" /> +28% from last month
          </p>
        </Card>

        <Card className="p-6">
          <Mic className="w-10 h-10 text-[#34D2A2] mb-3" />
          <p className="text-gray-600 text-sm">Total Sessions</p>
          <p className="text-3xl font-bold text-[#0A3E49]">142</p>
          <p className="text-sm text-green-600 mt-2">+19 this month</p>
        </Card>

        <Card className="p-6">
          <Award className="w-10 h-10 text-[#34D2A2] mb-3" />
          <p className="text-gray-600 text-sm">Avg. Quality Score</p>
          <p className="text-3xl font-bold text-[#0A3E49]">93.2%</p>
          <p className="text-sm text-green-600 mt-2">Top 5% of teachers</p>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <Calendar className="w-10 h-10 mb-3 opacity-90" />
          <p className="text-white/90 text-sm">Best Month</p>
          <p className="text-3xl font-bold">November</p>
          <p className="text-sm mt-2">Current streak: 18 days</p>
        </Card>
      </div>

      {/* Monthly Earnings Chart */}
      <Card className="p-6 mb-8">
        <h2 className="text-xl font-bold text-[#0A3E49] mb-6">Earnings Over Time</h2>
        <div className="h-64 flex items-end justify-between gap-3">
          {monthlyEarnings.map((value, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-3">
              <div className="w-full relative">
                <div
                  className="absolute bottom-0 w-full bg-gradient-to-t from-[#34D2A2] to-emerald-400 rounded-t-lg transition-all duration-700 hover:to-emerald-500"
                  style={{ height: `${(value / maxEarnings) * 100}%` }}
                />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-sm font-bold text-[#0A3E49]">
                  ${value}
                </span>
              </div>
              <span className="text-xs text-gray-600">{months[i]}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* This Week Breakdown */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-[#0A3E49] mb-6">This Week Performance</h2>
        <div className="space-y-5">
          {weeklyData.map((day) => (
            <div key={day.day} className="flex items-center gap-4">
              <div className="w-16 text-sm font-medium text-gray-700">{day.day}</div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">{day.sessions} sessions</span>
                  <span className="text-sm font-semibold text-[#34D2A2]">${day.earnings}</span>
                </div>
                <div className="w-full h-10 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#34D2A2] to-emerald-500 flex items-center justify-end pr-3 text-xs font-bold text-white"
                    style={{ width: `${(day.earnings / maxWeekly) * 100}%` }}
                  >
                    {day.sessions}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Week Total</p>
            <p className="text-2xl font-bold text-[#0A3E49]">$1,426</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-green-600 font-medium flex items-center gap-1">
              <TrendingUp className="w-4 h-4" /> +42% vs last week
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}