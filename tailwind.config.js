export default {
  darkMode: 'class',
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
            },
            // Dark theme colors
            dark: {
              background: "#0d0d0d",
              surface: "#161616",
              "surface-alt": "#1f1f1f",
              border: "#2a2a2a",
              primary: "#6366f1",
              "primary-hover": "#818cf8",
              accent: "#06b6d4",
              "accent-hover": "#22d3ee",
              text: "#e5e5e5",
              "text-muted": "#a3a3a3",
              success: "#22c55e",
              error: "#ef4444"
            }
        }
    },
  },
  plugins: [],
}