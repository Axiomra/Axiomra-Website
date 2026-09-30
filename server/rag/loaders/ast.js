/**
 * Turns the client's JS data objects into Markdown-ish text without running
 * them (they import images, which Node cannot load).
 *
 * Objects become headings named by their title/question/name, string fields
 * become "Key: value" lines, and short string lists become one joined line.
 * Presentation values (ids, icons, class names, colours, image paths, CTA
 * labels) are dropped.
 */
import { parse } from "@babel/parser";

export const MIN_CHARS = 20;

export function parseModule(code) {
  return parse(code, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
    errorRecovery: true,
  });
}

// Keys whose values are never visitor-facing copy.
const SKIP_KEY =
  /^(id|key|slug|type|icon|image|img|images|src|srcset|sources|href|url|path|to|link|className|class|color|colour|accent|tone|variant|theme|ogImage|logo|video|poster|width|height|anchor|target|photo|avatar|credit|imageCredit|labels|layout|align|size|gradient|bg|background|pattern|shape|position|delay|duration|order|logoBaked|seoTitle|canvas)$/i;
const SKIP_KEY_SUFFIX =
  /(Image|Img|Alt|Href|Url|Path|Icon|Class|ClassName|Color|Colour|Src|Slug|Id|Logo|Video|Poster|Gradient|Tone|Variant|Canvas)$/;
const SKIP_KEY_PREFIX = /^(cta|button|btn|aria|data|og)/i;

// Fields that name the object they sit in; they become its heading.
const LABEL_KEYS = [
  "title",
  "question",
  "name",
  "heading",
  "label",
  "headline",
  "metric",
  "layer",
  "capability",
];

// Keys that only say "this is the text": the value stands on its own.
const PLAIN_KEYS = new Set(["body", "text", "paragraph", "paragraphs", "content", "copy"]);

export const isSkippedKey = (key) =>
  SKIP_KEY.test(key) || SKIP_KEY_SUFFIX.test(key) || SKIP_KEY_PREFIX.test(key) || key === "alt";

