import { Router } from "express";
import { Agent, run, user, assistant, setTracingDisabled } from "@openai/agents";
import { z } from "zod";
import { CHAT_SYSTEM_PROMPT } from "../lib/chatKnowledge.js";
import { reserve, settle } from "../lib/chatBudget.js";
import { CHAT_MODEL } from "../lib/chatConfig.js";
import { appendTurns, loadConversation } from "../lib/chatConversations.js";
import { referenceContext } from "../rag/context.js";

const router = Router();

// Traces would be uploaded after every reply; a stateless FAQ chat does not need them.
setTracingDisabled(true);

// A visitor chat, not a document pipeline: the caps keep one conversation's
// cost bounded no matter what the browser sends.
const MAX_CHARS = 2000;

const content = z.string().trim().min(1).max(MAX_CHARS);

// The browser sends its new message and the conversationId it was given; the
// history comes from lib/chatConversations.js, never from the request.
const bodySchema = z
  .strictObject({
    conversationId: z.string().max(100).optional(),
    message: content.optional(),
    // TEMPORARY SHIM, remove by 2026-10-06: see SECURITY-DEFERRED.md,
    // "Legacy `messages` array on POST /api/chat". Not a supported path; it
    // exists only for widget bundles still open in tabs from before
    // conversationId. Only the last turn is used, and any role other than
    // "user" anywhere in it is a 400.
    messages: z
      .array(z.strictObject({ role: z.literal("user"), content }))
      .min(1)
      .optional(),
  })
  .refine(
    (b) => (b.message === undefined) !== (b.messages === undefined),
    "Send exactly one of message or messages."
  );

// Reasoning models reject sampling settings and vice versa, so the settings
// follow the configured model family.
const isReasoningModel = /^(gpt-5|o\d)/.test(CHAT_MODEL);

const MAX_OUTPUT_TOKENS = isReasoningModel ? 2048 : 700;
const INSTRUCTIONS = CHAT_SYSTEM_PROMPT;

const DAILY_CAP_REACHED =
  "Our assistant has reached its limit for today. Please try again tomorrow, " +
  "or reach us through the contact form and we'll get back to you.";

const agentConfig = (instructions) => ({
  name: "Axiomra Assistant",
  instructions,
  model: CHAT_MODEL,
  modelSettings: {
    // Replies are short by instruction; the cap bounds cost per turn.
    maxTokens: MAX_OUTPUT_TOKENS,
    // Visitor conversations are not kept on OpenAI's side.
    store: false,
    // A FAQ-style chat does not need deep reasoning, and minimal effort answers faster.
    ...(isReasoningModel ? { reasoning: { effort: "minimal" } } : { temperature: 0.3 }),
  },
});

const agent = new Agent(agentConfig(INSTRUCTIONS));

// A turn with reference material runs on its own copy of the agent; the
// static prompt stays first so OpenAI's prefix cache still hits.
const agentFor = (instructions) =>
  instructions === INSTRUCTIONS ? agent : new Agent(agentConfig(instructions));

/**
 * Body: { message, conversationId? }. The conversation's id comes back in the
 * X-Conversation-Id header; send it with the next turn to keep the context.
 *
 * Streams the assistant's reply as server-sent events:
 *   data: {"type":"text","text":"..."}   one per chunk
 *   data: {"type":"done"}
 *   data: {"type":"error","error":"..."}  after headers were already sent
 */
router.post("/", async (req, res) => {
  const parsed = bodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid chat request." });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({ error: "The assistant is not available right now." });
  }

  const { data } = parsed;
  const text = data.message ?? data.messages.at(-1).content;

  // Both checked before any header goes out, so a refusal is a plain JSON
  // error, and both fail closed: no store means no context and no spend cap.
  let conversation;
  try {
    conversation = await loadConversation(data.conversationId);
  } catch (err) {
    console.error("Chat: store unavailable:", err.message);
    return res.status(503).json({ error: "The assistant is not available right now." });
  }

  // Never throws: on any retrieval failure the turn uses the static prompt.
  const { instructions } = await referenceContext({
    base: INSTRUCTIONS,
    history: conversation.history,
    text,
  });

  let reservation;
  try {
    reservation = await reserve({
      model: CHAT_MODEL,
      inputChars:
        instructions.length +
        text.length +
        conversation.history.reduce((n, t) => n + t.content.length, 0),
      maxOutputTokens: MAX_OUTPUT_TOKENS,
    });
  } catch (err) {
    console.error("Chat: store unavailable:", err.message);
    return res.status(503).json({ error: "The assistant is not available right now." });
  }
  if (!reservation) {
    return res.status(429).json({ error: DAILY_CAP_REACHED });
  }

  res.status(200).set({
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
    // Stops proxies (nginx and friends) from buffering the whole reply.
    "X-Accel-Buffering": "no",
    "X-Conversation-Id": conversation.id,
  });
  res.flushHeaders();
  const send = (event) => res.write(`data: ${JSON.stringify(event)}\n\n`);

  // The visitor closed the widget or navigated away: stop paying for tokens.
  const controller = new AbortController();
  let finished = false;
  res.on("close", () => {
    if (!finished) controller.abort();
  });

  const input = [
    ...conversation.history.map((t) =>
      t.role === "user" ? user(t.content) : assistant(t.content)
    ),
    user(text),
  ];

  let usage;
  let reply = "";
  try {
    const result = await run(agentFor(instructions), input, {
      stream: true,
      maxTurns: 1,
      signal: controller.signal,
    });
    for await (const chunk of result.toTextStream()) {
      if (chunk) {
        reply += chunk;
        send({ type: "text", text: chunk });
      }
    }
    await result.completed;
    usage = result.state?.usage;
    if (result.error) throw result.error;
    // Only a completed exchange is remembered; a failed turn is retried by
    // the visitor and would otherwise appear twice. A store hiccup here costs
    // the next turn its context, not this reply.
    await appendTurns(conversation.id, [
      { role: "user", content: text },
      { role: "assistant", content: reply },
    ]).catch((err) => console.error("Chat: could not save conversation:", err.message));
    send({ type: "done" });
  } catch (err) {
    if (controller.signal.aborted) return;
    console.error(`Chat: OpenAI run failed${err.status ? ` (${err.status})` : ""}:`, err.message);
    send({ type: "error", error: "The assistant ran into a problem. Please try again." });
  } finally {
    finished = true;
    // Before res.end(): a serverless instance may be frozen once the
    // response is finished, and the write would never land.
    await settle(reservation, usage).catch((err) =>
      console.error("Chat: could not record spend:", err.message)
    );
    res.end();
  }
});

export default router;
