"use client";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Card } from "../components/ui/Card";
import { useAuthStore } from "../stores/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading, login } = useAuthStore();

  useEffect(() => {
    if (loading) return;
    if (user) {
      const paths = {
        teacher: "/teacher",
        admin: "/admin",
        "super-admin": "/super-admin",
      };
      router.replace(paths[user.role] || "/");
    }
  }, [user, loading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email")?.toString().trim();
    const password = form.get("password")?.toString();
    if (!email || !password) return;
    await login(email, password);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-700 text-xl font-medium">Loading...</div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-700 text-xl font-medium">Redirecting...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Illustrations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Left Circle Pattern */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#34D2A2]/10 rounded-full blur-3xl"></div>
        
        {/* Bottom Right Wave */}
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-[#0A3E49]/8 rounded-full blur-3xl"></div>
        
        {/* Floating Shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 border-4 border-[#34D2A2]/20 rounded-2xl rotate-12"></div>
        <div className="absolute bottom-32 left-32 w-24 h-24 border-4 border-[#0A3E49]/20 rounded-full"></div>
        
        {/* Small Dots Pattern */}
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-[#34D2A2]/30 rounded-full"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-[#0A3E49]/30 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-[#34D2A2]/30 rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-[#0A3E49]/30 rounded-full"></div>
      </div>

      <Card className="w-full max-w-md shadow-xl bg-white border border-slate-200 relative z-10">
        {/* Header */}
        <div className="bg-[#0A3E49] p-10 text-center rounded-t-xl">
          <h1 className="text-4xl font-bold text-white mb-3">Arqademy</h1>
          <p className="text-white/90 text-base">Voice-Powered Learning Platform</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="teacher@arqademy.edu"
              className="h-11 border-slate-300 focus:border-[#34D2A2] focus:ring-[#34D2A2]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-semibold text-slate-700">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="h-11 border-slate-300 focus:border-[#34D2A2] focus:ring-[#34D2A2]"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold bg-[#0A3E49] hover:bg-[#0d4f5e] text-white transition-colors duration-200"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        {/* Footer */}
        <div className="px-8 pb-6 text-center border-t border-slate-100 pt-6">
          <p className="text-xs text-slate-500">
            Powered by Arqademy © 2025
          </p>
        </div>
      </Card>
    </div>
  );
}