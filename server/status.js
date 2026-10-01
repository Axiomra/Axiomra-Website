import mongoose from "mongoose";
import { mailerConfigured } from "./mailer.js";
import { requireAuth } from "./lib/auth.js";

// The process start is captured at module load. On Vercel this resets with
// every cold start, which is exactly what the page should report: it is the
// uptime of the instance answering you, not of the deployment.
const BOOT_TIME = Date.now();

const DB_STATES = {
  0: { label: "Disconnected", tone: "down" },
  1: { label: "Connected", tone: "up" },
  2: { label: "Connecting", tone: "warn" },
  3: { label: "Disconnecting", tone: "warn" },
};

// Descriptions for the endpoint list. The list itself is read from the
// mounted routes (see listEndpoints), so a new route shows up on its own; add
// a line here to give it a description.
const DESCRIPTIONS = {
  "GET /api/health": "Liveness probe with mailer configuration state.",
  "POST /api/contact": "Persist a contact enquiry and email the team.",
  "POST /api/chat": "Site assistant. Streams the reply as server-sent events.",
  "POST /api/auth/login": "Admin sign-in. Sets an httpOnly session cookie.",
  "POST /api/auth/logout": "Clear the admin session cookie.",
  "GET /api/auth/me": "Session probe the admin panel runs on load.",
  "POST /api/auth/forgot-password": "Email a single-use password reset link.",
  "POST /api/auth/reset-password": "Set a new password from a reset link.",
  "GET /api/auth/reset-requirements": "What a password reset asks for.",
  "POST /api/auth/change-password": "Change the signed-in admin's password.",
  "GET /api/leads": "Search, filter and page through leads.",
  "GET /api/leads/stats": "Lead counts for the dashboard.",
  "GET /api/leads/export": "Download leads as a file.",
  "GET /api/leads/:id": "Fetch one lead.",
  "GET /api/leads/:id/related": "Other leads from the same contact.",
  "POST /api/leads": "Create a lead by hand from the admin panel.",
  "PUT /api/leads/:id": "Replace a lead's fields.",
  "PATCH /api/leads/:id": "Update one or more fields on a lead.",
  "DELETE /api/leads/:id": "Permanently remove a lead.",
  "GET /api/lead-fields": "Custom lead columns, in display order.",
  "POST /api/lead-fields": "Add a custom lead column.",
  "PATCH /api/lead-fields/:id": "Rename or resize a custom column.",
  "DELETE /api/lead-fields/:id": "Drop a custom column and its values.",
  "GET /api/blogs": "Published posts, newest first.",
  "GET /api/blogs/admin/all": "Every post, drafts included.",
  "POST /api/blogs": "Create a blog post.",
  "PATCH /api/blogs/:id": "Edit, publish or unpublish a post.",
  "DELETE /api/blogs/:id": "Delete a blog post.",
  "GET /api/blogs/:slug": "One published post.",
  "GET /api/rag/debug": "Development-only retrieval inspector.",
};

