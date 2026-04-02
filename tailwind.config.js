/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--bg-primary)',
          card: 'var(--bg-card)',
          hover: 'var(--bg-hover)',
          border: 'var(--border)',
        },
        accent: {
          green: 'var(--accent-green)',
          red: 'var(--accent-red)',
          blue: 'var(--accent-blue)',
          gold: 'var(--accent-gold)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
        }
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
