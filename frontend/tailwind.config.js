/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ajio: {
          dark: '#2c4152',
          accent: '#d6a56c',
          price: '#2c4152',
        },
      },
    },
  },
  plugins: [],
};
