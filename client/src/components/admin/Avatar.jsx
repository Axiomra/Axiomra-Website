/**
 * Initials avatar.
 *
 * Generated locally rather than pulled from ui-avatars or Gravatar: those send
 * the lead's name or an email hash to a third party on every render, which is
 * a quiet PII leak from a page that exists to hold PII. The hue is derived
 * from the name, so the same person keeps the same colour.
 */

// Sampled around the brand's periwinkle/teal/gold triad rather than the full
// wheel, so a wall of avatars still reads as one product.
const HUES = [172, 186, 214, 232, 248, 262, 286, 38, 22];

function initialsOf(name, fallback) {
  const source = String(name || fallback || "").trim();
  if (!source) return "?";
  const words = source.split(/[\s@._-]+/).filter(Boolean);
  if (!words.length) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

function hueOf(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  return HUES[Math.abs(hash) % HUES.length];
}

const SIZES = {
  sm: "h-8 w-8 text-[11px]",
  md: "h-11 w-11 text-sm",
  lg: "h-16 w-16 text-xl",
};

export default function Avatar({ name, email, size = "md", className = "" }) {
  const initials = initialsOf(name, email);
  const hue = hueOf(String(name || email || "?").toLowerCase());

  return (
    <span
      aria-hidden="true"
      className={`inline-grid shrink-0 place-items-center rounded-full font-display font-semibold tracking-tight ring-1 ring-inset ring-white/25 ${SIZES[size]} ${className}`}
      style={{
        background: `linear-gradient(135deg, hsl(${hue} 62% 52%), hsl(${(hue + 26) % 360} 66% 42%))`,
        color: "#fff",
      }}
    >
      {initials}
    </span>
  );
}
