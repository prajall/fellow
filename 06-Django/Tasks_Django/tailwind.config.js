// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./templates/**/*.html", // Or wherever your Django templates are
    "./**/templates/**/*.html", // For templates within apps
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
