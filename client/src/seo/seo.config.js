/**
 * Site-wide SEO defaults. Pages pass their own title/description to <Seo>;
 * anything they omit falls back to these values.
 */
export const SITE_NAME = "Axiomra";

// Canonical and og:url are built from this, never from window.location, so a
// preview deployment does not declare itself the canonical copy.
export const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://axiomra.co").replace(/\/$/, "");

export const DEFAULT_TITLE = "Axiomra: Result-Driven AI Development Company";
export const DEFAULT_DESCRIPTION =
  "Axiomra builds production-grade AI systems that automate operations and deliver measurable ROI for SMBs and enterprises.";

// No site-wide share image exists yet. Pages with their own image (case
// studies) pass it in; everything else ships without og:image.
export const DEFAULT_OG_IMAGE = null;

export const TWITTER_HANDLE = "@Axiomra_co";

/** Resolves a root-relative path or asset URL against SITE_URL. */
export function absoluteUrl(path) {
  if (!path) return null;
  return new URL(path, SITE_URL + "/").href;
}
