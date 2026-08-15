import { useEffect, useRef, useState, type FocusEvent } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import logoLight from "@/assets/logo-light.webp";
import ThemeToggle from "@/components/ThemeToggle";

/**
 * The bar itself is a brand surface: it stays dark in BOTH themes, which is
 * why it uses `inverse-*` tokens. The mega-menu panel is a content surface,
 * so that one does follow the theme.
 */

const serviceItems = [
  { label: "AI Development", description: "Custom LLM-powered web & mobile products", href: "#services" },
  { label: "Generative AI", description: "Text, image & video generation at scale", href: "#services" },
  { label: "Agentic AI", description: "Autonomous agents for real workflows", href: "#services" },
  { label: "Computer Vision", description: "Detection, recognition & visual inspection", href: "#services" },
  { label: "NLP", description: "Search, chatbots & document understanding", href: "#services" },
];

const industryItems = [
  { label: "Healthcare", description: "HIPAA-safe data & diagnosis AI", href: "#industries" },
  { label: "Fashion", description: "Design-to-catalog AI pipelines", href: "#industries" },
  { label: "Finance", description: "Fraud detection, forecasting & compliance", href: "#industries" },
  { label: "Retail", description: "Personalization & demand planning", href: "#industries" },
  { label: "Education", description: "Adaptive learning & auto-grading", href: "#industries" },
];

type MegaSection = "services" | "industries";

interface MegaConfig {
  title: string;
  subtitle: string;
  eyebrow: string;
  viewAll: string;
  ctaTitle: string;
  ctaSubtitle: string;
  items: typeof serviceItems;
}

const megaConfigs: Record<MegaSection, MegaConfig> = {
  services: {
    title: "Our Services",
    subtitle: "End-to-end AI engineering — from strategy to production.",
    eyebrow: "What we do",
    viewAll: "#services",
    ctaTitle: "Need a custom solution?",
    ctaSubtitle: "Talk to our AI team and get a tailored roadmap.",
    items: serviceItems,
  },
  industries: {
    title: "Industries We Serve",
    subtitle: "Proven AI deployments across every major sector.",
    eyebrow: "Where we work",
    viewAll: "#industries",
    ctaTitle: "Already in tech?",
    ctaSubtitle: "See how we ship results across verticals.",
    items: industryItems,
  },
};

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services", mega: "services" as MegaSection },
  { label: "Industries", href: "#industries", mega: "industries" as MegaSection },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Company", href: "#process" },
];

