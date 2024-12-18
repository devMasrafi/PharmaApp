/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      RaleWayFont: ['"Raleway", serif'],
      interFont: ['"Inter", serif'],
    },
    extend: {
      colors:{
        ashGreen: '#D0DBD8',
        darkWood: '#5C5C5C'
      }
    },
  },
  plugins: [],
};
