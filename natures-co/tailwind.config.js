import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        offWhite: "#F8F8F8",
        1: "#072D44",
        2: "#f4f6f5",
        3: "#5790AB",
        4: "#9CCDDB",
        5: "#D0D7E1",
        6: "#064469",
      },
    },
  },
  plugins: [daisyui],
};
