import { create } from "zustand";
import { supabase } from "@/libs/supabase";
import type { User } from "@supabase/supabase-js";
import type { Profile } from "@/types";

type ProfileUpdate = Partial<
  Pick<Profile, "username" | "avatar_url" | "updated_at">
>;

interface AuthState {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  initialize: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (
    updates: ProfileUpdate
  ) => Promise<{ success: boolean; error: string | null }>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  loading: true,

  initialize: async () => {
    set({ loading: true });

    const {
      data: { session },
    } = await supabase.auth.getSession();
    const currentUser = session?.user ?? null;

    if (currentUser) {
      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", currentUser.id)
        .maybeSingle();

      if (error) console.error("Profile error:", error.message);

      set({
        user: currentUser,
        profile: profileData as Profile,
        loading: false,
      });
    } else {
      set({ user: null, profile: null, loading: false });
    }
  },

  updateProfile: async (updates: ProfileUpdate) => {
    const user = get().user;
    if (!user) return { success: false, error: "No user session" };

    try {
      const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", user.id)
        .select()
        .single();

      if (error) throw error;

      set({ profile: data as Profile });
      return { success: true, error: null };
    } catch (error: unknown) {
      // Xử lý error unknown một cách chuyên nghiệp trong TS
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error("Update error:", errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, profile: null, loading: false });
  },
}));
