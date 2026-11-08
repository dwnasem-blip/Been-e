/**
 * Typography System
 * Modern, readable, and accessible font sizes and weights
 */

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 28,
  "4xl": 32,
};

export const FONT_WEIGHTS = {
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

export const LINE_HEIGHTS = {
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.6,
  loose: 1.8,
};

// Text styles
export const TEXT_STYLES = {
  // Display - Large headings
  displayLarge: {
    fontSize: FONT_SIZES["4xl"],
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: LINE_HEIGHTS.tight,
  },
  displayMedium: {
    fontSize: FONT_SIZES["3xl"],
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: LINE_HEIGHTS.tight,
  },
  displaySmall: {
    fontSize: FONT_SIZES["2xl"],
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: LINE_HEIGHTS.tight,
  },

  // Headline
  headlineLarge: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: LINE_HEIGHTS.normal,
  },
  headlineMedium: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semibold,
    lineHeight: LINE_HEIGHTS.normal,
  },
  headlineSmall: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.semibold,
    lineHeight: LINE_HEIGHTS.normal,
  },

  // Title
  titleLarge: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semibold,
    lineHeight: LINE_HEIGHTS.normal,
  },
  titleMedium: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: LINE_HEIGHTS.normal,
  },
  titleSmall: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semibold,
    lineHeight: LINE_HEIGHTS.normal,
  },

  // Body
  bodyLarge: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.normal,
    lineHeight: LINE_HEIGHTS.normal,
  },
  bodyMedium: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.normal,
    lineHeight: LINE_HEIGHTS.normal,
  },
  bodySmall: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.normal,
    lineHeight: LINE_HEIGHTS.normal,
  },

  // Label
  labelLarge: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semibold,
    lineHeight: LINE_HEIGHTS.normal,
  },
  labelMedium: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: LINE_HEIGHTS.normal,
  },
  labelSmall: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: LINE_HEIGHTS.tight,
  },
};
