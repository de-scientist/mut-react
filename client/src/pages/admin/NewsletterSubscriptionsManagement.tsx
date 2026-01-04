import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { newsletterAPI } from '../../services/api'

interface Subscription {
  id: string
  email: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

const NewsletterSubscriptionsManagement = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState<string>('')
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/admin/login')
      return
    }
    fetchSubscriptions()
  }, [navigate, activeFilter])

  const fetchSubscriptions = async () => {
    try {
      setLoading(true)
      const params: Record<string, string> = {}
      if (activeFilter) params.active = activeFilter
      const response = await newsletterAPI.getAll(params)
      setSubscriptions(response.data || response.items || [])
    } catch (err: any) {
      if (err.status === 401 || err.status === 403) {
        localStorage.removeItem('token')
        navigate('/admin/login')
        return
      }
      setError(err.message || 'Failed to load subscriptions')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status"></div>
          <p className="text-muted fw-bold">Loading subscriptions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-management bg-light min-vh-100 py-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold text-dark mb-1">Newsletter Subscriptions</h2>
            <p className="text-muted">View all newsletter subscribers</p>
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
                  value={activeFilter}
                  onChange={(e) => setActiveFilter(e.target.value)}
                >
                  <option value="">All Subscriptions</option>
                  <option value="true">Active Only</option>
                  <option value="false">Inactive Only</option>
                </select>
              </div>
              <div className="col-md-8 text-end">
                <p className="mb-0 text-muted">
                  Total: <strong>{subscriptions.length}</strong> | Active:{' '}
                  <strong>{subscriptions.filter((s) => s.isActive).length}</strong>
                </p>
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
                    <th>Email</th>
                    <th>Status</th>
                    <th>Subscribed Date</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-center text-muted py-4">
                        No subscriptions found
                      </td>
                    </tr>
                  ) : (
                    subscriptions.map((subscription) => (
                      <tr key={subscription.id}>
                        <td>
                          <a href={`mailto:${subscription.email}`}>{subscription.email}</a>
                        </td>
                        <td>
                          <span
                            className={`badge ${subscription.isActive ? 'bg-success' : 'bg-secondary'}`}
                          >
                            {subscription.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>{new Date(subscription.createdAt).toLocaleDateString()}</td>
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

export default NewsletterSubscriptionsManagement

