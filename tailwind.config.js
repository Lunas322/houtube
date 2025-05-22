// tailwind.config.js

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // ✅ 올바른 glob 경로
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
