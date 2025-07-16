/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./primereact.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ultima-primary': '#3b82f6',
        'ultima-primary-light': '#dbeafe',
        'ultima-primary-dark': '#1e40af',
        'ultima-surface': '#ffffff',
        'ultima-surface-ground': '#eff3f8',
        'ultima-surface-card': '#ffffff',
        'ultima-text-primary': '#1e293b',
        'ultima-text-secondary': '#64748b',
        'ultima-border': '#e2e8f0',
        'ultima-success': '#10b981',
        'ultima-warning': '#f59e0b',
        'ultima-danger': '#ef4444',
        'ultima-info': '#06b6d4',
        'ultima-sidebar': '#1e293b',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'fadeIn': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Disable Tailwind's reset to avoid conflicts with PrimeReact
  },
}