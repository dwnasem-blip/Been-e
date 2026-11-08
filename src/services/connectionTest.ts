import { testSupabaseConnection, isSupabaseConfigured } from "./supabase";

/**
 * Connection Test Utility
 * Tests Supabase connectivity and configuration
 */

interface ConnectionTestResult {
  timestamp: string;
  configured: boolean;
  connected: boolean;
  error?: string;
  details: Record<string, any>;
}

/**
 * Run comprehensive connection test
 */
export const runConnectionTest = async (): Promise<ConnectionTestResult> => {
  const timestamp = new Date().toISOString();
  const details: Record<string, any> = {};

  try {
    // Check configuration
    const configured = isSupabaseConfigured();
    details.configured = configured;

    if (!configured) {
      return {
        timestamp,
        configured: false,
        connected: false,
        error:
          "Supabase configuration missing. Check EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
        details,
      };
    }

    // Test connection
    const connectionResult = await testSupabaseConnection();
    details.connectionResult = connectionResult;

    return {
      timestamp,
      configured: true,
      connected: connectionResult.success,
      error: connectionResult.error,
      details: {
        ...details,
        message: connectionResult.message,
      },
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return {
      timestamp,
      configured: false,
      connected: false,
      error: errorMessage,
      details: {
        ...details,
        exception: errorMessage,
      },
    };
  }
};

/**
 * Log connection test results
 */
export const logConnectionTest = async (
  testName: string = "Supabase Connection Test"
): Promise<ConnectionTestResult> => {
  console.log("\n" + "=".repeat(60));
  console.log(`🧪 ${testName}`);
  console.log("=".repeat(60));

  const result = await runConnectionTest();

  console.log(`⏰ Timestamp: ${result.timestamp}`);
  console.log(`📋 Configured: ${result.configured ? "✅ Yes" : "❌ No"}`);
  console.log(`🔌 Connected: ${result.connected ? "✅ Yes" : "❌ No"}`);

  if (result.error) {
    console.log(`⚠️  Error: ${result.error}`);
  }

  if (Object.keys(result.details).length > 0) {
    console.log("\n📊 Details:");
    console.log(result.details);
  }

  console.log("=".repeat(60) + "\n");

  return result;
};

/**
 * Quick check if Supabase is ready
 */
export const isSupabaseReady = async (): Promise<boolean> => {
  const result = await runConnectionTest();
  return result.configured && result.connected;
};
