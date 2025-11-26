// app/(teacher)/achievements/page.tsx
"use client";

import { Trophy, Flame, Target, Star, Award, Zap, Crown, Medal, Gift, Lock, Mic, Users, DollarSign } from "lucide-react";
import { Card } from "../../components/ui/Card";

export default function AchievementsPage() {
  const totalPoints = 2850;
  const level = 24;
  const nextLevelPoints = 3000;

  const achievements = [
    { id: 1, name: "First Recording", icon: Mic, color: "emerald", earned: true, points: 50 },
    { id: 2, name: "10 Sessions", icon: Trophy, color: "yellow", earned: true, points: 200 },
    { id: 3, name: "Perfect Clarity", icon: Target, color: "purple", earned: true, points: 300 },
    { id: 4, name: "Streak Master", icon: Flame, color: "orange", earned: true, points: 500, desc: "7-day streak" },
    { id: 5, name: "Top 10 Teacher", icon: Crown, color: "yellow", earned: true, points: 1000 },
    { id: 6, name: "Student Champion", icon: Users, color: "blue", earned: false, points: 800, desc: "Help 20 students complete projects" },
    { id: 7, name: "Voice Legend", icon: Zap, color: "pink", earned: false, points: 2000 },
    { id: 8, name: "Millionaire Teacher", icon: DollarSign, color: "green", earned: false, points: 5000 },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0A3E49]">Achievements & Rewards</h1>
        <p className="text-gray-600 mt-3 text-lg">Celebrate your impact. Every session counts!</p>
      </div>

      {/* Level & Progress */}
      <Card className="p-8 mb-10 bg-gradient-to-br from-[#34D2A2] via-emerald-500 to-[#0A3E49] text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Trophy className="w-14 h-14" />
              </div>
              <div>
                <p className="text-white/80">Current Level</p>
                <p className="text-5xl font-bold">{level}</p>
                <p className="text-2xl">Elite Educator</p>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-md">
            <div className="flex justify-between text-sm mb-2">
              <span>{totalPoints} pts</span>
              <span>{nextLevelPoints} pts</span>
            </div>
            <div className="h-8 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full flex items-center justify-end pr-4 font-bold"
                style={{ width: `${(totalPoints / nextLevelPoints) * 100}%` }}
              >
                {(totalPoints / nextLevelPoints * 100).toFixed(0)}%
              </div>
            </div>
            <p className="text-center mt-2 text-sm">Only {nextLevelPoints - totalPoints} points to Level {level + 1}!</p>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
        <Card className="p-6 text-center">
          <Medal className="w-12 h-12 mx-auto mb-3 text-yellow-500" />
          <p className="text-3xl font-bold text-[#0A3E49]">{achievements.filter(a => a.earned).length}</p>
          <p className="text-gray-600">Unlocked</p>
        </Card>
        <Card className="p-6 text-center">
          <Gift className="w-12 h-12 mx-auto mb-3 text-purple-500" />
          <p className="text-3xl font-bold text-[#0A3E49]">${totalPoints}</p>
          <p className="text-gray-600">Total Points</p>
        </Card>
        <Card className="p-6 text-center">
          <Flame className="w-12 h-12 mx-auto mb-3 text-orange-500" />
          <p className="text-3xl font-bold text-[#0A3E49]">18</p>
          <p className="text-gray-600">Day Streak</p>
        </Card>
        <Card className="p-6 text-center bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
          <Crown className="w-12 h-12 mx-auto mb-3" />
          <p className="text-3xl font-bold">#4</p>
          <p className="text-white/90">National Rank</p>
        </Card>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {achievements.map((ach) => {
          const Icon = ach.icon;
          const colorClasses = {
            emerald: "bg-emerald-100 text-emerald-600",
            yellow: "bg-yellow-100 text-yellow-600",
            purple: "bg-purple-100 text-purple-600",
            orange: "bg-orange-100 text-orange-600",
            blue: "bg-blue-100 text-blue-600",
            pink: "bg-pink-100 text-pink-600",
            green: "bg-green-100 text-green-600",
          };

          return (
            <Card
              key={ach.id}
              className={`p-6 text-center transition-all ${ach.earned ? "hover:scale-105 shadow-lg" : "opacity-60 grayscale"}`}
            >
              <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${colorClasses[ach.color as keyof typeof colorClasses]}`}>
                {ach.earned ? <Icon className="w-10 h-10" /> : <Lock className="w-10 h-10" />}
              </div>
              <h3 className="font-bold text-[#0A3E49]">{ach.name}</h3>
              {ach.desc && <p className="text-xs text-gray-500 mt-1">{ach.desc}</p>}
              <p className="text-2xl font-bold text-[#34D2A2] mt-3">+{ach.points}</p>
              {ach.earned && <p className="text-xs text-green-600 mt-2 font-medium">Unlocked!</p>}
            </Card>
          );
        })}
      </div>

      {/* Final Motivational Note */}
      <div className="mt-12 text-center">
        <p className="text-xl font-medium text-[#0A3E49]">
          Keep teaching with passion — your next milestone is closer than you think!
        </p>
      </div>
    </div>
  );
}