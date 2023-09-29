/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        rubik: ["var(--font-rubik)", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        neem: {
          primary: "#70C4BB",
          text: "#263446",
          muted: "#9DA7BE",
          border: "#EFF1F5",
          white: "#ffffff",
          black: "#263446",
          violet: "#C985FF",
          blue: "#5B8AF0",
          orange: "#EB8F24",
        },
      },
    },
  },
  plugins: [],
};
