import type { Config } from "tailwindcss";

const channel = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: channel("paper"),
        surface: channel("surface"),
        ink: channel("ink"),
        muted: channel("muted"),
        line: channel("line"),
        brand: channel("brand"),
        "brand-ink": channel("brand-ink"),
        "brand-soft": channel("brand-soft"),
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: { DEFAULT: "10px" },
      maxWidth: { page: "1240px" },
    },
  },
  plugins: [],
};

export default config;
