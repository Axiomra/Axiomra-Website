import { useEffect, useRef } from "react";
import useInView from "../hooks/useInView";

/**
 * A 2D particle field: drifting dots that draw a line to every neighbour inside
 * a radius, so the field reads as a live network rather than a static texture.
 *
 * Deliberately canvas 2D and not three.js. It sits on top of a photo as a thin
 * decorative layer, so the WebGL context (and its memory) would cost far more
 * than the effect is worth. The loop parks itself off screen and never starts
 * at all when the visitor asked for reduced motion.
 */
export default function ConnectingDots({
  className = "",
  density = 9000,
  maxDots = 90,
  linkDistance = 150,
  color = "20,216,196",
  opacity = 0.55,
}) {
  const canvasRef = useRef(null);
  const [hostRef, inView] = useInView();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !inView) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    let dots = [];
    let width = 0;
    let height = 0;
    let frame = 0;

    const seed = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (!width || !height) return;

      // Drawing in CSS pixels on a device-pixel-sized buffer keeps the dots and
      // the hairlines crisp on retina screens instead of soft and smeared.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(maxDots, Math.round((width * height) / (density * 10)));
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 1.2 + Math.random() * 1.6,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const dot of dots) {
        dot.x += dot.vx;
        dot.y += dot.vy;
        // Bounce rather than wrap, so no dot ever pops across the panel.
        if (dot.x < 0 || dot.x > width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > height) dot.vy *= -1;
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < dots.length; i += 1) {
        for (let j = i + 1; j < dots.length; j += 1) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist > linkDistance) continue;
          // Links fade out as the pair drifts apart, so nothing snaps on or off.
          const alpha = (1 - dist / linkDistance) * opacity * 0.6;
          ctx.strokeStyle = `rgba(${color},${alpha})`;
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.stroke();
        }
      }

      ctx.fillStyle = `rgba(${color},${opacity})`;
      for (const dot of dots) {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fill();
      }

      frame = requestAnimationFrame(draw);
    };

    seed();
    frame = requestAnimationFrame(draw);

    const observer = new ResizeObserver(seed);
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [inView, density, maxDots, linkDistance, color, opacity]);

  return (
    <div ref={hostRef} className={`absolute inset-0 ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
