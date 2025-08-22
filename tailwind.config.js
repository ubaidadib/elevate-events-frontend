/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Palette
        charcoal: "#1C1C1C",
        onyx: "#0A0A0A",
        silver: "#C0C0C0",
        leather: "#7A4C2E",

        // Luxury Gold Spectrum
        gold: "#D4AF37",
        "gold-light": "#E6C65C",
        "gold-dark": "#B08C2E",

        // Secondary Palette
        burgundy: "#6E2C2C",
        emerald: "#2E5D3A",

        // Accent Palette
        "purple-glow": "#5A3F82",
        beige: "#D9C9A8",
      },

      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ['"Playfair Display"', "Georgia", "serif"],
        display: ['"Cinzel Decorative"', "serif"], // for logo / royal headings
      },

      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #D4AF37, #E6C65C)",
        "deep-gold-gradient": "linear-gradient(135deg, #B08C2E, #E6C65C)",
        "burgundy-gradient": "linear-gradient(135deg, #6E2C2C, #9B4D4D)",
        "hero-pattern":
          "linear-gradient(to bottom, rgba(10,10,10,0.85), rgba(10,10,10,1)), url('/images/gallery/venue1.jpeg')",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        glow: {
          "0%, 100%": { textShadow: "0 0 6px rgba(212,175,55,0.8)" },
          "50%": { textShadow: "0 0 14px rgba(230,198,92,1)" },
        },
      },

      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        shimmer: "shimmer 2s infinite linear",
        glow: "glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
