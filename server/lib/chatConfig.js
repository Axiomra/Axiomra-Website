/**
 * Chat model configuration: which model the assistant runs on, and what each
 * known model costs. The daily spend cap (lib/chatBudget.js) prices every turn
 * from this map, so add a row here whenever CHAT_MODEL moves to a new model.
 */

export const DEFAULT_CHAT_MODEL = "gpt-5-mini";

export const CHAT_MODEL = process.env.CHAT_MODEL?.trim() || DEFAULT_CHAT_MODEL;

// USD per 1M tokens, from OpenAI's published pricing.
export const MODEL_PRICES = {
  "gpt-5": { input: 1.25, output: 10 },
  "gpt-5-mini": { input: 0.25, output: 2 },
  "gpt-5-nano": { input: 0.05, output: 0.4 },
  "gpt-4.1-mini": { input: 0.4, output: 1.6 },
  "gpt-4o-mini": { input: 0.15, output: 0.6 },
};

// An unlisted model is priced at the most expensive row, so a missing entry
// can only make the cap stricter, never let spend through.
const FALLBACK_PRICE = Object.values(MODEL_PRICES).reduce((max, p) =>
  p.input + p.output > max.input + max.output ? p : max
);

const warned = new Set();

export function priceFor(model) {
  const price = MODEL_PRICES[model];
  if (price) return price;
  if (!warned.has(model)) {
    warned.add(model);
    console.warn(
      `Chat: no price configured for model "${model}" in lib/chatConfig.js; ` +
        `budgeting at the most expensive known rate ($${FALLBACK_PRICE.input}/$${FALLBACK_PRICE.output} per 1M tokens).`
    );
  }
  return FALLBACK_PRICE;
}

// Surface a misconfigured CHAT_MODEL at startup, not on the first chat.
priceFor(CHAT_MODEL);
