/**
 * Every public content source the chatbot may quote, by source type.
 * Internal docs (docs/, PLAN.md, SECURITY-DEFERRED.md, …) are deliberately
 * not listed: anything loaded here can be surfaced to any visitor.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { countStrings, makeDupes, parseModule, setCompanyStats } from "./ast.js";
import { dataFileDocument } from "./dataFiles.js";
import { caseStudyDocuments } from "./caseStudies.js";
import { jsxDocument } from "./jsxPages.js";
import { costEstimateDocuments } from "./costEstimate.js";
import { blogDocuments, companyDocuments } from "./markdown.js";
import {
  CLIENT_SRC,
  COMPONENT_DIR_ROUTES,
  DATA_FILE_ROUTES,
  HOME_COMPONENTS,
  PAGE_ROUTES,
  titleFor,
} from "./routes.js";

export const SOURCE_TYPES = ["data", "case-studies", "jsx", "cost", "company", "blog"];

// Decoration and chrome, not copy.
const SKIP_COMPONENT = /(Canvas|Motif|Backdrop|Icon|Progress|\.test)\.jsx$|\.test\.jsx$/;

const listJsx = async (dir) => {
  try {
    return (await fs.readdir(dir))
      .filter((f) => f.endsWith(".jsx") && !SKIP_COMPONENT.test(f))
      .sort();
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
};

/** [{ file, source, title, component }] for every component with page copy. */
export async function jsxFiles(root = CLIENT_SRC) {
  const out = [];
  const add = (file, source) =>
    out.push({ file, source, title: titleFor(source), component: path.basename(file) });

  for (const f of await listJsx(path.join(root, "sections")))
    add(path.join(root, "sections", f), "/");
  for (const f of HOME_COMPONENTS) add(path.join(root, "components", f), "/");
  for (const f of await listJsx(path.join(root, "pages"))) {
    if (PAGE_ROUTES[f]) add(path.join(root, "pages", f), PAGE_ROUTES[f]);
  }
  for (const [dir, route] of Object.entries(COMPONENT_DIR_ROUTES)) {
    const base = path.join(root, "components", dir);
    for (const f of await listJsx(base)) add(path.join(base, f), route);
    if (dir === "industries") {
      const subdirs = (await fs.readdir(base, { withFileTypes: true })).filter((e) =>
        e.isDirectory()
      );
      for (const sub of subdirs.map((e) => e.name).sort()) {
        for (const f of await listJsx(path.join(base, sub)))
          add(path.join(base, sub, f), `/industries/${sub}`);
      }
    }
  }
  return out;
}

/**
 * Parse every client module once. Duplicate counting always spans the whole
 * corpus, so `--sources jsx` filters exactly like a full run.
 */
async function clientCorpus(root = CLIENT_SRC) {
  const dataDir = path.join(root, "data");
  const dataNames = Object.keys(DATA_FILE_ROUTES).concat("caseStudiesData.js").sort();
  const data = [];
  for (const name of dataNames) {
    const code = await fs.readFile(path.join(dataDir, name), "utf8");
    data.push({ name, ast: parseModule(code) });
  }
  const jsx = [];
  for (const entry of await jsxFiles(root)) {
    jsx.push({ ...entry, ast: parseModule(await fs.readFile(entry.file, "utf8")) });
  }
  const dupes = makeDupes(countStrings([...data.map((d) => d.ast), ...jsx.map((j) => j.ast)]));
  return { data, jsx, ctx: { dupes } };
}

/**
 * loadDocuments({ sources, BlogPost }) -> [{ sourceType, source, title, section, text }]
 * `BlogPost` is the Mongoose model; required only when "blog" is selected.
 */
/** The site's company-wide figures (projects, experts, …), plain data with no imports. */
export async function loadCompanyStats(root = CLIENT_SRC) {
  const m = await import(pathToFileURL(path.join(root, "data/companyStats.js")).href);
  return m.companyStats;
}

export async function loadDocuments({ sources = SOURCE_TYPES, BlogPost, root = CLIENT_SRC } = {}) {
  const want = new Set(sources);
  const stats = await loadCompanyStats(root);
  setCompanyStats(stats);
  const docs = [];
  const tag = (sourceType, list) => list.map((d) => ({ sourceType, ...d }));

  if (want.has("data") || want.has("case-studies") || want.has("jsx")) {
    const { data, jsx, ctx } = await clientCorpus(root);
    // Same order in every run: "keep the first copy" must pick the same file.
    for (const { name, ast } of data) {
      if (name === "caseStudiesData.js") {
        const found = caseStudyDocuments(ast, ctx);
        if (want.has("case-studies")) docs.push(...tag("case-studies", found));
      } else {
        const doc = dataFileDocument(name, ast, ctx);
        if (doc && want.has("data")) docs.push(...tag("data", [doc]));
      }
    }
    for (const entry of jsx) {
      const doc = jsxDocument(entry, entry.ast, ctx);
      if (doc && want.has("jsx")) docs.push(...tag("jsx", [doc]));
    }
  }
  if (want.has("cost")) docs.push(...tag("cost", await costEstimateDocuments()));
  if (want.has("company")) docs.push(...tag("company", await companyDocuments(undefined, stats)));
  if (want.has("blog")) {
    if (!BlogPost) throw new Error("The blog source needs the BlogPost model.");
    docs.push(...tag("blog", await blogDocuments(BlogPost)));
  }
  return docs;
}
