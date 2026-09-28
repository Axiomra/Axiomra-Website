/**
 * Runs `cb` once the page has finished loading and the main thread is idle.
 * Returns a cancel function. For work that must never compete with first
 * paint or hydration, like fetching and compiling three.js.
 */
export function afterLoadIdle(cb, { timeout = 2000 } = {}) {
  let cancelled = false;
  let idleId;
  const run = () => !cancelled && cb();
  const schedule = () => {
    idleId =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(run, { timeout })
        : window.setTimeout(run, 200);
  };

  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });

  return () => {
    cancelled = true;
    window.removeEventListener("load", schedule);
    if (idleId === undefined) return;
    if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idleId);
    else window.clearTimeout(idleId);
  };
}
