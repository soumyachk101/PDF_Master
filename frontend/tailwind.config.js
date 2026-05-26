/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                background: '#E4EDE8',
                foreground: '#2A3A31',
                muted: '#55685C',
                accent: {
                    DEFAULT: '#7C3AED',
                    light: '#9F67FF',
                    secondary: '#0D9488',
                },
                destructive: '#E11D48',
                success: '#0D9488',
                border: 'transparent',
                primary: {
                    DEFAULT: '#7C3AED',
                    foreground: '#FFFFFF',
                },
                secondary: {
                    DEFAULT: '#E4EDE8',
                    foreground: '#2A3A31',
                },
                card: {
                    DEFAULT: '#E4EDE8',
                    foreground: '#2A3A31',
                },
                ring: '#7C3AED',
                input: '#E4EDE8',
            },
            fontFamily: {
                body: ['var(--font-body)', 'sans-serif'],
                display: ['var(--font-display)', 'sans-serif'],
                mono: ['monospace'],
            },
            borderRadius: {
                none: '0px',
                DEFAULT: '16px',
                sm: '8px',
                md: '12px',
                lg: '16px',
                xl: '20px',
                '2xl': '24px',
                '3xl': '32px',
                full: '9999px',
            },
            boxShadow: {
                'soft-extruded': '9px 9px 18px rgba(189, 201, 193, 0.75), -9px -9px 18px rgba(255, 255, 255, 0.85)',
                'soft-extruded-hover': '12px 12px 24px rgba(189, 201, 193, 0.85), -12px -12px 24px rgba(255, 255, 255, 0.95)',
                'soft-extruded-sm': '5px 5px 10px rgba(189, 201, 193, 0.75), -5px -5px 10px rgba(255, 255, 255, 0.85)',
                'soft-inset': 'inset 6px 6px 12px rgba(189, 201, 193, 0.75), inset -6px -6px 12px rgba(255, 255, 255, 0.85)',
                'soft-inset-deep': 'inset 10px 10px 20px rgba(189, 201, 193, 0.85), inset -10px -10px 20px rgba(255, 255, 255, 0.95)',
                'soft-inset-sm': 'inset 3px 3px 6px rgba(189, 201, 193, 0.75), inset -3px -3px 6px rgba(255, 255, 255, 0.85)',
                none: 'none',
            },
            borderWidth: {
                '2': '2px',
                '3': '3px',
                '4': '4px',
            },
            maxWidth: {
                content: '1024px',
                tool: '800px',
                upload: '640px',
            },
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'float-slow': 'float 6s ease-in-out infinite',
                'blink': 'blink 1.5s step-end infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                blink: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.4' },
                },
            },
        },
    },
    plugins: [],
}
