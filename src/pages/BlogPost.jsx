import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fetchBlogBySlug } from "../api/blogApi";

function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const RelatedCard = ({ post }) => (
  <Link
    to={`/blog/${post.slug}`}
    className="group flex flex-col bg-white border border-purple-200/70 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
  >
    <div className="h-36 overflow-hidden">
      {post.coverImageUrl ? (
        <img
          src={post.coverImageUrl}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-[#3b1578] to-[#7c3aed]" />
      )}
    </div>
    <div className="p-4">
      <span className="text-[11px] font-semibold text-purple-600 uppercase tracking-wide">
        {post.category}
      </span>
      <h4 className="text-[15px] font-bold text-gray-900 leading-snug mt-1 line-clamp-2 group-hover:text-purple-700 transition-colors">
        {post.title}
      </h4>
    </div>
  </Link>
);

const BlogPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setNotFound(false);
    window.scrollTo({ top: 0 });
    (async () => {
      try {
        const res = await fetchBlogBySlug(slug);
        if (!active) return;
        if (res.success && res.data) {
          setPost(res.data);
          setRelated(res.related || []);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        if (!active) return;
        console.error("Failed to load post:", err);
        setNotFound(true);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="font-sans bg-white min-h-screen">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 pt-40 pb-20 animate-pulse">
          <div className="h-5 w-32 bg-purple-100 rounded mb-6" />
          <div className="h-10 bg-purple-100 rounded w-3/4 mb-4" />
          <div className="h-10 bg-purple-100 rounded w-1/2 mb-8" />
          <div className="h-72 bg-purple-100 rounded-2xl mb-8" />
          <div className="space-y-3">
            <div className="h-4 bg-purple-100 rounded" />
            <div className="h-4 bg-purple-100 rounded w-5/6" />
            <div className="h-4 bg-purple-100 rounded w-4/6" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="font-sans bg-white min-h-screen">
        <Navbar />
        <div className="max-w-xl mx-auto px-4 pt-40 pb-32 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-100 mb-6">
            <svg className="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-[26px] font-extrabold text-gray-900 mb-2">Article not found</h1>
          <p className="text-gray-500 mb-8">
            This article may have been moved or unpublished.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-700 to-indigo-700 px-7 py-3 text-white font-semibold hover:from-purple-600 hover:to-indigo-600 transition"
          >
            ← Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="font-sans text-gray-900 bg-white">
      <Navbar />

      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1e0a3c] via-[#3a1078] to-[#4c1d95] pt-32 md:pt-40 pb-16 md:pb-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle at 15% 20%, rgba(168,85,247,0.35) 0, transparent 42%), radial-gradient(circle at 85% 10%, rgba(99,102,241,0.3) 0, transparent 45%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 md:px-6">
          <button
            onClick={() => navigate("/blog")}
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-purple-200 hover:text-white transition mb-6 animate-blog-fade-in"
          >
            ← Back to Blog
          </button>
          <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-white text-[12px] font-semibold mb-4 animate-blog-fade-in">
            {post.category}
          </span>
          <h1 className="text-[28px] md:text-[44px] font-extrabold text-white leading-tight mb-5 animate-blog-fade-up">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-purple-100/80 text-[13px] md:text-[14px] animate-blog-fade-up" style={{ animationDelay: "100ms" }}>
            <span className="inline-flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/20 text-white text-[12px] font-bold">
                {(post.author || "H")[0]}
              </span>
              {post.author}
            </span>
            <span>{formatDate(post.publishedAt)}</span>
            <span className="inline-flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readTime || 1} min read
            </span>
          </div>
        </div>
      </section>

      {/* Body */}
      <article className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-14">
        {post.coverImageUrl && (
          <img
            src={post.coverImageUrl}
            alt={post.title}
            className="w-full rounded-3xl shadow-lg mb-10 -mt-20 md:-mt-28 relative z-10 max-h-[460px] object-cover animate-blog-fade-up"
          />
        )}

        {post.excerpt && (
          <p className="text-[18px] md:text-[20px] text-gray-700 font-medium leading-relaxed mb-8 border-l-4 border-purple-500 pl-5">
            {post.excerpt}
          </p>
        )}

        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />

        {/* Tags */}
        {Array.isArray(post.tags) && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-100">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 text-[12px] font-semibold"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Inline CTA */}
        <div className="relative mt-12 rounded-3xl overflow-hidden bg-gradient-to-br from-[#3a1078] to-[#6d28d9] p-7 md:p-10 text-white text-center">
          <h3 className="text-[22px] md:text-[28px] font-extrabold mb-3">
            Could your hospital bill be reduced?
          </h3>
          <p className="text-purple-100/85 max-w-xl mx-auto mb-6 text-[14px] md:text-[16px]">
            Check your eligibility in under 2 minutes. Free for 90 days — no
            credit card needed.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 rounded-full bg-amber-400 hover:bg-amber-300 text-[#3b0764] px-8 py-3 font-bold transition"
          >
            Check My Eligibility →
          </Link>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-[#F7F5FF] py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <h2 className="text-[22px] md:text-[28px] font-bold text-gray-900 mb-8">
              Related articles
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <RelatedCard key={r._id} post={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogPostPage;
