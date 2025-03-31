module.exports = {
  theme: {
    extend: {
      animation: {
        circleStroke: 'stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards',
        checkStroke: 'stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards',
        fillBackground: 'fillBackground 0.4s ease-in-out 0.6s forwards',
        scale: 'scale 0.3s ease-in-out 0.9s both',
      },
      keyframes: {
        stroke: {
          '100%': { strokeDashoffset: '0' },
        },
        fillBackground: {
          '0%': { background: 'transparent' },
          '100%': { background: '#2563eb' },
        },
        scale: {
          '0%, 100%': { transform: 'none' },
          '50%': { transform: 'scale3d(1.1, 1.1, 1)' },
        },
      },
    },
  },
  plugins: [],
};
