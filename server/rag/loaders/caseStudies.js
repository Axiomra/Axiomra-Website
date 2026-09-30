/**
 * client/src/data/caseStudiesData.js -> one document per study. "blueprint"
 * studies are representative designs, not client work; the title says so,
 * and the title prefixes every chunk, so the assistant never presents a
 * design as a delivered project or a target as a result.
 */
import { humanize, normalize, renderNode, stringOf, tidy, topLevelDeclarations } from "./ast.js";

const SKIP_SECTIONS = new Set([
  "slug",
  "type",
  "accent",
  "ogImage",
  "seoTitle",
  "seoDescription",
  "labels",
  "hero",
  "title",
]);

const keyOf = (p) => (p.computed ? null : (p.key?.name ?? p.key?.value ?? null));
const prop = (obj, key) => obj.properties.find((p) => keyOf(p) === key)?.value;

export function caseStudyDocuments(ast, ctx) {
  const decl = topLevelDeclarations(ast).find((d) => d.name === "caseStudies");
  if (!decl || decl.node.type !== "ObjectExpression") return [];
  const docs = [];
  for (const entry of decl.node.properties) {
    if (entry.value?.type !== "ObjectExpression") continue;
    const study = entry.value;
    const slug = stringOf(prop(study, "slug")) ?? keyOf(entry);
    const name = stringOf(prop(study, "title")) ?? slug;
    const blueprint = stringOf(prop(study, "type")) === "blueprint";
    const title = blueprint
      ? `Case study (blueprint: a representative solution design, not a client project; figures are goals): ${name}`
      : `Case study (client project): ${name}`;

    const lines = [];
    for (const p of study.properties) {
      const key = keyOf(p);
      if (!key || SKIP_SECTIONS.has(key)) continue;
      const s = stringOf(p.value);
      if (s !== null) {
        if (normalize(s).length >= 20) lines.push("", `# ${humanize(key)}`, normalize(s));
      } else if (p.value.type === "ObjectExpression" || p.value.type === "ArrayExpression") {
        const rendered = renderNode(p.value, ctx, 2);
        if (rendered.some((l) => l.trim())) lines.push("", `# ${humanize(key)}`, ...rendered);
      }
    }
    const text = tidy(lines);
    if (text) docs.push({ source: `/case-studies/${slug}`, title, section: "", text });
  }
  return docs;
}
