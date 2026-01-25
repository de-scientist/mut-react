import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { eventsAPI } from "../../services/api";
import ConfirmationModal from "../../components/ConfirmationModal";
import ImageUpload from "../../components/ImageUpload";
import Toast from "../../components/Toast";
import {
  Plus,
  ArrowLeft,
  Edit3,
  Trash2,
  Power,
  Calendar,
  MapPin,
  Clock,
} from "lucide-react";
import { Share2, Download } from "lucide-react";
import "../../styles/adminForms.css";

interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  time?: string;
  location?: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const EventsManagement = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [action, setAction] = useState<"delete" | "toggle" | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    imageUrl: "",
    isActive: true,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchEvents();
  }, [navigate]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await eventsAPI.getAll();
      setEvents(response.data || response.items || []);
    } catch (err: any) {
      if (err.status === 401 || err.status === 403) {
        localStorage.removeItem("token");
        navigate("/admin/login");
        return;
      }
      setError(err.message || "Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedEvent) return;
    try {
      await eventsAPI.delete(selectedEvent.id);
      setEvents(events.filter((e) => e.id !== selectedEvent.id));
      setShowModal(false);
      setSelectedEvent(null);
      setSuccessMessage("Event deleted successfully");
    } catch (err: any) {
      setError(err.message || "Failed to delete event");
    }
  };

  const handleToggleActive = async () => {
    if (!selectedEvent) return;
    try {
      await eventsAPI.update(selectedEvent.id, {
        isActive: !selectedEvent.isActive,
      });
      setEvents(
        events.map((e) =>
          e.id === selectedEvent.id ? { ...e, isActive: !e.isActive } : e,
        ),
      );
      setShowModal(false);
      setSelectedEvent(null);
      setSuccessMessage(
        `Event ${!selectedEvent.isActive ? "activated" : "deactivated"} successfully`,
      );
    } catch (err: any) {
      setError(err.message || "Failed to update event");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        await eventsAPI.update(editingEvent.id, formData);
        setSuccessMessage("Event updated successfully");
      } else {
        await eventsAPI.create(formData);
        setSuccessMessage("Event created successfully");
      }
      setShowForm(false);
      setEditingEvent(null);
      resetForm();
      fetchEvents();
    } catch (err: any) {
      setError(err.message || "Failed to save event");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      imageUrl: "",
      isActive: true,
    });
  };

  const openEditForm = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description || "",
      date: event.date.split("T")[0],
      time: event.time || "",
      location: event.location || "",
      imageUrl: event.imageUrl || "",
      isActive: event.isActive,
    });
    setShowForm(true);
  };

  const exportEventsAsCSV = () => {
  if (!events.length) return;

  const headers = [
    "Title",
    "Description",
    "Date",
    "Time",
    "Location",
    "Active",
  ];

  const rows = events.map((e) => [
    e.title,
    e.description || "",
    e.date,
    e.time || "",
    e.location || "",
    e.isActive ? "Yes" : "No",
  ]);

  const csvContent =
    [headers, ...rows].map((row) => row.join(",")).join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "events.csv";
  link.click();

  URL.revokeObjectURL(url);
};

