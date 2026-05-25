/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                bauhaus: {
                    red: '#D02020',
                    blue: '#1040C0',
                    yellow: '#F0C020',
                    black: '#121212',
                    white: '#F0F0F0',
                    muted: '#E0E0E0',
                },
                primary: {
                    DEFAULT: '#D02020', // Bauhaus Red
                    hover: '#B01A1A',
                    light: '#E04D4D',
                    dark: '#901616',
                    glow: 'rgba(208, 32, 32, 0.4)',
                },
                surface: {
                    DEFAULT: '#F0F0F0',
                    glass: 'rgba(240, 240, 240, 0.8)',
                    dark: '#121212',
                    deeper: '#0A0A0A',
                    glassDark: 'rgba(18, 18, 18, 0.85)',
                },
                border: {
                    DEFAULT: '#121212',
                    glass: 'rgba(18, 18, 18, 0.2)',
                    dark: '#F0F0F0',
                    glassDark: 'rgba(240, 240, 240, 0.1)',
                },
                ink: {
                    primary: '#121212',
                    secondary: '#404040',
                    muted: '#737373',
                },
                bg: {
                    DEFAULT: '#F0F0F0',
                    dark: '#121212',
                },
                accent: {
                    DEFAULT: '#1040C0', // Bauhaus Blue
                    secondary: '#F0C020', // Bauhaus Yellow
                }
            },
            fontFamily: {
                display: ['"Space Grotesk"', 'Outfit', 'sans-serif'],
                body: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'monospace'],
            },
            borderRadius: {
                none: '0px',
                card: '0px',
                btn: '0px',
                pill: '9999px',
                full: '9999px',
            },
            boxShadow: {
                bauhaus: '4px 4px 0px 0px #121212',
                'bauhaus-lg': '8px 8px 0px 0px #121212',
                'bauhaus-blue': '4px 4px 0px 0px #1040C0',
                'bauhaus-yellow': '4px 4px 0px 0px #F0C020',
                card: '8px 8px 0px 0px #121212',
                'card-hover': '12px 12px 0px 0px #121212',
                navbar: '0 4px 0px 0px #121212',
                modal: '12px 12px 0px 0px #121212',
            },
            borderWidth: {
                '3': '3px',
                '6': '6px',
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
