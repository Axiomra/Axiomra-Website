import { useEffect } from "react";

/**
 * Sets the document title, meta description and Open Graph tags for a page,
 * and puts the previous values back on unmount so the next route does not
 * inherit them. Tags missing from index.html are created, then removed again.
 */
export default function usePageMeta({ title, description, image, type = "article" }) {
  useEffect(() => {
    const url = window.location.origin + window.location.pathname;
    const tags = [
      ["name", "description", description],
      ["property", "og:type", type],
      ["property", "og:title", title],
      ["property", "og:description", description],
      ["property", "og:url", url],
      ["property", "og:image", image ? new URL(image, window.location.origin).href : null],
      ["name", "twitter:title", title],
      ["name", "twitter:description", description],
      ["name", "twitter:image", image ? new URL(image, window.location.origin).href : null],
    ];

    const prevTitle = document.title;
    document.title = title;

    const restore = tags
      .filter(([, , content]) => content)
      .map(([attr, key, content]) => {
        let el = document.head.querySelector(`meta[${attr}="${key}"]`);
        const created = !el;
        if (created) {
          el = document.createElement("meta");
          el.setAttribute(attr, key);
          document.head.appendChild(el);
        }
        const prev = el.getAttribute("content");
        el.setAttribute("content", content);
        return () => (created ? el.remove() : el.setAttribute("content", prev ?? ""));
      });

    return () => {
      document.title = prevTitle;
      restore.forEach((fn) => fn());
    };
  }, [title, description, image, type]);
}
