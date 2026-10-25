/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        cyber: {
          950: "#060913",
          900: "#0a0f21",
          850: "#0f172a",
          800: "#172340",
          700: "#1e293b",
          600: "#334155",
          500: "#475569",
          glow: "#38bdf8",
          accent: "#2563eb"
        }
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "Courier New", "monospace"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"]
      }
    },
  },
  plugins: [],
}