function FullWidthDropdown({
  section,
  onNavigate,
}: {
  section: MegaSection;
  onNavigate: () => void;
}) {
  const cfg = megaConfigs[section];

  return (
    <div
      id={`mega-${section}`}
      className="absolute left-0 right-0 top-full min-h-[280px] border-t border-line bg-surface shadow-card"
    >
      <div className="mx-auto grid w-full max-w-8xl grid-cols-1 gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_1.6fr_1fr] lg:px-8">
        <div className="flex flex-col justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand">
              {cfg.eyebrow}
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-content">{cfg.title}</h3>
            <p className="mt-2 text-base leading-relaxed text-content-dim">{cfg.subtitle}</p>
          </div>
          <a
            href={cfg.viewAll}
            onClick={onNavigate}
            className="group inline-flex items-center gap-1.5 text-base font-medium text-brand hover:text-brand-strong focus-ring"
          >
            View all
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
          {cfg.items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={onNavigate}
              className="group flex flex-col gap-1 rounded-xl px-4 py-3 transition-colors hover:bg-surface-subtle focus-ring"
            >
              <span className="text-base font-semibold text-content transition-colors group-hover:text-accent">
                {item.label}
              </span>
              <span className="text-sm leading-snug text-content-faint">{item.description}</span>
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-3 rounded-2xl bg-gradient-to-br from-inverse to-inverse-soft p-6">
          <h4 className="font-display text-lg font-semibold text-inverse-fg">{cfg.ctaTitle}</h4>
          <p className="text-base leading-relaxed text-inverse-fg/60">{cfg.ctaSubtitle}</p>
          <a
            href="#contact"
            onClick={onNavigate}
            className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-full bg-gradient-to-r from-accent-vivid to-brand px-5 py-2.5 text-base font-medium text-inverse-fg transition-opacity hover:opacity-90 focus-ring"
          >
            Book a call
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

/* Shared hover treatment for the top-level links: a brand rule that wipes in
   from the left, plus a colour shift and a 1px lift. Kept as a constant so the
   <button> and <a> branches below cannot drift apart. */
const NAV_ITEM =
  "relative flex items-center gap-1 rounded-full px-4 py-2 text-base font-medium transition-all duration-300 hover:-translate-y-0.5 focus-ring " +
  "after:absolute after:bottom-0.5 after:left-4 after:right-4 after:h-[2px] after:origin-left after:scale-x-0 " +
  "after:bg-gradient-to-r after:from-accent-vivid after:to-brand after:transition-transform after:duration-300 " +
  "hover:after:scale-x-100 focus-visible:after:scale-x-100";

function DesktopNav({
  active,
  setActive,
  onNavigate,
}: {
  active: MegaSection | null;
  setActive: (s: MegaSection | null) => void;
  onNavigate: () => void;
}) {
  return (
    <nav className="hidden items-center gap-2 lg:flex">
      {NAV_LINKS.map((l) =>
        "mega" in l && l.mega ? (
          <button
            key={l.label}
            type="button"
            aria-expanded={active === l.mega}
            aria-controls={`mega-${l.mega}`}
            // Click toggles so the menu is reachable without a mouse; hover
            // still opens it for pointer users.
            onClick={() => setActive(active === l.mega ? null : l.mega!)}
            onMouseEnter={() => setActive(l.mega!)}
            className={cn(
              NAV_ITEM,
              active === l.mega
                ? "bg-inverse-fg/10 text-accent-vivid after:scale-x-100"
                : "text-inverse-fg/80 hover:text-accent-vivid"
            )}
          >
            {l.label}
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                active === l.mega && "rotate-180"
              )}
            />
          </button>
        ) : (
          <a
            key={l.label}
            href={l.href}
            onClick={onNavigate}
            className={cn(NAV_ITEM, "text-inverse-fg/80 hover:text-accent-vivid")}
          >
            {l.label}
          </a>
        )
      )}
    </nav>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);
  const [openSection, setOpenSection] = useState<MegaSection | null>(null);

  const close = () => {
    setOpen(false);
    setOpenSection(null);
  };

  return (
    <div className="flex items-center gap-2 lg:hidden">
      <ThemeToggle />
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="rounded-md p-2 text-inverse-fg transition-colors hover:bg-inverse-fg/10 focus-ring"
        aria-label="Toggle main navigation"
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {open && (
        <div
          id="mobile-nav"
          className="absolute inset-x-0 top-full border-b border-inverse-fg/10 bg-inverse shadow-lg"
        >
          <nav className="max-h-[calc(100vh-4rem)] overflow-y-auto px-4 py-4">
            <a
              href="#home"
              onClick={close}
              className="block rounded-md px-3 py-2.5 text-base font-medium text-inverse-fg/85 hover:bg-inverse-fg/10 hover:text-accent-vivid focus-ring"
            >
              Home
            </a>

            {(["services", "industries"] as const).map((section) => {
              const cfg = megaConfigs[section];
              const isOpen = openSection === section;
              return (
                <div key={section}>
                  <button
                    type="button"
                    onClick={() => setOpenSection(isOpen ? null : section)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-base font-medium text-inverse-fg/85 hover:bg-inverse-fg/10 hover:text-accent-vivid focus-ring"
                  >
                    {section === "services" ? "Services" : "Industries"}
                    <ChevronDown
                      className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")}
                    />
                  </button>
                  {isOpen && (
                    <ul className="ml-3 mt-1 flex flex-col gap-1 border-l border-inverse-fg/15 pl-4">
                      {cfg.items.map((item) => (
                        <li key={item.label}>
                          <a
                            href={item.href}
                            onClick={close}
                            className="block rounded-md px-3 py-2 text-base text-inverse-fg/70 hover:bg-inverse-fg/10 hover:text-accent-vivid focus-ring"
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}

            <a
              href="#portfolio"
              onClick={close}
              className="block rounded-md px-3 py-2.5 text-base font-medium text-inverse-fg/85 hover:bg-inverse-fg/10 hover:text-accent-vivid focus-ring"
            >
              Portfolio
            </a>
            <a
              href="#process"
              onClick={close}
              className="block rounded-md px-3 py-2.5 text-base font-medium text-inverse-fg/85 hover:bg-inverse-fg/10 hover:text-accent-vivid focus-ring"
            >
              Company
            </a>

            <div className="mt-2 flex flex-col gap-2 border-t border-inverse-fg/15 pt-3">
              <a
                href="#contact"
                onClick={close}
                className="w-full rounded-full border border-inverse-fg/25 px-4 py-2.5 text-center text-base font-medium text-inverse-fg transition-colors hover:bg-inverse-fg/10 focus-ring"
              >
                Contact us
              </a>
              <a
                href="#contact"
                onClick={close}
                className="w-full rounded-full bg-gradient-to-r from-accent-vivid to-brand px-5 py-2.5 text-center text-base font-medium text-inverse-fg hover:opacity-90 focus-ring"
              >
                Book a call
              </a>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<MegaSection | null>(null);
  const rootRef = useRef<HTMLElement>(null);

  // Escape closes the mega menu — without this, keyboard users who open it
  // have no way out except tabbing through every item.
  useEffect(() => {
    if (!active) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [active]);

  // Moving focus outside the navbar closes the menu too, so it never lingers
  // over the page after the user has tabbed past it.
  const handleBlur = (e: FocusEvent<HTMLElement>) => {
    if (!rootRef.current?.contains(e.relatedTarget as Node)) setActive(null);
  };

  const closeMenu = () => setActive(null);

  return (
    <header
      ref={rootRef}
      onMouseLeave={closeMenu}
      onBlur={handleBlur}
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full border-b border-inverse-fg/10 bg-inverse/95 shadow-card backdrop-blur",
        className
      )}
    >
      <div className="mx-auto flex h-16 max-w-8xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="focus-ring rounded-md">
          {/* h-8 keeps the wordmark inside the 4rem bar; the old h-32 overflowed it. */}
          <img src={logoLight} alt="Axiomra" className="h-8 w-auto" width={500} height={91} />
        </a>

        <DesktopNav active={active} setActive={setActive} onNavigate={closeMenu} />

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <a
            href="#contact"
            className="rounded-full border border-inverse-fg/30 px-5 py-2.5 text-base font-medium text-inverse-fg transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-vivid hover:bg-accent-vivid/15 hover:text-accent-vivid focus-ring"
          >
            Contact us
          </a>
          {/* The gradient is doubled in width and slid on hover, so the button
              shifts hue instead of just dimming its opacity. */}
          <a
            href="#contact"
            className="rounded-full bg-gradient-to-r from-accent-vivid via-brand to-accent-vivid bg-[length:200%_100%] bg-left px-6 py-2.5 text-base font-medium text-inverse-fg transition-all duration-500 hover:-translate-y-0.5 hover:bg-right hover:shadow-glow focus-ring"
          >
            Book a call
          </a>
        </div>

        <MobileNav />
      </div>

      {active && <FullWidthDropdown section={active} onNavigate={closeMenu} />}
    </header>
  );
}
