import { Router } from "express";
import mongoose from "mongoose";
import BlogPost, { LIMITS, POST_STATUSES, SLUG_RE } from "../models/BlogPost.js";
import { requireAuth } from "../lib/auth.js";
import { cleanString } from "../lib/sanitize.js";

const router = Router();

/** Fields the public list needs; the body only loads on the post page. */
const LIST_FIELDS = "title slug excerpt coverImage author publishedAt";

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(String(id));
}

/** "Why AI projects fail!" -> "why-ai-projects-fail". "" when nothing survives. */
function slugify(value) {
  const slug = String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, LIMITS.slug)
    .replace(/-+$/, "");
  return SLUG_RE.test(slug) ? slug : "";
}

/** Append -2, -3… until the slug is free of every post but `exceptId`. */
async function uniqueSlug(base, exceptId) {
  for (let n = 1; n <= 50; n += 1) {
    const suffix = n === 1 ? "" : `-${n}`;
    const candidate = `${base.slice(0, LIMITS.slug - suffix.length).replace(/-+$/, "")}${suffix}`;
    const filter = { slug: candidate };
    if (exceptId) filter._id = { $ne: exceptId };
    if (!(await BlogPost.exists(filter))) return candidate;
  }
  return "";
}

/** Only https URLs: an http image would be blocked as mixed content anyway. */
function cleanImageUrl(value) {
  const url = cleanString(value, LIMITS.coverImage);
  if (!url) return "";
  try {
    return new URL(url).protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

const has = (body, key) => Object.prototype.hasOwnProperty.call(body || {}, key);

/**
 * Validate the editable fields present in `body`. Returns { update } or
 * { error }. `partial` skips the required-title check for PATCH.
 */
function readPost(body, { partial }) {
  const update = {};

  if (!partial || has(body, "title")) {
    const title = cleanString(body?.title, LIMITS.title);
    if (!title) return { error: "Give the post a title." };
    update.title = title;
  }
  if (has(body, "excerpt")) update.excerpt = cleanString(body.excerpt, LIMITS.excerpt);
  // Content keeps its newlines; cleanString only strips tags and control chars.
  if (has(body, "content")) update.content = cleanString(body.content, LIMITS.content);
  if (has(body, "author")) update.author = cleanString(body.author, 80) || "Axiomra";
  if (has(body, "coverImage")) {
    const url = cleanImageUrl(body.coverImage);
    if (url === null) return { error: "The cover image must be an https:// URL." };
    update.coverImage = url;
  }
  if (has(body, "status")) {
    if (!POST_STATUSES.includes(body.status)) return { error: "Unknown status." };
    update.status = body.status;
  }
  if (has(body, "slug") && body.slug !== "") {
    const slug = slugify(body.slug);
    if (!slug) return { error: "Use letters and numbers in the URL slug." };
    update.slug = slug;
  }
  return { update };
}

/* --- Public ------------------------------------------------------------- */

/* GET /api/blogs?limit=: published posts, newest first. The footer calls this
   with limit=1 to decide whether to show its "Blogs" link. */
router.get("/", async (req, res) => {
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 20));
  try {
    const filter = { status: "published" };
    const [items, total] = await Promise.all([
      BlogPost.find(filter).sort({ publishedAt: -1 }).limit(limit).select(LIST_FIELDS).lean(),
      BlogPost.countDocuments(filter),
    ]);
    res.set("Cache-Control", "public, max-age=60");
    return res.json({ items, total });
  } catch (err) {
    console.error("Blog list failed:", err.message);
    return res.status(500).json({ error: "Could not load posts." });
  }
});

/* --- Admin (declared before /:slug so "admin" is not read as a slug) ---- */

/* GET /api/blogs/admin/all: every post, drafts included. */
router.get("/admin/all", requireAuth, async (req, res) => {
  try {
    const items = await BlogPost.find().sort({ updatedAt: -1 }).lean();
    return res.json({ items });
  } catch (err) {
    console.error("Admin blog list failed:", err.message);
    return res.status(500).json({ error: "Could not load posts." });
  }
});

/* POST /api/blogs: create a post. The slug comes from the title unless given. */
router.post("/", requireAuth, async (req, res) => {
  const { update, error } = readPost(req.body, { partial: false });
  if (error) return res.status(400).json({ error });

  try {
    const base = update.slug || slugify(update.title);
    if (!base) return res.status(400).json({ error: "Use letters and numbers in the title." });
    const slug = await uniqueSlug(base);
    if (!slug) return res.status(400).json({ error: "That URL slug is already taken." });

    const post = await BlogPost.create({
      ...update,
      slug,
      publishedAt: update.status === "published" ? new Date() : null,
    });
    return res.status(201).json(post.toObject());
  } catch (err) {
    console.error("Blog creation failed:", err.message);
    return res.status(500).json({ error: "Could not save the post." });
  }
});

/* PATCH /api/blogs/:id: edit, publish or unpublish. */
router.patch("/:id", requireAuth, async (req, res) => {
  if (!isValidId(req.params.id)) return res.status(400).json({ error: "Invalid post id." });

  const { update, error } = readPost(req.body, { partial: true });
  if (error) return res.status(400).json({ error });
  if (!Object.keys(update).length) return res.status(400).json({ error: "Nothing to update." });

  try {
    const existing = await BlogPost.findById(req.params.id).lean();
    if (!existing) return res.status(404).json({ error: "Post not found." });

    if (update.slug && update.slug !== existing.slug) {
      const taken = await BlogPost.exists({ slug: update.slug, _id: { $ne: existing._id } });
      if (taken) return res.status(400).json({ error: "That URL slug is already taken." });
    }
    if (update.status === "published" && !existing.publishedAt) update.publishedAt = new Date();

    const post = await BlogPost.findByIdAndUpdate(
      existing._id,
      { $set: update },
      { new: true, runValidators: true }
    ).lean();
    return res.json(post);
  } catch (err) {
    console.error("Blog update failed:", err.message);
    return res.status(500).json({ error: "Could not save the post." });
  }
});

/* DELETE /api/blogs/:id */
router.delete("/:id", requireAuth, async (req, res) => {
  if (!isValidId(req.params.id)) return res.status(400).json({ error: "Invalid post id." });
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id).lean();
    if (!post) return res.status(404).json({ error: "Post not found." });
    return res.json({ success: true, id: String(post._id) });
  } catch (err) {
    console.error("Blog delete failed:", err.message);
    return res.status(500).json({ error: "Could not delete the post." });
  }
});

/* GET /api/blogs/:slug: one published post. Drafts 404 like missing posts. */
router.get("/:slug", async (req, res) => {
  const slug = String(req.params.slug || "");
  if (!SLUG_RE.test(slug)) return res.status(404).json({ error: "Post not found." });
  try {
    const post = await BlogPost.findOne({ slug, status: "published" }).lean();
    if (!post) return res.status(404).json({ error: "Post not found." });
    res.set("Cache-Control", "public, max-age=60");
    return res.json(post);
  } catch (err) {
    console.error("Blog fetch failed:", err.message);
    return res.status(500).json({ error: "Could not load the post." });
  }
});

export default router;
