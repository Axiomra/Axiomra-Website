/**
 * Shared token sets for the custom form controls (PhoneField, SelectField).
 *
 * "dark" is for controls sitting on an always-dark card (the homepage VIP
 * intake), "light" for controls on the normal page surface (the contact page).
 * Keeping them here stops the two components from drifting apart visually.
 */
export const FIELD_VARIANTS = {
  dark: {
    shell:
      "border-line-strong bg-inverse-soft focus-within:border-gold/70 focus-within:ring-4 focus-within:ring-gold/15",
    text: "text-inverse-fg",
    placeholder: "placeholder:text-inverse-fg/35",
    divider: "bg-inverse-fg/15",
    accent: "text-gold",
    trigger: "hover:bg-inverse-fg/5",
    panel: "border-line-strong bg-inverse-card shadow-[0_24px_60px_-20px_rgba(0,0,0,0.75)]",
    search: "border-line-strong bg-inverse-soft text-inverse-fg placeholder:text-inverse-fg/35",
    option: "text-inverse-fg/85 hover:bg-inverse-fg/10",
    optionActive: "bg-gold/15 text-inverse-fg",
    muted: "text-inverse-fg/45",
  },
  light: {
    shell:
      "border-line bg-surface focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/15",
    text: "text-content",
    placeholder: "placeholder:text-content-faint/70",
    divider: "bg-line",
    accent: "text-accent",
    trigger: "hover:bg-surface-inset",
    panel: "border-line bg-surface-card shadow-[0_24px_60px_-20px_rgba(10,20,40,0.28)]",
    search: "border-line bg-surface-inset text-content placeholder:text-content-faint/70",
    option: "text-content-dim hover:bg-surface-inset",
    optionActive: "bg-accent/10 text-content",
    muted: "text-content-faint",
  },
  // Frosted fields that sit on top of an animated dark background (the contact
  // page's glassmorphism form). The inputs themselves stay crisp white so they
  // read clearly against the blurred colour behind the card.
  glass: {
    shell:
      "border-white/60 bg-white/95 focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/25",
    text: "text-content",
    placeholder: "placeholder:text-content-faint/60",
    divider: "bg-line",
    accent: "text-accent",
    trigger: "hover:bg-surface-inset",
    panel: "border-line bg-surface-card shadow-[0_24px_60px_-20px_rgba(10,20,40,0.35)]",
    search: "border-line bg-surface-inset text-content placeholder:text-content-faint/60",
    option: "text-content-dim hover:bg-surface-inset",
    optionActive: "bg-accent/10 text-content",
    muted: "text-content-faint",
  },
};

export const variantOf = (name) => FIELD_VARIANTS[name] ?? FIELD_VARIANTS.light;
