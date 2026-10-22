/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Architectural deep navy — primary
        navy: {
          DEFAULT: '#0a2540',
          950: '#05131f',
          900: '#071d31',
          800: '#0a2540',
          700: '#0f3355',
          600: '#17496f',
          500: '#2a6a94',
          200: '#c3d2de',
          100: '#e2eaf1',
          50: '#f4f7fa',
        },
        // Muted champagne — accents only
        champagne: {
          DEFAULT: '#c5a073',
          light: '#dfcba6',
          dark: '#a8834f',
        },
        ink: {
          DEFAULT: '#0b1622',
          soft: '#33414f',
        },
        muted: '#63758a',
        ivory: '#faf8f5',
        mist: '#f4f7fa',
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      maxWidth: {
        container: '1240px',
      },
      borderRadius: {
        card: '14px',
        pill: '999px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(10,37,64,.05), 0 14px 34px -18px rgba(10,37,64,.22)',
        lift: '0 28px 64px -28px rgba(10,37,64,.38)',
        header: '0 1px 0 rgba(10,37,64,.07), 0 10px 30px -22px rgba(10,37,64,.35)',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(.22,1,.36,1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'hero-zoom': {
          from: { transform: 'scale(1.03)' },
          to: { transform: 'scale(1)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'sheet-up': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'hero-loading': {
          '0%': { transform: 'translateX(-110%)' },
          '100%': { transform: 'translateX(330%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up .75s cubic-bezier(.22,1,.36,1) both',
        'hero-zoom': 'hero-zoom 1.6s cubic-bezier(.22,1,.36,1) both',
        'fade-in': 'fade-in .5s ease-out both',
        'sheet-up': 'sheet-up .35s cubic-bezier(.22,1,.36,1) both',
        'hero-loading': 'hero-loading 1.5s ease-in-out infinite',
        // Delayed so a warm cache never flashes a loading state.
        'fade-in-late': 'fade-in .4s ease-out .45s both',
      },
    },
  },
  plugins: [],
}
