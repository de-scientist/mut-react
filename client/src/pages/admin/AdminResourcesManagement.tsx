import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { resourcesAPI } from '../../services/api'
import ConfirmationModal from '../../components/ConfirmationModal'
import ImageUpload from '../../components/ImageUpload'
import Toast from '../../components/Toast'
import {
  Plus,
  ArrowLeft,
  Edit3,
  Trash2,
  Power,
  Link as LinkIcon,
  FileText,
} from 'lucide-react'
import '../../styles/adminForms.css'

interface Resource {
  id: string
  title: string
  description?: string
  url?: string
  type?: string
  imageUrl?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

const AdminResourcesManagement = () => {
  const navigate = useNavigate()

  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const [showForm, setShowForm] = useState(false)
  const [editingResource, setEditingResource] = useState<Resource | null>(null)

  const [showModal, setShowModal] = useState(false)
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
  const [action, setAction] = useState<'delete' | 'toggle' | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    type: 'PDF',
    imageUrl: '',
    isActive: true,
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/admin/login')
      return
    }
    fetchResources()
  }, [navigate])

  const fetchResources = async () => {
    try {
      setLoading(true)
      const res = await resourcesAPI.adminGetAll()
      setResources(res.data || res.items || [])
    } catch (err: any) {
      if (err.status === 401 || err.status === 403) {
        localStorage.removeItem('token')
        navigate('/admin/login')
        return
      }
      setError(err.message || 'Failed to load resources')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      url: '',
      type: 'PDF',
      imageUrl: '',
      isActive: true,
    })
  }

  const openEditForm = (resource: Resource) => {
    setEditingResource(resource)
    setFormData({
      title: resource.title,
      description: resource.description || '',
      url: resource.url || '',
      type: resource.type || 'PDF',
      imageUrl: resource.imageUrl || '',
      isActive: resource.isActive,
    })
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingResource) {
        await resourcesAPI.update(editingResource.id, formData)
        setSuccessMessage('Resource updated successfully')
      } else {
        await resourcesAPI.create(formData)
        setSuccessMessage('Resource created successfully')
      }
      setShowForm(false)
      setEditingResource(null)
      resetForm()
      fetchResources()
    } catch (err: any) {
      setError(err.message || 'Failed to save resource')
    }
  }

  const handleDelete = async () => {
    if (!selectedResource) return
    try {
      await resourcesAPI.delete(selectedResource.id)
      setResources(resources.filter(r => r.id !== selectedResource.id))
      setSuccessMessage('Resource deleted successfully')
    } catch (err: any) {
      setError(err.message || 'Failed to delete resource')
    } finally {
      setShowModal(false)
      setSelectedResource(null)
      setAction(null)
    }
  }

  const handleToggle = async () => {
    if (!selectedResource) return
    try {
      await resourcesAPI.toggle(selectedResource.id)
      setResources(
        resources.map(r =>
          r.id === selectedResource.id
            ? { ...r, isActive: !r.isActive }
            : r
        )
      )
      setSuccessMessage(
        `Resource ${selectedResource.isActive ? 'hidden' : 'published'} successfully`
      )
    } catch (err: any) {
      setError(err.message || 'Failed to update resource')
    } finally {
      setShowModal(false)
      setSelectedResource(null)
      setAction(null)
    }
  }

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100 bg-white">
        <div className="text-center">
          <div className="spinner-grow text-primary mb-3"></div>
          <p className="text-muted fw-medium">Loading resources…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-management bg-light min-vh-100 py-5">
      <div className="container">

        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
          <div>
            <h2 className="fw-black mb-1">Resources Management</h2>
            <p className="text-muted mb-0">
              Manage sermons, devotionals, documents, and downloads.
            </p>
          </div>
          <div className="d-flex gap-2">
            <button
              onClick={() => navigate('/admin')}
              className="btn btn-white border shadow-sm d-flex align-items-center gap-2"
            >
              <ArrowLeft size={18} /> Dashboard
            </button>
            <button
              onClick={() => {
                resetForm()
                setEditingResource(null)
                setShowForm(true)
              }}
              className="btn btn-primary shadow-sm d-flex align-items-center gap-2"
            >
              <Plus size={18} /> Add Resource
            </button>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger shadow-sm">
            {error}
          </div>
        )}

        <Toast
          message={successMessage || ''}
          type="success"
          isVisible={!!successMessage}
          onClose={() => setSuccessMessage(null)}
        />

        {/* Form */}
        {showForm && (
          <div className="card border-0 shadow-lg mb-5 rounded-4">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4">
                {editingResource ? 'Edit Resource' : 'Create Resource'}
              </h5>

              <form onSubmit={handleSubmit}>
                <div className="row g-4">

                  <div className="col-md-6">
                    <label className="form-label fw-bold">Title *</label>
                    <input
                      className="form-control form-control-lg bg-light border-0"
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold">Resource Type</label>
                    <select
                      className="form-select form-select-lg bg-light border-0"
                      value={formData.type}
                      onChange={e => setFormData({ ...formData, type: e.target.value })}
                    >
                      <option value="PDF">PDF</option>
                      <option value="AUDIO">Audio</option>
                      <option value="VIDEO">Video</option>
                      <option value="LINK">External Link</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-bold">Description</label>
                    <textarea
                      className="form-control bg-light border-0"
                      rows={3}
                      value={formData.description}
                      onChange={e =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-bold">Resource URL</label>
                    <input
                      className="form-control bg-light border-0"
                      value={formData.url}
                      onChange={e => setFormData({ ...formData, url: e.target.value })}
                    />
                  </div>

                  <div className="col-12">
                    <ImageUpload
                      label="Thumbnail Image"
                      value={formData.imageUrl}
                      onChange={imageUrl =>
                        setFormData({ ...formData, imageUrl })
                      }
                    />
                  </div>

                  <div className="col-12">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={e =>
                          setFormData({ ...formData, isActive: e.target.checked })
                        }
                      />
                      <label className="form-check-label ms-2">
                        Visible to public
                      </label>
                    </div>
                  </div>

                </div>

                <div className="mt-4 d-flex gap-2">
                  <button className="btn btn-primary px-4 rounded-pill">
                    {editingResource ? 'Save Changes' : 'Publish Resource'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-light px-4 rounded-pill"
                    onClick={() => {
                      setShowForm(false)
                      setEditingResource(null)
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

        {/* Table */}
        <div className="card border-0 shadow-sm rounded-4">
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead className="bg-white border-bottom">
                <tr className="text-uppercase small fw-bold text-muted">
                  <th className="px-4">Resource</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th className="px-4 text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {resources.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-5 text-muted">
                      No resources added yet.
                    </td>
                  </tr>
                ) : (
                  resources.map(resource => (
                    <tr key={resource.id}>
                      <td className="px-4">
                        <div className="fw-bold">{resource.title}</div>
                        <small className="text-muted">
                          {resource.url ? (
                            <span className="d-flex align-items-center gap-1">
                              <LinkIcon size={12} /> Link attached
                            </span>
                          ) : (
                            'No file'
                          )}
                        </small>
                      </td>
                      <td>
                        <span className="badge bg-light text-dark">
                          {resource.type}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            resource.isActive
                              ? 'bg-success-subtle text-success'
                              : 'bg-secondary-subtle text-secondary'
                          }`}
                        >
                          {resource.isActive ? 'Active' : 'Hidden'}
                        </span>
                      </td>
                      <td className="px-4 text-end">
                        <div className="d-flex justify-content-end gap-2">
                          <button
                            className="btn btn-sm btn-light-primary rounded-circle"
                            onClick={() => openEditForm(resource)}
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            className="btn btn-sm btn-light-warning rounded-circle"
                            onClick={() => {
                              setSelectedResource(resource)
                              setAction('toggle')
                              setShowModal(true)
                            }}
                          >
                            <Power size={16} />
                          </button>
                          <button
                            className="btn btn-sm btn-light-danger rounded-circle"
                            onClick={() => {
                              setSelectedResource(resource)
                              setAction('delete')
                              setShowModal(true)
                            }}
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
          setSelectedResource(null)
          setAction(null)
        }}
        onConfirm={action === 'delete' ? handleDelete : handleToggle}
        title={action === 'delete' ? 'Delete Resource' : 'Change Visibility'}
        message={
          action === 'delete'
            ? `Delete "${selectedResource?.title}" permanently?`
            : `Make "${selectedResource?.title}" ${
                selectedResource?.isActive ? 'hidden' : 'visible'
              } to the public?`
        }
      />
    </div>
  )
}

export default AdminResourcesManagement
