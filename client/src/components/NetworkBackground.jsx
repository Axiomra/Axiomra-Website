import { lazy, Suspense, useState } from "react";
import ErrorBoundary from "./ErrorBoundary";

// three.js lives behind a dynamic import so it never blocks first paint.
const NetworkCanvas = lazy(() => import("./NetworkCanvas"));
const FooterCanvas = lazy(() => import("./FooterCanvas"));

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function StaticNetworkBackground({ className = "" }) {
  return (
    <div
      className={`absolute inset-0 ${className}`}
      aria-hidden="true"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(20,216,196,0.75) 3px, transparent 3px), radial-gradient(circle, rgba(120,139,227,0.6) 2px, transparent 2px)",
        backgroundSize: "60px 60px, 40px 40px",
        backgroundPosition: "0 0, 20px 20px",
      }}
    />
  );
}

/**
 * `variant` picks the field:
 *  - "network": particle cloud with proximity links (hero, CTAs)
 *  - "wave":    animated point-lattice wave (footer)
 */
export default function NetworkBackground({ className = "", count = 140, variant = "network" }) {
  const [webgl] = useState(() => supportsWebGL());
  // The CSS reduced-motion rule can't reach a WebGL render loop, so opt out
  // of the animated field here instead.
  const [reducedMotion] = useState(
    () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
  );

  const fallback = <StaticNetworkBackground className={className} />;

  return (
    <div className={`absolute inset-0 ${className}`} aria-hidden="true">
      {webgl && !reducedMotion ? (
        <ErrorBoundary fallback={fallback}>
          <Suspense fallback={fallback}>
            {variant === "wave" ? <FooterCanvas /> : <NetworkCanvas count={count} />}
          </Suspense>
        </ErrorBoundary>
      ) : (
        fallback
      )}
    </div>
  );
}
