import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mediaAPI } from '../../services/api'
import ConfirmationModal from '../../components/ConfirmationModal'
import ImageUpload from '../../components/ImageUpload'
import Toast from '../../components/Toast'
import { Plus, Edit3, Trash2, ArrowLeft, Power } from 'lucide-react'
import '../../styles/adminForms.css'

interface MediaItem {
  id: string
  title: string
  description?: string
  category?: string
  imageUrl: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

const MediaManagement = () => {
  const [gallery, setGallery] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [action, setAction] = useState<'delete' | 'toggle' | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    imageUrl: '',
    isActive: true,
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/admin/login')
      return
    }
    fetchGallery()
  }, [navigate])

  const fetchGallery = async () => {
    try {
      setLoading(true)
      const response = await mediaAPI.getAll()
      setGallery(response.data || [])
    } catch (err: any) {
      setError(err.message || 'Failed to load gallery')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({ title: '', description: '', category: '', imageUrl: '', isActive: true })
  }

  const openEditForm = (item: MediaItem) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      description: item.description || '',
      category: item.category || '',
      imageUrl: item.imageUrl,
      isActive: item.isActive,
    })
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  try {
    const payload = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      imageUrl: formData.imageUrl, // already from Cloudinary
      isActive: formData.isActive,
    }

    if (!payload.imageUrl) {
      setError('Please upload an image first')
      return
    }

    if (editingItem) {
      await mediaAPI.update(editingItem.id, payload)
      setSuccessMessage('Gallery item updated successfully')
    } else {
      await mediaAPI.create(payload)
      setSuccessMessage('Gallery item created successfully')
    }

    setShowForm(false)
    setEditingItem(null)
    resetForm()
    fetchGallery()
  } catch (err: any) {
    setError(err.message || 'Failed to save gallery item')
  }
}


 async () => {
    if (!selectedItem) return
    try {
      await mediaAPI.toggle(selectedItem.id)
      setGallery(
        gallery.map((g) =>
          g.id === selectedItem.id ? { ...g, isActive: !g.isActive } : g
        )
      )
      setShowModal(false)
      setSelectedItem(null)
      setSuccessMessage(`Gallery item ${!selectedItem.isActive ? 'activated' : 'deactivated'} successfully`)
    } catch (err: any) {
      setError(err.message || 'Failed to update visibility')
    }
  }

  if (loading)
    return (
      <div className="d-flex align-items-center justify-content-center vh-100 bg-white">
        <div className="text-center">
          <div className="spinner-grow text-primary mb-3" role="status"></div>
          <p className="text-muted fw-medium">Loading gallery...</p>
        </div>
      </div>
    )

  return (
    <div className="admin-management bg-light min-vh-100 py-5">
      <div className="container">
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
          <div>
            <h2 className="fw-black text-dark mb-1">Gallery Management</h2>
            <p className="text-muted mb-0">Manage images and media for your community.</p>
          </div>
          <div className="d-flex gap-2">
            <button
              aria-label="Back to Dashboard"
              className="btn btn-white border shadow-sm d-flex align-items-center gap-2"
              onClick={() => navigate('/admin')}
            >
              <ArrowLeft size={18} /> Dashboard
            </button>
            <button
              aria-label="Add new media"
              className="btn btn-primary shadow-sm d-flex align-items-center gap-2"
              onClick={() => { resetForm(); setEditingItem(null); setShowForm(true) }}
            >
              <Plus size={18} /> Add Media
            </button>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        <Toast
          message={successMessage || ''}
          type="success"
          isVisible={!!successMessage}
          onClose={() => setSuccessMessage(null)}
        />

        {/* Form */}
        {showForm && (
          <div className="card mb-5 shadow-sm rounded-4 overflow-hidden">
            <div className="card-header bg-white py-3 border-bottom">
              <h5 className="mb-0 fw-bold">{editingItem ? '📝 Edit Media' : ' Add New Media'}</h5>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-uppercase">Title *</label>
                    <input
                      type="text"
                      placeholder='Add a title'
                      className="form-control form-control-lg bg-light border-0"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-uppercase">Category</label>
                    <input
                      type="text"
                      placeholder='Enter a category'
                      className="form-control form-control-lg bg-light border-0"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold small text-uppercase">Description</label>
                    <textarea
                      className="form-control bg-light border-0"
                      placeholder='Add a description'
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <div className="col-12">
                    <ImageUpload
                      label="Upload Image"
                      value={formData.imageUrl}
                      onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                    />
                  </div>
                  <div className="col-12">
                    <div className="form-check form-switch p-0 ps-5">
                      <input
                        aria-label="Toggle visibility to public"
                        className="form-check-input"
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      />
                      <label className="form-check-label ms-2">Make visible to public</label>
                    </div>
                  </div>
                </div>
                <div className="d-flex gap-2 mt-4 pt-3 border-top">
                  <button type="submit" aria-label={editingItem ? 'Save changes' : 'Add media'} className="btn btn-primary px-4 py-2 rounded-pill">
                    {editingItem ? 'Save Changes' : 'Add Media'}
                  </button>
                  <button
                    type="button"
                    aria-label="Cancel changes"
                    className="btn btn-light px-4 py-2 rounded-pill"
                    onClick={() => { setShowForm(false); setEditingItem(null); resetForm() }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-white border-bottom">
                <tr className="text-muted small text-uppercase fw-bold">
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {gallery.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-5">
                      <div className="opacity-50 mb-2">🖼️</div>
                      <p className="text-muted">No media added yet.</p>
                    </td>
                  </tr>
                ) : (
                  gallery.map((item) => (
                    <tr key={item.id}>
                      <td className="d-flex align-items-center gap-3">
                        <img src={item.imageUrl} alt={item.title} className="rounded-3" style={{ width: 48, height: 48, objectFit: 'cover' }} />
                        <div>{item.title}</div>
                      </td>
                      <td>{item.category || '--'}</td>
                      <td>
                        <span className={`badge rounded-pill px-3 py-2 ${item.isActive ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'}`}>
                          {item.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="text-end">
                        <div className="d-flex justify-content-end gap-2">
                          <button
                            aria-label={`Edit ${item.title}`}
                            className="btn btn-sm btn-light-primary rounded-circle p-2"
                            onClick={() => openEditForm(item)}
                          >
                            <Edit3 size={16} />
                          </button>

                          <button
                            aria-label={`${item.isActive ? 'Deactivate' : 'Activate'} ${item.title}`}
                            className={`btn btn-sm rounded-circle p-2 ${item.isActive ? 'btn-light-warning' : 'btn-light-success'}`}
                            onClick={() => { setSelectedItem(item); setAction('toggle'); setShowModal(true) }}
                          >
                            <Power size={16} />
                          </button>

                          <button
                            aria-label={`Delete ${item.title}`}
                            className="btn btn-sm btn-light-danger rounded-circle p-2"
                            onClick={() => { setSelectedItem(item); setAction('delete'); setShowModal(true) }}
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
        onClose={() => { setShowModal(false); setSelectedItem(null); setAction(null) }}
        // onConfirm={() => { if(action === 'delete') handleDelete(); else if(action === 'toggle') handleToggle(); }}
        title={action === 'delete' ? 'Confirm Deletion' : 'Update Visibility'}
        message={action === 'delete' ? `Are you sure you want to delete "${selectedItem?.title}"?` : `Do you want to ${selectedItem?.isActive ? 'hide' : 'show'} "${selectedItem?.title}"?`}
      />
    </div>
  )
}

export default MediaManagement
