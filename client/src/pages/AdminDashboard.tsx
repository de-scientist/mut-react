import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminAPI } from '../services/api'
import '../assets/mut/css/about.css'

const AdminDashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/admin/login')
      return
    }

    // quick role check from token payload (avoid unnecessary API call if not admin)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      if (!payload || (payload.role !== 'ADMIN' && payload.role !== 'SUPER_ADMIN')) {
        navigate('/admin/login')
        return
      }
    } catch (e) {
      // invalid token -> go to login
      navigate('/admin/login')
      return
    }

    fetchStats()
  }, [navigate])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.getDashboardStats()
      setStats(response.data)
    } catch (err) {
      // handle unauthorized / forbidden
      const message = err?.message || 'Failed to load dashboard'
      if (message.toLowerCase().includes('401') || message.toLowerCase().includes('403')) {
        setError('Unauthorized. Please login with an admin account.')
        navigate('/admin/login')
        return
      }
      setError(message || 'Failed to load dashboard')
      console.error('Dashboard error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <p>Loading dashboard...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <section className="page-hero-section d-flex align-items-center text-center text-white bg-primary-dark">
        <div className="container position-relative py-5">
          <h1 className="display-4 mb-3">Admin Dashboard</h1>
          <button onClick={handleLogout} className="btn btn-light">
            Logout
          </button>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <h2 className="section-title mb-4">Statistics</h2>
          {stats && (
            <div className="row">
              <div className="col-md-3 mb-4">
                <div className="card text-center p-4 shadow-sm">
                  <h3 className="text-primary">{stats.users}</h3>
                  <p className="mb-0">Total Users</p>
                </div>
              </div>
              <div className="col-md-3 mb-4">
                <div className="card text-center p-4 shadow-sm">
                  <h3 className="text-primary">{stats.events}</h3>
                  <p className="mb-0">Events</p>
                </div>
              </div>
              <div className="col-md-3 mb-4">
                <div className="card text-center p-4 shadow-sm">
                  <h3 className="text-primary">{stats.ministries}</h3>
                  <p className="mb-0">Ministries</p>
                </div>
              </div>
              <div className="col-md-3 mb-4">
                <div className="card text-center p-4 shadow-sm">
                  <h3 className="text-primary">{stats.prayerRequests}</h3>
                  <p className="mb-0">Prayer Requests</p>
                </div>
              </div>
              <div className="col-md-3 mb-4">
                <div className="card text-center p-4 shadow-sm">
                  <h3 className="text-warning">{stats.pendingPrayerRequests}</h3>
                  <p className="mb-0">Pending Prayers</p>
                </div>
              </div>
              <div className="col-md-3 mb-4">
                <div className="card text-center p-4 shadow-sm">
                  <h3 className="text-primary">{stats.contacts}</h3>
                  <p className="mb-0">Contact Submissions</p>
                </div>
              </div>
              <div className="col-md-3 mb-4">
                <div className="card text-center p-4 shadow-sm">
                  <h3 className="text-warning">{stats.newContacts}</h3>
                  <p className="mb-0">New Contacts</p>
                </div>
              </div>
              <div className="col-md-3 mb-4">
                <div className="card text-center p-4 shadow-sm">
                  <h3 className="text-primary">{stats.subscriptions}</h3>
                  <p className="mb-0">Newsletter Subscribers</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default AdminDashboard


