/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
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

