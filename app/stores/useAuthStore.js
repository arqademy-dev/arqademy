// stores/useAuthStore.js
import { create } from "zustand";
import { toast } from "sonner";
import { getSupabase } from "@/app/lib/supabaseClient";
import Cookies from "js-cookie";

const COOKIE_NAME = "arq_user_id";
const COOKIE_EXPIRES = 7; // days

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,

  
  // Login
  login: async (email, password) => {
    const supabase = getSupabase();
    set({ loading: true });

    const { data: users, error } = await supabase
      .from("users")
      .select("id, first_name, last_name, email, role, password, can_login")
      .eq("email", email.trim())
      .maybeSingle();

    if (error || !users) {
      toast.error("Email not found");
      set({ loading: false });
      return;
    }

    // Check if login is allowed
    if (!users.can_login) {
      toast.error("Your account is disabled. Contact admin.");
      set({ loading: false });
      return;
    }

    // Check password
    if (users.password !== password) {
      toast.error("Incorrect password");
      set({ loading: false });
      return;
    }

    // Store cookie and user
    Cookies.set(COOKIE_NAME, users.id, { expires: COOKIE_EXPIRES, secure: true, sameSite: "strict" });

    const { password: _, ...safeUser } = users;

    set({ user: safeUser, loading: false });
    toast.success(`Welcome back, ${safeUser.first_name || "User"}!`);
  },

  // Restore session from cookie
  restoreSession: async () => {
    const supabase = getSupabase();
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