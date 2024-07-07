/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", 'index.html'],
  theme: {
    extend: {
      backgroundImage: {
        'header': "url('/src/images/header.jpg')"
      }
    },
    fontFamily: {
      'anton': ["Anton", "sans-serif"]
    }
  },
  plugins: [],
}

