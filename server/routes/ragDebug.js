import { Router } from "express";
import { z } from "zod";
import { ragSettings } from "../rag/config.js";
import { retrievalMode, retrieve } from "../rag/retrieve.js";

/**
 * GET /api/rag/debug?q=...&k=... -> the chunks retrieval returns, with scores.
 * Development only: app.js mounts it only outside production, and it checks
 * again here so a mounting mistake cannot expose it.
 */
const router = Router();

const querySchema = z.object({
  q: z.string().trim().min(1).max(2000),
  k: z.coerce.number().int().min(1).max(20).optional(),
  minScore: z.coerce.number().min(0).max(1).optional(),
  // ?hybrid=1 or ?hybrid=0 overrides RAG_HYBRID for comparison.
  hybrid: z.enum(["0", "1"]).optional(),
});

router.get("/debug", async (req, res) => {
  if (process.env.NODE_ENV === "production") return res.status(404).json({ error: "Not found." });
  const parsed = querySchema.safeParse(req.query);
  if (!parsed.success) return res.status(400).json({ error: "Pass ?q=<question>." });
  const { q, k, minScore, hybrid } = parsed.data;
  const settings = ragSettings();
  try {
    const started = Date.now();
    const chunks = await retrieve(q, {
      k: k ?? settings.topK,
      minScore: minScore ?? settings.minScore,
      hybrid: hybrid === undefined ? undefined : hybrid === "1",
    });
    res.json({ query: q, settings, mode: retrievalMode(), ms: Date.now() - started, chunks });
  } catch (err) {
    res.status(502).json({ error: err.message, stage: err.stage ?? "unknown" });
  }
});

export default router;
