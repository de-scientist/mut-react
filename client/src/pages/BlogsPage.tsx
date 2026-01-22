import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { blogsAPI } from "../services/api";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  featuredImage?: string | null;
  author?: string | null;
  status: string;
  createdAt?: string;
  publishedAt?: string | null;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

const BlogsPage = () => {
  const [items, setItems] = useState<Blog[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    document.title = "Blog | MUTCU";
  }, []);

  useEffect(() => {
    fetchBlogs(page, page > 1);
  }, [activeSearch, page]);

  const fetchBlogs = async (pageToLoad = 1, append = false) => {
    try {
      setLoading(true);
      setError(null);

      // FIX: Build query object conditionally to avoid passing 'undefined' to search
      const queryParams: { page: number; limit: number; search?: string } = {
        page: pageToLoad,
        limit: 6,
      };

      if (activeSearch) {
        queryParams.search = activeSearch;
      }

      const response = await blogsAPI.list(queryParams);

      const data = response.data || response;
      const paginationMeta = response.pagination || data.pagination;

      setItems((prev) => (append ? [...prev, ...(data || [])] : data || []));
      setPagination(paginationMeta || null);
    } catch (err: any) {
      setError(err?.message || "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setActiveSearch(searchInput.trim());
  };

  const handleLoadMore = () => {
    if (pagination?.hasNext) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="blog-page">
      {/* HERO SECTION */}
      <section className="blog-hero">
        <div className="container py-5 text-center text-lg-start">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <span className="badge-pill mb-3">Insights & Stories</span>
              <h1 className="display-4 fw-bold text-white mb-3">
                MUTCU <span className="text-orange">Blog</span>
              </h1>
              <p className="lead text-white-50 mb-4">
                Explore reflections, ministry updates, and faith-building
                stories from the Murang’a University of Technology Christian
                Union.
              </p>

              <form className="blog-search-container" onSubmit={handleSearch}>
                <div className="input-group shadow-lg">
                  <span className="input-group-text bg-white border-0 ps-4">
                    <i className="fas fa-search text-muted"></i>
                  </span>
                  <input
                    type="search"
                    className="form-control form-control-lg border-0"
                    placeholder="Search by title or keywords..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <button type="submit" className="btn btn-search px-4">
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG FEED */}
      <section className="container py-5 mt-n5">
        {error && (
          <div
            className="alert alert-custom d-flex align-items-center"
            role="alert"
          >
            <i className="fas fa-exclamation-circle me-3"></i>
            <div>{error}</div>
          </div>
        )}

        {loading && items.length === 0 ? (
          <div className="text-center py-5">
            <div className="spinner-grow text-teal" role="status"></div>
            <p className="text-muted mt-3 fw-medium">
              Preparing your reading list...
            </p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-5 no-results shadow-sm rounded-4 bg-white">
            <i className="fas fa-folder-open fa-3x mb-3 text-muted"></i>
            <h4 className="text-navy">No stories found</h4>
            <p className="text-muted">
              Try adjusting your search or check back later.
            </p>
          </div>
        ) : (
          <>
            <div className="row g-4">
              {items.map((blog) => (
                <article key={blog.id} className="col-md-6 col-lg-4">
                  <div className="blog-card h-100">
                    <div className="card-img-container">
                      {blog.featuredImage ? (
                        <img
                          src={blog.featuredImage}
                          alt={blog.title}
                          className="card-img-top"
                        />
                      ) : (
                        <div className="placeholder-img">
                          <i className="fas fa-cross fa-2x"></i>
                        </div>
                      )}
                      <div className="date-tag">
                        {blog.publishedAt
                          ? new Date(blog.publishedAt).toLocaleDateString(
                              "en-US",
                              { month: "short", day: "numeric" },
                            )
                          : new Date(blog.createdAt || "").toLocaleDateString(
                              "en-US",
                              { month: "short", day: "numeric" },
                            )}
                      </div>
                    </div>

                    <div className="card-body p-4">
                      <div className="d-flex align-items-center mb-2">
                        <span className="author-name">
                          <i className="far fa-user me-2"></i>
                          {blog.author || "MUTCU Team"}
                        </span>
                      </div>
                      <h3 className="blog-title mb-3">
                        <Link
                          to={`/blogs/${blog.slug}`}
                          className="stretched-link text-decoration-none"
                        >
                          {blog.title}
                        </Link>
                      </h3>
                      <p className="blog-excerpt text-muted mb-4">
                        {blog.excerpt ||
                          "Read more about this inspiring update from our community."}
                      </p>
                      <div className="blog-footer-link">
                        <span>Read More</span>
                        <i className="fas fa-arrow-right ms-2"></i>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {pagination?.hasNext && (
              <div className="text-center mt-5">
                <button
                  className="btn btn-load-more px-5 py-3 rounded-pill shadow"
                  onClick={handleLoadMore}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm me-2"></span>
                  ) : null}
                  Load More Stories
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <style>{`
        :root {
          --brand-navy: #0A1837;
          --brand-orange: #FF9800;
          --brand-teal: #36D1C4;
          --brand-red: #F42F3F;
          --bg-light: #F8FAFC;
        }

        .blog-page { background-color: var(--bg-light); min-height: 100vh; }

        .blog-hero {
          background: linear-gradient(135deg, var(--brand-navy) 0%, #152C5B 100%);
          padding: 120px 0 140px 0;
          position: relative;
        }

        .badge-pill {
          background: rgba(54, 209, 196, 0.2);
          color: var(--brand-teal);
          padding: 6px 16px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.8rem;
          text-transform: uppercase;
          display: inline-block;
        }

        .text-orange { color: var(--brand-orange); }

        .blog-search-container .input-group {
          border-radius: 15px;
          overflow: hidden;
          background: white;
        }

        .btn-search {
          background-color: var(--brand-orange);
          color: white;
          font-weight: 600;
        }

        .blog-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.3s ease;
          position: relative;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          border: none;
        }

        .blog-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
        }

        .card-img-container { height: 220px; position: relative; overflow: hidden; }
        .card-img-top { width: 100%; height: 100%; object-fit: cover; }

        .date-tag {
          position: absolute;
          top: 15px;
          right: 15px;
          background: white;
          padding: 5px 12px;
          border-radius: 10px;
          font-weight: 800;
          font-size: 0.75rem;
          color: var(--brand-navy);
        }

        .blog-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--brand-navy);
        }

        .author-name {
          font-size: 0.8rem;
          color: var(--brand-teal);
          font-weight: 600;
        }

        .blog-footer-link {
          color: var(--brand-orange);
          font-weight: 700;
        }

        .btn-load-more {
          background-color: var(--brand-navy);
          color: white;
          border: none;
        }

        .alert-custom {
          background: white;
          border-left: 5px solid var(--brand-red);
        }
      `}</style>
    </div>
  );
};

export default BlogsPage;
