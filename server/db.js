import mongoose from "mongoose";

// Serverless functions are frozen and thawed between invocations, so a new
// connection per request would exhaust the Atlas connection pool within
// minutes. Cache the promise on globalThis, which survives a warm reuse.
let cached = globalThis.__axiomraMongoose;
if (!cached) {
  cached = globalThis.__axiomraMongoose = { conn: null, promise: null };
}

export async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI is not set.");
  }
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, {
        serverSelectionTimeoutMS: 10000,
        // Buffering hides connection failures behind a 10s hang in a
        // serverless request that only has a few seconds to spare.
        bufferCommands: false,
      })
      .then((m) => {
        cached.conn = m;
        return m;
      })
      .catch((err) => {
        // Drop the rejected promise so the next request retries instead of
        // replaying the same failure forever.
        cached.promise = null;
        throw err;
      });
  }
  return cached.promise;
}
