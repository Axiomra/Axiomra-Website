import { Router } from "express";
import { Agent, run, user, setTracingDisabled } from "@openai/agents";
import { z } from "zod";
import { CHAT_SYSTEM_PROMPT } from "../lib/chatKnowledge.js";
import { reserve, settle } from "../lib/chatBudget.js";
import { CHAT_MODEL } from "../lib/chatConfig.js";

const router = Router();

// Traces would be uploaded after every reply; a stateless FAQ chat does not need them.
setTracingDisabled(true);

// A visitor chat, not a document pipeline: the caps keep one conversation's
// cost bounded no matter what the browser sends.
const MAX_MESSAGES = 20;
const MAX_CHARS = 2000;

// Only visitor turns are accepted. Assistant and system turns would let the
// browser put words in the model's mouth (a forged "assistant" reply or a
// replacement system prompt), so any role other than "user" is a 400.
const bodySchema = z.strictObject({
  messages: z
    .array(
      z.strictObject({
        role: z.literal("user"),
        content: z.string().trim().min(1).max(MAX_CHARS),
      })
    )
    .min(1)
    .max(MAX_MESSAGES),
});

// The model only ever sees the visitor's side of the conversation, so say so;
// otherwise it reads the gaps as the visitor repeating themselves.
const HISTORY_NOTE =
  "\n\nThe conversation you receive contains only the visitor's messages, oldest first; " +
  "your own earlier replies are omitted. Answer the latest message, using the earlier ones as context.";

// Reasoning models reject sampling settings and vice versa, so the settings
// follow the configured model family.
const isReasoningModel = /^(gpt-5|o\d)/.test(CHAT_MODEL);

const MAX_OUTPUT_TOKENS = isReasoningModel ? 2048 : 700;
const INSTRUCTIONS = CHAT_SYSTEM_PROMPT + HISTORY_NOTE;

const DAILY_CAP_REACHED =
  "Our assistant has reached its limit for today. Please try again tomorrow, " +
  "or reach us through the contact form and we'll get back to you.";

const agent = new Agent({
  name: "Axiomra Assistant",
  instructions: INSTRUCTIONS,
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

/**
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

  // Checked before any header goes out, so a refusal is a plain JSON error.
  let reservation;
  try {
    reservation = await reserve({
      model: CHAT_MODEL,
      inputChars:
        INSTRUCTIONS.length + parsed.data.messages.reduce((n, m) => n + m.content.length, 0),
      maxOutputTokens: MAX_OUTPUT_TOKENS,
    });
  } catch (err) {
    // Fail closed: without the spend counter there is no cap.
    console.error("Chat: spend store unavailable:", err.message);
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
  });
  res.flushHeaders();
  const send = (event) => res.write(`data: ${JSON.stringify(event)}\n\n`);

  // The visitor closed the widget or navigated away: stop paying for tokens.
  const controller = new AbortController();
  let finished = false;
  res.on("close", () => {
    if (!finished) controller.abort();
  });

  const input = parsed.data.messages.map((m) => user(m.content));

  let usage;
  try {
    const result = await run(agent, input, {
      stream: true,
      maxTurns: 1,
      signal: controller.signal,
    });
    for await (const text of result.toTextStream()) {
      if (text) send({ type: "text", text });
    }
    await result.completed;
    usage = result.state?.usage;
    if (result.error) throw result.error;
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
