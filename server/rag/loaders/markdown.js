/**
 * Markdown documents: content/company/**\/*.md and published blog posts.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { COMPANY_DIR, REPO_ROOT } from "./routes.js";

/** Strip front matter, HTML, images, link targets and code; keep headings and text. */
export function markdownToText(md) {
  return md
    .replace(/^---\n[\s\S]*?\n---\n/, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/(\*\*|__)(.+?)\1/g, "$2")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** First "# " heading, else the file name. The heading is removed from the body. */
export function splitTitle(text, fallback) {
  const m = /^#\s+(.+)$/m.exec(text);
  if (!m) return { title: fallback, body: text };
  return { title: m[1].trim(), body: text.replace(m[0], "").trim() };
}

async function walkMd(dir) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
  const out = [];
  for (const e of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walkMd(full)));
    else if (e.isFile() && /\.md$/i.test(e.name) && e.name.toLowerCase() !== "readme.md")
      out.push(full);
  }
  return out;
}

/**
 * Replace `{{companyStats.pocRange.min}}`-style tokens with the site's figures,
 * so company docs never restate a number the site keeps in companyStats.js.
 * An unknown key throws: a typo must not reach the index as literal braces.
 */
export function fillStats(md, stats) {
  return md.replace(/\{\{\s*companyStats\.([\w.]+)\s*\}\}/g, (token, keyPath) => {
    const value = keyPath.split(".").reduce((v, k) => (v == null ? v : v[k]), stats);
    if (typeof value !== "number" && typeof value !== "string") {
      throw new Error(`Unknown figure ${token}; see client/src/data/companyStats.js.`);
    }
    return String(value);
  });
}

export async function companyDocuments(dir = COMPANY_DIR, stats) {
  const docs = [];
  for (const file of await walkMd(dir)) {
    const rel = path.relative(REPO_ROOT, file).split(path.sep).join("/");
    const fallback = path.basename(file, path.extname(file)).replace(/[-_]+/g, " ");
    const { title, body } = splitTitle(
      markdownToText(fillStats(await fs.readFile(file, "utf8"), stats)),
      fallback
    );
    if (body) docs.push({ source: rel, title, section: "", text: body });
  }
  return docs;
}

/** Published posts only; a draft must never reach the public chat. */
export async function blogDocuments(BlogPost) {
  const posts = await BlogPost.find(
    { status: "published" },
    { title: 1, slug: 1, excerpt: 1, content: 1 }
  )
    .sort({ slug: 1 })
    .lean();
  return posts
    .map((p) => ({
      source: `/blogs/${p.slug}`,
      title: `Blog: ${p.title}`,
      section: "",
      text: markdownToText([p.excerpt, p.content].filter(Boolean).join("\n\n")),
    }))
    .filter((d) => d.text);
}
