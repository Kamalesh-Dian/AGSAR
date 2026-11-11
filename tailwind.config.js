/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F7F2E8',
        panel: '#FFFDF8',
        band: '#EDE5D3',
        navy: '#12275A',
        navydeep: '#0C1D49',
        blue: '#2F5FC9',
        sky: '#D9E3F5',
        red: '#E5483A',
        reddark: '#BC372B',
        coral: '#FF8F80',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
