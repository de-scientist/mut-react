import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { contactAPI } from "../../services/api";
import Toast from "../../components/Toast";
import { Search, ArrowLeft, Mail, ExternalLink, Filter, Download, Share2, FileText } from "lucide-react";
import exportHelper from "./utils/exportHelper";
import sharingHelper from "./utils/sharingHelper";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "NEW" | "IN_PROGRESS" | "RESOLVED" | "ARCHIVED";
  createdAt: string;
  updatedAt: string;
}

const ContactSubmissionsManagement = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubmission, setSelectedSubmission] =
    useState<ContactSubmission | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    const statusParam = searchParams.get("status");
    if (statusParam) {
      setStatusFilter(statusParam);
    }
  }, [navigate, searchParams]);

  useEffect(() => {
    fetchSubmissions();
  }, [statusFilter]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const params: Record<string, string> = {};
      if (statusFilter) params.status = statusFilter;
      const response = await contactAPI.getAll(params);
      setSubmissions(response.data || response.items || []);
    } catch (err: any) {
      if (err.status === 401 || err.status === 403) {
        localStorage.removeItem("token");
        navigate("/admin/login");
        return;
      }
      setError(err.message || "Failed to load contact submissions");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await contactAPI.updateStatus(id, newStatus);
      setSubmissions(
        submissions.map((s) =>
          s.id === id ? { ...s, status: newStatus as any } : s,
        ),
      );
      setSuccessMessage("Status updated successfully");
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to update status");
    }
  };

  const filteredSubmissions = submissions.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      NEW: "bg-danger-subtle text-danger border-danger",
      IN_PROGRESS: "bg-warning-subtle text-warning-emphasis border-warning",
      RESOLVED: "bg-success-subtle text-success border-success",
      ARCHIVED: "bg-secondary-subtle text-secondary border-secondary",
    };
    return `badge border px-2 py-1 ${badges[status] || "bg-secondary"}`;
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status"></div>
          <p className="text-muted fw-bold">Syncing submissions...</p>
        </div>
      </div>
    );
  }

  // Export contact submissions as CSV
  const exportContactsCSV = () => {
    if (!submissions.length) return;

    const headers = [
      "Name",
      "Email",
      "Subject",
      "Message",
      "Status",
      "Created At",
    ];

    const rows = submissions.map((s) => [
      s.name,
      s.email,
      s.subject,
      s.message,
      s.status,
      new Date(s.createdAt).toLocaleString(),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `contact_submissions_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();

    URL.revokeObjectURL(url);
  };

  // Enhanced export functions using centralized helper
  const exportContacts = async (format: 'csv' | 'word' | 'pdf') => {
    try {
      const exportData = exportHelper.prepareExportData(
        submissions,
        {
          name: 'Name',
          email: 'Email',
          subject: 'Subject',
          message: 'Message',
          status: 'Status',
          createdAt: 'Created Date',
          updatedAt: 'Updated Date'
        },
        'Contact Submissions Export',
        `Export of all contact submissions (${submissions.length} total)`
      );

      await exportHelper.export(exportData, format, {
        filename: `contact-submissions`,
        includeLogo: true,
        includeTimestamp: true
      });
    } catch (error) {
      setError('Failed to export contact submissions');
      console.error('Export error:', error);
    }
  };

  // Enhanced sharing functions
  const shareAllContacts = async () => {
    try {
      const shareableContacts = sharingHelper.prepareShareData(
        submissions,
        {
          itemTitleField: 'name',
          itemDescriptionField: 'subject',
          itemUrlField: 'email',
          itemType: 'contact'
        }
      );

      await sharingHelper.shareBulk(shareableContacts, {
        bulkTitle: 'Contact Submissions Directory',
        method: 'native'
      });
    } catch (error) {
      setError('Failed to share contact submissions');
      console.error('Share error:', error);
    }
  };

  const shareSingleContact = async (submission: ContactSubmission) => {
    try {
      await sharingHelper.shareItem({
        ...submission,
        title: `${submission.name} - ${submission.subject}`,
        description: submission.message.substring(0, 100) + '...'
      }, {
        formatTemplate: (item) => ({
          title: `${item.name} - ${item.subject}`,
          text: `${item.status} - ${item.message.substring(0, 100)}...`,
          url: `mailto:${item.email}`
        })
      });
    } catch (error) {
      setError('Failed to share contact submission');
      console.error('Share error:', error);
    }
  };

  // Share contact submissions
  const shareContacts = async () => {
    const text = submissions
      .map(
        (s) =>
          `${s.name} (${s.email})\nSubject: ${s.subject}\nStatus: ${s.status}\n---`,
      )
      .join("\n");

    if (navigator.share) {
      await navigator.share({
        title: "Contact Submissions",
        text,
      });
    } else {
      await navigator.clipboard.writeText(text);
      alert("Contact submissions copied to clipboard");
    }
  };

  return (
    <div className="admin-management bg-light min-vh-100 py-4">
      <div className="container">
        {/* HEADER SECTION */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <button
                onClick={() => navigate("/admin")}
                className="btn btn-white btn-sm border shadow-sm rounded-circle p-2"
                title="Back to Dashboard"
                aria-label="Back to Dashboard"
              >
                <ArrowLeft size={18} />
              </button>
              <h2 className="fw-black text-dark mb-0 ms-2">
                Contact Inquiries
              </h2>
            </div>
            <p className="text-muted mb-0">
              Manage and respond to platform communications
            </p>
          </div>

          <div className="d-flex gap-2 flex-wrap">
            {/* Export Dropdown */}
            <div className="dropdown">
              <button
                className="btn btn-outline-primary btn-sm rounded-pill shadow-sm dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                title="Export all contact submissions"
              >
                <Download size={16} className="me-1" /> Export
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button className="dropdown-item" onClick={() => exportContacts('csv')}>
                    <FileText size={16} className="me-2" /> Export as CSV
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => exportContacts('word')}>
                    <FileText size={16} className="me-2" /> Export as Word
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => exportContacts('pdf')}>
                    <FileText size={16} className="me-2" /> Export as PDF
                  </button>
                </li>
              </ul>
            </div>

            {/* Share Button */}
            <button
              className="btn btn-outline-secondary btn-sm rounded-pill shadow-sm"
              onClick={shareAllContacts}
              title="Share contact submissions"
            >
              <Share2 size={16} className="me-1" /> Share All
            </button>

            <div
              className="input-group shadow-sm"
              style={{ maxWidth: "300px" }}
            >
              <span className="input-group-text bg-white border-end-0">
                <Search size={18} className="text-muted" />
              </span>
              <input
                type="text"
                className="form-control border-start-0 shadow-none"
                placeholder="Search inquiries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {error && (
          <div
            className="alert alert-danger border-0 shadow-sm alert-dismissible fade show"
            role="alert"
          >
            {error}
            <button
              type="button"
              className="btn-close"
              onClick={() => setError(null)}
              aria-label="Close"
            ></button>
          </div>
        )}

        <Toast
          message={successMessage || ""}
          type="success"
          isVisible={!!successMessage}
          onClose={() => setSuccessMessage(null)}
        />

        {/* FILTER BAR */}
        <div className="card border-0 shadow-sm mb-4 rounded-4">
          <div className="card-body py-3">
            <div className="row align-items-center">
              <div className="col-auto">
                <div className="d-flex align-items-center text-muted small fw-bold text-uppercase">
                  <Filter size={14} className="me-2" /> Filter By Status:
                </div>
              </div>
              <div className="col-md-3">
                <select
                  className="form-select border-0 bg-light shadow-none"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  title="Filter by status"
                  aria-label="Filter submissions by status"
                >
                  <option value="">All Inquiries</option>
                  <option value="NEW">New</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* DATA TABLE */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-white">
                <tr className="text-muted small fw-bold">
                  <th className="ps-4">SENDER</th>
                  <th>SUBJECT</th>
                  <th>MESSAGE PREVIEW</th>
                  <th>STATUS</th>
                  <th>DATE</th>
                  <th className="pe-4 text-end">UPDATE STATUS</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubmissions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-5">
                      <div className="text-muted">
                        No submissions found matching your criteria.
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredSubmissions.map((submission) => (
                    <tr key={submission.id}>
                      <td className="ps-4">
                        <div className="fw-bold text-dark">
                          {submission.name}
                        </div>
                        <div className="small text-muted d-flex align-items-center">
                          <Mail size={12} className="me-1" /> {submission.email}
                        </div>
                      </td>
                      <td className="fw-medium text-secondary small">
                        {submission.subject}
                      </td>
                      <td>
                        <button
                          className="btn btn-link btn-sm text-decoration-none p-0 d-flex align-items-center text-primary fw-medium"
                          onClick={() => setSelectedSubmission(submission)}
                          title="View Message Details"
                          aria-label={`View message from ${submission.name}`}
                        >
                          Read Message{" "}
                          <ExternalLink size={14} className="ms-1" />
                        </button>
                      </td>
                      <td>
                        <span className={getStatusBadge(submission.status)}>
                          {submission.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="text-muted small">
                        {new Date(submission.createdAt).toLocaleDateString(
                          undefined,
                          { month: "short", day: "numeric", year: "numeric" },
                        )}
                      </td>
                      <td className="pe-4 text-end">
                        <div className="d-flex justify-content-end gap-2 align-items-center">
                          <button
                            className="btn btn-sm btn-light-info rounded-circle p-2"
                            onClick={() => shareSingleContact(submission)}
                            title="Share this contact submission"
                          >
                            <Share2 size={14} />
                          </button>
                          <select
                            className="form-select form-select-sm d-inline-block w-auto border-0 bg-light-subtle shadow-none"
                            value={submission.status}
                            onChange={(e) =>
                              handleStatusUpdate(submission.id, e.target.value)
                            }
                            title="Change submission status"
                            aria-label="Change status"
                          >
                            <option value="NEW">New</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="RESOLVED">Resolved</option>
                            <option value="ARCHIVED">Archived</option>
                          </select>
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

      {/* DETAIL MODAL */}
      {selectedSubmission && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          tabIndex={-1}
          onClick={() => setSelectedSubmission(null)}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content border-0 shadow-lg rounded-4">
              <div className="modal-header" style={{ backgroundColor: '#04003d', color: 'white', borderRadius: '1rem 1rem 0 0' }}>
                <h5 className="modal-title d-flex align-items-center gap-2 fw-bold" style={{ color: '#e8e8e8' }}>
                  <Mail size={20} /> Contact Inquiry Details
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setSelectedSubmission(null)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-4">
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="text-uppercase mb-2" style={{ fontSize: '0.7rem', color: '#6c757d', fontWeight: '600', letterSpacing: '1px' }}>
                      From
                    </label>
                    <div style={{ color: '#04003d', fontSize: '1.1rem', fontWeight: '600' }}>
                      {selectedSubmission.name}
                    </div>
                    <a
                      href={`mailto:${selectedSubmission.email}`}
                      className="text-decoration-none d-flex align-items-center gap-1 mt-1"
                      style={{ color: '#30d5c8', fontWeight: '500', fontSize: '0.9rem' }}
                    >
                      <Mail size={14} />
                      {selectedSubmission.email}
                    </a>
                  </div>
                  <div className="col-md-6">
                    <label className="text-uppercase mb-2" style={{ fontSize: '0.7rem', color: '#6c757d', fontWeight: '600', letterSpacing: '1px' }}>
                      Status
                    </label>
                    <div>
                      <span
                        className={getStatusBadge(selectedSubmission.status)}
                      >
                        {selectedSubmission.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  <div className="col-12">
                    <label className="text-uppercase mb-2" style={{ fontSize: '0.7rem', color: '#6c757d', fontWeight: '600', letterSpacing: '1px' }}>
                      Subject
                    </label>
                    <div className="p-3 rounded-3" style={{ backgroundColor: '#ffffff', color: '#04003d', fontWeight: '500', border: '2px solid #e0e0e0', fontSize: '1rem' }}>
                      {selectedSubmission.subject}
                    </div>
                  </div>
                  <div className="col-12">
                    <label className="text-uppercase mb-2" style={{ fontSize: '0.7rem', color: '#6c757d', fontWeight: '600', letterSpacing: '1px' }}>
                      Message
                    </label>
                    <div className="p-4 rounded-3" style={{ backgroundColor: '#ffffff', border: '2px solid #30d5c8', color: '#212529', whiteSpace: 'pre-wrap', lineHeight: '1.8', fontSize: '0.95rem' }}>
                      {selectedSubmission.message}
                    </div>
                  </div>
                  <div className="col-12" style={{ color: '#6c757d', fontSize: '0.85rem', fontWeight: '500' }}>
                    Received on{" "}
                    {new Date(selectedSubmission.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0 pt-0">
                <button
                  type="button"
                  className="btn rounded-pill px-4"
                  style={{ backgroundColor: '#e9ecef', color: '#04003d', border: 'none', fontWeight: '500' }}
                  onClick={() => setSelectedSubmission(null)}
                >
                  Close
                </button>
                <a
                  href={`mailto:${selectedSubmission.email}`}
                  className="btn rounded-pill px-4 shadow-sm d-flex align-items-center gap-2"
                  style={{ backgroundColor: '#ff9700', color: 'white', border: 'none', fontWeight: '600' }}
                >
                  <Mail size={16} />
                  Reply via Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedSubmission && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default ContactSubmissionsManagement;
