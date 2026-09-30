/**
 * The rag_chunks collection on the app's existing Mongoose connection. No
 * second client: connectDB() returns the cached connection, and the native
 * driver collection is reached through it (no Mongoose model, since the
 * documents carry a 1536-float array Mongoose would only slow down).
 */
import mongoose from "mongoose";
import { connectDB } from "../db.js";
import { COLLECTION } from "./config.js";

export async function ragCollection() {
  await connectDB();
  return mongoose.connection.db.collection(COLLECTION);
}
