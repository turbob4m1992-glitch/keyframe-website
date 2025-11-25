/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon': '#39FF14',       // Keyframe Green
        'void': '#050505',       // Deepest Black
        'glass': 'rgba(255, 255, 255, 0.05)', 
      },
      fontFamily: {
        'sans': ['Outfit', 'sans-serif'],
        'mono': ['Space Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}