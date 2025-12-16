"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { useAuthStore } from "./stores/useAuthStore";
import { Toaster } from "sonner";
import SkeletonLoader from "./components/SkeletonLoader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const { user, loading, restoreSession } = useAuthStore();
  // Restore session ONCE
  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  // Handle redirects
  useEffect(() => {
    if (loading) return;

    if (!user && pathname !== "/login") {
      router.replace("/login");
      return;
    }

    if (user) {
      const roleRoutes = {
        teacher: "/teacher",
        admin: "/admin",
        "super-admin": "/super-admin",
      };

      const target = roleRoutes[user.role as keyof typeof roleRoutes] || "/";
      if (pathname === "/login") {
        router.replace(target);
      }
    }
  }, [user, loading, pathname, router]);

  return (
    <html lang="en">
      <head>
        {/* Font Awesome CDN */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
          integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Show skeleton while checking session */}
        {loading ? (
          <SkeletonLoader />
        ) : (
          children
        )}

        <Toaster position="top-center" />
      </body>
    </html>
  );
}