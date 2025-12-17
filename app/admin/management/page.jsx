"use client";

import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { Label } from "@/app/components/ui/Label";
import { Card } from "@/app/components/ui/Card";
import { toast } from "sonner";
import { supabase } from "@/app/lib/supabaseClient";
import { X, Plus, Edit, Trash2 } from "lucide-react";

const TABS = [
  { id: "schools", label: "Schools" },
  { id: "teachers", label: "Teachers" },
  { id: "students", label: "Students" },
  { id: "subjects", label: "Subjects" },
  { id: "classes", label: "Classes" },
];

export default function ManagementPage() {
  const [activeTab, setActiveTab] = useState("schools");
  const [loading, setLoading] = useState(true);

  const [schools, setSchools] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({});

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    await Promise.all([
      fetchSchools(),
      fetchTeachers(),
      fetchStudents(),
      fetchSubjects(),
      fetchClasses(),
    ]);
    setLoading(false);
  };

  const fetchSchools = async () => {
    const { data } = await supabase.from("schools").select("*").order("school_name");
    setSchools(data || []);
  };

  const fetchTeachers = async () => {
    const { data } = await supabase
      .from("teachers")
      .select("*, schools(school_name)")
      .order("first_name");
    setTeachers(data || []);
  };

  const fetchStudents = async () => {
    const { data } = await supabase
      .from("students")
      .select("*, classes(class_name), schools(school_name)")
      .order("first_name");
    setStudents(data || []);
  };

  const fetchSubjects = async () => {
    const { data } = await supabase.from("subjects").select("*").order("subject_name");
    setSubjects(data || []);
  };

  const fetchClasses = async () => {
    const { data } = await supabase.from("classes").select("*").order("class_name");
    setClasses(data || []);
  };

  const handleAddOrEdit = async () => {
    let table;
    let payload = { ...formData };

    switch (activeTab) {
      case "schools":
        table = "schools";
        payload = { school_name: formData.school_name, address: formData.address, school_code: formData.school_code };
        break;
      case "teachers":
        table = "teachers";
        payload = {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          school_id: formData.school_id || null,
        };
        break;
      case "students":
        table = "students";
        payload = {
          first_name: formData.first_name,
          last_name: formData.last_name,
          admission_number: formData.admission_number,
          class_id: formData.class_id || null,
          school_id: formData.school_id || null,
        };
        break;
      case "subjects":
        table = "subjects";
        payload = { subject_name: formData.subject_name };
        break;
      case "classes":
        table = "classes";
        payload = { class_name: formData.class_name };
        break;
    }

    if (editingItem) {
      const { error } = await supabase.from(table).update(payload).eq("id", editingItem.id);
      if (error) toast.error("Failed to update");
      else toast.success("Updated successfully");
    } else {
      const { error } = await supabase.from(table).insert(payload);
      if (error) toast.error("Failed to add: " + error.message);
      else toast.success("Added successfully");
    }

    setShowForm(false);
    setEditingItem(null);
    setFormData({});
    loadAllData();
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete?")) return;

    const table = activeTab;
    const { error } = await supabase.from(table).delete().eq("id", id);

    if (error) toast.error("Failed to delete");
    else toast.success("Deleted successfully");

    loadAllData();
  };

  const startEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setShowForm(true);
  };

  const getTableData = () => {
    switch (activeTab) {
      case "schools":
        return schools;
      case "teachers":
        return teachers;
      case "students":
        return students;
      case "subjects":
        return subjects;
      case "classes":
        return classes;
      default:
        return [];
    }
  };

  const renderForm = () => {
    switch (activeTab) {
      case "schools":
        return (
          <>
            <Label>School Name</Label>
            <Input
              value={formData.school_name || ""}
              onChange={(e) => setFormData({ ...formData, school_name: e.target.value })}
            />
            <Label>Address</Label>
            <Input
              value={formData.address || ""}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
            <Label>School Code</Label>
            <Input
              value={formData.school_code || ""}
              onChange={(e) => setFormData({ ...formData, school_code: e.target.value })}
            />
          </>
        );
      case "teachers":
        return (
          <>
            <Label>First Name</Label>
            <Input
              value={formData.first_name || ""}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
            />
            <Label>Last Name</Label>
            <Input
              value={formData.last_name || ""}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
            />
            <Label>Email</Label>
            <Input
              value={formData.email || ""}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Label>School</Label>
            <select
              value={formData.school_id || ""}
              onChange={(e) => setFormData({ ...formData, school_id: e.target.value || null })}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">No school</option>
              {schools.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.school_name}
                </option>
              ))}
            </select>
          </>
        );
      case "students":
        return (
          <>
            <Label>First Name</Label>
            <Input
              value={formData.first_name || ""}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
            />
            <Label>Last Name</Label>
            <Input
              value={formData.last_name || ""}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
            />
            <Label>Admission Number</Label>
            <Input
              value={formData.admission_number || ""}
              onChange={(e) => setFormData({ ...formData, admission_number: e.target.value })}
            />
            <Label>Class</Label>
            <select
              value={formData.class_id || ""}
              onChange={(e) => setFormData({ ...formData, class_id: e.target.value || null })}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">No class</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.class_name}
                </option>
              ))}
            </select>
            <Label>School</Label>
            <select
              value={formData.school_id || ""}
              onChange={(e) => setFormData({ ...formData, school_id: e.target.value || null })}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">No school</option>
              {schools.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.school_name}
                </option>
              ))}
            </select>
          </>
        );
      case "subjects":
        return (
          <>
            <Label>Subject Name</Label>
            <Input
              value={formData.subject_name || ""}
              onChange={(e) => setFormData({ ...formData, subject_name: e.target.value })}
            />
          </>
        );
      case "classes":
        return (
          <>
            <Label>Class Name</Label>
            <Input
              value={formData.class_name || ""}
              onChange={(e) => setFormData({ ...formData, class_name: e.target.value })}
            />
          </>
        );
    }
  };

  const renderTable = () => {
    const data = getTableData();

    if (loading) return <p className="text-center py-8">Loading...</p>;

    return (
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.id} className="p-4 border rounded-lg flex items-center justify-between hover:bg-gray-50">
            <div>
              {activeTab === "schools" && (
                <>
                  <p className="font-medium">{item.school_name}</p>
                  <p className="text-sm text-gray-600">{item.address}</p>
                </>
              )}
              {activeTab === "teachers" && (
                <>
                  <p className="font-medium">
                    {item.first_name} {item.last_name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {item.email} • {item.schools?.school_name || "No school"}
                  </p>
                </>
              )}
              {activeTab === "students" && (
                <>
                  <p className="font-medium">
                    {item.first_name} {item.last_name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {item.admission_number} • {item.classes?.class_name} • {item.schools?.school_name}
                  </p>
                </>
              )}
              {activeTab === "subjects" && <p className="font-medium">{item.subject_name}</p>}
              {activeTab === "classes" && <p className="font-medium">{item.class_name}</p>}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => startEdit(item)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 bg-white">
      <h1 className="text-3xl font-bold text-gray-900">Management</h1>

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-lg shadow-sm p-1 border border-gray-200">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-md text-sm font-medium transition ${
              activeTab === tab.id
                ? "bg-[#0A3E49] text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Add Button */}
      <div className="flex justify-between items-cente">
        <h2 className="text-xl font-semibold">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add {activeTab.slice(0, -1)}
        </Button>
      </div>

      {/* Table */}
      {renderTable()}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">
                {editingItem ? "Edit" : "Add"} {activeTab.slice(0, -1)}
              </h3>
              <button onClick={() => { setShowForm(false); setEditingItem(null); setFormData({}); }}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {renderForm()}
            </div>
            <div className="flex gap-3 mt-6">
              <Button onClick={handleAddOrEdit}>
                {editingItem ? "Update" : "Add"}
              </Button>
              <Button variant="secondary" onClick={() => { setShowForm(false); setEditingItem(null); setFormData({}); }}>
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}