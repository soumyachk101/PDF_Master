/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                background: 'var(--color-canvas-ice)',
                foreground: 'var(--color-midnight-ink)',
                muted: 'var(--color-fog-gray)',
                accent: {
                    DEFAULT: 'var(--color-action-green)',
                    yellow: 'var(--color-alert-yellow)',
                    dark: 'var(--color-deep-smoke)',
                },
                border: 'var(--color-midnight-ink)',
                primary: {
                    DEFAULT: 'var(--color-midnight-ink)',
                    foreground: 'var(--color-paper-white)',
                },
                secondary: {
                    DEFAULT: 'var(--color-faint-mist)',
                    foreground: 'var(--color-midnight-ink)',
                },
                card: {
                    DEFAULT: 'var(--color-paper-white)',
                    foreground: 'var(--color-midnight-ink)',
                },
                ring: 'var(--color-midnight-ink)',
                input: 'var(--color-paper-white)',
            },
            fontFamily: {
                suisseintl: ['var(--font-suisseintl)', 'sans-serif'],
                suisseintlcond: ['var(--font-suisseintlcond)', 'sans-serif'],
                suisseintlmono: ['var(--font-suisseintlmono)', 'monospace'],
                body: ['var(--font-suisseintl)', 'sans-serif'],
                display: ['var(--font-suisseintlcond)', 'sans-serif'],
                mono: ['var(--font-suisseintlmono)', 'monospace'],
            },
            borderRadius: {
                none: '0px',
                DEFAULT: 'var(--radius-buttons)',
                sm: '4px',
                md: '8px',
                lg: '12px',
                xl: '20px',
                '2xl': '24px',
                '3xl': '32px',
                full: '9999px',
                cards: 'var(--radius-cards)',
                buttons: 'var(--radius-buttons)',
                heroelements: 'var(--radius-heroelements)',
                navigationitems: 'var(--radius-navigationitems)',
            },
            boxShadow: {
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
