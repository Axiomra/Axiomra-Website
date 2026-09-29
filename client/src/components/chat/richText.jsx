import { Fragment } from "react";
import { Link } from "react-router-dom";

// **bold**, an email address, or a site path such as /contact.
const TOKEN_RE = /(\*\*[^*]+\*\*|[\w.+-]+@[\w-]+\.[\w.]+|(?<![\w/])\/[a-z0-9][a-z0-9\-/]*)/gi;

function inline(text, onNavigate) {
  return text.split(TOKEN_RE).map((part, i) => {
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(part)) {
      return (
        <a
          key={i}
          href={`mailto:${part}`}
          className="font-medium text-brand underline underline-offset-2"
        >
          {part}
        </a>
      );
    }
    if (part.startsWith("/") && part.length > 1) {
      // A trailing full stop belongs to the sentence, not the path.
      const path = part.replace(/[/-]+$/, "");
      return (
        <Link
          key={i}
          to={path}
          onClick={onNavigate}
          className="font-medium text-brand underline underline-offset-2"
        >
          {path}
        </Link>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

/**
 * Renders the assistant's plain-text replies: paragraphs, "- " bullet lists,
 * **bold**, email addresses and internal links. Deliberately not a Markdown
 * parser; the system prompt keeps replies to this subset.
 */
export default function RichText({ text, onNavigate }) {
  const blocks = [];
  let list = null;

  for (const raw of text.split("\n")) {
    const line = raw.trim();
    const bullet = /^[-*•]\s+(.*)$/.exec(line);
    if (bullet) {
      if (!list) blocks.push((list = { type: "list", items: [] }));
      list.items.push(bullet[1]);
      continue;
    }
    list = null;
    if (line) blocks.push({ type: "p", text: line });
  }

  return blocks.map((block, i) =>
    block.type === "list" ? (
      <ul key={i} className="my-1.5 list-disc space-y-1 pl-5 first:mt-0 last:mb-0">
        {block.items.map((item, j) => (
          <li key={j}>{inline(item, onNavigate)}</li>
        ))}
      </ul>
    ) : (
      <p key={i} className="my-1.5 first:mt-0 last:mb-0">
        {inline(block.text, onNavigate)}
      </p>
    )
  );
}
