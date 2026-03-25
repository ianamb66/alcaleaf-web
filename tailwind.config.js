/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          '"Liberation Mono"',
          '"Courier New"',
          "monospace",
        ],
      },
      colors: {
        alca: {
          50: "#f3f7f4",
          100: "#e2efe6",
          200: "#c0dccb",
          300: "#97c2aa",
          400: "#67a585",
          500: "#3f8662",
          600: "#2f6b4d",
          700: "#27573f",
          800: "#214634",
          900: "#1b392b",
          950: "#102319",
        },
      },
      borderRadius: {
        card: "28px",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.12)",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0px)" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 550ms ease-out both",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
