export * from "./colors";
export * from "./typography";
export * from "./spacing";

// API Configuration
export const API_CONFIG = {
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL || "",
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "",
};

// App Configuration
export const APP_CONFIG = {
  appName: "WAIN",
  appNameAr: "وين راح؟",
  version: "1.0.0",
  supportEmail: "support@wainapp.com",
};

// Feature Flags
export const FEATURES = {
  enableOCR: true,
  enableNotifications: true,
  enableSearch: true,
  enableSmartAssistant: true,
};

// Regex Patterns
export const PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  phone: /^[0-9\+\-\s()]{10,}$/,
  url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
};

// Time Constants
export const TIME_CONSTANTS = {
  MS_PER_SECOND: 1000,
  MS_PER_MINUTE: 60 * 1000,
  MS_PER_HOUR: 60 * 60 * 1000,
  MS_PER_DAY: 24 * 60 * 60 * 1000,
  MS_PER_WEEK: 7 * 24 * 60 * 60 * 1000,
  MS_PER_MONTH: 30 * 24 * 60 * 60 * 1000,
  MS_PER_YEAR: 365 * 24 * 60 * 60 * 1000,
};

// Default Values
export const DEFAULTS = {
  itemsPerPage: 20,
  searchDebounceMs: 300,
  toastDurationMs: 3000,
  animationDurationMs: 300,
  imageCompressionQuality: 0.8,
  maxImageSize: 5 * 1024 * 1024, // 5MB
};
