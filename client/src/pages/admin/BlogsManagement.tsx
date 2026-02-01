import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminBlogsAPI } from "../../services/api";
import ImageUpload from "../../components/ImageUpload";
import "../../styles/adminForms.css";
import "../../styles/blogs.css";
import { Download, Share2, FileText } from "lucide-react";
import exportHelper from "./utils/exportHelper";
import sharingHelper from "./utils/sharingHelper";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  featuredImage?: string | null;
  author?: string | null;
  status: string;
  tags?: string | null;
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

const defaultForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  featuredImage: "",
  author: "",
  status: "draft",
  tags: "",
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const BlogsManagement = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [form, setForm] = useState({ ...defaultForm });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filters, setFilters] = useState({ search: "", status: "" });
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    loadBlogs(1);
  }, [navigate]);

  const loadBlogs = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminBlogsAPI.list({
        page,
        limit: 10,
        search: filters.search || "",
        status: filters.status || "",
      });
      const data = response.data || response;
      const paginationMeta = response.pagination || data.pagination;

      setBlogs(data || []);
      setPagination(paginationMeta || null);
    } catch (err: any) {
      if (err?.status === 401 || err?.status === 403) {
        localStorage.removeItem("token");
        navigate("/admin/login");
        return;
      }
      setError(err?.message || "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "title" && !editingId ? { slug: slugify(value) } : {}),
    }));
  };

  const handleFormat = (startToken: string, endToken = startToken) => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const { selectionStart, selectionEnd, value } = textarea;
    const selectedText = value.substring(selectionStart, selectionEnd);
    const newText = `${value.substring(0, selectionStart)}${startToken}${selectedText || "text"}${endToken}${value.substring(selectionEnd)}`;

    setForm((prev) => ({ ...prev, content: newText }));

    // restore focus
    requestAnimationFrame(() => {
      textarea.focus();
      const newPos =
        selectionStart +
        startToken.length +
        (selectedText || "text").length +
        endToken.length;
      textarea.setSelectionRange(newPos, newPos);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);

    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
    };

    try {
      if (editingId) {
        await adminBlogsAPI.update(editingId, payload);
        setMessage("Blog updated successfully");
      } else {
        await adminBlogsAPI.create(payload);
        setMessage("Blog created successfully");
      }
      setForm({ ...defaultForm });
      setEditingId(null);
      loadBlogs(pagination?.page || 1);
    } catch (err: any) {
      setError(err?.message || "Failed to save blog");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingId(blog.id);
    setForm({
      title: blog.title || "",
      slug: blog.slug || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      featuredImage: blog.featuredImage || "",
      author: blog.author || "",
      status: blog.status || "draft",
      tags: blog.tags || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Delete this blog post? This cannot be undone.",
    );
    if (!confirmed) return;

    try {
      await adminBlogsAPI.remove(id);
      setMessage("Blog deleted");
      if (editingId === id) {
        setEditingId(null);
        setForm({ ...defaultForm });
      }
      loadBlogs(pagination?.page || 1);
    } catch (err: any) {
      setError(err?.message || "Failed to delete blog");
    }
  };

  const handleToggleStatus = async (blog: Blog) => {
    const nextStatus = blog.status === "published" ? "draft" : "published";
    try {
      await adminBlogsAPI.update(blog.id, { status: nextStatus });
      setMessage(`Status updated to ${nextStatus}`);
      loadBlogs(pagination?.page || 1);
    } catch (err: any) {
      setError(err?.message || "Failed to update status");
    }
  };

  const resetForm = () => {
    setForm({ ...defaultForm });
    setEditingId(null);
    setMessage(null);
    setError(null);
  };

  // Export functions
  const exportBlogs = async (format: 'csv' | 'word' | 'pdf') => {
    try {
      const exportData = exportHelper.prepareExportData(
        blogs,
        {
          title: 'Title',
          slug: 'Slug',
          excerpt: 'Excerpt',
          author: 'Author',
          status: 'Status',
          createdAt: 'Created Date',
          publishedAt: 'Published Date'
        },
        'Blogs Export',
        `Export of all blog posts (${blogs.length} total)`
      );

      await exportHelper.export(exportData, format, {
        filename: `blogs`,
        includeLogo: true,
        includeTimestamp: true
      });
    } catch (error) {
      setError('Failed to export blogs');
      console.error('Export error:', error);
    }
  };

  // Sharing functions
  const shareAllBlogs = async () => {
    try {
      const shareableBlogs = sharingHelper.prepareShareData(
        blogs,
        {
          itemTitleField: 'title',
          itemDescriptionField: 'excerpt',
          itemUrlField: 'slug',
          itemType: 'blog'
        }
      );

      await sharingHelper.shareBulk(shareableBlogs, {
        bulkTitle: 'Blog Posts Directory',
        method: 'native'
      });
    } catch (error) {
      setError('Failed to share blogs');
      console.error('Share error:', error);
    }
  };

  const shareSingleBlog = async (blog: Blog) => {
    try {
      await sharingHelper.shareItem(blog, {
        formatTemplate: (item) => ({
          title: item.title,
          text: `${item.excerpt || ''}\nStatus: ${item.status}`,
          url: `/blog/${item.slug}`
        })
      });
    } catch (error) {
      setError('Failed to share blog');
      console.error('Share error:', error);
    }
  };

  return (
    <div className="admin-management bg-light min-vh-100 pb-5">
      <header className="bg-primary-dark text-white py-4 shadow-sm sticky-top">
        <div className="container d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
          <div>
            <p className="text-uppercase small mb-1 letter-space-1">Admin</p>
            <h2 className="fw-bold mb-0">Blog Management</h2>
            <p className="mb-0 text-white-50">
              Create, edit, and publish blog posts.
            </p>
          </div>
          <div className="d-flex gap-2">
            <button
              className="btn btn-light btn-sm"
              onClick={() => loadBlogs(pagination?.page || 1)}
            >
              <i className="fas fa-rotate me-2" aria-hidden="true" />
              Refresh
            </button>
            
            {/* Export Dropdown */}
            <div className="dropdown">
              <button
                className="btn btn-outline-light btn-sm dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <Download size={16} className="me-1" /> Export
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button className="dropdown-item" onClick={() => exportBlogs('csv')}>
                    <FileText size={16} className="me-2" /> Export as CSV
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => exportBlogs('word')}>
                    <FileText size={16} className="me-2" /> Export as Word
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => exportBlogs('pdf')}>
                    <FileText size={16} className="me-2" /> Export as PDF
                  </button>
                </li>
              </ul>
            </div>

            {/* Share Button */}
            <button
              className="btn btn-outline-info btn-sm"
              onClick={shareAllBlogs}
              title="Share all blog posts"
            >
              <Share2 size={16} className="me-1" /> Share All
            </button>
            
            <button
              className="btn btn-outline-light btn-sm"
              onClick={() => navigate("/admin")}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      <div className="container py-4">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        {message && (
          <div className="alert alert-success" role="status">
            {message}
          </div>
        )}

        <div className="row g-4">
          <div className="col-lg-5">
            <div className="admin-form-container shadow-sm">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  {editingId ? "Edit Blog Post" : "Create Blog Post"}
                </h5>
                {editingId && (
                  <button className="btn btn-light btn-sm" onClick={resetForm}>
                    Reset
                  </button>
                )}
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit} className="row g-3">
                  <div className="col-12">
                    <label className="form-label" htmlFor="title">
                      Title
                    </label>
                    <input
                      id="title"
                      name="title"
                      value={form.title}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="slug">
                      Slug
                    </label>
                    <input
                      id="slug"
                      name="slug"
                      value={form.slug}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="auto-generated from title"
                    />
                    <small className="text-muted">
                      Editable; must remain unique.
                    </small>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="author">
                      Author
                    </label>
                    <input
                      id="author"
                      name="author"
                      value={form.author}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Optional"
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label" htmlFor="excerpt">
                      Excerpt
                    </label>
                    <textarea
                      id="excerpt"
                      name="excerpt"
                      value={form.excerpt}
                      onChange={handleInputChange}
                      className="form-control"
                      maxLength={400}
                      rows={3}
                      placeholder="Short summary shown on the listing page"
                    />
                  </div>
                  <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center">
                      <label className="form-label mb-0" htmlFor="content">
                        Content
                      </label>
                      <div
                        className="btn-group btn-group-sm"
                        role="group"
                        aria-label="Formatting toolbar"
                      >
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => handleFormat("**", "**")}
                        >
                          <strong>B</strong>
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => handleFormat("*", "*")}
                        >
                          <em>I</em>
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => handleFormat("> ", "")}
                        >
                          Quote
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => handleFormat("- ", "")}
                        >
                          List
                        </button>
                      </div>
                    </div>
                    <textarea
                      ref={contentRef}
                      id="content"
                      name="content"
                      value={form.content}
                      onChange={handleInputChange}
                      className="form-control"
                      rows={8}
                      required
                      placeholder="Write your post (supports basic markdown style formatting)..."
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="status">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={form.status}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="tags">
                      Tags (comma separated)
                    </label>
                    <input
                      id="tags"
                      name="tags"
                      value={form.tags}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="faith, leadership, events"
                    />
                  </div>
                  <div className="col-12">
                    <ImageUpload
                      label="Featured Image"
                      value={form.featuredImage}
                      onChange={(val) =>
                        setForm((prev) => ({ ...prev, featuredImage: val }))
                      }
                      previewClassName="rounded-3"
                    />
                  </div>
                  <div className="col-12 d-flex gap-2">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={saving}
                    >
                      {saving
                        ? "Saving..."
                        : editingId
                          ? "Update Blog"
                          : "Create Blog"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={resetForm}
                    >
                      Clear
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="card border-0 shadow-sm rounded-4 mb-3">
              <div className="card-body">
                <div className="d-flex flex-column flex-md-row gap-3 align-items-md-end justify-content-between">
                  <div>
                    <h5 className="fw-bold mb-1">All Blog Posts</h5>
                    <p className="text-muted small mb-0">
                      {pagination ? `${pagination.total} total` : "—"}
                    </p>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    <input
                      type="search"
                      className="form-control form-control-sm"
                      placeholder="Search..."
                      value={filters.search}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          search: e.target.value,
                        }))
                      }
                    />
                    <select
                      className="form-select form-select-sm"
                      value={filters.status}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          status: e.target.value,
                        }))
                      }
                    >
                      <option value="">All statuses</option>
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                    <button
                      className="btn btn-brand btn-sm"
                      onClick={() => loadBlogs(1)}
                    >
                      Filter
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="table-responsive shadow-sm rounded-4 bg-white">
              <table className="table align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="text-center py-4">
                        Loading...
                      </td>
                    </tr>
                  ) : blogs.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-4 text-muted">
                        No blog posts found.
                      </td>
                    </tr>
                  ) : (
                    blogs.map((blog) => (
                      <tr key={blog.id}>
                        <td>
                          <div className="fw-semibold">{blog.title}</div>
                          <div className="text-muted small">{blog.slug}</div>
                        </td>
                        <td>
                          <span
                            className={`badge rounded-pill ${
                              blog.status === "published"
                                ? "bg-success-subtle text-success"
                                : "bg-secondary-subtle text-secondary"
                            }`}
                          >
                            {blog.status}
                          </span>
                        </td>
                        <td className="text-muted small">
                          {blog.publishedAt
                            ? new Date(blog.publishedAt).toLocaleDateString()
                            : new Date(
                                blog.createdAt || "",
                              ).toLocaleDateString()}
                        </td>
                        <td className="text-end">
                          <div className="btn-group btn-group-sm" role="group">
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => handleEdit(blog)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-outline-primary"
                              onClick={() => handleToggleStatus(blog)}
                            >
                              {blog.status === "published"
                                ? "Unpublish"
                                : "Publish"}
                            </button>
                            <button
                              className="btn btn-outline-info"
                              onClick={() => shareSingleBlog(blog)}
                              title="Share this blog post"
                            >
                              <Share2 size={14} />
                            </button>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => handleDelete(blog.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {pagination && (
              <div className="d-flex justify-content-between align-items-center mt-3">
                <span className="text-muted small">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <div className="btn-group">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    disabled={!pagination.hasPrev}
                    onClick={() =>
                      loadBlogs(Math.max(1, (pagination?.page || 1) - 1))
                    }
                  >
                    Previous
                  </button>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    disabled={!pagination.hasNext}
                    onClick={() => loadBlogs((pagination?.page || 1) + 1)}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsManagement;
