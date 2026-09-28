// Every public route, read from the built sitemap so the list never drifts
// from the router. Paths only; the origin is whatever server we test against.
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../dist");

export function routes() {
  const xml = readFileSync(path.join(dist, "sitemap.xml"), "utf8");
  return [...xml.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map((m) => m[1] || "/");
}
