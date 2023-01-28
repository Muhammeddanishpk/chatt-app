/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {   
     
    extend: {
      colors:{
        "main":"#54d38a"
      },
      screens:{'sm':'680px'}
    },
  },
  plugins: [],
}