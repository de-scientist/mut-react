import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { eventsAPI } from '../../services/api'
import ConfirmationModal from '../../components/ConfirmationModal'
import '../../styles/adminForms.css'

interface Event {
  id: string
  title: string
  description?: string
  date: string
  time?: string
  location?: string
  imageUrl?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

const EventsManagement = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [action, setAction] = useState<'delete' | 'toggle' | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    imageUrl: '',
    isActive: true,
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/admin/login')
      return
    }
    fetchEvents()
  }, [navigate])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const response = await eventsAPI.getAll()
      setEvents(response.data || response.items || [])
    } catch (err: any) {
      if (err.status === 401 || err.status === 403) {
        localStorage.removeItem('token')
        navigate('/admin/login')
        return
      }
      setError(err.message || 'Failed to load events')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedEvent) return
    try {
      await eventsAPI.delete(selectedEvent.id)
      setEvents(events.filter((e) => e.id !== selectedEvent.id))
      setShowModal(false)
      setSelectedEvent(null)
    } catch (err: any) {
      setError(err.message || 'Failed to delete event')
    }
  }

  const handleToggleActive = async () => {
    if (!selectedEvent) return
    try {
      await eventsAPI.update(selectedEvent.id, { isActive: !selectedEvent.isActive })
      setEvents(
        events.map((e) => (e.id === selectedEvent.id ? { ...e, isActive: !e.isActive } : e))
      )
      setShowModal(false)
      setSelectedEvent(null)
    } catch (err: any) {
      setError(err.message || 'Failed to update event')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingEvent) {
        await eventsAPI.update(editingEvent.id, formData)
      } else {
        await eventsAPI.create(formData)
      }
      setShowForm(false)
      setEditingEvent(null)
      resetForm()
      fetchEvents()
    } catch (err: any) {
      setError(err.message || 'Failed to save event')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      imageUrl: '',
      isActive: true,
    })
  }

  const openEditForm = (event: Event) => {
    setEditingEvent(event)
    setFormData({
      title: event.title,
      description: event.description || '',
      date: event.date.split('T')[0],
      time: event.time || '',
      location: event.location || '',
      imageUrl: event.imageUrl || '',
      isActive: event.isActive,
    })
    setShowForm(true)
  }

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status"></div>
          <p className="text-muted fw-bold">Loading events...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-management bg-light min-vh-100 py-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold text-dark mb-1">Events Management</h2>
            <p className="text-muted">Manage all events and activities</p>
          </div>
          <div>
            <button
              onClick={() => navigate('/admin')}
              className="btn btn-outline-secondary me-2"
            >
              ← Back to Dashboard
            </button>
            <button onClick={() => { resetForm(); setEditingEvent(null); setShowForm(true) }} className="btn btn-primary">
              + Add Event
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

        {showForm && (
          <div className="card border-0 shadow-sm mb-4 admin-form-container">
            <div className="card-header">
              <h5 className="mb-0">{editingEvent ? 'Edit Event' : 'Create New Event'}</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Title *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Date *</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Time</label>
                    <input
                      type="time"
                      className="form-control"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
                    <label className="form-label">Image URL</label>
                    <input
                      type="url"
                      className="form-control"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
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
                    {editingEvent ? 'Update Event' : 'Create Event'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => { setShowForm(false); setEditingEvent(null); resetForm() }}
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
                    <th>Title</th>
                    <th>Date</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center text-muted py-4">
                        No events found
                      </td>
                    </tr>
                  ) : (
                    events.map((event) => (
                      <tr key={event.id}>
                        <td>{event.title}</td>
                        <td>{new Date(event.date).toLocaleDateString()}</td>
                        <td>{event.location || '-'}</td>
                        <td>
                          <span
                            className={`badge ${event.isActive ? 'bg-success' : 'bg-secondary'}`}
                          >
                            {event.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => openEditForm(event)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-outline-warning"
                              onClick={() => {
                                setSelectedEvent(event)
                                setAction('toggle')
                                setShowModal(true)
                              }}
                            >
                              {event.isActive ? 'Deactivate' : 'Activate'}
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => {
                                setSelectedEvent(event)
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
          setSelectedEvent(null)
          setAction(null)
        }}
        onConfirm={() => {
          if (action === 'delete') handleDelete()
          else if (action === 'toggle') handleToggleActive()
        }}
        title={action === 'delete' ? 'Delete Event' : 'Toggle Event Status'}
        message={
          action === 'delete'
            ? `Are you sure you want to delete "${selectedEvent?.title}"? This action cannot be undone.`
            : `Are you sure you want to ${selectedEvent?.isActive ? 'deactivate' : 'activate'} "${selectedEvent?.title}"?`
        }
      />
    </div>
  )
}

export default EventsManagement

