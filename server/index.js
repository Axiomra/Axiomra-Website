import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import rateLimit from "express-rate-limit";
import contactRoutes from "./routes/contact.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../client/dist")));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use("/api", limiter);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/contact", contactRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// Start serving the site immediately; MongoDB connects in the background so a
// missing DB never blocks the website or the /api/health check.
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/axiomra", { serverSelectionTimeoutMS: 10000 })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection failed:", err.message));
