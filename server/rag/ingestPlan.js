/**
 * Pure pieces of the ingest script, kept apart so they can be tested without
 * OpenAI or Mongo.
 */
import { createHash } from "node:crypto";
import { chunkDocument } from "./chunker.js";

/** Content address of a chunk: same source, position and text -> same id. */
export const chunkId = (source, chunkIndex, text) =>
  createHash("sha256").update(`${source}\u0000${chunkIndex}\u0000${text}`).digest("hex");

/** Loader documents -> chunk records (without embeddings). */
export function buildChunks(docs, opts) {
  const out = [];
  // A source can span several documents. Numbering is per source type too,
  // so "/" from the estimator does not shift when the homepage JSX changes,
  // and a --sources run numbers chunks exactly like a full run.
  const nextIndex = new Map();
  for (const doc of docs) {
    const key = `${doc.sourceType}\u0000${doc.source}`;
    const start = nextIndex.get(key) ?? 0;
    const chunks = chunkDocument(doc, opts);
    chunks.forEach((c, i) => {
      const chunkIndex = start + i;
      out.push({
        _id: chunkId(c.source, chunkIndex, c.text),
        sourceType: doc.sourceType,
        source: c.source,
        title: c.title,
        section: c.section,
        chunkIndex,
        text: c.text,
      });
    });
    nextIndex.set(key, start + chunks.length);
  }
  return out;
}

/**
 * Compare fresh chunks with what is stored for the same source types.
 * `existing` is [{ _id, sourceType, source, chunkIndex }].
 *   created: new position        updated: same position, new text
 *   skipped: unchanged           deleted: position gone (source removed or shrank)
 * `remove` lists every stored id that is no longer wanted, replaced versions included.
 */
const position = (c) => `${c.sourceType}\u0000${c.source}\u0000${c.chunkIndex}`;

export function planChanges(chunks, existing) {
  const stored = new Set(existing.map((e) => e._id));
  const storedPositions = new Set(existing.map(position));
  const wanted = new Set(chunks.map((c) => c._id));
  const wantedPositions = new Set(chunks.map(position));

  const created = [];
  const updated = [];
  const skipped = [];
  for (const c of chunks) {
    if (stored.has(c._id)) skipped.push(c);
    else if (storedPositions.has(position(c))) updated.push(c);
    else created.push(c);
  }
  const remove = existing.filter((e) => !wanted.has(e._id)).map((e) => e._id);
  const deleted = existing.filter((e) => !wantedPositions.has(position(e))).length;
  return { created, updated, skipped, remove, deleted };
}
