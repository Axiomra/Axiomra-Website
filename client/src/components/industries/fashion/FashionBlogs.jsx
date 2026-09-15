import SectionHeading from "../../SectionHeading";
import { Stagger, StaggerItem } from "../../motion/Reveal";
import { blogs } from "../../../data/fashionData";

/** Three reads, image-led. Static preview only - not clickable until the blog ships. */
export default function FashionBlogs() {
  return (
    <section className="border-t border-line bg-surface-subtle py-20 md:py-28">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <SectionHeading align="left" eyebrow={blogs.eyebrow} title={blogs.title} subtitle={blogs.body} />

        <Stagger as="ul" step={0.1} className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {blogs.posts.map((post) => (
            <StaggerItem as="li" key={post.title}>
              <article className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-line bg-surface-card p-2 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                <div className="overflow-hidden rounded-[calc(2rem-0.5rem)]">
                  <img
                    src={post.image}
                    alt={post.alt}
                    width={1200}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[3/2] w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 items-start justify-between gap-4 px-4 pb-4 pt-5">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{post.tag}</span>
                    <h3 className="mt-2 font-display text-lg font-semibold leading-snug tracking-tight text-content md:text-xl">
                      {post.title}
                    </h3>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
