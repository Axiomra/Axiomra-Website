/**
 * Client for the admin API.
 *
 * Every call sends `credentials: "include"` because the session is an httpOnly
 * cookie. That is the whole point of the design: this file cannot read the
 * token, so nothing injected into the page can steal it either. It also means
 * there is no token to attach by hand — the browser does it.
 */

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/+$/, "");

/** Thrown for any non-2xx response. `status` lets callers treat 401 specially. */
export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request(path, { method = "GET", body, signal } = {}) {
  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      credentials: "include",
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (err) {
    // An aborted request is a normal part of typing in the search box, not a
    // failure to report.
    if (err?.name === "AbortError") throw err;
    throw new ApiError("Could not reach the server. Check your connection.", 0);
  }

  if (res.status === 204) return null;

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new ApiError(data?.error || `Request failed (${res.status}).`, res.status);
  }
  return data;
}

/** Serialise a filter object, dropping empties so the URL stays readable. */
export function leadQuery(params = {}) {
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    if (Array.isArray(value)) {
      if (value.length) qs.set(key, value.join(","));
      continue;
    }
    qs.set(key, String(value));
  }
  const s = qs.toString();
  return s ? `?${s}` : "";
}

/* --- Auth --- */
export const adminAuth = {
  login: (email, password) => request("/api/auth/login", { method: "POST", body: { email, password } }),
  logout: () => request("/api/auth/logout", { method: "POST" }),
  me: (signal) => request("/api/auth/me", { signal }),
  forgotPassword: (email) =>
    request("/api/auth/forgot-password", { method: "POST", body: { email } }),
  resetPassword: (token, password, recoveryKey) =>
    request("/api/auth/reset-password", {
      method: "POST",
      body: { token, password, recoveryKey },
    }),
  /** Whether this reset link's account has a recovery key to satisfy. */
  resetRequirements: (token, signal) =>
    request(`/api/auth/reset-requirements?token=${encodeURIComponent(token)}`, { signal }),
  changePassword: (currentPassword, newPassword) =>
    request("/api/auth/change-password", { method: "POST", body: { currentPassword, newPassword } }),
};

/* --- Leads --- */
export const leadsApi = {
  list: (params, signal) => request(`/api/leads${leadQuery(params)}`, { signal }),
  stats: (params, signal) => request(`/api/leads/stats${leadQuery(params)}`, { signal }),
  related: (id, signal) => request(`/api/leads/${id}/related`, { signal }),
  create: (lead) => request("/api/leads", { method: "POST", body: lead }),
  patch: (id, changes) => request(`/api/leads/${id}`, { method: "PATCH", body: changes }),
  update: (id, lead) => request(`/api/leads/${id}`, { method: "PUT", body: lead }),
  remove: (id) => request(`/api/leads/${id}`, { method: "DELETE" }),

  /**
   * Download the filtered set as CSV.
   *
   * Fetched rather than linked: a plain <a href> cannot carry the session
   * cookie cross-origin, and the response would be a 401 page saved as a .csv.
   */
  async exportCsv(params) {
    const res = await fetch(`${API_URL}/api/leads/export${leadQuery(params)}`, {
      credentials: "include",
    });
    if (!res.ok) throw new ApiError("Could not export leads.", res.status);

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `axiomra-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    // Revoking immediately can cancel the download in Safari; one tick is enough.
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  },
};

/* --- Custom columns ---
   Shared, not per-browser: the whole point of adding a column is that the
   value one person types is a column everyone else can see. */
export const leadFieldsApi = {
  list: (signal) => request("/api/lead-fields", { signal }),
  create: (field) => request("/api/lead-fields", { method: "POST", body: field }),
  patch: (id, changes) => request(`/api/lead-fields/${id}`, { method: "PATCH", body: changes }),
  remove: (id) => request(`/api/lead-fields/${id}`, { method: "DELETE" }),
};

export const PROGRESS_STAGES = [
  "New",
  "Contacted",
  "In Discussion",
  "Proposal Sent",
  "Won",
  "Lost",
];

/** Delivery state, tracked separately from the sales pipeline. */
export const COMPLETION_STATES = ["Pending", "Ongoing", "Completed", "Closed"];
