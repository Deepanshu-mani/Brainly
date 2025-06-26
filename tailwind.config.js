export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            gray: {
                100: "#eeeeef",
                200: "#e6e0ed",
                600: "#95989c"
            },
           purple: {
                200: "#d9ddee",
                500: "#9492db",
               600: "#5D2EF9"
            }
        }
    },
  },
  plugins: [],
}