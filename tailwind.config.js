/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx,mdx}",
    "./components/**/*.{js,jsx,mdx}",
    "./data/**/*.{js,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dosen Theme Colors
        cream: {
          DEFAULT: "rgb(var(--cream-rgb) / <alpha-value>)",
          2: "rgb(var(--cream2-rgb) / <alpha-value>)",
        },
        paper: "rgb(var(--paper-rgb) / <alpha-value>)",
        ink: {
          DEFAULT: "rgb(var(--ink-rgb) / <alpha-value>)",
          2: "rgb(var(--ink2-rgb) / <alpha-value>)",
        },
        muted: "rgb(var(--muted-rgb) / <alpha-value>)",
        forest: {
          DEFAULT: "rgb(var(--forest-rgb) / <alpha-value>)",
          2: "rgb(var(--forest2-rgb) / <alpha-value>)",
        },
        gold: {
          DEFAULT: "rgb(var(--gold-rgb) / <alpha-value>)",
          2: "rgb(var(--gold2-rgb) / <alpha-value>)",
        },
        rose: "rgb(var(--rose-rgb) / <alpha-value>)",
        teal: "rgb(var(--teal-rgb) / <alpha-value>)",
        border: "rgb(var(--border-rgb) / <alpha-value>)",
        
        // Mahasiswa Theme Colors
        mhs: {
          bg: "rgb(var(--mhs-bg-rgb) / <alpha-value>)",
          surface: "rgb(var(--mhs-surface-rgb) / <alpha-value>)",
          card: "rgb(var(--mhs-card-rgb) / <alpha-value>)",
          border: "rgb(var(--mhs-border-rgb) / <alpha-value>)",
          hover: "rgb(var(--mhs-hover-rgb) / <alpha-value>)",
          amber: {
            DEFAULT: "rgb(var(--mhs-amber-rgb) / <alpha-value>)",
            2: "rgb(var(--mhs-amber-2-rgb) / <alpha-value>)",
          },
          teal: "rgb(var(--mhs-teal-rgb) / <alpha-value>)",
          rose: "rgb(var(--mhs-rose-rgb) / <alpha-value>)",
          green: "rgb(var(--mhs-green-rgb) / <alpha-value>)",
          purple: "rgb(var(--mhs-purple-rgb) / <alpha-value>)",
          text: "rgb(var(--mhs-text-rgb) / <alpha-value>)",
          muted: "rgb(var(--mhs-muted-rgb) / <alpha-value>)",
          danger: "rgb(var(--mhs-danger-rgb) / <alpha-value>)",
          on: "rgb(var(--mhs-on-accent-rgb) / <alpha-value>)",
        },

        // Legacy / Other
        surface: {
          DEFAULT: "#0f0f23",
          50: "#1a1a3e",
          100: "#16163a",
          200: "#1e1e45",
          300: "#252550",
          400: "#2d2d5c",
        },
        glass: {
          DEFAULT: "rgba(255,255,255,0.05)",
          light: "rgba(255,255,255,0.08)",
          medium: "rgba(255,255,255,0.12)",
          strong: "rgba(255,255,255,0.18)",
        },
        accent: {
          indigo: "#6366f1",
          violet: "#8b5cf6",
          cyan: "#06b6d4",
          pink: "#ec4899",
          emerald: "#10b981",
          amber: "#f59e0b",
          rose: "#f43f5e",
        },
        text: {
          primary: "var(--text-primary, #f0f0ff)",
          secondary: "var(--text-secondary, #a0a0c0)",
          muted: "var(--text-muted, #6b6b8d)",
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(99, 102, 241, 0.15)",
        "glow-md": "0 0 30px rgba(99, 102, 241, 0.2)",
        "glow-lg": "0 0 50px rgba(99, 102, 241, 0.25)",
        "glow-cyan": "0 0 20px rgba(6, 182, 212, 0.15)",
        "glow-violet": "0 0 20px rgba(139, 92, 246, 0.15)",
        float: "0 8px 30px rgba(0, 0, 0, 0.3)",
        "inner-glow": "inset 0 1px 1px rgba(255, 255, 255, 0.06)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 15px rgba(99, 102, 241, 0.2)" },
          "50%": { boxShadow: "0 0 30px rgba(99, 102, 241, 0.4)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(15px, -20px, 0) scale(1.05)" },
        },
        pulse_soft: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.8" },
        },
        spin_slow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-out both",
        slideUp: "slideUp 0.6s ease-out both",
        glow: "glow 3s ease-in-out infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
        float: "float 8s ease-in-out infinite alternate",
        pulse_soft: "pulse_soft 4s ease-in-out infinite",
        spin_slow: "spin_slow 20s linear infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
