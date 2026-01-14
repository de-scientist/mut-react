import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminAPI } from '../services/api'
import {
  Users,
  Calendar,
  Church,
  Heart,
  Mail,
  Send,
  UserPlus,
  ArrowRight,
  LayoutGrid,
  Clock,
  AlertCircle,
  FolderOpen,
  Image,
} from 'lucide-react'
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
  pendingMembers: number
  resources?: number
  media?: number
  blogs?: number
  publishedBlogs?: number
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
      <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
        <div className="text-center">
          <div
            className="spinner-grow text-primary mb-3"
            style={{ width: '3rem', height: '3rem' }}
          />
          <p className="text-muted fw-bold">Synchronizing Data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger border-0 shadow-lg d-flex align-items-center rounded-4 p-4">
          <AlertCircle className="me-3" size={32} />
          <div>
            <h5 className="mb-0 fw-bold">System Error</h5>
            <p className="mb-0 opacity-75">{error}</p>
          </div>
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
    ...(stats.blogs !== undefined ? [{ name: 'Blogs', value: stats.blogs }] : []),
    ...(stats.resources !== undefined
      ? [{ name: 'Resources', value: stats.resources }]
      : []),
    ...(stats.media !== undefined ? [{ name: 'Media', value: stats.media }] : []),
  ]

  const pieData = [
    { name: 'Pending Prayers', value: stats.pendingPrayerRequests },
    { name: 'New Contacts', value: stats.newContacts },
    { name: 'Pending Members', value: stats.pendingMembers },
  ]

  const COLORS = ['#6366f1', '#f59e0b', '#ef4444']

  return (
    <div className="admin-dashboard bg-light min-vh-100 pb-5">
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary-dark shadow-sm py-3 mb-4 sticky-top">
        <div className="container">
          <div className="d-flex align-items-center">
            <div className="bg-white rounded-3 p-2 me-3 shadow-sm">
              <LayoutGrid size={24} className="text-primary" />
            </div>
            <span className="navbar-brand fw-bold text-white">
              Admin Console
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="btn btn-light btn-sm px-4 fw-bold rounded-pill shadow-sm"
          >
            Sign Out
          </button>
        </div>
      </nav>

      <div className="container">
        {/* HEADER */}
        <header className="mb-5 d-flex flex-column flex-md-row justify-content-between align-items-md-end">
          <div>
            <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill fw-bold">
              Live Status
            </span>
            <h2 className="fw-black display-6 mb-0">System Overview</h2>
            <p className="text-muted fs-5 mb-0">
              Unified management & real-time analytics.
            </p>
          </div>
          <button
            onClick={fetchStats}
            className="btn btn-white border shadow-sm rounded-pill px-4 mt-3 mt-md-0"
          >
            Refresh Data
          </button>
        </header>

        {/* QUICK NAVIGATION */}
        <section className="mb-5">
          <div className="row g-3">
            {[
              { label: 'Events', icon: <Calendar />, link: '/admin/events', color: '#6366f1' },
              { label: 'Ministries', icon: <Church />, link: '/admin/ministries', color: '#8b5cf6' },
              { label: 'Prayers', icon: <Heart />, link: '/admin/prayer-requests', color: '#ec4899' },
              { label: 'Contacts', icon: <Send />, link: '/admin/contacts', color: '#06b6d4' },
              { label: 'Newsletter', icon: <Mail />, link: '/admin/newsletter', color: '#10b981' },
              { label: 'Users', icon: <Users />, link: '/admin/users', color: '#4f46e5' },
              { label: 'Blogs', icon: <FolderOpen />, link: '/admin/blogs', color: '#f97316' },
              { label: 'Members', icon: <UserPlus />, link: '/admin/members', color: '#f59e0b' },
              { label: 'Resources', icon: <FolderOpen />, link: '/admin/resources', color: '#0ea5e9' },
              { label: 'Media', icon: <Image />, link: '/admin/media', color: '#f97316' },
            ].map((item, index) => (
              <div key={index} className="col-4 col-md-3 col-lg">
                <button
                  onClick={() => navigate(item.link)}
                  className="btn btn-white w-100 border-0 shadow-sm d-flex flex-column align-items-center p-3 rounded-4 hover-lift"
                >
                  <div
                    className="p-3 rounded-circle mb-2"
                    style={{
                      backgroundColor: `${item.color}15`,
                      color: item.color,
                    }}
                  >
                    {item.icon}
                  </div>
                  <span className="fw-bold small text-secondary">
                    {item.label}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* STAT CARDS */}
        <section className="row g-4 mb-5">
          <StatCard label="Total Users" value={stats.users} icon={<Users />} link="/admin/users" />
          <StatCard label="Live Events" value={stats.events} icon={<Calendar />} link="/admin/events" />
          <StatCard label="Active Ministries" value={stats.ministries} icon={<Church />} link="/admin/ministries" />
          <StatCard label="Prayer Requests" value={stats.prayerRequests} icon={<Heart />} link="/admin/prayer-requests" />
          <StatCard label="Pending Prayers" value={stats.pendingPrayerRequests} icon={<Clock />} isAlert link="/admin/prayer-requests?status=PENDING" />
          <StatCard label="New Contacts" value={stats.newContacts} icon={<Send />} isAlert link="/admin/contacts?status=NEW" />
          <StatCard label="Active Members" value={stats.members} icon={<UserPlus />} link="/admin/members" />
          <StatCard label="Pending Members" value={stats.pendingMembers} icon={<AlertCircle />} isAlert link="/admin/members?status=PENDING" />
          {stats.blogs !== undefined && (
            <StatCard
              label="Blogs (total/published)"
              value={stats.blogs}
              icon={<FolderOpen />}
              link="/admin/blogs"
              helperValue={stats.publishedBlogs ?? 0}
            />
          )}
          {stats.resources !== undefined && (
            <StatCard
              label="Resources"
              value={stats.resources}
              icon={<FolderOpen />}
              link="/admin/resources"
            />
          )}
          {stats.media !== undefined && (
            <StatCard
              label="Media"
              value={stats.media}
              icon={<Image />}
              link="/admin/media"
            />
          )}
        </section>

        {/* CHARTS */}
        <section className="row g-4 pb-5">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
              <h5 className="fw-bold mb-4">Data Distribution</h5>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
              <h5 className="fw-bold mb-4">Critical Tasks</h5>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={75}
                    outerRadius={95}
                    paddingAngle={8}
                  >
                    {pieData.map((_, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

interface StatCardProps {
  label: string
  value: number
  icon?: any
  link?: string
  isAlert?: boolean
  helperValue?: number
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  link,
  isAlert,
  helperValue,
}) => {
  const navigate = useNavigate()

  return (
    <div
      className="col-sm-6 col-md-4 col-xl-3"
      onClick={() => link && navigate(link)}
    >
      <div className="card border-0 shadow-sm p-3 h-100 rounded-4 hover-lift cursor-pointer">
        <div className="d-flex justify-content-between">
          <div>
            <p className="text-muted small fw-bold mb-1 text-uppercase">
              {label}
            </p>
            <h2 className="fw-black mb-1">{value.toLocaleString()}</h2>
            {helperValue !== undefined && (
              <p className="mb-0 text-muted small">Published: {helperValue.toLocaleString()}</p>
            )}
            {link && (
              <span className="text-primary small fw-bold">
                Manage <ArrowRight size={14} />
              </span>
            )}
          </div>
          <div
            className={`p-3 rounded-4 ${
              isAlert ? 'bg-light-subtle' : 'bg-light'
            }`}
          >
            {icon}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
