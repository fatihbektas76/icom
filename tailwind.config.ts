import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        icom: {
          black:          '#0D0D0D',
          card:           '#161616',
          'card-dark':    '#111111',
          border:         '#1C1C1C',
          'border-light': '#2A2A2A',
          accent:         '#F05252',
          'accent-hover': '#D93F3F',
          icon:           '#F05252',
          gray:           '#C8C8C8',
          muted:          '#888888',
          dark:           '#555555',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 1.6s infinite',
        'count-up': 'countUp 1.2s ease-out',
      }
    }
  },
  plugins: [],
}
export default config
