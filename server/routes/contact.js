import { Router } from "express";
import Contact from "../models/Contact.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, company, message } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required." });
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ error: "Please provide a valid email." });
    }
    const contact = await Contact.create({ name, email, company, message });
    return res.status(201).json({ success: true, id: contact._id });
  } catch (err) {
    console.error("Contact creation failed:", err.message);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).limit(100);
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contacts." });
  }
});

export default router;
