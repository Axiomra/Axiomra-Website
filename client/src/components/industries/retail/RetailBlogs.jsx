import { Clock } from "lucide-react";
import SectionHeading from "../../SectionHeading";
import { Stagger, StaggerItem } from "../../motion/Reveal";
import { blogs } from "../../../data/retailData";

/** Three article cards. Static preview only - not clickable until the posts exist. */
export default function RetailBlogs() {
  return (
    <section className="border-t border-line bg-surface-subtle py-24 md:py-32">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={blogs.eyebrow} title={blogs.title} subtitle={blogs.body} />

        <Stagger as="ul" step={0.1} className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {blogs.posts.map((post) => (
            <StaggerItem as="li" key={post.title}>
              <article className="liquid-glass liquid-glass-hover flex h-full flex-col overflow-hidden rounded-[2rem]">
                <img
                  src={post.image}
                  alt={post.alt}
                  width={1200}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/10] w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-7">
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                    {post.tag}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight text-content">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-content-dim">{post.excerpt}</p>
                  <p className="mt-auto flex items-center gap-2 pt-6 text-sm text-content-dim">
                    <Clock size={14} strokeWidth={1.75} aria-hidden="true" />
                    {post.readTime}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
