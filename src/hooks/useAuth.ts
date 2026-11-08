import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";

/**
 * Custom hook for authentication
 * Provides easy access to auth state and actions
 */

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    resetPassword,
    checkAuth,
    setError,
  } = useAuthStore();

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    resetPassword,
    checkAuth,
    setError,
  };
};

/**
 * Hook to check if user is authenticated
 */
export const useIsAuthenticated = (): boolean => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated;
};

/**
 * Hook to get current user
 */
export const useCurrentUser = () => {
  const user = useAuthStore((state) => state.user);
  return user;
};

/**
 * Hook to get auth loading state
 */
export const useAuthLoading = (): boolean => {
  const isLoading = useAuthStore((state) => state.isLoading);
  return isLoading;
};

/**
 * Hook to get auth error
 */
export const useAuthError = () => {
  const error = useAuthStore((state) => state.error);
  const setError = useAuthStore((state) => state.setError);

  return {
    error,
    clearError: () => setError(undefined),
  };
};
