import { useLayoutEffect, useRef } from "react";

const TARGETS = "h2, h3, p, li, tr, figure";
const MAX_INDEX = 10;

/**
 * Staggered fade-up for the blocks inside one section, played once.
 *
 * It tags the outermost headings, paragraphs, list items, table rows and
 * figures with `data-rise` and a `--i` index before first paint, then sets
 * `data-revealed` on the container when it scrolls in. The motion itself is
 * CSS (case-study.css) and only exists under `prefers-reduced-motion:
 * no-preference`, so reduced-motion visitors never see a hidden state.
 * List items holding a `[data-num]` marker get `data-rise="num"`, which lets
 * the number land just before its text.
 */
export default function useStaggerReveal({ rootMargin = "0px 0px -10% 0px" } = {}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return undefined;

    const all = [...root.querySelectorAll(TARGETS)].filter((el) => !el.closest("[aria-hidden='true']"));
    const outermost = all.filter((el) => !all.some((other) => other !== el && other.contains(el)));
    outermost.forEach((el, i) => {
      el.dataset.rise = el.querySelector(":scope > [data-num]") ? "num" : "";
      el.style.setProperty("--i", Math.min(i, MAX_INDEX));
    });

    if (typeof IntersectionObserver === "undefined") {
      root.dataset.revealed = "";
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        root.dataset.revealed = "";
        observer.disconnect();
      },
      { rootMargin }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, [rootMargin]);

  return ref;
}
