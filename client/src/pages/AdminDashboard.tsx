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
  CartesianGrid,
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
  members: number
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
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status"></div>
          <p className="text-muted fw-bold">Loading dashboard insights...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger border-0 shadow-sm d-flex align-items-center" role="alert">
          <span className="me-2">⚠️</span> {error}
        </div>
      </div>
    )
  }

  if (!stats) return null

  const barData = [
    { name: 'Users', value: stats.users },
    { name: 'Events', value: stats.events },
    { name: 'Ministries', value: stats.ministries },
    { name: 'Prayers', value: stats.prayerRequests },
    { name: 'Contacts', value: stats.contacts },
    { name: 'Subscribers', value: stats.subscriptions },
    { name: 'Members', value: stats.members },
  ]

  const pieData = [
    { name: 'Pending Prayers', value: stats.pendingPrayerRequests },
    { name: 'New Contacts', value: stats.newContacts },
  ]

  const COLORS = ['#f59e0b', '#2563eb']

  return (
    <div className="admin-dashboard bg-light min-vh-100">
      {/* COMPACT NAV/HEADER */}
      <nav className="navbar navbar-dark bg-primary-dark shadow-sm py-3 mb-4">
        <div className="container">
          <span className="navbar-brand mb-0 h1 fw-bold">Admin Dashboard</span>
          <button onClick={handleLogout} className="btn btn-outline-light btn-sm px-4">
            Logout
          </button>
        </div>
      </nav>

      <div className="container">
        {/* WELCOME SECTION */}
        <header className="mb-4">
          <h2 className="fw-bold text-dark">System Overview</h2>
          <p className="text-muted">Real-time performance and activity metrics.</p>
        </header>

        {/* QUICK NAVIGATION MENU */}
        <section className="mb-5">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0 fw-bold">Quick Navigation</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-6 col-md-4 col-lg-3">
                  <button
                    onClick={() => navigate('/admin/events')}
                    className="btn btn-outline-primary w-100 d-flex flex-column align-items-center p-3"
                  >
                    <span className="fs-3 mb-2">📅</span>
                    <span className="fw-medium">Events</span>
                  </button>
                </div>
                <div className="col-6 col-md-4 col-lg-3">
                  <button
                    onClick={() => navigate('/admin/ministries')}
                    className="btn btn-outline-primary w-100 d-flex flex-column align-items-center p-3"
                  >
                    <span className="fs-3 mb-2">⛪</span>
                    <span className="fw-medium">Ministries</span>
                  </button>
                </div>
                <div className="col-6 col-md-4 col-lg-3">
                  <button
                    onClick={() => navigate('/admin/prayer-requests')}
                    className="btn btn-outline-primary w-100 d-flex flex-column align-items-center p-3"
                  >
                    <span className="fs-3 mb-2">🙏</span>
                    <span className="fw-medium">Prayer Requests</span>
                  </button>
                </div>
                <div className="col-6 col-md-4 col-lg-3">
                  <button
                    onClick={() => navigate('/admin/contacts')}
                    className="btn btn-outline-primary w-100 d-flex flex-column align-items-center p-3"
                  >
                    <span className="fs-3 mb-2">📩</span>
                    <span className="fw-medium">Contact Forms</span>
                  </button>
                </div>
                <div className="col-6 col-md-4 col-lg-3">
                  <button
                    onClick={() => navigate('/admin/newsletter')}
                    className="btn btn-outline-primary w-100 d-flex flex-column align-items-center p-3"
                  >
                    <span className="fs-3 mb-2">📧</span>
                    <span className="fw-medium">Newsletter</span>
                  </button>
                </div>
                <div className="col-6 col-md-4 col-lg-3">
                  <button
                    onClick={() => navigate('/admin/users')}
                    className="btn btn-outline-primary w-100 d-flex flex-column align-items-center p-3"
                  >
                    <span className="fs-3 mb-2">👥</span>
                    <span className="fw-medium">Users</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS CARDS GRID */}
        <section className="row g-4 mb-5">
          <StatCard label="Total Users" value={stats.users} icon="👥" link="/admin/users" />
          <StatCard label="Events" value={stats.events} icon="📅" link="/admin/events" />
          <StatCard label="Ministries" value={stats.ministries} icon="⛪" link="/admin/ministries" />
          <StatCard label="Prayer Requests" value={stats.prayerRequests} icon="🙏" link="/admin/prayer-requests" />
          <StatCard label="Pending Prayers" value={stats.pendingPrayerRequests} color="text-warning" icon="⏳" link="/admin/prayer-requests?status=PENDING" />
          <StatCard label="Contact Submissions" value={stats.contacts} icon="📩" link="/admin/contacts" />
          <StatCard label="New Contacts" value={stats.newContacts} color="text-warning" icon="✨" link="/admin/contacts?status=NEW" />
          <StatCard label="Subscribers" value={stats.subscriptions} icon="📧" link="/admin/newsletter" />
        </section>

        {/* CHARTS SECTION */}
        <section className="row g-4 pb-5">
          {/* BAR CHART */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm p-4 h-100">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold m-0 text-secondary">Platform Growth</h5>
                <span className="badge bg-primary-subtle text-primary p-2">Total Metrics</span>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={barData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}} 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                  />
                  <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* PIE CHART / TASKS */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm p-4 h-100">
              <h5 className="fw-bold mb-4 text-secondary">Action Required</h5>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                  >
                    {pieData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-3">
                {pieData.map((item, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-2 p-2 rounded bg-light">
                    <span className="small text-muted fw-medium">{item.name}</span>
                    <span className="badge rounded-pill bg-white text-dark border shadow-sm">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

/** Reusable Stat Card */
interface StatCardProps {
  label: string
  value: number
  color?: string
  icon?: string
  link?: string
}

const StatCard: React.FC<StatCardProps> = ({ label, value, color, icon, link }) => {
  const navigate = useNavigate()
  const cardContent = (
    <div className="card border-0 shadow-sm p-3 h-100 transition-up" style={{ cursor: link ? 'pointer' : 'default' }}>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <p className="text-muted small fw-medium mb-1 uppercase tracking-wider">{label}</p>
          <h3 className={`fw-bold mb-0 ${color || 'text-dark'}`}>{value.toLocaleString()}</h3>
        </div>
        <div className="fs-3 opacity-50">{icon}</div>
      </div>
    </div>
  )

  if (link) {
    return (
      <div className="col-sm-6 col-md-4 col-xl-3" onClick={() => navigate(link)}>
        {cardContent}
      </div>
    )
  }

  return <div className="col-sm-6 col-md-4 col-xl-3">{cardContent}</div>
}

export default AdminDashboard