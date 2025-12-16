// stores/useAuthStore.js
import { create } from "zustand";
import { toast } from "sonner";
import { supabase } from "@/app/lib/supabaseClient";
import Cookies from "js-cookie";

const COOKIE_NAME = "arq_user_id";
const COOKIE_EXPIRES = 7; // days

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,

  // Login
  login: async (email, password) => {
    set({ loading: true });

    // 1. Find user by email
    const { data: users, error } = await supabase
      .from("users")
      .select("id, first_name, last_name, email, role, password")
      .eq("email", email.trim())
      .maybeSingle();

    if (error || !users) {
      toast.error("Email not found");
      set({ loading: false });
      return;
    }

    // 2. Check password (plain text — upgrade to bcrypt later if needed)
    if (users.password !== password) {
      toast.error("Incorrect password");
      set({ loading: false });
      return;
    }

    // 3. Store user ID in cookie
    Cookies.set(COOKIE_NAME, users.id, { expires: COOKIE_EXPIRES, secure: true, sameSite: "strict" });

    // 4. Remove password from stored user
    const { password: _, ...safeUser } = users;

    set({ user: safeUser, loading: false });
    toast.success(`Welcome back, ${safeUser.first_name || "User"}!`);
  },

  // Restore session from cookie
  restoreSession: async () => {
    set({ loading: true });

    const storedId = Cookies.get(COOKIE_NAME);

    if (!storedId) {
      set({ user: null, loading: false });
      return;
    }

    const { data: user, error } = await supabase
      .from("users")
      .select("id, first_name, last_name, email, role")
      .eq("id", storedId) // UUID — NO PARSE
      .single();

    if (error || !user) {
      Cookies.remove(COOKIE_NAME);
      set({ user: null, loading: false });
      return;
    }

    set({ user, loading: false });
  },

  // Logout
  logout: () => {
    Cookies.remove(COOKIE_NAME);
    set({ user: null });
    toast.success("Logged out successfully");
    window.location.href = "/login"; // redirect to login
  },
}));