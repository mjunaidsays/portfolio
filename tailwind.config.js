/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        base: {
          900: '#080C14',
          800: '#0D1117',
          700: '#111827',
          600: '#1a2235',
        },
        electric: {
          DEFAULT: '#00D9FF',
          50: '#e0faff',
          400: '#38ecff',
          500: '#00D9FF',
          600: '#00b8d9',
        },
        violet: {
          DEFAULT: '#7C3AED',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7C3AED',
        },
      },
      animation: {
        aurora: 'aurora 12s ease infinite',
        'spin-slow': 'spin 20s linear infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'float-badge': 'floatBadge 3s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2s ease-in-out infinite',
      },
      keyframes: {
        aurora: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        floatBadge: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseRing: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0, 217, 255, 0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(0, 217, 255, 0)' },
        },
      },
    },
  },
  plugins: [],
};
