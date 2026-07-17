/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        royal: {
          50: '#F0F4FF',
          100: '#E0EAFF',
          200: '#C7D7FE',
          300: '#A5BFFC',
          400: '#819FFA',
          500: '#607CF4',
          600: '#4356E8',
          700: '#3441D1',
          800: '#1E3A8A', // Dominant royal blue Brand Hex
          900: '#172E6E',
          950: '#11204C',
        },
        gold: {
          50: '#FFFDF0',
          100: '#FFFBE0',
          200: '#F8E0AD', // Exact sampled warm light gold
          300: '#F0D7A3', // Exact sampled soft cream gold
          400: '#EEBF8B', // Exact sampled warm gold highlight
          500: '#F5C518', // Sparing golden yellow Accent Hex
          600: '#C89961', // Exact sampled rich lotus gold
          700: '#BE9057', // Exact sampled deep bronze gold
          800: '#946B0E',
          900: '#7A5712',
          950: '#452E04',
        },
        cream: {
          50: '#FFFFFF',
          100: '#FDFCF9', // Soft warm off-white background
          200: '#F8F7F2',
          300: '#EFECE2',
          400: '#E2DECF',
          500: '#CBC5B3',
        },
        terracotta: {
          50: '#FDF8F5',
          100: '#FBF0E9',
          200: '#F5DDD0',
          300: '#ECC3AC',
          400: '#DF9F7E',
          500: '#C4915C', // Warm terracotta / sandstone supporting tone
          600: '#B07D4C',
          700: '#91633D',
          800: '#765134',
          900: '#60432C',
          950: '#342315',
        },
        sandstone: {
          50: '#FDFCF9',
          100: '#FAF6EF',
          200: '#F4EBE0',
          300: '#E8DBC9',
          400: '#D9C6AE',
          500: '#C5B095',
          600: '#A89276',
          700: '#89755C',
          800: '#6E5E4A',
          900: '#5A4E3E',
          950: '#312A21',
        }
      },
      fontFamily: {
        display: ['"Cinzel"', '"Vesper Libre"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'arch': '1.5rem',
        'arch-sm': '0.75rem',
      },
      boxShadow: {
        'royal-sm': '0 4px 14px 0 rgba(30, 58, 138, 0.08)',
        'royal-md': '0 8px 24px -4px rgba(30, 58, 138, 0.12)',
        'royal-lg': '0 16px 36px -8px rgba(30, 58, 138, 0.18)',
        'gold-glow': '0 0 20px rgba(245, 197, 24, 0.28)',
        'warm-sm': '0 4px 14px 0 rgba(196, 145, 92, 0.12)',
        'warm-md': '0 10px 30px -4px rgba(196, 145, 92, 0.18)',
        'warm-lg': '0 20px 45px -8px rgba(196, 145, 92, 0.22)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-slow': 'pulseSlow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        }
      }
    },
  },
  plugins: [],
};
