// app/(teacher)/history/page.tsx
"use client";

import { useState } from "react";
import { Play, Download, Search, Filter, Calendar, DollarSign, Clock, TrendingUp } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";

interface Recording {
  id: string;
  title: string;
  date: string;
  duration: string;
  reward: number;
  clarity: number;
  engagement: number;
  status: "completed" | "pending";
}

const mockRecordings: Recording[] = [
  { id: "1", title: "Introduction to Fractions", date: "Nov 25, 2025", duration: "12:45", reward: 24.50, clarity: 96, engagement: 92, status: "completed" },
  { id: "2", title: "Algebra Basics – Part 1", date: "Nov 24, 2025", duration: "18:20", reward: 32.00, clarity: 94, engagement: 89, status: "completed" },
  { id: "3", title: "Geometry & Shapes", date: "Nov 24, 2025", duration: "09:15", reward: 18.75, clarity: 91, engagement: 87, status: "completed" },
  { id: "4", title: "Morning Reading Session", date: "Nov 23, 2025", duration: "15:30", reward: 21.00, clarity: 88, engagement: 90, status: "pending" },
  { id: "5", title: "Science Experiment Explanation", date: "Nov 22, 2025", duration: "22:10", reward: 38.50, clarity: 97, engagement: 95, status: "completed" },
];

export default function RecordingHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  const filtered = mockRecordings
    .filter(r => r.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(r => filter === "all" || r.status === filter);

  const totalEarnings = filtered.reduce((sum, r) => sum + r.reward, 0).toFixed(2);
  const totalSessions = filtered.length;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0A3E49]">Recording History</h1>
        <p className="text-gray-600 mt-2">View past sessions, earnings, and performance</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-5 bg-gradient-to-br from-[#34D2A2] to-emerald-600 text-white">
          <DollarSign className="w-8 h-8 mb-2 opacity-90" />
          <p className="text-white/90 text-xs">Total Earnings</p>
          <p className="text-2xl font-bold">${totalEarnings}</p>
        </Card>
        <Card className="p-5">
          <Clock className="w-8 h-8 text-[#34D2A2] mb-2" />
          <p className="text-gray-600 text-xs">Total Sessions</p>
          <p className="text-2xl font-bold text-[#0A3E49]">{totalSessions}</p>
        </Card>
        <Card className="p-5">
          <TrendingUp className="w-8 h-8 text-[#34D2A2] mb-2" />
          <p className="text-gray-600 text-xs">Avg. Reward</p>
          <p className="text-2xl font-bold text-[#0A3E49]">
            ${(filtered.length > 0 ? (parseFloat(totalEarnings) / totalSessions).toFixed(2) : "0.00")}
          </p>
        </Card>
        <Card className="p-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <Calendar className="w-8 h-8 mb-2 opacity-90" />
          <p className="text-white/90 text-xs">This Month</p>
          <p className="text-2xl font-bold">Nov 2025</p>
        </Card>
      </div>

      {/* Search + Filter */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search recordings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-[#34D2A2] focus:outline-none"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "primary" : "secondary"}
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button
              variant={filter === "completed" ? "primary" : "secondary"}
              onClick={() => setFilter("completed")}
            >
              Completed
            </Button>
            <Button
              variant={filter === "pending" ? "primary" : "secondary"}
              onClick={() => setFilter("pending")}
            >
              Pending
            </Button>
          </div>
        </div>
      </Card>

      {/* Recordings Table (Mobile Cards on Small Screens) */}
      <div className="space-y-4">
        {filtered.map((rec) => (
          <Card key={rec.id} className="p-5 hover:shadow-lg transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-bold text-[#0A3E49] text-lg">{rec.title}</h3>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> {rec.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {rec.duration}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    rec.status === "completed"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {rec.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#34D2A2]">+${rec.reward.toFixed(2)}</p>
                  <p className="text-xs text-gray-500">Reward earned</p>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="gap-2">
                    <Play className="w-4 h-4" />
                    Play
                  </Button>
                  <Button size="sm" variant="secondary">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Mini Stats */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex gap-6 text-sm">
              <div>
                <span className="text-gray-500">Clarity</span>
                <div className="font-bold text-[#0A3E49]">{rec.clarity}%</div>
              </div>
              <div>
                <span className="text-gray-500">Engagement</span>
                <div className="font-bold text-[#0A3E49]">{rec.engagement}%</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}