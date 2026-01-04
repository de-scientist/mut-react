import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usersAPI } from '../../services/api'
import ConfirmationModal from '../../components/ConfirmationModal'

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
  const [action, setAction] = useState<'deactivate' | null>(null)
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
      if (formData.password) {
        updateData.password = formData.password
      }
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
    setFormData({
      name: '',
      role: 'USER',
      isActive: true,
      password: '',
    })
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
  }

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status"></div>
          <p className="text-muted fw-bold">Loading users...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-management bg-light min-vh-100 py-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold text-dark mb-1">Users Management</h2>
            <p className="text-muted">Manage user accounts and permissions</p>
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

        {showForm && editingUser && (
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">Edit User: {editingUser.email}</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Role</label>
                    <select
                      className="form-select"
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value as any })
                      }
                    >
                      <option value="USER">User</option>
                      <option value="ADMIN">Admin</option>
                      <option value="SUPER_ADMIN">Super Admin</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">New Password (leave blank to keep current)</label>
                    <input
                      type="password"
                      className="form-control"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="form-check mt-4">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      />
                      <label className="form-check-label">Active</label>
                    </div>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary">
                    Update User
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowForm(false)
                      setEditingUser(null)
                      resetForm()
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center text-muted py-4">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.email}</td>
                        <td>{user.name || '-'}</td>
                        <td>
                          <span
                            className={`badge ${
                              user.role === 'SUPER_ADMIN'
                                ? 'bg-danger'
                                : user.role === 'ADMIN'
                                  ? 'bg-primary'
                                  : 'bg-secondary'
                            }`}
                          >
                            {user.role.replace('_', ' ')}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge ${user.isActive ? 'bg-success' : 'bg-secondary'}`}
                          >
                            {user.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => openEditForm(user)}
                            >
                              Edit
                            </button>
                            {user.isActive && (
                              <button
                                className="btn btn-sm btn-outline-warning"
                                onClick={() => {
                                  setSelectedUser(user)
                                  setAction('deactivate')
                                  setShowModal(true)
                                }}
                              >
                                Deactivate
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
      </div>

      <ConfirmationModal
        show={showModal}
        onHide={() => {
          setShowModal(false)
          setSelectedUser(null)
          setAction(null)
        }}
        onConfirm={handleDeactivate}
        title="Deactivate User"
        message={`Are you sure you want to deactivate "${selectedUser?.email}"?`}
      />
    </div>
  )
}

export default UsersManagement

