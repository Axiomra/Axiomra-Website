import { Component } from "react";

export const RELOAD_PARAM = "_r";
const RELOAD_KEY = "axiomra:chunk-reload";
// A reload that happened longer ago than this was for an earlier deploy.
const RELOAD_WINDOW_MS = 30000;

// Chrome, Safari and Firefox word a failed dynamic import differently; Vite's
// preload helper adds its own for CSS.
const CHUNK_ERROR =
  /ChunkLoadError|Loading chunk|dynamically imported module|Importing a module script failed|Unable to preload CSS/i;

function isChunkError(error) {
  return CHUNK_ERROR.test(`${error?.name} ${error?.message}`);
}

function reloadFresh() {
  const url = new URL(window.location.href);
  url.searchParams.set(RELOAD_PARAM, Date.now().toString(36));
  window.location.replace(url);
}

/** True once per deploy: the first chunk failure reloads, a second one does not. */
function claimAutoReload() {
  try {
    const last = Number(sessionStorage.getItem(RELOAD_KEY));
    if (last && Date.now() - last < RELOAD_WINDOW_MS) return false;
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
    return true;
  } catch {
    // Without storage there is no way to stop a reload loop, so don't start one.
    return false;
  }
}

/**
 * Catches a failed route so the navbar and footer stay up. A page chunk that
 * 404s after a deploy (the old HTML points at hashes that no longer exist)
 * triggers one cache-busted reload to pick up the new HTML; anything else, or
 * a second failure, shows a fallback with a Reload button.
 */
export default class RouteErrorBoundary extends Component {
  state = { error: null, reloading: false };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error) {
    if (isChunkError(error) && claimAutoReload()) {
      this.setState({ reloading: true });
      reloadFresh();
      return;
    }
    console.error("Route failed to render:", error);
  }

  componentDidUpdate(prev) {
    // Navigating away from the broken route gives the next one a clean slate.
    if (prev.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null, reloading: false });
    }
  }

  render() {
    const { error, reloading } = this.state;
    if (!error) return this.props.children;
    if (reloading) return this.props.pending ?? null;
    return (
      <div
        role="alert"
        className="grid min-h-[70svh] place-items-center bg-surface px-6 pt-16 text-center"
      >
        <div>
          <h1 className="font-display text-2xl font-semibold text-content">
            This page didn&apos;t load
          </h1>
          <p className="mt-2 text-sm text-content-dim">
            {isChunkError(error)
              ? "The site was just updated. Reloading will fetch the latest version."
              : "Something went wrong. Reloading usually fixes it."}
          </p>
          <button
            type="button"
            onClick={reloadFresh}
            className="mt-6 rounded-full bg-gradient-to-r from-accent-vivid to-brand px-6 py-2.5 text-base font-medium text-inverse-fg transition-opacity hover:opacity-90 focus-ring"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }
}
