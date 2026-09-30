import { companyStats } from "../data/companyStats.js";
import { motion } from "framer-motion";
import { Play, Star } from "lucide-react";
import SectionHeading from "../components/SectionHeading";

import avt1 from "../assets/review-1.webp";
import avt2 from "../assets/review-2.webp";

const cards = [
  {
    video: true,
    name: "Faisal Huq",
    role: "CEO & Founder, FormOle",
    quote:
      "Strong software development skills and knowledge of industry tools, and AI Video. Their willingness to take any problem, break it down, and get through it is impressive.",
  },
  {
    video: false,
    name: "Pablo Sanchez",
    role: "CEO of AI Project Management Tool",
    img: avt1,
    quote:
      "Excellent service! The team planned the project really well, keeping me in the loop throughout with fluid, professional conversation.",
  },
  { video: true, name: "Shefket Robellie", role: "CEO & Founder, Voltox", quote: "" },
  {
    video: false,
    name: "Maria Alford",
    role: "VP of Engineering, Signals.io",
    img: avt2,
    quote:
      "I love their teamwork and communication. Always friendly and motivated, which has given us a great journey. They're experts in what we need.",
  },
];

function VideoCard({ card }) {
  return (
    <div className="group relative flex aspect-[4/3] cursor-pointer items-center justify-center overflow-hidden rounded-xl2 bg-gradient-to-br from-inverse to-grad-blue">
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-inverse-fg/90"
      >
        <Play size={20} className="ml-0.5 text-inverse" fill="currentColor" />
      </motion.div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        <p className="text-base font-medium text-inverse-fg">{card.name}</p>
        <p className="text-sm text-inverse-fg/70">{card.role}</p>
      </div>
    </div>
  );
}

function ReviewCard({ card }) {
  return (
    <div className="flex h-full min-h-[220px] flex-col justify-between rounded-xl2 border border-line bg-surface-subtle p-6">
      <div>
        <div className="mb-3 flex text-gold" role="img" aria-label="5 out of 5 stars">
          {[...Array(5)].map((_, idx) => (
            <Star key={idx} size={14} strokeWidth={0} fill="currentColor" />
          ))}
        </div>
        <p className="text-base leading-relaxed text-content-dim">&ldquo;{card.quote}&rdquo;</p>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <img
          src={card.img}
          alt={card.name}
          width={128}
          height={128}
          className="h-11 w-11 rounded-full object-cover ring-2 ring-brand/30"
          loading="lazy"
        />
        <div>
          <p className="text-base font-medium text-content">{card.name}</p>
          <p className="text-sm text-content-faint">{card.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function VideoTestimonials() {
  return (
    <section className="mx-auto max-w-8xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="When we say we deliver ROI, we mean it"
        title={
          <>
            See What Leaders <span className="text-brand">With 10+ Years Of Experience</span> Have
            To Say
          </>
        }
      >
        <div className="mt-7 inline-flex items-center gap-3 rounded-full border border-line-strong bg-surface-subtle px-6 py-3">
          <span className="flex text-gold" role="img" aria-label="4.8 out of 5 stars">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} strokeWidth={0} fill="currentColor" />
            ))}
          </span>
          <span className="font-display text-xl font-semibold text-content">4.9/5</span>
          <span className="h-5 w-px bg-line-strong" aria-hidden="true" />
          <span className="text-base text-content-dim">
            across {companyStats.projects}+ projects
          </span>
        </div>
      </SectionHeading>

      <div className="mt-12 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c, i) => (
          <motion.div
            key={c.name}
            className={i % 2 === 1 ? "lg:mt-12" : ""}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            {c.video ? <VideoCard card={c} /> : <ReviewCard card={c} />}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
