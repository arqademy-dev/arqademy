"use client";

import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { Label } from "@/app/components/ui/Label";
import { Card } from "@/app/components/ui/Card";
import { toast } from "sonner";
import { getSupabase } from "@/app/lib/supabaseClient";

const ROLES = ["teacher", "admin", "super-admin"];

export default function SettingsPage() {
  const [users, setUsers] = useState([]);
  const [teachersWithoutLogin, setTeachersWithoutLogin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("new-user"); // "new-user" or "promote-teacher"

  // Form for new user
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "teacher",
    can_login: true,
  });

  // Form for promoting teacher
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [promotePassword, setPromotePassword] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const supabase = getSupabase();
    setLoading(true);

    // Fetch all users (for list)
    const { data: usersData } = await supabase
      .from("users")
      .select("id, first_name, last_name, email, role, can_login")
      .order("created_at", { ascending: false });

    setUsers(usersData || []);

    // Fetch teachers without user account
    const { data: allUsersEmails } = await supabase.from("users").select("email");
    const userEmails = allUsersEmails?.map(u => u.email) || [];

    const { data: teachers } = await supabase
      .from("teachers")
      .select("id, first_name, last_name, email")
      .not("email", "in", `(${userEmails.length ? userEmails.join(",") : "''"})`);

    setTeachersWithoutLogin(teachers || []);

    setLoading(false);
  };

  // Add completely new user
  const handleAddUser = async () => {
    const supabase = getSupabase();
    if (!newUser.email || !newUser.password) {
      toast.error("Email and password are required");
      return;
    }

    const { data: createdUser, error } = await supabase
      .from("users")
      .insert({
        first_name: newUser.first_name || null,
        last_name: newUser.last_name || null,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
        can_login: newUser.can_login,
      })
      .select()
      .single();

    if (error) {
      toast.error("Failed to create user: " + error.message);
      return;
    }

    if (newUser.role === "teacher") {
      await supabase.from("teachers").insert({
        user_id: createdUser.id,
        first_name: newUser.first_name || null,
        last_name: newUser.last_name || null,
        email: newUser.email,
      });
    }

    toast.success("User added successfully!");
    setNewUser({ first_name: "", last_name: "", email: "", password: "", role: "teacher", can_login: true });
    fetchData();
  };

  // Promote existing teacher
  const handlePromoteTeacher = async () => {
    const supabase = getSupabase();
    if (!selectedTeacherId || !promotePassword) {
      toast.error("Select teacher and password");
      return;
    }

    const teacher = teachersWithoutLogin.find(t => t.id === selectedTeacherId);

    const { error } = await supabase
      .from("users")
      .insert({
        first_name: teacher.first_name,
        last_name: teacher.last_name,
        email: teacher.email,
        password: promotePassword,
        role: "teacher",
        can_login: true,
      });

    if (error) {
      toast.error("Failed to create login: " + error.message);
    } else {
      toast.success(`Login created for ${teacher.first_name} ${teacher.last_name}`);
      setSelectedTeacherId("");
      setPromotePassword("");
      fetchData();
    }
  };

  // Toggle login access
  const toggleLoginAccess = async (userId, currentValue) => {
    const { error } = await supabase
      .from("users")
      .update({ can_login: !currentValue })
      .eq("id", userId);

    if (error) toast.error("Update failed");
    else {
      toast.success("Login access updated");
      fetchData();
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 bg-white ">
      <h1 className="text-3xl font-bold text-gray-900">User Management</h1>

{/* Tabs */}
<div className="flex gap-1 bg-white rounded-lg shadow-sm p-1 border border-gray-200 max-w-md">
  <button
    onClick={() => setActiveTab("new-user")}
    className={`flex-1 px-6 py-3 rounded-md text-sm font-medium transition ${
      activeTab === "new-user"
        ? "bg-[#0A3E49] text-white shadow-sm"
        : "text-gray-600 hover:bg-gray-100"
    }`}
  >
    Add New User
  </button>
  <button
    onClick={() => setActiveTab("promote-teacher")}
    className={`flex-1 px-6 py-3 rounded-md text-sm font-medium transition ${
      activeTab === "promote-teacher"
        ? "bg-[#0A3E49] text-white shadow-sm"
        : "text-gray-600 hover:bg-gray-100"
    }`}
  >
    Existing Teacher
  </button>
</div>

      {/* Add New User Tab */}
      {activeTab === "new-user" && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Create New User Account</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <div>
              <Label>First Name</Label>
              <Input
                value={newUser.first_name}
                onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
                placeholder="John"
              />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input
                value={newUser.last_name}
                onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
                placeholder="Doe"
              />
            </div>
            <div>
              <Label>Email *</Label>
              <Input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>
            <div>
              <Label>Password *</Label>
              <Input
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              />
            </div>
            <div>
              <Label>Role</Label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#34D2A2] focus:border-[#34D2A2]"
              >
                {ROLES.map((role) => (
                  <option key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1).replace("-", " ")}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={newUser.can_login}
                onChange={(e) => setNewUser({ ...newUser, can_login: e.target.checked })}
                className="w-5 h-5 text-[#34D2A2] rounded focus:ring-[#34D2A2]"
              />
              <Label>Can Login</Label>
            </div>
          </div>
          <Button onClick={handleAddUser} className="mt-6">
            Create User
          </Button>
        </Card>
      )}

      {/* Promote Teacher Tab */}
      {activeTab === "promote-teacher" && (
        <Card className="p-6 bg-blue-50 border-blue-200">
          <h2 className="text-xl font-semibold mb-6 text-blue-900">
            Give Login Access to Existing Teacher
          </h2>
          {teachersWithoutLogin.length === 0 ? (
            <p className="text-blue-800">All teachers already have login access.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label>Select Teacher</Label>
                <select
                  value={selectedTeacherId}
                  onChange={(e) => setSelectedTeacherId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#34D2A2] focus:border-[#34D2A2]"
                >
                  <option value="">Choose teacher...</option>
                  {teachersWithoutLogin.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.first_name} {t.last_name} ({t.email})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Set Password</Label>
                <Input
                  type="password"
                  value={promotePassword}
                  onChange={(e) => setPromotePassword(e.target.value)}
                  placeholder="Enter password"
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handlePromoteTeacher}
                  disabled={!selectedTeacherId || !promotePassword}
                >
                  Create Login
                </Button>
              </div>
            </div>
          )}
        </Card>
      )}

      {/* All Users List */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">All Users ({users.length})</h2>
        {loading ? (
          <p className="text-center py-8 text-gray-500">Loading...</p>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {user.first_name || "—"} {user.last_name || "—"}
                    <span className="ml-3 text-sm text-gray-500">({user.role || "No role"})</span>
                  </p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">Can Login</span>
                  <input
                    type="checkbox"
                    checked={user.can_login}
                    onChange={() => toggleLoginAccess(user.id, user.can_login)}
                    className="w-5 h-5 text-[#34D2A2] rounded focus:ring-[#34D2A2] cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}