// Express 4 keeps a mount path only as a compiled regexp, e.g.
// /^\/api\/chat\/?(?=\/|$)/i. Turn that back into "/api/chat".
function mountPath(layer) {
  if (layer.regexp.fast_slash) return "";
  return layer.regexp.source
    .replace(/^\^/, "")
    .replace(/\\\/\?\(\?=\\\/\|\$\)$/, "")
    .replace(/\\\//g, "/");
}

/**
 * Every /api route the app actually mounts, in registration order. A route is
 * marked admin-only when requireAuth sits in its own handler chain or was
 * applied with router.use() ahead of it.
 */
function listEndpoints(app) {
  const seen = new Map();
  const walk = (stack, prefix, guarded) => {
    for (const layer of stack) {
      if (layer.handle === requireAuth) {
        guarded = true;
      } else if (layer.route) {
        const path = prefix + (layer.route.path === "/" && prefix ? "" : layer.route.path);
        if (!path.startsWith("/api/")) continue;
        const auth = guarded || layer.route.stack.some((l) => l.handle === requireAuth);
        for (const method of Object.keys(layer.route.methods)) {
          const key = `${method.toUpperCase()} ${path}`;
          const prev = seen.get(key);
          // Rate limiters are attached as app-level routes on the same path;
          // keep the first entry but let the real handler's auth win.
          if (prev) prev.auth ||= auth ? "Admin JWT" : null;
          else
            seen.set(key, { method: method.toUpperCase(), path, auth: auth ? "Admin JWT" : null });
        }
      } else if (layer.name === "router") {
        walk(layer.handle.stack, prefix + mountPath(layer), guarded);
      }
    }
  };
  walk(app._router?.stack || [], "", false);
  return [...seen.values()].map((e) => ({
    ...e,
    desc: DESCRIPTIONS[`${e.method} ${e.path}`] || "",
  }));
}

// A deployed backend answers to anyone who knows its URL, and the client
// bundle inlines that URL at build time, so treat every deployment as public.
function isPublicDeployment() {
  return process.env.NODE_ENV === "production" || Boolean(process.env.VERCEL);
}

/** Machine-readable snapshot, shared by the HTML page and /status.json. */
export function statusPayload(app) {
  const db = DB_STATES[mongoose.connection.readyState] || DB_STATES[0];
  const mem = process.memoryUsage();
  // The Atlas hostname is infrastructure detail with no reason to be on a
  // page strangers can open. Keep it locally, where it helps confirm which
  // cluster you are actually talking to.
  const host = isPublicDeployment() ? null : mongoose.connection.host || null;
  return {
    service: "Axiomra API",
    status: "ok",
    uptimeMs: Date.now() - BOOT_TIME,
    startedAt: new Date(BOOT_TIME).toISOString(),
    environment: process.env.NODE_ENV || "development",
    platform: process.env.VERCEL ? "Vercel Serverless" : "Node process",
    node: process.version,
    database: { state: db.label, tone: db.tone, host },
    mailer: mailerConfigured()
      ? { state: "Configured", tone: "up" }
      : { state: "Disabled", tone: "warn" },
    memoryMb: Math.round((mem.rss / 1024 / 1024) * 10) / 10,
    endpoints: listEndpoints(app),
  };
}

function escapeHtml(value) {
  return String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c]
  );
}

function statCard(label, value, sub, tone) {
  const dot = tone ? `<span class="dot ${tone}"></span>` : "";
  return `
    <article class="card">
      <p class="card-label">${escapeHtml(label)}</p>
      <p class="card-value">${dot}${escapeHtml(value)}</p>
      <p class="card-sub">${escapeHtml(sub)}</p>
    </article>`;
}

function endpointRow(e) {
  return `
    <li class="endpoint">
      <span class="verb verb-${e.method.toLowerCase()}">${e.method}</span>
      <code class="path">${escapeHtml(e.path)}</code>
      ${e.desc ? `<span class="endpoint-desc">${escapeHtml(e.desc)}</span>` : ""}
      ${e.auth ? `<span class="lock">${escapeHtml(e.auth)}</span>` : ""}
    </li>`;
}

