import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

export const ORIGIN = "http://localhost:5173";
// A client branch-preview URL, listed exactly as a real deployment would.
export const PREVIEW_ORIGIN = "https://axiomra-git-staging-hamzajiis-projects.vercel.app";

/**
 * Boot the app against a throwaway in-memory Mongo. The environment has to be
 * in place before app.js is imported, because lib/env.js validates it at
 * import time.
 */
export async function startApp(overrides = {}) {
  const mongo = await MongoMemoryServer.create();
  Object.assign(process.env, {
    MONGO_URI: mongo.getUri("axiomra-test"),
    ALLOWED_ORIGINS: `${ORIGIN},${PREVIEW_ORIGIN}`,
    CLIENT_ORIGIN: "",
    JWT_SECRET: "t".repeat(40),
    GMAIL: "",
    APP_PASSWORD: "",
    REDIS_URL: "",
    ADMIN_PANEL_URL: "",
    ...overrides,
  });

  const { default: app } = await import("../app.js");
  const { connectDB } = await import("../db.js");
  await connectDB();

  const stop = async () => {
    await mongoose.disconnect();
    await mongo.stop();
  };
  return { app, stop };
}

/** Each test gets its own client IP so rate-limit buckets never collide. */
let ipCounter = 0;
export const nextIp = () => {
  ipCounter += 1;
  return `10.0.${Math.floor(ipCounter / 250)}.${(ipCounter % 250) + 1}`;
};
