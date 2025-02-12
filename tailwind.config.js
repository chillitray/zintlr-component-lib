/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"], // Ensure Tailwind scans components
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: true, // Enable Tailwind’s reset styles (needed for v4)
  },
  plugins: [],
};
