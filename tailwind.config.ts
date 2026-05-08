import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#061326",
        panel: "#0A1C33",
        cyan: "#25D7E7",
        green: "#35E1A8"
      }
    },
  },
  plugins: [],
} satisfies Config;
