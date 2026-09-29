/**
 * In-memory stand-ins for ioredis and rate-limit-redis, so tests can boot the
 * app the way production does (REDIS_URL set) and can simulate an outage.
 * Tests wire them in with vi.mock; `fake` is the shared state they inspect.
 */
export const fake = {
  failing: false,
  // Fail only keys starting with this, e.g. the spend counter but not limits.
  failPrefix: null,
  data: new Map(),
  prefixes: new Set(),
  reset() {
    this.failing = false;
    this.failPrefix = null;
    this.data.clear();
  },
};

function guard(key = "") {
  if (fake.failing || (fake.failPrefix && key.startsWith(fake.failPrefix))) {
    throw new Error("ECONNREFUSED (fake redis)");
  }
}

export class FakeRedis {
  on() {
    return this;
  }
  async get(key) {
    guard(key);
    return fake.data.has(key) ? String(fake.data.get(key)) : null;
  }
  async incrby(key, by) {
    guard(key);
    const next = Number(fake.data.get(key) ?? 0) + Number(by);
    fake.data.set(key, next);
    return next;
  }
  async expire(key) {
    guard(key);
    return 1;
  }
  async call() {
    guard();
    throw new Error("FakeRedis.call is not implemented");
  }
}

export class FakeRedisStore {
  constructor({ prefix }) {
    this.prefix = prefix;
    fake.prefixes.add(prefix);
  }
  init(options) {
    this.windowMs = options.windowMs;
  }
  async get(key) {
    guard();
    const hits = fake.data.get(this.prefix + key);
    return hits === undefined ? undefined : { totalHits: hits, resetTime: undefined };
  }
  async increment(key) {
    guard();
    const hits = Number(fake.data.get(this.prefix + key) ?? 0) + 1;
    fake.data.set(this.prefix + key, hits);
    return { totalHits: hits, resetTime: new Date(Date.now() + this.windowMs) };
  }
  async decrement(key) {
    guard();
    fake.data.set(this.prefix + key, Number(fake.data.get(this.prefix + key) ?? 1) - 1);
  }
  async resetKey(key) {
    fake.data.delete(this.prefix + key);
  }
}
