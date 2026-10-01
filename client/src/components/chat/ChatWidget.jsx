import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, RotateCcw, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { streamChat } from "../../lib/chatApi";
import RichText from "./richText";
import mascotHead from "../../assets/chat-mascot-head.webp";
import { mountMascot } from "./mascot";

const NAME = "Axiomra Assistant";

const WELCOME =
  "Hi there! I'm Axiomra Assistant. Ask me about our AI services, pricing, timelines or how we work, and I'll point you in the right direction.";

// Mascot idle routine; see the effect in ChatWidget.
const IDLE_ROUTINE = ["wave", "spin", "blink", "walk"];
const FIRST_IDLE_MS = 12000;
const IDLE_GAP_MS = 10000;

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

/** The mascot's head (face drawn on), used in the header and as the avatar. */
function BotHead({ className = "" }) {
  return (
    <img
      src={mascotHead}
      alt=""
      aria-hidden="true"
      draggable="false"
      width="96"
      height="96"
      decoding="async"
      className={className}
    />
  );
}

function TypingDots() {
  return (
    <span className="flex items-center gap-1 py-1" aria-label={`${NAME} is typing`}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="chat-typing-dot h-2 w-2 rounded-full bg-[#93C5FD]"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </span>
  );
}

function Avatar() {
  return (
    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#DBEAFE] ring-1 ring-[#93C5FD]">
      <BotHead className="h-6 w-6" />
    </span>
  );
}

/**
 * "Axiomra Assistant": an animated robot mascot in the corner that opens a
 * streaming chat panel backed by /api/chat. The mascot waves on arrival and
 * when the chat opens, hops on route changes and loops through an idle
 * routine (wave, turn, blink, walk) while the chat is closed.
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
  const mascotSlotRef = useRef(null);
  const mascotRef = useRef(null);
  const { pathname } = useLocation();
  const firstPathRef = useRef(pathname);

  useEffect(() => {
    const mascot = mountMascot(mascotSlotRef.current, { width: 80 });
    mascotRef.current = mascot;
    const greet = setTimeout(() => mascot.wave(), 600);
    return () => {
      clearTimeout(greet);
      mascot.destroy();
      mascotRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (pathname === firstPathRef.current) return;
    firstPathRef.current = pathname;
    mascotRef.current?.pageChange();
  }, [pathname]);

  // While the chat is closed the mascot runs a slow routine, one move every
  // 10s: wave, turn round, blink, walk. Opening the chat pauses it; closing
  // starts it again from the wave.
  useEffect(() => {
    if (open) return;
    let i = 0;
    let timer;
    const next = () => {
      mascotRef.current?.[IDLE_ROUTINE[i % IDLE_ROUTINE.length]]();
      i += 1;
      timer = setTimeout(next, IDLE_GAP_MS);
    };
    timer = setTimeout(next, FIRST_IDLE_MS);
    return () => clearTimeout(timer);
  }, [open]);

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
    // Clicking the mascot already hops it; greet when the chat opens.
    if (!open) mascotRef.current?.wave();
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
    <div className="chat-blue">
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
            className="fixed bottom-[9.75rem] right-4 z-50 flex h-[min(600px,calc(100svh-11.5rem))] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] shadow-[0_24px_70px_-20px_rgba(37,99,235,0.4)] sm:right-6 sm:w-[380px]"
          >
            {/* Header */}
            <header className="relative flex items-center gap-3 overflow-hidden border-b border-[#BFDBFE] bg-[#EFF6FF] px-4 py-3.5 text-assistant-ink">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#DBEAFE] ring-1 ring-[#93C5FD]">
                <BotHead className="h-9 w-9" />
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
              className="flex-1 space-y-3 overflow-y-auto overscroll-contain bg-transparent px-4 py-4 text-sm leading-relaxed"
              aria-live="polite"
            >
              <div className="flex gap-2">
                <Avatar />
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-[#1E3A8A] shadow-sm ring-1 ring-[#BFDBFE]">
                  {WELCOME}
                </div>
              </div>

              {messages.map((m, i) =>
                m.role === "user" ? (
                  <div key={i} className="flex justify-end">
                    <div className="max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-tr-sm bg-[#DBEAFE] px-3.5 py-2.5 text-assistant-ink shadow-sm">
                      {m.content}
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex gap-2">
                    <Avatar />
                    <div className="max-w-[85%] break-words rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-[#1E3A8A] shadow-sm ring-1 ring-[#BFDBFE]">
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
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeAfterNavigate}
                    className="font-semibold underline"
                  >
                    Contact the team
                  </Link>
                </div>
              )}
            </div>

            {/* Composer */}
            <form onSubmit={onSubmit} className="border-t border-[#BFDBFE] bg-[#EFF6FF] px-3 py-3">
              <div className="flex items-end gap-2 rounded-2xl border border-[#93C5FD] bg-white px-3 py-2 transition-colors focus-within:border-[#2563EB]">
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
                  className="max-h-28 min-h-[1.5rem] flex-1 resize-none bg-transparent text-sm font-medium text-[#1E3A8A] caret-[#2563EB] placeholder:text-[#1E3A8A]/50 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || busy}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-white transition hover:brightness-95 disabled:opacity-50 focus-ring"
                  aria-label="Send message"
                >
                  <ArrowUp size={16} />
                </button>
              </div>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Launcher: the mascot stays in the corner whether or not the chat is open. */}
      <button
        ref={launcherRef}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-label={open ? "Close chat" : `Chat with ${NAME}`}
        className="fixed bottom-6 right-6 z-50 rounded-2xl focus-ring"
      >
        <span ref={mascotSlotRef} className="block" />
        {unread && !open && (
          <span
            className="absolute right-0 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#ef4444] text-[11px] font-bold text-white ring-2 ring-surface"
            aria-hidden="true"
          >
            1
          </span>
        )}
      </button>
    </div>
  );
}
