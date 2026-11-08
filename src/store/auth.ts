import { create } from "zustand";
import { UserProfile, AuthState } from "@/types";
import authService from "@/services/auth";

/**
 * Zustand Auth Store
 * Manages authentication state globally
 */

interface AuthStore extends AuthState {
  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  checkAuth: () => Promise<void>;
  setUser: (user: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | undefined) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: undefined,

  // Actions
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: undefined });
    try {
      const { user } = await authService.loginUser({ email, password });
      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "فشل تسجيل الدخول";
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  },

  register: async (email: string, password: string, fullName: string) => {
    set({ isLoading: true, error: undefined });
    try {
      const { user } = await authService.registerUser({
        email,
        password,
        confirmPassword: password,
        fullName,
      });
      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "فشل إنشاء الحساب";
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: undefined });
    try {
      await authService.logoutUser();
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "فشل تسجيل الخروج";
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  },

  resetPassword: async (email: string) => {
    set({ isLoading: true, error: undefined });
    try {
      await authService.resetPassword(email);
      set({ isLoading: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "فشل إعادة تعيين كلمة المرور";
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const user = await authService.getCurrentUser();
      set({
        user: user || null,
        isAuthenticated: !!user,
        isLoading: false,
      });
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  setUser: (user) => {
    set({
      user,
      isAuthenticated: !!user,
    });
  },

  setLoading: (loading) => {
    set({ isLoading: loading });
  },

  setError: (error) => {
    set({ error });
  },
}));
