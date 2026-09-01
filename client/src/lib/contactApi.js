// Base URL of the backend. Vite inlines this at build time, so a missing
// VITE_API_URL in a production build silently points the form at localhost —
// hence the explicit dev-only fallback.
const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/+$/, "");

/**
 * POST a contact submission.
 * Throws an Error whose message is safe to show the visitor: either the
 * server's own validation text or a description of what actually broke.
 * The generic "something went wrong" wording hid CORS failures, an unset
 * MONGO_URI and plain validation errors behind one identical string.
 */
export async function submitContact(form) {
  let res;
  try {
    res = await fetch(`${API_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
  } catch {
    // fetch only rejects on a network/CORS level failure, never on a 4xx/5xx.
    throw new Error("Could not reach the server. Check your connection and try again.");
  }

  // A 404 HTML page or a proxy error page is not JSON; don't let the parse
  // failure masquerade as a network problem.
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.error || `Request failed (${res.status}). Please try again.`);
  }
  return data;
}
