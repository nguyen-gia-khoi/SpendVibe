/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [], content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        interBold: "InterBold",
        interRegular: "InterRegular",
      },
    },
  },
  plugins: [],
}

