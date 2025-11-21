'use client';

import { useState } from 'react';
import { ArrowLeft, Users, Award, BarChart3, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Progress } from '../components/ui/progress';
import Link from 'next/link';

interface TeacherDashboardProps {
  onBack: () => void;
}

interface CompetencyArea {
  area: string;
  score: number;
  feedback: string[];
}

interface Student {
  id: string;
  name: string;
  project: string;
  progress: number;
  grade: string;
}

export default function TeacherDashboard({ onBack }: TeacherDashboardProps) {
  const [competencies] = useState<CompetencyArea[]>([
    { area: 'Subject Knowledge', score: 92, feedback: ['Excellent mastery of curriculum', 'Clear explanations'] },
    { area: 'Student Engagement', score: 88, feedback: ['Interactive teaching methods', 'Good rapport with students'] },
    { area: 'Communication Skills', score: 90, feedback: ['Clear and concise', 'Responsive to questions'] },
    { area: 'Assessment & Feedback', score: 85, feedback: ['Timely grading', 'Constructive comments'] },
    { area: 'Classroom Management', score: 87, feedback: ['Well-organized', 'Maintains positive environment'] }
  ]);

  const [students] = useState<Student[]>([
    { id: '1', name: 'Emma Johnson', project: 'Science Fair Project', progress: 75, grade: 'A' },
    { id: '2', name: 'Liam Smith', project: 'Math Research', progress: 60, grade: 'B+' },
    { id: '3', name: 'Olivia Brown', project: 'History Analysis', progress: 90, grade: 'A+' },
    { id: '4', name: 'Noah Davis', project: 'Literature Review', progress: 55, grade: 'B' },
    { id: '5', name: 'Ava Wilson', project: 'Physics Experiment', progress: 80, grade: 'A-' }
  ]);

  const overallScore = Math.round(competencies.reduce((acc, c) => acc + c.score, 0) / competencies.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-semibold">Teacher Dashboard</h1>
            <p className="text-gray-600">Monitor your teaching competence and student progress</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          {[ 
            { icon: Award, label: 'Overall Score', value: `${overallScore}/100`, color: 'green' },
            { icon: Users, label: 'Students', value: students.length, color: 'blue' },
            { icon: TrendingUp, label: 'Avg Progress', value: `${Math.round(students.reduce((acc, s) => acc + s.progress, 0) / students.length)}%`, color: 'purple' },
            { icon: BarChart3, label: 'Active Projects', value: students.length, color: 'orange' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-4 rounded shadow text-center flex flex-col items-center justify-center">
              <stat.icon className={`w-6 h-6 text-${stat.color}-600 mb-2`} />
              <span className="text-gray-700">{stat.label}</span>
              <div className="text-2xl font-bold mt-1">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Competencies */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Teaching Competencies</h2>
          <div className="space-y-6">
            {competencies.map((competency, idx) => (
              <div key={idx} className="bg-white p-4 rounded shadow hover:shadow-md transition-all">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{competency.area}</h3>
                  <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-sm">{competency.score}/100</span>
                </div>
                <Progress value={competency.score} className="mb-2" />
                <ul className="ml-4 list-disc text-gray-600 text-sm space-y-1">
                  {competency.feedback.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Student Projects */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Student Project Progress</h2>
          <div className="space-y-4">
            {students.map(student => (
              <div key={student.id} className="bg-white p-4 rounded shadow hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{student.name}</h3>
                    <p className="text-gray-600">{student.project}</p>
                  </div>
                  <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-sm">{student.grade}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 text-sm">Progress:</span>
                  <Progress value={student.progress} className="flex-1" />
                  <span className="text-gray-600 text-sm">{student.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
