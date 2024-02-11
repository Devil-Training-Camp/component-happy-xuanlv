const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--happy-primary-color, #555fff)',
        'primary-1': 'var(--happy-primary-1, #eeefff)',
        'primary-2': 'var(--happy-primary-2, #dddfff)',
        'primary-3': 'var(--happy-primary-3, #bbbfff)',
        'primary-4': 'var(--happy-primary-4, #999fff)',
        'primary-5': 'var(--happy-primary-5, #777fff)',
        'primary-7': 'var(--happy-primary-7, #444ccc)',
        'primary-8': 'var(--happy-primary-8, #333999)',
        'primary-9': 'var(--happy-primary-8, #222666)',
      },
    },
  },
  plugins: [],
};
