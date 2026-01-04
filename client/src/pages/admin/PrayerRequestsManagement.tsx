import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { prayerAPI } from '../../services/api'

interface PrayerRequest {
  id: string
  name?: string
  request: string
  isPublic: boolean
  status: 'PENDING' | 'PRAYED_FOR' | 'ANSWERED'
  createdAt: string
  updatedAt: string
}

const PrayerRequestsManagement = () => {
  const [requests, setRequests] = useState<PrayerRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('')
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
    fetchRequests()
  }, [statusFilter])

  const fetchRequests = async () => {
    try {
      setLoading(true)
      const params: Record<string, string> = {}
      if (statusFilter) params.status = statusFilter
      const response = await prayerAPI.getAll(params)
      setRequests(response.data || response.items || [])
    } catch (err: any) {
      if (err.status === 401 || err.status === 403) {
        localStorage.removeItem('token')
        navigate('/admin/login')
        return
      }
      setError(err.message || 'Failed to load prayer requests')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await prayerAPI.updateStatus(id, newStatus)
      setRequests(
        requests.map((r) => (r.id === id ? { ...r, status: newStatus as any } : r))
      )
    } catch (err: any) {
      setError(err.message || 'Failed to update status')
    }
  }

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      PENDING: 'bg-warning',
      PRAYED_FOR: 'bg-info',
      ANSWERED: 'bg-success',
    }
    return badges[status] || 'bg-secondary'
  }

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status"></div>
          <p className="text-muted fw-bold">Loading prayer requests...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-management bg-light min-vh-100 py-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold text-dark mb-1">Prayer Requests Management</h2>
            <p className="text-muted">View and manage prayer requests</p>
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
                  <option value="PENDING">Pending</option>
                  <option value="PRAYED_FOR">Prayed For</option>
                  <option value="ANSWERED">Answered</option>
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
                    <th>Request</th>
                    <th>Public</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center text-muted py-4">
                        No prayer requests found
                      </td>
                    </tr>
                  ) : (
                    requests.map((req) => (
                      <tr key={req.id}>
                        <td>{req.name || 'Anonymous'}</td>
                        <td>
                          <div style={{ maxWidth: '300px' }}>
                            {req.request.length > 100
                              ? `${req.request.substring(0, 100)}...`
                              : req.request}
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${req.isPublic ? 'bg-info' : 'bg-secondary'}`}>
                            {req.isPublic ? 'Public' : 'Private'}
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${getStatusBadge(req.status)}`}>
                            {req.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                        <td>
                          <select
                            className="form-select form-select-sm"
                            value={req.status}
                            onChange={(e) => handleStatusUpdate(req.id, e.target.value)}
                            style={{ width: 'auto', minWidth: '150px' }}
                          >
                            <option value="PENDING">Pending</option>
                            <option value="PRAYED_FOR">Prayed For</option>
                            <option value="ANSWERED">Answered</option>
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
    </div>
  )
}

export default PrayerRequestsManagement

