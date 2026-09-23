import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import useInView from "../../hooks/useInView";

const INITIAL = "1001101100101110010110100".split("");
const CELLS = INITIAL.length;

const randomCell = () => Math.floor(Math.random() * CELLS);

function twoCells() {
  const a = randomCell();
  let b = randomCell();
  while (b === a) b = randomCell();
  return [a, b];
}

/**
 * 5x5 grid of binary digits for the page margin. While on screen, one or two
 * digits flip every couple of seconds and the two highlighted cells wander.
 */
export default function BinaryGrid({ className = "" }) {
  const [ref, inView] = useInView({ rootMargin: "0px" });
  const reduced = useReducedMotion();
  const [digits, setDigits] = useState(INITIAL);
  const [[primary, warm], setHot] = useState([7, 18]);
  const active = inView && !reduced;

  useEffect(() => {
    if (!active) return undefined;

    let flipTimer;
    const flip = () => {
      setDigits((prev) => {
        const next = prev.slice();
        const count = Math.random() < 0.5 ? 1 : 2;
        for (let n = 0; n < count; n++) {
          const i = randomCell();
          next[i] = next[i] === "1" ? "0" : "1";
        }
        return next;
      });
      flipTimer = setTimeout(flip, 1500 + Math.random() * 1000);
    };
    flipTimer = setTimeout(flip, 1500 + Math.random() * 1000);
    const moveTimer = setInterval(() => setHot(twoCells()), 4200);

    return () => {
      clearTimeout(flipTimer);
      clearInterval(moveTimer);
    };
  }, [active]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-active={inView || undefined}
      className={`cs-decor pointer-events-none absolute grid select-none grid-cols-[repeat(5,auto)] font-mono text-base font-light ${className}`}
    >
      {digits.map((d, i) => (
        <span
          key={i}
          className={`grid h-8 w-7 scale-y-125 place-items-center transition-colors duration-500 ${
            i === primary ? "text-brand" : i === warm ? "text-gold" : "text-content-faint/70"
          }`}
        >
          {/* Keyed on the digit so a flip remounts it and replays the fade. */}
          <span key={d} className="cs-flip inline-block">
            {d}
          </span>
        </span>
      ))}
    </div>
  );
}
