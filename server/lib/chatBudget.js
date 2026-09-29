/**
 * Daily spend cap for the chat assistant.
 *
 * Every turn reserves its worst-case cost before the model is called and
 * settles to the real usage afterwards, all against one per-day counter in
 * Redis. Reserving first is what makes the cap hard: concurrent turns cannot
 * all read "under the cap" and then overshoot it together. Amounts are stored
 * as integer micro-dollars so INCRBY stays exact.
 *
 * Any store error propagates, and the route answers 503: an unmetered chat is
 * an open tap on the OpenAI bill.
 */
import { env } from "./env.js";
import { redis } from "./rateLimit.js";

const DAY_SECONDS = 24 * 60 * 60;

// USD per 1M tokens (input, output). An unlisted model is priced at the most
// expensive entry, so a CHAT_MODEL override can only make the cap stricter.
const PRICES = {
  "gpt-5": { input: 1.25, output: 10 },
  "gpt-5-mini": { input: 0.25, output: 2 },
  "gpt-5-nano": { input: 0.05, output: 0.4 },
  "gpt-4.1-mini": { input: 0.4, output: 1.6 },
  "gpt-4o-mini": { input: 0.15, output: 0.6 },
};
const FALLBACK_PRICE = PRICES["gpt-5"];

// Tokenisers average ~4 characters per token for English; 3 errs high.
const CHARS_PER_TOKEN_ESTIMATE = 3;

export const priceFor = (model) => PRICES[model] ?? FALLBACK_PRICE;

/** Cost in micro-dollars (1e-6 USD) of a number of tokens, rounded up. */
export function costMicros(model, inputTokens, outputTokens) {
  const { input, output } = priceFor(model);
  // Price per 1M tokens in USD is exactly micro-dollars per token.
  return Math.ceil(inputTokens * input + outputTokens * output);
}

const capMicros = () => Math.round((env.CHAT_DAILY_USD_CAP ?? 0) * 1e6);

const dayKey = (date = new Date()) => date.toISOString().slice(0, 10);
export const spendKey = (day = dayKey()) => `chat:spend:${day}`;
export const tokensKey = (day = dayKey()) => `chat:tokens:${day}`;

// Local development without REDIS_URL only; lib/env.js makes Redis mandatory
// when deployed.
const memory = new Map();
const store = redis ?? {
  async incrby(key, by) {
    const next = (memory.get(key) ?? 0) + by;
    memory.set(key, next);
    return next;
  },
  async expire() {
    return 1;
  },
};

/**
 * Reserve the worst case for one turn. Returns a reservation to settle, or
 * null when it would take today's spend past the cap.
 */
export async function reserve({ model, inputChars, maxOutputTokens }) {
  const key = spendKey();
  const inputTokens = Math.ceil(inputChars / CHARS_PER_TOKEN_ESTIMATE);
  const amount = costMicros(model, inputTokens, maxOutputTokens);

  const total = await store.incrby(key, amount);
  await store.expire(key, 2 * DAY_SECONDS);
  if (total > capMicros()) {
    await store.incrby(key, -amount);
    return null;
  }
  return { key, tokens: tokensKey(key.slice("chat:spend:".length)), amount, model };
}

/**
 * Replace the reservation with what the run actually used. Without usage (an
 * aborted or failed run) the reservation stands, since the provider may
 * still have billed for it.
 */
export async function settle(reservation, usage) {
  if (!usage) return;
  const inputTokens = Number(usage.inputTokens) || 0;
  const outputTokens = Number(usage.outputTokens) || 0;
  const actual = costMicros(reservation.model, inputTokens, outputTokens);
  await store.incrby(reservation.key, actual - reservation.amount);
  await store.incrby(reservation.tokens, inputTokens + outputTokens);
  await store.expire(reservation.tokens, 2 * DAY_SECONDS);
}
