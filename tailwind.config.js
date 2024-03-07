/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx}",],
  theme: {
    extend: {
      colors : {
        primary: "#171717",
        secondary: "#272727",
        'dark-subtle': 'rgb(255,255,255,0.5)',
        'light-subtle': 'rgb(39,39,39,0.5)',
      }
    },
  },
  plugins: [],
}

