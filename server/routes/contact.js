import { Router } from "express";
import { timingSafeEqual } from "crypto";
import Contact from "../models/Contact.js";

const router = Router();

// Submissions contain PII (name, email, company, message), so reading them back
// requires an admin token. If ADMIN_API_TOKEN is unset we fail closed rather
// than silently serving the whole table to the public internet.
function requireAdmin(req, res, next) {
  const expected = process.env.ADMIN_API_TOKEN;
  if (!expected) {
    return res.status(503).json({ error: "Admin access is not configured." });
  }
  const header = req.get("authorization") || "";
  const provided = header.startsWith("Bearer ") ? header.slice(7) : "";
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return res.status(401).json({ error: "Unauthorized." });
  }
  return next();
}

router.post("/", async (req, res) => {
  try {
    const { name, email, company, service, message } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required." });
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ error: "Please provide a valid email." });
    }
    const contact = await Contact.create({ name, email, company, service, message });
    return res.status(201).json({ success: true, id: contact._id });
  } catch (err) {
    console.error("Contact creation failed:", err.message);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

router.get("/", requireAdmin, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).limit(100);
    res.json(contacts);
  } catch (err) {
    console.error("Contact fetch failed:", err.message);
    res.status(500).json({ error: "Failed to fetch contacts." });
  }
});

export default router;
