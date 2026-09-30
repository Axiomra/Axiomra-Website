import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, LogOut, Pencil, Plus, Trash2 } from "lucide-react";

import AdminAmbience from "../../components/admin/AdminAmbience";
import AdminBackdrop from "../../components/admin/AdminBackdrop";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import ThemeToggle from "../../components/ThemeToggle";
import useAdminAuth from "../../admin/useAdminAuth";
import Seo from "../../seo/Seo";
import { blogsApi } from "../../lib/adminApi";
import { formatPostDate } from "../../lib/blogApi";
import { blogPostPath } from "../../routes.constants";

const EMPTY_POST = {
  title: "",
  slug: "",
  excerpt: "",
  coverImage: "",
  author: "Axiomra",
  content: "",
  status: "draft",
};

const actionButton =
  "focus-ring inline-flex items-center gap-2 rounded-xl border border-line bg-surface-card px-3 py-2 text-sm font-medium text-content-dim transition-colors hover:bg-surface-inset disabled:opacity-50";
const primaryButton =
  "focus-ring inline-flex items-center gap-2 rounded-xl bg-grad-sky px-4 py-2 text-sm font-medium text-[#0A1428] transition-opacity hover:opacity-90 disabled:opacity-50";
const inputClass =
  "focus-ring w-full rounded-xl border border-line bg-surface-card px-3 py-2 text-sm text-content placeholder:text-content-dim/60";

function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-content">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-content-dim">{hint}</span>}
    </label>
  );
}

