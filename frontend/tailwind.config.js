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
          /* Vivid violet/indigo primary */
          DEFAULT: '#8B5CF6', // Violet 500
          hover: '#7C3AED',   // Violet 600
          light: '#DDD6FE',   // Violet 200
          dark: '#A78BFA',    // Violet 400
          gradientStart: '#6366F1', // Indigo 500
          gradientEnd: '#D946EF',   // Fuchsia 500
        },
        surface: {
          /* Clean white to glass for light mode */
          DEFAULT: 'rgba(255, 255, 255, 0.7)',
          hover: 'rgba(255, 255, 255, 0.9)',
          /* Deep space glass for dark mode */
          dark: 'rgba(30, 41, 59, 0.6)',      // Slate 800 with opacity
          darkHover: 'rgba(30, 41, 59, 0.8)',
          deeper: '#0F172A',                  // Slate 900
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.5)',
          dark: 'rgba(255, 255, 255, 0.1)',
        },
        ink: {
          primary: '#0F172A',   // Slate 900
          secondary: '#475569', // Slate 600
          muted: '#94A3B8',     // Slate 400
        },
        bg: {
          DEFAULT: '#F8FAFC', // Slate 50
          dark: '#020617',    // Slate 950
        },
        pdfkit: {
          dark: '#0F172A',
          soft: '#F1F5F9',
          dim: '#E2E8F0',
          red: '#8B5CF6',      // Reusing violet for 'red' legacy references
          redlight: '#C4B5FD',
          reddark: '#6D28D9'
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Outfit"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        card: '24px',
        btn: '12px',
        pill: '9999px',
        icon: '16px',
      },
      boxShadow: {
        /* Soft, diffuse glass shadows */
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-hover': '0 8px 32px 0 rgba(139, 92, 246, 0.2)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
        'glass-dark-hover': '0 8px 32px 0 rgba(139, 92, 246, 0.3)',

        /* Glowing buttons */
        'glow-primary': '0 0 20px rgba(139, 92, 246, 0.4)',
        'glow-primary-hover': '0 0 30px rgba(217, 70, 239, 0.6)',

        /* Inner borders for glassmorphism */
        'glass-inset': 'inset 0 1px 1px rgba(255, 255, 255, 0.4)',
        'glass-inset-dark': 'inset 0 1px 1px rgba(255, 255, 255, 0.1)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
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
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        }
      },
      transitionDuration: {
        '250': '250ms',
        '400': '400ms',
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
