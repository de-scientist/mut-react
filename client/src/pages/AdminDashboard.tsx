import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminAPI } from '../services/api'
import '../assets/mut/css/about.css'

interface DashboardStats {
  users: number
  events: number
  ministries: number
  prayerRequests: number
  pendingPrayerRequests: number
  contacts: number
  newContacts: number
  subscriptions: number
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
  const token = localStorage.getItem('token')
  if (!token) {
    navigate('/admin/login')
    return
  }

  // Just fetch stats — backend enforces admin role
  fetchStats()
}, [navigate])


  const fetchStats = async () => {
  try {
    setLoading(true)
    const response = await adminAPI.getDashboardStats()
    setStats(response.data || response) // some backends wrap in data
    console.log('Dashboard stats response:', response)
  } catch (err: any) {
    if (err.status === 401 || err.status === 403) {
      localStorage.removeItem('token')
      navigate('/admin/login')
      return
    }
    setError(err.message || 'Failed to load dashboard')
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
              <StatCard label="Total Users" value={stats.users} color="text-primary" />
              <StatCard label="Events" value={stats.events} color="text-primary" />
              <StatCard label="Ministries" value={stats.ministries} color="text-primary" />
              <StatCard label="Prayer Requests" value={stats.prayerRequests} color="text-primary" />
              <StatCard label="Pending Prayers" value={stats.pendingPrayerRequests} color="text-warning" />
              <StatCard label="Contact Submissions" value={stats.contacts} color="text-primary" />
              <StatCard label="New Contacts" value={stats.newContacts} color="text-warning" />
              <StatCard label="Newsletter Subscribers" value={stats.subscriptions} color="text-primary" />
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

// Small reusable card component for stats
interface StatCardProps {
  label: string
  value: number
  color?: string
}

const StatCard: React.FC<StatCardProps> = ({ label, value, color }) => (
  <div className="col-md-3 mb-4">
    <div className="card text-center p-4 shadow-sm">
      <h3 className={color || 'text-primary'}>{value}</h3>
      <p className="mb-0">{label}</p>
    </div>
  </div>
)

export default AdminDashboard
