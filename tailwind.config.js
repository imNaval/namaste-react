/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    // extend: {},
    screens: {
      'xs': '460px',
      'xxs' : '410px',
      'xxxs' : '370px',
      ...defaultTheme.screens,
    },
  },
  plugins: [],
}

