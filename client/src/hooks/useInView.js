import { useEffect, useRef, useState } from "react";

const HAS_OBSERVER = typeof IntersectionObserver !== "undefined";

/**
 * Tracks whether a node is on screen.
 *
 * A WebGL render loop keeps burning CPU and GPU while its canvas sits far below
 * the fold, so every decorative canvas uses this to park itself when it scrolls
 * away. `rootMargin` starts the loop slightly before the canvas is visible, so
 * the first frame is never caught mid-scroll.
 */
export default function useInView({ rootMargin = "200px", threshold = 0 } = {}) {
  const ref = useRef(null);
  // Without the API there is nothing to observe, so report visible from the
  // start rather than leaving the canvas permanently parked.
  const [inView, setInView] = useState(!HAS_OBSERVER);

  useEffect(() => {
    const node = ref.current;
    if (!node || !HAS_OBSERVER) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin, threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return [ref, inView];
}
