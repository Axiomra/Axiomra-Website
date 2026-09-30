import { afterEach, describe, expect, it } from "vitest";
import {
  countStrings,
  makeDupes,
  parseModule,
  setCompanyStats,
  stringOf,
} from "../rag/loaders/ast.js";
import { dataFileDocument } from "../rag/loaders/dataFiles.js";
import { jsxDocument } from "../rag/loaders/jsxPages.js";
import { fillStats, markdownToText, splitTitle } from "../rag/loaders/markdown.js";

const noDupes = { dupes: makeDupes(new Map()) };

describe("data file loader", () => {
  const code = `
    import hero from "../assets/hero.png";
    export const faqs = [
      {
        id: "pricing",
        icon: "FiDollarSign",
        className: "bg-slate-900 text-white rounded-xl",
        question: "How do you price an AI project?",
        answer: "Every project gets a fixed-scope estimate based on complexity, team size and timeline.",
        href: "/contact",
        color: "#1f2937",
        image: hero,
      },
    ];
    export const services = [
      {
        title: "Custom AI agents",
        description: "Agents that read your documents and act inside your existing tools.",
        features: ["Retrieval over internal knowledge bases", "Human approval before any action"],
      },
    ];
  `;
  const doc = dataFileDocument("faqsData.js", parseModule(code), noDupes);

  it("keeps key/value structure with object labels as headings", () => {
    expect(doc.source).toBe("/faqs");
    expect(doc.text).toMatch(/# Faqs/);
    expect(doc.text).toMatch(/#+ How do you price an AI project\?/);
    expect(doc.text).toContain("Every project gets a fixed-scope estimate");
    expect(doc.text).toMatch(/#+ Custom AI agents/);
    expect(doc.text).toContain("Retrieval over internal knowledge bases");
  });

  it("filters ids, icons, classes, colours, paths and imports", () => {
    for (const noise of [
      "pricing",
      "FiDollarSign",
      "bg-slate-900",
      "#1f2937",
      "/contact",
      "hero.png",
    ]) {
      expect(doc.text).not.toContain(noise);
    }
  });

  it("drops short strings repeated across 3+ files", () => {
    const a = parseModule(
      `export const a = [{ title: "Card one heading here", body: "Book a free consultation today" }];`
    );
    const b = parseModule(`export const b = [{ body: "Book a free consultation today" }];`);
    const c = parseModule(`export const c = [{ body: "Book a free consultation today" }];`);
    const ctx = { dupes: makeDupes(countStrings([a, b, c])) };
    const out = dataFileDocument("aboutData.js", a, ctx);
    expect(out.text).toContain("Card one heading here");
    expect(out.text).not.toContain("Book a free consultation");
  });
});

describe("JSX page loader", () => {
  const code = `
    export default function About() {
      return (
        <section className="py-24">
          <h2>Why teams choose Axiomra</h2>
          <p>We ship production AI systems with measurable outcomes, not demos.</p>
          <ul>
            <li>Senior engineers on every project from week one.</li>
          </ul>
          <button>Get started today with us</button>
          <span className="sr-only">Decorative screen reader label text</span>
          <SectionHeading title="How we work with clients" description="Discovery, a scoped proof of concept, then production." />
        </section>
      );
    }
  `;
  const doc = jsxDocument(
    { source: "/about", title: "About", component: "About.jsx" },
    parseModule(code),
    noDupes
  );

  it("extracts headings, paragraphs, list items and copy props", () => {
    expect(doc.text).toMatch(/#+ Why teams choose Axiomra/);
    expect(doc.text).toContain("We ship production AI systems");
    expect(doc.text).toContain("- Senior engineers on every project");
    expect(doc.text).toMatch(/#+ How we work with clients/);
    expect(doc.text).toContain("Discovery, a scoped proof of concept");
  });

  it("skips buttons, screen-reader text and class names", () => {
    expect(doc.text).not.toContain("Get started today");
    expect(doc.text).not.toContain("Decorative screen reader");
    expect(doc.text).not.toContain("py-24");
  });
});

describe("markdown loader", () => {
  it("strips front matter, code, images and link targets", () => {
    const md =
      "---\ntitle: x\n---\n# Our values\nWe [publish](https://x.y) openly.\n\n![logo](a.png)\n\n```js\nsecret()\n```\nDone.";
    const text = markdownToText(md);
    expect(text).toContain("We publish openly.");
    expect(text).not.toMatch(/https:|a\.png|secret\(\)|title: x/);
    expect(splitTitle(text, "fallback").title).toBe("Our values");
  });
});

const stats = { projects: 500, experts: 40, pocRange: { min: 15, max: 40 } };

describe("figures in RAG sources", () => {
  afterEach(() => setCompanyStats(null));
  const expr = (code) => parseModule(`const x = ${code};`).program.body[0].declarations[0].init;

  it("resolves companyStats in template literals and plain member access", () => {
    setCompanyStats(stats);
    expect(stringOf(expr("`${companyStats.experts}+ engineers`"))).toBe("40+ engineers");
    expect(stringOf(expr("`$${companyStats.pocRange.min}k`"))).toBe("$15k");
    expect(stringOf(expr("companyStats.projects"))).toBe("500");
    expect(stringOf(expr("companyStats.missing"))).toBeNull();
    expect(stringOf(expr("`${other.value}+`"))).toBeNull();
  });

  it("leaves them unresolved without stats", () => {
    expect(stringOf(expr("`${companyStats.experts}+`"))).toBeNull();
  });

  it("fills markdown tokens and rejects unknown keys", () => {
    expect(
      fillStats("PoC ${{companyStats.pocRange.min}}k–${{ companyStats.pocRange.max }}k", stats)
    ).toBe("PoC $15k–$40k");
    expect(() => fillStats("{{companyStats.budget}}", stats)).toThrow(/Unknown figure/);
  });
});
