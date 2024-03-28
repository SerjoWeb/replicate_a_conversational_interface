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
        "puprple-dark": "#3F0035",
        "puprple-message": "#7B0035",
        "gray-bg": "#F9F9FC",
        "gray-light": "#9E9E9E",
        "gray-divider": "#E0E0E0",
        "gray-text": "#757575",
        "gray-message": "#EEEEEE",
        "orange-text": "#FF9800",
        "orange-dark": "#E65100",
        blue: "#1565C0",
      },
    },
  },
  plugins: [],
};
export default config;
