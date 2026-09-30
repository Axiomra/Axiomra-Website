/**
 * Renders a post body written in the admin panel: blank lines split blocks,
 * "## " starts a heading, lines starting "- " form a list, anything else is a
 * paragraph. Everything goes out as text nodes, never as HTML.
 */
function parse(content) {
  return String(content || "")
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith("### ")) return { type: "h3", text: block.slice(4) };
      if (block.startsWith("## ")) return { type: "h2", text: block.slice(3) };
      const lines = block.split("\n").map((l) => l.trim());
      if (lines.every((l) => l.startsWith("- "))) {
        return { type: "ul", items: lines.map((l) => l.slice(2)) };
      }
      return { type: "p", text: block };
    });
}

export default function BlogContent({ content }) {
  return (
    <div className="space-y-5 text-lg leading-relaxed text-content-dim">
      {parse(content).map((b, i) => {
        if (b.type === "h2") {
          return (
            <h2 key={i} className="pt-4 font-display text-2xl font-semibold text-content">
              {b.text}
            </h2>
          );
        }
        if (b.type === "h3") {
          return (
            <h3 key={i} className="pt-2 font-display text-xl font-semibold text-content">
              {b.text}
            </h3>
          );
        }
        if (b.type === "ul") {
          return (
            <ul key={i} className="list-disc space-y-2 pl-6">
              {b.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="whitespace-pre-line">
            {b.text}
          </p>
        );
      })}
    </div>
  );
}
