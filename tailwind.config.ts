import type { Config } from "tailwindcss";
import { UIBreakPoint } from "./configs";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: `${UIBreakPoint.xs}px`,
      sm: `${UIBreakPoint.sm}px`,
      md: `${UIBreakPoint.md}px`,
      lg: `${UIBreakPoint.lg}px`,
      xl: `${UIBreakPoint.xl}px`,
      "2xl": `${UIBreakPoint.xxl}px`,
    },
  },
  plugins: [],
};
export default config;
