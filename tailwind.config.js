/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#0B0C10',
        charcoal: '#1F2833',
        overlay: '#252A35',
        border: '#2A3340',
        'neon-cyan': '#66FCF1',
        'teal': '#45A29E',
        'electric-purple': '#C084FC',
        'cyber-blue': '#60A5FA',
        'success-green': '#4ADE80',
        'text-primary': '#C5C6C7',
        'text-muted': '#6B7280',
        'text-high': '#E5E7EB',
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
          '0%': { transform: 'translateY(-100%)', opacity: '0.3' },
          '50%': { opacity: '0.6' },
          '100%': { transform: 'translateY(100%)', opacity: '0.3' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        'border-glow': {
          '0%, 100%': { borderColor: 'rgba(102,252,241,0.15)' },
          '50%': { borderColor: 'rgba(102,252,241,0.40)' },
        },
      },
      animation: {
        'scan-line': 'scan-line 4s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'border-glow': 'border-glow 3.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-obsidian',
    'bg-charcoal',
    'bg-overlay',
    'text-neon-cyan',
    'text-electric-purple',
    'text-cyber-blue',
    'border-neon-cyan',
    'border-electric-purple',
    'border-cyber-blue',
    'border-success-green',
  ],
}