import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { usersAPI } from '../../services/api'
import ConfirmationModal from '../../components/ConfirmationModal'
import { 
  ArrowLeft, 
  UserPlus, 
  ShieldCheck, 
  ShieldAlert, 
  UserCircle, 
  Edit3, 
  UserX, 
  Mail,
  Shield
} from 'lucide-react'
import '../../styles/adminForms.css'

interface User {
  id: string
  email: string
  name?: string
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN'
  isActive: boolean
  createdAt: string
}

const UsersManagement = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    role: 'USER' as 'USER' | 'ADMIN' | 'SUPER_ADMIN',
    isActive: true,
    password: '',
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/admin/login')
      return
    }
    fetchUsers()
  }, [navigate])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await usersAPI.getAll()
      setUsers(response.data || response.items || [])
    } catch (err: any) {
      if (err.status === 401 || err.status === 403) {
        localStorage.removeItem('token')
        navigate('/admin/login')
        return
      }
      setError(err.message || 'Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  const handleDeactivate = async () => {
    if (!selectedUser) return
    try {
      await usersAPI.deactivate(selectedUser.id)
      setUsers(users.map((u) => (u.id === selectedUser.id ? { ...u, isActive: false } : u)))
      setShowModal(false)
      setSelectedUser(null)
    } catch (err: any) {
      setError(err.message || 'Failed to deactivate user')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingUser) return
    try {
      const updateData: any = {
        name: formData.name,
        role: formData.role,
        isActive: formData.isActive,
      }
      if (formData.password) updateData.password = formData.password
      
      await usersAPI.update(editingUser.id, updateData)
      setShowForm(false)
      setEditingUser(null)
      resetForm()
      fetchUsers()
    } catch (err: any) {
      setError(err.message || 'Failed to update user')
    }
  }

  const resetForm = () => {
    setFormData({ name: '', role: 'USER', isActive: true, password: '' })
  }

  const openEditForm = (user: User) => {
    setEditingUser(user)
    setFormData({
      name: user.name || '',
      role: user.role,
      isActive: user.isActive,
      password: '',
    })
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const stats = useMemo(() => ({
    total: users.length,
    admins: users.filter(u => u.role !== 'USER').length,
    active: users.filter(u => u.isActive).length
  }), [users])

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100 bg-white">
        <div className="text-center">
          <div className="spinner-grow text-primary mb-3" role="status"></div>
          <p className="text-muted fw-bold">Loading User Directory...</p>
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
            <h2 className="fw-black text-dark mb-1">Access Control</h2>
            <p className="text-muted mb-0">Manage administrative privileges and user status.</p>
          </div>
          <button
            onClick={() => navigate('/admin')}
            className="btn btn-white border shadow-sm d-flex align-items-center gap-2"
            title="Return to Dashboard"
            aria-label="Go back to admin dashboard"
          >
            <ArrowLeft size={18} /> Dashboard
          </button>
        </div>

        {/* Analytics Cards */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-3 d-flex flex-row align-items-center gap-3">
              <div className="bg-primary-subtle p-3 rounded-3 text-primary"><UserCircle size={24}/></div>
              <div>
                <h3 className="fw-bold mb-0">{stats.total}</h3>
                <small className="text-muted text-uppercase fw-bold">Total Users</small>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-3 d-flex flex-row align-items-center gap-3">
              <div className="bg-info-subtle p-3 rounded-3 text-info"><ShieldCheck size={24}/></div>
              <div>
                <h3 className="fw-bold mb-0">{stats.admins}</h3>
                <small className="text-muted text-uppercase fw-bold">Admins</small>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-3 d-flex flex-row align-items-center gap-3">
              <div className="bg-success-subtle p-3 rounded-3 text-success"><UserPlus size={24}/></div>
              <div>
                <h3 className="fw-bold mb-0">{stats.active}</h3>
                <small className="text-muted text-uppercase fw-bold">Active Sessions</small>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger border-0 shadow-sm alert-dismissible fade show mb-4" role="alert">
            {error}
            <button type="button" className="btn-close" onClick={() => setError(null)} aria-label="Close error message"></button>
          </div>
        )}

        {/* Edit Form */}
        {showForm && editingUser && (
          <div className="card border-0 shadow-lg mb-5 rounded-4 overflow-hidden animate__animated animate__fadeIn">
            <div className="card-header bg-dark text-white p-4">
              <h5 className="mb-0 d-flex align-items-center gap-2">
                <Edit3 size={20} /> Updating Account: {editingUser.email}
              </h5>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="row g-4">
                  <div className="col-md-6">
                    <label htmlFor="userName" className="form-label fw-bold">Full Name</label>
                    <input
                      id="userName"
                      type="text"
                      className="form-control form-control-lg bg-light"
                      placeholder="Enter user's name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="userRole" className="form-label fw-bold">System Role</label>
                    <select
                      id="userRole"
                      className="form-select form-select-lg bg-light"
                      title="Select user role"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                    >
                      <option value="USER">Standard User</option>
                      <option value="ADMIN">Administrator</option>
                      <option value="SUPER_ADMIN">Super Admin</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="userPass" className="form-label fw-bold">Reset Password</label>
                    <input
                      id="userPass"
                      type="password"
                      className="form-control form-control-lg bg-light"
                      placeholder="Leave blank to keep current"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6 d-flex align-items-center">
                    <div className="form-check form-switch mt-4">
                      <input
                        id="userActive"
                        className="form-check-input shadow-none"
                        type="checkbox"
                        role="switch"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      />
                      <label htmlFor="userActive" className="form-check-label fw-bold ms-2">Account is Active</label>
                    </div>
                  </div>
                </div>
                <div className="d-flex gap-2 mt-5">
                  <button type="submit" className="btn btn-primary px-5 rounded-pill shadow-sm">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-5 rounded-pill"
                    onClick={() => { setShowForm(false); setEditingUser(null); resetForm(); }}
                  >
                    Discard
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Users Table */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-white border-bottom">
                <tr className="text-muted small text-uppercase fw-bold">
                  <th className="px-4 py-3">Account</th>
                  <th className="py-3">Permissions</th>
                  <th className="py-3">Status</th>
                  <th className="py-3">Joined</th>
                  <th className="px-4 py-3 text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr><td colSpan={5} className="text-center py-5 text-muted">No users found in directory.</td></tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-4">
                        <div className="d-flex align-items-center gap-3">
                          <div className="bg-light rounded-circle p-2"><Mail size={16} className="text-primary"/></div>
                          <div>
                            <div className="fw-bold text-dark">{user.email}</div>
                            <small className="text-muted">{user.name || 'No Name Set'}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`badge rounded-pill px-3 py-2 d-inline-flex align-items-center gap-1 ${
                          user.role === 'SUPER_ADMIN' ? 'bg-danger-subtle text-danger' : 
                          user.role === 'ADMIN' ? 'bg-primary-subtle text-primary' : 'bg-light text-muted'
                        }`}>
                          <Shield size={12}/> {user.role.replace('_', ' ')}
                        </span>
                      </td>
                      <td>
                        <span className={`badge rounded-pill px-3 py-2 ${user.isActive ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'}`}>
                          {user.isActive ? '● Active' : '○ Inactive'}
                        </span>
                      </td>
                      <td className="text-muted">{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 text-end">
                        <div className="d-flex justify-content-end gap-2">
                          <button
                            className="btn btn-sm btn-white border shadow-sm"
                            onClick={() => openEditForm(user)}
                            title={`Edit ${user.email}`}
                            aria-label="Edit user"
                          >
                            <Edit3 size={14} className="text-primary"/>
                          </button>
                          {user.isActive && (
                            <button
                              className="btn btn-sm btn-white border shadow-sm"
                              onClick={() => { setSelectedUser(user); setShowModal(true); }}
                              title={`Deactivate ${user.email}`}
                              aria-label="Deactivate user"
                            >
                              <UserX size={14} className="text-warning"/>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showModal} // Updated to common prop name, or change to what your component expects
        onClose={() => { setShowModal(false); setSelectedUser(null); }}
        // onConfirm={handleDeactivate}
        title="Restrict Account Access"
        message={`Are you sure you want to deactivate the account for "${selectedUser?.email}"? This will prevent them from logging in.`}
        // confirmText="Deactivate User"
        // type="warning"
      />
    </div>
  )
}

export default UsersManagement