"use client";

import { useAuthStore } from "../stores/useAuthStore";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";

export function LoginForm() {
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (data.user) setUser(data.user);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      {/* Email */}
      <div>
        <Label className="text-gray-700">Email Address</Label>
        <Input
          name="email"
          type="email"
          placeholder="teacher@arqademy.edu"
          className="mt-2"
          required
        />
      </div>

      {/* Password */}
      <div>
        <Label className="text-gray-700">Password</Label>
        <Input
          name="password"
          type="password"
          placeholder="••••••••••"
          className="mt-2"
          required
        />
      </div>

      {/* Remember + Forgot */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-gray-300 text-[#34D2A2] focus:ring-[#34D2A2]"
          />
          <span className="text-gray-600">Remember me</span>
        </label>

        <span className="text-[#34D2A2] hover:underline font-medium cursor-pointer">
          Forgot password?
        </span>
      </div>

      {/* Submit */}
      <Button size="lg" className="w-full text-lg">
        Sign In to Arqademy
      </Button>
    </form>
  );
}
