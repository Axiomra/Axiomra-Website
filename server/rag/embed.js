/**
 * OpenAI embeddings over plain fetch (no extra SDK). Used by the ingest script
 * (batches) and by retrieval (one question, under the chat's time budget).
 */
import { EMBEDDING_DIMENSIONS, EMBEDDING_MODEL } from "./config.js";

const ENDPOINT = "https://api.openai.com/v1/embeddings";
export const MAX_BATCH = 100;

export class EmbeddingError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "EmbeddingError";
    this.status = status;
  }
}

const retryable = (status) => status === 429 || status >= 500;
const sleep = (ms, signal) =>
  new Promise((resolve, reject) => {
    const t = setTimeout(resolve, ms);
    signal?.addEventListener("abort", () => {
      clearTimeout(t);
      reject(signal.reason);
    });
  });

/**
 * embed(inputs) -> { vectors: number[][], tokens }
 * Retries 429/5xx and network errors with exponential backoff (`retries`
 * extra attempts). Retrieval passes retries: 0; it cannot wait.
 */
export async function embed(
  inputs,
  { signal, retries = 5, baseDelayMs = 1000, fetchImpl = fetch, onRetry = () => {} } = {}
) {
  if (inputs.length === 0) return { vectors: [], tokens: 0 };
  if (inputs.length > MAX_BATCH)
    throw new Error(`At most ${MAX_BATCH} inputs per embeddings call.`);
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new EmbeddingError("OPENAI_API_KEY is not set.");

  for (let attempt = 0; ; attempt += 1) {
    let res;
    try {
      res = await fetchImpl(ENDPOINT, {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: EMBEDDING_MODEL,
          input: inputs,
          dimensions: EMBEDDING_DIMENSIONS,
        }),
        signal,
      });
    } catch (err) {
      if (signal?.aborted || attempt >= retries) throw err;
      onRetry({ attempt: attempt + 1, reason: err.message });
      await sleep(baseDelayMs * 2 ** attempt, signal);
      continue;
    }
    if (res.ok) {
      const json = await res.json();
      const vectors = json.data.sort((a, b) => a.index - b.index).map((d) => d.embedding);
      return { vectors, tokens: json.usage?.total_tokens ?? json.usage?.prompt_tokens ?? 0 };
    }
    if (!retryable(res.status) || attempt >= retries) {
      const detail = await res.text().catch(() => "");
      throw new EmbeddingError(
        `OpenAI embeddings failed (${res.status}): ${detail.slice(0, 200)}`,
        res.status
      );
    }
    // Honour Retry-After when OpenAI sends one.
    const after = Number(res.headers.get("retry-after"));
    const wait = Number.isFinite(after) && after > 0 ? after * 1000 : baseDelayMs * 2 ** attempt;
    onRetry({ attempt: attempt + 1, reason: `HTTP ${res.status}` });
    await sleep(Math.min(wait, 60000), signal);
  }
}
