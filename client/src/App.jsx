import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { Navbar } from "./components/ui/navbar";
import Footer from "./components/Footer";
import BookCallModal from "./components/BookCallModal";

import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPlaceholder from "./pages/ServiceDetailPlaceholder";
import AiDevelopmentPage from "./pages/AiDevelopmentPage";
import GenerativeAiPage from "./pages/GenerativeAiPage";
import ContactPage from "./pages/ContactPage";
import { SERVICES_BASE_PATH } from "./data/servicesData";
import { AI_DEVELOPMENT_SLUG } from "./data/aiDevelopmentData";
import { GENERATIVE_AI_SLUG } from "./data/generativeAiData";

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

export default function App() {
  return (
    <BrowserRouter>
      {/* `clip`, not `hidden`: overflow-x:hidden makes this div a scroll
          container, which silently breaks every `position: sticky` inside it
          (the sticky element then resolves against a container that never
          scrolls). `clip` cuts the horizontal overflow exactly the same way
          without creating a scrollport. */}
      <div className="overflow-x-clip">
        <Navbar />
        <ScrollManager />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path={SERVICES_BASE_PATH} element={<ServicesPage />} />
            {/* Built-out detail pages sit ahead of the placeholder; the router
                ranks the static segment above `:slug` regardless of order, but
                listing them first keeps the intent readable. */}
            <Route
              path={`${SERVICES_BASE_PATH}/${AI_DEVELOPMENT_SLUG}`}
              element={<AiDevelopmentPage />}
            />
            <Route
              path={`${SERVICES_BASE_PATH}/${GENERATIVE_AI_SLUG}`}
              element={<GenerativeAiPage />}
            />
            <Route path={`${SERVICES_BASE_PATH}/:slug`} element={<ServiceDetailPlaceholder />} />
          </Routes>
        </main>
        <Footer />
        <BookCallModal />
      </div>
    </BrowserRouter>
  );
}
