module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat"],
      },
      keyframes: {
        "balon-small": {
          "0%": { opacity: "0", top: "150px" },
          "75%": { opacity: "1", top: "50px" },
          "100%": { opacity: "0", top: "0px" },
        },
        "balon-medium": {
          "0%": { opacity: "0", top: "200px" },
          "75%": { opacity: "1", top: "50px" },
          "100%": { opacity: "0", top: "0px" },
        },
        "balon-lg": {
          "0%": { opacity: "0", top: "93%" },
          "75%": { opacity: "1", top: "66" },
          "100%": { opacity: "0", top: "70%" },
        },
      },
    },
    container: {
      padding: "2rem",
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
