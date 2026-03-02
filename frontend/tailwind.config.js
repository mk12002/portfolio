/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0a0e17',
        secondary: '#0d1321',
        // Dynamic theme colors via CSS custom properties (RGB channels)
        offensive: 'rgb(var(--color-vision) / <alpha-value>)',
        defensive: 'rgb(var(--color-audio) / <alpha-value>)',
        threat: 'rgb(var(--color-reasoning) / <alpha-value>)',
        warning: '#fbbf24',
        // Legacy aliases — also dynamic
        vision: 'rgb(var(--color-vision) / <alpha-value>)',
        audio: 'rgb(var(--color-audio) / <alpha-value>)',
        reasoning: 'rgb(var(--color-reasoning) / <alpha-value>)',
        accent: {
          green: '#00ff41',
          blue: '#3b82f6',
          red: '#ef4444',
          amber: '#fbbf24'
        },
        dark: {
          800: '#111827',
          900: '#0a0e17'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
        'scanline': 'scanline 8s linear infinite'
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'gradient': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        'scanline': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        }
      }
    },
  },
  plugins: [],
}
