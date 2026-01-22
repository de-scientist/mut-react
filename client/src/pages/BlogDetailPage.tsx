import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { blogsAPI } from "../services/api";
import "../styles/blogs.css";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  featuredImage?: string | null;
  author?: string | null;
  status: string;
  createdAt?: string;
  publishedAt?: string | null;
}

const BlogDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      loadBlog(slug);
    }
  }, [slug]);

  const loadBlog = async (slugParam: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await blogsAPI.getBySlug(slugParam);
      const data = response.data || response;
      setBlog(data);
      document.title = `${data.title} | MUTCU Blog`;
    } catch (err: any) {
      setError(err?.message || "Blog not found");
      setBlog(null);
    } finally {
      setLoading(false);
    }
  };

  const contentHtml = useMemo(() => {
    if (!blog?.content) return "";
    // Basic formatting: convert line breaks to paragraphs.
    const escaped = blog.content
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n{2,}/g, "</p><p>")
      .replace(/\n/g, "<br/>");
    return `<p>${escaped}</p>`;
  }, [blog?.content]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div
          className="spinner-border text-brand"
          role="status"
          aria-label="Loading blog"
        />
        <p className="text-muted mt-3">Loading article...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="container py-5 text-center">
        <div
          className="alert alert-warning d-inline-flex align-items-center gap-2 shadow-sm"
          role="alert"
        >
          <i className="fas fa-info-circle" aria-hidden="true" />
          <span>{error || "Blog not found"}</span>
        </div>
        <div className="mt-3">
          <button className="btn btn-brand" onClick={() => navigate("/blogs")}>
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <article className="blog-detail bg-surface">
      <section className="blog-hero detail-hero gradient-hero text-white">
        <div className="container py-5">
          <p className="text-uppercase small fw-bold letter-space-1 mb-2">
            MUTCU Blog
          </p>
          <h1 className="display-5 fw-bold mb-3">{blog.title}</h1>
          <div className="d-flex flex-wrap text-light opacity-90 gap-3">
            <span>
              <i className="fas fa-user me-2" aria-hidden="true" />
              {blog.author || "MUTCU Team"}
            </span>
            <span>
              <i className="fas fa-calendar-alt me-2" aria-hidden="true" />
              {blog.publishedAt
                ? new Date(blog.publishedAt).toLocaleDateString()
                : new Date(blog.createdAt || "").toLocaleDateString()}
            </span>
          </div>
        </div>
      </section>

      <section className="container py-5 blog-detail-body">
        {blog.featuredImage && (
          <div className="blog-detail-image mb-4">
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="rounded-4 w-100 shadow-sm"
            />
          </div>
        )}

        {blog.excerpt && <p className="lead text-muted mb-4">{blog.excerpt}</p>}

        <div
          className="blog-content prose"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
          aria-label="Blog content"
        />

        <div className="mt-5">
          <Link to="/blogs" className="btn btn-outline-brand">
            ← Back to all blogs
          </Link>
        </div>
      </section>
    </article>
  );
};

export default BlogDetailPage;
