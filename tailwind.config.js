/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#050505',
        'cyber-lime': '#CCFF00',
        'cyber-dark': '#0a0a0a',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'monospace'],
        'sans': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display': ['8rem', { lineHeight: '1', fontWeight: '700' }],
        'display-lg': ['6rem', { lineHeight: '1', fontWeight: '700' }],
      },
      keyframes: {
        'scan-line': {
          '0%': { transform: 'translateY(-100%)', opacity: '0.5' },
          '50%': { opacity: '0.8' },
          '100%': { transform: 'translateY(100%)', opacity: '0.5' },
        },
        'pulse-lime': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(204, 255, 0, 0.7)' },
          '50%': { boxShadow: '0 0 0 10px rgba(204, 255, 0, 0)' },
        },
        'grid-fade': {
          '0%': { opacity: '0.05' },
          '100%': { opacity: '0.1' },
        },
      },
      animation: {
        'scan-line': 'scan-line 4s linear infinite',
        'pulse-lime': 'pulse-lime 2s infinite',
        'grid-fade': 'grid-fade 6s ease-in-out infinite',
      },
      backdropFilter: {
        'none': 'none',
        'sm': 'blur(4px)',
      },
    },
  },
  plugins: [],
  safelist: [
    { pattern: /bg-cyber-lime/ },
    { pattern: /text-cyber-lime/ },
    { pattern: /border-cyber-lime/ },
  ],
}
