import { Instagram, Linkedin, ArrowUp } from "lucide-react";
import logoLight from "../assets/logo-light.webp";
import iconTeal from "../assets/icon-teal.png";
import NetworkBackground from "./NetworkBackground";
import { Link, useLocation } from "react-router-dom";
import { ABOUT_PATH } from "../data/aboutData";
import { TECH_PATH } from "../data/techStackData";
import { FAQS_PATH } from "../data/faqsData";

/* Footer labels that already have a route. Everything else still waits on a page. */
const LINK_ROUTES = {
  "About Us": ABOUT_PATH,
  "Contact Us": "/contact",
  "Tech Stack": TECH_PATH,
  FAQs: FAQS_PATH,
};

const cols = [
  { title: "Services", links: ["Artificial Intelligence", "Computer Vision", "Software Development", "Generative AI", "AI Agent Development"] },
  { title: "Industries", links: ["Healthcare", "Fashion", "Real Estate", "Sports", "Education"] },
  { title: "Quick Links", links: ["Blogs", "Contact Us", "About Us", "Tech Stack", "Awards & Recognitions", "FAQs"] },
];

/* lucide ships no X (formerly Twitter) mark, so the brand glyph is inlined. */
function XIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.174.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.896 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.886-9.885 9.886m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

const socials = [
  { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/axiomra.co" },
  { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/axiomra.co" },
  { Icon: XIcon, label: "X (Twitter)", href: "https://x.com/Axiomra_co" },
];

const UNDERLINE_LINK =
  "relative inline-block text-lg text-inverse-fg/70 transition-colors duration-300 hover:text-inverse-fg focus-ring " +
  "after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 " +
  "after:bg-gradient-to-r after:from-accent-vivid after:to-brand after:transition-transform after:duration-300 " +
  "hover:after:scale-x-100 focus-visible:after:scale-x-100";

export default function Footer() {
  // The contact page shows no footer at all — not even on hover.
  const { pathname } = useLocation();
  if (pathname === "/contact") return null;

  return (
    <div>
      <footer className="relative overflow-hidden bg-inverse pb-8 pt-16">
        <NetworkBackground variant="wave" className="opacity-95" />
        {/* Light scrim only, enough to hold text contrast without erasing the animation underneath it. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-inverse/85 via-inverse/45 to-inverse/80" />

        <div className="relative z-10 mx-auto grid max-w-6xl gap-x-8 gap-y-12 px-4 sm:px-6 md:grid-cols-4">
          <div>
            <img src={logoLight} alt="Axiomra" className="mb-4 h-9 w-auto" width={500} height={91} />
            <p className="max-w-xs text-lg leading-relaxed text-inverse-fg/70">
              We help businesses by automating their processes and developing customized
              end-to-end AI solutions that deliver proven ROI.
            </p>
            <Link
              to="/contact"
              className="mt-5 inline-block rounded-full bg-inverse-fg px-6 py-3 text-lg font-medium text-inverse transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow focus-ring"
            >
              Let&apos;s Talk
            </Link>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="mb-5 font-display text-2xl font-semibold text-inverse-fg">{c.title}</h4>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    {LINK_ROUTES[l] ? (
                      <Link to={LINK_ROUTES[l]} className={UNDERLINE_LINK}>
                        {l}
                      </Link>
                    ) : (
                      <a href="#" className={UNDERLINE_LINK}>
                        {l}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="relative z-10 mx-auto mt-14 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-inverse-fg/10 px-4 pt-6 sm:flex-row sm:px-6">
          <span className="text-base text-inverse-fg/60">© 2026 Axiomra. All Rights Reserved.</span>
          <div className="flex gap-3">
            {socials.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-inverse-fg/15 text-inverse-fg/60 transition-all duration-300 hover:-translate-y-1 hover:border-accent-vivid hover:bg-accent-vivid/15 hover:text-accent-vivid focus-ring"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Floating buttons live outside the footer body so they stay on screen
          on every page; the whole footer (these included) renders only when
          the view is not /contact. */}
      <a
        href="https://wa.me/16575203444"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 left-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-glow transition-transform hover:scale-105 focus-ring"
        aria-label="Chat on WhatsApp: +1 (657) 520-3444"
      >
        <WhatsAppIcon />
        <span className="absolute -right-0.5 -top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-2 ring-[#25D366]">
          <img src={iconTeal} alt="" className="h-3.5 w-auto" width={83} height={91} />
        </span>
      </a>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface-card text-content shadow-card backdrop-blur transition-colors hover:bg-surface-subtle focus-ring"
        aria-label="Back to top"
      >
        <ArrowUp size={18} />
      </button>
    </div>
  );
}
