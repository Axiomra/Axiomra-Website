/**
 * Remote imagery used across the marketing sections.
 *
 * These are Unsplash CDN URLs rather than bundled assets so the repo stays
 * light. Swap any entry for a local `import` from ../assets when the real
 * brand photography lands — every consumer reads through these maps, so a
 * single edit here changes the whole site.
 */
const unsplash = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/** Service cards — one visual per offering, keyed by the card title. */
export const SERVICE_IMAGES = {
  "AI Development": unsplash("1518770660439-4636190af475"),
  "Machine Learning": unsplash("1551288049-bebda4e38f71"),
  "AI Agents & Agentic AI": unsplash("1620712943543-bcc4688e7485"),
  "Business Process Automation": unsplash("1581091226825-a6a2a5aee158"),
  "Natural Language Processing": unsplash("1526374965328-7f61d4dc18c5"),
  "Computer Vision": unsplash("1555255707-c07966088b7b"),
  "Business Intelligence": unsplash("1460925895917-afdab827c52f"),
  "Generative AI": unsplash("1677442136019-21780ecad995"),
};

/** Industry tiles — the hover image that floods the whole grid panel. */
export const INDUSTRY_IMAGES = {
  Healthcare: unsplash("1576091160399-112ba8d25d1d", 1600),
  Education: unsplash("1509062522246-3755977927d7", 1600),
  Fashion: unsplash("1441984904996-e0b6ba687e04", 1600),
  "Real Estate": unsplash("1560518883-ce09059eeffa", 1600),
  Sports: unsplash("1546519638-68e109498ffc", 1600),
  Retail: unsplash("1481437156560-3205f6a55735", 1600),
  Transportation: unsplash("1494412574643-ff11b0a5c1c3", 1600),
  "Supply Chain": unsplash("1494412651409-8963ce7935a7", 1600),
  Finance: unsplash("1611974789855-9c2a0a7236a3", 1600),
  Insurance: unsplash("1450101499163-c8848c66ca85", 1600),
  "Legal Business": unsplash("1589829545856-d10d557cf95f", 1600),
  Marketing: unsplash("1552664730-d307ca884978", 1600),
};

/** Blog / resource cards. */
export const RESOURCE_IMAGES = {
  // MVP vs full-scale: a product team mapping scope on a sprint board says
  // more about the trade-off than a generic robot shot.
  "MVP vs. Full-Scale Custom AI Development": unsplash("1531403009284-440f080d1e12"),
  "Custom AI Development Timeline — 2026 Benchmarks": unsplash("1518186285589-2f7649de83e0"),
  "Why AI Projects Fail: 10 Root Causes": unsplash("1454165804606-c3d57bc86b40"),
};

/** Misc one-offs. */
export const METRIC_IMAGE = unsplash("1516321318423-f06f85e504b3", 600);

/** Intro video shown beside the contact form (privacy-friendly host). */
export const INTRO_VIDEO = {
  id: "2ePf9rue1Ao",
  title: "What is Artificial Intelligence? In 5 minutes",
  poster: "https://i.ytimg.com/vi/2ePf9rue1Ao/maxresdefault.jpg",
  embed: "https://www.youtube-nocookie.com/embed/2ePf9rue1Ao?autoplay=1&rel=0",
};
