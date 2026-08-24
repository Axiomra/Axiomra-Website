import { lazy, Suspense, useState } from "react";
import ErrorBoundary from "../ErrorBoundary";
import useInView from "../../hooks/useInView";

// three.js + drei sit behind a dynamic import so they never block first paint.
const VisionPanelsCanvas = lazy(() => import("./VisionPanelsCanvas"));

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Painted whenever WebGL is unavailable, the user asked for less motion, or the canvas throws. */
function StaticPanels({ panels }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      aria-hidden="true"
      style={{ perspective: "1200px" }}
    >
      <div className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
        {panels.map((p, i) => {
          // Four fixed stations on a ring, rendered with CSS transforms rather than a render loop.
          const angle = (i / panels.length) * 360;
          return (
            <div
              key={p.src}
              className="absolute left-1/2 top-1/2 h-[11rem] w-[17.5rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-md border border-brand/60 md:h-[13rem] md:w-[21rem]"
              style={{
                transform: `rotateY(${angle}deg) translateZ(15rem)`,
                opacity: i === 0 ? 1 : 0.55,
              }}
            >
              <img src={p.src} alt="" className="h-full w-full object-cover" loading="lazy" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Decorative WebGL carousel for the Computer Vision hero. */
export default function VisionCanvas({ panels, className = "", onActiveChange }) {
  const [webgl] = useState(supportsWebGL);
  // A CSS media query cannot reach a WebGL render loop, so the opt-out is here.
  const [reducedMotion] = useState(
    () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
  );

  const fallback = <StaticPanels panels={panels} />;
  const [hostRef, inView] = useInView();
  const frameloop = inView ? "always" : "never";

  return (
    <div ref={hostRef} className={`absolute inset-0 ${className}`} aria-hidden="true">
      {webgl && !reducedMotion ? (
        <ErrorBoundary fallback={fallback}>
          <Suspense fallback={fallback}>
            <VisionPanelsCanvas
              panels={panels}
              onActiveChange={onActiveChange}
              frameloop={frameloop}
            />
          </Suspense>
        </ErrorBoundary>
      ) : (
        fallback
      )}
    </div>
  );
}