function StatusBadge({ status }) {
  const live = status === "published";
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
        live
          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
          : "bg-surface-inset text-content-dim"
      }`}
    >
      {live ? "Published" : "Draft"}
    </span>
  );
}

function PostEditor({ initial, onSaved, onCancel }) {
  const [post, setPost] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const isNew = !initial._id;

  const set = (key) => (e) => setPost((p) => ({ ...p, [key]: e.target.value }));

  const save = async (status) => {
    setSaving(true);
    setError("");
    const body = {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      coverImage: post.coverImage,
      author: post.author,
      content: post.content,
      status,
    };
    try {
      const saved = isNew ? await blogsApi.create(body) : await blogsApi.patch(initial._id, body);
      onSaved(saved);
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <form
      className="space-y-5 rounded-2xl border border-line bg-surface-card p-5 sm:p-6"
      onSubmit={(e) => {
        e.preventDefault();
        save(post.status);
      }}
    >
      <h2 className="font-display text-lg font-semibold text-content">
        {isNew ? "New post" : "Edit post"}
      </h2>

      <Field label="Title">
        <input
          className={inputClass}
          value={post.title}
          onChange={set("title")}
          maxLength={160}
          required
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="URL slug" hint="Leave empty to build it from the title.">
          <input
            className={inputClass}
            value={post.slug}
            onChange={set("slug")}
            maxLength={100}
            placeholder="why-ai-projects-fail"
          />
        </Field>
        <Field label="Author">
          <input
            className={inputClass}
            value={post.author}
            onChange={set("author")}
            maxLength={80}
          />
        </Field>
      </div>

      <Field label="Excerpt" hint="One or two sentences for the blog list and search results.">
        <textarea
          className={`${inputClass} min-h-[70px]`}
          value={post.excerpt}
          onChange={set("excerpt")}
          maxLength={400}
        />
      </Field>

      <Field
        label="Cover image URL"
        hint="https:// only. The site's security policy loads images from images.unsplash.com; ask a developer to allow any other host."
      >
        <input
          className={inputClass}
          value={post.coverImage}
          onChange={set("coverImage")}
          maxLength={500}
          placeholder="https://images.unsplash.com/…"
        />
      </Field>

      <Field
        label="Content"
        hint='Blank line = new paragraph. Start a line with "## " for a heading, "- " for a bullet.'
      >
        <textarea
          className={`${inputClass} min-h-[360px] font-mono`}
          value={post.content}
          onChange={set("content")}
          maxLength={40000}
        />
      </Field>

      {error && (
        <p role="alert" className="text-sm text-red-500">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => save("published")}
          disabled={saving}
          className={primaryButton}
        >
          {post.status === "published" ? "Save" : "Publish"}
        </button>
        <button
          type="button"
          onClick={() => save("draft")}
          disabled={saving}
          className={actionButton}
        >
          {post.status === "published" ? "Unpublish (move to draft)" : "Save draft"}
        </button>
        <button type="button" onClick={onCancel} disabled={saving} className={actionButton}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function AdminBlogsPage() {
  const { user, signOut } = useAdminAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    blogsApi
      .list(ctrl.signal)
      .then((data) => setPosts(data.items))
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, []);

  const onSaved = useCallback((saved) => {
    setPosts((list) => [saved, ...list.filter((p) => p._id !== saved._id)]);
    setEditing(null);
  }, []);

  const confirmDelete = useCallback(async () => {
    setDeleting(true);
    try {
      await blogsApi.remove(pendingDelete._id);
      setPosts((list) => list.filter((p) => p._id !== pendingDelete._id));
      setPendingDelete(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(false);
    }
  }, [pendingDelete]);

  return (
    <div className="min-h-[100svh] bg-surface">
      <Seo title="Axiomra Blog Posts" noindex />
      <AdminAmbience />

      <header className="relative overflow-hidden border-b border-line">
        <AdminBackdrop />
        <div className="relative mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 pb-5 pt-6 sm:px-6">
          <div>
            <h1 className="font-display text-[clamp(1.25rem,2.2vw,1.65rem)] font-semibold leading-tight tracking-tight text-content">
              Blog <span className="bg-cta-gradient bg-clip-text text-transparent">Posts</span>
            </h1>
            <p className="mt-0.5 text-[12px] text-content-dim">
              Published posts appear on the site, and the footer shows its Blogs link,
              automatically.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link to="/admin" className={actionButton}>
              <ArrowLeft size={15} aria-hidden="true" />
              <span className="hidden sm:inline">Leads</span>
            </Link>
            {!editing && (
              <button type="button" onClick={() => setEditing(EMPTY_POST)} className={actionButton}>
                <Plus size={15} aria-hidden="true" />
                <span className="hidden sm:inline">New post</span>
              </button>
            )}
            <ThemeToggle variant="surface" />
            <button
              type="button"
              onClick={signOut}
              className={actionButton}
              aria-label={`Sign out${user?.email ? ` (${user.email})` : ""}`}
            >
              <LogOut size={15} aria-hidden="true" />
              <span className="hidden lg:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-5xl px-4 py-6 sm:px-6">
        {error && (
          <p role="alert" className="mb-4 text-sm text-red-500">
            {error}
          </p>
        )}

        {editing ? (
          <PostEditor
            key={editing._id || "new"}
            initial={{ ...EMPTY_POST, ...editing }}
            onSaved={onSaved}
            onCancel={() => setEditing(null)}
          />
        ) : loading ? (
          <p className="text-sm text-content-dim">Loading posts…</p>
        ) : posts.length === 0 ? (
          <p className="text-sm text-content-dim">
            No posts yet. Click “New post” to write the first one.
          </p>
        ) : (
          <ul className="space-y-3">
            {posts.map((post) => (
              <li
                key={post._id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-surface-card p-4"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={post.status} />
                    <span className="truncate font-medium text-content">{post.title}</span>
                  </div>
                  <p className="mt-1 text-xs text-content-dim">
                    /{post.slug}
                    {post.publishedAt && ` · published ${formatPostDate(post.publishedAt)}`}
                  </p>
                </div>
                <div className="flex gap-2">
                  {post.status === "published" && (
                    <a
                      href={blogPostPath(post.slug)}
                      target="_blank"
                      rel="noreferrer"
                      className={actionButton}
                      aria-label={`View ${post.title}`}
                    >
                      <ExternalLink size={15} aria-hidden="true" />
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setEditing(post)}
                    className={actionButton}
                    aria-label={`Edit ${post.title}`}
                  >
                    <Pencil size={15} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPendingDelete(post)}
                    className={actionButton}
                    aria-label={`Delete ${post.title}`}
                  >
                    <Trash2 size={15} aria-hidden="true" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete this post?"
        body={
          pendingDelete ? `“${pendingDelete.title}” will be removed from the site for good.` : ""
        }
        busy={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
