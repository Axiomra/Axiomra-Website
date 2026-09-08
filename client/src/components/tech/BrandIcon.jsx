/**
 * Brand marks in their own colours.
 *
 * The SVGs are vendored into the repo rather than pulled from a CDN: a stack
 * page renders around ninety of them, and none of them should depend on a third
 * party staying up, or on a brand still being hosted there. Several well known
 * marks (OpenAI, AWS, Azure, Playwright) are no longer distributable at all, so
 * those fall back to a monogram instead of a broken image.
 */
const LOGOS = import.meta.glob("../../assets/logos/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
});

/** slug -> bundled url, keyed off the file name. */
const BY_SLUG = Object.fromEntries(
  Object.entries(LOGOS).map(([path, url]) => [path.split("/").pop().replace(".svg", ""), url])
);

/**
 * `tile` seats the mark on a near-white plate. Several brand marks are pure
 * black (GitHub, Next.js, Three.js), so on a dark surface they would vanish;
 * a light plate keeps every logo in its real colour in both themes.
 */
export default function BrandIcon({ name, slug, size = 20, tile = false, className = "" }) {
  const url = slug ? BY_SLUG[slug] : null;

  const plate = tile
    ? "grid place-items-center rounded-lg bg-white p-1.5 shadow-[0_1px_2px_rgba(15,23,41,0.12)] ring-1 ring-black/5"
    : "";

  if (!url) {
    // Monogram stand-in, sized to match the icons it sits beside.
    return (
      <span
        aria-hidden="true"
        style={{ width: size, height: size }}
        className={`grid shrink-0 place-items-center rounded-[0.3rem] font-mono text-[0.6rem] font-semibold uppercase ${
          tile ? "bg-white text-inverse ring-1 ring-black/5" : "bg-brand/12 text-brand"
        } ${className}`}
      >
        {name.replace(/[^A-Za-z0-9]/g, "").slice(0, 2)}
      </span>
    );
  }

  const img = (
    <img
      src={url}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      style={{ width: size, height: size }}
      className="shrink-0"
    />
  );

  if (!tile) return <span className={`shrink-0 ${className}`}>{img}</span>;

  return (
    <span aria-hidden="true" className={`shrink-0 ${plate} ${className}`}>
      {img}
    </span>
  );
}
