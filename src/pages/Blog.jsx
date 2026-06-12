import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fetchBlogs, BLOG_CATEGORIES } from "../api/blogApi";

const FILTERS = ["All Articles", ...BLOG_CATEGORIES];

const CATEGORY_STYLES = {
  "Hospital Bills": "bg-purple-100 text-purple-700",
  "Financial Assistance": "bg-blue-100 text-blue-700",
  "Medical Debt": "bg-pink-100 text-pink-700",
  "Patient Rights": "bg-emerald-100 text-emerald-700",
  "Saving Money": "bg-amber-100 text-amber-700",
  "Success Stories": "bg-indigo-100 text-indigo-700",
};

function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const CoverFallback = ({ className = "" }) => (
  <div
    className={`flex items-center justify-center bg-gradient-to-br from-[#3b1578] via-[#5b21b6] to-[#7c3aed] ${className}`}
  >
    <svg
      className="w-12 h-12 text-white/40"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2z"
      />
    </svg>
  </div>
);

const ArticleCard = ({ post, index }) => (
  <Link
    to={`/blog/${post.slug}`}
    className="group flex flex-col bg-white border border-purple-200/70 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 animate-blog-fade-up"
    style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}
  >
    <div className="relative h-44 overflow-hidden">
      {post.coverImageUrl ? (
        <img
          src={post.coverImageUrl}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <CoverFallback className="w-full h-full" />
      )}
      <span
        className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold ${
          CATEGORY_STYLES[post.category] || "bg-purple-100 text-purple-700"
        }`}
      >
        {post.category}
      </span>
    </div>
    <div className="flex flex-col flex-1 p-5 md:p-6">
      <h3 className="text-[18px] md:text-[20px] font-bold text-gray-900 leading-snug mb-2 line-clamp-2 group-hover:text-purple-700 transition-colors">
        {post.title}
      </h3>
      <p className="text-[14px] text-gray-600 leading-6 mb-4 line-clamp-3">
        {post.excerpt}
      </p>
      <div className="mt-auto flex items-center justify-between text-[12px] text-gray-500">
        <span>{formatDate(post.publishedAt)}</span>
        <span className="inline-flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {post.readTime || 1} min read
        </span>
      </div>
    </div>
  </Link>
);

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All Articles");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(
    async (opts) => {
      const { category, term, pageNum, append } = opts;
      try {
        setLoading(true);
        setError(null);
        const res = await fetchBlogs({
          category,
          search: term || undefined,
          page: pageNum,
          limit: 9,
        });
        if (res.success) {
          setPosts((prev) => (append ? [...prev, ...res.data] : res.data));
          setPagination(res.pagination || { totalPages: 1 });
          if (!append) setFeatured(res.featured || null);
        }
      } catch (err) {
        console.error("Failed to load blogs:", err);
        setError("We couldn't load articles right now. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    setPage(1);
    load({ category: activeFilter, term: search, pageNum: 1, append: false });
  }, [activeFilter, search, load]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput.trim());
  };

  const loadMore = () => {
    const next = page + 1;
    setPage(next);
    load({ category: activeFilter, term: search, pageNum: next, append: true });
  };

  // The featured banner only makes sense in the unfiltered, unsearched view
  const showFeatured =
    featured && activeFilter === "All Articles" && !search;

  return (
    <div className="font-sans text-gray-900 bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1e0a3c] via-[#3a1078] to-[#4c1d95] pt-32 md:pt-40 pb-16 md:pb-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, rgba(168,85,247,0.35) 0, transparent 40%), radial-gradient(circle at 80% 0%, rgba(99,102,241,0.35) 0, transparent 45%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 md:px-6 text-center">
          <p className="text-[11px] md:text-[12px] font-bold tracking-[0.3em] text-purple-300 uppercase mb-4 animate-blog-fade-in">
            Hospital Debt Relief Blog
          </p>
          <h1 className="text-[34px] md:text-[52px] lg:text-[60px] font-extrabold text-white leading-[1.1] mb-5 animate-blog-fade-up">
            Knowledge That Saves You Money
          </h1>
          <p className="text-[14px] md:text-[18px] text-purple-100/80 max-w-2xl mx-auto leading-relaxed mb-8 animate-blog-fade-up" style={{ animationDelay: "100ms" }}>
            Tips, guides, and real stories to help you navigate hospital bills,
            financial assistance programs, and your path to debt relief.
          </p>
          <form
            onSubmit={handleSearch}
            className="relative max-w-xl mx-auto animate-blog-fade-up"
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex items-center bg-white rounded-full shadow-xl p-1.5 pl-5">
              <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search articles..."
                className="flex-1 px-3 py-2.5 text-[14px] md:text-[15px] text-gray-800 bg-transparent outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-gradient-to-r from-purple-700 to-indigo-700 px-6 md:px-7 py-2.5 text-white text-[14px] font-semibold hover:from-purple-600 hover:to-indigo-600 transition"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Category filters */}
      <section className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-purple-100">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex gap-2.5 overflow-x-auto thin-scrollbar py-4 -mb-px">
            {FILTERS.map((filter) => {
              const active = filter === activeFilter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-[13px] md:text-[14px] font-semibold transition-all ${
                    active
                      ? "bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-md"
                      : "bg-white text-gray-600 border border-purple-200 hover:border-purple-400 hover:text-purple-700"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured + CTA */}
      {showFeatured && (
        <section className="max-w-6xl mx-auto px-4 md:px-6 pt-10 md:pt-14">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Featured article */}
            <Link
              to={`/blog/${featured.slug}`}
              className="lg:col-span-2 group relative rounded-3xl overflow-hidden min-h-[320px] md:min-h-[380px] flex shadow-lg animate-blog-fade-up"
            >
              {featured.coverImageUrl ? (
                <img
                  src={featured.coverImageUrl}
                  alt={featured.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <CoverFallback className="absolute inset-0 w-full h-full" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e0a3c]/95 via-[#2d0a4e]/70 to-transparent" />
              <div className="relative mt-auto p-6 md:p-9 text-white">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-amber-300 mb-3">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 7.1-1.01L12 2z" /></svg>
                  Featured Article
                </span>
                <h2 className="text-[24px] md:text-[34px] font-extrabold leading-tight mb-3 max-w-xl">
                  {featured.title}
                </h2>
                <p className="text-[14px] md:text-[15px] text-purple-100/80 max-w-lg line-clamp-2 mb-4">
                  {featured.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-[14px] font-semibold text-white group-hover:gap-3 transition-all">
                  Read Article
                  <span>→</span>
                </span>
              </div>
            </Link>

            {/* Eligibility CTA */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#4c1d95] to-[#6d28d9] p-7 md:p-8 flex flex-col text-white shadow-lg animate-blog-fade-up" style={{ animationDelay: "120ms" }}>
              <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10 animate-blog-float" aria-hidden="true" />
              <h3 className="relative text-[22px] md:text-[26px] font-extrabold leading-tight mb-3">
                Your Hospital Bill Could Be Reduced
              </h3>
              <p className="relative text-[14px] text-purple-100/85 leading-relaxed mb-6">
                Check your eligibility in under 2 minutes. Free for 90 days — no
                credit card needed.
              </p>
              <Link
                to="/signup"
                className="relative inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 hover:bg-amber-300 text-[#3b0764] px-6 py-3 text-[15px] font-bold transition mb-3"
              >
                Check My Eligibility →
              </Link>
              <p className="relative text-[11px] text-purple-200/70 text-center">
                Unsubscribe after trial. Cancel anytime.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Article grid */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-14 min-h-[40vh]">
        {(activeFilter !== "All Articles" || search) && (
          <h2 className="text-[20px] md:text-[24px] font-bold text-gray-900 mb-6">
            {search ? `Results for “${search}”` : activeFilter}
          </h2>
        )}

        {error && (
          <div className="text-center py-16">
            <p className="text-gray-500">{error}</p>
          </div>
        )}

        {!error && loading && posts.length === 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-3xl border border-purple-100 overflow-hidden animate-pulse">
                <div className="h-44 bg-purple-100/60" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-purple-100/60 rounded w-3/4" />
                  <div className="h-3 bg-purple-100/50 rounded" />
                  <div className="h-3 bg-purple-100/50 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!error && !loading && posts.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4">
              <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-[18px] font-bold text-gray-900 mb-1">No articles found</h3>
            <p className="text-gray-500 text-[14px]">
              {search
                ? "Try a different search term or category."
                : "New articles are on the way — check back soon."}
            </p>
          </div>
        )}

        {posts.length > 0 && (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <ArticleCard key={post._id} post={post} index={i} />
              ))}
            </div>

            {page < pagination.totalPages && (
              <div className="text-center mt-10">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-purple-600 px-8 py-3 text-[15px] font-semibold text-purple-700 hover:bg-purple-50 transition disabled:opacity-60"
                >
                  {loading ? "Loading..." : "Load more articles"}
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
