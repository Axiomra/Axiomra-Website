import { useEffect, useRef } from "react";

/**
 * Spam signals sent with a contact submission. The server silently drops a
 * submission whose honeypot has a value or whose form was filled in faster
 * than a person could (server/routes/contact.js).
 *
 * Pair with <HoneypotField inputRef={honeypotRef} /> inside the form.
 */
export function useSpamGuard() {
  const honeypotRef = useRef(null);
  const openedAt = useRef(0);

  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  /** Extra payload fields for the submission. */
  const signals = () => ({
    website: honeypotRef.current?.value ?? "",
    elapsedMs: Date.now() - openedAt.current,
  });

  /** Starts the clock over after a successful submit resets the form. */
  const restart = () => {
    openedAt.current = Date.now();
  };

  return { honeypotRef, signals, restart };
}
