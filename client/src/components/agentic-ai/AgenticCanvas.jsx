import { lazy, Suspense } from "react";
import ErrorBoundary from "../ErrorBoundary";
import useInView from "../../hooks/useInView";
import useCanvasGate from "../../lib/useCanvasGate";

const AgentSwarmCanvas = lazy(() => import("./AgentSwarmCanvas"));
const ReasoningLoopCanvas = lazy(() => import("./ReasoningLoopCanvas"));

/**
 * Decides whether this device should get the WebGL field at all.
 *
 * These backdrops are decoration: on a phone or a thin laptop they cost real
 * battery and scroll smoothness for a texture nobody came here to look at, so
 * anything small, touch-first, thin on cores, or thin on memory gets the CSS
 * fallback instead. All three signals are optional in the browsers that lack
 * them, so each one only ever disqualifies a device it is sure about.
 */
function prefersStaticField() {
  const smallOrTouch =
    window.matchMedia?.("(max-width: 767px), (pointer: coarse)").matches ?? false;
  const fewCores = (navigator.hardwareConcurrency ?? 8) <= 4;
  const lowMemory = (navigator.deviceMemory ?? 8) <= 4;
  const savingData = navigator.connection?.saveData === true;

  return smallOrTouch || fewCores || lowMemory || savingData;
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

const allowFancyField = () => !prefersStaticField();

/** Decorative WebGL backdrop for the Agentic AI page. */
export default function AgenticCanvas({ variant = "swarm", className = "" }) {
  const fallback = <StaticField variant={variant} className={className} />;
  const [hostRef, inView] = useInView();
  const frameloop = inView ? "always" : "never";
  // Static first (server included), WebGL after load and once near the viewport.
  const ready = useCanvasGate(inView, allowFancyField);

  return (
    <div ref={hostRef} className={`absolute inset-0 ${className}`} aria-hidden="true">
      {ready ? (
        <ErrorBoundary fallback={fallback}>
          <Suspense fallback={fallback}>
            {variant === "loop" ? (
              <ReasoningLoopCanvas frameloop={frameloop} />
            ) : (
              <AgentSwarmCanvas frameloop={frameloop} />
            )}
          </Suspense>
        </ErrorBoundary>
      ) : (
        fallback
      )}
    </div>
  );
}
