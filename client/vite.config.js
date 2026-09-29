import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import compression from "vite-plugin-compression";

export default defineConfig(({ command, mode, isSsrBuild }) => {
  // VITE_API_URL is inlined at build time, so a build without it would ship a
  // contact form that posts to nowhere. Fail the build instead. The dev server
  // alone gets the local API as a default.
  const { VITE_API_URL } = loadEnv(mode, process.cwd(), "VITE_");
  if (!VITE_API_URL) {
    if (command === "build") {
      throw new Error(
        "VITE_API_URL is not set. Set it to the API origin, e.g. VITE_API_URL=https://api.example.com npm run build"
      );
    }
    process.env.VITE_API_URL = "http://localhost:5000";
  }

  return {
    plugins: [
      react(),
      // Pre-compressed copies next to each asset, for hosts that serve them.
      compression({ algorithm: "gzip" }),
      compression({ algorithm: "brotliCompress", ext: ".br" }),
      // `ANALYZE=1 npm run build` writes a bundle treemap to stats.html,
      // outside dist so it is never deployed.
      process.env.ANALYZE &&
        visualizer({ filename: "stats.html", gzipSize: true, brotliSize: true }),
    ],
    server: { port: 5173 },
    // The prerender bundles its dependencies: several (react-helmet-async
    // among them) ship CommonJS that Node cannot import by name.
    ssr: { noExternal: true },
    test: {
      environment: "jsdom",
      setupFiles: ["./src/test/setup.js"],
      include: ["src/**/*.test.{js,jsx}"],
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    build: {
      // dist/.vite/manifest.json maps each page to its chunks, for the
      // prerender's modulepreload links. The prerender deletes it afterwards.
      manifest: !isSsrBuild,
      // three.js alone clears the default 500 kB warning, and it is already
      // isolated in its own lazily-loaded chunk.
      chunkSizeWarningLimit: 900,
      rollupOptions: {
        output: {
          // The prerender's server bundle (scripts/prerender.mjs) needs no
          // cache-friendly chunking.
          manualChunks: isSsrBuild
            ? undefined
            : {
                // Rarely changes, so it stays cached across deploys.
                "react-vendor": ["react", "react-dom", "react-router-dom"],
                // Kept out of the entry chunk so a copy tweak does not invalidate it.
                "motion-vendor": ["framer-motion"],
                // Separate from framer-motion: only industry, portfolio and NLP
                // pages use GSAP, and grouping the two made every home-page visit
                // preload it.
                gsap: ["gsap", "gsap/ScrollTrigger"],
              },
        },
      },
    },
  };
});
