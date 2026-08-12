/**
 * AXIOMRA design tokens
 * Base palette supplied by client (coolors.co): 788BE3, 777ACF, D9E2EC
 * Extended with the logo's teal + the dark-navy / gold accents visible
 * in the tezeract.ai reference screenshots.
 */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A1428",   // hero / footer background
          soft: "#101B33",
          card: "#132140",
        },
        periwinkle: {
          DEFAULT: "#788BE3",   // primary brand accent (client palette)
          dark: "#777ACF",      // secondary / hover state
          light: "#A6B3EF",
        },
        mist: {
          DEFAULT: "#D9E2EC",   // light section tint (client palette)
          50: "#F5F8FC",
        },
        teal: {
          DEFAULT: "#14D8C4",   // logo icon teal
          dark: "#0FAE9F",
        },
        gold: {
          DEFAULT: "#FFB020",   // star ratings / highlight numbers
        },
        ink: {
          DEFAULT: "#0F1729",
          dim: "#5B6478",
          faint: "#8A93A6",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      borderRadius: { xl2: "1.25rem" },
      boxShadow: {
        glow: "0 0 70px -15px rgba(120,139,227,0.55)",
        card: "0 10px 40px -15px rgba(10,20,40,0.15)",
      },
      backgroundImage: {
        "hero-grid": "radial-gradient(circle at 50% 20%, rgba(120,139,227,0.25), transparent 60%)",
        "cta-gradient": "linear-gradient(120deg, #14D8C4 0%, #788BE3 55%, #777ACF 100%)",
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "marquee-rev": "marquee-rev 34s linear infinite",
        float: "float 7s ease-in-out infinite",
      },
      keyframes: {
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        "marquee-rev": { "0%": { transform: "translateX(-50%)" }, "100%": { transform: "translateX(0)" } },
        float: { "0%,100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-16px)" } },
      },
    },
  },
  plugins: [],
}
