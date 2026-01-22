import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { eventsAPI } from "../services/api";
import "../assets/mut/css/events.css";

// OLD HARDCODED EVENTS - Kept for reference and fallback if API fails
// const legacyEvents = [
//   {
//     title: 'Prayer Kesha',
//     date: 'September 26, 2025',
//     time: '7:00 PM - 9:30 PM',
//     description: 'Join us for a night of intercession and spiritual revival.',
//     image: '/assets/images/church1.jpg',
//     delay: 100,
//   },
//   {
//     title: 'Praise Fest',
//     date: 'November 7, 2025',
//     time: '7:00 PM - 9:30 PM',
//     description: 'Celebrate our God through our Music Ministry in a lively evening of praise and worship.',
//     image: '/assets/images/Dance1.jpg',
//     delay: 200,
//   },
//   {
//     title: 'Creative Night',
//     date: 'October 10, 2025',
//     time: '8:00 PM - 5:30 AM',
//     description:
//       'Experience a night full of creativity on the theme Ashes to Beauty though special ministrations and performance by our Creative Arts Ministry (CREAM).',
//     image: '/assets/images/final poster.png',
//     delay: 300,
//   },
// ]

// Fallback events (same format as API, used if fetch fails)
const fallbackEvents = [
  {
    id: "fallback-1",
    title: "Prayer Kesha",
    date: "September 26, 2025",
    time: "7:00 PM - 9:30 PM",
    description: "Join us for a night of intercession and spiritual revival.",
    imageUrl: "/assets/images/church1.jpg",
    isActive: true,
    location: "Main Sanctuary",
  },
  {
    id: "fallback-2",
    title: "Praise Fest",
    date: "November 7, 2025",
    time: "7:00 PM - 9:30 PM",
    description:
      "Celebrate our God through our Music Ministry in a lively evening of praise and worship.",
    imageUrl: "/assets/images/Dance1.jpg",
    isActive: true,
    location: "Auditorium",
  },
  {
    id: "fallback-3",
    title: "Creative Night",
    date: "October 10, 2025",
    time: "8:00 PM - 5:30 AM",
    description:
      "Experience a night full of creativity on the theme Ashes to Beauty though special ministrations and performance by our Creative Arts Ministry (CREAM).",
    imageUrl: "/assets/images/final poster.png",
    isActive: true,
    location: "Creative Hall",
  },
];

interface EventItem {
  id: string;
  title: string;
  description?: string;
  date: string;
  time?: string;
  location?: string;
  imageUrl?: string;
  isActive: boolean;
}

const EventsPage = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActiveEvents = async () => {
      try {
        setLoading(true);
        const res = await eventsAPI.getAll({ active: "true" });
        const items = res.data || res.items || [];
        if (items.length === 0) {
          setEvents(fallbackEvents);
          setError("Showing fallback events while we update the schedule.");
        } else {
          setEvents(items);
          setError(null);
        }
      } catch (err: any) {
        setError(
          err.message || "Failed to load events; showing fallback list.",
        );
        setEvents(fallbackEvents);
      } finally {
        setLoading(false);
      }
    };
    fetchActiveEvents();
  }, []);

  return (
    <div className="events-page">
      {/* Page Hero Section */}
      <section
        className="page-hero-section d-flex align-items-center text-center text-white"
        style={{ backgroundImage: "url('/assets/images/church2.jpg')" }}
      >
        <div className="hero-overlay" />
        <div
          className="container position-relative"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h1 className="display-3 mb-3">Upcoming Events</h1>
          <p className="lead">Join us for worship, fellowship, and outreach!</p>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-5 events-section bg-light">
        <div className="container">
          <h2 className="section-title text-center">Our Events</h2>
          <p className="text-center lead mb-5">
            Stay connected with MUTCU through our various events, fellowships,
            and outreach activities throughout the year.
          </p>
          <div className="row justify-content-center">
            {loading && (
              <div className="col-12 text-center py-5">
                <div
                  className="spinner-border text-primary mb-3"
                  role="status"
                ></div>
                <p className="text-muted">Loading upcoming events...</p>
              </div>
            )}
            {!loading && error && (
              <div className="col-12">
                <div className="alert alert-warning" role="alert">
                  {error}
                </div>
              </div>
            )}
            {!loading && events.length === 0 && !error && (
              <div className="col-12 text-center py-5">
                <div className="opacity-50 mb-2">📅</div>
                <p className="text-muted">
                  No upcoming events at the moment. Check back soon!
                </p>
              </div>
            )}
            {!loading &&
              events.length > 0 &&
              events.map((event, index) => (
                <div
                  key={event.id}
                  className="col-md-6 col-lg-4 mb-4"
                  data-aos="zoom-in"
                  data-aos-delay={(index + 1) * 100}
                >
                  <div className="card event-card h-100 shadow-sm">
                    {event.imageUrl ? (
                      <img
                        src={event.imageUrl}
                        className="card-img-top"
                        alt={event.title}
                      />
                    ) : (
                      <div
                        className="card-img-top bg-light d-flex align-items-center justify-content-center"
                        style={{ height: "200px" }}
                      >
                        ✨
                      </div>
                    )}
                    <div className="card-body">
                      <h4 className="card-title">{event.title}</h4>
                      <p className="card-text">
                        <i className="far fa-calendar-alt me-2" />
                        <strong>Date:</strong> {event.date}
                      </p>
                      <p className="card-text">
                        <i className="far fa-clock me-2" />
                        <strong>Time:</strong> {event.time}
                      </p>
                      <p className="card-text">{event.description}</p>
                      <Link
                        to="/contact"
                        className="btn btn-primary btn-sm mt-2"
                      >
                        Details &amp; RSVP
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-5 cta-section text-white">
        <div className="container text-center" data-aos="zoom-in">
          <h2 className="section-title text-white">Stay Connected</h2>
          <p className="lead mb-4 text-white-50">
            Want to be notified about upcoming events? Join our newsletter or
            contact us for more information.
          </p>
          <Link to="/contact" className="btn btn-primary btn-lg me-3">
            Contact Us <i className="fas fa-envelope ms-2" />
          </Link>
          <Link to="/" className="btn btn-secondary btn-lg">
            Subscribe to Newsletter{" "}
            <i className="fas fa-envelope-open-text ms-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;
