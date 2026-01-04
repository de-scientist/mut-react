import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ministriesAPI } from '../../services/api'
import ConfirmationModal from '../../components/ConfirmationModal'
import ImageUpload from '../../components/ImageUpload'
import Toast from '../../components/Toast'
import '../../styles/adminForms.css'

interface Ministry {
  id: string
  name: string
  description?: string
  icon?: string
  imageUrl?: string
  slug: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

const MinistriesManagement = () => {
  const [ministries, setMinistries] = useState<Ministry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null)
  const [action, setAction] = useState<'delete' | 'toggle' | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingMinistry, setEditingMinistry] = useState<Ministry | null>(null)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '',
    imageUrl: '',
    slug: '',
    isActive: true,
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/admin/login')
      return
    }
    fetchMinistries()
  }, [navigate])

  const fetchMinistries = async () => {
    try {
      setLoading(true)
      const response = await ministriesAPI.getAll()
      setMinistries(response.data || response.items || [])
    } catch (err: any) {
      if (err.status === 401 || err.status === 403) {
        localStorage.removeItem('token')
        navigate('/admin/login')
        return
      }
      setError(err.message || 'Failed to load ministries')
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleDelete = async () => {
    if (!selectedMinistry) return
    try {
      await ministriesAPI.delete(selectedMinistry.slug)
      setMinistries(ministries.filter((m) => m.id !== selectedMinistry.id))
      setShowModal(false)
      setSelectedMinistry(null)
      setSuccessMessage('Ministry deleted successfully')
      setError(null)
    } catch (err: any) {
      setError(err.message || 'Failed to delete ministry')
      setSuccessMessage(null)
    }
  }

  const handleToggleActive = async () => {
    if (!selectedMinistry) return
    try {
      await ministriesAPI.update(selectedMinistry.slug, { isActive: !selectedMinistry.isActive })
      setMinistries(
        ministries.map((m) =>
          m.id === selectedMinistry.id ? { ...m, isActive: !m.isActive } : m
        )
      )
      setShowModal(false)
      setSelectedMinistry(null)
      setSuccessMessage(`Ministry ${!selectedMinistry.isActive ? 'activated' : 'deactivated'} successfully`)
      setError(null)
    } catch (err: any) {
      setError(err.message || 'Failed to update ministry')
      setSuccessMessage(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingMinistry) {
        await ministriesAPI.update(editingMinistry.slug, formData)
        setSuccessMessage('Ministry updated successfully')
      } else {
        await ministriesAPI.create(formData)
        setSuccessMessage('Ministry added successfully')
      }
      setShowForm(false)
      setEditingMinistry(null)
      resetForm()
      fetchMinistries()
      setError(null)
    } catch (err: any) {
      setError(err.message || 'Failed to save ministry')
      setSuccessMessage(null)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      icon: '',
      imageUrl: '',
      slug: '',
      isActive: true,
    })
  }

  const openEditForm = (ministry: Ministry) => {
    setEditingMinistry(ministry)
    setFormData({
      name: ministry.name,
      description: ministry.description || '',
      icon: ministry.icon || '',
      imageUrl: ministry.imageUrl || '',
      slug: ministry.slug,
      isActive: ministry.isActive,
    })
    setShowForm(true)
  }

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status"></div>
          <p className="text-muted fw-bold">Loading ministries...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-management bg-light min-vh-100 py-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold text-dark mb-1">Ministries Management</h2>
            <p className="text-muted">Manage all ministries</p>
          </div>
          <div>
            <button
              onClick={() => navigate('/admin')}
              className="btn btn-outline-secondary me-2"
            >
              ← Back to Dashboard
            </button>
            <button
              onClick={() => {
                resetForm()
                setEditingMinistry(null)
                setShowForm(true)
              }}
              className="btn btn-primary"
            >
              + Add Ministry
            </button>
          </div>
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

        <Toast
          message={successMessage || ''}
          type="success"
          isVisible={!!successMessage}
          onClose={() => setSuccessMessage(null)}
        />

        {showForm && (
          <div className="card border-0 shadow-sm mb-4 admin-form-container">
            <div className="card-header">
              <h5 className="mb-0">{editingMinistry ? 'Edit Ministry' : 'Create New Ministry'}</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          name: e.target.value,
                          slug: editingMinistry ? formData.slug : generateSlug(e.target.value),
                        })
                      }}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Slug *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Icon</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      placeholder="e.g., ⛪ or icon-class"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <ImageUpload
                      label="Ministry Image"
                      value={formData.imageUrl}
                      onChange={(imageUrl) => setFormData({ ...formData, imageUrl })}
                      className="mb-2"
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <div className="form-check">
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
                    {editingMinistry ? 'Update Ministry' : 'Create Ministry'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowForm(false)
                      setEditingMinistry(null)
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
                    <th>Name</th>
                    <th>Slug</th>
                    <th>Icon</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ministries.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center text-muted py-4">
                        No ministries found
                      </td>
                    </tr>
                  ) : (
                    ministries.map((ministry) => (
                      <tr key={ministry.id}>
                        <td>{ministry.name}</td>
                        <td>
                          <code className="text-muted">{ministry.slug}</code>
                        </td>
                        <td>{ministry.icon || '-'}</td>
                        <td>
                          <span
                            className={`badge ${ministry.isActive ? 'bg-success' : 'bg-secondary'}`}
                          >
                            {ministry.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => openEditForm(ministry)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-outline-warning"
                              onClick={() => {
                                setSelectedMinistry(ministry)
                                setAction('toggle')
                                setShowModal(true)
                              }}
                            >
                              {ministry.isActive ? 'Deactivate' : 'Activate'}
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => {
                                setSelectedMinistry(ministry)
                                setAction('delete')
                                setShowModal(true)
                              }}
                            >
                              Delete
                            </button>
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
          setSelectedMinistry(null)
          setAction(null)
        }}
        onConfirm={() => {
          if (action === 'delete') handleDelete()
          else if (action === 'toggle') handleToggleActive()
        }}
        title={action === 'delete' ? 'Delete Ministry' : 'Toggle Ministry Status'}
        message={
          action === 'delete'
            ? `Are you sure you want to delete "${selectedMinistry?.name}"? This action cannot be undone.`
            : `Are you sure you want to ${selectedMinistry?.isActive ? 'deactivate' : 'activate'} "${selectedMinistry?.name}"?`
        }
      />
    </div>
  )
}

export default MinistriesManagement

