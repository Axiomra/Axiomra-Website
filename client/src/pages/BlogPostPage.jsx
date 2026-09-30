import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Seo from "../seo/Seo";
import BlogContent from "../components/blog/BlogContent";
import NotFoundPage from "./NotFoundPage";
import { formatPostDate, getPost } from "../lib/blogApi";
import { BLOG_PATH } from "../routes.constants";

export default function BlogPostPage() {
  const { slug } = useParams();
  // Tagged with the slug it answers, so moving to another post reads as
  // "loading" until its own response lands, without resetting state here.
  const [result, setResult] = useState({ slug: null });

  useEffect(() => {
    const ctrl = new AbortController();
    getPost(slug, ctrl.signal)
      .then((data) => setResult({ slug, state: "ready", post: data }))
      .catch((err) => {
        if (err.name === "AbortError") return;
        setResult({ slug, state: err.status === 404 ? "missing" : "error" });
      });
    return () => ctrl.abort();
  }, [slug]);

  const state = result.slug === slug ? result.state : "loading";
  const post = result.slug === slug ? result.post : null;

  if (state === "missing") return <NotFoundPage />;

  return (
    <article className="mx-auto min-h-[70vh] max-w-3xl px-4 pb-24 pt-32 sm:px-6">
      <Link
        to={BLOG_PATH}
        className="mb-8 inline-flex items-center gap-2 text-sm text-content-dim hover:text-brand focus-ring"
      >
        <ArrowLeft size={16} /> All posts
      </Link>

      {state === "loading" && <p className="text-content-dim">Loading…</p>}
      {state === "error" && (
        <p className="text-content-dim">Could not load this post. Please try again later.</p>
      )}

      {state === "ready" && post && (
        <>
          <Seo
            title={`${post.title} | Axiomra`}
            description={post.excerpt || undefined}
            type="article"
            {...(post.coverImage ? { image: post.coverImage } : {})}
          />
          <h1 className="mb-4 font-display text-4xl font-semibold leading-tight md:text-5xl">
            {post.title}
          </h1>
          <p className="mb-10 text-content-dim">
            {post.author} ·{" "}
            <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
          </p>
          {post.coverImage && (
            <img
              src={post.coverImage}
              alt=""
              className="mb-10 aspect-[16/9] w-full rounded-2xl object-cover"
            />
          )}
          <BlogContent content={post.content} />
        </>
      )}
    </article>
  );
}
