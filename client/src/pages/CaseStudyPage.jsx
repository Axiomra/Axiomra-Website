import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import GradientCTA from "../components/GradientCTA";
import { Reveal } from "../components/motion/Reveal";
import usePageMeta from "../hooks/usePageMeta";
import useInView from "../hooks/useInView";
import useStaggerReveal from "../hooks/useStaggerReveal";
import NetworkMesh from "../components/case-study/NetworkMesh";
import BinaryGrid from "../components/case-study/BinaryGrid";
import MoleculeGraph from "../components/case-study/MoleculeGraph";
import CategoryBadge from "../components/case-study/CategoryBadge";
import "../styles/case-study.css";
import { caseStudies } from "../data/caseStudiesData";
import { PORTFOLIO_PATH } from "../data/portfolioData";

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

  if (!study) return <Navigate to={PORTFOLIO_PATH} replace />;
  return <CaseStudy study={study} />;
}

function CaseStudy({ study }) {
  usePageMeta({
    title: study.seoTitle,
    description: study.seoDescription,
    image: study.ogImage,
  });

  return (
    <article className="bg-surface">
      <Header study={study} />
      <KeyDetails details={study.keyDetails} />

      <div className="mx-auto max-w-5xl px-4 pb-24 pt-20 sm:px-6 md:pt-28 lg:px-8">
        <Section id="context" title="Business context">
          {study.context.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          {study.contextImage && <Figure image={study.contextImage} className="mt-10" />}
        </Section>

        <Section id="challenge" title="The challenge">
          <p>{study.challenge.intro}</p>
          <ul className="mt-6 space-y-4">
            {study.challenge.items.map((item) => (
              <li key={item.lead} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="mt-[0.6rem] h-2 w-2 shrink-0 rounded-full border-2 border-brand"
                />
                <span>
                  <strong className="font-semibold text-content">{item.lead}</strong> {item.text}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Insight text={study.insight} />

        <Section
          id="solution"
          title="The solution"
          aside={<BinaryGrid className="left-[calc(100%+4rem)] top-1 hidden xl:grid" />}
        >
          {study.solution.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </Section>

        <Section id="capabilities" title="What the agent does" wide>
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

        <Section id="how-it-works" title="How it works" wide>
          <div className="grid gap-12 lg:grid-cols-12">
            <Flow steps={study.flow} className="lg:col-span-7" />
            {study.flowImage && (
              <div className="lg:col-span-5">
                <Figure image={study.flowImage} className="lg:sticky lg:top-28" sizes="(min-width: 1024px) 26rem, 100vw" />
              </div>
            )}
          </div>
        </Section>

        <Section id="implementation" title="Implementation phases">
          <div className="relative">
            <MoleculeGraph className="right-[calc(100%+3.5rem)] top-2 hidden xl:block" />
            <ol className="divide-y divide-line border-y border-line">
              {study.phases.map((phase, i) => (
                <li key={phase} className="grid grid-cols-[3rem_1fr] items-baseline gap-2 py-5 sm:grid-cols-[4rem_1fr]">
                  <span data-num className="font-mono text-sm tracking-wider text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{phase}</span>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        <Section id="tech-stack" title="Technology stack" wide>
          <ResponsiveTable
            caption="Technology stack by layer"
            columns={[
              { key: "layer", label: "Layer", strong: true },
              { key: "tool", label: "Tool", mono: true },
              { key: "purpose", label: "Purpose" },
            ]}
            rows={study.stack}
            rowKey="layer"
          />
        </Section>

        <Section id="outcome" title="Outcome framework" wide>
          <p className="max-w-3xl">{study.outcome.intro}</p>
          <OutcomeTable rows={study.outcome.rows} />
        </Section>

        <Section id="impact" title="Business impact">
          <ul className="space-y-4">
            {study.impact.map((item) => (
              <li key={item.lead} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="mt-[0.6rem] h-2 w-2 shrink-0 rounded-full border-2 border-brand"
                />
                <span>
                  <strong className="font-semibold text-content">{item.lead}</strong> {item.text}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <div className="mx-auto grid max-w-3xl gap-12 border-t border-line pt-16 md:grid-cols-2 md:gap-10">
          <Reveal as="section" aria-labelledby="why-it-matters">
            <h2 id="why-it-matters" className="font-display text-2xl font-semibold tracking-tight text-content">
              Why this matters
            </h2>
            <p className="mt-4 leading-relaxed text-content-dim">{study.whyItMatters}</p>
          </Reveal>
          <Reveal as="section" aria-labelledby="next-enhancements" delay={0.08}>
            <h2 id="next-enhancements" className="font-display text-2xl font-semibold tracking-tight text-content">
              Next enhancements
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

        <div className="mx-auto mt-16 flex max-w-3xl flex-wrap items-center gap-2 border-t border-line pt-8">
          <span className="mr-2 font-mono text-xs uppercase tracking-[0.18em] text-content-faint">Tags</span>
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line bg-surface-subtle px-3.5 py-1.5 text-sm text-content-dim"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <GradientCTA
        dark
        three
        title="Want an agent like this on your own site?"
        subtitle="Tell us how leads reach you today. We will show you which parts an agent can take over first, and what it would take to build."
        buttonText="Talk to our team"
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
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
            Back to portfolio
          </Link>

          <CategoryBadge label={study.eyebrow} className="cs-load-rise mt-8" />
          <h1
            className="cs-load-rise mt-3 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-content sm:text-5xl xl:text-6xl"
            style={{ "--d": "60ms" }}
          >
            {study.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-content-dim md:text-xl">{study.subtitle}</p>
        </div>

        <div className="lg:col-span-6">
          <Picture
            image={study.hero}
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[4/3] w-full rounded-xl2 object-cover shadow-card ring-1 ring-line"
          />
        </div>
      </div>

      <dl className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl2 border border-line bg-line sm:grid-cols-3 lg:mt-20">
        {study.stats.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse bg-surface-card px-6 py-7 md:px-8 md:py-9">
            <dt className="mt-2 text-sm leading-snug text-content-dim md:text-base">{stat.label}</dt>
            <dd className="font-display text-3xl font-semibold tracking-tight text-brand md:text-4xl">{stat.value}</dd>
          </div>
        ))}
      </dl>
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
      className="relative mt-20 overflow-hidden border-y border-line bg-surface-subtle md:mt-28"
    >
      {/* Both meshes stop 1rem short of the text column (72rem wide, 2rem
          padding) and the panel clips whatever runs past its edges. */}
      <NetworkMesh seed={3} origin="right" className="-top-6 hidden lg:block" style={{ right: "calc(50% + 35rem)" }} />
      <NetworkMesh seed={11} origin="left" className="-bottom-10 hidden lg:block" style={{ left: "calc(50% + 35rem)" }} />
      <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <h2 id="key-details" className="font-mono text-xs uppercase tracking-[0.22em] text-content-faint">
          Key details
        </h2>
        <p className="mt-4 font-display text-2xl font-semibold tracking-tight text-content md:text-3xl">
          {details.summary}
        </p>
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
      <div className="mt-6 space-y-5 text-base leading-relaxed text-content-dim md:text-lg">{children}</div>
    </section>
  );
}

function Insight({ text }) {
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
        <p className="relative font-mono text-xs uppercase tracking-[0.22em] text-accent-vivid">Primary objective</p>
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
            <span aria-hidden="true" className="absolute bottom-0 left-5 top-11 w-px bg-line-strong" />
          )}
          <span data-num className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-brand/40 bg-surface font-mono text-sm font-medium text-brand">
            {i + 1}
          </span>
          <div className="pt-1.5">
            <h3 className="font-semibold text-content">{step.title}</h3>
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

function TargetBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-gold/40 bg-gold/10 px-2.5 py-0.5 text-xs font-medium text-content">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
      Target (not yet validated)
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
        <caption className="sr-only">Outcome framework: traditional process compared with the AI-agent model</caption>
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

function Picture({ image, sizes, priority = false, className = "" }) {
  const largest = image.sources[image.sources.length - 1];
  return (
    <img
      src={image.sources[1]?.src ?? largest.src}
      srcSet={image.sources.map((s) => `${s.src} ${s.width}w`).join(", ")}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={image.alt}
      loading={priority ? "eager" : "lazy"}
      // React 18 only forwards the lowercase attribute.
      // eslint-disable-next-line react/no-unknown-property
      fetchpriority={priority ? "high" : undefined}
      decoding="async"
      className={className}
    />
  );
}

function Figure({ image, className = "", sizes = "(min-width: 1024px) 48rem, 100vw" }) {
  return (
    <figure className={className}>
      <Picture
        image={image}
        sizes={sizes}
        className="h-auto w-full rounded-xl2 object-cover shadow-card ring-1 ring-line"
      />
    </figure>
  );
}
