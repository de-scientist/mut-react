import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { blogsAPI } from '../services/api'
import '../styles/blogs.css'

interface Blog {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  featuredImage?: string | null
  author?: string | null
  status: string
  createdAt?: string
  publishedAt?: string | null
}

interface Pagination {
  total: number
  page: number
  limit: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

const BlogsPage = () => {
  const [items, setItems] = useState<Blog[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchInput, setSearchInput] = useState('')
  const [activeSearch, setActiveSearch] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    document.title = 'Blog | MUTCU'
  }, [])

  useEffect(() => {
    fetchBlogs(page, page > 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSearch, page])

  const fetchBlogs = async (pageToLoad = 1, append = false) => {
    try {
      setLoading(true)
      setError(null)
      const response = await blogsAPI.list({
        page: pageToLoad,
        limit: 6,
        search: activeSearch || undefined,
      })

      const data = response.data || response
      const paginationMeta = response.pagination || data.pagination

      setItems((prev) => (append ? [...prev, ...(data || [])] : data || []))
      setPagination(paginationMeta || null)
    } catch (err: any) {
      setError(err?.message || 'Failed to load blogs')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    setActiveSearch(searchInput.trim())
  }

  const handleLoadMore = () => {
    if (pagination?.hasNext) {
      setPage((prev) => prev + 1)
    }
  }

  return (
    <div className="blog-page bg-surface">
      <section className="blog-hero gradient-hero text-white">
        <div className="container py-5">
          <p className="text-uppercase small fw-bold letter-space-1 mb-2">Insights & Stories</p>
          <h1 className="display-5 fw-bold mb-3">MUTCU Blog</h1>
          <p className="lead text-light opacity-90 col-lg-7">
            Reflections, testimonies, events, and ministry updates from the Murang’a University of Technology Christian Union.
          </p>

          <form className="blog-search mt-4" onSubmit={handleSearch} role="search" aria-label="Search blogs">
            <div className="row g-2 align-items-center">
              <div className="col-md-8">
                <input
                  type="search"
                  className="form-control form-control-lg rounded-3"
                  placeholder="Search by title or keywords..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  aria-label="Search by title or keywords"
                />
              </div>
              <div className="col-md-4 d-grid">
                <button type="submit" className="btn btn-brand btn-lg">
                  <i className="fas fa-search me-2" aria-hidden="true" />
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <section className="container py-5">
        {error && (
          <div className="alert alert-danger shadow-sm" role="alert">
            {error}
          </div>
        )}

        {loading && items.length === 0 ? (
          <div className="text-center py-5">
            <div className="spinner-border text-brand" role="status" aria-label="Loading blogs" />
            <p className="text-muted mt-3">Loading blog posts...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-5">
            <p className="fw-semibold text-muted">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <>
            <div className="row g-4">
              {items.map((blog) => (
                <article key={blog.id} className="col-md-6 col-lg-4">
                  <div className="blog-card h-100 shadow-sm">
                    <div className="blog-card-image-wrapper">
                      {blog.featuredImage ? (
                        <img
                          src={blog.featuredImage}
                          alt={blog.title}
                          className="blog-card-image"
                          loading="lazy"
                        />
                      ) : (
                        <div className="blog-card-placeholder">
                          <i className="fas fa-feather-alt fa-2x text-muted" aria-hidden="true" />
                        </div>
                      )}
                    </div>
                    <div className="blog-card-body">
                      <p className="badge bg-soft-brand text-brand fw-semibold text-uppercase small mb-2">
                        {blog.publishedAt ? 'Published' : 'Draft'}
                      </p>
                      <h3 className="h5 fw-bold mb-2">
                        <Link to={`/blogs/${blog.slug}`} className="text-decoration-none text-heading">
                          {blog.title}
                        </Link>
                      </h3>
                      <p className="text-muted small mb-3">
                        {blog.excerpt || 'No summary provided yet.'}
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="text-muted small">
                          {blog.author || 'MUTCU Team'}
                        </div>
                        <div className="text-muted small">
                          {blog.publishedAt
                            ? new Date(blog.publishedAt).toLocaleDateString()
                            : new Date(blog.createdAt || '').toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="blog-card-footer">
                      <Link to={`/blogs/${blog.slug}`} className="btn btn-link fw-semibold text-brand p-0">
                        Read article <i className="fas fa-arrow-right ms-2" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {pagination?.hasNext && (
              <div className="text-center mt-4">
                <button
                  className="btn btn-outline-brand px-4 py-2 rounded-pill"
                  onClick={handleLoadMore}
                  disabled={loading}
                >
                  {loading ? 'Loading…' : 'Load more'}
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  )
}

export default BlogsPage

