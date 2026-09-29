import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { RELOAD_PARAM } from "./components/RouteErrorBoundary.jsx";
import ThemeProvider from "./theme/ThemeProvider.jsx";
import "./index.css";
// Loaded up front rather than with the lazy CaseStudyPage chunk: prerendered
// case studies paint before that chunk arrives, and need their styles then.
// After index.css, so the cascade order matches what the chunk used to give.
import "./styles/case-study.css";

const app = (
  <React.StrictMode>
    <ErrorBoundary
      fallback={
        <div className="grid min-h-screen place-items-center bg-surface px-6 text-center">
          <div>
            <h1 className="font-display text-2xl font-semibold text-content">
              Something went wrong
            </h1>
            <p className="mt-2 text-sm text-content-dim">
              Please refresh the page. If it keeps happening, email us at hello@axiomra.com.
            </p>
          </div>
        </div>
      }
      onError={(error) => console.error("Unhandled UI error:", error)}
    >
      <HelmetProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

// Drop the cache-busting param a chunk-failure reload added, before the router
// reads the URL, so it never shows up in links, analytics or canonicals.
const url = new URL(window.location.href);
if (url.searchParams.has(RELOAD_PARAM)) {
  url.searchParams.delete(RELOAD_PARAM);
  window.history.replaceState(window.history.state, "", url);
}

// Prerendered pages (scripts/prerender.mjs) arrive with the markup already in
// #root; the empty SPA shell (spa.html, 404.html, dev) does not.
const root = document.getElementById("root");
if (root.hasChildNodes()) ReactDOM.hydrateRoot(root, app);
else ReactDOM.createRoot(root).render(app);
