/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E2574C',
          hover: '#C94B41',
          light: '#FDECEA',
          dark: '#FF6B5E',
        },
        surface: {
          DEFAULT: '#F7F7F8',
          dark: '#252540',
          deeper: '#1E1E38',
        },
        border: {
          DEFAULT: '#E8E8EC',
          dark: '#3A3A5C',
        },
        ink: {
          primary: '#1A1A2E',
          secondary: '#6B6B80',
          muted: '#9999AA',
        },
        bg: {
          DEFAULT: '#FFFFFF',
          dark: '#1A1A2E',
        },
        pdfkit: {
          dark: '#1A1A2E',
          soft: '#E8E8EC', // Off-white plastic/matte surface
          dim: '#D1D1D6',  // Shadows/recesses
          red: '#E2574C',
          redlight: '#F48C84',
          reddark: '#C84439'
        }
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        display: ['Sora', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        card: '12px',
        btn: '8px',
        pill: '9999px',
        icon: '10px',
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 24px rgba(226,87,76,0.12)',
        'btn-primary': '2px 4px 8px rgba(0,0,0,0.2)',
        'navbar': '0 1px 0 rgba(0,0,0,0.06)',
        // Skeuomorphic raised element (light source from top-left)
        'skeuo-up': '4px 4px 10px rgba(0, 0, 0, 0.15), -4px -4px 10px rgba(255, 255, 255, 0.8), inset 1px 1px 2px rgba(255, 255, 255, 0.4)',

        // Skeuomorphic pressed element
        'skeuo-down': 'inset 4px 4px 8px rgba(0, 0, 0, 0.15), inset -4px -4px 8px rgba(255, 255, 255, 0.8)',

        // Deep recessed tray (Upload zone)
        'skeuo-inset': 'inset 6px 6px 12px rgba(0, 0, 0, 0.12), inset -6px -6px 12px rgba(255, 255, 255, 0.9)',

        // Raised dark mode element
        'skeuo-up-dark': '4px 4px 10px rgba(0, 0, 0, 0.5), -2px -2px 8px rgba(255, 255, 255, 0.05), inset 1px 1px 2px rgba(255, 255, 255, 0.1)',

        // Pressed dark mode element
        'skeuo-down-dark': 'inset 4px 4px 8px rgba(0, 0, 0, 0.5), inset -2px -2px 8px rgba(255, 255, 255, 0.05)',

        // Deep recessed tray dark mode
        'skeuo-inset-dark': 'inset 6px 6px 12px rgba(0, 0, 0, 0.6), inset -2px -2px 8px rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'pulse-border': 'pulseBorder 1.5s ease-in-out infinite',
        'spin-slow': 'spin 1.5s linear infinite',
        'progress': 'progressFill 0.3s ease-out',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        bounceIn: {
          from: { opacity: '0', transform: 'scale(0.8)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        pulseBorder: {
          '0%, 100%': { borderColor: '#E2574C' },
          '50%': { borderColor: '#FDECEA' },
        },
      },
      transitionDuration: {
        '250': '250ms',
      },
      maxWidth: {
        'content': '1200px',
        'tool': '800px',
        'upload': '640px',
      },
    },
  },
  plugins: [],
}
