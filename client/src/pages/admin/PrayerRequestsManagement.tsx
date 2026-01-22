import { useEffect, useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { prayerAPI } from "../../services/api";
import Toast from "../../components/Toast";
import {
  ArrowLeft,
  MessageSquare,
  Eye,
  EyeOff,
  CheckCircle,
  Clock,
  Heart,
  Filter,
  User,
  Calendar,
} from "lucide-react";

interface PrayerRequest {
  id: string;
  name?: string;
  request: string;
  isPublic: boolean;
  status: "PENDING" | "PRAYED_FOR" | "ANSWERED";
  createdAt: string;
  updatedAt: string;
}

const PrayerRequestsManagement = () => {
  const [requests, setRequests] = useState<PrayerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    const statusParam = searchParams.get("status");
    if (statusParam) setStatusFilter(statusParam);
  }, [navigate, searchParams]);

  useEffect(() => {
    fetchRequests();
  }, [statusFilter]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const params: Record<string, string> = {};
      if (statusFilter) params.status = statusFilter;
      const response = await prayerAPI.getAll(params);
      setRequests(response.data || response.items || []);
    } catch (err: any) {
      if (err.status === 401 || err.status === 403) {
        localStorage.removeItem("token");
        navigate("/admin/login");
        return;
      }
      setError(err.message || "Failed to load prayer requests");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await prayerAPI.updateStatus(id, newStatus);
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: newStatus as any } : r)),
      );
      setSuccessMessage("Status updated successfully");
    } catch (err: any) {
      setError(err.message || "Failed to update status");
    }
  };

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { color: string; icon: any }> = {
      PENDING: {
        color: "bg-warning-subtle text-warning-emphasis",
        icon: <Clock size={14} />,
      },
      PRAYED_FOR: {
        color: "bg-info-subtle text-info-emphasis",
        icon: <Heart size={14} />,
      },
      ANSWERED: {
        color: "bg-success-subtle text-success-emphasis",
        icon: <CheckCircle size={14} />,
      },
    };
    return configs[status] || { color: "bg-secondary-subtle", icon: null };
  };

  const stats = useMemo(
    () => ({
      total: requests.length,
      pending: requests.filter((r) => r.status === "PENDING").length,
      answered: requests.filter((r) => r.status === "ANSWERED").length,
    }),
    [requests],
  );

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100 bg-white">
        <div className="text-center">
          <div className="spinner-grow text-primary mb-3" role="status"></div>
          <p className="text-muted fw-bold">Gathering Requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-management bg-light min-vh-100 py-5">
      <div className="container">
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
          <div>
            <h2 className="fw-black text-dark mb-1">Prayer Wall Management</h2>
            <p className="text-muted mb-0">
              Review and moderate community prayer requests.
            </p>
          </div>
          <button
            onClick={() => navigate("/admin")}
            className="btn btn-white border shadow-sm d-flex align-items-center gap-2"
            title="Return to Admin Dashboard" // Fixes axe/name-role-value
            aria-label="Back to Dashboard"
          >
            <ArrowLeft size={18} /> Dashboard
          </button>
        </div>

        {/* Stats Row */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white border-start border-primary border-5">
              <h6 className="text-uppercase text-muted fw-bold small">
                Total Requests
              </h6>
              <h2 className="fw-bold mb-0">{stats.total}</h2>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white border-start border-warning border-5">
              <h6 className="text-uppercase text-muted fw-bold small">
                Awaiting Prayer
              </h6>
              <h2 className="fw-bold mb-0 text-warning">{stats.pending}</h2>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white border-start border-success border-5">
              <h6 className="text-uppercase text-muted fw-bold small">
                Testimonies / Answered
              </h6>
              <h2 className="fw-bold mb-0 text-success">{stats.answered}</h2>
            </div>
          </div>
        </div>

        {error && (
          <div
            className="alert alert-danger border-0 shadow-sm alert-dismissible fade show mb-4"
            role="alert"
          >
            {error}
            <button
              type="button"
              className="btn-close"
              onClick={() => setError(null)}
              aria-label="Dismiss"
            ></button>
          </div>
        )}

        <Toast
          message={successMessage || ""}
          type="success"
          isVisible={!!successMessage}
          onClose={() => setSuccessMessage(null)}
        />

        {/* Filter Bar */}
        <div className="card border-0 shadow-sm mb-4 rounded-4">
          <div className="card-body p-4">
            <div className="row align-items-center">
              <div className="col-md-5 d-flex align-items-center gap-3">
                <Filter size={20} className="text-primary" />
                <select
                  className="form-select border-0 bg-light"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  title="Filter requests by status" // Fixes axe/forms
                  aria-label="Filter prayer requests"
                >
                  <option value="">All Prayer Statuses</option>
                  <option value="PENDING">Pending (New)</option>
                  <option value="PRAYED_FOR">Prayed For</option>
                  <option value="ANSWERED">Answered (Praise Report)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-white border-bottom">
                <tr className="text-muted small text-uppercase fw-bold">
                  <th className="px-4 py-3">Sender</th>
                  <th className="py-3">Request Details</th>
                  <th className="py-3">Visibility</th>
                  <th className="py-3">Status</th>
                  <th className="px-4 py-3 text-end">Update Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-5">
                      <div className="opacity-25 mb-3">
                        <MessageSquare size={48} />
                      </div>
                      <p className="text-muted">No prayer requests found.</p>
                    </td>
                  </tr>
                ) : (
                  requests.map((req) => {
                    const config = getStatusConfig(req.status);
                    return (
                      <tr key={req.id}>
                        <td className="px-4">
                          <div className="d-flex align-items-center gap-2">
                            <div className="bg-light p-2 rounded-circle">
                              <User size={16} />
                            </div>
                            <span className="fw-bold">
                              {req.name || "Anonymous"}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div className="prayer-request-text text-muted">
                            {req.request}
                          </div>
                        </td>
                        <td>
                          <span
                            className={`badge rounded-pill d-inline-flex align-items-center gap-1 ${req.isPublic ? "bg-primary-subtle text-primary" : "bg-light text-muted border"}`}
                          >
                            {req.isPublic ? (
                              <Eye size={12} />
                            ) : (
                              <EyeOff size={12} />
                            )}
                            {req.isPublic ? "Public" : "Private"}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge rounded-pill px-3 py-2 d-inline-flex align-items-center gap-1 ${config.color}`}
                          >
                            {config.icon}
                            {req.status.replace("_", " ")}
                          </span>
                        </td>
                        <td className="px-4 text-end">
                          <select
                            className="form-select form-select-sm status-select-custom border-primary-subtle shadow-sm"
                            value={req.status}
                            onChange={(e) =>
                              handleStatusUpdate(req.id, e.target.value)
                            }
                            title={`Change status for ${req.name || "Anonymous"}`} // Fixes axe/forms
                            aria-label="Change status"
                          >
                            <option value="PENDING">Mark Pending</option>
                            <option value="PRAYED_FOR">Mark Prayed For</option>
                            <option value="ANSWERED">Mark Answered</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Meta */}
        <div className="mt-4 text-center">
          <p className="text-muted small">
            <Calendar size={14} className="me-1" /> Last updated:{" "}
            {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrayerRequestsManagement;
