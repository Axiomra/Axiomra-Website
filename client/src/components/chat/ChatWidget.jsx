import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, RotateCcw, X } from "lucide-react";
import { Link } from "react-router-dom";
import { streamChat } from "../../lib/chatApi";
import RichText from "./richText";

const NAME = "Axiomra Assistant";

const WELCOME =
  "Hi there! I'm Axiomra Assistant. Ask me about our AI services, pricing, timelines or how we work, and I'll point you in the right direction.";

const STORAGE_KEY = "axiomra-chat";
// The server-side conversation the transcript above belongs to. Kept for the
// same browser session as the transcript, so the two never drift apart.
const CONVERSATION_KEY = "axiomra-chat-conversation";

// Browser storage can be missing or throw (private mode, blocked site data);
// the chat must work without it.
const storage = {
  get(key) {
    try {
      return sessionStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      sessionStorage.setItem(key, value);
    } catch {
      /* ignore */
    }
  },
  remove(key) {
    try {
      sessionStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  },
};

function loadHistory() {
  try {
    const saved = JSON.parse(storage.get(STORAGE_KEY) || "[]");
    if (!Array.isArray(saved)) return [];
    // A reply cut off by a reload leaves an empty or unanswered turn at the
    // end; drop it so the next request still alternates cleanly.
    while (saved.length && (saved.at(-1).role !== "assistant" || !saved.at(-1).content)) {
      saved.pop();
    }
    return saved;
  } catch {
    return [];
  }
}

/**
 * The launcher's full-body robot. On a loop it sits down and stands back up,
 * blinks, and turns round once; the keyframes live in index.css.
 */
function Robot({ className = "" }) {
  return (
    <span className={`chat-bot-spin inline-block ${className}`}>
      <svg viewBox="0 0 48 48" className="h-full w-full overflow-visible" aria-hidden="true">
        <g className="chat-bot-legs">
          <rect x="18" y="33" width="4.5" height="10" rx="2.25" fill="currentColor" />
          <rect x="25.5" y="33" width="4.5" height="10" rx="2.25" fill="currentColor" />
        </g>
        <g className="chat-bot-upper">
          {/* Antenna */}
          <line
            x1="24"
            y1="3.5"
            x2="24"
            y2="7.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="24" cy="3" r="2" fill="currentColor" />
          {/* Head */}
          <rect x="13" y="7.5" width="22" height="15" rx="6" fill="currentColor" opacity="0.2" />
          <rect
            x="13"
            y="7.5"
            width="22"
            height="15"
            rx="6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <g className="chat-eyes">
            <circle cx="19.5" cy="14.5" r="2.2" fill="currentColor" />
            <circle cx="28.5" cy="14.5" r="2.2" fill="currentColor" />
          </g>
          <path
            d="M20.5 18.6 Q24 20.8 27.5 18.6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* Body and arms */}
          <rect x="16" y="23.5" width="16" height="11.5" rx="3.5" fill="currentColor" />
          <circle cx="24" cy="29" r="2" className="fill-assistant" />
          <rect x="11.5" y="24.5" width="3.5" height="8.5" rx="1.75" fill="currentColor" />
          <rect x="33" y="24.5" width="3.5" height="8.5" rx="1.75" fill="currentColor" />
        </g>
      </svg>
    </span>
  );
}

/** The robot face used as the assistant's avatar and in the panel header. */
function BotFace({ className = "", animated = false }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      {/* Antenna */}
      <line
        x1="20"
        y1="4.5"
        x2="20"
        y2="10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="20" cy="4" r="2.6" fill="currentColor" />
      {/* Head */}
      <rect x="6" y="10" width="28" height="22" rx="9" fill="currentColor" opacity="0.18" />
      <rect
        x="6"
        y="10"
        width="28"
        height="22"
        rx="9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Ears */}
      <rect x="2.5" y="17" width="3" height="8" rx="1.5" fill="currentColor" />
      <rect x="34.5" y="17" width="3" height="8" rx="1.5" fill="currentColor" />
      {/* Eyes */}
      <g className={animated ? "chat-eyes" : ""}>
        <circle cx="15" cy="20" r="2.8" fill="currentColor" />
        <circle cx="25" cy="20" r="2.8" fill="currentColor" />
      </g>
      {/* Smile */}
      <path
        d="M15.5 26 Q20 29.5 24.5 26"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TypingDots() {
  return (
    <span className="flex items-center gap-1 py-1" aria-label={`${NAME} is typing`}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="chat-typing-dot h-2 w-2 rounded-full bg-content-faint"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </span>
  );
}

function Avatar() {
  return (
    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-assistant text-assistant-ink">
      <BotFace className="h-[18px] w-[18px]" />
    </span>
  );
}

/**
 * "Axiomra Assistant": a floating launcher that draws the eye (pulse rings and
 * an animated robot) and opens a streaming chat panel backed by /api/chat.
 */
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(loadHistory);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [unread, setUnread] = useState(() => loadHistory().length === 0);

  const listRef = useRef(null);
  const inputRef = useRef(null);
  const launcherRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => {
    storage.set(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  // Keep the newest message in view while a reply streams in.
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, busy, error, open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    const focus = setTimeout(() => inputRef.current?.focus(), 250);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      clearTimeout(focus);
    };
  }, [open]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const toggle = () => {
    setUnread(false);
    setOpen((v) => !v);
  };

  const send = async (text) => {
    const content = text.trim();
    if (!content || busy) return;

    const history = [...messages, { role: "user", content }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setError("");
    setBusy(true);

    const controller = new AbortController();
    abortRef.current = controller;
    const setReply = (update) =>
      setMessages((list) => {
        const next = list.slice();
        const last = next[next.length - 1];
        next[next.length - 1] = { ...last, content: update(last.content) };
        return next;
      });

    try {
      // The server rebuilds the history from its own store; only the new
      // message and the conversation id travel.
      await streamChat(
        { message: content, conversationId: storage.get(CONVERSATION_KEY) },
        {
          onConversation: (id) => storage.set(CONVERSATION_KEY, id),
          signal: controller.signal,
          onText: (chunk) => setReply((prev) => prev + chunk),
          onReplace: (full) => setReply(() => full),
        }
      );
    } catch (err) {
      if (err.name === "AbortError") return;
      setError(err.message);
      // Drop the unanswered turn so a retry does not send it twice.
      setMessages(messages);
      setInput(content);
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  };

  const reset = () => {
    abortRef.current?.abort();
    storage.remove(CONVERSATION_KEY);
    setMessages([]);
    setError("");
    setBusy(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    send(input);
  };

  const onInputKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      send(input);
    }
  };

  const closeAfterNavigate = () => setOpen(false);

  return (
    <>
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog"
            aria-label={NAME}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed bottom-[5.75rem] right-4 z-50 flex h-[min(600px,calc(100svh-7.5rem))] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-line bg-surface-card shadow-[0_24px_70px_-20px_rgba(10,20,40,0.45)] sm:right-6 sm:w-[380px]"
          >
            {/* Header */}
            <header className="relative flex items-center gap-3 overflow-hidden bg-assistant px-4 py-3.5 text-assistant-ink">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/35 ring-1 ring-assistant-ink/20">
                <BotFace className="h-6 w-6" animated />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-[#22c55e] ring-2 ring-white" />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-base font-semibold leading-tight">{NAME}</h2>
                <p className="text-xs text-assistant-ink/80">Online · Replies in seconds</p>
              </div>
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-full p-1.5 text-assistant-ink/80 transition-colors hover:bg-assistant-ink/10 hover:text-assistant-ink focus-ring"
                  aria-label="Start a new conversation"
                  title="New conversation"
                >
                  <RotateCcw size={16} />
                </button>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-1.5 text-assistant-ink/80 transition-colors hover:bg-assistant-ink/10 hover:text-assistant-ink focus-ring"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </header>

            {/* Messages */}
            <div
              ref={listRef}
              className="flex-1 space-y-3 overflow-y-auto overscroll-contain bg-surface-subtle px-4 py-4 text-sm leading-relaxed"
              aria-live="polite"
            >
              <div className="flex gap-2">
                <Avatar />
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-surface-card px-3.5 py-2.5 text-content shadow-sm ring-1 ring-line">
                  {WELCOME}
                </div>
              </div>

              {messages.map((m, i) =>
                m.role === "user" ? (
                  <div key={i} className="flex justify-end">
                    <div className="max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-tr-sm bg-assistant px-3.5 py-2.5 text-assistant-ink shadow-sm">
                      {m.content}
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex gap-2">
                    <Avatar />
                    <div className="max-w-[85%] break-words rounded-2xl rounded-tl-sm bg-surface-card px-3.5 py-2.5 text-content shadow-sm ring-1 ring-line">
                      {m.content ? (
                        <RichText text={m.content} onNavigate={closeAfterNavigate} />
                      ) : (
                        <TypingDots />
                      )}
                    </div>
                  </div>
                )
              )}

              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-danger/30 bg-danger/5 px-3.5 py-2.5 text-xs text-danger"
                >
                  {error}{" "}
                  <Link
                    to="/contact"
                    onClick={closeAfterNavigate}
                    className="font-semibold underline"
                  >
                    Contact the team
                  </Link>
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={onSubmit}
              className="border-t border-line bg-surface-card px-3 pb-2 pt-3"
            >
              <div className="flex items-end gap-2 rounded-2xl border border-line bg-surface-subtle px-3 py-2 transition-colors focus-within:border-assistant">
                <label htmlFor="axiomra-chat-input" className="sr-only">
                  Message {NAME}
                </label>
                <textarea
                  id="axiomra-chat-input"
                  ref={inputRef}
                  rows={1}
                  maxLength={2000}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onInputKeyDown}
                  placeholder="Type your question..."
                  className="max-h-28 min-h-[1.5rem] flex-1 resize-none bg-transparent text-sm text-content placeholder:text-content-faint focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || busy}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-assistant text-assistant-ink transition hover:brightness-95 disabled:opacity-40 focus-ring"
                  aria-label="Send message"
                >
                  <ArrowUp size={16} />
                </button>
              </div>
              <p className="mt-1.5 text-center text-[11px] text-content-faint">
                AI answers can be imperfect.{" "}
                <Link
                  to="/contact"
                  onClick={closeAfterNavigate}
                  className="underline hover:text-content"
                >
                  Talk to a human
                </Link>
              </p>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Launcher */}
      <button
        ref={launcherRef}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-label={open ? "Close chat" : `Chat with ${NAME}`}
        className="group fixed bottom-6 right-4 z-50 h-16 w-16 rounded-full focus-ring sm:right-6"
      >
        {!open && (
          <>
            <span
              className="chat-ping absolute inset-0 rounded-full bg-assistant/50"
              aria-hidden="true"
            />
            <span
              className="chat-ping absolute inset-0 rounded-full bg-assistant/30"
              style={{ animationDelay: "1.2s" }}
              aria-hidden="true"
            />
          </>
        )}
        <span className="relative flex h-full w-full items-center justify-center rounded-full bg-assistant text-assistant-ink shadow-[0_10px_30px_-8px_rgba(0,209,209,0.75)] ring-2 ring-white/60 transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={26} />
              </motion.span>
            ) : (
              <motion.span
                key="bot"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Robot className="h-11 w-11" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
        {unread && !open && (
          <span
            className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#ef4444] text-[11px] font-bold text-white ring-2 ring-surface"
            aria-hidden="true"
          >
            1
          </span>
        )}
      </button>
    </>
  );
}
