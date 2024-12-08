// tailwind.config.ts
import type { Config } from "tailwindcss"; // Import Config and Plugin types

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      boxShadow: {
        neon: "0 0 30px theme('colors.purple.500'), 0 0 60px theme('colors.purple.900')",
        sunset:
          "0 0 30px theme('colors.orange.400'), 0 0 60px theme('colors.orange.600')",
        sky: "0 0 30px theme('colors.blue.400'), 0 0 60px theme('colors.blue.600')",
        nature:
          "0 0 30px theme('colors.green.400'), 0 0 60px theme('colors.green.600')",
        teal: "0 0 30px theme('colors.teal.400'), 0 0 60px theme('colors.teal.600')",
        // New colors
        purple:
          "0 0 30px theme('colors.purple.300'), 0 0 60px theme('colors.purple.700')",
        red: "0 0 30px theme('colors.red.400'), 0 0 60px theme('colors.red.600')",
        grey: "0 0 30px theme('colors.gray.400'), 0 0 60px theme('colors.gray.600')",
        yellow:
          "0 0 30px theme('colors.yellow.400'), 0 0 60px theme('colors.yellow.600')",
        pink: "0 0 30px theme('colors.pink.400'), 0 0 60px theme('colors.pink.600')",
      },
    },
  },
  plugins: [
    // Properly type the plugin function
    ({ addUtilities }: { addUtilities: Function }) => {
      addUtilities({
        ".custom-scrollbar": {
          overflow: "scroll",
        },
        ".custom-scrollbar::-webkit-scrollbar": {
          width: "0", // Hide the scrollbar width
          background: "transparent", // Optional: make it invisible
        },
        ".custom-scrollbar::-webkit-scrollbar-thumb": {
          background: "#3a0558", // Optional: color for the thumb
        },
      });
    },
  ],
};

export default config;
