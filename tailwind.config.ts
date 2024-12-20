// tailwind.config.ts
import type { Config } from "tailwindcss"; // Import Config and Plugin types

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      boxShadow: {
        neon: '0 0 30px theme("colors.purple.500"), 0 0 60px theme("colors.purple.900")',
        sunset:
          '0 0 30px theme("colors.orange.400"), 0 0 60px theme("colors.orange.600")',
        sky: '0 0 30px theme("colors.blue.400"), 0 0 60px theme("colors.blue.600")',
        nature:
          '0 0 30px theme("colors.green.400"), 0 0 60px theme("colors.green.600")',
        teal: '0 0 30px theme("colors.teal.400"), 0 0 60px theme("colors.teal.600")',
        purple:
          '0 0 30px theme("colors.purple.300"), 0 0 60px theme("colors.purple.700")',
        red: '0 0 30px theme("colors.red.400"), 0 0 60px theme("colors.red.600")',
        grey: '0 0 30px theme("colors.gray.400"), 0 0 60px theme("colors.gray.600")',
        yellow:
          '0 0 30px theme("colors.yellow.400"), 0 0 60px theme("colors.yellow.600")',
        pink: '0 0 30px theme("colors.pink.400"), 0 0 60px theme("colors.pink.600")',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
    require("tailwindcss-animate"),
  ],
};

export default config;
