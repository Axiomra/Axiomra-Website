import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../seo/Seo";
import { formatPostDate, listPosts } from "../lib/blogApi";
import { blogPostPath } from "../routes.constants";

export default function BlogListPage() {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const ctrl = new AbortController();
    listPosts(50, ctrl.signal)
      .then((data) => setPosts(data.items))
      .catch((err) => {
        if (err.name !== "AbortError") setError("Could not load posts. Please try again later.");
      });
    return () => ctrl.abort();
  }, []);

  return (
    <section className="mx-auto min-h-[70vh] max-w-6xl px-4 pb-24 pt-32 sm:px-6">
      <Seo
        title="Blog | Axiomra"
        description="Notes from the Axiomra team on AI, computer vision, and building software that pays for itself."
      />
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">Blog</p>
      <h1 className="mb-12 font-display text-4xl font-semibold md:text-5xl">
        Insights from Axiomra
      </h1>

      {error && <p className="text-content-dim">{error}</p>}
      {!error && posts === null && <p className="text-content-dim">Loading posts…</p>}
      {posts?.length === 0 && <p className="text-content-dim">No posts yet. Check back soon.</p>}

      {posts?.length > 0 && (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post._id}
              to={blogPostPath(post.slug)}
              className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 focus-ring"
            >
              {post.coverImage && (
                <img
                  src={post.coverImage}
                  alt=""
                  loading="lazy"
                  className="aspect-[16/9] w-full object-cover"
                />
              )}
              <div className="flex flex-1 flex-col p-6">
                <time className="mb-2 text-sm text-content-dim" dateTime={post.publishedAt}>
                  {formatPostDate(post.publishedAt)}
                </time>
                <h2 className="mb-3 font-display text-xl font-semibold text-content group-hover:text-brand">
                  {post.title}
                </h2>
                {post.excerpt && <p className="text-content-dim">{post.excerpt}</p>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
