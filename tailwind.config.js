/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7f0',
          100: '#feeee0',
          200: '#fdd9be',
          300: '#fbb990',
          400: '#f79061',
          500: '#f4713d',
          600: '#e55825',
          700: '#be451c',
          800: '#97391d',
          900: '#7a331b',
        },
        secondary: {
          50: '#fdf4f8',
          100: '#fbe7f1',
          200: '#f7d0e4',
          300: '#f1abce',
          400: '#e879b0',
          500: '#dc4f92',
          600: '#c93074',
          700: '#ab205d',
          800: '#8e1c4c',
          900: '#771b42',
        }
      },
    },
  },
  plugins: [],
}