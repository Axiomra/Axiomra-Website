import { Facebook, Instagram, Linkedin, Youtube, MessageCircle, ArrowUp } from "lucide-react";
import logoLight from "../assets/2.png";

const cols = [
  { title: "Services", links: ["Artificial Intelligence", "Computer Vision", "Software Development", "Generative AI", "AI Agent Development"] },
  { title: "Industries", links: ["Healthcare", "Fashion", "Real Estate", "Sports", "Education"] },
  { title: "Quick Links", links: ["Blogs", "Contact Us", "About Us", "Teams", "Awards & Recognitions", "FAQs"] },
];

const socials = [Facebook, Instagram, Linkedin, Youtube];

export default function Footer() {
  return (
    <footer className="bg-navy pt-16 pb-8 px-6 relative">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        <div>
          <img src={logoLight} alt="Axiomra" className="h-12 w-auto mb-4" />
          <p className="text-sm text-white/60 max-w-xs">
            We help businesses by automating their processes and developing customized
            end-to-end AI solutions that deliver proven ROI.
          </p>
          <a href="#contact" className="mt-5 inline-block text-sm font-medium bg-white text-navy px-5 py-2.5 rounded-full hover:bg-white/90 transition-colors">
            Let's Talk
          </a>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="font-display text-sm mb-4 text-white">{c.title}</h4>
            <ul className="space-y-2.5">
              {c.links.map((l) => (
                <li key={l}><a href="#" className="text-sm text-white/60 hover:text-white transition-colors focus-ring">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-xs text-white/40">© 2026 Axiomra. All Rights Reserved.</span>
        <div className="flex gap-3">
          {socials.map((Icon, i) => (
            <a key={i} href="#" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors focus-ring">
              <Icon size={15} />
            </a>
          ))}
        </div>
      </div>

      <a href="https://wa.me/10000000000" target="_blank" rel="noreferrer"
        className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full bg-teal shadow-glow flex items-center justify-center hover:scale-105 transition-transform"
        aria-label="Chat on WhatsApp">
        <MessageCircle size={24} className="text-white" fill="currentColor" />
      </a>

      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-white/10 border border-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/20 transition-colors focus-ring"
        aria-label="Back to top">
        <ArrowUp size={18} />
      </button>
    </footer>
  );
}
