/**
 * Splits loader documents into retrieval chunks.
 *
 * A document's text is Markdown-ish: `#` headings, blank-line paragraphs and
 * "- " lists. Chunks follow headings first, then paragraphs, then sentences,
 * so a chunk rarely starts mid-thought. Consecutive small sections under the
 * same top-level heading are packed together (an FAQ list becomes a few chunks, not one
 * per question), and every chunk is prefixed with its title and section so it
 * still makes sense when retrieved on its own.
 */

// No tokenizer in the project: English averages ~4 characters per token.
export const CHARS_PER_TOKEN = 4;
export const estimateTokens = (text) => Math.ceil(text.length / CHARS_PER_TOKEN);

// A chunk whose body is only a heading or two is noise, not an answer.
export const DEFAULTS = { maxTokens: 400, overlapTokens: 50, minBodyChars: 60 };

const HEADING = /^(#{1,6})\s+(.+?)\s*#*$/;

/** Heading-delimited sections: { path: string[], depth, heading, blocks: string[] }. */
export function toSections(text, basePath = []) {
  const sections = [];
  const stack = []; // [{ level, name }]
  let current = { path: [...basePath], depth: 0, heading: null, blocks: [] };
  let para = [];

  const flushPara = () => {
    const block = para.join("\n").trim();
    if (block) current.blocks.push(block);
    para = [];
  };
  const flushSection = () => {
    flushPara();
    if (current.blocks.length) sections.push(current);
  };

  for (const raw of text.split("\n")) {
    const line = raw.trimEnd();
    const h = HEADING.exec(line);
    if (h) {
      flushSection();
      const level = h[1].length;
      while (stack.length && stack.at(-1).level >= level) stack.pop();
      stack.push({ level, name: h[2] });
      current = {
        path: [...basePath, ...stack.map((s) => s.name)],
        depth: stack.length,
        heading: h[2],
        blocks: [],
      };
    } else if (!line.trim()) {
      flushPara();
    } else {
      para.push(line);
    }
  }
  flushSection();
  return sections;
}

const commonPrefix = (paths) => {
  const [first, ...rest] = paths;
  let n = first.length;
  for (const p of rest) {
    let i = 0;
    while (i < n && i < p.length && p[i] === first[i]) i += 1;
    n = i;
  }
  return first.slice(0, n);
};

/** Split an oversized block by lines, then sentences, then words. */
function splitBlock(block, maxChars) {
  if (block.length <= maxChars) return [block];
  const lines = block.split("\n");
  const units =
    lines.length > 1 ? lines : block.split(/(?<=[.!?])\s+(?=[A-Z0-9"“(])/).filter(Boolean);
  if (units.length === 1) {
    const words = block.split(/\s+/);
    const out = [];
    let cur = "";
    for (const w of words) {
      if (cur && cur.length + 1 + w.length > maxChars) {
        out.push(cur);
        cur = w;
      } else cur = cur ? `${cur} ${w}` : w;
    }
    if (cur) out.push(cur);
    return out;
  }
  const out = [];
  let cur = "";
  const sep = lines.length > 1 ? "\n" : " ";
  for (const u of units) {
    for (const piece of splitBlock(u, maxChars)) {
      if (cur && cur.length + sep.length + piece.length > maxChars) {
        out.push(cur);
        cur = piece;
      } else cur = cur ? `${cur}${sep}${piece}` : piece;
    }
  }
  if (cur) out.push(cur);
  return out;
}

/** The last ~overlapChars of a chunk, starting on a word boundary. */
function tail(text, overlapChars) {
  if (text.length <= overlapChars) return text;
  const slice = text.slice(-overlapChars);
  const cut = slice.search(/\s/);
  return cut === -1 ? slice : slice.slice(cut + 1);
}

/**
 * Group consecutive sections into packs while they fit in one chunk, so an
 * FAQ list becomes a few chunks rather than one per question. A section
 * larger than a chunk always starts its own pack.
 */
function packSections(sections, maxChars, baseDepth) {
  const packs = [];
  let pack = null;
  const size = (s) => s.blocks.join("\n\n").length + (s.heading?.length ?? 0) + 4;
  // Never pack across a top-level heading: the chunk label would lose it.
  const top = (s) => s.path[baseDepth] ?? "";
  for (const s of sections) {
    const len = size(s);
    if (pack && top(pack.sections[0]) === top(s) && pack.len + len <= maxChars) {
      pack.sections.push(s);
      pack.len += len;
    } else {
      pack = { sections: [s], len };
      packs.push(pack);
    }
  }
  return packs;
}

/**
 * chunkDocument(doc) -> [{ source, title, section, chunkIndex, text, body }]
 * `text` is the prefixed chunk that gets embedded and stored.
 */
export function chunkDocument(doc, opts = {}) {
  const { maxTokens, overlapTokens, minBodyChars } = { ...DEFAULTS, ...opts };
  const maxChars = maxTokens * CHARS_PER_TOKEN;
  const overlapChars = overlapTokens * CHARS_PER_TOKEN;
  const basePath = doc.section ? [doc.section] : [];
  const sections = toSections(doc.text, basePath);

  const pieces = [];
  for (const pack of packSections(sections, maxChars, basePath.length)) {
    const paths = pack.sections.map((s) => s.path);
    const label = pack.sections.length > 1 ? commonPrefix(paths) : paths[0];
    const blocks = [];
    for (const s of pack.sections) {
      // Sub-headings below the label stay in the body, so packed FAQ
      // questions keep their question text.
      if (s.path.length > label.length && s.heading) blocks.push(s.heading);
      blocks.push(...s.blocks);
    }

    const units = blocks.flatMap((b) => splitBlock(b, maxChars - overlapChars));
    let body = "";
    const bodies = [];
    for (const u of units) {
      if (body && body.length + 2 + u.length > maxChars) {
        bodies.push(body);
        body = `${tail(body, overlapChars)}\n\n${u}`;
      } else body = body ? `${body}\n\n${u}` : u;
    }
    if (body) bodies.push(body);
    for (const b of bodies) pieces.push({ section: label.join(" › ") || doc.title, body: b });
  }

  return pieces
    .filter((p) => p.body.trim().length >= minBodyChars)
    .map((p, chunkIndex) => ({
      source: doc.source,
      title: doc.title,
      section: p.section,
      chunkIndex,
      body: p.body,
      text: `Title: ${doc.title}\nSection: ${p.section}\n\n${p.body}`,
    }));
}
