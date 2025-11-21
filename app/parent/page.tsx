'use client';

import { useState } from 'react';
import { ArrowLeft, User, BookOpen, Award, Calendar } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Progress } from '../components/ui/progress';
import Link from 'next/link';

interface ParentDashboardProps {
  onBack: () => void;
}

interface StudentInfo {
  name: string;
  grade: string;
  class: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: string;
  teacher: string;
  dueDate: string;
  grade?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'academic' | 'extracurricular' | 'improvement';
}

export default function ParentDashboard({ onBack }: ParentDashboardProps) {
  const [studentInfo] = useState<StudentInfo>({
    name: 'Emma Johnson',
    grade: '10th Grade',
    class: 'Section A'
  });

  const [projects] = useState<Project[]>([
    { id: '1', title: 'Science Fair Project', description: 'Research on renewable energy sources', progress: 75, status: 'in-progress', teacher: 'Dr. Smith', dueDate: '2025-11-30' },
    { id: '2', title: 'Math Competition Prep', description: 'Advanced calculus problem sets', progress: 60, status: 'in-progress', teacher: 'Prof. Johnson', dueDate: '2025-11-20' },
    { id: '3', title: 'History Research Paper', description: 'World War II impact analysis', progress: 100, status: 'completed', teacher: 'Ms. Williams', dueDate: '2025-11-05', grade: 'A+' }
  ]);

  const [achievements] = useState<Achievement[]>([
    { id: '1', title: 'Perfect Attendance', description: 'No absences for the entire semester', date: '2025-11-01', type: 'academic' },
    { id: '2', title: 'Science Excellence', description: 'Top score in midterm examination', date: '2025-10-15', type: 'academic' },
    { id: '3', title: 'Most Improved', description: '25% improvement in Math scores', date: '2025-10-01', type: 'improvement' }
  ]);

  const overallProgress = Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button onClick={onBack} variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-semibold">Parent Dashboard</h1>
            <p className="text-gray-600">Monitor your student's academic progress</p>
          </div>
        </div>

        {/* Student Info */}
        <div className="bg-white p-4 rounded shadow mb-8">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-5 h-5 text-gray-600" />
            <h2 className="font-semibold">Student Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <div>
              <p className="text-gray-500 text-sm">Name</p>
              <p>{studentInfo.name}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Grade</p>
              <p>{studentInfo.grade}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Class</p>
              <p>{studentInfo.class}</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { icon: BookOpen, label: 'Active Projects', value: projects.filter(p => p.status !== 'completed').length, color: 'purple' },
            { icon: Award, label: 'Achievements', value: achievements.length, color: 'yellow' },
            { icon: Calendar, label: 'Overall Progress', value: `${overallProgress}%`, color: 'blue' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-4 rounded shadow flex flex-col items-center">
              <stat.icon className={`w-6 h-6 text-${stat.color}-600 mb-2`} />
              <p className="text-gray-700">{stat.label}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Projects */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Academic Projects</h2>
          <div className="space-y-4">
            {projects.map(project => (
              <div key={project.id} className="bg-white p-4 rounded shadow hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium flex items-center gap-2">
                      {project.title}
                      {project.grade && (
                        <span className="px-2 py-1 bg-gray-100 rounded text-sm">{project.grade}</span>
                      )}
                    </h3>
                    <p className="text-gray-600">{project.description}</p>
                    <p className="text-gray-500 text-sm mt-1">
                      Teacher: {project.teacher} | Due: {new Date(project.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-sm ${project.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {project.status === 'completed' ? 'Completed' : 'In Progress'}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-gray-600 text-sm">Progress:</span>
                  <Progress value={project.progress} className="flex-1" />
                  <span className="text-gray-600 text-sm">{project.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Achievements & Recognition</h2>
          <div className="space-y-4">
            {achievements.map(ach => (
              <div key={ach.id} className="bg-white p-4 rounded shadow hover:shadow-md transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{ach.title}</h3>
                    <p className="text-gray-600">{ach.description}</p>
                    <p className="text-gray-500 text-sm mt-1">{new Date(ach.date).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    ach.type === 'academic' ? 'bg-green-100 text-green-800' :
                    ach.type === 'improvement' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {ach.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
