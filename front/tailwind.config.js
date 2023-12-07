/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        'grey':{
          light:'#EAEAEA',
          DEFAULT:'#D7D7D7',
        },
        'sidebar':'#45504F',
        'redButton':'#CF2700',
        'blueButton':'#004FFF',
      }
    },
  },
  plugins: [],
}

