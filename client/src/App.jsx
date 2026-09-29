import { Suspense, lazy, useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import { Navbar } from "./components/ui/navbar";
import Footer from "./components/Footer";
import BookCallModal from "./components/BookCallModal";
import ErrorBoundary from "./components/ErrorBoundary";
import RouteErrorBoundary from "./components/RouteErrorBoundary";
import { RenderedPagesContext } from "./seo/prerender-context";
import { afterLoadIdle } from "./lib/idle";

const pageModules = import.meta.glob(["./pages/*.jsx", "!./pages/*.test.jsx"]);

/**
 * A lazily loaded page that, during the prerender, reports its source file so
 * scripts/prerender.mjs can modulepreload its chunks. Without that the browser
 * only discovers the chunk after the entry bundle has run.
 */
function page(name) {
  const Lazy = lazy(pageModules[`./pages/${name}.jsx`]);
  function Page(props) {
    useContext(RenderedPagesContext)?.add(`src/pages/${name}.jsx`);
    return <Lazy {...props} />;
  }
  Page.displayName = name;
  return Page;
}

// Every route is split out, the landing page included: first paint comes from
// the prerendered HTML, so its chunk only gates hydration, and keeping it out
// of the entry spares every other route its twenty sections.
const HomePage = page("HomePage");
const ServicesPage = page("ServicesPage");
const ServiceDetailPlaceholder = page("ServiceDetailPlaceholder");
const AiDevelopmentPage = page("AiDevelopmentPage");
const GenerativeAiPage = page("GenerativeAiPage");
const AgenticAiPage = page("AgenticAiPage");
const ComputerVisionPage = page("ComputerVisionPage");
const NlpPage = page("NlpPage");
const ContactPage = page("ContactPage");
const AboutPage = page("AboutPage");
const TechStackPage = page("TechStackPage");
const FaqsPage = page("FaqsPage");
const PortfolioPage = page("PortfolioPage");
const CaseStudyPage = page("CaseStudyPage");
const IndustriesPage = page("IndustriesPage");
const IndustryDetailPlaceholder = page("IndustryDetailPlaceholder");
const FashionPage = page("FashionPage");
const MarketingPage = page("MarketingPage");
const SupplyChainPage = page("SupplyChainPage");
const RealEstatePage = page("RealEstatePage");
const SportsPage = page("SportsPage");
const FinancePage = page("FinancePage");
const InsurancePage = page("InsurancePage");
const HealthcarePage = page("HealthcarePage");
const EducationPage = page("EducationPage");
const LegalPage = page("LegalPage");
const RetailPage = page("RetailPage");
const TransportationPage = page("TransportationPage");
const NotFoundPage = page("NotFoundPage");

// The admin panel shares nothing with the marketing site: its own chrome, its
// own auth provider, its own table libraries. Splitting it here keeps all of
// that out of the bundle a normal visitor downloads.
const AdminLeadsPage = lazy(() => import("./pages/admin/AdminLeadsPage"));
const AdminLoginPage = lazy(() => import("./pages/admin/AdminLoginPage"));
const AdminForgotPasswordPage = lazy(() => import("./pages/admin/AdminForgotPasswordPage"));
const AdminResetPasswordPage = lazy(() => import("./pages/admin/AdminResetPasswordPage"));

import AdminAuthProvider from "./admin/AdminAuthProvider";
import AdminGuard from "./admin/AdminGuard";

import {
  SERVICES_BASE_PATH,
  ABOUT_PATH,
  TECH_PATH,
  FAQS_PATH,
  PORTFOLIO_PATH,
  CASE_STUDIES_PATH,
  INDUSTRIES_PATH,
  AI_DEVELOPMENT_SLUG,
  GENERATIVE_AI_SLUG,
  AGENTIC_AI_SLUG,
  COMPUTER_VISION_SLUG,
  NLP_SLUG,
} from "./routes.constants";

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

/**
 * Lifts the prerender gate (src/seo/prerenderGate.js). It sits after <Routes>
 * inside the same Suspense boundary, so it commits together with the lazy page
 * and its effect runs after the page's GSAP layout effects have put their
 * targets in their start state.
 */
function HydratedMark() {
  useEffect(() => {
    document.documentElement.classList.add("hydrated");
  }, []);
  return null;
}

const ChatWidget = lazy(() => import("./components/chat/ChatWidget"));

/**
 * Axiomra Assistant. Loaded once the page is idle so the widget and
 * framer-motion never compete with first paint, and never prerendered (it
 * starts as null on the server and during hydration).
 */
function DeferredChat() {
  const [ready, setReady] = useState(false);
  useEffect(() => afterLoadIdle(() => setReady(true)), []);
  if (!ready) return null;
  // A failed chunk here just means no chat, not a blank site.
  return (
    <ErrorBoundary fallback={null}>
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
    </ErrorBoundary>
  );
}

/** The public marketing site: navbar, footer, the call modal and the chat. */
function SiteRoutes() {
  const { pathname } = useLocation();
  return (
    <div className="overflow-x-clip">
      <Navbar />
      <ScrollManager />
      <main>
        <RouteErrorBoundary resetKey={pathname} pending={<RouteFallback />}>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path={ABOUT_PATH} element={<AboutPage />} />
              <Route path={TECH_PATH} element={<TechStackPage />} />
              <Route path={FAQS_PATH} element={<FaqsPage />} />
              <Route path={PORTFOLIO_PATH} element={<PortfolioPage />} />
              <Route path={`${CASE_STUDIES_PATH}/:slug`} element={<CaseStudyPage />} />
              <Route path={INDUSTRIES_PATH} element={<IndustriesPage />} />
              {/* Built industry pages go above the :slug fallback. */}
              <Route path={`${INDUSTRIES_PATH}/fashion`} element={<FashionPage />} />
              <Route path={`${INDUSTRIES_PATH}/marketing`} element={<MarketingPage />} />
              <Route path={`${INDUSTRIES_PATH}/supply-chain`} element={<SupplyChainPage />} />
              <Route path={`${INDUSTRIES_PATH}/real-estate`} element={<RealEstatePage />} />
              <Route path={`${INDUSTRIES_PATH}/sports`} element={<SportsPage />} />
              <Route path={`${INDUSTRIES_PATH}/finance`} element={<FinancePage />} />
              <Route path={`${INDUSTRIES_PATH}/insurance`} element={<InsurancePage />} />
              <Route path={`${INDUSTRIES_PATH}/education`} element={<EducationPage />} />
              <Route path={`${INDUSTRIES_PATH}/retail`} element={<RetailPage />} />
              <Route path={`${INDUSTRIES_PATH}/healthcare`} element={<HealthcarePage />} />
              <Route path={`${INDUSTRIES_PATH}/legal`} element={<LegalPage />} />
              <Route path={`${INDUSTRIES_PATH}/transportation`} element={<TransportationPage />} />
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
              {/* Unknown URLs. Vercel serves these with a real 404 status via
                dist/404.html; see scripts/generate-sitemap.mjs. */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <HydratedMark />
          </Suspense>
        </RouteErrorBoundary>
      </main>
      <Footer />
      <BookCallModal />
      <DeferredChat />
    </div>
  );
}

/**
 * The admin panel. Deliberately outside the site chrome, since the marketing navbar
 * and the "Book a call" modal have no business on an internal tool.
 *
 * AdminGuard only decides what to render; the actual protection is the JWT
 * check on every /api/leads request. Removing the guard in devtools reveals an
 * empty table, not the data.
 */
function AdminRoutes() {
  const { pathname } = useLocation();
  return (
    <AdminAuthProvider>
      <RouteErrorBoundary resetKey={pathname} pending={<RouteFallback />}>
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
      </RouteErrorBoundary>
    </AdminAuthProvider>
  );
}

/** Every route, without a router. The prerender wraps it in a StaticRouter. */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="*" element={<SiteRoutes />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
