const API_URL = import.meta.env.VITE_API_URL.replace(/\/+$/, "");

/**
 * Send the visitor's new message to /api/chat and stream the reply back.
 *
 * The server keeps the conversation history itself; `conversationId` (from
 * the previous reply, or null for a new chat) is all it needs to find it.
 * `onConversation(id)` receives the id to send with the next turn, which is a
 * new one when the old conversation has expired. `onText(chunk)` is called
 * for every streamed piece; `onReplace(text)` when the server swaps the reply
 * for a canned one (a declined request).
 * Throws an Error whose message is safe to show the visitor.
 */
export async function streamChat(
  { message, conversationId },
  { onConversation, onText, onReplace, signal }
) {
  let res;
  try {
    res = await fetch(`${API_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(conversationId ? { message, conversationId } : { message }),
      signal,
    });
  } catch (err) {
    if (err.name === "AbortError") throw err;
    throw new Error("Could not reach the assistant. Check your connection and try again.");
  }

  if (!res.ok || !res.body) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.error || `The assistant is unavailable (${res.status}).`);
  }

  const id = res.headers.get("X-Conversation-Id");
  if (id) onConversation?.(id);

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    // Server-sent events are separated by a blank line; the last piece may
    // still be incomplete, so it stays in the buffer.
    const parts = buffer.split("\n\n");
    buffer = parts.pop();
    for (const part of parts) {
      const line = part.trim();
      if (!line.startsWith("data:")) continue;
      const event = JSON.parse(line.slice(5));
      if (event.type === "text") onText(event.text);
      else if (event.type === "refusal") onReplace(event.text);
      else if (event.type === "error") throw new Error(event.error);
    }
  }
}