const URL_OR_PATH =
  /^(https?:|mailto:|tel:|www\.|\/|\.{1,2}\/|#\/)|^[\w.-]+\.(webp|png|jpe?g|svg|gif|mp4|webm|avif)$/i;
const HEX = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
const CLASS_LIKE = /^[a-z0-9:/[\]().#%!_-]+$/;

/** Values that are never copy, whatever their length. */
export function isNoise(value) {
  const v = value.trim();
  if (!v || !/[a-z]/i.test(v)) return true;
  if (URL_OR_PATH.test(v) || HEX.test(v)) return true;
  if (/^(rgb|hsl)a?\(/i.test(v)) return true;
  const tokens = v.split(/\s+/);
  // Tailwind-ish class lists: every token lower-case with no prose punctuation,
  // and most of them hyphenated or variant-prefixed.
  if (
    tokens.every((t) => CLASS_LIKE.test(t)) &&
    tokens.filter((t) => /[-:[]/.test(t)).length >= Math.ceil(tokens.length / 2)
  ) {
    return true;
  }
  return false;
}

export const normalize = (s) => s.replace(/\s+/g, " ").trim();

/** Humanize a camelCase / snake_case key: "subServices" -> "Sub services". */
export function humanize(key) {
  const words = String(key)
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim()
    .toLowerCase();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

const propKey = (p) => {
  if (p.type !== "ObjectProperty" || p.computed) return null;
  if (p.key.type === "Identifier") return p.key.name;
  if (p.key.type === "StringLiteral") return p.key.value;
  return null;
};

/** String value of a literal node, or null. Template literals only without ${}. */
// Figures from client/src/data/companyStats.js, so `${companyStats.experts}+`
// reads as "40+" in a chunk. Set by the loaders before parsing; null leaves
// such expressions unresolved.
let companyStats = null;
export function setCompanyStats(stats) {
  companyStats = stats;
}

/** Value of `companyStats.a` / `companyStats.a.b`, or null. */
export function statOf(node) {
  if (!companyStats) return null;
  const keys = [];
  let n = node;
  while (n?.type === "MemberExpression" && !n.computed && n.property.type === "Identifier") {
    keys.unshift(n.property.name);
    n = n.object;
  }
  if (n?.type !== "Identifier" || n.name !== "companyStats" || !keys.length) return null;
  const value = keys.reduce((v, k) => (v == null ? v : v[k]), companyStats);
  return typeof value === "number" || typeof value === "string" ? value : null;
}

export function stringOf(node) {
  if (!node) return null;
  if (node.type === "StringLiteral") return node.value;
  if (node.type === "TemplateLiteral") {
    const parts = node.expressions.map(statOf);
    if (parts.some((p) => p === null)) return null;
    return node.quasis
      .map((q, i) => q.value.cooked + (i < parts.length ? String(parts[i]) : ""))
      .join("");
  }
  const stat = statOf(node);
  return stat === null ? null : String(stat);
}

const numberOf = (node) => (node?.type === "NumericLiteral" ? node.value : statOf(node));

/** Every string in an AST subtree that the walker would consider, for duplicate counting. */
export function collectStrings(node, out = []) {
  if (!node || typeof node !== "object") return out;
  if (Array.isArray(node)) {
    for (const n of node) collectStrings(n, out);
    return out;
  }
  if (node.type === "ObjectProperty") {
    const key = propKey(node);
    if (key && isSkippedKey(key)) return out;
    collectStrings(node.value, out);
    return out;
  }
  const s = stringOf(node);
  if (s !== null) {
    out.push(normalize(s));
    return out;
  }
  if (node.type === "JSXText") {
    const t = normalize(node.value);
    if (t) out.push(t);
    return out;
  }
  for (const k of Object.keys(node)) {
    if (k === "loc" || k === "start" || k === "end" || k === "extra" || k.endsWith("Comments"))
      continue;
    const v = node[k];
    if (v && typeof v === "object") collectStrings(v, out);
  }
  return out;
}

/**
 * Filter shared by every loader. `dupes` decides repeated strings:
 *   dupes.drop(s)  -> true when s is boilerplate repeated across files
 */
export function keepValue(value, { dupes } = {}) {
  const v = normalize(value);
  if (v.length < MIN_CHARS || isNoise(v)) return null;
  if (dupes?.drop(v)) return null;
  return v;
}

function labelOf(obj) {
  const fields = Object.fromEntries(
    obj.properties.map((p) => [propKey(p), stringOf(p.value)]).filter(([k, v]) => k && v)
  );
  if (fields.titleLead || fields.titleAccent) {
    return {
      label: normalize([fields.titleLead, fields.titleAccent].filter(Boolean).join(" ")),
      keys: ["titleLead", "titleAccent", "title"],
    };
  }
  for (const k of LABEL_KEYS) {
    if (fields[k] && !isNoise(fields[k]) && fields[k].trim().length >= 3) {
      return { label: normalize(fields[k]), keys: [k] };
    }
  }
  return null;
}

const isTarget = (obj) =>
  obj.properties.some(
    (p) => propKey(p) === "target" && p.value.type === "BooleanLiteral" && p.value.value
  );

/** { label: "Projects Delivered", value: 500, suffix: "+" } -> "Projects Delivered: 500+". */
function statLine(obj) {
  const get = (k) => obj.properties.find((p) => propKey(p) === k)?.value;
  const valueNode = get("value") ?? get("stat") ?? get("number");
  const labelNode = get("label") ?? get("title") ?? get("metric");
  if (!valueNode || !labelNode) return null;
  const value = stringOf(valueNode) ?? numberOf(valueNode);
  const label = stringOf(labelNode);
  if (value === null || !label) return null;
  // Only a stat card when every other string field is short (no prose to lose).
  const hasProse = obj.properties.some((p) => {
    const s = stringOf(p.value);
    const k = propKey(p);
    return (
      s &&
      s.length >= MIN_CHARS &&
      !["label", "title", "metric", "value", "stat", "number"].includes(k)
    );
  });
  if (hasProse || String(value).length > 30) return null;
  const pre = stringOf(get("prefix")) ?? "";
  const suf = stringOf(get("suffix")) ?? "";
  return `${normalize(label)}: ${pre}${value}${suf}${isTarget(obj) ? " (target figure, not yet measured)" : ""}`;
}

/**
 * Render an object/array expression to Markdown lines.
 * `depth` is the heading level for nested objects (capped at 6).
 */
export function renderNode(node, ctx, depth, keyName) {
  const lines = [];

  if (node.type === "ArrayExpression") {
    const strings = node.elements.map(stringOf).filter((s) => s !== null);
    const objects = node.elements.filter((e) => e?.type === "ObjectExpression");

    if (strings.length && strings.length === node.elements.length) {
      const long = [];
      const short = [];
      for (const s of strings) {
        const n = normalize(s);
        // Bare lower-case words are identifiers (form field names, keys).
        if (isNoise(n) || n.length < 2 || /^[a-z0-9_]+$/.test(n)) continue;
        if (n.length >= MIN_CHARS) {
          if (!ctx.dupes?.drop(n)) long.push(n);
        } else short.push(n);
      }
      // Short list items (capabilities, tech names) read fine as one line.
      if (short.length >= 2) {
        const joined = `${keyName ? `${humanize(keyName)}: ` : ""}${short.join("; ")}`;
        if (joined.length >= MIN_CHARS && !ctx.dupes?.drop(normalize(short.join("; ")))) {
          lines.push(joined);
        }
      }
      if (long.length) {
        if (
          keyName &&
          long.length > 1 &&
          !["paragraphs", "items", "body", "text"].includes(keyName)
        ) {
          lines.push(`${humanize(keyName)}:`);
          lines.push(...long.map((s) => `- ${s}`));
        } else if (
          keyName &&
          long.length === 1 &&
          !["paragraphs", "items", "body", "text"].includes(keyName)
        ) {
          lines.push(`${humanize(keyName)}: ${long[0]}`);
        } else {
          for (const s of long) lines.push(s, "");
        }
      }
      return lines;
    }

    const stats = [];
    for (const obj of objects) {
      const stat = statLine(obj);
      if (stat) stats.push(stat);
      else lines.push(...renderObject(obj, ctx, depth), "");
    }
    if (stats.length) lines.unshift(...stats.map((s) => `- ${s}`), "");
    return lines;
  }

  if (node.type === "ObjectExpression") return renderObject(node, ctx, depth);
  return lines;
}

function renderObject(obj, ctx, depth) {
  const lines = [];
  const label = labelOf(obj);
  const target = isTarget(obj);
  let childDepth = depth;
  if (label) {
    lines.push(`${"#".repeat(Math.min(depth, 6))} ${label.label}`);
    childDepth = depth + 1;
  }

  const shortPairs = [];
  for (const p of obj.properties) {
    const key = propKey(p);
    if (!key || isSkippedKey(key) || label?.keys.includes(key)) continue;
    const s = stringOf(p.value);
    if (s !== null) {
      const v = keepValue(s, ctx);
      if (v) {
        const prefix = PLAIN_KEYS.has(key) ? "" : `${humanize(key)}: `;
        lines.push(`${prefix}${v}${target ? " (target figure, not yet measured)" : ""}`);
      } else {
        const n = normalize(s);
        if (n && n.length < MIN_CHARS && !isNoise(n) && n.length >= 2)
          shortPairs.push(`${humanize(key)}: ${n}`);
      }
      continue;
    }
    if (p.value.type === "ObjectExpression" || p.value.type === "ArrayExpression") {
      const nested = renderNode(p.value, ctx, childDepth + 1, key);
      if (!nested.some((l) => l.trim())) continue;
      const nestedHasHeading = p.value.type === "ObjectExpression" && labelOf(p.value);
      // Arrays of plain strings render as a keyed line already.
      const plainList =
        p.value.type === "ArrayExpression" && p.value.elements.every((e) => stringOf(e) !== null);
      if (!nestedHasHeading && !plainList) {
        lines.push("", `${"#".repeat(Math.min(childDepth, 6))} ${humanize(key)}`);
      }
      lines.push(...nested);
    }
  }
  // Rows of short cells (outcome tables, proof badges) survive as one line.
  if (shortPairs.length >= 2) {
    const joined = shortPairs.join(", ");
    if (!ctx.dupes?.drop(joined))
      lines.push(`${joined}${target ? " (target figure, not yet measured)" : ""}`);
  }
  return lines;
}

/** Top-level `const x = {...}` / `[...]` declarations, exported or not. */
export function topLevelDeclarations(ast, { exportedOnly = false } = {}) {
  const out = [];
  for (const stmt of ast.program.body) {
    let decl = null;
    let exported = false;
    if (
      stmt.type === "ExportNamedDeclaration" &&
      stmt.declaration?.type === "VariableDeclaration"
    ) {
      decl = stmt.declaration;
      exported = true;
    } else if (stmt.type === "VariableDeclaration") decl = stmt;
    if (!decl || (exportedOnly && !exported)) continue;
    for (const d of decl.declarations) {
      if (d.id.type !== "Identifier" || !d.init) continue;
      if (d.init.type === "ObjectExpression" || d.init.type === "ArrayExpression") {
        out.push({ name: d.id.name, node: d.init, exported });
      }
    }
  }
  return out;
}

/** Duplicate policy: a string seen 3+ times across the corpus. */
export function makeDupes(counts, { threshold = 3, keepLongOnce = 60 } = {}) {
  const emitted = new Set();
  return {
    drop(s) {
      if ((counts.get(s) ?? 0) < threshold) return false;
      // Short repeats are labels and CTAs: drop them everywhere. Long repeats
      // are real copy shared between pages: keep the first one only.
      if (s.length < keepLongOnce) return true;
      if (emitted.has(s)) return true;
      emitted.add(s);
      return false;
    },
  };
}

export function countStrings(asts) {
  const counts = new Map();
  for (const ast of asts) {
    for (const s of collectStrings(ast.program)) counts.set(s, (counts.get(s) ?? 0) + 1);
  }
  return counts;
}

/** Collapse runs of blank lines and trim. */
export const tidy = (lines) =>
  lines
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
