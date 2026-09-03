/**
 * A very small markdown subset for the Remarks column.
 *
 * Notes get written like notes: a bolded name, an underlined follow-up date, a
 * couple of bullets. Storing that as HTML would mean sanitising a rich-text
 * payload on every write and in the CSV export and the notification emails.
 * Storing markers instead keeps `remarks` a plain string end to end — the
 * server's tag stripper still applies, the CSV is still readable, and the
 * formatting is only interpreted here at render time.
 *
 * Supported: **bold**, _italic_, __underline__, `- ` bullets, `1. ` numbers.
 */

const INLINE_RE = /\*\*([^*\n]+)\*\*|__([^_\n]+)__|_([^_\n]+)_/g;

/** Parse the inline markers of one line into React nodes. */
function inline(line, keyBase) {
  const nodes = [];
  let last = 0;
  let match;
  let n = 0;

  INLINE_RE.lastIndex = 0;
  while ((match = INLINE_RE.exec(line)) !== null) {
    if (match.index > last) nodes.push(line.slice(last, match.index));

    if (match[1] !== undefined) {
      nodes.push(
        <strong key={`${keyBase}-b${n}`} className="font-semibold text-content">
          {match[1]}
        </strong>
      );
    } else if (match[2] !== undefined) {
      nodes.push(
        <u key={`${keyBase}-u${n}`} className="underline decoration-accent/60 underline-offset-2">
          {match[2]}
        </u>
      );
    } else {
      nodes.push(<em key={`${keyBase}-i${n}`}>{match[3]}</em>);
    }

    n += 1;
    last = INLINE_RE.lastIndex;
  }

  if (last < line.length) nodes.push(line.slice(last));
  return nodes.length ? nodes : line;
}

const BULLET_RE = /^\s*[-*]\s+(.*)$/;
const NUMBER_RE = /^\s*\d+[.)]\s+(.*)$/;

/**
 * Render marked-up text.
 *
 * Rendered as <div>s rather than <ul>/<ol> on purpose: this sits inside a
 * clickable cell, and a list is not valid phrasing content there. The bullets
 * are drawn, so the semantics lost are only the ones a screen reader would get
 * from the raw text anyway.
 */
export default function RichTextView({ text, clamp = false, className = "" }) {
  const value = String(text ?? "");
  if (!value) return null;

  const lines = value.split("\n");

  return (
    <div className={`${clamp ? "line-clamp-3" : ""} space-y-0.5 ${className}`}>
      {lines.map((line, i) => {
        const bullet = BULLET_RE.exec(line);
        if (bullet) {
          return (
            <div key={i} className="flex gap-1.5">
              <span aria-hidden="true" className="mt-[0.15em] shrink-0 text-accent">
                •
              </span>
              <span className="min-w-0 break-words">{inline(bullet[1], `l${i}`)}</span>
            </div>
          );
        }

        const numbered = NUMBER_RE.exec(line);
        if (numbered) {
          return (
            <div key={i} className="flex gap-1.5">
              <span aria-hidden="true" className="shrink-0 tabular-nums text-content-faint">
                {line.trim().split(/[.)]/)[0]}.
              </span>
              <span className="min-w-0 break-words">{inline(numbered[1], `l${i}`)}</span>
            </div>
          );
        }

        // A blank line is a paragraph break, not a collapsed nothing.
        if (!line.trim()) return <div key={i} className="h-2" />;

        return (
          <div key={i} className="break-words">
            {inline(line, `l${i}`)}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Apply a formatting marker to a textarea's current selection.
 * Returns the new text plus where the caret should land, so the caller can
 * restore the selection after React re-renders the value.
 */
export function applyFormat(text, start, end, kind) {
  const selected = text.slice(start, end);

  if (kind === "bullet" || kind === "number") {
    const lineStart = text.lastIndexOf("\n", start - 1) + 1;
    const lineEnd = end === start ? text.indexOf("\n", start) : end;
    const stop = lineEnd === -1 ? text.length : lineEnd;
    const block = text.slice(lineStart, stop) || "";

    const marked = block
      .split("\n")
      .map((line, i) => {
        const bare = line.replace(BULLET_RE, "$1").replace(NUMBER_RE, "$1");
        return kind === "bullet" ? `- ${bare}` : `${i + 1}. ${bare}`;
      })
      .join("\n");

    const next = text.slice(0, lineStart) + marked + text.slice(stop);
    return { text: next, start: lineStart, end: lineStart + marked.length };
  }

  const marker = kind === "bold" ? "**" : kind === "underline" ? "__" : "_";
  const body = selected || (kind === "bold" ? "bold" : kind === "underline" ? "underline" : "italic");
  const next = text.slice(0, start) + marker + body + marker + text.slice(end);
  return {
    text: next,
    start: start + marker.length,
    end: start + marker.length + body.length,
  };
}
