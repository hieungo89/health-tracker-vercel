/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "primary-dark": "#00171F",
        "primary-light": "#003459",
        "secondary-dark": "#007EA7",
        "secondary-light": "#00A8E8",
        light: "#FFFFFF",
        dark: "#000000",
      },
      fontFamily: {
        trebuchet: "Trebuchet",
        georgia: "Georgia",
        arial: "Arial",
        times: "Times New Roman",
        helvetica: "Helvetica Neue",
        //* fonts included - font-sans / font-serif / font-mono
      },
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }
      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }
      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }
      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }
      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
      xs: { max: "479px" },
      // => @media (max-width: 479px) { ... }
    },
  },
  plugins: [],
};
