/**
 * Spacing System
 * Consistent, scalable spacing based on 8px grid
 */

export const SPACING = {
  "0": 0,
  "1": 4,
  "2": 8,
  "3": 12,
  "4": 16,
  "5": 20,
  "6": 24,
  "7": 28,
  "8": 32,
  "9": 36,
  "10": 40,
  "12": 48,
  "14": 56,
  "16": 64,
  "20": 80,
  "24": 96,
};

/**
 * Common spacing values
 */
export const PADDING = {
  xs: SPACING["2"],        // 8px
  sm: SPACING["3"],        // 12px
  md: SPACING["4"],        // 16px
  lg: SPACING["5"],        // 20px
  xl: SPACING["6"],        // 24px
  "2xl": SPACING["7"],     // 28px
  "3xl": SPACING["8"],     // 32px
};

export const MARGIN = PADDING;

/**
 * Border radius
 */
export const BORDER_RADIUS = {
  none: 0,
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  full: 9999,
};

/**
 * Elevation/Shadow
 */
export const SHADOWS = {
  none: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  base: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  xl: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 12,
  },
};

/**
 * Commonly used dimensions
 */
export const DIMENSIONS = {
  // Screen padding
  screenPaddingHorizontal: SPACING["4"],
  screenPaddingVertical: SPACING["5"],

  // Component sizes
  buttonHeight: 48,
  buttonHeightSmall: 40,
  inputHeight: 48,
  iconSize: 24,
  iconSizeLarge: 32,
  iconSizeSmall: 20,

  // Divider
  dividerHeight: 1,

  // Bottom sheet
  bottomSheetBorderRadius: 24,
  bottomSheetHandleHeight: 4,
  bottomSheetHandleWidth: 40,
};
