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
const AboutPage = lazy(() => import("./pages/AboutPage"));
const TechStackPage = lazy(() => import("./pages/TechStackPage"));
const FaqsPage = lazy(() => import("./pages/FaqsPage"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage"));
const IndustriesPage = lazy(() => import("./pages/IndustriesPage"));
const IndustryDetailPlaceholder = lazy(() => import("./pages/IndustryDetailPlaceholder"));
const FashionPage = lazy(() => import("./pages/FashionPage"));
const MarketingPage = lazy(() => import("./pages/MarketingPage"));
const SupplyChainPage = lazy(() => import("./pages/SupplyChainPage"));
const RealEstatePage = lazy(() => import("./pages/RealEstatePage"));
const SportsPage = lazy(() => import("./pages/SportsPage"));
const FinancePage = lazy(() => import("./pages/FinancePage"));
const EducationPage = lazy(() => import("./pages/EducationPage"));

// The admin panel shares nothing with the marketing site — its own chrome, its
// own auth provider, its own table libraries. Splitting it here keeps all of
// that out of the bundle a normal visitor downloads.
const AdminLeadsPage = lazy(() => import("./pages/admin/AdminLeadsPage"));
const AdminLoginPage = lazy(() => import("./pages/admin/AdminLoginPage"));
const AdminForgotPasswordPage = lazy(() => import("./pages/admin/AdminForgotPasswordPage"));
const AdminResetPasswordPage = lazy(() => import("./pages/admin/AdminResetPasswordPage"));

import AdminAuthProvider from "./admin/AdminAuthProvider";
import AdminGuard from "./admin/AdminGuard";

import { SERVICES_BASE_PATH } from "./data/servicesData";
import { ABOUT_PATH } from "./data/aboutData";
import { TECH_PATH } from "./data/techStackData";
import { FAQS_PATH } from "./data/faqsData";
import { PORTFOLIO_PATH } from "./data/portfolioData";
import { INDUSTRIES_PATH } from "./data/industriesData";
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

/** The public marketing site: navbar, footer and the call modal. */
function SiteRoutes() {
  return (
    <div className="overflow-x-clip">
      <Navbar />
      <ScrollManager />
      <main>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path={ABOUT_PATH} element={<AboutPage />} />
            <Route path={TECH_PATH} element={<TechStackPage />} />
            <Route path={FAQS_PATH} element={<FaqsPage />} />
            <Route path={PORTFOLIO_PATH} element={<PortfolioPage />} />
            <Route path={INDUSTRIES_PATH} element={<IndustriesPage />} />
            {/* Built industry pages go above the :slug fallback. */}
            <Route path={`${INDUSTRIES_PATH}/fashion`} element={<FashionPage />} />
            <Route path={`${INDUSTRIES_PATH}/marketing`} element={<MarketingPage />} />
            <Route path={`${INDUSTRIES_PATH}/supply-chain`} element={<SupplyChainPage />} />
            <Route path={`${INDUSTRIES_PATH}/real-estate`} element={<RealEstatePage />} />
            <Route path={`${INDUSTRIES_PATH}/sports`} element={<SportsPage />} />
            <Route path={`${INDUSTRIES_PATH}/finance`} element={<FinancePage />} />
            <Route path={`${INDUSTRIES_PATH}/education`} element={<EducationPage />} />
            <Route path={`${INDUSTRIES_PATH}/:slug`} element={<IndustryDetailPlaceholder />} />
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
  );
}

/**
 * The admin panel. Deliberately outside the site chrome — the marketing navbar
 * and the "Book a call" modal have no business on an internal tool.
 *
 * AdminGuard only decides what to render; the actual protection is the JWT
 * check on every /api/leads request. Removing the guard in devtools reveals an
 * empty table, not the data.
 */
function AdminRoutes() {
  return (
    <AdminAuthProvider>
      <Suspense fallback={<RouteFallback />}>
        {/* Paths here are relative to the parent's /admin/* match. An absolute
            "/admin/login" would be matched against the leftover "login" and
            never hit, leaving a blank page. */}
        <Routes>
          <Route path="login" element={<AdminLoginPage />} />
          <Route path="forgot-password" element={<AdminForgotPasswordPage />} />
          <Route path="reset-password" element={<AdminResetPasswordPage />} />
          <Route
            index
            element={
              <AdminGuard>
                <AdminLeadsPage />
              </AdminGuard>
            }
          />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </Suspense>
    </AdminAuthProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="*" element={<SiteRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}
