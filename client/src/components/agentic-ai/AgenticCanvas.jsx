import { lazy, Suspense, useState } from "react";
import ErrorBoundary from "../ErrorBoundary";
import useInView from "../../hooks/useInView";

const AgentSwarmCanvas = lazy(() => import("./AgentSwarmCanvas"));
const ReasoningLoopCanvas = lazy(() => import("./ReasoningLoopCanvas"));

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function StaticField({ variant, className = "" }) {
  const swarm =
    "radial-gradient(30% 30% at 50% 50%, rgba(20,216,196,0.28), transparent 68%), radial-gradient(circle, rgba(120,139,227,0.5) 1.4px, transparent 1.4px)";
  const loop =
    "radial-gradient(closest-side, transparent 58%, rgba(20,216,196,0.22) 60%, transparent 66%), radial-gradient(circle, rgba(120,139,227,0.4) 1.2px, transparent 1.2px)";

  return (
    <div
      className={`absolute inset-0 ${className}`}
      aria-hidden="true"
      style={{
        backgroundImage: variant === "loop" ? loop : swarm,
        backgroundSize: variant === "loop" ? "26rem 26rem, 30px 30px" : "100% 100%, 32px 32px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat, repeat",
      }}
    />
  );
}

/** Decorative WebGL backdrop for the Agentic AI page. */
export default function AgenticCanvas({ variant = "swarm", className = "" }) {
  const [webgl] = useState(supportsWebGL);
  // A CSS media query cannot reach a WebGL render loop, so the opt-out is here.
  const [reducedMotion] = useState(
    () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
  );

  const fallback = <StaticField variant={variant} className={className} />;
  const [hostRef, inView] = useInView();
  const frameloop = inView ? "always" : "never";

  if (!webgl || reducedMotion) {
    return (
      <div className={`absolute inset-0 ${className}`} aria-hidden="true">
        {fallback}
      </div>
    );
  }

  return (
    <div ref={hostRef} className={`absolute inset-0 ${className}`} aria-hidden="true">
      <ErrorBoundary fallback={fallback}>
        <Suspense fallback={fallback}>
          {variant === "loop" ? (
            <ReasoningLoopCanvas frameloop={frameloop} />
          ) : (
            <AgentSwarmCanvas frameloop={frameloop} />
          )}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
