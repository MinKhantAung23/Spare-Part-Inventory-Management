import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

interface AuthUser {
  id: number;
  name: string;
  role: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (user, token) => {
        // Store token in a cookie so the axios interceptor & middleware can read it
        Cookies.set("auth_token", token, { expires: 7, sameSite: "strict" });
        set({ user, token, isAuthenticated: true });
      },

      logout: () => {
        Cookies.remove("auth_token");
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage", // localStorage key
      // Only persist user + token so the store can rehydrate on reload
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
