/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html,css}'],
  theme: {
    fontFamily: {
      sans: ['Helvetica', 'Arial', 'sant-serif']
    },
    extend: {
      backgroundImage: {
        'image-hero': "url('/src/assets/cloudy.jpg')",
        testColor: '#FFF',
        morning:
          'linear-gradient(81deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)',
        noon: 'linear-gradient(81deg, rgba(253,187,45,1) 0%, rgba(61,50,24,1) 100%)',
        night:
          'linear-gradient(145deg, rgba(252,252,251,1) 0%, rgba(21,5,73,1) 47%, rgba(237,23,242,1) 100%)'
      }
    }
  },
  plugins: []
}
