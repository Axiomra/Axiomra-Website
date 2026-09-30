import { ArrowRight, Clock, Network, PackageX, ShieldAlert, Tags, Users } from "lucide-react";
import SectionHeading from "../../SectionHeading";
import { Stagger, StaggerItem } from "../../motion/Reveal";
import { challenges } from "../../../data/retailData";

// Named in the data file, resolved here: the copy stays free of imports.
const ICONS = { PackageX, Users, Tags, ShieldAlert, Clock, Network };

/**
 * The six places retail loses money, each paired with what we build instead.
 * Problem and solution share a card so neither can be read without the other.
 */
export default function RetailChallenges() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-surface-wash py-24 md:py-32">
      <div className="relative mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={challenges.eyebrow}
          title={
            <>
              {challenges.titleLead} <span className="text-gradient">{challenges.titleAccent}</span>
            </>
          }
          subtitle={challenges.body}
        />

        <Stagger
          as="ul"
          step={0.08}
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {challenges.items.map((item) => {
            const Icon = ICONS[item.icon] ?? PackageX;
            return (
              <StaggerItem as="li" key={item.problem}>
                <article className="liquid-glass liquid-glass-hover clip-docket flex h-full flex-col p-8">
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/15 text-brand"
                  >
                    <Icon size={22} strokeWidth={1.6} />
                  </span>

                  <h3 className="mt-6 font-display text-xl font-semibold leading-snug tracking-tight text-content">
                    {item.problem}
                  </h3>

                  <p className="mt-4 flex gap-3 text-base leading-relaxed text-content-dim">
                    <ArrowRight
                      size={18}
                      strokeWidth={1.75}
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-accent"
                    />
                    {item.solution}
                  </p>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