/** Full HTML landing page rendered at the API root. */
export function renderStatusPage(app) {
  const s = statusPayload(app);
  return `<!doctype html>
<html lang="en" data-uptime="${s.uptimeMs}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />
<title>Axiomra API Status</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>" />
<style>
  :root {
    --bg: #05070d;
    --card: rgba(255, 255, 255, 0.035);
    --line: rgba(255, 255, 255, 0.09);
    --fg: #eef1f8;
    --dim: #9aa3b8;
    --faint: #626b80;
    --teal: #14d8c4;
    --indigo: #788be3;
    --amber: #f5b544;
    --red: #f2555a;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: var(--bg);
    color: var(--fg);
    font-family: "Satoshi", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
    min-height: 100vh;
    padding: clamp(24px, 6vw, 72px) clamp(20px, 5vw, 48px) 64px;
    position: relative;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }
  /* Two blurred blobs plus a faint grid: enough depth that the page reads as
     a product surface, cheap enough to stay a single static response. */
  body::before, body::after {
    content: "";
    position: fixed;
    border-radius: 50%;
    filter: blur(120px);
    opacity: 0.5;
    pointer-events: none;
    z-index: 0;
  }
  body::before {
    width: 46vw; height: 46vw; top: -14vw; left: -8vw;
    background: radial-gradient(circle, var(--teal), transparent 68%);
    animation: drift 22s ease-in-out infinite alternate;
  }
  body::after {
    width: 52vw; height: 52vw; top: 4vw; right: -16vw;
    background: radial-gradient(circle, var(--indigo), transparent 68%);
    animation: drift 27s ease-in-out infinite alternate-reverse;
  }
  @keyframes drift {
    from { transform: translate3d(0, 0, 0) scale(1); }
    to   { transform: translate3d(4vw, 6vw, 0) scale(1.12); }
  }
  .grid {
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(75% 65% at 50% 25%, #000 10%, transparent 80%);
    -webkit-mask-image: radial-gradient(75% 65% at 50% 25%, #000 10%, transparent 80%);
  }
  main { position: relative; z-index: 1; max-width: 1040px; margin: 0 auto; }

  .pill {
    display: inline-flex; align-items: center; gap: 9px;
    padding: 7px 15px 7px 12px;
    border: 1px solid var(--line);
    border-radius: 999px;
    background: var(--card);
    backdrop-filter: blur(10px);
    font-size: 12.5px; letter-spacing: 0.07em; text-transform: uppercase;
    color: var(--dim);
  }
  .dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--teal); flex: none;
    box-shadow: 0 0 0 0 rgba(20, 216, 196, 0.55);
    animation: pulse 2.2s ease-out infinite;
  }
  .dot.warn { background: var(--amber); box-shadow: 0 0 0 0 rgba(245,181,68,0.5); }
  .dot.down { background: var(--red); box-shadow: 0 0 0 0 rgba(242,85,90,0.5); }
  @keyframes pulse {
    70%  { box-shadow: 0 0 0 9px rgba(20, 216, 196, 0); }
    100% { box-shadow: 0 0 0 0 rgba(20, 216, 196, 0); }
  }

  h1 {
    margin: 26px 0 0;
    font-size: clamp(40px, 8vw, 76px);
    line-height: 0.98;
    letter-spacing: -0.035em;
    font-weight: 700;
  }
  h1 .grad {
    background: linear-gradient(96deg, var(--teal) 0%, var(--indigo) 100%);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .lede {
    margin-top: 18px; max-width: 54ch;
    font-size: clamp(15px, 2.1vw, 17.5px); line-height: 1.65; color: var(--dim);
  }

  .cards {
    display: grid; gap: 14px; margin-top: 46px;
    grid-template-columns: repeat(auto-fit, minmax(196px, 1fr));
  }
  .card {
    border: 1px solid var(--line); border-radius: 16px;
    background: var(--card); backdrop-filter: blur(12px);
    padding: 18px 20px 17px;
    transition: border-color 0.25s ease, transform 0.25s ease;
  }
  .card:hover { border-color: rgba(120,139,227,0.45); transform: translateY(-2px); }
  .card-label {
    font-size: 11px; letter-spacing: 0.13em; text-transform: uppercase; color: var(--faint);
  }
  .card-value {
    display: flex; align-items: center; gap: 9px;
    margin-top: 11px; font-size: 21px; font-weight: 600; letter-spacing: -0.02em;
  }
  .card-sub { margin-top: 6px; font-size: 12.5px; color: var(--faint); }

  h2 {
    margin: 52px 0 16px;
    font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--faint);
  }
  ul { list-style: none; display: grid; gap: 8px; }
  .endpoint {
    display: flex; align-items: center; gap: 14px; flex-wrap: wrap;
    border: 1px solid var(--line); border-radius: 13px;
    background: var(--card); padding: 13px 17px;
    transition: border-color 0.25s ease, background 0.25s ease;
  }
  .endpoint:hover { border-color: rgba(20,216,196,0.4); background: rgba(255,255,255,0.055); }
  .verb {
    font-family: "JetBrains Mono", ui-monospace, monospace;
    font-size: 10.5px; font-weight: 700; letter-spacing: 0.09em;
    padding: 4px 8px; border-radius: 6px; flex: none; min-width: 50px; text-align: center;
  }
  .verb-get  { background: rgba(20,216,196,0.14);  color: var(--teal);   border: 1px solid rgba(20,216,196,0.3); }
  .verb-post { background: rgba(120,139,227,0.16); color: var(--indigo); border: 1px solid rgba(120,139,227,0.32); }
  .verb-patch { background: rgba(245,181,68,0.14);  color: var(--amber); border: 1px solid rgba(245,181,68,0.3); }
  .verb-delete { background: rgba(242,85,90,0.13);  color: var(--red);   border: 1px solid rgba(242,85,90,0.3); }
  .path {
    font-family: "JetBrains Mono", ui-monospace, monospace;
    font-size: 13.5px; color: var(--fg);
  }
  .endpoint-desc { font-size: 13px; color: var(--dim); flex: 1 1 220px; }
  .lock {
    font-size: 10.5px; letter-spacing: 0.06em; text-transform: uppercase;
    color: var(--amber); border: 1px solid rgba(245,181,68,0.32);
    background: rgba(245,181,68,0.1); border-radius: 999px; padding: 3px 9px;
  }

  footer {
    margin-top: 54px; padding-top: 22px; border-top: 1px solid var(--line);
    display: flex; justify-content: space-between; gap: 14px; flex-wrap: wrap;
    font-size: 12.5px; color: var(--faint);
  }
  footer a { color: var(--dim); text-decoration: none; border-bottom: 1px solid var(--line); }
  footer a:hover { color: var(--teal); border-color: var(--teal); }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation: none !important; transition: none !important; }
  }
</style>
</head>
<body>
<div class="grid"></div>
<main>
  <span class="pill"><span class="dot"></span>All systems operational</span>

  <h1>Axiomra <span class="grad">API</span></h1>
  <p class="lede">
    Backend service for the Axiomra website: contact intake, lead persistence and
    team notifications. This page is the service itself reporting on its own health;
    the public site lives on a separate origin.
  </p>

  <section class="cards">
    ${statCard("Uptime", "-", "since " + new Date(Date.now() - s.uptimeMs).toUTCString(), "up")}
    ${statCard("Database", s.database.state, s.database.host ? "MongoDB · " + s.database.host : "MongoDB Atlas", s.database.tone)}
    ${statCard("Mail transport", s.mailer.state, "Gmail SMTP", s.mailer.tone)}
    ${statCard("Environment", s.environment, s.platform, null)}
    ${statCard("Runtime", "Node " + s.node.replace(/^v/, ""), "Express 4 · ESM", null)}
    ${statCard("Memory", s.memoryMb + " MB", "resident set size", null)}
  </section>

  <h2>Available endpoints</h2>
  <ul>${s.endpoints.map(endpointRow).join("")}</ul>

  <footer>
    <span>© ${new Date().getFullYear()} Axiomra · Machine-readable snapshot at <a href="/status.json">/status.json</a></span>
    <span id="refreshed">Live</span>
  </footer>
</main>
<script>
  // The uptime card ticks locally and the whole snapshot is re-pulled on an
  // interval. /status.json sits outside /api on purpose: the rate limiter
  // there would otherwise count this page's polling against real API traffic.
  var started = Date.now() - Number(document.documentElement.dataset.uptime || 0);
  var uptimeEl = document.querySelector(".cards .card:first-child .card-value");

  function humanise(ms) {
    var s = Math.floor(ms / 1000);
    var d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600);
    var m = Math.floor((s % 3600) / 60), sec = s % 60;
    if (d) return d + "d " + h + "h " + m + "m";
    if (h) return h + "h " + m + "m " + sec + "s";
    if (m) return m + "m " + sec + "s";
    return sec + "s";
  }

  function tick() {
    if (uptimeEl) {
      uptimeEl.innerHTML = '<span class="dot"></span>' + humanise(Date.now() - started);
    }
  }
  tick();
  setInterval(tick, 1000);

  setInterval(function () {
    fetch("/status.json", { cache: "no-store" })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        started = Date.now() - data.uptimeMs;
        var stamp = document.getElementById("refreshed");
        if (stamp) {
          stamp.textContent = "Refreshed " + new Date().toLocaleTimeString();
        }
      })
      .catch(function () {
        var stamp = document.getElementById("refreshed");
        if (stamp) stamp.textContent = "Reconnecting…";
      });
  }, 15000);
</script>
</body>
</html>`;
}
