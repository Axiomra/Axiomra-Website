import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronRight, Flag, UserCheck } from "lucide-react";
import GradientCTA from "../components/GradientCTA";
import { Reveal } from "../components/motion/Reveal";
import useInView from "../hooks/useInView";
import useStaggerReveal from "../hooks/useStaggerReveal";
import NetworkMesh from "../components/case-study/NetworkMesh";
import BinaryGrid from "../components/case-study/BinaryGrid";
import MoleculeGraph from "../components/case-study/MoleculeGraph";
import CategoryBadge from "../components/case-study/CategoryBadge";
import BrandedImage from "../components/case-study/BrandedImage";
import { caseStudies } from "../data/caseStudiesData";
import { caseStudyPath, PORTFOLIO_PATH } from "../routes.constants";
import Seo from "../seo/Seo";
import { articleSchema } from "../seo/schema";
import NotFoundPage from "./NotFoundPage";

/**
 * Long-form case study, rendered entirely from data/caseStudiesData.js.
 *
 * The body reads as an article: prose sits in a narrow measure, and only the
 * tables and the flow widen out, so the eye is never asked to track a
 * 100-character line of running text.
 */
export default function CaseStudyPage() {
  const { slug } = useParams();
  const study = caseStudies[slug];

  if (!study) return <NotFoundPage />;
  return <CaseStudy study={study} />;
}

const DEFAULT_LABELS = {
  summary: "Executive summary",
  context: "Business context",
  challenge: "The challenge",
  solution: "The solution",
  capabilities: "What the agent does",
  flow: "How it works",
  phases: "Implementation phases",
  stack: "Technology stack",
  outcome: "Outcome framework",
  impact: "Business impact",
  principles: "Implementation principles",
  why: "Why this matters",
  next: "Next enhancements",
  tech: "Under the hood (for technical teams)",
};

const DEFAULT_CTA = {
  title: "Want an agent like this on your own site?",
  subtitle:
    "Tell us how leads reach you today. We will show you which parts an agent can take over first, and what it would take to build.",
  buttonText: "Talk to our team",
};

