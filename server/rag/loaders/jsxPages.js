/**
 * Visible copy written directly in page and section components: headings,
 * paragraphs, list items, and the inline data arrays some sections keep at
 * the top of the file. Most pages render client/src/data, so this mostly adds
 * the homepage sections and the headings around the data.
 */
import {
  humanize,
  keepValue,
  normalize,
  renderNode,
  stringOf,
  tidy,
  topLevelDeclarations,
} from "./ast.js";

const HEADING_TAGS = new Set(["h1", "h2", "h3", "h4", "h5", "h6"]);
// Elements whose full text is one block of copy.
const BLOCK_TAGS = new Set([
  "p",
  "li",
  "blockquote",
  "figcaption",
  "dt",
  "dd",
  "td",
  "th",
  "caption",
  "summary",
]);
// Interactive or chrome elements: their text is a label, not content.
const SKIP_TAGS = new Set([
  "button",
  "a",
  "Link",
  "NavLink",
  "label",
  "option",
  "select",
  "input",
  "textarea",
  "svg",
  "script",
  "style",
  "form",
]);
// Props that carry copy on custom components (<SectionHeading title=… />).
const HEADING_PROPS = new Set(["title", "heading", "titleLead", "titleAccent", "headline"]);
const TEXT_PROPS = new Set([
  "description",
  "subtitle",
  "body",
  "text",
  "eyebrow",
  "intro",
  "summary",
  "caption",
  "quote",
]);

const tagName = (el) => {
  const n = el.openingElement?.name;
  if (!n) return null;
  if (n.type === "JSXIdentifier") return n.name;
  if (n.type === "JSXMemberExpression") return n.property.name;
  return null;
};

// Screen-reader-only duplicates would double the text.
const isScreenReaderOnly = (el) => {
  const cls = el.openingElement.attributes.find((a) => a.name?.name === "className");
  return Boolean(cls && /\bsr-only\b/.test(stringOf(cls.value) ?? ""));
};

/** Concatenated visible text of a JSX subtree. */
function textOf(node) {
  if (!node) return "";
  switch (node.type) {
    case "JSXText":
      return node.value;
    case "JSXExpressionContainer": {
      const s = stringOf(node.expression);
      return s ?? " ";
    }
    case "JSXElement": {
      const tag = tagName(node);
      if (tag === "br") return " ";
      if (SKIP_TAGS.has(tag) || isScreenReaderOnly(node)) return " ";
      return node.children.map(textOf).join("");
    }
    case "JSXFragment":
      return node.children.map(textOf).join("");
    default:
      return "";
  }
}

function walk(node, ctx, lines) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    for (const n of node) walk(n, ctx, lines);
    return;
  }
  if (node.type === "JSXElement") {
    const tag = tagName(node);
    if (SKIP_TAGS.has(tag) || isScreenReaderOnly(node)) return;
    for (const attr of node.openingElement.attributes) {
      if (attr.type !== "JSXAttribute") continue;
      const name = attr.name?.name;
      const value =
        attr.value?.type === "JSXExpressionContainer"
          ? stringOf(attr.value.expression)
          : stringOf(attr.value);
      if (!value) continue;
      if (HEADING_PROPS.has(name) && normalize(value).length >= 3)
        lines.push("", `### ${normalize(value)}`);
      else if (TEXT_PROPS.has(name)) {
        const v = keepValue(value, ctx);
        if (v) lines.push("", v);
      }
    }
    if (HEADING_TAGS.has(tag)) {
      const t = normalize(textOf(node));
      if (t.length >= 3 && /[a-z]/i.test(t)) lines.push("", `### ${t}`);
      return;
    }
    if (BLOCK_TAGS.has(tag)) {
      const v = keepValue(textOf(node), ctx);
      if (v) lines.push("", tag === "li" ? `- ${v}` : v);
      return;
    }
    for (const c of node.children) walk(c, ctx, lines);
    // Attribute expressions can hold JSX too (render props, conditional nodes).
    for (const attr of node.openingElement.attributes) walk(attr.value, ctx, lines);
    return;
  }
  if (node.type === "JSXText") {
    const v = keepValue(node.value, ctx);
    if (v) lines.push("", v);
    return;
  }
  for (const k of Object.keys(node)) {
    if (k === "loc" || k === "start" || k === "end" || k === "extra" || k.endsWith("Comments"))
      continue;
    const v = node[k];
    if (v && typeof v === "object") walk(v, ctx, lines);
  }
}

/** One document for a component file; null when it has no copy. */
export function jsxDocument({ source, title, component }, ast, ctx) {
  const lines = [];
  for (const { name, node } of topLevelDeclarations(ast)) {
    const rendered = renderNode(node, ctx, 3, name);
    if (rendered.some((l) => l.trim())) lines.push("", `## ${humanize(name)}`, ...rendered);
  }
  // JSX lives in function bodies; skip the top-level data already rendered.
  for (const stmt of ast.program.body) {
    if (stmt.type === "VariableDeclaration" || stmt.type === "ImportDeclaration") {
      if (stmt.type === "VariableDeclaration") {
        for (const d of stmt.declarations) {
          if (d.init && d.init.type !== "ObjectExpression" && d.init.type !== "ArrayExpression") {
            walk(d.init, ctx, lines);
          }
        }
      }
      continue;
    }
    walk(stmt, ctx, lines);
  }
  // Headings with nothing under them are layout, not content.
  const text = tidy(lines.filter((l, i, all) => !(l.startsWith("#") && isEmptyHeading(all, i))));
  if (!text.replace(/^#+ .*$/gm, "").trim()) return null;
  return { source, title, section: humanize(component.replace(/\.jsx$/, "")), text };
}

function isEmptyHeading(lines, i) {
  for (let j = i + 1; j < lines.length; j += 1) {
    const l = lines[j].trim();
    if (!l) continue;
    return l.startsWith("#") && l.match(/^#+/)[0].length <= lines[i].match(/^#+/)[0].length;
  }
  return true;
}
