import { create } from "zustand";
import { supabase } from "@/app/lib/supabaseClient";
import { toast } from "sonner";

export const useAdminStore = create((set, get) => ({
  schools: [],
  teachers: [],
  students: [],
  subjects: [],
  classes: [],
  selectedTeacher: null,
  selectedStudent: null,
  selectedSchool: null,
  loading: false,

  fetchSchools: async () => {
    set({ loading: true });
    const { data, error } = await supabase
      .from("schools")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Failed to load schools");
      set({ schools: data || [] });
    } else {
      set({ schools: data || [] });
    }
    set({ loading: false });
  },

  fetchTeachers: async () => {
    set({ loading: true });
    const { data, error } = await supabase
      .from("teachers")
      .select(`
        *,
        schools (school_name)
      `)
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Failed to load teachers");
      set({ teachers: [] });
    } else {
      set({ teachers: data || [] });
    }
    set({ loading: false });
  },

fetchStudents: async () => {
  const { data, error } = await supabase
    .from("students")
    .select(`
      *,
      classes (class_name),
      schools (school_name),
      student_projects (
        role,
        projects (
          id,
          title,
          description,
          project_date
        )
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    toast.error("Failed to load students");
    console.error(error);
  } else {
    set({ students: data || [] });
  }
  set({ loading: false });
},

  viewTeacherDetails: async (teacherId) => {
    set({ loading: true });
    const { data: teacher, error } = await supabase
      .from("teachers")
      .select(`
        *,
        schools (school_name)
      `)
      .eq("id", teacherId)
      .single();
    if (error || !teacher) {
      toast.error("Teacher not found");
      set({ loading: false });
      return;
    }

    const { data: assignments } = await supabase
      .from("teacher_subjects")
      .select(`
        subjects (subject_name),
        classes (class_name)
      `)
      .eq("teacher_id", teacherId);

    const formattedAssignments = assignments?.map(a => ({
      subject: a.subjects.subject_name,
      class: a.classes.class_name
    })) || [];

    set({
      selectedTeacher: {
        ...teacher,
        school_name: teacher.schools?.school_name || "N/A",
        assignments: formattedAssignments
      },
      loading: false
    });
  },

  viewStudentDetails: async (studentId) => {
    set({ loading: true });
    const { data: student, error } = await supabase
      .from("students")
      .select(`
        *,
        classes (class_name),
        schools (school_name)
      `)
      .eq("id", studentId)
      .single();
    if (error || !student) {
      toast.error("Student not found");
      set({ loading: false });
      return;
    }

    set({
      selectedStudent: {
        ...student,
        class_name: student.classes?.class_name || "N/A",
        school_name: student.schools?.school_name || "N/A"
      },
      loading: false
    });
  },

  viewSchoolDetails: async (schoolId) => {
    set({ loading: true });
    const { data: school, error } = await supabase
      .from("schools")
      .select("*")
      .eq("id", schoolId)
      .single();
    if (error || !school) {
      toast.error("School not found");
      set({ loading: false });
      return;
    }

    set({ selectedSchool: school, loading: false });
  },

  clearSelected: () => set({ selectedTeacher: null, selectedStudent: null, selectedSchool: null }),

  setSelectedAnalysis: (analysis) => set({ selectedAnalysis: analysis }),

  loadAdminData: async () => {
    await Promise.all([
      get().fetchSchools(),
      get().fetchTeachers(),
      get().fetchStudents(),
    ]);
  },
}));