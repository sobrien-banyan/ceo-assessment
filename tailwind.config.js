/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{html,js,vue,ts}",
    "./components/**/*.{html,js,vue,ts}",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./layouts/**/*.vue",
  ],
  theme: {
    extend: {
      colors: {
        "ceo-black": "#161616",
        "ceo-white": "#dcdcdc",
        "ceo-grey": "#d8dad3",
        "ceo-green": "#2da301",
        "ceo-lightGreen": "#41ef00",
        "ceo-tan": "#f4ecd3",
        "ceo-blue": "#027bae",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
