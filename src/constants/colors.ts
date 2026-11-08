/**
 * WAIN Color Palette
 * Premium, modern, and calming colors inspired by minimalist design
 */

export const COLORS = {
  // Primary Colors - Warm, earthy tones
  primary: "#C59E6B",      // Warm Brown/Gold
  primaryLight: "#E8D7C6", // Light Beige
  primaryDark: "#8B6F47",  // Dark Brown

  // Secondary Colors - Cool, complementary tones
  secondary: "#6B9CB8",    // Soft Blue
  secondaryLight: "#A8C9DC", // Light Blue
  secondaryDark: "#4A6A8A", // Dark Blue

  // Accent Colors
  accent: "#D4A574",       // Golden Accent
  accentLight: "#E5BFA0",  // Light Gold
  accentDark: "#B8895A",   // Dark Gold

  // Success, Warning, Error
  success: "#6B9E6B",      // Soft Green
  warning: "#D4A050",      // Warm Amber
  error: "#C55A5A",        // Soft Red
  info: "#6B9CB8",         // Info Blue

  // Neutral Colors
  white: "#FFFFFF",        // Pure White
  light: "#FAF8F3",        // Off-white Background
  lightGray: "#E8E6E1",    // Light Gray
  gray: "#B8B8B8",         // Medium Gray
  darkGray: "#6B6B6B",     // Dark Gray
  black: "#1A1A1A",        // Almost Black
  dark: "#2D2D2D",         // Dark Background

  // Opacity variants
  transparent: "transparent",
  overlay: "rgba(0, 0, 0, 0.4)",
  lightOverlay: "rgba(0, 0, 0, 0.1)",
};

// Semantic color names
export const SEMANTIC_COLORS = {
  background: COLORS.light,
  surface: COLORS.white,
  surfaceVariant: COLORS.lightGray,
  onBackground: COLORS.black,
  onSurface: COLORS.black,
  onSurfaceVariant: COLORS.darkGray,
  border: COLORS.lightGray,
  divider: COLORS.lightGray,
  placeholder: COLORS.gray,
};
