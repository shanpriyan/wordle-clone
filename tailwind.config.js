const colors = require('./src/styles/colors.js');
const { keyframes, animation } = require('./src/styles/animations');

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      xsm: '360px',
    },
    keyframes,
    animation,
    colors,
    extend: {
      height: {
        header: 'var(--header-height)',
        'app-content': 'var(--app-content-height)',
      },
    },
  },
  plugins: [],
};
