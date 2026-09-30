import mongoose from "mongoose";

/**
 * A blog post written in the admin panel.
 *
 * `content` is plain text with a small Markdown subset (## headings, "- "
 * bullets, blank-line paragraphs). The site renders it as React text nodes,
 * never as HTML, so a post cannot inject markup into the page.
 */

export const POST_STATUSES = ["draft", "published"];

/** Lowercase words joined by single hyphens. */
export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const LIMITS = { title: 160, slug: 100, excerpt: 400, content: 40000, coverImage: 500 };

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: LIMITS.title },
    slug: {
      type: String,
      required: true,
      unique: true,
      match: SLUG_RE,
      maxlength: LIMITS.slug,
    },
    excerpt: { type: String, default: "", maxlength: LIMITS.excerpt },
    content: { type: String, default: "", maxlength: LIMITS.content },
    coverImage: { type: String, default: "", maxlength: LIMITS.coverImage },
    author: { type: String, default: "Axiomra", maxlength: 80 },
    status: { type: String, enum: POST_STATUSES, default: "draft" },
    // Set the first time a post goes live and kept through later edits, so
    // fixing a typo does not bump an old post to the top of the list.
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true, collection: "blogposts" }
);

blogPostSchema.index({ status: 1, publishedAt: -1 });

export default mongoose.models.BlogPost || mongoose.model("BlogPost", blogPostSchema);
