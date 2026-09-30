/**
 * RAG settings shared by the ingest script, retrieval and the chat route.
 * Read lazily so tests (and the ingest script's dotenv) can set them first.
 */

export const COLLECTION = "rag_chunks";
export const INDEX_NAME = "rag_chunks_vector";
export const TEXT_INDEX_NAME = "rag_chunks_text";
export const EMBEDDING_MODEL = "text-embedding-3-small";
export const EMBEDDING_DIMENSIONS = 1536;
// USD per 1M tokens, from OpenAI's published pricing.
export const EMBEDDING_PRICE_PER_M = 0.02;

// Retrieval shares the chat's latency budget: past this the turn goes ahead
// without reference material.
export const RETRIEVAL_TIMEOUT_MS = 2000;
export const NUM_CANDIDATES = 150;

export const INDEX_DEFINITION = {
  fields: [
    {
      type: "vector",
      path: "embedding",
      numDimensions: EMBEDDING_DIMENSIONS,
      similarity: "cosine",
    },
    { type: "filter", path: "source" },
  ],
};

// Atlas Search (full-text) index for the keyword half of hybrid retrieval.
export const TEXT_INDEX_DEFINITION = {
  mappings: { dynamic: false, fields: { text: { type: "string", analyzer: "lucene.english" } } },
};
// Keyword hits fetched for rank fusion.
export const TEXT_CANDIDATES = 20;

const number = (value, fallback) => {
  const n = Number(value);
  return value !== undefined && value !== "" && Number.isFinite(n) ? n : fallback;
};

export function ragSettings(env = process.env) {
  return {
    enabled: !/^(false|0|off|no)$/i.test(env.RAG_ENABLED?.trim() ?? ""),
    topK: Math.max(1, Math.min(20, Math.round(number(env.RAG_TOP_K, 6)))),
    // Atlas reports cosine as (1 + cos) / 2, so 0.6 is a raw cosine of 0.2.
    // Measured on the site corpus: off-topic questions top out near 0.56,
    // weakly-worded on-topic ones (pricing, MVP timelines) land at 0.63-0.68.
    minScore: number(env.RAG_MIN_SCORE, 0.6),
    // Off by default: on the site corpus hybrid added ~200-400ms per query
    // without improving the top result. RAG_HYBRID=true adds Atlas Search
    // text matching through $rankFusion.
    hybrid: /^(true|1|on|yes)$/i.test(env.RAG_HYBRID?.trim() ?? ""),
  };
}
