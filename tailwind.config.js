/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FFF8F1',
          100: '#FDEFE0',
          200: '#F9E0C7',
        },
        coral: {
          50: '#FFF1EC',
          100: '#FFE0D6',
          200: '#FFC2AE',
          400: '#F28B6D',
          500: '#E2694A',
          600: '#C9502F',
          700: '#A63F24',
        },
        sage: {
          50: '#F3F7F1',
          100: '#E3EDDF',
          500: '#6F9A62',
          600: '#587F4C',
          700: '#476640',
        },
        cocoa: {
          DEFAULT: '#3D2B24',
          700: '#5A433A',
          500: '#7D6559',
          300: '#B8A79D',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -10px rgba(122, 72, 48, 0.25)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}