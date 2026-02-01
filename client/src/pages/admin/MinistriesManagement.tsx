import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ministriesAPI } from "../../services/api";
import ConfirmationModal from "../../components/ConfirmationModal";
import ImageUpload from "../../components/ImageUpload";
import Toast from "../../components/Toast";
import {
  Plus,
  ArrowLeft,
  Edit3,
  Trash2,
  Power,
  Globe,
  Layout,
  Search,
  CheckCircle,
  XCircle,
  Share2, 
  Download,
} from "lucide-react";
import "../../styles/adminForms.css";

interface Ministry {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  imageUrl?: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const MinistriesManagement = () => {
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(
    null,
  );
  const [action, setAction] = useState<"delete" | "toggle" | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingMinistry, setEditingMinistry] = useState<Ministry | null>(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "",
    imageUrl: "",
    slug: "",
    isActive: true,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchMinistries();
  }, [navigate]);

  const fetchMinistries = async () => {
    try {
      setLoading(true);
      const response = await ministriesAPI.getAll();
      setMinistries(response.data || response.items || []);
    } catch (err: any) {
      if (err.status === 401 || err.status === 403) {
        localStorage.removeItem("token");
        navigate("/admin/login");
        return;
      }
      setError(err.message || "Failed to load ministries");
    } finally {
      setLoading(false);
    }
  };

  const filteredMinistries = useMemo(() => {
    return ministries.filter(
      (m) =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.slug.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [ministries, searchTerm]);

  const stats = useMemo(
    () => ({
      total: ministries.length,
      active: ministries.filter((m) => m.isActive).length,
      inactive: ministries.filter((m) => !m.isActive).length,
    }),
    [ministries],
  );

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

const exportMinistriesAsCSV = () => {
  if (!ministries.length) return;

  const headers = ["Name", "Slug", "Description", "Active"];
  const rows = ministries.map((m) => [
    m.name,
    m.slug,
    m.description || "",
    m.isActive ? "Yes" : "No",
  ]);

  const csvContent =
    [headers, ...rows].map((row) => row.join(",")).join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "ministries.csv";
  link.click();

  URL.revokeObjectURL(url);
};

const exportMinistriesAsJSON = () => {
  const blob = new Blob([JSON.stringify(ministries, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "ministries.json";
  link.click();

  URL.revokeObjectURL(url);
};

const shareAllMinistries = async () => {
  if (!ministries.length) {
    setError("No ministries to share");
    return;
  }

  const shareText = ministries
    .map(
      (m) =>
        `${m.name} (${m.slug}) - ${
          m.isActive ? "Active" : "Inactive"
        }`
    )
    .join("\n");

  const shareUrl = `${window.location.origin}/ministries`;

  try {
    if (navigator.share) {
      await navigator.share({
        title: "Church Ministries",
        text: shareText,
        url: shareUrl,
      });
    } else {
      await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
      setSuccessMessage("Ministries copied to clipboard!");
    }
  } catch {
    setError("Unable to share ministries");
  }
};

const shareSingleMinistry = async (ministry: Ministry) => {
  const shareText = `${ministry.name}
🔗 ${ministry.slug}
${ministry.description || ""}`;

  const shareUrl = `${window.location.origin}/ministries/${ministry.slug}`;

  try {
    if (navigator.share) {
      await navigator.share({
        title: ministry.name,
        text: shareText,
        url: shareUrl,
      });
    } else {
      await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
      setSuccessMessage("Ministry link copied to clipboard!");
    }
  } catch {
    setError("Unable to share ministry");
  }
};


  const handleDelete = async () => {
    if (!selectedMinistry) return;
    try {
      await ministriesAPI.delete(selectedMinistry.slug);
      setMinistries(ministries.filter((m) => m.id !== selectedMinistry.id));
      setShowModal(false);
      setSelectedMinistry(null);
      setSuccessMessage("Ministry deleted successfully");
    } catch (err: any) {
      setError(err.message || "Failed to delete ministry");
    }
  };

  const handleToggleActive = async () => {
    if (!selectedMinistry) return;
    try {
      await ministriesAPI.update(selectedMinistry.slug, {
        isActive: !selectedMinistry.isActive,
      });
      setMinistries(
        ministries.map((m) =>
          m.id === selectedMinistry.id ? { ...m, isActive: !m.isActive } : m,
        ),
      );
      setShowModal(false);
      setSelectedMinistry(null);
      setSuccessMessage(`Ministry status updated!`);
    } catch (err: any) {
      setError(err.message || "Failed to update status");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingMinistry) {
        await ministriesAPI.update(editingMinistry.slug, formData);
        setSuccessMessage("Ministry updated successfully");
      } else {
        await ministriesAPI.create(formData);
        setSuccessMessage("Ministry added successfully");
      }
      setShowForm(false);
      setEditingMinistry(null);
      setFormData({
        name: "",
        description: "",
        icon: "",
        imageUrl: "",
        slug: "",
        isActive: true,
      });
      fetchMinistries();
    } catch (err: any) {
      setError(err.message || "Failed to save ministry");
    }
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100 bg-white">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status"></div>
          <p className="text-muted fw-bold">Synchronizing Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-management bg-light min-vh-100 py-4">
      {/* SCOPED CSS TO AVOID INLINE STYLE WARNINGS */}
      <style>{`
        .stat-label { font-size: 10px; }
        .icon-box { width: 42px; height: 42px; }
      `}</style>

      <div className="container">
        <div className="row align-items-center mb-4 g-3">
          <div className="col-md-6">
            <button
              onClick={() => navigate("/admin")}
              className="btn btn-link text-decoration-none text-muted p-0 mb-2 d-flex align-items-center gap-1"
              title="Return to Dashboard"
            >
              <ArrowLeft size={14} /> Back to Dashboard
            </button>
            <h2 className="fw-bold text-dark mb-0">Ministries</h2>
            <p className="text-muted small">
              Configure and manage church departments.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="d-inline-flex gap-3 bg-white p-2 px-3 rounded-4 shadow-sm border">
              <div className="text-center border-end pe-3">
                <span className="d-block fw-bold text-primary">
                  {stats.total}
                </span>
                <small className="text-uppercase text-muted stat-label">
                  Total
                </small>
              </div>
              <div className="text-center border-end pe-3">
                <span className="d-block fw-bold text-success">
                  {stats.active}
                </span>
                <small className="text-uppercase text-muted stat-label">
                  Active
                </small>
              </div>
              <div className="text-center">
                <span className="d-block fw-bold text-warning">
                  {stats.inactive}
                </span>
                <small className="text-uppercase text-muted stat-label">
                  Drafts
                </small>
              </div>
            </div>
          </div>
        </div>

<div className="dropdown">
  <button
    className="btn btn-outline-secondary dropdown-toggle rounded-pill"
    data-bs-toggle="dropdown"
  >
    <Download size={16} className="me-1" /> Export
  </button>

  <ul className="dropdown-menu">
    <li>
      <button className="dropdown-item" onClick={exportMinistriesAsCSV}>
        Export as CSV
      </button>
    </li>
    <li>
      <button className="dropdown-item" onClick={exportMinistriesAsJSON}>
        Export as JSON
      </button>
    </li>
  </ul>
  <button
    className="btn btn-outline-secondary dropdown-toggle rounded-pill"
  >
    <Download size={16} className="me-1" /> Share All Ministries
        
      </button>
</div>


        <div className="card border-0 shadow-sm mb-4 rounded-4">
          <div className="card-body p-3">
            <div className="row g-3 align-items-center">
              <div className="col-md-8">
                <div className="input-group">
                  <span className="input-group-text bg-light border-0">
                    <Search size={18} className="text-muted" />
                  </span>
                  <input
                    type="text"
                    className="form-control bg-light border-0"
                    placeholder="Search ministries by name or slug..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-4 text-md-end">
                <button
                  onClick={() => {
                    setEditingMinistry(null);
                    setShowForm(true);
                  }}
                  className="btn btn-primary w-100 w-md-auto px-4 rounded-pill d-flex align-items-center justify-content-center gap-2"
                  title="Create a new ministry"
                >
                  <Plus size={18} /> New Ministry
                </button>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div
            className="alert alert-danger border-0 shadow-sm d-flex justify-content-between align-items-center"
            role="alert"
          >
            <span>{error}</span>
            <button
              type="button"
              className="btn-close"
              onClick={() => setError(null)}
              title="Dismiss error"
            ></button>
          </div>
        )}

        <Toast
          message={successMessage || ""}
          type="success"
          isVisible={!!successMessage}
          onClose={() => setSuccessMessage(null)}
        />

        {showForm && (
          <div className="card border-0 shadow-lg mb-4 rounded-4 animate-fade-in border-top border-primary border-4">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">
                  {editingMinistry
                    ? "Edit Ministry Details"
                    : "Register New Ministry"}
                </h5>
                <button
                  className="btn-close"
                  onClick={() => setShowForm(false)}
                  title="Close form"
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Ministry Name
                    </label>
                    <input
                      type="text"
                      className="form-control bg-light border-0 py-2"
                      placeholder="e.g. Choir & Worship"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                          slug: editingMinistry
                            ? formData.slug
                            : generateSlug(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Web URL Slug
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0">
                        /
                      </span>
                      <input
                        type="text"
                        title="Website URL Slug"
                        className="form-control bg-light border-0 py-2"
                        value={formData.slug}
                        onChange={(e) =>
                          setFormData({ ...formData, slug: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      Display Icon
                    </label>
                    <input
                      type="text"
                      className="form-control bg-light border-0 py-2"
                      placeholder="Emoji or Icon Class"
                      value={formData.icon}
                      onChange={(e) =>
                        setFormData({ ...formData, icon: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-8">
                    <ImageUpload
                      label="Banner Image"
                      value={formData.imageUrl}
                      onChange={(url) =>
                        setFormData({ ...formData, imageUrl: url })
                      }
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      Ministry Bio / Description
                    </label>
                    <textarea
                      className="form-control bg-light border-0"
                      rows={3}
                      placeholder="Briefly describe the purpose of this ministry..."
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-12">
                    <div className="form-check form-switch custom-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isActive: e.target.checked,
                          })
                        }
                        id="activeSwitch"
                      />
                      <label
                        className="form-check-label fw-medium ms-2"
                        htmlFor="activeSwitch"
                      >
                        Set as Active (Visible on the website)
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-top d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary px-5 rounded-pill shadow"
                  >
                    {editingMinistry ? "Update Info" : "Create Ministry"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4 rounded-pill"
                    onClick={() => setShowForm(false)}
                  >
                    Discard
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr className="text-muted small text-uppercase fw-bold">
                  <th className="px-4 py-3 border-0">Identity</th>
                  <th className="py-3 border-0">Route</th>
                  <th className="py-3 border-0">Status</th>
                  <th className="px-4 py-3 text-end border-0">Management</th>
                </tr>
              </thead>
              <tbody>
                {filteredMinistries.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-5">
                      <Layout
                        size={40}
                        className="text-muted mb-2 opacity-25"
                      />
                      <p className="text-muted">
                        No ministries match your search criteria.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredMinistries.map((ministry) => (
                    <tr key={ministry.id}>
                      <td className="px-4">
                        <div className="d-flex align-items-center gap-3 py-1">
                          <div className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold icon-box">
                            {ministry.icon || <Layout size={18} />}
                          </div>
                          <div>
                            <div className="fw-bold text-dark">
                              {ministry.name}
                            </div>
                            <div className="text-muted small">
                              Updated{" "}
                              {new Date(
                                ministry.updatedAt,
                              ).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="badge bg-light text-muted border py-2 px-3 fw-normal d-inline-flex align-items-center gap-2">
                          <Globe size={12} /> {ministry.slug}
                        </div>
                      </td>
                      <td>
                        <span
                          className={`badge rounded-pill px-3 py-2 ${ministry.isActive ? "bg-success-subtle text-success" : "bg-warning-subtle text-warning"}`}
                        >
                          {ministry.isActive ? (
                            <CheckCircle size={10} className="me-1" />
                          ) : (
                            <XCircle size={10} className="me-1" />
                          )}
                          {ministry.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-4 text-end">
                        <div className="btn-group shadow-sm rounded-3">
                          <button
                            className="btn btn-white btn-sm px-3"
                            onClick={() => {
                              setEditingMinistry(ministry);
                              setFormData({
                                name: ministry.name,
                                description: ministry.description || "",
                                icon: ministry.icon || "",
                                imageUrl: ministry.imageUrl || "",
                                slug: ministry.slug,
                                isActive: ministry.isActive,
                              });
                              setShowForm(true);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            title={`Edit ${ministry.name}`}
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            className={`btn btn-sm px-3 ${ministry.isActive ? "text-warning" : "text-success"}`}
                            onClick={() => {
                              setSelectedMinistry(ministry);
                              setAction("toggle");
                              setShowModal(true);
                            }}
                            title={
                              ministry.isActive
                                ? "Deactivate Ministry"
                                : "Activate Ministry"
                            }
                          >
                            <Power size={15} />
                          </button>
                          <button
                            className="btn btn-white btn-sm px-3 text-danger"
                            onClick={() => {
                              setSelectedMinistry(ministry);
                              setAction("delete");
                              setShowModal(true);
                            }}
                            title={`Delete ${ministry.name}`}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedMinistry(null);
          setAction(null);
        }}
        onConfirm={() => {
          if (action === "delete") handleDelete();
          else if (action === "toggle") handleToggleActive();
        }}
        title={action === "delete" ? "Remove Ministry" : "Change Visibility"}
        message={
          action === "delete"
            ? `Warning: Deleting "${selectedMinistry?.name}" is permanent. All related data will be lost.`
            : `Are you sure you want to change the status of "${selectedMinistry?.name}"?`
        }
        confirmText={action === "delete" ? "Delete" : "Update"}
        cancelText="Cancel"
        confirmButtonClass={action === "delete" ? "btn-danger" : "btn-primary"}
      />
    </div>
  );
};

export default MinistriesManagement;
