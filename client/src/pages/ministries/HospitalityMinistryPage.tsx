import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useTimedSuccess } from "../../hooks/useTimedSuccess";
import "../../assets/mut/css/hospitality.css";

const HospitalityMinistryPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [areaOfInterest, setAreaOfInterest] = useState("");
  const [experience, setExperience] = useState("");
  const { visible: showSuccess, trigger: showSuccessMessage } =
    useTimedSuccess(5000);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !areaOfInterest) return;

    console.log("Hospitality Ministry Join Interest:", {
      fullName,
      email,
      areaOfInterest,
      experience,
    });

    setFullName("");
    setEmail("");
    setAreaOfInterest("");
    setExperience("");
    showSuccessMessage();
  };

  return (
    <div className="hospitality-ministry-page">
      {/* Hero */}
      <section
        className="page-hero-section"
        style={{ backgroundImage: "url('/assets/images/tlp.jpg')" }}
        data-aos="fade-in"
      >
        <div className="hero-overlay" />
        <div className="container">
          <h1 data-aos="fade-up">MUTCU Hospitality Ministry</h1>
          <p className="lead" data-aos="fade-up" data-aos-delay="100">
            Serving with Love and Warmth
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="ministry-intro-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 text-center mb-4 mb-lg-0">
              <img
                src="/assets/images/Waci.jpg"
                alt="Waci"
                className="img-fluid rounded-circle"
                data-aos="zoom-in"
              />
              <h3 className="mt-3">Waci</h3>
              <p className="text-muted">Hospitality Coordinator</p>
            </div>
            <div className="col-lg-7">
              <h2 className="section-title" data-aos="fade-right">
                About the Hospitality Ministry
              </h2>
              <p data-aos="fade-right" data-aos-delay="100">
                The Hospitality Ministry focuses on creating a welcoming
                environment for all MUTCU members and visitors. It includes the
                Kitchen Ministry and works to foster fellowship through service.
              </p>
              <p data-aos="fade-right" data-aos-delay="200">
                The ministry oversees Kitchen Ministry, Guest Relations, and
                Event Catering, ensuring food safety, resource management, and a
                spirit of generosity and care in all activities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Teams */}
      <section className="sub-ministries-section">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">
            Our Hospitality Teams
          </h2>
          <p
            className="lead text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Explore the teams that bring warmth to our community.
          </p>
          <div className="row">
            {/* Kitchen Ministry */}
            <div
              className="col-md-6 col-lg-3 mb-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="sub-ministry-card">
                <div className="card-body text-center">
                  <i className="fas fa-utensils choir-icon mb-3" />
                  <h4 className="card-title">Kitchen Ministry</h4>
                  <p className="card-text">
                    Prepares meals and manages food services for events.
                  </p>
                  <h6>Activities</h6>
                  <ul>
                    <li>Meal preparation and serving</li>
                    <li>Food safety and hygiene training</li>
                    <li>Resource inventory management</li>
                  </ul>
                  <p className="text-muted">
                    <i className="fas fa-clock me-2" /> Meets before major
                    events
                  </p>
                </div>
              </div>
            </div>

            {/* Guest Relations */}
            <div
              className="col-md-6 col-lg-3 mb-4"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="sub-ministry-card">
                <div className="card-body text-center">
                  <i className="fas fa-handshake band-icon mb-3" />
                  <h4 className="card-title">Guest Relations</h4>
                  <p className="card-text">
                    Welcomes and supports visitors and new members.
                  </p>
                  <h6>Activities</h6>
                  <ul>
                    <li>Greeting and orientation</li>
                    <li>Assisting with event logistics</li>
                    <li>Follow-up with visitors</li>
                  </ul>
                  <p className="text-muted">
                    <i className="fas fa-clock me-2" /> All services and events
                  </p>
                </div>
              </div>
            </div>

            {/* Event Catering */}
            <div
              className="col-md-6 col-lg-3 mb-4"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="sub-ministry-card">
                <div className="card-body text-center">
                  <i className="fas fa-concierge-bell praise-icon mb-3" />
                  <h4 className="card-title">Event Catering</h4>
                  <p className="card-text">
                    Coordinates food and refreshments for gatherings.
                  </p>
                  <h6>Activities</h6>
                  <ul>
                    <li>Planning menus and catering</li>
                    <li>Setup and cleanup</li>
                    <li>Budget management</li>
                  </ul>
                  <p className="text-muted">
                    <i className="fas fa-clock me-2" /> During scheduled events
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="key-events-section">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">
            Featured Events
          </h2>
          <p
            className="lead text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Join us for hospitality-focused events.
          </p>
          <div className="row">
            <div
              className="col-md-4 mb-4"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <div className="event-highlight-card">
                <div className="card-body text-center">
                  <i className="fas fa-utensils event-icon" />
                  <h5 className="card-title">Hospitality Day</h5>
                  <p className="card-text">
                    A day of fellowship and catering training.
                  </p>
                  <p className="text-muted">
                    <i className="fas fa-calendar-alt me-2" /> 19th October 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="leadership-spotlight-section">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">
            Ministry Leadership
          </h2>
          <p
            className="lead text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Led by compassionate leaders, our ministry shines.
          </p>
          <div className="row justify-content-center">
            <div className="col-md-4 col-lg-3 mb-4" data-aos="zoom-in">
              <div className="executive-member-card">
                <img
                  src="/assets/images/Waci.jpg"
                  alt="Waci"
                  className="img-fluid rounded-circle mb-2 border-orange"
                />
                <h5 className="member-name">Waci</h5>
                <p className="member-role">Hospitality Coordinator</p>
                <button className="btn btn-outline-light btn-sm" type="button">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="cta-section">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">
            Join Our Hospitality Ministry!
          </h2>
          <p
            className="lead text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            If you love serving and creating a welcoming environment, join us!
          </p>
          <div className="row justify-content-center">
            <div className="col-md-8" data-aos="fade-up" data-aos-delay="200">
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    placeholder="Please enter your full name."
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Your Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Please enter a valid university email address."
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="areaOfInterest" className="form-label">
                    Area of Interest
                  </label>
                  <select
                    className="form-select"
                    id="areaOfInterest"
                    required
                    value={areaOfInterest}
                    onChange={(e) => setAreaOfInterest(e.target.value)}
                  >
                    <option value="" disabled>
                      Select an area
                    </option>
                    <option>Kitchen Ministry</option>
                    <option>Guest Relations</option>
                    <option>Event Catering</option>
                    <option>General Interest</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="experience" className="form-label">
                    Tell us about your experience or passion (Optional)
                  </label>
                  <textarea
                    className="form-control"
                    id="experience"
                    rows={3}
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Submit Interest
                </button>
              </form>
              {showSuccess && (
                <div className="mt-3 text-success animate-pop-in">
                  Thank you for your interest in the Hospitality Ministry!
                  We&apos;ll get in touch with you soon.
                </div>
              )}
            </div>
          </div>
          <div className="row mt-4 justify-content-center">
            <div
              className="col-md-4 text-center"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <Link to="/ministries" className="btn btn-primary">
                Join a Team
              </Link>
            </div>
            <div
              className="col-md-4 text-center"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <Link to="/events" className="btn btn-secondary">
                View Hospitality Events
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="sub-ministries-section">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">
            Ministry in Action
          </h2>
          <div className="row">
            <div className="col-md-3 mb-4" data-aos="zoom-in">
              <img
                src="/assets/images/kitchen-prep.jpg"
                alt="Kitchen Prep"
                className="img-fluid rounded"
              />
              <p className="text-center mt-2">Kitchen Ministry at Work</p>
            </div>
            <div
              className="col-md-3 mb-4"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <img
                src="/assets/images/guest-welcome.jfif"
                alt="Guest Welcome"
                className="img-fluid rounded"
              />
              <p className="text-center mt-2">Guest Relations Team</p>
            </div>
            <div
              className="col-md-3 mb-4"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <img
                src="/assets/images/event-catering.jfif"
                alt="Event Catering"
                className="img-fluid rounded"
              />
              <p className="text-center mt-2">Event Catering Setup</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HospitalityMinistryPage;
