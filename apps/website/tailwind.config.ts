import type {Config} from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f8ff',
          100: '#e8f0ff',
          200: '#c6dcff',
          300: '#9dbfff',
          400: '#6a97ff',
          500: '#3f6ffc',
          600: '#2f54d4',
          700: '#2643a9',
          800: '#243b87',
          900: '#24366f'
        },
        accent: {
          100: '#fff5de',
          300: '#ffd66b',
          500: '#ffb703',
          700: '#f48c06'
        },
        mint: '#7bdcb5',
        coral: '#ff8a80'
      },
      boxShadow: {
        soft: '0 14px 36px rgba(31, 71, 136, 0.14)'
      },
      borderRadius: {
        xl2: '1.25rem'
      }
    }
  },
  plugins: []
};

export default config;
