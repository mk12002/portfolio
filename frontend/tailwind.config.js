/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Decouple `white` per-utility: text stays the readable text color,
      // while backgrounds/borders use their own elevation/line tokens. This
      // lets bg-white/5 read as a raised surface and border-white/10 as a
      // visible hairline in light mode, without touching component classes.
      backgroundColor: {
        white: 'rgb(var(--c-elev) / <alpha-value>)'
      },
      borderColor: {
        white: 'rgb(var(--c-line) / <alpha-value>)'
      },
      boxShadow: {
        card: '0 1px 2px rgb(15 23 42 / 0.06), 0 6px 16px rgb(15 23 42 / 0.06)'
      },
      colors: {
        // Page + surfaces — flip between dark/light via CSS variables
        primary: 'rgb(var(--c-bg) / <alpha-value>)',
        secondary: 'rgb(var(--c-surface) / <alpha-value>)',
        dark: {
          800: 'rgb(var(--c-surface-2) / <alpha-value>)',
          900: 'rgb(var(--c-surface) / <alpha-value>)'
        },
        // Text tokens — override default white/gray so they adapt to mode.
        // `white` doubles as the overlay base, so bg-white/5 & border-white/10
        // become subtle light-on-dark / dark-on-light surfaces automatically.
        white: 'rgb(var(--c-text) / <alpha-value>)',
        gray: {
          200: 'rgb(var(--c-text) / <alpha-value>)',
          300: 'rgb(var(--c-muted) / <alpha-value>)',
          400: 'rgb(var(--c-muted-2) / <alpha-value>)',
          500: 'rgb(var(--c-faint) / <alpha-value>)',
          600: 'rgb(var(--c-faint) / <alpha-value>)',
          700: 'rgb(var(--c-faint) / <alpha-value>)'
        },
        // Cohesive teal/emerald accent family (replaces clashing neon variants)
        accent: 'rgb(var(--color-vision) / <alpha-value>)',
        vision: 'rgb(var(--color-vision) / <alpha-value>)',
        audio: 'rgb(var(--color-audio) / <alpha-value>)',
        reasoning: 'rgb(var(--color-reasoning) / <alpha-value>)',
        // Remap literal accent palettes onto the variable family so existing
        // green/emerald/teal/cyan utilities stay cohesive AND adapt to light mode.
        green: {
          300: 'rgb(var(--color-vision) / <alpha-value>)',
          400: 'rgb(var(--color-vision) / <alpha-value>)',
          500: 'rgb(var(--color-vision) / <alpha-value>)'
        },
        emerald: {
          300: 'rgb(var(--color-vision) / <alpha-value>)',
          400: 'rgb(var(--color-vision) / <alpha-value>)',
          500: 'rgb(var(--color-vision) / <alpha-value>)'
        },
        teal: {
          300: 'rgb(var(--color-reasoning) / <alpha-value>)',
          400: 'rgb(var(--color-reasoning) / <alpha-value>)',
          500: 'rgb(var(--color-reasoning) / <alpha-value>)'
        },
        cyan: {
          300: 'rgb(var(--color-audio) / <alpha-value>)',
          400: 'rgb(var(--color-audio) / <alpha-value>)',
          500: 'rgb(var(--color-audio) / <alpha-value>)'
        },
        // Semantic aliases — also map onto the accent family
        offensive: 'rgb(var(--color-vision) / <alpha-value>)',
        defensive: 'rgb(var(--color-audio) / <alpha-value>)',
        threat: 'rgb(var(--color-reasoning) / <alpha-value>)',
        warning: '#f59e0b'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite'
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
        }
      }
    },
  },
  plugins: [],
}
