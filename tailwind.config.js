/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'surface': 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'pastel-pink': 'var(--pastel-pink)',
        'pastel-lilac': 'var(--pastel-lilac)',
        'pastel-blue': 'var(--pastel-blue)',
        'pastel-peach': 'var(--pastel-peach)',
        'pastel-mint': 'var(--pastel-mint)',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
