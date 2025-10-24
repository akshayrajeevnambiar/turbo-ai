/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./src/**/*.{vue,svelte}", // Future-proofing
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#0A0A0A",
        charcoalDeep: "#0F0F0F",
        white: "#FFFFFF",
        emerald: "#1E40AF", // Changed to blue-700
        emeraldNeon: "#3B82F6", // Changed to blue-500 (bright blue)
        emeraldTint: "#1D4ED8", // Changed to blue-600
        navy: "#1E293B",
        midGray: "#78716C",
      },
      fontFamily: {
        heading: ["Söhne", "GT America", "Inter", "system-ui"],
        body: ["Inter", "IBM Plex Sans", "system-ui"],
      },
      fontSize: {
        base: "18px",
        key: "21px",
      },
      lineHeight: {
        relaxed: "1.7",
      },
      letterSpacing: {
        heading: "-0.02em",
      },
      maxWidth: {
        container: "1280px",
      },
      spacing: {
        gutter: "5vw",
        sectionDesktop: "120px",
        sectionMobile: "80px",
        header: "80px",
      },
      scrollMargin: {
        header: "80px",
      },
      transitionDuration: {
        DEFAULT: "275ms",
      },
      transitionTimingFunction: {
        DEFAULT: "ease-out",
      },
    },
  },
  plugins: [],
};
