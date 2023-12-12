/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        'grey':{
          DEFAULT:'#EAEAEA',
          dark:'#D7D7D7',
        },
        'sidebar':'#45504F',
        'redButton':'#CF2700',
        'blueButton':'#004FFF',
        'bgHeaderTable':'#C3C3C3',
        'bgTable':'#D7D7D7',
        'bgCreateSession':'#D9D9D9',
        'borderTable':'#9c9c9c',
        'greenPellet':'#23CE6B',
        'redPellet':'#FC7A57',
        
      },
      boxShadow: {
        'shadow_img' : '8px 8px 6px 0px #BFBFBF'
      }
    },
  },
  plugins: [],
}

