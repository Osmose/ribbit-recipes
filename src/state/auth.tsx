import { create } from 'zustand';
import type { AuthUser } from '@supabase/supabase-js';
import supabase from 'ribbit/supabase';

interface AuthStore {
  /** Null means logged out, undefined means we haven't initialized auth yet. */
  currentUser: AuthUser | null | undefined;
  setCurrentUser: (newUser: AuthUser | null) => void;
  signInUser: () => Promise<AuthUser | null | undefined>;
  signOutUser: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  currentUser: undefined,

  setCurrentUser(newUser) {
    set({ currentUser: newUser });
  },

  async signInUser() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
    });

    if (error) {
      throw error;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    set({ currentUser: user });
    return user;
  },

  async signOutUser() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }

    set({ currentUser: null });
  },
}));

export function useCurrentUser() {
  return useAuthStore((state) => state.currentUser);
}
