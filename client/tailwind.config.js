/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB", // blue
        accent: "#22C55E",  // green
        dark: "#0F172A",
        light: "#F8FAFC",
      },

      boxShadow: {
    premium: "0 10px 40px rgba(37,99,235,0.25)",
  },

      animation: {
        scroll: "scroll 25s linear infinite",
        gradientMove: 'gradientMove 4s linear infinite',
      },

      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        gradientMove: {
      '0%': { backgroundPosition: '0% 50%' },
      '100%': { backgroundPosition: '100% 50%' },
    },
      },
    },
  },
  plugins: [],
};