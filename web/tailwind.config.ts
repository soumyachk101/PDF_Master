import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          600: '#2563EB',
          700: '#1D4ED8'
        },
        secondary: {
          600: '#7C3AED'
        }
      }
    }
  },
  plugins: []
};

export default config;

