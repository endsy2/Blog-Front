import flowbite from 'flowbite-react/tailwind'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily:{
        Roboto:['Roboto','san-serif']
      },
      colors:{
        primary:"#4CAF4F",
        lightGray:"#EEEEEE",
        DarkGreen:"#328D35",
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}