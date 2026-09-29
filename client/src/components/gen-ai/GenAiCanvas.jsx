import { lazy, Suspense } from "react";
import ErrorBoundary from "../ErrorBoundary";
import useInView from "../../hooks/useInView";
import useCanvasGate from "../../lib/useCanvasGate";

const LatentCanvas = lazy(() => import("./LatentCanvas"));
const TokenFlowCanvas = lazy(() => import("./TokenFlowCanvas"));

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

/** Decorative WebGL backdrop for the Generative AI page. */
export default function GenAiCanvas({ variant = "latent", className = "" }) {
  const fallback = <StaticField className={className} />;
  const [hostRef, inView] = useInView();
  const frameloop = inView ? "always" : "never";
  // Static first (server included), WebGL after load and once near the viewport.
  const ready = useCanvasGate(inView);

  return (
    <div ref={hostRef} className={`absolute inset-0 ${className}`} aria-hidden="true">
      {ready ? (
        <ErrorBoundary fallback={fallback}>
          <Suspense fallback={fallback}>
            {variant === "tokens" ? (
              <TokenFlowCanvas frameloop={frameloop} />
            ) : (
              <LatentCanvas frameloop={frameloop} />
            )}
          </Suspense>
        </ErrorBoundary>
      ) : (
        fallback
      )}
    </div>
  );
}
