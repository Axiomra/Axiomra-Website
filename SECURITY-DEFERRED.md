# Deferred security advisories

Advisories we know about, have judged not exploitable in the current code, and
have chosen not to fix yet. Each entry lists the conditions that end the
deferral. If you are about to meet one of them, upgrade first.

## react-router / react-router-dom < 7.18.0 (client)

- **Installed:** react-router-dom 6.30.6 (pulls react-router 6.30.6)
- **Fixed in:** 7.18.0 (major upgrade, v6 → v7)
- **Severity:** moderate
- **Reviewed:** 2026-09-29

### Advisories

1. **Open redirect via backslash in `<Link>` and `useNavigate`** (bypass of the
   CVE-2025-68470 fix), affects >= 6.0.0 < 7.18.0. A target such as `/\evil.com`
   passed to `<Link to>` or `navigate()` can leave the site.
2. **Arbitrary constructor injection via `deserializeErrors()`** during SSR
   hydration, affects >= 6.4.0 < 7.18.0. Crafted hydration data can make the
   client construct an arbitrary global when it rebuilds route errors.

### Why neither is exploitable today

- **No data router.** The client uses `<BrowserRouter>` (`client/src/main.jsx`)
  and the prerender uses `<StaticRouter>` (`client/src/entry-server.jsx`).
  Nothing calls `createBrowserRouter`, `createStaticHandler`,
  `StaticRouterProvider` or passes `hydrationData`, so `deserializeErrors()`
  never runs.
- **No URL-controlled navigation targets.** Every `<Link to>` and `navigate()`
  target is a constant or comes from the site's own data files.
- **Chat links cannot carry a backslash.** `client/src/components/chat/richText.jsx`
  turns model output into `<Link>`s only when the token matches
  `/[a-z0-9][a-z0-9\-/]*`, so `\` can never reach `to`.
- **Admin login redirect is not URL-controlled.**
  `client/src/pages/admin/AdminLoginPage.jsx` redirects to
  `location.state?.from`. History state is set only by the app's own
  `navigate(..., { state })` calls; a link or query string cannot set it.

### Conditions that force the upgrade

Upgrade to react-router 7.18+ **before** merging any change that:

- adds a data router (`createBrowserRouter`, `RouterProvider`,
  `createStaticHandler` / `StaticRouterProvider`, loaders, actions or
  `hydrationData`), or moves to framework mode;
- drives a redirect or `navigate()` / `<Link to>` from a URL parameter
  (`?next=`, `?returnTo=`, `?redirect=`, a hash, or anything else the visitor
  controls);
- loosens the path regex in `richText.jsx` or otherwise renders links from
  model or user text without the same character whitelist;
- makes `AdminLoginPage` read its return path from the URL instead of history
  state.

v7 notes for when it happens: needs React 18+ and Node 20+;
`react-router-dom/server` (used by `entry-server.jsx`) must be re-checked; turn
on the v6 `future` flags (`v7_startTransition`, `v7_relativeSplatPath`, …)
first and verify prerender and hydration before bumping the major.

## Legacy `messages` array on POST /api/chat (server)

- **What:** `/api/chat` still accepts the old body shape
  `{ messages: [{ role: "user", content }] }` alongside the supported
  `{ message, conversationId? }`.
- **Where:** the `messages` field of `bodySchema` in `server/routes/chat.js`
  (marked `TEMPORARY SHIM`).
- **Added:** 2026-09-29
- **Remove by:** 2026-10-06
- **Status:** temporary shim, not a supported path.

### Why it exists

Widget bundles loaded before the server kept conversation history send the
whole transcript as `messages`. Tabs left open across the deploy keep doing so
until they reload. The shim stops those visitors getting a 400 in the meantime.

### Why it is safe while it lasts

- Only the last element is used, as the new message. Every earlier element is
  ignored; context comes only from the server's store (`chat:conv:<id>`).
- Every element must be `{ role: "user", content }` with no extra keys, and
  content capped at 2000 characters. An `assistant`, `system` or any other
  role anywhere in the array is refused with a 400, so a forged turn is never
  forwarded or silently dropped.
- A body carrying both `message` and `messages` is refused.
- The spend cap and rate limits apply exactly as on the supported path.

### How to remove it

1. Delete the `messages` field and the `message`/`messages` refine from
   `bodySchema`, make `message` required, and set
   `const text = data.message`.
2. Move the tests in `server/tests/chat.test.js` and
   `server/tests/chatHistory.test.js` that post `messages` to `message`.
   Keep a test that a body with a `messages` array is now a 400 (it hits
   `strictObject`).
3. Delete this section.
