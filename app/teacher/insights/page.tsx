// app/(teacher)/insights/page.tsx
import { Trophy, TrendingUp, DollarSign, Mic } from "lucide-react";
import { Card } from "../../components/ui/Card";

export default function InsightsPage() {
  const monthlyEarnings = [1850, 2200, 1950, 2800, 3240];
  const months = ["Jul", "Aug", "Sep", "Oct", "Nov"];
  const maxEarnings = Math.max(...monthlyEarnings);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0A3E49]">Insights & Rewards</h1>
        <p className="text-gray-600 mt-2">Your performance, earnings, and achievements in one place</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <Card className="p-6 bg-gradient-to-br from-[#34D2A2] to-emerald-600 text-white">
          <DollarSign className="w-10 h-10 mb-3" />
          <p className="text-white/90 text-sm">Total Earnings</p>
          <p className="text-3xl font-bold">$12,340</p>
        </Card>
        <Card className="p-6">
          <Mic className="w-10 h-10 text-[#34D2A2] mb-3" />
          <p className="text-gray-600 text-sm">Sessions</p>
          <p className="text-3xl font-bold text-[#0A3E49]">142</p>
        </Card>
        <Card className="p-6">
          <TrendingUp className="w-10 h-10 text-[#34D2A2] mb-3" />
          <p className="text-gray-600 text-sm">Quality Score</p>
          <p className="text-3xl font-bold text-[#0A3E49]">93.2%</p>
        </Card>
        <Card className="p-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
          <Trophy className="w-10 h-10 mb-3" />
          <p className="text-white/90 text-sm">Level 24</p>
          <p className="text-3xl font-bold">Elite Educator</p>
        </Card>
      </div>

      {/* Charts + Achievements Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-xl font-bold text-[#0A3E49] mb-6">Earnings Trend</h2>
          <div className="h-64 flex items-end justify-between gap-3">
            {monthlyEarnings.map((v, i) => (
              <div key={i} className="flex-1 text-center">
                <div className="w-full bg-gradient-to-t from-[#34D2A2] to-emerald-400 rounded-t-lg" style={{ height: `${(v / maxEarnings) * 100}%` }} />
                <span className="text-xs text-gray-600 mt-2 block">${v}</span>
                <span className="text-xs text-gray-500">{months[i]}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold text-[#0A3E49] mb-6">Recent Achievements</h2>
          <div className="grid grid-cols-3 gap-4">
            {["First Recording", "10 Sessions", "Perfect Clarity", "Streak Master", "Top 10 Teacher", "Voice Legend"].map((a, i) => (
              <div key={i} className="text-center p-4 bg-emerald-50 rounded-2xl">
                <div className="w-16 h-16 mx-auto bg-emerald-200 rounded-full flex items-center justify-center mb-2">
                  <Trophy className="w-8 h-8 text-emerald-600" />
                </div>
                <p className="text-xs font-medium text-[#0A3E49]">{a}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}