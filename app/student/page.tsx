'use client';

import { useState } from 'react';
import { ArrowLeft, Plus, BookOpen, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Progress } from '../components/ui/progress';
import Navbar from '../components/Navbar';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'in-progress' | 'completed' | 'pending';
  progress: number;
  dueDate: string;
  teacher: string;
}

interface StudentDashboardProps {
  onBack: () => void;
}

export default function StudentDashboard({ onBack }: StudentDashboardProps) {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'Science Fair Project',
      description: 'Research on renewable energy sources',
      status: 'in-progress',
      progress: 65,
      dueDate: '2025-11-30',
      teacher: 'Dr. Smith'
    },
    {
      id: '2',
      title: 'Math Competition Prep',
      description: 'Advanced calculus problem sets',
      status: 'in-progress',
      progress: 45,
      dueDate: '2025-11-20',
      teacher: 'Prof. Johnson'
    },
    {
      id: '3',
      title: 'History Research Paper',
      description: 'World War II impact analysis',
      status: 'completed',
      progress: 100,
      dueDate: '2025-11-05',
      teacher: 'Ms. Williams'
    }
  ]);

  const stats = {
    total: projects.length,
    inProgress: projects.filter(p => p.status === 'in-progress').length,
    completed: projects.filter(p => p.status === 'completed').length,
    avgProgress: Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length)
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-semibold">Student Dashboard</h1>
              <p className="text-gray-600">Track your academic projects</p>
            </div>
          </div>
          <Button onClick={() => alert('Add project functionality')} className="flex items-center gap-2 bg-black hover:bg-gray-950">
            <Plus className="w-4 h-4" />
            Add Project
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded shadow text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span>Total Projects</span>
            </div>
            <div className="text-2xl font-bold">{stats.total}</div>
          </div>

          <div className="bg-white p-4 rounded shadow text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <span>In Progress</span>
            </div>
            <div className="text-2xl font-bold">{stats.inProgress}</div>
          </div>

          <div className="bg-white p-4 rounded shadow text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Completed</span>
            </div>
            <div className="text-2xl font-bold">{stats.completed}</div>
          </div>

          <div className="bg-white p-4 rounded shadow text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <span>Avg Progress</span>
            </div>
            <div className="text-2xl font-bold">{stats.avgProgress}%</div>
          </div>
        </div>

        {/* Projects */}
        <div className="space-y-4">
          {projects.map(project => (
            <div key={project.id} className="bg-white p-4 rounded shadow hover:shadow-lg transition-all">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{project.title}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium
                    ${project.status === 'completed' ? 'bg-green-100 text-green-800' :
                      project.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'}
                  `}
                >
                  {project.status.replace('-', ' ')}
                </span>
              </div>

              <p className="text-gray-600 mb-2">{project.description}</p>
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Teacher: {project.teacher}</span>
                <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
              </div>

              {/* Progress */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Progress:</span>
                <Progress value={project.progress} className="flex-1" />
                <span className="text-sm text-gray-500">{project.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
