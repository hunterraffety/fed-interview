const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#eb0028',
        secondary: '#1a1a1a',
        light: '#f9f9f9',
        textDark: '#213547',
        textLight: 'rgba(255, 255, 255, 0.87)',
      },
      fontFamily: {
        primary: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        custom: '8px',
      },
    },
  },
  plugins: [],
};
