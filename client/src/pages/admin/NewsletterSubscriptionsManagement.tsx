import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { newsletterAPI } from '../../services/api'
import { 
  ArrowLeft, 
  Mail, 
  Users, 
  UserCheck, 
  UserMinus, 
  Download,
  Search,
  Calendar
} from 'lucide-react'

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
  const [searchTerm, setSearchTerm] = useState('')
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

  // UX: Client-side search filtering
  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter(s => 
      s.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [subscriptions, searchTerm])

  const stats = useMemo(() => ({
    total: subscriptions.length,
    active: subscriptions.filter(s => s.isActive).length,
    inactive: subscriptions.filter(s => !s.isActive).length
  }), [subscriptions])

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100 bg-white">
        <div className="text-center">
          <div className="spinner-grow text-primary mb-3" role="status"></div>
          <p className="text-muted fw-medium">Loading subscriber list...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-management bg-light min-vh-100 py-5">
      <div className="container">
        {/* Header Section */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
          <div>
            <h2 className="fw-black text-dark mb-1">Newsletter Subscriptions</h2>
            <p className="text-muted mb-0">Manage and export your audience contact list.</p>
          </div>
          <button
            onClick={() => navigate('/admin')}
            className="btn btn-white border shadow-sm d-flex align-items-center gap-2"
            title="Return to Dashboard" // Fixes axe/name-role-value
            aria-label="Back to Dashboard"
          >
            <ArrowLeft size={18} /> Dashboard
          </button>
        </div>

        {/* Stats Cards Row */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-3 d-flex flex-row align-items-center gap-3">
              <div className="bg-primary-subtle p-3 rounded-3 text-primary"><Users size={24}/></div>
              <div>
                <h3 className="fw-bold mb-0">{stats.total}</h3>
                <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '11px' }}>Total Subscribers</small>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-3 d-flex flex-row align-items-center gap-3">
              <div className="bg-success-subtle p-3 rounded-3 text-success"><UserCheck size={24}/></div>
              <div>
                <h3 className="fw-bold mb-0">{stats.active}</h3>
                <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '11px' }}>Active Users</small>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-3 d-flex flex-row align-items-center gap-3">
              <div className="bg-secondary-subtle p-3 rounded-3 text-secondary"><UserMinus size={24}/></div>
              <div>
                <h3 className="fw-bold mb-0">{stats.inactive}</h3>
                <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '11px' }}>Unsubscribed</small>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger border-0 shadow-sm alert-dismissible fade show mb-4" role="alert">
            {error}
            <button type="button" className="btn-close" onClick={() => setError(null)} aria-label="Dismiss error"></button>
          </div>
        )}

        {/* Filters & Actions Bar */}
        <div className="card border-0 shadow-sm mb-4 rounded-4 overflow-hidden">
          <div className="card-body p-4">
            <div className="row g-3 align-items-center">
              <div className="col-md-4">
                <div className="input-group">
                  <span className="input-group-text bg-light border-0"><Search size={18} className="text-muted"/></span>
                  <input 
                    type="text" 
                    className="form-control bg-light border-0" 
                    placeholder="Search by email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <select
                  className="form-select border-0 bg-light"
                  value={activeFilter}
                  onChange={(e) => setActiveFilter(e.target.value)}
                  title="Filter by Subscription Status" // Fixes axe/forms
                  aria-label="Filter subscriptions by active or inactive status"
                >
                  <option value="">All Statuses</option>
                  <option value="true">Active Only</option>
                  <option value="false">Inactive Only</option>
                </select>
              </div>
              <div className="col-md-5 text-md-end">
                <button className="btn btn-primary shadow-sm rounded-pill d-inline-flex align-items-center gap-2 px-4">
                  <Download size={18} /> Export CSV
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-white border-bottom">
                <tr className="text-muted small text-uppercase fw-bold">
                  <th className="px-4 py-3">Subscriber Email</th>
                  <th className="py-3">Status</th>
                  <th className="py-3">Subscribed On</th>
                  <th className="px-4 py-3 text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscriptions.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-5">
                      <Mail size={40} className="text-muted mb-2 opacity-25" />
                      <p className="text-muted">No subscriptions found matching your criteria.</p>
                    </td>
                  </tr>
                ) : (
                  filteredSubscriptions.map((subscription) => (
                    <tr key={subscription.id}>
                      <td className="px-4">
                        <div className="d-flex align-items-center gap-3">
                          <div className="bg-light rounded-circle p-2 text-primary">
                            <Mail size={16} />
                          </div>
                          <a href={`mailto:${subscription.email}`} className="text-dark fw-bold text-decoration-none">
                            {subscription.email}
                          </a>
                        </div>
                      </td>
                      <td>
                        <span className={`badge rounded-pill px-3 py-2 ${
                          subscription.isActive 
                            ? 'bg-success-subtle text-success' 
                            : 'bg-secondary-subtle text-secondary'
                        }`}>
                          {subscription.isActive ? '• Active' : '• Inactive'}
                        </span>
                      </td>
                      <td>
                        <div className="text-muted d-flex align-items-center gap-2">
                          <Calendar size={14} />
                          {new Date(subscription.createdAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </td>
                      <td className="px-4 text-end">
                        <button className="btn btn-sm btn-light rounded-pill px-3 fw-bold">
                          Manage
                        </button>
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
  )
}

export default NewsletterSubscriptionsManagement