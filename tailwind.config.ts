import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',  // Primary green color for active states
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        // Dark mode specific colors
        dark: {
          bg: {
            primary: '#121212',
            secondary: '#1e1e1e',
            tertiary: '#2d2d2d',
          },
          text: {
            primary: '#ffffff',
            secondary: '#a3a3a3',
            tertiary: '#6b7280',
          },
          border: {
            primary: '#2d2d2d',
            secondary: '#404040',
          },
          accent: {
            primary: '#22c55e',  // Keeping the same primary green for consistency
            secondary: '#16a34a',
          }
        }
      },
      spacing: {
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
      // Add dark mode specific background patterns or gradients
      backgroundImage: {
        'dark-gradient': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
      },
      // Add dark mode specific shadows
      boxShadow: {
        'dark-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'dark-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
} satisfies Config;