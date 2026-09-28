/** AXIOMRA Tailwind config Colours here are SEMANTIC ROLES, not hues. */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: token("surface"),
          subtle: token("surface-subtle"),
          card: token("surface-card"),
          inset: token("surface-inset"),
        },
        content: {
          DEFAULT: token("content"),
          dim: token("content-dim"),
          faint: token("content-faint"),
        },
        line: {
          DEFAULT: token("line"),
          strong: token("line-strong"),
        },
        brand: {
          DEFAULT: token("brand"),
          strong: token("brand-strong"),
        },
        accent: {
          DEFAULT: token("accent"),
          vivid: token("accent-vivid"),
        },
        inverse: {
          DEFAULT: token("inverse"),
          soft: token("inverse-soft"),
          card: token("inverse-card"),
          fg: token("on-inverse"),
        },
        gold: token("gold"),
        danger: token("danger"),
        success: token("success"),
      },
      fontFamily: {
        display: ["'Clash Grotesk'", "'Clash Grotesk Fallback'", "'Space Grotesk'", "sans-serif"],
        body: ["'Satoshi'", "'Satoshi Fallback'", "'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "'JetBrains Mono Fallback'", "monospace"],
      },
      borderRadius: { xl2: "1.25rem" },
      maxWidth: {
        "4xl": "64rem",
        "5xl": "72rem",
        "6xl": "84rem",
        "7xl": "96rem",
        "8xl": "110rem",
      },
      boxShadow: {
        glow: "0 0 70px -15px rgba(120,139,227,0.55)",
        card: "0 10px 40px -15px rgba(10,20,40,0.15)",
      },
      backgroundImage: {
        // Brand gradients are fixed by identity, they do not flip per theme.
        "cta-gradient": "linear-gradient(120deg, #14D8C4 0%, #788BE3 55%, #777ACF 100%)",
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "marquee-rev": "marquee-rev 34s linear infinite",
        float: "float 7s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-rev": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
      },
    },
  },
  plugins: [],
};
