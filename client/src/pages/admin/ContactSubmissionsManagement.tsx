import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { contactAPI } from '../../services/api'

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
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/admin/login')
      return
    }
    // Check for status in URL params
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
    } catch (err: any) {
      setError(err.message || 'Failed to update status')
    }
  }

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      NEW: 'bg-danger',
      IN_PROGRESS: 'bg-warning',
      RESOLVED: 'bg-success',
      ARCHIVED: 'bg-secondary',
    }
    return badges[status] || 'bg-secondary'
  }

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status"></div>
          <p className="text-muted fw-bold">Loading contact submissions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-management bg-light min-vh-100 py-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold text-dark mb-1">Contact Submissions Management</h2>
            <p className="text-muted">View and manage contact form submissions</p>
          </div>
          <button
            onClick={() => navigate('/admin')}
            className="btn btn-outline-secondary"
          >
            ← Back to Dashboard
          </button>
        </div>

        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button
              type="button"
              className="btn-close"
              onClick={() => setError(null)}
            ></button>
          </div>
        )}

        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-4">
                <label className="form-label">Filter by Status</label>
                <select
                  className="form-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  <option value="NEW">New</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center text-muted py-4">
                        No contact submissions found
                      </td>
                    </tr>
                  ) : (
                    submissions.map((submission) => (
                      <tr key={submission.id}>
                        <td>{submission.name}</td>
                        <td>
                          <a href={`mailto:${submission.email}`}>{submission.email}</a>
                        </td>
                        <td>{submission.subject}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-link p-0"
                            onClick={() => setSelectedSubmission(submission)}
                          >
                            {submission.message.length > 50
                              ? `${submission.message.substring(0, 50)}...`
                              : submission.message}
                          </button>
                        </td>
                        <td>
                          <span className={`badge ${getStatusBadge(submission.status)}`}>
                            {submission.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td>{new Date(submission.createdAt).toLocaleDateString()}</td>
                        <td>
                          <select
                            className="form-select form-select-sm"
                            value={submission.status}
                            onChange={(e) => handleStatusUpdate(submission.id, e.target.value)}
                            style={{ width: 'auto', minWidth: '150px' }}
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
      </div>

      {selectedSubmission && (
        <div
          className="modal fade show"
          style={{ display: 'block' }}
          tabIndex={-1}
          onClick={() => setSelectedSubmission(null)}
        >
          <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Contact Submission Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedSubmission(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Name:</strong> {selectedSubmission.name}
                </p>
                <p>
                  <strong>Email:</strong>{' '}
                  <a href={`mailto:${selectedSubmission.email}`}>
                    {selectedSubmission.email}
                  </a>
                </p>
                <p>
                  <strong>Subject:</strong> {selectedSubmission.subject}
                </p>
                <p>
                  <strong>Message:</strong>
                </p>
                <p className="border p-3 rounded">{selectedSubmission.message}</p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span className={`badge ${getStatusBadge(selectedSubmission.status)}`}>
                    {selectedSubmission.status.replace('_', ' ')}
                  </span>
                </p>
                <p>
                  <strong>Submitted:</strong>{' '}
                  {new Date(selectedSubmission.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSelectedSubmission(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedSubmission && <div className="modal-backdrop fade show"></div>}
    </div>
  )
}

export default ContactSubmissionsManagement

