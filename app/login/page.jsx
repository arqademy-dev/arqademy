"use client";

import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Card } from "../components/ui/Card";
import { useAuthStore } from "../stores/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import SkeletonLoader from "../components/SkeletonLoader";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading, login } = useAuthStore();


  // Redirect if already logged in
  useEffect(() => {
    if (loading) return; // wait for loading to finish

    if (user) {
      const rolePaths = {
        teacher: "/teacher",
        admin: "/admin",
        "super-admin": "/super-admin",
      };

      const targetPath = rolePaths[user.role] || "/";
      router.replace(targetPath);
    }
  }, [user, loading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
      return;
    }

    await login(email, password);
  };

  // Show loading spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A3E49]">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Show redirecting message (briefly)
  if (user) {
    return (
       <SkeletonLoader />
    );
  }

  // Main login form
  return (
    <div className="min-h-screen bg-[#0A3E49] flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <div className="bg-gradient-to-r from-[#34D2A2] to-[#0A3E49] p-10 text-center rounded-t-2xl">
          <h1 className="text-4xl font-bold text-white">Arqademy</h1>
          <p className="text-white/80 mt-2 text-lg">
            Voice-Powered Learning Platform
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="teacher@arqademy.edu"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="mt-1"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full text-lg"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In to Arqademy"}
          </Button>

          <Link href="/" className="block">
            <Button variant="secondary" className="w-full">
              Cancel
            </Button>
          </Link>
        </form>
      </Card>
    </div>
  );
}