// stores/useAuthStore.js
import { create } from "zustand";
import { supabase } from "../lib/supabaseClient";
import { toast } from "sonner";

const USER_ID_KEY = "arq_user_id";  // cookie name

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: false,

  login: async (email, password) => {
    set({ loading: true });

    const { data: user, error } = await supabase
      .from("users")
      .select("id, first_name, last_name, email, role, password")
      .eq("email", email.trim())
      .maybeSingle();

    if (error || !user) {
      toast.error(error?.message || "Email not found");
      set({ loading: false });
      return;
    }

    if (user.password !== password) {
      toast.error("Incorrect password");
      set({ loading: false });
      return;
    }

    // Store user ID in session cookie
    sessionStorage.setItem(USER_ID_KEY, user.id);

    const { password: _, ...safeUser } = user;

    set({ user: safeUser, loading: false });
    toast.success(`Welcome, ${safeUser.first_name || "User"}!`);
  },

  // Restore from cookie on app load
  restoreSession: async () => {
    const storedId = sessionStorage.getItem(USER_ID_KEY);
    if (!storedId) return;

    set({ loading: true });

    const { data: user, error } = await supabase
      .from("users")
      .select("id, first_name, last_name, email, role")
      .eq("id", parseInt(storedId))
      .single();

    if (user) {
      set({ user, loading: false });
    } else {
      sessionStorage.removeItem(USER_ID_KEY);
      set({ user: null, loading: false });
    }
  },

  logout: () => {
    sessionStorage.removeItem(USER_ID_KEY);
    set({ user: null });
    toast.success("Logged out");
  },
}));