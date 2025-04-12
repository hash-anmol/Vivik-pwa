/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      colors: {
        primary: {
          50: "#f2f0ff",
          100: "#ece7ff",
          200: "#dbd3ff",
          300: "#c1b2ff",
          400: "#a18bff",
          500: "#845aff",
          600: "#7d41ff",
          700: "#6c27ed",
          800: "#5b20ce",
          900: "#4a1d9e",
          950: "#2e0e71",
        },
        accent: {
          50: "#effffa",
          100: "#c8fff0",
          200: "#9fffe3",
          300: "#65ffd1",
          400: "#21f8b8",
          500: "#00e59d",
          600: "#00ba81",
          700: "#009269",
          800: "#087055",
          900: "#085c47",
          950: "#003428",
        },
        dark: "#121212",
        light: "#fefefe",
      },
      boxShadow: {
        glow: "0 0 20px rgba(132, 90, 255, 0.3)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
}; 