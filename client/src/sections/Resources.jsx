import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import { formatPostDate, listPosts } from "../lib/blogApi";
import { afterLoadIdle } from "../lib/idle";
import { BLOG_PATH, blogPostPath } from "../routes.constants";

/**
 * The latest posts published from the admin panel. The section renders
 * nothing until the API returns at least one post, so it stays hidden while
 * the blog is empty. Asked for only after the page is idle, like the footer's
 * blog link, so the prerendered HTML and first paint never wait on the API.
 */
export default function Resources() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const ctrl = new AbortController();
    const cancel = afterLoadIdle(() => {
      listPosts(3, ctrl.signal)
        .then((data) => setPosts(data.items ?? []))
        .catch(() => {});
    });
    return () => {
      cancel?.();
      ctrl.abort();
    };
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="mx-auto max-w-8xl px-4 py-24 sm:px-6">
      <SectionHeading
        className="mb-14"
        eyebrow="Resources"
        title={
          <>
            Know What&rsquo;s <span className="text-brand">Trending In AI</span>
          </>
        }
        subtitle="Field notes from the projects we ship: benchmarks, budgets, and the mistakes worth skipping."
      />

      <div className="grid gap-8 sm:grid-cols-3">
        {posts.map((post, i) => (
          <motion.div
            key={post._id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -8 }}
          >
            <Link
              to={blogPostPath(post.slug)}
              className="group block h-full overflow-hidden rounded-xl2 border border-line shadow-card transition-[border-color,box-shadow] duration-300 hover:border-brand/50 hover:shadow-glow focus-ring"
            >
              <div className="relative flex aspect-[16/10] items-end overflow-hidden bg-inverse p-5">
                {post.coverImage && (
                  <img
                    src={post.coverImage}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-inverse via-inverse/50 to-inverse/10" />
                {post.publishedAt && (
                  <time
                    dateTime={post.publishedAt}
                    className="relative rounded-full border border-accent-vivid/40 bg-accent-vivid/15 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-accent-vivid backdrop-blur-sm"
                  >
                    {formatPostDate(post.publishedAt)}
                  </time>
                )}
              </div>
              <div className="bg-surface-card p-6">
                <h3 className="font-display text-xl leading-snug text-content transition-colors group-hover:text-brand">
                  {post.title}
                </h3>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-content-faint transition-colors group-hover:text-brand">
                  Read More
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          to={BLOG_PATH}
          className="inline-flex items-center gap-1.5 font-medium text-brand hover:underline focus-ring"
        >
          View all posts <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}
