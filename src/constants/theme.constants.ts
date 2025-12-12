/**
 * @fileoverview Theme constants
 * @description Color palette, spacing, typography configurations
 */

// ============================================
// COLOR PALETTE
// ============================================

export const COLORS = {
    // Primary colors
    primary: {
        50: '#eef2ff',
        100: '#e0e7ff',
        200: '#c7d2fe',
        300: '#a5b4fc',
        400: '#818cf8',
        500: '#6366f1',
        600: '#4f46e5',
        700: '#4338ca',
        800: '#3730a3',
        900: '#312e81',
    },

    // Accent colors
    accent: {
        cyan: '#06b6d4',
        purple: '#a855f7',
        pink: '#ec4899',
        orange: '#f97316',
    },

    // Neutral colors
    neutral: {
        50: '#fafafa',
        100: '#f5f5f5',
        200: '#e5e5e5',
        300: '#d4d4d4',
        400: '#a3a3a3',
        500: '#737373',
        600: '#525252',
        700: '#404040',
        800: '#262626',
        900: '#171717',
        950: '#0a0a0a',
    },

    // Semantic colors
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',

    // Background gradients
    gradients: {
        primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        dark: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)',
        glass: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        glow: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)',
    },
} as const;

// ============================================
// SPACING SCALE
// ============================================

export const SPACING = {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
    '4xl': '6rem',    // 96px
    '5xl': '8rem',    // 128px
} as const;

// ============================================
// TYPOGRAPHY
// ============================================

export const FONT_FAMILY = {
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
    display: "'Space Grotesk', 'Inter', sans-serif",
} as const;

export const FONT_SIZE = {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
    '7xl': '4.5rem',   // 72px
} as const;

export const FONT_WEIGHT = {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
} as const;

// ============================================
// BREAKPOINTS
// ============================================

export const BREAKPOINTS = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
} as const;

// ============================================
// Z-INDEX SCALE
// ============================================

export const Z_INDEX = {
    behind: -1,
    base: 0,
    dropdown: 10,
    sticky: 20,
    fixed: 30,
    modalBackdrop: 40,
    modal: 50,
    popover: 60,
    tooltip: 70,
    toast: 80,
} as const;

// ============================================
// SHADOWS
// ============================================

export const SHADOWS = {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    glow: '0 0 40px rgba(99, 102, 241, 0.3)',
    glowStrong: '0 0 60px rgba(99, 102, 241, 0.5)',
} as const;

// ============================================
// BORDER RADIUS
// ============================================

export const BORDER_RADIUS = {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
} as const;

// ============================================
// TRANSITIONS
// ============================================

export const TRANSITIONS = {
    fast: '150ms ease',
    normal: '300ms ease',
    slow: '500ms ease',
    bounce: '500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;
