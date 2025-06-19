/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        neon: ['Orbitron', 'sans-serif'],
        terminal: ['VT323', 'monospace'],
      },
    },
  },
  plugins: [],
};
