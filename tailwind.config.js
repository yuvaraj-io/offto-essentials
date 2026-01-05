/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xs: ["8px", "12px"], 
        sm: ["12px", "16px"],
        base: ["16px", "24px"],
        lg: ["24px", "32px"],
        xl: ["32px", "40px"],
      },
      colors: {
        primary: "#0658A8",
      },
    },
  },
};
