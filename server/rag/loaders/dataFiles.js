/**
 * client/src/data/*.js -> one document per page. Each top-level export
 * becomes a top-level heading, so a chunk's section starts from the page
 * block it came from ("Faqs", "Sub services").
 * caseStudiesData.js has its own loader (one page per study).
 */
import { humanize, renderNode, tidy, topLevelDeclarations } from "./ast.js";
import { DATA_FILE_ROUTES, titleFor } from "./routes.js";

// Exports that never reach a visitor as text, or only as a pointer elsewhere.
const SKIP_EXPORTS = /^([A-Z_]+|midCta|finalCta|blogs|heroVideo)$/;

/** The document for one data file, or null when it is not a page. */
export function dataFileDocument(file, ast, ctx) {
  const source = DATA_FILE_ROUTES[file];
  if (!source) return null;
  const lines = [];
  for (const { name, node } of topLevelDeclarations(ast)) {
    if (SKIP_EXPORTS.test(name)) continue;
    const rendered = renderNode(node, ctx, 2);
    if (rendered.some((l) => l.trim())) lines.push("", `# ${humanize(name)}`, ...rendered);
  }
  const text = tidy(lines);
  return text ? { source, title: titleFor(source), section: "", text } : null;
}
