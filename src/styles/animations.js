exports.keyframes = {
  'cell-pop': {
    '0%': {
      opacity: '0.5',
      transform: 'scale(0.9)',
    },
    '50%': {
      opacity: '0.9',
      transform: 'scale(1.1)',
    },
    '100%': {
      opacity: '1',
      transform: 'scale(1)',
    },
  },
};

exports.animation = {
  'cell-pop': 'cell-pop 200ms ease-in',
};
