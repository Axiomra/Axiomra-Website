import SectionHeading from "../../SectionHeading";
import { Stagger, StaggerItem } from "../../motion/Reveal";
import { blogs } from "../../../data/legalData";

/** Three article cards. Static preview only - not clickable until the posts exist. */
export default function LegalBlogs() {
  return (
    <section className="border-t border-line bg-surface-subtle py-24 md:py-32">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={blogs.eyebrow} title={blogs.title} subtitle={blogs.body} />

        <Stagger as="ul" step={0.1} className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {blogs.posts.map((post) => (
            <StaggerItem as="li" key={post.title}>
              <article
                className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-line bg-surface-card transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
              >
                <img
                  src={post.image}
                  alt={post.alt}
                  width={1200}
                  height={750}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/10] w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-7">
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{post.tag}</span>
                  <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight text-content">
                    {post.title}
                  </h3>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
