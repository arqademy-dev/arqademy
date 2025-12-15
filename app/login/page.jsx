"use client";

import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Card } from "../components/ui/Card";
import { useAuthStore } from "../stores/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading, restoreSession } = useAuthStore();

  // Restore session on mount + redirect if already logged in
  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  // Redirect based on role when user is loaded
  useEffect(() => {
    if (!user || loading) return;

    if (user.role === "teacher") {
      router.replace("/teacher");
    } else if (user.role === "admin") {
      router.replace("/admin");
    } else if (user.role === "super-admin") {
      router.replace("/super-admin");
    } else {
      router.replace("/");
    }
  }, [user, loading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const login = useAuthStore.getState().login;
    await login(formData.get("email"), formData.get("password"));
  };

  // Show loading or login form if not logged in
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (user) {
    return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0A3E49] flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <div className="bg-gradient-to-r from-[#34D2A2] to-[#0A3E49] p-10 text-center">
          <h1 className="text-4xl font-bold text-white">Arqademy</h1>
          <p className="text-white/80 mt-2 text-lg">
            Voice-Powered Learning Platform
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <Label>Email Address</Label>
            <Input name="email" type="email" required placeholder="teacher@arqademy.edu" />
          </div>

          <div>
            <Label>Password</Label>
            <Input name="password" type="password" required />
          </div>

          <Button size="lg" className="w-full" disabled={loading}>
            Sign In
          </Button>

          <Link href="/">
            <Button variant="secondary" className="w-full">
              Cancel
            </Button>
          </Link>
        </form>
      </Card>
    </div>
  );
}