const exportEventsAsJSON = () => {
  const blob = new Blob([JSON.stringify(events, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "events.json";
  link.click();

  URL.revokeObjectURL(url);
};

const shareAllEvents = async () => {
  if (!events.length) {
    setError("No events to share");
    return;
  }

  // Create a shareable message with all events
  const shareText = events
    .map(
      (e) =>
        `${e.title} - ${e.date}${e.time ? ` at ${e.time}` : ""} - ${
          e.location || "No location"
        }`
    )
    .join("\n");

  const shareUrl = `${window.location.origin}/events`;

  try {
    if (navigator.share) {
      await navigator.share({
        title: "Community Events",
        text: shareText,
        url: shareUrl,
      });
    } else {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setSuccessMessage("All events copied to clipboard!");
    }
  } catch {
    setError("Unable to share events");
  }
};

const shareSingleEvent = async (event: Event) => {
  const shareText = `${event.title}
📅 ${new Date(event.date).toLocaleDateString()} ${event.time || ""}
📍 ${event.location || "Location TBA"}

${event.description || ""}`;

  const shareUrl = `${window.location.origin}/events/${event.id}`;

  try {
    if (navigator.share) {
      await navigator.share({
        title: event.title,
        text: shareText,
        url: shareUrl,
      });
    } else {
      await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
      setSuccessMessage("Event link copied to clipboard!");
    }
  } catch {
    setError("Unable to share event");
  }
};


  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100 bg-white">
        <div className="text-center">
          <div className="spinner-grow text-primary mb-3" role="status"></div>
          <p className="text-muted fw-medium">Organizing events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-management bg-light min-vh-100 py-5">
      <div className="container">
        {/* Header Section */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
          <div>
            <h2 className="fw-black text-dark mb-1">Events Management</h2>
            <p className="text-muted mb-0">
              Schedule, update, and manage community activities.
            </p>
          </div>
          <div className="d-flex gap-2">
            <button
              onClick={() => navigate("/admin")}
              className="btn btn-white border shadow-sm d-flex align-items-center gap-2"
              title="Return to Dashboard"
              aria-label="Back to Dashboard"
            >
              <ArrowLeft size={18} /> Dashboard
            </button>
            <button
              onClick={() => {
                resetForm();
                setEditingEvent(null);
                setShowForm(true);
              }}
              className="btn btn-primary shadow-sm d-flex align-items-center gap-2"
              title="Create a new event"
            >
              <Plus size={18} /> Add New Event
            </button>
           <div className="dropdown">
  <button
    className="btn btn-outline-secondary shadow-sm dropdown-toggle"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    <Download size={16} className="me-1" /> Export
  </button>
  <ul className="dropdown-menu">
    <li>
      <button className="dropdown-item" onClick={exportEventsAsCSV}>
        Export as CSV
      </button>
    </li>
    <li>
      <button className="dropdown-item" onClick={exportEventsAsJSON}>
        Export as JSON
      </button>
    </li>    
  </ul>
  <button className="dropdown-item" onClick={shareAllEvents}>
        Share All Events
      </button>
</div>



          </div>
        </div>

        {error && (
          <div
            className="alert alert-danger border-0 shadow-sm alert-dismissible fade show"
            role="alert"
          >
            <div className="d-flex align-items-center gap-2">
              <span>{error}</span>
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={() => setError(null)}
              aria-label="Dismiss error"
            ></button>
          </div>
        )}

        <Toast
          message={successMessage || ""}
          type="success"
          isVisible={!!successMessage}
          onClose={() => setSuccessMessage(null)}
        />

        {/* Form Section */}
        {showForm && (
          <div className="card border-0 shadow-lg mb-5 rounded-4 overflow-hidden animate-fade-in">
            <div className="card-header bg-white py-3 border-bottom">
              <h5 className="mb-0 fw-bold">
                {editingEvent ? "📝 Edit Event" : "✨ Create New Event"}
              </h5>
            </div>
            <div className="card-body p-4">
              <form className="admin-event-form" onSubmit={handleSubmit}>
                <div className="row g-4">
                  <div className="col-md-6">
                    <label
                      htmlFor="eventTitle"
                      className="form-label fw-bold small text-uppercase"
                    >
                      Title *
                    </label>
                    <input
                      id="eventTitle"
                      type="text"
                      className="form-control form-control-lg bg-light border-0"
                      placeholder="Enter event title"
                      title="Event Title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="eventDate"
                      className="form-label fw-bold small text-uppercase"
                    >
                      Date *
                    </label>
                    <input
                      id="eventDate"
                      type="date"
                      className="form-control form-control-lg bg-light border-0"
                      title="Event Date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="eventTime"
                      className="form-label fw-bold small text-uppercase"
                    >
                      Time
                    </label>
                    <input
                      id="eventTime"
                      type="time"
                      className="form-control form-control-lg bg-light border-0"
                      title="Event Time"
                      value={formData.time}
                      onChange={(e) =>
                        setFormData({ ...formData, time: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="eventLocation"
                      className="form-label fw-bold small text-uppercase"
                    >
                      Location
                    </label>
                    <input
                      id="eventLocation"
                      type="text"
                      className="form-control form-control-lg bg-light border-0"
                      placeholder="Physical address or online link"
                      title="Event Location"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-12">
                    <label
                      htmlFor="eventDesc"
                      className="form-label fw-bold small text-uppercase"
                    >
                      Description
                    </label>
                    <textarea
                      id="eventDesc"
                      className="form-control bg-light border-0"
                      rows={3}
                      placeholder="Tell us more about the event..."
                      title="Event Description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-12">
                    <ImageUpload
                      label="Event Banner"
                      value={formData.imageUrl}
                      onChange={(imageUrl) =>
                        setFormData({ ...formData, imageUrl })
                      }
                    />
                  </div>
                  <div className="col-12">
                    <div className="form-check form-switch p-0 ps-5">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckChecked"
                        checked={formData.isActive}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isActive: e.target.checked,
                          })
                        }
                      />
                      <label
                        className="form-check-label fw-medium ms-2"
                        htmlFor="flexSwitchCheckChecked"
                      >
                        Make this event visible to public
                      </label>
                    </div>
                  </div>
                </div>
                <div className="d-flex gap-2 mt-4 pt-3 border-top">
                  <button
                    type="submit"
                    className="btn btn-primary px-4 py-2 rounded-pill shadow-sm"
                    title="Save changes"
                  >
                    {editingEvent ? "Save Changes" : "Publish Event"}
                  </button>
                  

                  <button
                    type="button"
                    className="btn btn-light px-4 py-2 rounded-pill"
                    onClick={() => {
                      setShowForm(false);
                      setEditingEvent(null);
                      resetForm();
                    }}
                    title="Discard changes"
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
                  <th className="px-4 py-3">Event Details</th>
                  <th className="py-3">Schedule</th>
                  <th className="py-3">Status</th>
                  <th className="px-4 py-3 text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-5">
                      <div className="opacity-50 mb-2">📅</div>
                      <p className="text-muted">No events planned yet.</p>
                    </td>
                  </tr>
                ) : (
                  events.map((event) => (
                    <tr key={event.id}>
                      <td className="px-4">
                        <div className="d-flex align-items-center gap-3">
                          {event.imageUrl ? (
                            <img
                              src={event.imageUrl}
                              alt={event.title}
                              className="rounded-3"
                              style={{
                                width: "48px",
                                height: "48px",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <div
                              className="bg-light rounded-3 d-flex align-items-center justify-content-center"
                              style={{ width: "48px", height: "48px" }}
                            >
                              ✨
                            </div>
                          )}
                          <div>
                            <div className="fw-bold text-dark">
                              {event.title}
                            </div>
                            <div className="small text-muted d-flex align-items-center gap-1">
                              <MapPin size={12} />{" "}
                              {event.location || "No location set"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="small fw-medium text-dark d-flex align-items-center gap-1">
                          <Calendar size={14} className="text-primary" />{" "}
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="small text-muted d-flex align-items-center gap-1">
                          <Clock size={14} /> {event.time || "--:--"}
                        </div>
                      </td>
                      <td>
                        <span
                          className={`badge rounded-pill px-3 py-2 ${event.isActive ? "bg-success-subtle text-success" : "bg-secondary-subtle text-secondary"}`}
                        >
                          {event.isActive ? "• Active" : "• Inactive"}
                        </span>
                      </td>
                      <td className="px-4 text-end">
  <div className="d-flex justify-content-end gap-2">

    {/* NEW SHARE BUTTON */}
    <button
      className="btn btn-sm btn-light rounded-circle p-2"
      onClick={() => shareSingleEvent(event)}
      title="Share Event"
    >
      <Share2 size={16} />
    </button>

    <button
    title="edit"
      className="btn btn-sm btn-light-primary rounded-circle p-2"
      onClick={() => openEditForm(event)}
    >
      <Edit3 size={16} />
    </button>

    <button
    title={event.isActive ? "Deactivate Event" : "Activate Event"}
      className={`btn btn-sm rounded-circle p-2 ${
        event.isActive ? "btn-light-warning" : "btn-light-success"
      }`}
      onClick={() => {
        setSelectedEvent(event);
        setAction("toggle");
        setShowModal(true);
      }}
    >
      <Power size={16} />
    </button>

    <button
    title="delete"
      className="btn btn-sm btn-light-danger rounded-circle p-2"
      onClick={() => {
        setSelectedEvent(event);
        setAction("delete");
        setShowModal(true);
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
          setShowModal(false);
          setSelectedEvent(null);
          setAction(null);
        }}
        onConfirm={() => {
          if (action === "delete") handleDelete();
          else if (action === "toggle") handleToggleActive();
        }}
        title={action === "delete" ? "Confirm Deletion" : "Update Visibility"}
        message={
          action === "delete"
            ? `Are you absolutely sure you want to delete "${selectedEvent?.title}"? This cannot be undone.`
            : `Do you want to ${selectedEvent?.isActive ? "hide" : "show"} "${selectedEvent?.title}" to the public?`
        }
        confirmText={action === "delete" ? "Delete" : "Update"}
        cancelText="Cancel"
        confirmButtonClass={action === "delete" ? "btn-danger" : "btn-warning"}
      />
    </div>
  );
};

export default EventsManagement;
