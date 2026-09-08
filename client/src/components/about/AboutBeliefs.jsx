import { motion } from "framer-motion";
import { Compass, Users, UserCheck, Milestone, Rocket, Sparkles } from "lucide-react";
import SectionHeading from "../SectionHeading";
import { beliefs } from "../../data/aboutData";

import workshopImg from "../../assets/about/beliefs-focus.webp";
import deskImg from "../../assets/about/beliefs-people.webp";
import roomImg from "../../assets/about/beliefs-team.webp";

const ICONS = {
  compass: Compass,
  team: Users,
  people: UserCheck,
  steward: Milestone,
  fail: Rocket,
  spark: Sparkles,
};

export default function AboutBeliefs() {
  return (
    <section id="beliefs" className="bg-surface-subtle py-20 md:py-28">
      <div className="mx-auto grid max-w-8xl grid-cols-1 items-start gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            align="left"
            eyebrow={beliefs.eyebrow}
            title={
              <>
                {beliefs.titleLead} <span className="text-brand">{beliefs.titleAccent}</span>
              </>
            }
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-10 grid grid-cols-2 gap-3"
          >
            <div className="col-span-2 overflow-hidden rounded-xl2 border border-line shadow-card">
              <img
                src={roomImg}
                alt="The team meeting as one high performance group"
                loading="lazy"
                className="h-52 w-full object-cover sm:h-64"
              />
            </div>
            <div className="overflow-hidden rounded-xl2 border border-line shadow-card">
              <img src={workshopImg} alt="An engineer working through a problem alone, uninterrupted" loading="lazy" className="h-36 w-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-xl2 border border-line shadow-card">
              <img src={deskImg} alt="The right people working side by side on the same build" loading="lazy" className="h-36 w-full object-cover" />
            </div>
          </motion.div>
        </div>

        <div className="space-y-4">
          {beliefs.items.map((b, i) => {
            const Icon = ICONS[b.icon] ?? Compass;
            return (
              <motion.article
                key={b.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: (i % 3) * 0.08 }}
                className="group rounded-xl2 border border-line bg-surface-card p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-card"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-inverse">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-content md:text-2xl">{b.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-content-dim">{b.body}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
