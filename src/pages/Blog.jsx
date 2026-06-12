import React, { useEffect, useRef, useState, useCallback } from "react";
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
    month: "short",
    day: "numeric",
  });
}

function initials(name) {
  if (!name) return "H";
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] || "") + (parts[1]?.[0] || "")).toUpperCase() || "H";
}

/* Reveals children with a fade-up the first time they scroll into view. */
const Reveal = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(28px)",
        transition: `opacity .7s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .7s cubic-bezier(.16,1,.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

const CoverFallback = ({ className = "" }) => (
  <div
    className={`flex items-center justify-center bg-gradient-to-br from-[#3b1578] via-[#5b21b6] to-[#7c3aed] ${className}`}
  >
    <svg className="w-12 h-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2z"
      />
    </svg>
  </div>
);

const ClockIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ArticleCard = ({ post }) => (
  <Link
    to={`/blog/${post.slug}`}
    className="group relative flex flex-col bg-white rounded-3xl overflow-hidden ring-1 ring-purple-100 shadow-[0_4px_24px_-12px_rgba(76,29,149,0.18)] hover:shadow-[0_24px_48px_-20px_rgba(76,29,149,0.45)] hover:-translate-y-1.5 transition-all duration-300"
  >
    {/* gradient ring on hover */}
    <span className="pointer-events-none absolute inset-0 rounded-3xl ring-2 ring-transparent group-hover:ring-purple-400/40 transition-all duration-300" />

    <div className="relative h-48 overflow-hidden">
      {post.coverImageUrl ? (
        <img
          src={post.coverImageUrl}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[900ms] ease-out"
        />
      ) : (
        <CoverFallback className="w-full h-full" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <span
        className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold backdrop-blur-sm ${
          CATEGORY_STYLES[post.category] || "bg-purple-100 text-purple-700"
        }`}
      >
        {post.category}
      </span>
      <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/45 text-white text-[11px] font-medium backdrop-blur-sm">
        <ClockIcon className="w-3 h-3" />
        {post.readTime || 1} min
      </span>

      {/* hover arrow */}
      <span className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white text-purple-700 flex items-center justify-center shadow-lg translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </span>
    </div>

    <div className="flex flex-col flex-1 p-5 md:p-6">
      <h3 className="text-[18px] md:text-[20px] font-bold text-gray-900 leading-snug mb-2 line-clamp-2 group-hover:text-purple-700 transition-colors">
        {post.title}
      </h3>
      <p className="text-[14px] text-gray-600 leading-6 mb-5 line-clamp-2">
        {post.excerpt}
      </p>

      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 flex-shrink-0 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white text-[11px] font-bold flex items-center justify-center ring-2 ring-white shadow">
            {initials(post.author)}
          </div>
          <div className="leading-tight min-w-0">
            <p className="text-[12px] font-semibold text-gray-800 truncate max-w-[120px]">
              {post.author}
            </p>
            <p className="text-[11px] text-gray-400">{formatDate(post.publishedAt)}</p>
          </div>
        </div>
        <span className="text-[13px] font-semibold text-purple-700 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300">
          Read
          <span>→</span>
        </span>
      </div>
    </div>
  </Link>
);

const CardSkeleton = () => (
  <div className="rounded-3xl ring-1 ring-purple-100 overflow-hidden animate-pulse">
    <div className="h-48 bg-purple-100/60" />
    <div className="p-6 space-y-3">
      <div className="h-4 bg-purple-100/60 rounded w-3/4" />
      <div className="h-3 bg-purple-100/50 rounded" />
      <div className="h-3 bg-purple-100/50 rounded w-5/6" />
      <div className="pt-3 flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-purple-100/70" />
        <div className="h-3 bg-purple-100/50 rounded w-24" />
      </div>
    </div>
  </div>
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

  const load = useCallback(async (opts) => {
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
  }, []);

  useEffect(() => {
    setPage(1);
    load({ category: activeFilter, term: search, pageNum: 1, append: false });
  }, [activeFilter, search, load]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput.trim());
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearch("");
  };

  const loadMore = () => {
    const next = page + 1;
    setPage(next);
    load({ category: activeFilter, term: search, pageNum: next, append: true });
  };

  const showFeatured = featured && activeFilter === "All Articles" && !search;

  return (
    <div className="font-sans text-gray-900 bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a0833] via-[#3a1078] to-[#4c1d95] pt-32 md:pt-40 pb-20 md:pb-28">
        {/* dotted pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          aria-hidden="true"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 75%)",
          }}
        />
        {/* floating glow orbs */}
        <div className="pointer-events-none absolute -top-16 -left-10 w-72 h-72 rounded-full bg-purple-500/30 blur-3xl animate-blog-float" aria-hidden="true" />
        <div className="pointer-events-none absolute top-10 right-0 w-80 h-80 rounded-full bg-indigo-500/25 blur-3xl animate-blog-float" style={{ animationDelay: "1.5s" }} aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 w-96 h-96 rounded-full bg-fuchsia-600/20 blur-3xl animate-blog-float" style={{ animationDelay: "3s" }} aria-hidden="true" />

        <div className="relative max-w-4xl mx-auto px-4 md:px-6 text-center">
          <p className="inline-flex items-center gap-2 text-[11px] md:text-[12px] font-bold tracking-[0.25em] text-purple-200 uppercase mb-5 px-4 py-1.5 rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur-sm animate-blog-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
            Hospital Debt Relief Blog
          </p>
          <h1 className="text-[34px] md:text-[54px] lg:text-[62px] font-extrabold text-white leading-[1.08] mb-5 animate-blog-fade-up">
            Knowledge That{" "}
            <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300 bg-clip-text text-transparent">
              Saves You Money
            </span>
          </h1>
          <p
            className="text-[14px] md:text-[18px] text-purple-100/80 max-w-2xl mx-auto leading-relaxed mb-8 animate-blog-fade-up"
            style={{ animationDelay: "100ms" }}
          >
            Tips, guides, and real stories to help you navigate hospital bills,
            financial assistance programs, and your path to debt relief.
          </p>

          <form
            onSubmit={handleSearch}
            className="relative max-w-xl mx-auto animate-blog-fade-up"
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex items-center bg-white rounded-full shadow-2xl shadow-purple-950/40 p-1.5 pl-5 ring-2 ring-transparent focus-within:ring-amber-300/60 transition">
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
                className="rounded-full bg-gradient-to-r from-purple-700 to-indigo-700 px-6 md:px-7 py-2.5 text-white text-[14px] font-semibold hover:from-purple-600 hover:to-indigo-600 hover:scale-[1.03] active:scale-95 transition-transform"
              >
                Search
              </button>
            </div>
          </form>

          {/* trust chips */}
          <div
            className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] md:text-[13px] text-purple-100/75 animate-blog-fade-up"
            style={{ animationDelay: "300ms" }}
          >
            {["Free expert guides", "Real success stories", "Updated regularly"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4L8.5 12l6.8-6.7a1 1 0 011.4 0z" clipRule="evenodd" />
                </svg>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* bottom fade into page */}
        <div className="pointer-events-none absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white to-transparent" aria-hidden="true" />
      </section>

      {/* Category filters */}
      <section className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-purple-100">
        <div className="max-w-6xl mx-auto px-4 md:px-6 relative">
          {/* edge fades */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10" aria-hidden="true" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10" aria-hidden="true" />
          <div className="flex gap-2.5 overflow-x-auto thin-scrollbar py-4">
            {FILTERS.map((filter) => {
              const active = filter === activeFilter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-[13px] md:text-[14px] font-semibold transition-all duration-200 ${
                    active
                      ? "bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-md shadow-purple-700/30 scale-105"
                      : "bg-white text-gray-600 border border-purple-200 hover:border-purple-400 hover:text-purple-700 hover:-translate-y-0.5"
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
        <section className="max-w-6xl mx-auto px-4 md:px-6 pt-12 md:pt-16">
          <Reveal className="grid lg:grid-cols-3 gap-6">
            {/* Featured article */}
            <Link
              to={`/blog/${featured.slug}`}
              className="lg:col-span-2 group relative rounded-[28px] overflow-hidden min-h-[340px] md:min-h-[420px] flex shadow-xl shadow-purple-900/10"
            >
              {featured.coverImageUrl ? (
                <img
                  src={featured.coverImageUrl}
                  alt={featured.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                />
              ) : (
                <CoverFallback className="absolute inset-0 w-full h-full" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#160726] via-[#2d0a4e]/75 to-transparent" />
              <div className="relative mt-auto p-6 md:p-9 text-white w-full">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-amber-300 mb-3">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 7.1-1.01L12 2z" />
                  </svg>
                  Featured Article
                </span>
                <h2 className="text-[24px] md:text-[36px] font-extrabold leading-tight mb-3 max-w-xl">
                  {featured.title}
                </h2>
                <p className="text-[14px] md:text-[15px] text-purple-100/85 max-w-lg line-clamp-2 mb-5">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 text-[13px] text-purple-100/80">
                  <span className="inline-flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-white/20 ring-1 ring-white/30 text-white text-[11px] font-bold flex items-center justify-center">
                      {initials(featured.author)}
                    </span>
                    {featured.author}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <ClockIcon className="w-3.5 h-3.5" />
                    {featured.readTime || 1} min read
                  </span>
                  <span className="ml-auto inline-flex items-center gap-2 font-semibold text-white group-hover:gap-3 transition-all">
                    Read <span>→</span>
                  </span>
                </div>
              </div>
            </Link>

            {/* Eligibility CTA */}
            <div className="relative rounded-[28px] overflow-hidden bg-gradient-to-br from-[#4c1d95] to-[#6d28d9] p-7 md:p-8 flex flex-col text-white shadow-xl shadow-purple-900/15">
              <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-white/10 animate-blog-float" aria-hidden="true" />
              <div className="absolute -left-12 -bottom-12 w-40 h-40 rounded-full bg-amber-400/10 animate-blog-float" style={{ animationDelay: "2s" }} aria-hidden="true" />
              <span className="relative inline-flex w-12 h-12 rounded-2xl bg-amber-400 text-[#3b0764] items-center justify-center mb-4 shadow-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <h3 className="relative text-[22px] md:text-[26px] font-extrabold leading-tight mb-3">
                Your Hospital Bill Could Be Reduced
              </h3>
              <p className="relative text-[14px] text-purple-100/85 leading-relaxed mb-6">
                Check your eligibility in under 2 minutes. Free for 90 days — no
                credit card needed.
              </p>
              <Link
                to="/signup"
                className="relative inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 hover:bg-amber-300 text-[#3b0764] px-6 py-3 text-[15px] font-bold transition hover:scale-[1.03] active:scale-95 mb-3"
              >
                Check My Eligibility →
              </Link>
              <p className="relative text-[11px] text-purple-200/70 text-center">
                Unsubscribe after trial. Cancel anytime.
              </p>
            </div>
          </Reveal>
        </section>
      )}

      {/* Article grid */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16 min-h-[40vh]">
        {(activeFilter !== "All Articles" || search) && (
          <div className="flex items-center justify-between gap-4 mb-8">
            <h2 className="text-[20px] md:text-[26px] font-bold text-gray-900">
              {search ? (
                <>
                  Results for <span className="text-purple-700">“{search}”</span>
                </>
              ) : (
                activeFilter
              )}
            </h2>
            {(search || activeFilter !== "All Articles") && (
              <button
                onClick={() => {
                  clearSearch();
                  setActiveFilter("All Articles");
                }}
                className="text-[13px] font-semibold text-purple-700 hover:text-purple-900 inline-flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear
              </button>
            )}
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={() => load({ category: activeFilter, term: search, pageNum: 1, append: false })}
              className="rounded-full bg-purple-700 text-white px-6 py-2.5 text-[14px] font-semibold hover:bg-purple-600 transition"
            >
              Try again
            </button>
          </div>
        )}

        {!error && loading && posts.length === 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
            {[...Array(6)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        )}

        {!error && !loading && posts.length === 0 && (
          <div className="text-center py-24">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-100 mb-4">
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
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
              {posts.map((post, i) => (
                <Reveal key={post._id} delay={Math.min(i, 5) * 60}>
                  <ArticleCard post={post} />
                </Reveal>
              ))}
            </div>

            {page < pagination.totalPages && (
              <div className="text-center mt-12">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-purple-600 px-8 py-3 text-[15px] font-semibold text-purple-700 hover:bg-purple-700 hover:text-white transition disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
                      </svg>
                      Loading...
                    </>
                  ) : (
                    "Load more articles"
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Closing CTA band */}
      <section className="px-4 md:px-6 pb-16 md:pb-24">
        <Reveal className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#2d0a4e] via-[#4c1d95] to-[#6d28d9] px-6 md:px-12 py-12 md:py-16 text-center text-white shadow-2xl shadow-purple-900/30">
            <div className="pointer-events-none absolute -top-16 -right-10 w-72 h-72 rounded-full bg-amber-400/15 blur-3xl animate-blog-float" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 w-80 h-80 rounded-full bg-fuchsia-500/20 blur-3xl animate-blog-float" style={{ animationDelay: "2s" }} aria-hidden="true" />
            <h2 className="relative text-[26px] md:text-[40px] font-extrabold leading-tight mb-4 max-w-2xl mx-auto">
              Ready to take control of your hospital bills?
            </h2>
            <p className="relative text-[14px] md:text-[17px] text-purple-100/85 max-w-xl mx-auto mb-8">
              See how much you could save. Checking your eligibility takes under
              2 minutes and is free for 90 days.
            </p>
            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-full bg-amber-400 hover:bg-amber-300 text-[#3b0764] px-8 py-3.5 text-[15px] font-bold transition hover:scale-[1.03] active:scale-95"
              >
                Check My Eligibility →
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 hover:bg-white/10 text-white px-8 py-3.5 text-[15px] font-semibold transition"
              >
                Talk to our team
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
