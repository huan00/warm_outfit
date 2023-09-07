/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html,css}'],
  theme: {
    extend: {
      backgroundImage: {
        'image-hero': "url('/src/assets/cloudy.jpg')"
      }
    }
  },
  plugins: []
}
