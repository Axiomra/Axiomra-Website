import { useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
  disabled?: boolean;
}

export interface NavDropdownItem {
  label: string;
  href: string;
}

export interface NavDropdownProps {
  label: string;
  items: NavDropdownItem[];
}

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
  viewAll: string;
  ctaTitle: string;
  ctaSubtitle: string;
  items: typeof serviceItems;
}

const megaConfigs: Record<MegaSection, MegaConfig> = {
  services: {
    title: "Our Services",
    subtitle: "End-to-end AI engineering — from strategy to production.",
    viewAll: "#services",
    ctaTitle: "Need a custom solution?",
    ctaSubtitle: "Talk to our AI team and get a tailored roadmap.",
    items: serviceItems,
  },
  industries: {
    title: "Industries We Serve",
    subtitle: "Proven AI deployments across every major sector.",
    viewAll: "#industries",
    ctaTitle: "Already in tech?",
    ctaSubtitle: "See how we ship results across verticals.",
    items: industryItems,
  },
};

function FullWidthDropdown({
  section,
  onNavigate,
}: {
  section: MegaSection;
  onNavigate?: () => void;
}) {
  const cfg = megaConfigs[section];

  return (
    <div className="absolute left-0 right-0 top-full min-h-[280px] border-t border-ink/10 bg-white shadow-card">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_1.6fr_1fr] lg:px-8">
        <div className="flex flex-col justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-periwinkle">
              {section === "services" ? "What we do" : "Where we work"}
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-ink">{cfg.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-dim">{cfg.subtitle}</p>
          </div>
          <a
            href={cfg.viewAll}
            onClick={onNavigate}
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-periwinkle hover:text-periwinkle-dark"
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
              className="group flex flex-col gap-1 rounded-xl px-4 py-3 transition-colors hover:bg-mist-50"
            >
              <span className="text-sm font-semibold text-ink group-hover:text-periwinkle transition-colors">
                {item.label}
              </span>
              <span className="text-xs leading-snug text-ink-faint">{item.description}</span>
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-3 rounded-2xl bg-gradient-to-br from-navy to-navy-soft p-6">
          <h4 className="font-display text-lg font-semibold text-white">{cfg.ctaTitle}</h4>
          <p className="text-sm leading-relaxed text-white/60">{cfg.ctaSubtitle}</p>
          <a
            href="#contact"
            onClick={onNavigate}
            className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-full bg-gradient-to-r from-teal to-periwinkle px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Book a call
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

function DesktopNav({
  active,
  setActive,
  onNavigate,
}: {
  active: MegaSection | null;
  setActive: (s: MegaSection | null) => void;
  onNavigate?: () => void;
}) {
  const links = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services", mega: "services" as MegaSection },
    { label: "Industries", href: "#industries", mega: "industries" as MegaSection },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Company", href: "#process" },
  ];

  return (
    <nav className="hidden items-center gap-1 lg:flex">
      {links.map((l) =>
        "mega" in l ? (
          <button
            key={l.label}
            type="button"
            onClick={onNavigate}
            onMouseEnter={() => setActive(l.mega)}
            className={cn(
              "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors focus-ring",
              active === l.mega
                ? "bg-mist-50 text-ink"
                : "text-ink hover:text-periwinkle"
            )}
          >
            {l.label}
            <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", active === l.mega && "rotate-180")} />
          </button>
        ) : (
          <a
            key={l.label}
            href={l.href}
            onClick={onNavigate}
            className="rounded-full px-4 py-2 text-sm font-medium text-ink transition-colors hover:text-periwinkle focus-ring"
          >
            {l.label}
          </a>
        )
      )}
    </nav>
  );
}

function MobileNav({ onNavigate }: { onNavigate?: () => void }) {
  const [open, setOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const close = () => {
    setOpen(false);
    setOpenSection(null);
    onNavigate?.();
  };

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="rounded-md p-2 text-ink transition-colors hover:bg-mist/60"
        aria-label="Toggle main navigation"
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full border-b border-ink/10 bg-white shadow-lg">
          <nav className="max-h-[calc(100vh-4rem)] overflow-y-auto px-4 py-4">
            <a href="#home" onClick={close} className="block rounded-md px-3 py-2.5 text-sm font-medium text-ink hover:bg-mist/60">
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
                    className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-ink hover:bg-mist/60"
                  >
                    {section === "services" ? "Services" : "Industries"}
                    <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")} />
                  </button>
                  {isOpen && (
                    <ul className="ml-3 mt-1 flex flex-col gap-1 border-l border-ink/10 pl-4">
                      {cfg.items.map((item) => (
                        <li key={item.label}>
                          <a
                            href={item.href}
                            onClick={close}
                            className="block rounded-md px-3 py-2 text-sm text-ink/80 hover:bg-mist/60 hover:text-ink"
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

            <a href="#portfolio" onClick={close} className="block rounded-md px-3 py-2.5 text-sm font-medium text-ink hover:bg-mist/60">
              Portfolio
            </a>
            <a href="#process" onClick={close} className="block rounded-md px-3 py-2.5 text-sm font-medium text-ink hover:bg-mist/60">
              Company
            </a>

            <div className="mt-2 flex flex-col gap-2 border-t border-ink/10 pt-3">
              <a href="#contact" onClick={close} className="w-full rounded-full border border-ink/15 px-4 py-2.5 text-center text-sm font-medium text-ink transition-colors hover:bg-mist-50">
                Contact us
              </a>
              <a href="#contact" onClick={close} className="w-full rounded-full bg-gradient-to-r from-teal to-periwinkle px-5 py-2.5 text-center text-sm font-medium text-white hover:opacity-90">
                Book a call
              </a>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}

export function Navbar({
  className,
}: {
  className?: string;
}) {
  const [active, setActive] = useState<MegaSection | null>(null);

  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className={cn(
        "sticky top-0 z-50 w-full bg-white/95 backdrop-blur border-b border-ink/10 shadow-sm",
        className
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="focus-ring rounded-md">
          <span className="font-display text-lg font-semibold tracking-tight text-ink">
            Axiomra
          </span>
        </a>

        <div className="hidden lg:block">
          <DesktopNav active={active} setActive={setActive} />
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="#contact" className="rounded-full border border-ink/15 px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-mist-50 focus-ring">
            Contact us
          </a>
          <a href="#contact" className="rounded-full bg-gradient-to-r from-teal to-periwinkle px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-ring">
            Book a call
          </a>
        </div>

        <MobileNav />
      </div>

      {active && <FullWidthDropdown section={active} />}
    </nav>
  );
}