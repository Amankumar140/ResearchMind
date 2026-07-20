/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#0a0a0f",
        cardBg: "rgba(255, 255, 255, 0.03)",
        borderSubtle: "rgba(255, 255, 255, 0.08)",
        accentOrange: "#ff8c32",
        accentOrangeHover: "#ff5a1a",
        accentGreen: "#50c878",
      },
      fontFamily: {
        syne: ['Inter', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
