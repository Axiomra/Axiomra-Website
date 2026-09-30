/**
 * Vector search over rag_chunks for one question.
 */
import {
  INDEX_NAME,
  NUM_CANDIDATES,
  TEXT_CANDIDATES,
  TEXT_INDEX_NAME,
  ragSettings,
} from "./config.js";
import { embed } from "./embed.js";
import { ragCollection } from "./store.js";

/** Which dependency failed, for the fallback log. */
export class RetrievalError extends Error {
  constructor(stage, cause) {
    super(cause?.message ?? String(cause));
    this.name = "RetrievalError";
    this.stage = stage; // "openai" | "mongo"
    this.cause = cause;
  }
}

const words = (text) => new Set(text.toLowerCase().match(/[a-z0-9]+/g) ?? []);

/** Jaccard similarity of two texts' word sets. */
export function overlap(a, b) {
  const A = words(a);
  const B = words(b);
  if (!A.size || !B.size) return 0;
  let shared = 0;
  for (const w of A) if (B.has(w)) shared += 1;
  return shared / (A.size + B.size - shared);
}

/** Drop a chunk when an earlier one from the same source and section already covers most of its words. */
function dedupe(ordered, maxOverlap) {
  const kept = [];
  for (const r of ordered) {
    const dup = kept.some(
      (k) =>
        k.source === r.source && k.section === r.section && overlap(k.text, r.text) >= maxOverlap
    );
    if (!dup) kept.push(r);
  }
  return kept;
}

/**
 * Drop results under minScore, then drop a chunk when a better-scored one from
 * the same source and section already covers most of its words (neighbouring
 * chunks share their overlap window, and packed FAQ chunks repeat).
 */
export function filterResults(results, { minScore, maxOverlap = 0.6 }) {
  const ranked = [...results].sort((a, b) => b.score - a.score).filter((r) => r.score >= minScore);
  return dedupe(ranked, maxOverlap);
}

/**
 * Rank-fusion results keep the fusion order, but relevance is gated on the
 * vector score: the fused score is a rank sum, meaningless as a threshold.
 * Keyword-only hits (no vector score) are dropped; on the site corpus they
 * were noise ("weather" matched a fashion page), so text search only reorders.
 */
export function filterFused(results, { minScore, maxOverlap = 0.6 }) {
  return dedupe(
    results.filter((r) => r.score !== null && r.score >= minScore),
    maxOverlap
  );
}

/** Per-pipeline rank and score out of $rankFusion's scoreDetails. */
export function fusedResult(doc) {
  const parts = doc.details?.details ?? [];
  const vector = parts.find((d) => d.inputPipelineName === "vector");
  const text = parts.find((d) => d.inputPipelineName === "text");
  const { details: _details, fusion, ...rest } = doc;
  return {
    ...rest,
    score: vector && typeof vector.value === "number" ? vector.value : null,
    // Pipelines that did not return the document report rank 0.
    textRank: text?.rank > 0 ? text.rank : null,
    fusionScore: fusion ?? doc.details?.value ?? null,
  };
}

// null until the first query finds out whether the cluster runs $rankFusion
// (MongoDB 8.1+); cached per process so an unsupported cluster pays once.
let hybridSupported = null;
// What the most recent query actually ran: "hybrid" or "vector".
let lastMode = null;

export const retrievalMode = () => lastMode ?? "unknown";
export const resetRetrievalMode = () => {
  hybridSupported = null;
  lastMode = null;
};

export const isUnsupportedStage = (err) =>
  err?.code === 40324 || /\$rankFusion/.test(err?.message ?? "");

const PROJECT = { _id: 0, text: 1, source: 1, title: 1, section: 1 };

function vectorStage(vector, limit) {
  return {
    $vectorSearch: {
      index: INDEX_NAME,
      path: "embedding",
      queryVector: vector,
      numCandidates: NUM_CANDIDATES,
      limit,
    },
  };
}

async function vectorOnly(collection, vector, limit) {
  return collection
    .aggregate(
      [
        vectorStage(vector, limit),
        { $project: { ...PROJECT, score: { $meta: "vectorSearchScore" } } },
      ],
      {
        maxTimeMS: 5000,
      }
    )
    .toArray();
}

async function hybrid(collection, question, vector, limit) {
  const docs = await collection
    .aggregate(
      [
        {
          $rankFusion: {
            input: {
              pipelines: {
                vector: [vectorStage(vector, Math.max(limit, TEXT_CANDIDATES))],
                text: [
                  { $search: { index: TEXT_INDEX_NAME, text: { query: question, path: "text" } } },
                  { $limit: TEXT_CANDIDATES },
                ],
              },
            },
            scoreDetails: true,
          },
        },
        { $limit: limit * 2 },
        {
          $project: { ...PROJECT, fusion: { $meta: "score" }, details: { $meta: "scoreDetails" } },
        },
      ],
      { maxTimeMS: 5000 }
    )
    .toArray();
  return docs.map(fusedResult);
}

/**
 * retrieve(question, { k }) -> [{ text, source, title, section, score, ... }]
 * Hybrid (vector + Atlas Search text through $rankFusion) when the cluster
 * supports it and RAG_HYBRID (or the `hybrid` option) allows, otherwise
 * vector only. Throws RetrievalError tagged with the
 * failing stage.
 */
export async function retrieve(
  question,
  { k, minScore, hybrid: useHybrid, signal, log = console } = {}
) {
  const settings = ragSettings();
  const limit = k ?? settings.topK;
  const threshold = minScore ?? settings.minScore;

  let vector;
  try {
    ({
      vectors: [vector],
    } = await embed([question], { signal, retries: 0 }));
  } catch (err) {
    throw new RetrievalError("openai", err);
  }

  try {
    const collection = await ragCollection();
    if ((useHybrid ?? settings.hybrid) && hybridSupported !== false) {
      try {
        const fused = await hybrid(collection, question, vector, limit);
        hybridSupported = true;
        lastMode = "hybrid";
        return filterFused(fused, { minScore: threshold }).slice(0, limit);
      } catch (err) {
        if (!isUnsupportedStage(err)) throw err;
        hybridSupported = false;
        log.warn(`RAG hybrid retrieval unavailable, using vector only: ${err.message}`);
      }
    }
    lastMode = "vector";
    return filterResults(await vectorOnly(collection, vector, limit), { minScore: threshold });
  } catch (err) {
    throw new RetrievalError("mongo", err);
  }
}
