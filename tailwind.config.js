/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      textShadow: {
        'default': '2px 2px 4px rgba(0, 0, 0, 0.1)',
        'md': '3px 3px 6px rgba(0, 0, 0, 0.15)',
        'lg': '4px 4px 8px rgba(0, 0, 0, 0.2)',
        'xl': '1px 1px 3px rgb(0 0 0 / 29%), 2px 4px 7px rgb(73 64 125 / 35%)',
        'xl-white': '1px 1px 1px rgb(255 0 0 / 80%), 4px 6px 7px rgb(255 0 0 / 35%)',
        '2xl-white': '1px 1px 3px rgb(255 255 255 / 29%), 2px 4px 7px rgb(255 255 255 / 35%)'

      }
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('tailwindcss-textshadow')
  ],

}