import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import { Navbar } from "./components/ui/navbar";
import Footer from "./components/Footer";
import BookCallModal from "./components/BookCallModal";

// The landing page is the common entry point, so it stays in the main bundle:
// splitting it would only add a round trip before first paint.
import HomePage from "./pages/HomePage";

// Every other route is split out. Without this, a visitor who only reads the
// home page still downloads every service page's components and copy.
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ServiceDetailPlaceholder = lazy(() => import("./pages/ServiceDetailPlaceholder"));
const AiDevelopmentPage = lazy(() => import("./pages/AiDevelopmentPage"));
const GenerativeAiPage = lazy(() => import("./pages/GenerativeAiPage"));
const AgenticAiPage = lazy(() => import("./pages/AgenticAiPage"));
const ComputerVisionPage = lazy(() => import("./pages/ComputerVisionPage"));
const NlpPage = lazy(() => import("./pages/NlpPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

import { SERVICES_BASE_PATH } from "./data/servicesData";
import { AI_DEVELOPMENT_SLUG } from "./data/aiDevelopmentData";
import { GENERATIVE_AI_SLUG } from "./data/generativeAiData";
import { AGENTIC_AI_SLUG } from "./data/agenticAiData";
import { COMPUTER_VISION_SLUG } from "./data/computerVisionData";
import { NLP_SLUG } from "./data/nlpData";

/** Scrolls to a hash target on route change, or to the top of a fresh page. */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      // Wait a tick for the new route's DOM to mount before measuring it.
      const raf = requestAnimationFrame(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return () => cancelAnimationFrame(raf);
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return null;
}

/**
 * Holds the viewport height while a route chunk loads, so the footer does not
 * jump up and the page does not flash a collapsed layout.
 */
function RouteFallback() {
  return <div className="min-h-[100svh] bg-surface" aria-busy="true" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="overflow-x-clip">
        <Navbar />
        <ScrollManager />
        <main>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path={SERVICES_BASE_PATH} element={<ServicesPage />} />
              <Route
                path={`${SERVICES_BASE_PATH}/${AI_DEVELOPMENT_SLUG}`}
                element={<AiDevelopmentPage />}
              />
              <Route
                path={`${SERVICES_BASE_PATH}/${GENERATIVE_AI_SLUG}`}
                element={<GenerativeAiPage />}
              />
              <Route
                path={`${SERVICES_BASE_PATH}/${AGENTIC_AI_SLUG}`}
                element={<AgenticAiPage />}
              />
              <Route
                path={`${SERVICES_BASE_PATH}/${COMPUTER_VISION_SLUG}`}
                element={<ComputerVisionPage />}
              />
              <Route path={`${SERVICES_BASE_PATH}/${NLP_SLUG}`} element={<NlpPage />} />
              <Route
                path="/service/nlp"
                element={<Navigate to={`${SERVICES_BASE_PATH}/${NLP_SLUG}`} replace />}
              />
              <Route path={`${SERVICES_BASE_PATH}/:slug`} element={<ServiceDetailPlaceholder />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <BookCallModal />
      </div>
    </BrowserRouter>
  );
}
