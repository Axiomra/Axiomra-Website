import logoLight from "../../assets/logo-light.webp";

/**
 * A case study photo with the Axiomra wordmark laid over its bottom-right
 * corner. The logo is an overlay, never baked into the file, so the source
 * photo stays clean and the mark can change without re-exporting images.
 *
 * `className` styles the frame (aspect, radius, ring, shadow); the photo
 * fills it. When the image carries an `imageCredit` and `credit` is on, the
 * credit is set in small text under the frame.
 *
 * `logoBaked` exists only for legacy files that already carry the mark; the
 * overlay is skipped so it never appears twice. New images must not set it.
 */
export default function BrandedImage({ image, sizes, priority = false, credit = true, className = "" }) {
  const largest = image.sources[image.sources.length - 1];
  const showCredit = credit && image.imageCredit;

  const frame = (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={image.sources[1]?.src ?? largest.src}
        srcSet={image.sources.map((s) => `${s.src} ${s.width}w`).join(", ")}
        sizes={sizes}
        width={image.width}
        height={image.height}
        alt={image.alt}
        loading={priority ? "eager" : "lazy"}
        // React 18 only forwards the lowercase attribute.
        // eslint-disable-next-line react/no-unknown-property
        fetchpriority={priority ? "high" : undefined}
        decoding="async"
        className="h-full w-full object-cover"
      />
      {/* ~10% of the frame's width, floored so it stays legible on phones. */}
      {!image.logoBaked && (
        <img
          src={logoLight}
          alt=""
          aria-hidden="true"
          width={500}
          height={91}
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute bottom-[4%] right-[4%] h-auto w-[10%] min-w-[4.5rem] select-none opacity-80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]"
        />
      )}
    </div>
  );

  if (!showCredit) return frame;

  const { photographer, site, url } = image.imageCredit;
  return (
    <figure>
      {frame}
      <figcaption className="mt-2 text-xs text-content-faint">
        Photo:{" "}
        <a href={url} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline focus-ring">
          {photographer} / {site}
        </a>
      </figcaption>
    </figure>
  );
}
