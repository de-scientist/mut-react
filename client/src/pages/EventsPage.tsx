import { Link } from 'react-router-dom'
import '../assets/mut/css/events.css'

const events = [
  {
    title: 'Prayer Kesha',
    date: 'September 26, 2025',
    time: '7:00 PM - 9:30 PM',
    description: 'Join us for a night of intercession and spiritual revival.',
    image: '/assets/images/church1.jpg',
    delay: 100,
  },
  {
    title: 'Praise Fest',
    date: 'November 7, 2025',
    time: '7:00 PM - 9:30 PM',
    description: 'Celebrate our God through our Music Ministry in a lively evening of praise and worship.',
    image: '/assets/images/Dance1.jpg',
    delay: 200,
  },
  {
    title: 'Creative Night',
    date: 'October 10, 2025',
    time: '8:00 PM - 5:30 AM',
    description:
      'Experience a night full of creativity on the theme Ashes to Beauty though special ministrations and performance by our Creative Arts Ministry (CREAM).',
    image: '/assets/images/final poster.png',
    delay: 300,
  },
]

const EventsPage = () => {
  return (
    <div className="events-page">
      {/* Page Hero Section */}
      <section
        className="page-hero-section d-flex align-items-center text-center text-white"
        style={{ backgroundImage: "url('/assets/images/church2.jpg')" }}
      >
        <div className="hero-overlay" />
        <div className="container position-relative" data-aos="fade-up" data-aos-duration="1000">
          <h1 className="display-3 mb-3">Upcoming Events</h1>
          <p className="lead">Join us for worship, fellowship, and outreach!</p>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-5 events-section bg-light">
        <div className="container">
          <h2 className="section-title text-center">Our Events</h2>
          <p className="text-center lead mb-5">
            Stay connected with MUTCU through our various events, fellowships, and outreach activities throughout the year.
          </p>
          <div className="row justify-content-center">
            {events.map((event, index) => (
              <div key={index} className="col-md-6 col-lg-4 mb-4" data-aos="zoom-in" data-aos-delay={event.delay}>
                <div className="card event-card h-100 shadow-sm">
                  <img src={event.image} className="card-img-top" alt={event.title} />
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
                    <Link to="/contact" className="btn btn-primary btn-sm mt-2">
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
            Want to be notified about upcoming events? Join our newsletter or contact us for more information.
          </p>
          <Link to="/contact" className="btn btn-primary btn-lg me-3">
            Contact Us <i className="fas fa-envelope ms-2" />
          </Link>
          <Link to="/" className="btn btn-secondary btn-lg">
            Subscribe to Newsletter <i className="fas fa-envelope-open-text ms-2" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default EventsPage
