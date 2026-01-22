import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { contactAPI } from '../../services/api'
import Toast from '../../components/Toast'
import { Search, ArrowLeft, Mail, ExternalLink, Filter } from 'lucide-react'

interface ContactSubmission {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: 'NEW' | 'IN_PROGRESS' | 'RESOLVED' | 'ARCHIVED'
  createdAt: string
  updatedAt: string
}

const ContactSubmissionsManagement = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/admin/login')
      return
    }
    const statusParam = searchParams.get('status')
    if (statusParam) {
      setStatusFilter(statusParam)
    }
  }, [navigate, searchParams])

  useEffect(() => {
    fetchSubmissions()
  }, [statusFilter])

  const fetchSubmissions = async () => {
    try {
      setLoading(true)
      const params: Record<string, string> = {}
      if (statusFilter) params.status = statusFilter
      const response = await contactAPI.getAll(params)
      setSubmissions(response.data || response.items || [])
    } catch (err: any) {
      if (err.status === 401 || err.status === 403) {
        localStorage.removeItem('token')
        navigate('/admin/login')
        return
      }
      setError(err.message || 'Failed to load contact submissions')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await contactAPI.updateStatus(id, newStatus)
      setSubmissions(
        submissions.map((s) => (s.id === id ? { ...s, status: newStatus as any } : s))
      )
      setSuccessMessage('Status updated successfully')
      setError(null)
    } catch (err: any) {
      setError(err.message || 'Failed to update status')
    }
  }

  const filteredSubmissions = submissions.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      NEW: 'bg-danger-subtle text-danger border-danger',
      IN_PROGRESS: 'bg-warning-subtle text-warning-emphasis border-warning',
      RESOLVED: 'bg-success-subtle text-success border-success',
      ARCHIVED: 'bg-secondary-subtle text-secondary border-secondary',
    }
    return `badge border px-2 py-1 ${badges[status] || 'bg-secondary'}`
  }

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status"></div>
          <p className="text-muted fw-bold">Syncing submissions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-management bg-light min-vh-100 py-4">
      <div className="container">
        {/* HEADER SECTION */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <button 
                onClick={() => navigate('/admin')} 
                className="btn btn-white btn-sm border shadow-sm rounded-circle p-2"
                title="Back to Dashboard"
                aria-label="Back to Dashboard"
              >
                <ArrowLeft size={18} />
              </button>
              <h2 className="fw-black text-dark mb-0 ms-2">Contact Inquiries</h2>
            </div>
            <p className="text-muted mb-0">Manage and respond to platform communications</p>
          </div>
          
          <div className="d-flex gap-2 flex-wrap">
  <button
    className="btn btn-outline-primary btn-sm rounded-pill shadow-sm"
    onClick={exportMembersCSV}
    title="Export all members"
  >
    Export CSV
  </button>

  <button
    className="btn btn-outline-secondary btn-sm rounded-pill shadow-sm"
    onClick={shareMembers}
    title="Share members list"
  >
    Share
  </button>
            <div className="input-group shadow-sm">
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
          <div className="alert alert-danger border-0 shadow-sm alert-dismissible fade show" role="alert">
            {error}
            <button type="button" className="btn-close" onClick={() => setError(null)} aria-label="Close"></button>
          </div>
        )}

        <Toast
          message={successMessage || ''}
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
                      <div className="text-muted">No submissions found matching your criteria.</div>
                    </td>
                  </tr>
                ) : (
                  filteredSubmissions.map((submission) => (
                    <tr key={submission.id}>
                      <td className="ps-4">
                        <div className="fw-bold text-dark">{submission.name}</div>
                        <div className="small text-muted d-flex align-items-center">
                          <Mail size={12} className="me-1" /> {submission.email}
                        </div>
                      </td>
                      <td className="fw-medium text-secondary small">{submission.subject}</td>
                      <td>
                        <button
                          className="btn btn-link btn-sm text-decoration-none p-0 d-flex align-items-center text-primary fw-medium"
                          onClick={() => setSelectedSubmission(submission)}
                          title="View Message Details"
                          aria-label={`View message from ${submission.name}`}
                        >
                          Read Message <ExternalLink size={14} className="ms-1" />
                        </button>
                      </td>
                      <td>
                        <span className={getStatusBadge(submission.status)}>
                          {submission.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="text-muted small">
                        {new Date(submission.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="pe-4 text-end">
                        <select
                          className="form-select form-select-sm d-inline-block w-auto border-0 bg-light-subtle shadow-none"
                          value={submission.status}
                          onChange={(e) => handleStatusUpdate(submission.id, e.target.value)}
                          title="Change submission status"
                          aria-label="Change status"
                        >
                          <option value="NEW">New</option>
                          <option value="IN_PROGRESS">In Progress</option>
                          <option value="RESOLVED">Resolved</option>
                          <option value="ARCHIVED">Archived</option>
                        </select>
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
        <div className="modal fade show d-block" tabIndex={-1} onClick={() => setSelectedSubmission(null)}>
          <div className="modal-dialog modal-dialog-centered modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content border-0 shadow-lg rounded-4">
              <div className="modal-header border-0 pb-0">
                <h5 className="fw-black text-dark mt-2 ms-2">Inquiry Details</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedSubmission(null)} aria-label="Close"></button>
              </div>
              <div className="modal-body p-4">
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="text-muted small fw-bold text-uppercase">From</label>
                    <div className="fw-bold fs-5">{selectedSubmission.name}</div>
                    <a href={`mailto:${selectedSubmission.email}`} className="text-primary text-decoration-none">
                      {selectedSubmission.email}
                    </a>
                  </div>
                  <div className="col-md-6 text-md-end">
                    <label className="text-muted small fw-bold text-uppercase">Status</label>
                    <div><span className={getStatusBadge(selectedSubmission.status)}>{selectedSubmission.status}</span></div>
                  </div>
                  <div className="col-12">
                    <label className="text-muted small fw-bold text-uppercase">Subject</label>
                    <div className="p-3 bg-light rounded-3 fw-medium">{selectedSubmission.subject}</div>
                  </div>
                  <div className="col-12">
                    <label className="text-muted small fw-bold text-uppercase">Message Body</label>
                    <div className="p-4 border rounded-3 text-secondary white-space-pre">{selectedSubmission.message}</div>
                  </div>
                  <div className="col-12 text-muted small">
                    Received on {new Date(selectedSubmission.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0">
                <button type="button" className="btn btn-light rounded-pill px-4" onClick={() => setSelectedSubmission(null)}>Dismiss</button>
                <a href={`mailto:${selectedSubmission.email}`} className="btn btn-primary rounded-pill px-4 shadow-sm">Reply via Email</a>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedSubmission && <div className="modal-backdrop fade show"></div>}
    </div>
  )
}

export default ContactSubmissionsManagement;