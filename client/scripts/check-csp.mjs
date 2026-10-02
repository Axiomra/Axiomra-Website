/**
 * Post-build guard for the Content-Security-Policy in vercel.json. Both
 * failure modes it catches would otherwise only show up as console errors on
 * the live site:
 *
 *  1. An inline <script> in dist/index.html (the theme boot script) whose hash
 *     is not in script-src. Editing that script without updating the hash
 *     would bring back the flash of the wrong theme.
 *  2. A VITE_API_URL origin missing from connect-src, which would block the
 *     contact form and the admin panel.
 *  3. A Content-Security-Policy in public/_headers (Cloudflare Pages) that has
 *     drifted from the one in vercel.json.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { loadEnv } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const config = JSON.parse(readFileSync(path.join(root, "vercel.json"), "utf8"));
const csp = config.headers
  .flatMap((h) => h.headers)
  .find((h) => h.key === "Content-Security-Policy")?.value;
if (!csp) {
  console.error("csp: no Content-Security-Policy header in vercel.json");
  process.exit(1);
}
const directive = (name) =>
  csp
    .split(";")
    .map((d) => d.trim().split(/\s+/))
    .find(([n]) => n === name)
    ?.slice(1) ?? [];

const problems = [];

// public/_headers carries the same headers for Cloudflare Pages. Its CSP must
// stay byte-identical to vercel.json's, or the two hosts enforce different
// policies and the checks below only cover one of them.
const headersFile = readFileSync(path.join(root, "public", "_headers"), "utf8");
const headersCsp = headersFile.match(/^\s*Content-Security-Policy:\s*(.*?)\s*$/m)?.[1];
if (!headersCsp) {
  problems.push("public/_headers has no Content-Security-Policy line");
} else if (headersCsp !== csp) {
  problems.push("public/_headers Content-Security-Policy differs from vercel.json");
}

const html = readFileSync(path.join(root, "dist", "index.html"), "utf8");
const scriptSrc = directive("script-src");
for (const [, body] of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
  const hash = `'sha256-${createHash("sha256").update(body).digest("base64")}'`;
  if (!scriptSrc.includes(hash)) {
    problems.push(`inline script in index.html is not allowed by script-src; add ${hash}`);
  }
}

const { VITE_API_URL } = loadEnv("production", root, "VITE_");
const api = URL.parse(VITE_API_URL ?? "");
if (!api) {
  problems.push(`VITE_API_URL is ${VITE_API_URL ? `not a URL: ${VITE_API_URL}` : "not set"}`);
} else {
  // A local API only makes sense for a local build, which vercel.json never
  // serves, so there is nothing to check.
  const localApi = ["localhost", "127.0.0.1", "[::1]"].includes(api.hostname);
  if (!localApi && !directive("connect-src").includes(api.origin)) {
    problems.push(`VITE_API_URL origin ${api.origin} is not in connect-src`);
  }
}

if (problems.length) {
  console.error("csp: vercel.json Content-Security-Policy is out of date:\n  " + problems.join("\n  "));
  process.exit(1);
}
console.log("csp: inline script hashes, API origin and public/_headers match vercel.json");
