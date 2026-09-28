/**
 * Server entry for the build-time prerender (scripts/prerender.mjs). Renders
 * one URL to HTML plus the head tags react-helmet-async collected for it and
 * the source files of the lazy pages it rendered.
 * Nothing here ships to the browser.
 */
import { renderToPipeableStream } from "react-dom/server";
import { Writable } from "node:stream";
import { HelmetProvider } from "react-helmet-async";
import { StaticRouter } from "react-router-dom/server";
import { AppRoutes } from "./App.jsx";
import ThemeProvider from "./theme/ThemeProvider.jsx";
import {
  HeroToneContext,
  PrerenderContext,
  RenderedPagesContext,
} from "./seo/prerender-context.js";

export function render(url, heroTone = null) {
  const helmetContext = {};
  const pages = new Set();
  return new Promise((resolve, reject) => {
    let html = "";
    const sink = new Writable({
      write(chunk, _enc, cb) {
        html += chunk;
        cb();
      },
      final(cb) {
        resolve({ html, helmet: helmetContext.helmet, pages: [...pages] });
        cb();
      },
    });
    const { pipe } = renderToPipeableStream(
      <PrerenderContext.Provider value={true}>
        <HeroToneContext.Provider value={heroTone}>
          <RenderedPagesContext.Provider value={pages}>
            <HelmetProvider context={helmetContext}>
              <ThemeProvider>
                <StaticRouter location={url}>
                  <AppRoutes />
                </StaticRouter>
              </ThemeProvider>
            </HelmetProvider>
          </RenderedPagesContext.Provider>
        </HeroToneContext.Provider>
      </PrerenderContext.Provider>,
      {
        // Wait for every lazy route and section, so the page's real content is
        // in the HTML rather than a Suspense fallback.
        onAllReady: () => pipe(sink),
        onShellError: reject,
        onError: reject,
      }
    );
  });
}
