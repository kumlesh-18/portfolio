/**
 * ENTERPRISE DESIGN SYSTEM TOKENS
 * Scalable, maintainable design tokens for consistent UI
 *
 * Based on 4px base unit for mathematical harmony
 * Type scale: 1.25 ratio (Major Third)
 */

// =============================================================================
// SPACING TOKENS
// =============================================================================
// Base unit: 4px
// Usage: space[1] = 4px, space[4] = 16px

export const space = {
  px: "1px",
  0: "0",
  0.5: "0.125rem", // 2px
  1: "0.25rem", // 4px
  1.5: "0.375rem", // 6px
  2: "0.5rem", // 8px
  2.5: "0.625rem", // 10px
  3: "0.75rem", // 12px
  3.5: "0.875rem", // 14px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  7: "1.75rem", // 28px
  8: "2rem", // 32px
  9: "2.25rem", // 36px
  10: "2.5rem", // 40px
  11: "2.75rem", // 44px - Touch target minimum
  12: "3rem", // 48px
  14: "3.5rem", // 56px
  16: "4rem", // 64px
} as const;

// =============================================================================
// TYPOGRAPHY TOKENS
// =============================================================================
// Scale: Major Third (1.25)
// Base: 16px

export const fontSize = {
  "2xs": ["0.625rem", { lineHeight: "0.875rem" }], // 10px - Min for timestamps
  xs: ["0.75rem", { lineHeight: "1rem" }], // 12px
  sm: ["0.875rem", { lineHeight: "1.25rem" }], // 14px
  base: ["1rem", { lineHeight: "1.5rem" }], // 16px
  lg: ["1.125rem", { lineHeight: "1.75rem" }], // 18px
  xl: ["1.25rem", { lineHeight: "1.75rem" }], // 20px
  "2xl": ["1.5rem", { lineHeight: "2rem" }], // 24px
} as const;

export const fontWeight = {
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

// =============================================================================
// COLOR ROLES
// =============================================================================
// Semantic color tokens for consistent theming

export const colorRoles = {
  // Surfaces
  surface: {
    base: "var(--surface-base)",
    raised: "var(--surface-raised)",
    overlay: "var(--surface-overlay)",
    sunken: "var(--surface-sunken)",
  },

  // Text
  text: {
    primary: "var(--text-primary)",
    secondary: "var(--text-secondary)",
    tertiary: "var(--text-tertiary)",
    inverse: "var(--text-inverse)",
    link: "var(--text-link)",
  },

  // Borders
  border: {
    default: "var(--border-default)",
    subtle: "var(--border-subtle)",
    strong: "var(--border-strong)",
  },

  // Interactive
  interactive: {
    primary: "var(--interactive-primary)",
    primaryHover: "var(--interactive-primary-hover)",
    primaryActive: "var(--interactive-primary-active)",
    secondary: "var(--interactive-secondary)",
    secondaryHover: "var(--interactive-secondary-hover)",
  },

  // Feedback states
  feedback: {
    success: "var(--feedback-success)",
    successLight: "var(--feedback-success-light)",
    warning: "var(--feedback-warning)",
    warningLight: "var(--feedback-warning-light)",
    error: "var(--feedback-error)",
    errorLight: "var(--feedback-error-light)",
    info: "var(--feedback-info)",
    infoLight: "var(--feedback-info-light)",
  },
} as const;

// =============================================================================
// COMPONENT TOKENS
// =============================================================================

export const chat = {
  // Panel dimensions
  panel: {
    width: "400px",
    maxWidth: "calc(100vw - 2rem)",
    height: "560px",
    maxHeight: "calc(100vh - 8rem)",
    mobileHeight: "calc(100vh - 5rem)",
  },

  // Message bubbles
  message: {
    maxWidth: "85%",
    borderRadius: "1rem",
    userBg: "var(--interactive-primary)",
    assistantBg: "var(--surface-raised)",
  },

  // Avatars
  avatar: {
    size: "2rem", // 32px
    sizeSm: "1.5rem", // 24px
  },

  // Input
  input: {
    minHeight: "2.75rem", // 44px - touch target
    maxHeight: "7.5rem", // 120px
    borderRadius: "0.75rem",
  },

  // Floating trigger
  trigger: {
    size: "3.5rem", // 56px
    sizeMobile: "3rem", // 48px
  },
} as const;

// =============================================================================
// ANIMATION TOKENS
// =============================================================================

export const animation = {
  duration: {
    instant: "50ms",
    fast: "100ms",
    normal: "200ms",
    slow: "300ms",
    slower: "500ms",
  },
  easing: {
    default: "cubic-bezier(0.4, 0, 0.2, 1)",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  },
} as const;

// =============================================================================
// ACCESSIBILITY TOKENS
// =============================================================================

export const a11y = {
  minTouchTarget: "2.75rem", // 44px
  minFontSize: "0.75rem", // 12px
  focusRingWidth: "2px",
  focusRingOffset: "2px",
} as const;

// =============================================================================
// Z-INDEX SYSTEM
// =============================================================================

export const zIndex = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  overlay: 300,
  modal: 400,
  popover: 500,
  tooltip: 600,
  chat: 700,
  chatTrigger: 710,
} as const;
