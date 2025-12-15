"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../stores/useAuthStore";

export function ProtectedRoute({ children, allowedRoles = [] }) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login"); // not logged in → redirect
    } else if (
      allowedRoles.length > 0 &&
      !allowedRoles.includes(user.role)
    ) {
      router.replace("/"); // logged in but role not allowed
    }
  }, [user, router, allowedRoles]);

  // Prevent rendering until user is validated
  if (!user || (allowedRoles.length && !allowedRoles.includes(user.role))) {
    return null;
  }

  return children;
}
