/**
 * Server-side chat history.
 *
 * The browser only ever sends the visitor's new message plus an opaque
 * conversationId; everything the model sees as earlier context, and above all
 * every "assistant" turn, is read back from here. Ids are always minted by the
 * server: an unknown or malformed id starts a fresh conversation under a new
 * id, so a client cannot choose or guess its way into someone else's history.
 *
 * Stored as a Redis list of JSON turns under chat:conv:<id>, trimmed to the
 * last MAX_TURNS entries and expiring 24 hours after the last reply.
 */
import { randomUUID } from "node:crypto";
import { redis } from "./rateLimit.js";

// Stored messages, not exchanges: 40 is the last 20 question/answer pairs.
export const MAX_TURNS = 40;
export const CONVERSATION_TTL_SECONDS = 24 * 60 * 60;

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const ROLES = new Set(["user", "assistant"]);

export const conversationKey = (id) => `chat:conv:${id}`;

// Local development without REDIS_URL only; lib/env.js makes Redis mandatory
// when deployed. No expiry here: a dev process does not live 24 hours.
const memory = new Map();
const store = redis ?? {
  async lrange(key) {
    return memory.get(key) ?? [];
  },
  async rpush(key, ...values) {
    const list = [...(memory.get(key) ?? []), ...values];
    memory.set(key, list);
    return list.length;
  },
  async ltrim(key, start) {
    memory.set(key, (memory.get(key) ?? []).slice(start));
  },
  async expire() {
    return 1;
  },
};

function parseTurn(raw) {
  try {
    const turn = JSON.parse(raw);
    if (ROLES.has(turn?.role) && typeof turn.content === "string") {
      return { role: turn.role, content: turn.content };
    }
  } catch {
    /* fall through */
  }
  return null;
}

/**
 * Resolve the client's conversationId to stored history. Store errors
 * propagate so the route can refuse the turn rather than answer without
 * context it was promised.
 */
export async function loadConversation(clientId) {
  if (typeof clientId === "string" && UUID_RE.test(clientId)) {
    const raw = await store.lrange(conversationKey(clientId), 0, -1);
    if (raw.length) {
      return { id: clientId, history: raw.map(parseTurn).filter(Boolean) };
    }
  }
  return { id: randomUUID(), history: [] };
}

/** Append a completed exchange and keep only the newest MAX_TURNS entries. */
export async function appendTurns(id, turns) {
  const key = conversationKey(id);
  await store.rpush(key, ...turns.map((t) => JSON.stringify({ role: t.role, content: t.content })));
  await store.ltrim(key, -MAX_TURNS, -1);
  await store.expire(key, CONVERSATION_TTL_SECONDS);
}
