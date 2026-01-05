import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminAPI } from '../services/api'
import { 
  Users, Calendar, Church, Heart, Mail, 
  Send, UserPlus, ArrowRight, LayoutGrid, 
  Clock, AlertCircle 
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
          <div className="spinner-grow text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}></div>
          <p className="text-muted fw-bold">Synchronizing Data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger border-0 shadow-lg d-flex align-items-center rounded-4 p-4" role="alert">
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
            <span className="navbar-brand mb-0 h1 fw-bold tracking-tight text-white">Admin Console</span>
          </div>
          <button onClick={handleLogout} className="btn btn-light btn-sm px-4 fw-bold rounded-pill shadow-sm">
            Sign Out
          </button>
        </div>
      </nav>

      <div className="container">
        <header className="mb-5 d-flex flex-column flex-md-row justify-content-between align-items-md-end">
          <div>
            <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill mb-2 fw-bold">Live Status</span>
            <h2 className="fw-black text-dark display-6 mb-0">System Overview</h2>
            <p className="text-muted fs-5 mb-0">Unified management & real-time analytics.</p>
          </div>
          <div className="mt-3 mt-md-0">
             <button onClick={fetchStats} className="btn btn-white border shadow-sm rounded-pill px-4">
               Refresh Data
             </button>
          </div>
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
              { label: 'Members', icon: <UserPlus />, link: '/admin/members', color: '#f59e0b' },
            ].map((item, index) => (
              <div key={index} className="col-4 col-md-3 col-lg">
                <button
                  onClick={() => navigate(item.link)}
                  className="btn btn-white w-100 border-0 shadow-sm d-flex flex-column align-items-center p-3 rounded-4 hover-lift transition-all bg-white"
                >
                  <div className="p-3 rounded-circle mb-2" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                    {item.icon}
                  </div>
                  <span className="fw-bold small text-secondary">{item.label}</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* STATS CARDS */}
        <section className="row g-4 mb-5">
          <StatCard label="Total Users" value={stats.users} icon={<Users size={24}/>} link="/admin/users" />
          <StatCard label="Live Events" value={stats.events} icon={<Calendar size={24}/>} link="/admin/events" />
          <StatCard label="Active Ministries" value={stats.ministries} icon={<Church size={24}/>} link="/admin/ministries" />
          <StatCard label="Prayer Requests" value={stats.prayerRequests} icon={<Heart size={24}/>} link="/admin/prayer-requests" />
          <StatCard label="Pending Prayers" value={stats.pendingPrayerRequests} icon={<Clock size={24}/>} color="text-warning" link="/admin/prayer-requests?status=PENDING" isAlert />
          <StatCard label="New Contacts" value={stats.newContacts} icon={<Send size={24}/>} color="text-warning" link="/admin/contacts?status=NEW" isAlert />
          <StatCard label="Active Members" value={stats.members} icon={<UserPlus size={24}/>} link="/admin/members" />
          <StatCard label="Pending Members" value={stats.pendingMembers} icon={<AlertCircle size={24}/>} color="text-danger" link="/admin/members?status=PENDING" isAlert />
        </section>

        {/* CHARTS */}
        <section className="row g-4 pb-5">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold m-0 text-dark">Data Distribution</h5>
                <div className="dropdown">
                  <span className="badge bg-light text-muted border px-3 py-2 rounded-pill">System Totals</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={barData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 600}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}} 
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} 
                  />
                  <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
              <h5 className="fw-bold mb-4 text-dark">Critical Tasks</h5>
              <div className="d-flex justify-content-center">
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
                        <Cell key={index} fill={COLORS[index % COLORS.length]} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4">
                {pieData.map((item, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-3 p-3 rounded-4 bg-light border-start border-4" style={{ borderColor: COLORS[index % COLORS.length] }}>
                    <span className="small text-dark fw-bold">{item.name}</span>
                    <span className="badge rounded-pill bg-white text-dark border shadow-sm px-3 py-2">{item.value}</span>
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

/** --- REFINED STAT CARD --- */
interface StatCardProps {
  label: string
  value: number
  color?: string
  icon?: any
  link?: string
  isAlert?: boolean
}

const StatCard: React.FC<StatCardProps> = ({ label, value, color, icon, link, isAlert }) => {
  const navigate = useNavigate()
  
  return (
    <div className="col-sm-6 col-md-4 col-xl-3" onClick={() => link && navigate(link)}>
      <div className={`card border-0 shadow-sm p-3 h-100 rounded-4 transition-all hover-lift bg-white ${link ? 'cursor-pointer' : ''}`}>
        <div className="d-flex align-items-start justify-content-between">
          <div className="flex-grow-1">
            <p className="text-muted small fw-bold mb-1 text-uppercase tracking-wider">{label}</p>
            <h2 className={`fw-black mb-1 ${color || 'text-dark'}`}>
              {value.toLocaleString()}
            </h2>
            {link && (
              <div className="text-primary small fw-bold d-flex align-items-center mt-2 opacity-0 hover-show">
                Manage <ArrowRight size={14} className="ms-1" />
              </div>
            )}
          </div>
          <div className={`p-3 rounded-4 ${isAlert ? 'bg-light-subtle' : 'bg-light'}`} style={{ color: isAlert ? 'inherit' : '#94a3b8' }}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard