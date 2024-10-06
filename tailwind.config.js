/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'wheel-spin': 'spin 10s linear infinite',
        'flag-wave': 'wave 3s ease-in-out infinite',
        'mountain-fade': 'fade 5s ease-in-out infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fade: {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 0.7 },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}