function CaseStudy({ study }) {
  const label = { ...DEFAULT_LABELS, ...study.labels };
  const cta = study.cta ?? DEFAULT_CTA;
  // Without a flow image the steps keep the article measure, which frees the
  // margin for the molecule, unless the phases list below already has it.
  const flowMolecule = !study.flowImage && !study.phases?.length;

  return (
    <article className="bg-surface" style={accentVars(study.accent)}>
      <Seo
        title={study.seoTitle}
        description={study.seoDescription}
        image={study.ogImage}
        type="article"
        breadcrumbs={[{ name: "Portfolio", path: PORTFOLIO_PATH }, { name: study.title }]}
        jsonLd={articleSchema({
          headline: study.title,
          description: study.seoDescription,
          image: study.ogImage,
          path: caseStudyPath(study.slug),
        })}
      />
      <Header study={study} />
      <KeyDetails details={study.keyDetails} />

      <div className="mx-auto max-w-5xl px-4 pb-24 pt-20 sm:px-6 md:pt-28 lg:px-8">
        {study.executiveSummary?.length > 0 && (
          <Section id="executive-summary" title={label.summary}>
            {study.executiveSummary.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Section>
        )}

        {study.context?.length > 0 && (
          <Section id="context" title={label.context}>
            {study.context.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            {study.contextImage && <Figure image={study.contextImage} className="mt-10" />}
          </Section>
        )}

        {study.challenge && (
          <Section id="challenge" title={label.challenge}>
            {study.challenge.intro && <p>{study.challenge.intro}</p>}
            <LeadList
              items={study.challenge.items}
              className={study.challenge.intro ? "mt-6" : ""}
            />
          </Section>
        )}

        {study.insight && <Insight text={study.insight} label={study.insightLabel} />}

        {study.solution?.length > 0 && (
          <Section
            id="solution"
            title={label.solution}
            aside={<BinaryGrid className="left-[calc(100%+4rem)] top-1 hidden xl:grid" />}
          >
            {study.solutionAsList ? (
              <LeadList items={study.solution.map((text) => ({ text }))} />
            ) : (
              study.solution.map((p) => <p key={p.slice(0, 24)}>{p}</p>)
            )}
          </Section>
        )}

        {study.capabilities?.length > 0 && (
          <Section id="capabilities" title={label.capabilities} wide>
            <ResponsiveTable
              caption="Agent capabilities and the business value of each"
              columns={[
                { key: "capability", label: "Capability", strong: true },
                { key: "value", label: "Business value" },
              ]}
              rows={study.capabilities}
              rowKey="capability"
            />
          </Section>
        )}

        {study.flow?.length > 0 &&
          (study.flowImage ? (
            <Section id="how-it-works" title={label.flow} wide>
              <div className="grid gap-12 lg:grid-cols-12">
                <Flow steps={study.flow} className="lg:col-span-7" />
                <div className="lg:col-span-5">
                  <Figure
                    image={study.flowImage}
                    className="lg:sticky lg:top-28"
                    sizes="(min-width: 1024px) 26rem, 100vw"
                  />
                </div>
              </div>
            </Section>
          ) : (
            <Section id="how-it-works" title={label.flow}>
              <div className="relative">
                {flowMolecule && (
                  <MoleculeGraph className="right-[calc(100%+3.5rem)] top-2 hidden xl:block" />
                )}
                <Flow steps={study.flow} />
              </div>
            </Section>
          ))}

        {study.outcome && (
          <Section id="outcome" title={label.outcome} wide>
            <p className="max-w-3xl">{study.outcome.intro}</p>
            <OutcomeTable rows={study.outcome.rows} />
          </Section>
        )}

        {study.impact?.length > 0 && (
          <Section id="impact" title={label.impact}>
            {study.impactIntro && <p>{study.impactIntro}</p>}
            <LeadList items={study.impact} />
          </Section>
        )}

        {study.targetOutcome && <TargetOutcome text={study.targetOutcome} />}

        {study.principles?.length > 0 && (
          <Section id="principles" title={label.principles} wide>
            <ul className="grid gap-4 md:grid-cols-2">
              {study.principles.map((item) => (
                <li
                  key={item.title}
                  className="rounded-xl2 border border-line bg-surface-card p-6 md:p-7"
                >
                  <h3 className="font-semibold text-content">{item.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-content-dim">{item.text}</p>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {study.whyItMatters &&
          (study.nextSteps?.length > 0 ? (
            <div className="mx-auto grid max-w-3xl gap-12 border-t border-line pt-16 md:grid-cols-2 md:gap-10">
              <Reveal as="section" aria-labelledby="why-it-matters">
                <h2
                  id="why-it-matters"
                  className="font-display text-2xl font-semibold tracking-tight text-content"
                >
                  {label.why}
                </h2>
                <p className="mt-4 leading-relaxed text-content-dim">{study.whyItMatters}</p>
              </Reveal>
              <Reveal as="section" aria-labelledby="next-enhancements" delay={0.08}>
                <h2
                  id="next-enhancements"
                  className="font-display text-2xl font-semibold tracking-tight text-content"
                >
                  {label.next}
                </h2>
                <ul className="mt-4 space-y-2.5 text-content-dim">
                  {study.nextSteps.map((step) => (
                    <li key={step} className="flex gap-3">
                      <span aria-hidden="true" className="select-none text-accent">
                        +
                      </span>
                      {step}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          ) : (
            <Reveal
              as="section"
              aria-labelledby="why-it-matters"
              className="mx-auto max-w-3xl border-t border-line pt-16"
            >
              <h2
                id="why-it-matters"
                className="font-display text-2xl font-semibold tracking-tight text-content"
              >
                {label.why}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-content-dim md:text-lg">
                {study.whyItMatters}
              </p>
            </Reveal>
          ))}

        {study.tags?.length > 0 && (
          <div className="mx-auto mt-16 flex max-w-3xl flex-wrap items-center gap-2 border-t border-line pt-8">
            <span className="mr-2 font-mono text-xs uppercase tracking-[0.18em] text-content-faint">
              Tags
            </span>
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-line bg-surface-subtle px-3.5 py-1.5 text-sm text-content-dim"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Implementation phases and the stack are for technical readers, so
            they sit behind a closed disclosure and the article stays plain. */}
        {(study.phases?.length > 0 || study.stack?.length > 0) && (
          <details className="group mt-16">
            <summary className="mx-auto flex max-w-3xl cursor-pointer list-none items-center justify-between gap-4 rounded-xl2 border border-line bg-surface-card px-6 py-5 font-display text-xl font-semibold tracking-tight text-content transition-colors hover:border-brand/40 focus-ring [&::-webkit-details-marker]:hidden">
              {label.tech}
              <ChevronDown
                size={20}
                className="shrink-0 text-content-dim transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <div className="pt-16">
              {study.phases?.length > 0 && (
                <Section id="implementation" title={label.phases}>
                  <div className="relative">
                    <MoleculeGraph className="right-[calc(100%+3.5rem)] top-2 hidden xl:block" />
                    <ol className="divide-y divide-line border-y border-line">
                      {study.phases.map((phase, i) => (
                        <li
                          key={phase}
                          className="grid grid-cols-[3rem_1fr] items-baseline gap-2 py-5 sm:grid-cols-[4rem_1fr]"
                        >
                          <span data-num className="font-mono text-sm tracking-wider text-accent">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span>{phase}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </Section>
              )}

              {study.stack?.length > 0 && (
                <Section id="tech-stack" title={label.stack} wide>
                  <ResponsiveTable
                    caption="Technology stack by layer"
                    columns={
                      study.stack.some((row) => row.purpose)
                        ? [
                            { key: "layer", label: "Layer", strong: true },
                            { key: "tool", label: "Tool", mono: true },
                            { key: "purpose", label: "Purpose" },
                          ]
                        : [
                            { key: "layer", label: "Layer", strong: true },
                            { key: "tool", label: "Technology / Approach" },
                          ]
                    }
                    rows={study.stack}
                    rowKey="layer"
                  />
                </Section>
              )}
            </div>
          </details>
        )}
      </div>

      <MoreCaseStudies current={study.slug} />

      <GradientCTA
        dark
        three
        title={cta.title}
        subtitle={cta.subtitle}
        buttonText={cta.buttonText}
      />
    </article>
  );
}

/* ------------------------------------------------------------------ */

function Header({ study }) {
  return (
    <header className="mx-auto max-w-6xl px-4 pt-24 sm:px-6 md:pt-28 lg:px-8">
      <nav aria-label="Breadcrumb" className="text-sm text-content-faint">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link to="/" className="transition-colors hover:text-brand focus-ring">
              Home
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight size={14} />
          </li>
          <li>
            <Link to={PORTFOLIO_PATH} className="transition-colors hover:text-brand focus-ring">
              Portfolio
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight size={14} />
          </li>
          <li aria-current="page" className="line-clamp-1 text-content-dim">
            {study.title}
          </li>
        </ol>
      </nav>

      <div className="mt-10 grid grid-cols-1 items-center gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Link
            to={PORTFOLIO_PATH}
            className="group inline-flex items-center gap-2 text-sm font-medium text-content-dim transition-colors hover:text-brand focus-ring"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
            Back to portfolio
          </Link>

          <div className="cs-load-rise mt-8">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <CategoryBadge label={study.eyebrow} />
              {study.type === "blueprint" && <BlueprintBadge />}
            </div>
            {study.type === "blueprint" && (
              <p id="blueprint-note" className="mt-2 text-sm text-content-faint">
                Representative solution design. Results depend on deployment.
              </p>
            )}
          </div>
          <h1
            className="cs-load-rise mt-3 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-content sm:text-5xl xl:text-6xl"
            style={{ "--d": "60ms" }}
          >
            {study.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-content-dim md:text-xl">
            {study.subtitle}
          </p>
        </div>

        <div className="lg:col-span-6">
          <BrandedImage
            image={study.hero}
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[4/3] w-full rounded-xl2 shadow-card ring-1 ring-[rgb(var(--cs-accent)/0.2)]"
          />
        </div>
      </div>

      {study.stats?.length > 0 && (
        <dl
          className={`mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl2 border border-line bg-line lg:mt-20 ${
            study.stats.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3"
          }`}
        >
          {study.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col-reverse bg-surface-card px-6 py-7 md:px-8 md:py-9"
            >
              <dt className="mt-2 text-sm leading-snug text-content-dim md:text-base">
                {stat.label}
                {stat.target && (
                  <span className="mt-2 block text-xs text-content-faint">{TARGET_NOTE}</span>
                )}
              </dt>
              <dd className="font-display text-3xl font-semibold tracking-tight text-brand md:text-4xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {/* Same strip as the stats, but the headline is a phrase, so it is set
          smaller and in the text colour rather than as a brand-blue figure. */}
      {study.highlights?.length > 0 && (
        <ul className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl2 border border-line bg-line sm:grid-cols-3 lg:mt-20">
          {study.highlights.map((item) => (
            <li key={item.title} className="bg-surface-card px-6 py-7 md:px-8 md:py-9">
              {item.value ? (
                <p className="mb-3 font-display text-3xl font-semibold tracking-tight text-brand md:text-4xl">
                  {item.value}
                </p>
              ) : (
                <span aria-hidden="true" className="mb-4 block h-1 w-8 rounded-full bg-brand" />
              )}
              <p className="font-display text-xl font-semibold tracking-tight text-content md:text-2xl">
                {item.title}
              </p>
              <p className="mt-2 text-sm leading-snug text-content-dim md:text-base">{item.text}</p>
              {item.value && (
                <span className="mt-2 block text-xs text-content-faint">
                  By design, not a measured result
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

function KeyDetails({ details }) {
  const rows = [
    ["Challenge", details.challenge],
    ["Solution", details.solution],
    ["Technologies & tools", details.technologies],
  ];

  return (
    <section
      aria-labelledby="key-details"
      className="relative mt-20 overflow-hidden border-y border-[rgb(var(--cs-accent)/0.2)] bg-surface-subtle md:mt-28"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[rgb(var(--cs-accent)/0.08)]"
      />
      {/* Both meshes stop 1rem short of the text column (72rem wide, 2rem
          padding) and the panel clips whatever runs past its edges. */}
      <NetworkMesh
        seed={3}
        origin="right"
        className="-top-6 hidden lg:block"
        style={{ right: "calc(50% + 35rem)", color: MESH_COLOR }}
      />
      <NetworkMesh
        seed={11}
        origin="left"
        className="-bottom-10 hidden lg:block"
        style={{ left: "calc(50% + 35rem)", color: MESH_COLOR }}
      />
      <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <h2
          id="key-details"
          className="font-mono text-xs uppercase tracking-[0.22em] text-content-faint"
        >
          Key details
        </h2>
        {details.summary && (
          <p className="mt-4 font-display text-2xl font-semibold tracking-tight text-content md:text-3xl">
            {details.summary}
          </p>
        )}
        <dl className="mt-10 divide-y divide-line border-t border-line">
          {rows.map(([term, text]) => (
            <div key={term} className="grid gap-1 py-5 md:grid-cols-[14rem_1fr] md:gap-8">
              <dt className="font-semibold text-content">{term}</dt>
              <dd className="leading-relaxed text-content-dim">{text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/**
 * One article section. `wide` lets tables use the full column; `aside` is a
 * decoration positioned against the section, for the page margin.
 */
function Section({ id, title, wide = false, aside = null, children }) {
  const ref = useStaggerReveal();
  return (
    <section
      ref={ref}
      aria-labelledby={id}
      className={`cs-rise-group relative mx-auto mb-20 md:mb-24 ${wide ? "" : "max-w-3xl"}`}
    >
      {aside}
      <h2
        id={id}
        className="font-display text-3xl font-semibold leading-tight tracking-tight text-content md:text-4xl"
      >
        {title}
      </h2>
      <div className="mt-6 space-y-5 text-base leading-relaxed text-content-dim md:text-lg">
        {children}
      </div>
    </section>
  );
}

function Insight({ text, label = "Primary objective" }) {
  const [ref, inView] = useInView({ rootMargin: "0px" });
  return (
    <Reveal as="aside" from="scale" className="relative mx-auto mb-20 max-w-3xl md:mb-24">
      <figure
        ref={ref}
        data-active={inView || undefined}
        className="cs-decor relative overflow-hidden rounded-xl2 bg-inverse px-7 py-10 text-inverse-fg shadow-card md:px-12 md:py-12"
      >
        {/* Twice the card's width and mirrored, so drifting it sideways shifts
            the gradient without ever exposing an edge. At rest the visible
            half matches the original inverse to brand sweep. */}
        <span
          aria-hidden="true"
          className="cs-drift pointer-events-none absolute inset-y-0 left-0 w-[200%] bg-[linear-gradient(125deg,rgb(var(--inverse))_0%,rgb(var(--inverse-card))_22%,rgb(var(--brand-strong))_50%,rgb(var(--inverse-card))_78%,rgb(var(--inverse))_100%)]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-2 -top-10 select-none font-display text-[11rem] leading-none text-white/[0.07]"
        >
          &rdquo;
        </span>
        <p className="relative font-mono text-xs uppercase tracking-[0.22em] text-accent-vivid">
          {label}
        </p>
        <blockquote className="relative mt-4 font-display text-2xl font-medium leading-snug md:text-3xl">
          {text}
        </blockquote>
      </figure>
    </Reveal>
  );
}

function Flow({ steps, className = "" }) {
  return (
    <ol className={`relative ${className}`}>
      {steps.map((step, i) => (
        <li key={step.title} className="relative grid grid-cols-[2.5rem_1fr] gap-5 pb-9 last:pb-0">
          {i < steps.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-5 top-11 w-px bg-line-strong"
            />
          )}
          {step.checkpoint ? (
            <span
              data-num
              className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white shadow-card"
            >
              <UserCheck size={18} strokeWidth={2} aria-hidden="true" />
              <span className="sr-only">{i + 1}</span>
            </span>
          ) : (
            <span
              data-num
              className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-brand/40 bg-surface font-mono text-sm font-medium text-brand"
            >
              {i + 1}
            </span>
          )}
          <div
            className={
              step.checkpoint
                ? "-mt-1 rounded-xl2 border border-accent/35 bg-accent/[0.07] px-4 pb-4 pt-2.5"
                : "pt-1.5"
            }
          >
            {step.checkpoint && (
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent">
                Human checkpoint
              </p>
            )}
            <h3 className={`font-semibold text-content ${step.checkpoint ? "mt-1" : ""}`}>
              {step.title}
            </h3>
            <p className="mt-1.5 text-base leading-relaxed text-content-dim">{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/**
 * A real <table> from md up. Below that each row becomes a card, and every
 * cell carries its column name via data-label so the stacked version still
 * reads as label and value.
 */
function ResponsiveTable({ caption, columns, rows, rowKey }) {
  return (
    <table className="w-full border-separate border-spacing-0 text-left text-base md:overflow-hidden md:rounded-xl2 md:border md:border-line">
      <caption className="sr-only">{caption}</caption>
      <thead className="sr-only md:not-sr-only md:table-header-group">
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              scope="col"
              className="bg-surface-subtle px-6 py-4 font-mono text-xs font-medium uppercase tracking-[0.16em] text-content-faint"
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="block space-y-3 md:table-row-group md:space-y-0">
        {rows.map((row) => (
          <tr
            key={row[rowKey]}
            className="block rounded-xl2 border border-line bg-surface-card p-5 md:table-row md:rounded-none md:border-0 md:bg-transparent md:p-0"
          >
            {columns.map((col, c) => (
              <td
                key={col.key}
                data-label={col.label}
                className={`block py-1 align-top before:mb-1 before:block before:font-mono before:text-[0.7rem] before:uppercase before:tracking-[0.16em] before:text-content-faint before:content-[attr(data-label)] md:table-cell md:border-t md:border-line md:px-6 md:py-5 md:before:hidden ${
                  c === 0 ? "pt-0 before:hidden md:w-[34%]" : "mt-3 md:mt-0"
                } ${col.strong ? "font-semibold text-content" : "text-content-dim"} ${
                  col.mono ? "font-mono text-sm text-content" : ""
                }`}
              >
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Marks a representative design, so nothing on the page reads as a client result. */
function BlueprintBadge() {
  return (
    <span
      aria-describedby="blueprint-note"
      className="inline-flex items-center rounded-full border border-gold/50 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-content"
    >
      Solution Blueprint
    </span>
  );
}

function LeadList({ items, className = "" }) {
  return (
    <ul className={`space-y-4 ${className}`}>
      {items.map((item) => (
        <li key={item.lead ?? item.text} className="flex gap-4">
          <span
            aria-hidden="true"
            className="mt-[0.6rem] h-2 w-2 shrink-0 rounded-full border-2 border-brand"
          />
          <span>
            {item.lead && (
              <>
                <strong className="font-semibold text-content">{item.lead}</strong>{" "}
              </>
            )}
            {item.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * A goal, not a result: dashed border, flag icon, and the word "Target" set
 * before the sentence, so it cannot be mistaken for a measured outcome.
 */
function TargetOutcome({ text }) {
  return (
    <Reveal as="aside" aria-label="Target outcome" className="mx-auto mb-20 max-w-3xl md:mb-24">
      <div className="flex gap-5 rounded-xl2 border border-dashed border-gold/60 bg-gold/[0.06] px-6 py-7 md:px-8">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/50 text-content">
          <Flag size={18} strokeWidth={1.8} aria-hidden="true" />
        </span>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-content-faint">Target</p>
          <p className="mt-2 text-lg leading-relaxed text-content">{text}</p>
        </div>
      </div>
    </Reveal>
  );
}

/** Every other study in the data file, so the block grows with new entries. */
function MoreCaseStudies({ current }) {
  const others = Object.values(caseStudies).filter((s) => s.slug !== current);
  if (!others.length) return null;

  return (
    <section aria-labelledby="more-case-studies" className="border-t border-line bg-surface-subtle">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <h2
          id="more-case-studies"
          className="font-display text-2xl font-semibold tracking-tight text-content md:text-3xl"
        >
          More case studies
        </h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-2">
          {others.map((other) => (
            <li key={other.slug} style={accentVars(other.accent)}>
              <Link
                to={caseStudyPath(other.slug)}
                className="group flex h-full flex-col overflow-hidden rounded-xl2 border border-[rgb(var(--cs-accent)/0.2)] bg-surface-card transition-shadow hover:shadow-card focus-ring"
              >
                <BrandedImage
                  image={other.hero}
                  credit={false}
                  sizes="(min-width: 768px) 30rem, 100vw"
                  className="aspect-[16/9] w-full"
                />
                <div className="flex flex-1 flex-col p-6">
                  <p className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-accent">
                    {other.eyebrow}
                    {other.type === "blueprint" && (
                      <span className="rounded-full border border-gold/50 bg-gold/10 px-2 py-0.5 text-[0.65rem] tracking-[0.12em] text-content">
                        Solution Blueprint
                      </span>
                    )}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-content">
                    {other.title}
                  </h3>
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-brand">
                    Read case study
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const TARGET_NOTE = "Target, not yet measured";

function TargetBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-gold/40 bg-gold/10 px-2.5 py-0.5 text-xs font-medium text-content">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
      {TARGET_NOTE}
    </span>
  );
}

/**
 * Target rows are deliberately quieter than measured ones: normal weight,
 * dimmed text, and the badge sits before the figure so it is read first.
 */
function OutcomeTable({ rows }) {
  return (
    <div className="mt-8">
      <table className="w-full border-separate border-spacing-0 text-left text-base md:overflow-hidden md:rounded-xl2 md:border md:border-line">
        <caption className="sr-only">
          Outcome framework: traditional process compared with the AI-agent model
        </caption>
        <thead className="sr-only md:not-sr-only md:table-header-group">
          <tr>
            {["Metric", "Traditional", "AI-Agent"].map((h) => (
              <th
                key={h}
                scope="col"
                className="bg-surface-subtle px-6 py-4 font-mono text-xs font-medium uppercase tracking-[0.16em] text-content-faint"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="block space-y-3 md:table-row-group md:space-y-0">
          {rows.map((row) => (
            <tr
              key={row.metric}
              className="block rounded-xl2 border border-line bg-surface-card p-5 md:table-row md:rounded-none md:border-0 md:bg-transparent md:p-0"
            >
              <th
                scope="row"
                className="block pb-1 font-semibold text-content md:table-cell md:w-[26%] md:border-t md:border-line md:px-6 md:py-5 md:align-top"
              >
                {row.metric}
              </th>
              <td
                data-label="Traditional"
                className="mt-3 block text-content-dim before:mb-1 before:block before:font-mono before:text-[0.7rem] before:uppercase before:tracking-[0.16em] before:text-content-faint before:content-[attr(data-label)] md:mt-0 md:table-cell md:border-t md:border-line md:px-6 md:py-5 md:align-top md:before:hidden"
              >
                {row.traditional}
              </td>
              <td
                data-label="AI-Agent"
                className={`mt-3 block before:mb-1 before:block before:font-mono before:text-[0.7rem] before:uppercase before:tracking-[0.16em] before:text-content-faint before:content-[attr(data-label)] md:mt-0 md:table-cell md:border-t md:border-line md:px-6 md:py-5 md:align-top md:before:hidden ${
                  row.target ? "text-content-dim" : "font-medium text-content"
                }`}
              >
                {row.target && (
                  <span className="mb-2 block">
                    <TargetBadge />
                  </span>
                )}
                {row.agent}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */

/**
 * The study's `accent` hex as an RGB triple on --cs-accent, so Tailwind can
 * apply it at an alpha, e.g. bg-[rgb(var(--cs-accent)/0.08)]. The accent is
 * only ever a light tint: 6-12% on backgrounds, 15-25% on borders and
 * decorations. Text keeps the site's own colours.
 */
function accentVars(hex = "#3B4FBF") {
  const n = parseInt(hex.slice(1), 16);
  return { "--cs-accent": `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}` };
}

// The mesh draws lines and resting nodes at 0.4 of this colour, so 0.5 here
// lands them at 20%.
const MESH_COLOR = "rgb(var(--cs-accent) / 0.5)";

function Figure({ image, className = "", sizes = "(min-width: 1024px) 48rem, 100vw" }) {
  return (
    // A <figure> so useStaggerReveal picks it up with the section's text.
    <figure className={className}>
      <BrandedImage
        image={image}
        sizes={sizes}
        className="w-full rounded-xl2 shadow-card ring-1 ring-line"
      />
    </figure>
  );
}
