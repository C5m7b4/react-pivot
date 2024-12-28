/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        appear: {
          "0%": {
            opacity: "0",
            display: "none",
          },
          "100%": {
            opacity: "1",
            display: "block",
          },
        },
        dissapear: {
          "0%": {
            opacity: "1",
            display: "block",
          },
          "100%": {
            opacity: "0",
            display: "none",
          },
        },
        slideOutRight: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(95%)",
          },
        },
        sliedInFromRight: {
          "0%": {
            transform: "translateX(95%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
      },
      animation: {
        appear: "appear .3s ease-in-out forwards",
        dissapear: "dissapear .3s ease-in-out forwards",
        slideOutRight: "slideOutRight .3s ease-in-out forwards",
        slideInFromRight: "sliedInFromRight .3s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
