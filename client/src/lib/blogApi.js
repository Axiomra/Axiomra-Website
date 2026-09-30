// Public, read-only blog calls. No credentials: these are the same for every
// visitor and cacheable. Admin writes live in adminApi.js.
const API_URL = import.meta.env.VITE_API_URL.replace(/\/+$/, "");

async function get(path, signal) {
  const res = await fetch(`${API_URL}${path}`, { signal });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const err = new Error(data?.error || `Request failed (${res.status}).`);
    err.status = res.status;
    throw err;
  }
  return data;
}

export const listPosts = (limit, signal) => get(`/api/blogs?limit=${limit}`, signal);
export const getPost = (slug, signal) => get(`/api/blogs/${encodeURIComponent(slug)}`, signal);

let publishedCheck;

/**
 * Whether at least one post is live. Shared across the session so every
 * route change does not re-ask; a failed call reads as "no posts" and is
 * retried on the next full load.
 */
export function hasPublishedPosts() {
  publishedCheck ??= listPosts(1)
    .then((data) => data.total > 0)
    .catch(() => false);
  return publishedCheck;
}

export function formatPostDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
