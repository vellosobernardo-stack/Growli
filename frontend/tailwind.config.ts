import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { 500: '#22c55e', 600: '#16a34a', 700: '#15803d' },
        neutral: { 100: '#f5f5f5', 200: '#e5e5e5', 600: '#737373', 900: '#171717' }
      }
    }
  }
}
export default config