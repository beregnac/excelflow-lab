import plugin from 'tailwindcss/plugin'
import containerQueries from '@tailwindcss/container-queries'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b'
        },
        semantic: {
          success: {
            50: '#ecfdf5',
            100: '#d1fae5',
            500: '#10b981',
            600: '#059669',
            700: '#047857'
          },
          warning: {
            50: '#fffbeb',
            100: '#fef3c7',
            500: '#f59e0b',
            600: '#d97706',
            700: '#b45309'
          },
          danger: {
            50: '#fff1f2',
            100: '#ffe4e6',
            500: '#f43f5e',
            600: '#e11d48',
            700: '#be123c'
          },
          info: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1'
          }
        }
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        auroraDrift1: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '33%': { transform: 'translate3d(8%, 10%, 0) scale(1.12)' },
          '66%': { transform: 'translate3d(-6%, 4%, 0) scale(0.94)' }
        },
        auroraDrift2: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '33%': { transform: 'translate3d(-10%, -8%, 0) scale(1.15)' },
          '66%': { transform: 'translate3d(6%, -12%, 0) scale(0.92)' }
        },
        auroraDrift3: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1) rotate(0deg)' },
          '50%': { transform: 'translate3d(7%, -7%, 0) scale(1.1) rotate(12deg)' }
        },
        gridPan: {
          '0%': { backgroundPosition: '0px 0px' },
          '100%': { backgroundPosition: '56px 56px' }
        },
        meteor: {
          '0%': { transform: 'rotate(215deg) translateX(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '70%': { opacity: '1' },
          '100%': { transform: 'rotate(215deg) translateX(-650px)', opacity: '0' }
        },
        beamSlide: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '20%': { opacity: '0.7' },
          '80%': { opacity: '0.7' },
          '100%': { transform: 'translateX(200%)', opacity: '0' }
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        shineSweep: {
          '0%': { transform: 'translateX(-120%) skewX(-20deg)' },
          '100%': { transform: 'translateX(260%) skewX(-20deg)' }
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out both',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'aurora-1': 'auroraDrift1 16s ease-in-out infinite',
        'aurora-2': 'auroraDrift2 22s ease-in-out infinite',
        'aurora-3': 'auroraDrift3 26s ease-in-out infinite',
        'grid-pan': 'gridPan 14s linear infinite',
        meteor: 'meteor 5s linear infinite',
        'beam-slide': 'beamSlide 9s ease-in-out infinite',
        'spin-slow': 'spinSlow 28s linear infinite',
        'gradient-x': 'gradientX 5s ease infinite',
        'shine-sweep': 'shineSweep 2.6s ease-in-out infinite'
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(15, 23, 42, 0.08)',
        glow: '0 0 32px -4px rgba(99, 102, 241, 0.35)'
      }
    }
  },
  plugins: [
    containerQueries,
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          'scrollbar-color': 'rgba(148, 163, 184, 0.5) transparent',
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px'
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(148, 163, 184, 0.5)',
            borderRadius: '9999px'
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'rgba(100, 116, 139, 0.75)'
          }
        },
        '.glass-panel': {
          backgroundColor: 'rgba(255, 255, 255, 0.72)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)'
        },
        '.text-balance': {
          textWrap: 'balance'
        }
      })
    })
  ]
}
