/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.vue",
  ],
  theme: {
    fontFamily: {
      sans: ['Epilogue', 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}

