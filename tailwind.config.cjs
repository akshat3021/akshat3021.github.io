/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bgNearBlack: '#0a0a0a',
        textOffWhite: '#f5f5f5',
        accentBlue: '#6EA8E8',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0a0a0a, #1a1a3a)', // dark navy/space gradient
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        'serif-accent': ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
};
