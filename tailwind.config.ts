import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#080808',
          'zinc-900': '#111111',
          'zinc-800': '#1A1A1A',
          'zinc-700': '#262626',
          'zinc-600': '#3D3D3D',
          'zinc-400': '#8A8A8A',
          'zinc-200': '#D4D4D4',
          white: '#F5F5F5',
          acid: '#C8FF00',
          'acid-dark': '#9ECF00',
        }
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        sans: ['var(--font-dm-sans)', 'sans-serif'],
      },
      keyframes: {
        'fade-up': { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'slide-right': { from: { transform: 'translateX(-100%)' }, to: { transform: 'translateX(0)' } },
        'slide-left': { from: { transform: 'translateX(100%)' }, to: { transform: 'translateX(0)' } },
        shimmer: { from: { backgroundPosition: '-200% 0' }, to: { backgroundPosition: '200% 0' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        'scale-in': { from: { opacity: '0', transform: 'scale(0.95)' }, to: { opacity: '1', transform: 'scale(1)' } },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease forwards',
        'fade-in': 'fade-in 0.3s ease forwards',
        'slide-right': 'slide-right 0.4s ease forwards',
        'slide-left': 'slide-left 0.4s ease forwards',
        shimmer: 'shimmer 2s infinite linear',
        marquee: 'marquee 20s linear infinite',
        'scale-in': 'scale-in 0.4s ease forwards',
      }
    },
  },
  plugins: [],
}
export default config
