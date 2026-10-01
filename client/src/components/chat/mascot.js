/**
 * Animated robot mascot used as the chat launcher. Ported from the vendor
 * `mascot.js` drop-in: the embedded base64 PNGs now live in src/assets as
 * resized WebP files so they cache and stay out of the JS bundle.
 *
 * Idle float/breathing and blinking run on their own. Triggers return a
 * Promise that resolves when the move finishes:
 *   wave()       greeting (visitor arrives / chat opens)
 *   jump()       small hop (also fires when the mascot is clicked)
 *   pageChange() hops right and back on route change
 *   attention()  head/body wiggle to draw the eye
 */
import bodySrc from "../../assets/chat-mascot-body.webp";
import armSrc from "../../assets/chat-mascot-arm.webp";

// Artwork coordinate space; the face SVG and transform origins use it.
const W = 408;
const H = 612;
const EASE = "cubic-bezier(.3,.7,.4,1)";
const NS = "http://www.w3.org/2000/svg";

const CSS =
  `.rm{position:relative;width:var(--rm-w,160px);aspect-ratio:${W}/${H};pointer-events:auto;cursor:pointer;-webkit-tap-highlight-color:transparent}` +
  ".rm *{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;user-select:none}" +
  ".rm img{display:block;-webkit-user-drag:none}" +
  ".rm-arm{transform-origin:70.6% 56.4%}" +
  ".rm-breath{transform-origin:50% 92%}.rm-jump{transform-origin:50% 92%}" +
  ".rm-face{filter:drop-shadow(0 0 3px #4fd8ff) drop-shadow(0 0 7px rgba(79,216,255,.7))}" +
  `.rm-eyes{transform-origin:50% ${(197 / H) * 100}%}` +
  ".rm-shadow{inset:auto 18% 0 18%;height:3%;background:radial-gradient(closest-side,rgba(0,0,0,.22),transparent)}";

function el(tag, cls, parent, ns) {
  const e = ns ? document.createElementNS(ns, tag) : document.createElement(tag);
  if (cls) e.setAttribute("class", cls);
  if (parent) parent.appendChild(e);
  return e;
}

function img(cls, src, parent) {
  const e = el("img", cls, parent);
  e.src = src;
  e.alt = "";
  e.decoding = "async";
  e.draggable = false;
  return e;
}

