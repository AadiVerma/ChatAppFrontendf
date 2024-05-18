/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-purple': '#7858A6',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

