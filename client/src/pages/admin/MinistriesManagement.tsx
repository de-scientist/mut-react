import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ministriesAPI } from '../../services/api'
import ConfirmationModal from '../../components/ConfirmationModal'
import ImageUpload from '../../components/ImageUpload'
import Toast from '../../components/Toast'
import { 
  Plus, 
  ArrowLeft, 
  Edit3, 
  Trash2, 
  Power, 
  Globe, 
  Layout, 
  Info 
} from 'lucide-react' 
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
      <div className="d-flex align-items-center justify-content-center vh-100 bg-white">
        <div className="text-center">
          <div className="spinner-grow text-primary mb-3" role="status"></div>
          <p className="text-muted fw-medium">Loading Ministries...</p>
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
            <h2 className="fw-black text-dark mb-1">Ministries Management</h2>
            <p className="text-muted mb-0">Manage community focus groups and departmental services.</p>
          </div>
          <div className="d-flex gap-2">
            <button
              onClick={() => navigate('/admin')}
              className="btn btn-white border shadow-sm d-flex align-items-center gap-2"
              title="Return to Dashboard"
            >
              <ArrowLeft size={18} /> Dashboard
            </button>
            <button
              onClick={() => { resetForm(); setEditingMinistry(null); setShowForm(true) }}
              className="btn btn-primary shadow-sm d-flex align-items-center gap-2"
              title="Add New Ministry"
            >
              <Plus size={18} /> Add Ministry
            </button>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger border-0 shadow-sm alert-dismissible fade show" role="alert">
            <div className="d-flex align-items-center gap-2">
               <span>{error}</span>
            </div>
            <button type="button" className="btn-close" onClick={() => setError(null)} aria-label="Dismiss error"></button>
          </div>
        )}

        <Toast
          message={successMessage || ''}
          type="success"
          isVisible={!!successMessage}
          onClose={() => setSuccessMessage(null)}
        />

        {/* Form Section */}
        {showForm && (
          <div className="card border-0 shadow-lg mb-5 rounded-4 overflow-hidden animate-fade-in">
            <div className="card-header bg-white py-3 border-bottom">
              <h5 className="mb-0 fw-bold">{editingMinistry ? '📝 Edit Ministry' : '✨ Create New Ministry'}</h5>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="row g-4">
                  <div className="col-md-6">
                    <label htmlFor="minName" className="form-label fw-bold small text-uppercase">Name *</label>
                    <input
                      id="minName"
                      type="text"
                      className="form-control form-control-lg bg-light border-0"
                      placeholder="e.g. Youth Ministry"
                      title="Ministry Name"
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
                  <div className="col-md-6">
                    <label htmlFor="minSlug" className="form-label fw-bold small text-uppercase">Slug *</label>
                    <input
                      id="minSlug"
                      type="text"
                      className="form-control form-control-lg bg-light border-0"
                      placeholder="youth-ministry"
                      title="URL Slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="minIcon" className="form-label fw-bold small text-uppercase">Icon / Emoji</label>
                    <input
                      id="minIcon"
                      type="text"
                      className="form-control form-control-lg bg-light border-0"
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      placeholder="e.g., ⛪"
                      title="Ministry Icon"
                    />
                  </div>
                  <div className="col-md-6">
                    <ImageUpload
                      label="Ministry Banner"
                      value={formData.imageUrl}
                      onChange={(imageUrl) => setFormData({ ...formData, imageUrl })}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="minDesc" className="form-label fw-bold small text-uppercase">Description</label>
                    <textarea
                      id="minDesc"
                      className="form-control bg-light border-0"
                      rows={3}
                      placeholder="What is the mission of this ministry?"
                      title="Ministry Description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <div className="col-12">
                    <div className="form-check form-switch p-0 ps-5">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="isActiveSwitch"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      />
                      <label className="form-check-label fw-medium ms-2" htmlFor="isActiveSwitch">
                        Make this ministry visible to public
                      </label>
                    </div>
                  </div>
                </div>
                <div className="d-flex gap-2 mt-4 pt-3 border-top">
                  <button type="submit" className="btn btn-primary px-4 py-2 rounded-pill shadow-sm">
                    {editingMinistry ? 'Save Changes' : 'Publish Ministry'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-light px-4 py-2 rounded-pill"
                    onClick={() => { setShowForm(false); setEditingMinistry(null); resetForm() }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Table Section */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-white border-bottom">
                <tr className="text-muted small text-uppercase fw-bold">
                  <th className="px-4 py-3">Ministry Details</th>
                  <th className="py-3">Slug / URL</th>
                  <th className="py-3">Status</th>
                  <th className="px-4 py-3 text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {ministries.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-5">
                      <p className="text-muted">No ministries found.</p>
                    </td>
                  </tr>
                ) : (
                  ministries.map((ministry) => (
                    <tr key={ministry.id}>
                      <td className="px-4">
                        <div className="d-flex align-items-center gap-3">
                          <div className="bg-light rounded-3 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', fontSize: '1.2rem' }}>
                            {ministry.icon || <Layout size={20} className="text-muted" />}
                          </div>
                          <div>
                            <div className="fw-bold text-dark">{ministry.name}</div>
                            <div className="small text-muted d-flex align-items-center gap-1">
                              <Info size={12} /> {ministry.description ? ministry.description.substring(0, 30) + '...' : 'No description'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="small text-muted d-flex align-items-center gap-1">
                          <Globe size={14} /> <code>/{ministry.slug}</code>
                        </div>
                      </td>
                      <td>
                        <span className={`badge rounded-pill px-3 py-2 ${ministry.isActive ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'}`}>
                          {ministry.isActive ? '• Active' : '• Inactive'}
                        </span>
                      </td>
                      <td className="px-4 text-end">
                        <div className="d-flex justify-content-end gap-2">
                          <button
                            className="btn btn-sm btn-light-primary rounded-circle p-2"
                            onClick={() => openEditForm(ministry)}
                            title="Edit Ministry"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            className={`btn btn-sm rounded-circle p-2 ${ministry.isActive ? 'btn-light-warning' : 'btn-light-success'}`}
                            onClick={() => { setSelectedMinistry(ministry); setAction('toggle'); setShowModal(true) }}
                            title={ministry.isActive ? 'Deactivate' : 'Activate'}
                          >
                            <Power size={16} />
                          </button>
                          <button
                            className="btn btn-sm btn-light-danger rounded-circle p-2"
                            onClick={() => { setSelectedMinistry(ministry); setAction('delete'); setShowModal(true) }}
                            title="Delete Ministry"
                          >
                            <Trash2 size={16} />
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

      <ConfirmationModal
        isOpen={showModal} 
        onClose={() => {
          setShowModal(false)
          setSelectedMinistry(null)
          setAction(null)
        }}
        // Using common prop naming for Confirmations
        // onConfirm={() => {
        //   if (action === 'delete') handleDelete()
        //   else if (action === 'toggle') handleToggleActive()
        // }}
        title={action === 'delete' ? 'Confirm Deletion' : 'Update Status'}
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