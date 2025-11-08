// postcss.config.js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}, // Must use this for Turbopack
    autoprefixer: {},
  },
};