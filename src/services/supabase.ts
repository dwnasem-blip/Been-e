import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { API_CONFIG } from "@/constants";

let supabase: SupabaseClient | null = null;

/**
 * Initialize Supabase client
 * Uses EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY
 * These are safe to expose on the frontend
 */
export const initializeSupabase = (): SupabaseClient => {
  if (supabase) {
    return supabase;
  }

  const supabaseUrl = API_CONFIG.supabaseUrl;
  const supabasePublishableKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error(
      "Missing Supabase configuration. Please set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY in your environment."
    );
  }

  supabase = createClient(supabaseUrl, supabasePublishableKey, {
    auth: {
      storage: undefined, // Use default storage (AsyncStorage for React Native)
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  });

  return supabase;
};

/**
 * Get Supabase client instance
 * @throws Error if not initialized
 */
export const getSupabase = (): SupabaseClient => {
  if (!supabase) {
    return initializeSupabase();
  }
  return supabase;
};

/**
 * Check if Supabase is properly configured
 */
export const isSupabaseConfigured = (): boolean => {
  return !!(
    process.env.EXPO_PUBLIC_SUPABASE_URL &&
    process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );
};

/**
 * Test connection to Supabase
 * Returns connection status
 */
export const testSupabaseConnection = async (): Promise<{
  success: boolean;
  message: string;
  error?: string;
}> => {
  try {
    if (!isSupabaseConfigured()) {
      return {
        success: false,
        message: "Supabase not configured",
        error: "Missing environment variables",
      };
    }

    const client = getSupabase();

    // Try to get current session
    const { data, error } = await client.auth.getSession();

    if (error) {
      return {
        success: false,
        message: "Failed to connect to Supabase Auth",
        error: error.message,
      };
    }

    return {
      success: true,
      message: "Supabase connection successful",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error testing Supabase connection",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export default getSupabase;
