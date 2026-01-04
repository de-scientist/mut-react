import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminAPI } from '../services/api'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
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

    fetchStats()
  }, [navigate])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.getDashboardStats()
      setStats(response.data || response)
    } catch (err: any) {
      if (err.status === 401 || err.status === 403) {
        localStorage.removeItem('token')
        navigate('/admin/login')
        return
      }
      setError(err.message || 'Failed to load dashboard')
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
        <div className="alert alert-danger">{error}</div>
      </div>
    )
  }

  if (!stats) return null

  /** Recharts Data */
  const barData = [
    { name: 'Users', value: stats.users },
    { name: 'Events', value: stats.events },
    { name: 'Ministries', value: stats.ministries },
    { name: 'Prayers', value: stats.prayerRequests },
    { name: 'Contacts', value: stats.contacts },
    { name: 'Subscribers', value: stats.subscriptions },
  ]

  const pieData = [
    { name: 'Pending Prayers', value: stats.pendingPrayerRequests },
    { name: 'New Contacts', value: stats.newContacts },
  ]

  const COLORS = ['#f59e0b', '#2563eb']

  return (
    <div className="admin-dashboard">
      {/* HERO */}
      <section className="page-hero-section d-flex align-items-center text-center text-white bg-primary-dark">
        <div className="container py-5">
          <h1 className="display-4 mb-3">Admin Dashboard</h1>
          <button onClick={handleLogout} className="btn btn-light">
            Logout
          </button>
        </div>
      </section>

      {/* STATS CARDS */}
      <section className="py-5">
        <div className="container">
          <h2 className="section-title mb-4">Overview</h2>
          <div className="row">
            <StatCard label="Total Users" value={stats.users} />
            <StatCard label="Events" value={stats.events} />
            <StatCard label="Ministries" value={stats.ministries} />
            <StatCard label="Prayer Requests" value={stats.prayerRequests} />
            <StatCard label="Pending Prayers" value={stats.pendingPrayerRequests} color="text-warning" />
            <StatCard label="Contact Submissions" value={stats.contacts} />
            <StatCard label="New Contacts" value={stats.newContacts} color="text-warning" />
            <StatCard label="Subscribers" value={stats.subscriptions} />
          </div>
        </div>
      </section>

      {/* CHARTS */}
      <section className="pb-5">
        <div className="container">
          <div className="row">
            {/* BAR CHART */}
            <div className="col-md-8 mb-4">
              <div className="card p-4 shadow-sm">
                <h5 className="mb-3">Platform Activity</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* PIE CHART */}
            <div className="col-md-4 mb-4">
              <div className="card p-4 shadow-sm">
                <h5 className="mb-3">Action Required</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={100}
                      label
                    >
                      {pieData.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

/** Reusable Stat Card */
interface StatCardProps {
  label: string
  value: number
  color?: string
}

const StatCard: React.FC<StatCardProps> = ({ label, value, color }) => (
  <div className="col-md-3 mb-4">
    <div className="card text-center p-4 shadow-sm h-100">
      <h3 className={color || 'text-primary'}>{value}</h3>
      <p className="mb-0">{label}</p>
    </div>
  </div>
)

export default AdminDashboard
