import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        earth: {
          50: "#fbf8f3",
          100: "#f5eee2",
          200: "#ebdcbf",
          300: "#dec295",
          400: "#cea369",
          500: "#bc8646",
          600: "#a26e38",
          700: "#80522e",
          800: "#69432a",
          900: "#573825",
          950: "#321d12",
        },
        forest: {
          50: "#f2f9f5",
          100: "#e1f2e9",
          200: "#c4e5d5",
          300: "#99d0b8",
          400: "#67b395",
          500: "#449779",
          600: "#327b62",
          700: "#2a624f",
          800: "#244f41",
          900: "#1f4237",
          950: "#0e241e",
        },
        terracotta: {
          50: "#fff6f3",
          100: "#ffe9e3",
          200: "#ffd5c7",
          300: "#ffb49e",
          400: "#fe8466",
          500: "#f45834",
          600: "#e13c18",
          700: "#bc2d10",
          800: "#9b2711",
          900: "#802414",
          950: "#450e06",
        },
        mountain: {
          50: "#f5f7fa",
          100: "#e9edf2",
          200: "#cedae5",
          300: "#a4bdd3",
          400: "#749bbd",
          500: "#527fa7",
          600: "#3f668d",
          700: "#345373",
          800: "#2e4660",
          900: "#2a3d52",
          950: "#1b2736",
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      boxShadow: {
        'clay': '0 20px 40px -15px rgba(31, 66, 55, 0.15), 0 0 1px 1px rgba(255, 255, 255, 0.6) inset',
        'clay-dark': '0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(255, 255, 255, 0.1) inset',
        'glow-emerald': '0 0 25px rgba(50, 123, 98, 0.4)',
        'glow-terracotta': '0 0 25px rgba(244, 88, 52, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
