import { lazy, Suspense, useState } from "react";
import ErrorBoundary from "../ErrorBoundary";

/* Both fields are dynamic imports: three.js and @react-three/fiber are the
   heaviest thing this page could pull in, and the page reads fine without them. */
const LatentCanvas = lazy(() => import("./LatentCanvas"));
const TokenFlowCanvas = lazy(() => import("./TokenFlowCanvas"));

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Painted whenever WebGL is unavailable, the user asked for less motion, or
    the canvas throws — same silhouette, no render loop. */
function StaticField({ className = "" }) {
  return (
    <div
      className={`absolute inset-0 ${className}`}
      aria-hidden="true"
      style={{
        backgroundImage:
          "radial-gradient(38% 38% at 50% 45%, rgba(20,216,196,0.22), transparent 70%), radial-gradient(circle, rgba(120,139,227,0.55) 1.5px, transparent 1.5px)",
        backgroundSize: "100% 100%, 34px 34px",
      }}
    />
  );
}

/**
 * Decorative WebGL backdrop for the Generative AI page.
 *
 *  - "latent": point cloud morphing between a sphere, knot, lattice and wave
 *  - "tokens": prompt streams converging on a pulsing model core
 *
 * Always `aria-hidden` — nothing here carries meaning that is not also in text.
 */
export default function GenAiCanvas({ variant = "latent", className = "" }) {
  const [webgl] = useState(supportsWebGL);
  // A CSS media query cannot reach a WebGL render loop, so the opt-out is here.
  const [reducedMotion] = useState(
    () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
  );

  const fallback = <StaticField className={className} />;

  if (!webgl || reducedMotion) {
    return (
      <div className={`absolute inset-0 ${className}`} aria-hidden="true">
        {fallback}
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 ${className}`} aria-hidden="true">
      <ErrorBoundary fallback={fallback}>
        <Suspense fallback={fallback}>
          {variant === "tokens" ? <TokenFlowCanvas /> : <LatentCanvas />}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
