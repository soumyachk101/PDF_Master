/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                chassis: '#e0e5ec',
                panel: '#f0f2f5',
                recessed: '#d1d9e6',
                ink: {
                    DEFAULT: '#2d3436',
                    primary: '#2d3436',
                    secondary: '#4a5568',
                    muted: '#737373',
                },
                accent: {
                    DEFAULT: '#ff4757',
                    secondary: '#ff4757',
                    glow: 'rgba(255, 71, 87, 0.4)',
                },
                'border-shadow': '#babecc',
                'border-light': '#ffffff',
                'border-dark': '#a3b1c6',
                primary: {
                    DEFAULT: '#ff4757',
                    hover: '#ff2e44',
                    light: '#ff6b7b',
                    dark: '#cc3946',
                    glow: 'rgba(255, 71, 87, 0.4)',
                    foreground: '#ffffff',
                },
                secondary: {
                    DEFAULT: '#e0e5ec',
                    foreground: '#2d3436',
                },
                destructive: {
                    DEFAULT: '#ff4757',
                    foreground: '#ffffff',
                },
                muted: {
                    DEFAULT: '#d1d9e6',
                    foreground: '#4a5568',
                },
                background: '#e0e5ec',
                foreground: '#2d3436',
                card: {
                    DEFAULT: '#e0e5ec',
                    foreground: '#2d3436',
                },
                border: '#a3b1c6',
                input: '#d1d9e6',
                ring: '#ff4757',
                surface: {
                    DEFAULT: '#e0e5ec',
                    glass: 'rgba(224, 229, 236, 0.8)',
                    dark: '#2d3436',
                    deeper: '#1e2424',
                    glassDark: 'rgba(45, 52, 70, 0.85)',
                },
                bg: {
                    DEFAULT: '#e0e5ec',
                    dark: '#2d3436',
                },
            },
            fontFamily: {
                display: ['var(--font-display)', 'Inter', 'sans-serif'],
                body: ['var(--font-body)', 'Inter', 'sans-serif'],
                mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
            },
            borderRadius: {
                none: '0px',
                sm: '4px',
                md: '8px',
                lg: '16px',
                xl: '24px',
                '2xl': '30px',
                pill: '9999px',
                full: '9999px',
            },
            boxShadow: {
                neu: '9px 9px 16px #babecc, -9px -9px 16px #ffffff',
                'neu-float': '14px 14px 24px #babecc, -14px -14px 24px #ffffff',
                'neu-pressed': 'inset 4px 4px 8px #babecc, inset -4px -4px 8px #ffffff',
                'neu-recessed': 'inset 3px 3px 6px #babecc, inset -3px -3px 6px #ffffff',
                'neu-sharp': '2px 2px 5px #babecc, -2px -2px 5px #ffffff',
                // Legacy compatibility mappings
                card: '9px 9px 16px #babecc, -9px -9px 16px #ffffff',
                'card-hover': '14px 14px 24px #babecc, -14px -14px 24px #ffffff',
                navbar: '0 4px 12px rgba(186, 190, 204, 0.5)',
                modal: '14px 14px 24px #babecc, -14px -14px 24px #ffffff',
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
                'blob': 'blob 7s infinite',
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
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 15px rgba(255, 71, 87, 0.2)' },
                    '50%': { boxShadow: '0 0 30px rgba(255, 71, 87, 0.6)' },
                }
            },
        },
    },
    plugins: [],
}
