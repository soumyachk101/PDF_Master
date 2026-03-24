/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#FFB400', // Gold
                    hover: '#E6A200',
                    light: '#FFC533',
                    dark: '#B27B00',
                    glow: 'rgba(255, 180, 0, 0.5)',
                },
                surface: {
                    DEFAULT: '#FFFFFF',
                    glass: 'rgba(255, 255, 255, 0.7)',
                    dark: '#1B1B1E', // Dark Gray
                    deeper: '#1A1A2E', // Deep Navy
                    glassDark: 'rgba(26, 26, 46, 0.65)',
                },
                border: {
                    DEFAULT: '#E2E8F0',
                    glass: 'rgba(255, 255, 255, 0.4)',
                    dark: '#1B1B1E', // Dark Gray
                    glassDark: 'rgba(255, 255, 255, 0.08)',
                },
                ink: {
                    primary: '#0B0A0E', // Obsidian Black
                    secondary: '#4B5563',
                    muted: '#94A3B8',
                },
                bg: {
                    DEFAULT: '#F8F9FA', // Cloud White
                    dark: '#1A1A2E', // Deep Navy
                },
                accent: {
                    DEFAULT: '#D7263D', // Deep Red
                }
            },
            fontFamily: {
                display: ['Inter', 'system-ui', 'sans-serif'],
                body: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'monospace'],
            },
            borderRadius: {
                card: '20px',
                btn: '12px',
                pill: '9999px',
                icon: '14px',
            },
            boxShadow: {
                card: '0 8px 30px rgba(0,0,0,0.04)',
                'card-hover': '0 20px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(255, 180, 0, 0.1)',
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
                'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
                'btn-primary': '0 8px 16px rgba(255, 180, 0, 0.25), 0 0 0 1px rgba(255, 180, 0, 1)',
                navbar: '0 4px 30px rgba(0, 0, 0, 0.04)',
                modal: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                glow: '0 0 30px rgba(255, 180, 0, 0.4)',
            },
            maxWidth: {
                content: '1280px',
                tool: '800px',
                upload: '640px',
            },
            transitionTimingFunction: {
                'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            },
            animation: {
                'fade-up': 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
                'fade-in': 'fadeIn 0.5s ease both',
                'bounce-in': 'bounceIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both',
                'slide-down': 'slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
                'spin-slow': 'spin 3s linear infinite',
                'blob': "blob 7s infinite",
                'pulse-glow': 'pulseGlow 2s infinite',
            },
            keyframes: {
                fadeUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                },
                bounceIn: {
                    '0%': { opacity: '0', transform: 'scale(0.85)' },
                    '100%': { opacity: '1', transform: 'scale(1)' }
                },
                slideDown: {
                    '0%': { opacity: '0', transform: 'translateY(-20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                blob: {
                    "0%": { transform: "translate(0px, 0px) scale(1)" },
                    "33%": { transform: "translate(30px, -50px) scale(1.1)" },
                    "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
                    "100%": { transform: "translate(0px, 0px) scale(1)" },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 15px rgba(255, 180, 0, 0.2)' },
                    '50%': { boxShadow: '0 0 30px rgba(255, 180, 0, 0.6)' },
                }
            },
        },
    },
    plugins: [],
}
