"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Calendar,
  BookOpen,
  Plus,
  X,
} from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { Label } from "@/app/components/ui/Label";
import { Card } from "@/app/components/ui/Card";
import { toast } from "sonner";
import { supabase } from "@/app/lib/supabaseClient";
import { useAuthStore } from "@/app/stores/useAuthStore";

export default function TeacherStudentsDashboard() {
  const { user } = useAuthStore();

  const [teacherClasses, setTeacherClasses] = useState([]);
  const [classesLoading, setClassesLoading] = useState(true);

  const [selectedClass, setSelectedClass] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    project_date: new Date().toISOString().split("T")[0],
    images: [],
  });

  /* ----------------------------------------
     Fetch teacher classes ONLY when user exists
  ----------------------------------------- */
  useEffect(() => {
    if (!user) return;
    fetchTeacherClasses();
  }, [user]);

  const fetchTeacherClasses = async () => {
    try {
      setClassesLoading(true);

      const { data, error } = await supabase
        .from("teacher_subjects")
        .select(`
          class_id,
          subject_id,
          classes (class_name),
          subjects (subject_name)
        `)
        .eq("teacher_id", user?.id);

      if (error) throw error;

      setTeacherClasses(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load classes");
    } finally {
      setClassesLoading(false);
    }
  };

  /* ----------------------------------------
     Create project
  ----------------------------------------- */
  const handleCreateProject = async () => {
    if (!formData.title || !selectedClass || !user) {
      toast.error("Title and class are required");
      return;
    }

    try {
      // Create project
      const { data: project, error: projectError } = await supabase
        .from("projects")
        .insert({
          teacher_id: user.id,
          class_id: selectedClass.class_id,
          title: formData.title,
          description: formData.description,
          project_date: formData.project_date,
        })
        .select()
        .single();

      if (projectError) throw projectError;

      // Assign students
      const { data: students } = await supabase
        .from("students")
        .select("id")
        .eq("class_id", selectedClass.class_id);

      if (students?.length) {
        await supabase.from("student_projects").insert(
          students.map((s) => ({
            student_id: s.id,
            project_id: project.id,
            role: "Participant",
          }))
        );
      }

      // Upload images
      for (const file of formData.images) {
        const filePath = `${project.id}/${Date.now()}_${file.name}`;

        const { error: uploadError } = await supabase.storage
          .from("project-images")
          .upload(filePath, file);

        if (uploadError) continue;

        const publicUrl =
          supabase.storage.from("project-images").getPublicUrl(filePath).data
            .publicUrl;

        await supabase.from("project_images").insert({
          project_id: project.id,
          image_url: publicUrl,
          caption: file.name,
        });
      }

      toast.success("Project created successfully");

      // Reset
      setFormData({
        title: "",
        description: "",
        project_date: new Date().toISOString().split("T")[0],
        images: [],
      });
      setSelectedClass(null);
    } catch (err) {
      toast.error(err.message || "Failed to create project");
    }
  };

  /* ----------------------------------------
     UI
  ----------------------------------------- */
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-2xl font-semibold">
              {user?.first_name || "Teacher"} 👋
            </h1>
            <p className="text-gray-500 text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date().toDateString()}
            </p>
          </div>

          <Card className="p-4 flex items-center gap-3">
            <Users className="w-5 h-5 text-blue-600" />
            <span className="font-semibold">
              {teacherClasses.length} Classes
            </span>
          </Card>
        </div>

        {/* Classes */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold">Your Classes</h2>
            </div>
          </div>

          {classesLoading ? (
            <p className="text-center text-gray-500 py-8">
              Loading classes...
            </p>
          ) : teacherClasses.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No classes assigned
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teacherClasses.map((cls) => (
                <Card key={cls.class_id} className="overflow-hidden">
                  <div className="bg-gradient-to-r from-[#0A3E49] to-[#34D2A2] p-5 text-white">
                    <h3 className="text-lg font-semibold">
                      {cls.classes.class_name}
                    </h3>
                    <p className="text-white/90">
                      {cls.subjects.subject_name}
                    </p>
                  </div>

                  <div className="p-5">
                    <Button
                      className="w-full"
                      onClick={() => setSelectedClass(cls)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Project
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>

        {/* Modal */}
        {selectedClass && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl">
              <div className="flex justify-between items-center p-6 border-b">
                <h3 className="text-lg font-semibold">
                  Add Project – {selectedClass.classes.class_name}
                </h3>
                <button onClick={() => setSelectedClass(null)}>
                  <X />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label>Description</Label>
                  <textarea
                    className="w-full border rounded-lg p-2"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={formData.project_date}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        project_date: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <Label>Images</Label>
                  <Input
                    type="file"
                    multiple
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        images: Array.from(e.target.files || []),
                      })
                    }
                  />
                </div>

                <div className="flex gap-4">
                  <Button className="flex-1" onClick={handleCreateProject}>
                    Create Project
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setSelectedClass(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}