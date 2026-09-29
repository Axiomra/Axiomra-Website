import { createContext } from "react";

/** True only while scripts/prerender.mjs renders a page at build time. */
export const PrerenderContext = createContext(false);

/**
 * Tone of the page's first `[data-nav-tone]` hero, found by a first prerender
 * pass, so the navbar can be drawn transparent over it as it will be once
 * mounted. null when the page has no such hero (or outside the prerender).
 */
export const HeroToneContext = createContext(null);

/**
 * During the prerender, a Set that collects the source path of every lazy page
 * rendered (e.g. "src/pages/AboutPage.jsx"), so the page's chunks can be
 * modulepreloaded from its HTML. null in the browser.
 */
export const RenderedPagesContext = createContext(null);
