// app/(teacher)/page.tsx → UPGRADED WITH TIMETABLE
import { Mic, Clock, Calendar, CheckCircle,DollarSign, Users, Upload, TrendingUp, BookOpen } from "lucide-react";
import { Card } from "../components/ui/Card";
import Link from "next/link";

const todaySchedule = [
  { time: "08:00 AM", subject: "Mathematics", topic: "Fractions & Decimals", curriculum: "Grade 7 Term 1", completed: true },
  { time: "09:30 AM", subject: "English", topic: "Reading Comprehension", curriculum: "Grade 7 Term 1", completed: true },
  { time: "11:00 AM", subject: "Science", topic: "Photosynthesis", curriculum: "Grade 7 Term 1", completed: false },
  { time: "02:00 PM", subject: "Social Studies", topic: "Nigerian History", curriculum: "Grade 7 Term 1", completed: false },
];

export default function TeacherDashboard() {
  const completedToday = todaySchedule.filter(s => s.completed).length;

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0A3E49]">Welcome back, Sarah!</h1>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">
          Thursday, 26 November 2025 • {completedToday}/{todaySchedule.length} sessions done
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-5 bg-gradient-to-br from-[#34D2A2] to-emerald-600 text-white">
          <DollarSign className="w-8 h-8 mb-2 opacity-90" />
          <p className="text-white/90 text-xs">Earnings Today</p>
          <p className="text-2xl font-bold">$276</p>
        </Card>
        <Card className="p-5">
          <BookOpen className="w-8 h-8 text-[#34D2A2] mb-2" />
          <p className="text-gray-600 text-xs">Curriculum Progress</p>
          <p className="text-2xl font-bold text-[#0A3E49]">68%</p>
        </Card>
        <Card className="p-5">
          <Clock className="w-8 h-8 text-[#34D2A2] mb-2" />
          <p className="text-gray-600 text-xs">Next Session</p>
          <p className="text-2xl font-bold text-[#0A3E49]">11:00 AM</p>
        </Card>
        <Card className="p-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <TrendingUp className="w-8 h-8 mb-2 opacity-90" />
          <p className="text-white/90 text-xs">Weekly Target</p>
          <p className="text-2xl font-bold">89%</p>
        </Card>
      </div>

      {/* Today's Timetable */}
      <Card className="p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#0A3E49] flex items-center gap-2">
            <Calendar className="w-6 h-6" /> Today's Timetable
          </h2>
          <span className="text-sm text-gray-500">Grade 7 • Term 1 Curriculum</span>
        </div>

        <div className="space-y-4">
          {todaySchedule.map((slot, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-emerald-50 transition">
              <div className="flex items-center gap-4">
                <div className="text-lg font-bold text-[#0A3E49] w-20">{slot.time}</div>
                <div>
                  <p className="font-semibold text-[#0A3E49]">{slot.subject}</p>
                  <p className="text-sm text-gray-600">{slot.topic}</p>
                  <p className="text-xs text-gray-500 mt-1">{slot.curriculum}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {slot.completed ? (
                  <CheckCircle className="w-8 h-8 text-emerald-500" />
                ) : (
                  <Link href="/teacher/record">
                    <button className="px-5 py-2 bg-[#34D2A2] text-white rounded-xl font-medium hover:bg-emerald-600 transition">
                      Start
                    </button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/teacher/record">
          <Card className="p-6 text-center hover:shadow-xl transition cursor-pointer border-2 border-dashed border-[#34D2A2]/30">
            <Mic className="w-10 h-10 text-[#34D2A2] mx-auto mb-3" />
            <p className="font-semibold text-[#0A3E49]">Record Session</p>
          </Card>
        </Link>
        <Link href="/teacher/upload">
          <Card className="p-6 text-center hover:shadow-xl transition cursor-pointer">
            <Upload className="w-10 h-10 text-[#34D2A2] mx-auto mb-3" />
            <p className="font-semibold text-[#0A3E49]">Upload Lesson</p>
          </Card>
        </Link>
        <Link href="/teacher/students">
          <Card className="p-6 text-center hover:shadow-xl transition cursor-pointer">
            <Users className="w-10 h-10 text-[#34D2A2] mx-auto mb-3" />
            <p className="font-semibold text-[#0A3E49]">View Students</p>
          </Card>
        </Link>
      </div>
    </>
  );
}