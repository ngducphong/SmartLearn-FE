/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        rikkei: "#BC2228",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