export function mountMascot(host, { width = 160 } = {}) {
  if (!document.getElementById("rm-css")) {
    const s = el("style");
    s.id = "rm-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  const root = el("div", "rm", host);
  root.style.setProperty("--rm-w", typeof width === "number" ? `${width}px` : width);
  // Decorative: the surrounding launcher button carries the accessible name.
  root.setAttribute("aria-hidden", "true");

  const float = el("div", "", root);
  const shadow = el("div", "rm-shadow", root);
  const jump = el("div", "rm-jump", float);
  const breath = el("div", "rm-breath", jump);
  img("", bodySrc, breath);
  const arm = img("rm-arm", armSrc, breath);

  const svg = el("svg", "rm-face", breath, NS);
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  const eyes = el("g", "rm-eyes", svg, NS);
  const stroke = {
    fill: "none",
    stroke: "#8cecff",
    "stroke-width": 11,
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
  };
  for (const d of ["M152 162 L186 187 L152 212", "M205 226 H238"]) {
    const p = el("path", "", eyes, NS);
    p.setAttribute("d", d);
    for (const k in stroke) p.setAttribute(k, stroke[k]);
  }

  // No Web Animations API (jsdom, very old browsers) behaves like reduced motion.
  const still =
    typeof root.animate !== "function" ||
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const done = Promise.resolve();
  const timers = [];
  let dead = false;
  let current = null;
  let armAnim = null;

  // Exclusive "action" on the jump layer: a new move cancels the running one.
  const run = (keyframes, duration) => {
    if (still) return done;
    current?.cancel();
    current = jump.animate(keyframes, { duration, easing: EASE });
    return current.finished.catch(() => {});
  };

  if (!still) {
    const loop = { iterations: Infinity, easing: "ease-in-out" };
    float.animate(
      [
        { transform: "translateY(0)" },
        { transform: "translateY(-1.6%)" },
        { transform: "translateY(0)" },
      ],
      { ...loop, duration: 3200 }
    );
    shadow.animate(
      [
        { transform: "scaleX(1)", opacity: 0.9 },
        { transform: "scaleX(.88)", opacity: 0.65 },
        { transform: "scaleX(1)", opacity: 0.9 },
      ],
      { ...loop, duration: 3200 }
    );
    breath.animate(
      [
        { transform: "scale(1,1)" },
        { transform: "scale(1.008,1.014)" },
        { transform: "scale(1,1)" },
      ],
      { ...loop, duration: 2600 }
    );

    const blink = (double) => {
      if (dead) return;
      eyes.animate(
        [
          { transform: "scaleY(1)" },
          { transform: "scaleY(.08)", offset: 0.45 },
          { transform: "scaleY(1)" },
        ],
        { duration: 220, easing: "ease-in-out" }
      );
      timers.push(
        setTimeout(() => blink(Math.random() < 0.2), double ? 180 : 2200 + Math.random() * 3200)
      );
    };
    timers.push(setTimeout(blink, 1800));
  }

  const mascot = {
    element: root,
    wave() {
      if (still) return done;
      armAnim?.cancel();
      const r = (deg) => ({ transform: `rotate(${deg}deg)` });
      armAnim = arm.animate(
        [r(0), r(-128), r(-108), r(-136), r(-108), r(-136), r(-108), r(-132), r(0)],
        { duration: 1900, easing: "ease-in-out" }
      );
      run(
        [
          { transform: "rotate(0)" },
          { transform: "rotate(-2.5deg) translateY(-1%)", offset: 0.15 },
          { transform: "rotate(-2.5deg) translateY(-1%)", offset: 0.8 },
          { transform: "rotate(0)" },
        ],
        1900
      );
      return armAnim.finished.catch(() => {});
    },
    jump() {
      return run(
        [
          { transform: "translateY(0) scale(1,1)" },
          { transform: "translateY(0) scale(1.07,.9)", offset: 0.22 },
          { transform: "translateY(-6%) scale(.97,1.05)", offset: 0.5 },
          { transform: "translateY(0) scale(1.05,.93)", offset: 0.74 },
          { transform: "translateY(0) scale(.99,1.015)", offset: 0.88 },
          { transform: "translateY(0) scale(1,1)" },
        ],
        900
      );
    },
    pageChange() {
      return run(
        [
          { transform: "translate(0,0) rotate(0) scale(1,1)" },
          { transform: "translate(0,0) rotate(0) scale(1.07,.9)", offset: 0.1 },
          { transform: "translate(25%,-7%) rotate(6deg) scale(.97,1.05)", offset: 0.26 },
          { transform: "translate(50%,0) rotate(3deg) scale(1.06,.92)", offset: 0.4 },
          { transform: "translate(50%,0) rotate(0) scale(1,1)", offset: 0.5 },
          { transform: "translate(25%,-5%) rotate(-5deg) scale(.98,1.04)", offset: 0.7 },
          { transform: "translate(0,0) rotate(-2deg) scale(1.05,.94)", offset: 0.88 },
          { transform: "translate(0,0) rotate(0) scale(1,1)" },
        ],
        1500
      );
    },
    attention() {
      return run(
        [
          { transform: "rotate(0)" },
          { transform: "rotate(-6deg) translateY(-1.5%)", offset: 0.2 },
          { transform: "rotate(6deg) translateY(-1.5%)", offset: 0.45 },
          { transform: "rotate(-4deg)", offset: 0.7 },
          { transform: "rotate(2deg)", offset: 0.88 },
          { transform: "rotate(0)" },
        ],
        1100
      );
    },
    destroy() {
      dead = true;
      timers.forEach(clearTimeout);
      root.removeEventListener("click", onClick);
      root.remove();
    },
  };
  mascot.hello = mascot.wave;

  const onClick = () => mascot.jump();
  root.addEventListener("click", onClick);
  return mascot;
}
