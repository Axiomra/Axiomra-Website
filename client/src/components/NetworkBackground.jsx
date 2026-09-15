import { lazy, Suspense, useState } from "react";
import ErrorBoundary from "./ErrorBoundary";
import useInView from "../hooks/useInView";

// three.js lives behind a dynamic import so it never blocks first paint.
const NetworkCanvas = lazy(() => import("./NetworkCanvas"));
const FooterCanvas = lazy(() => import("./FooterCanvas"));
const ContactCanvas = lazy(() => import("./ContactCanvas"));
const AboutCanvas = lazy(() => import("./AboutCanvas"));
const TechCanvas = lazy(() => import("./TechCanvas"));
const PortfolioCanvas = lazy(() => import("./PortfolioCanvas"));
const IndustriesCanvas = lazy(() => import("./IndustriesCanvas"));
const FashionCanvas = lazy(() => import("./FashionCanvas"));
const MarketingCanvas = lazy(() => import("./MarketingCanvas"));
const SupplyChainCanvas = lazy(() => import("./SupplyChainCanvas"));
const RealEstateCanvas = lazy(() => import("./RealEstateCanvas"));
const SportsCanvas = lazy(() => import("./SportsCanvas"));
const EducationCanvas = lazy(() => import("./EducationCanvas"));
const FinanceCanvas = lazy(() => import("./FinanceCanvas"));
const InsuranceCanvas = lazy(() => import("./InsuranceCanvas"));
const RetailCanvas = lazy(() => import("./RetailCanvas"));
const LegalCanvas = lazy(() => import("./LegalCanvas"));
const HealthcareCanvas = lazy(() => import("./HealthcareCanvas"));
const TransportationCanvas = lazy(() => import("./TransportationCanvas"));

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

export default function NetworkBackground({ className = "", count = 140, variant = "network" }) {
  const [webgl] = useState(() => supportsWebGL());
  // The CSS reduced-motion rule can't reach a WebGL render loop, so opt out of the animated field here instead.
  const [reducedMotion] = useState(
    () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
  );

  const fallback = <StaticNetworkBackground className={className} />;
  // Parks the render loop while the canvas is off screen. The footer canvas is
  // mounted on every route, so without this it burns a frame budget forever.
  const [hostRef, inView] = useInView();
  const frameloop = inView ? "always" : "never";

  return (
    <div ref={hostRef} className={`absolute inset-0 ${className}`} aria-hidden="true">
      {webgl && !reducedMotion ? (
        <ErrorBoundary fallback={fallback}>
          <Suspense fallback={fallback}>
            {variant === "wave" ? (
              <FooterCanvas frameloop={frameloop} />
            ) : variant === "orbit" ? (
              <ContactCanvas frameloop={frameloop} />
            ) : variant === "about" ? (
              <AboutCanvas frameloop={frameloop} />
            ) : variant === "tech" ? (
              <TechCanvas frameloop={frameloop} />
            ) : variant === "portfolio" ? (
              <PortfolioCanvas frameloop={frameloop} />
            ) : variant === "industries" ? (
              <IndustriesCanvas frameloop={frameloop} />
            ) : variant === "fashion" ? (
              <FashionCanvas frameloop={frameloop} />
            ) : variant === "marketing" ? (
              <MarketingCanvas frameloop={frameloop} />
            ) : variant === "supply-chain" ? (
              <SupplyChainCanvas frameloop={frameloop} />
            ) : variant === "sports" ? (
              <SportsCanvas frameloop={frameloop} />
            ) : variant === "education" ? (
              <EducationCanvas frameloop={frameloop} />
            ) : variant === "finance" ? (
              <FinanceCanvas frameloop={frameloop} />
            ) : variant === "insurance" ? (
              <InsuranceCanvas frameloop={frameloop} />
            ) : variant === "legal" ? (
              <LegalCanvas frameloop={frameloop} />
            ) : variant === "retail" ? (
              <RetailCanvas frameloop={frameloop} />
            ) : variant === "healthcare" ? (
              <HealthcareCanvas frameloop={frameloop} />
            ) : variant === "transportation" ? (
              <TransportationCanvas frameloop={frameloop} />
            ) : variant === "real-estate" ? (
              <RealEstateCanvas frameloop={frameloop} />
            ) : (
              <NetworkCanvas count={count} frameloop={frameloop} />
            )}
          </Suspense>
        </ErrorBoundary>
      ) : (
        fallback
      )}
    </div>
  );
}
