/**
 * Central theme configuration for the Composio Dashboard
 * This file defines semantic tokens that map to CSS variables
 */

// Define the semantic color tokens
export const themeTokens = {
  // Semantic UI colors
  color: {
    // Surface colors (backgrounds, cards, etc.)
    surface: {
      base: "var(--color-surface-base)", // Primary surface (was card)
      alt: "var(--color-surface-alt)", // Alternative surface (was background)
      elevated: "var(--color-surface-elevated)", // Elevated surfaces (was popover)
      interactive: "var(--color-surface-interactive)", // Interactive surfaces (was secondary)
      muted: "var(--color-surface-muted)", // Muted surfaces (was muted)
    },

    // Content colors (text, icons, etc.)
    content: {
      primary: "var(--color-content-primary)", // Primary content (was foreground)
      secondary: "var(--color-content-secondary)", // Secondary content (was muted-foreground)
      accent: "var(--color-content-accent)", // Accent content (was primary)
      inverse: "var(--color-content-inverse)", // Inverse content (was primary-foreground)
    },

    // Action colors (buttons, links, etc.)
    action: {
      primary: "var(--color-action-primary)", // Primary actions (was primary)
      secondary: "var(--color-action-secondary)", // Secondary actions (was secondary)
      muted: "var(--color-action-muted)", // Muted actions (was muted)
      critical: "var(--color-action-critical)", // Critical actions (was destructive)
    },

    // Border and outline colors
    border: {
      subtle: "var(--color-border-subtle)", // Subtle borders (was border)
      input: "var(--color-border-input)", // Input borders (was input)
      focus: "var(--color-border-focus)", // Focus borders (was ring)
    },

    // Visual status colors
    status: {
      success: "var(--color-status-success)", // Success state
      warning: "var(--color-status-warning)", // Warning state
      error: "var(--color-status-error)", // Error state
      info: "var(--color-status-info)", // Info state
    },

    // Data visualization colors
    chart: {
      c1: "var(--color-chart-1)", // Chart color 1 (was chart-1)
      c2: "var(--color-chart-2)", // Chart color 2 (was chart-2)
      c3: "var(--color-chart-3)", // Chart color 3 (was chart-3)
      c4: "var(--color-chart-4)", // Chart color 4 (was chart-4)
      c5: "var(--color-chart-5)", // Chart color 5 (was chart-5)
    },
  },

  // Spacing system
  space: {
    "3xs": "var(--space-3xs)", // 2px
    "2xs": "var(--space-2xs)", // 4px
    xs: "var(--space-xs)", // 8px
    sm: "var(--space-sm)", // 12px
    md: "var(--space-md)", // 16px
    lg: "var(--space-lg)", // 24px
    xl: "var(--space-xl)", // 32px
    "2xl": "var(--space-2xl)", // 48px
    "3xl": "var(--space-3xl)", // 64px
  },

  // Typography scales
  type: {
    // Font families
    family: {
      display: "var(--font-family-display)", // TT Firs Neue (display headings)
      heading: "var(--font-family-heading)", // Alliance (headings)
      body: "var(--font-family-body)", // Geist Sans (body text)
      mono: "var(--font-family-mono)", // Geist Mono (code)
    },

    // Font sizes (rem-based)
    size: {
      "3xs": "var(--font-size-3xs)", // 0.625rem (10px)
      "2xs": "var(--font-size-2xs)", // 0.75rem (12px)
      xs: "var(--font-size-xs)", // 0.875rem (14px)
      sm: "var(--font-size-sm)", // 1rem (16px)
      md: "var(--font-size-md)", // 1.125rem (18px)
      lg: "var(--font-size-lg)", // 1.25rem (20px)
      xl: "var(--font-size-xl)", // 1.5rem (24px)
      "2xl": "var(--font-size-2xl)", // 2rem (32px)
      "3xl": "var(--font-size-3xl)", // 2.5rem (40px)
    },

    // Line heights
    leading: {
      tight: "var(--line-height-tight)", // 1.2
      normal: "var(--line-height-normal)", // 1.5
      loose: "var(--line-height-loose)", // 1.8
    },
  },

  // Border radius
  radius: {
    none: "var(--radius-none)", // 0
    sm: "var(--radius-sm)", // small (was radius-sm)
    md: "var(--radius-md)", // medium (was radius-md)
    lg: "var(--radius-lg)", // large (was radius-lg)
    full: "var(--radius-full)", // 9999px (for pills, circles)
  },

  // Animation/transition
  motion: {
    duration: {
      fast: "var(--duration-fast)", // 150ms
      normal: "var(--duration-normal)", // 250ms
      slow: "var(--duration-slow)", // 350ms
    },
    easing: {
      default: "var(--easing-default)", // ease-in-out
      in: "var(--easing-in)", // ease-in
      out: "var(--easing-out)", // ease-out
    },
  },

  // Shadows and elevation
  elevation: {
    low: "var(--shadow-low)", // Subtle elevation
    medium: "var(--shadow-medium)", // Medium elevation
    high: "var(--shadow-high)", // High elevation
  },

  // Z-index scales for consistent layering
  zIndex: {
    base: "var(--z-index-base)", // 0 - Base content
    elevated: "var(--z-index-elevated)", // 10 - Elevated content
    sticky: "var(--z-index-sticky)", // 100 - Sticky elements
    overlay: "var(--z-index-overlay)", // 1000 - Overlays
    modal: "var(--z-index-modal)", // 1500 - Modals
    popover: "var(--z-index-popover)", // 2000 - Popovers
    tooltip: "var(--z-index-tooltip)", // 2500 - Tooltips
  },
};

// Utilities for using theme tokens with opacity
export const withOpacity = {
  surface: (opacity: number) =>
    `rgb(var(--color-surface-base-rgb) / ${opacity})`,
  content: (opacity: number) =>
    `rgb(var(--color-content-primary-rgb) / ${opacity})`,
  action: (opacity: number) =>
    `rgb(var(--color-action-primary-rgb) / ${opacity})`,
  border: (opacity: number) =>
    `rgb(var(--color-border-subtle-rgb) / ${opacity})`,
};

// Common style patterns (can be used in component styles or as utility classes)
export const stylePatterns = {
  card: {
    base: "border border-border/10 bg-card/80 backdrop-blur-sm",
    interactive:
      "border border-border/10 bg-card/80 backdrop-blur-sm transition-colors hover:bg-card",
    elevated: "border border-border/10 bg-card/90 backdrop-blur-sm shadow-md",
  },
  input: {
    base: "bg-primary/5 border-primary/20 focus-visible:ring-ring/30",
    error:
      "bg-destructive/5 border-destructive/30 focus-visible:ring-destructive/30",
  },
  text: {
    gradient: "gradient-text",
    heading: "font-tata font-bold tracking-tight",
    subheading: "font-alliance font-medium",
    body: "font-sans",
    mono: "font-mono",
  },
  transition: {
    default: "transition-all duration-300 ease-in-out",
    fast: "transition-all duration-150 ease-in-out",
    slow: "transition-all duration-500 ease-in-out",
  },
};
