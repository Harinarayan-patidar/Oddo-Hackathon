/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      "edu-sa": ["Edu SA Beginner", "cursive"],
      mono: ["Roboto Mono", "monospace"],
    },
    extend: {
      colors: {
        // Custom Shades
        richblack: {
          5: "#F5F5F5",
          25: "#D9D9D9",
          50: "#B3B3B3",
          100: "#808080",
          200: "#4D4D4D",
          300: "#262626",
          400: "#1A1A1A",
          500: "#0A0A0A",
          600: "#080808",
          700: "#060606",
          800: "#030303",
          900: "#000000",
        },

        customblue: {
          5: "#EBF8FF",
          25: "#BEE3F8",
          50: "#7ED2F6",
          100: "#4F9AE3",
          200: "#2C80D3",
          300: "#0064B1",
          400: "#00559A",
          500: "#004082",
          600: "#00316B",
          700: "#002256",
          800: "#001144",
          900: "#000A29",
        },

        richblue: {
          5: "#E1F1FF",
          25: "#B3D1FF",
          50: "#80B2FF",
          100: "#4D93FF",
          200: "#1A74FF",
          300: "#0061E0",
          400: "#0049B3",
          500: "#003366",
          600: "#00274D",
          700: "#001A40",
          800: "#000F33",
          900: "#000726",
        },

        // Simple Custom Colors
        caribbeangreen: "#00B5B8",
        brown: "#A52A2A",
        deepblue: "#003366",
        sunsetorange: "#FF4500",
        lightcyan: "#E0FFFF",
        warmyellow: "#FFD700",
        pastelpurple: "#C9A0DC",
        mintgreen: "#98FF98",
        coral: "#FF7F50",
        teal: "#008080",
        amber: "#FFC107",
        limegreen: "#32CD32",
        hotpink: "#FF69B4",
        skyblue: "#87CEEB",
        olive: "#808000",
      },
    },
  },
  plugins: [],
};
