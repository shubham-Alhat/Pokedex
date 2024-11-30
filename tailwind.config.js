/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        luckiestGuy: ["Luckiest Guy", "cursive"],
      },
      colors: {
        lightPink: "#FF69B4",
        yellow: "#FFD700",
        sunsetColor: "#FFA500",
      },
    },
  },
  plugins: [],
};
