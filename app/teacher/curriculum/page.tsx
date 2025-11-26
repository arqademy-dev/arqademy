// app/(teacher)/curriculum/page.tsx
import { CheckCircle, Clock, BookOpen, Target } from "lucide-react";
import { Card } from "../../components/ui/Card";

const curriculum = [
  { code: "MATH701", subject: "Mathematics", topic: "Fractions & Decimals", total: 12, completed: 10, status: "active" },
  { code: "ENG702", subject: "English", topic: "Reading Comprehension", total: 15, completed: 15, status: "completed" },
  { code: "SCI703", subject: "Science", topic: "Photosynthesis", total: 8, completed: 6, status: "active" },
  { code: "SST704", subject: "Social Studies", topic: "Nigerian History", total: 10, completed: 3, status: "behind" },
];

export default function CurriculumPage() {
  const overallProgress = Math.round(
    curriculum.reduce((acc, c) => acc + (c.completed / c.total) * 100, 0) / curriculum.length
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0A3E49]">Curriculum Overview</h1>
        <p className="text-gray-600 mt-2">Grade 7 • Term 1 • Official National Curriculum</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="p-6 bg-gradient-to-br from-[#34D2A2] to-emerald-600 text-white">
          <Target className="w-12 h-12 mb-4" />
          <p className="text-white/90">Overall Progress</p>
          <p className="text-4xl font-bold">{overallProgress}%</p>
        </Card>
        <Card className="p-6">
          <BookOpen className="w-12 h-12 text-[#34D2A2] mb-4" />
          <p className="text-gray-600">Total Topics</p>
          <p className="text-4xl font-bold text-[#0A3E49]">{curriculum.length}</p>
        </Card>
        <Card className="p-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <Clock className="w-12 h-12 mb-4" />
          <p className="text-white/90">Term Ends</p>
          <p className="text-3xl font-bold">March 2026</p>
        </Card>
      </div>

      <div className="space-y-6">
        {curriculum.map((item) => (
          <Card key={item.code} className="p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-[#0A3E49]">{item.subject}</h3>
                  <span className="text-sm font-mono bg-gray-100 px-3 py-1 rounded-lg">{item.code}</span>
                </div>
                <p className="text-lg text-gray-700">{item.topic}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-[#0A3E49]">{item.completed}/{item.total}</p>
                <p className="text-sm text-gray-600">lessons covered</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    item.status === "completed" ? "bg-emerald-500" :
                    item.status === "behind" ? "bg-orange-500" : "bg-[#34D2A2]"
                  }`}
                  style={{ width: `${(item.completed / item.total) * 100}%` }}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}