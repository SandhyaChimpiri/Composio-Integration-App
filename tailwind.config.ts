import type { Config } from "tailwindcss";
import { themeTokens } from "./lib/theme-config";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        surface: {
          base: "hsl(var(--color-surface-base))",
          alt: "hsl(var(--color-surface-alt))",
          elevated: "hsl(var(--color-surface-elevated))",
          interactive: "hsl(var(--color-surface-interactive))",
          muted: "hsl(var(--color-surface-muted))",
        },
        content: {
          primary: "hsl(var(--color-content-primary))",
          secondary: "hsl(var(--color-content-secondary))",
          accent: "hsl(var(--color-content-accent))",
          inverse: "hsl(var(--color-content-inverse))",
        },
        action: {
          primary: "hsl(var(--color-action-primary))",
          secondary: "hsl(var(--color-action-secondary))",
          muted: "hsl(var(--color-action-muted))",
          critical: "hsl(var(--color-action-critical))",
        },
        borderColor: {
          DEFAULT: "hsl(var(--color-border-subtle))",
          subtle: "hsl(var(--color-border-subtle))",
          input: "hsl(var(--color-border-input))",
          focus: "hsl(var(--color-border-focus))",
        },
        status: {
          success: "hsl(var(--color-status-success))",
          warning: "hsl(var(--color-status-warning))",
          error: "hsl(var(--color-status-error))",
          info: "hsl(var(--color-status-info))",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        fauna: ["var(--font-fauna)", "serif"],
        alliance: ["var(--font-alliance)", "sans-serif"],
        tata: ["var(--font-tata-firs-neue)", "sans-serif"],
        display: ["var(--font-family-display)", "sans-serif"],
        heading: ["var(--font-family-heading)", "sans-serif"],
        body: ["var(--font-family-body)", "sans-serif"],
        code: ["var(--font-family-mono)", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        none: "var(--radius-none)",
        full: "var(--radius-full)",
      },
      spacing: {
        "3xs": "var(--space-3xs)",
        "2xs": "var(--space-2xs)",
      },
      fontSize: {
        "fluid-sm": "clamp(0.875rem, 0.875rem + 0.05vw, 1rem)",
        "fluid-base": "clamp(1rem, 1rem + 0.1vw, 1.125rem)",
        "fluid-lg": "clamp(1.125rem, 1.125rem + 0.25vw, 1.25rem)",
        "fluid-xl": "clamp(1.25rem, 1.25rem + 0.5vw, 1.5rem)",
        "fluid-2xl": "clamp(1.5rem, 1.5rem + 0.75vw, 2rem)",
        "fluid-3xl": "clamp(2rem, 2rem + 1vw, 2.5rem)",
      },
      lineHeight: {
        tight: "var(--line-height-tight)",
        normal: "var(--line-height-normal)",
        loose: "var(--line-height-loose)",
      },
      boxShadow: {
        low: "var(--shadow-low)",
        medium: "var(--shadow-medium)",
        high: "var(--shadow-high)",
      },
      zIndex: {
        base: "var(--z-index-base)",
        elevated: "var(--z-index-elevated)",
        sticky: "var(--z-index-sticky)",
        overlay: "var(--z-index-overlay)",
        modal: "var(--z-index-modal)",
        popover: "var(--z-index-popover)",
        tooltip: "var(--z-index-tooltip)",
      },
      transitionDuration: {
        fast: "var(--duration-fast)",
        normal: "var(--duration-normal)",
        slow: "var(--duration-slow)",
      },
      transitionTimingFunction: {
        DEFAULT: "var(--easing-default)",
        in: "var(--easing-in)",
        out: "var(--easing-out)",
      },
      screens: {
        xs: "400px",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addComponents }: { addComponents: Function }) {
      addComponents({
        ".card-pattern": {
          "@apply border border-border/10 bg-card/80 backdrop-blur-sm rounded-lg":
            {},
        },
        ".card-interactive-pattern": {
          "@apply border border-border/10 bg-card/80 backdrop-blur-sm rounded-lg transition-colors hover:bg-card":
            {},
        },
        ".input-pattern": {
          "@apply bg-primary/5 border-primary/20 focus-visible:ring-ring/30 rounded-md":
            {},
        },
        ".focus-ring": {
          "@apply outline-none ring-2 ring-ring ring-offset-2 ring-offset-background":
            {},
        },
      });
    },
  ],
};
export default config;
