/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx,mdx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'ml-bg': '#050816',
        'ml-surface': '#0b1020',
        'ml-vision': '#22d3ee',
        'ml-audio': '#f97316',
        'ml-reason': '#a855f7'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular']
      }
    }
  },
  plugins: []
}
