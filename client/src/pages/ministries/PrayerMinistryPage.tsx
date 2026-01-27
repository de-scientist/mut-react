import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { prayerAPI } from "../../services/api";
import { useTimedSuccess } from "../../hooks/useTimedSuccess";
import "../../assets/mut/css/prayer.css";

const PrayerMinistryPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [areaOfInterest, setAreaOfInterest] = useState("");
  const [experience, setExperience] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { visible: showSuccess, trigger: showSuccessMessage } =
    useTimedSuccess(5000);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !areaOfInterest) {
      setError("Please fill in your name, email, and area of interest.");
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      await prayerAPI.submit({
        name: fullName,
        request: `Join Prayer Ministry - Area: ${areaOfInterest}. Experience: ${experience || "N/A"}. Email: ${email}`,
        isPublic: false,
      });

      setFullName("");
      setEmail("");
      setAreaOfInterest("");
      setExperience("");
      showSuccessMessage();
    } catch (apiError: any) {
      const message = apiError?.message || "Unable to submit right now. Please try again.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="prayer-ministry-page">
      {/* Hero */}
      <section
        className="page-hero-section"
        style={{ backgroundImage: "url('/assets/images/prayer1.jpg')" }}
        data-aos="fade-in"
      >
        <div className="hero-overlay" />
        <div className="container">
          <h1 data-aos="fade-up">MUTCU Prayer Ministry</h1>
          <p className="lead" data-aos="fade-up" data-aos-delay="100">
            Fostering a Culture of Intercession and Spiritual Dependence
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="ministry-intro-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <h2 className="section-title" data-aos="fade-right">
                About the Prayer Ministry
              </h2>
              <div data-aos="fade-right" data-aos-delay="100">
                <h5 className="text-secondary mb-3">Mandate</h5>
                <p>
                  To mobilize and lead the Christian Union in consistent, fervent, and effective prayer.
                </p>
              </div>
              <div data-aos="fade-right" data-aos-delay="200">
                <h5 className="text-secondary mb-3">Our Mission</h5>
                <p>
                  The Prayer Ministry is the spiritual engine of MUTCU, dedicated to cultivating a deep culture of prayer and intercession among members. We believe that prayer is foundational to all ministry and that consistent, fervent intercession is key to spiritual breakthroughs and fulfilling the Union&apos;s vision and mission.
                </p>
              </div>
              <div data-aos="fade-right" data-aos-delay="300">
                <h5 className="text-secondary mb-3">Our Focus</h5>
                <ul>
                  <li>Planning and coordinating all corporate prayer meetings</li>
                  <li>Organizing prayer weeks, fasts, and special prayer events</li>
                  <li>Identifying and communicating key prayer points for the CU</li>
                  <li>Building accountability and personal prayer disciplines among members</li>
                  <li>Mobilizing year-based prayer coordinators to lead within their groups</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-5 text-center mb-4 mb-lg-0">
              <img
                src="/assets/images/MARTHA.jpeg"
                alt="Prayer Coordinator"
                className="img-fluid rounded-circle"
                data-aos="zoom-in"
              />
              <h3 className="mt-3">Prayer Coordinator</h3>
              <p className="text-muted">
                Leads our Prayer Ministry with spiritual oversight
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prayer gatherings */}
      <section className="sub-ministries-section">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">
            Our Prayer Gatherings &amp; Programs
          </h2>
          <p
            className="lead text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            The Prayer Ministry facilitates multiple opportunities for corporate and personal prayer throughout the spiritual year.
          </p>
          <div className="row">
            <div
              className="col-md-6 col-lg-4 mb-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="sub-ministry-card">
                <div className="card-body">
                  <i className="fas fa-sun choir-icon mb-3" />
                  <h4 className="card-title">Corporate Prayer Meetings</h4>
                  <p className="card-text">
                    Regular gatherings for united intercession and petition.
                  </p>
                  <h6>Activities</h6>
                  <ul>
                    <li>Daily prayer meetings</li>
                    <li>Guided intercession</li>
                    <li>Scripture reading and worship</li>
                  </ul>
                  <p className="text-muted small">
                    <i className="fas fa-calendar-alt me-2" /> Regular schedule
                  </p>
                </div>
              </div>
            </div>

            <div
              className="col-md-6 col-lg-4 mb-4"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="sub-ministry-card">
                <div className="card-body">
                  <i className="fas fa-ban band-icon mb-3" />
                  <h4 className="card-title">Prayer Weeks &amp; Fasts</h4>
                  <p className="card-text">
                    Intensive periods of prayer, fasting, and intercession.
                  </p>
                  <h6>Activities</h6>
                  <ul>
                    <li>Special prayer weeks</li>
                    <li>Corporate fasting</li>
                    <li>Intensive intercession periods</li>
                  </ul>
                  <p className="text-muted small">
                    <i className="fas fa-calendar-alt me-2" /> Scheduled throughout the year
                  </p>
                </div>
              </div>
            </div>

            <div
              className="col-md-6 col-lg-4 mb-4"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="sub-ministry-card">
                <div className="card-body">
                  <i className="fas fa-mountain praise-icon mb-3" />
                  <h4 className="card-title">Prayer Retreats &amp; Keshas</h4>
                  <p className="card-text">
                    Extended prayer events and all-night intercession sessions.
                  </p>
                  <h6>Activities</h6>
                  <ul>
                    <li>Off-campus prayer retreats</li>
                    <li>All-night prayer keshas</li>
                    <li>Deep intercession and worship</li>
                  </ul>
                  <p className="text-muted small">
                    <i className="fas fa-calendar-alt me-2" /> As scheduled
                  </p>
                </div>
              </div>
            </div>

            <div
              className="col-md-6 col-lg-4 mb-4"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="sub-ministry-card">
                <div className="card-body">
                  <i className="fas fa-hands-praying band-icon mb-3" />
                  <h4 className="card-title">Year Fellowship Prayer Groups</h4>
                  <p className="card-text">
                    Prayer coordinators mobilizing intercession within each year group.
                  </p>
                  <h6>Activities</h6>
                  <ul>
                    <li>Year-based prayer meetings</li>
                    <li>Prayer request collection</li>
                    <li>Praise report sharing</li>
                  </ul>
                  <p className="text-muted small">
                    <i className="fas fa-calendar-alt me-2" /> During fellowship meetings
                  </p>
                </div>
              </div>
            </div>

            <div
              className="col-md-6 col-lg-4 mb-4"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <div className="sub-ministry-card">
                <div className="card-body">
                  <i className="fas fa-handshake choir-icon mb-3" />
                  <h4 className="card-title">Prayer Partnerships</h4>
                  <p className="card-text">
                    Accountability and prayer partner groups for personal growth.
                  </p>
                  <h6>Activities</h6>
                  <ul>
                    <li>Prayer pairs and triads</li>
                    <li>Mutual intercession</li>
                    <li>Accountability partnerships</li>
                  </ul>
                  <p className="text-muted small">
                    <i className="fas fa-calendar-alt me-2" /> Ongoing throughout the year
                  </p>
                </div>
              </div>
            </div>

            <div
              className="col-md-6 col-lg-4 mb-4"
              data-aos="fade-up"
              data-aos-delay="700"
            >
              <div className="sub-ministry-card">
                <div className="card-body">
                  <i className="fas fa-bullhorn instrumentalists-icon mb-3" />
                  <h4 className="card-title">Prayer Requests &amp; Updates</h4>
                  <p className="card-text">
                    Communication of prayer points and praise reports for the CU.
                  </p>
                  <h6>Activities</h6>
                  <ul>
                    <li>Prayer request dissemination</li>
                    <li>Praise report sharing</li>
                    <li>CU prayer focus updates</li>
                  </ul>
                  <p className="text-muted small">
                    <i className="fas fa-calendar-alt me-2" /> Regular communication
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key events */}
      <section className="key-events-section">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">
            Committee Structure &amp; Leadership
          </h2>
          <p
            className="lead text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            The Prayer Ministry is structured with dedicated roles to ensure effective coordination and spiritual leadership.
          </p>
          <div className="row">
            <div
              className="col-md-6 col-lg-3 mb-4"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <div className="event-highlight-card">
                <div className="card-body text-center">
                  <i className="fas fa-hands-praying event-icon" />
                  <h5 className="card-title">Chairperson</h5>
                  <p className="card-text">
                    Prayer Coordinator
                  </p>
                  <small className="text-muted">Provides overall spiritual leadership and coordination</small>
                </div>
              </div>
            </div>

            <div
              className="col-md-6 col-lg-3 mb-4"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <div className="event-highlight-card">
                <div className="card-body text-center">
                  <i className="fas fa-file-alt event-icon" />
                  <h5 className="card-title">Secretary/Treasurer</h5>
                  <p className="card-text">
                    Administrative &amp; Financial Support
                  </p>
                  <small className="text-muted">Handles communications and prayer request distribution</small>
                </div>
              </div>
            </div>

            <div
              className="col-md-6 col-lg-3 mb-4"
              data-aos="zoom-in"
              data-aos-delay="400"
            >
              <div className="event-highlight-card">
                <div className="card-body text-center">
                  <i className="fas fa-users event-icon" />
                  <h5 className="card-title">Year Prayer Coordinators</h5>
                  <p className="card-text">
                    Anza, Endelea 1, Endelea 2, VUKA FiT
                  </p>
                  <small className="text-muted">Mobilize prayer within their year groups</small>
                </div>
              </div>
            </div>

            <div
              className="col-md-6 col-lg-3 mb-4"
              data-aos="zoom-in"
              data-aos-delay="500"
            >
              <div className="event-highlight-card">
                <div className="card-body text-center">
                  <i className="fas fa-comments event-icon" />
                  <h5 className="card-title">Committee Members</h5>
                  <p className="card-text">
                    Prayer Warriors &amp; Support Team
                  </p>
                  <small className="text-muted">Active participation in planning and execution</small>
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
            Key Responsibilities
          </h2>
          <p
            className="lead text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            The Prayer Coordinator and leadership team are committed to advancing prayer throughout the CU.
          </p>
          <div className="row">
            <div className="col-md-6 mb-4" data-aos="fade-up" data-aos-delay="200">
              <div className="leadership-card">
                <h5><i className="fas fa-check-circle text-success me-2"></i>Planning &amp; Coordination</h5>
                <p>Strategically planning all corporate prayer meetings, prayer weeks, and special events</p>
              </div>
            </div>
            <div className="col-md-6 mb-4" data-aos="fade-up" data-aos-delay="300">
              <div className="leadership-card">
                <h5><i className="fas fa-check-circle text-success me-2"></i>Prayer Direction Setting</h5>
                <p>Identifying and communicating key prayer points for the CU and beyond</p>
              </div>
            </div>
            <div className="col-md-6 mb-4" data-aos="fade-up" data-aos-delay="400">
              <div className="leadership-card">
                <h5><i className="fas fa-check-circle text-success me-2"></i>Year Group Mobilization</h5>
                <p>Appointing and supporting prayer coordinators within each year fellowship</p>
              </div>
            </div>
            <div className="col-md-6 mb-4" data-aos="fade-up" data-aos-delay="500">
              <div className="leadership-card">
                <h5><i className="fas fa-check-circle text-success me-2"></i>Prayer Culture Building</h5>
                <p>Championing a culture of fervent, consistent prayer throughout the entire union</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action & form */}
      <section className="cta-section">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">
            Join Our Prayer Ministry!
          </h2>
          <p
            className="lead text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            If you have a passion for intercession and believe in the power of prayer, we invite you to join our Prayer Ministry and help mobilize the union in fervent, consistent prayer.
          </p>
          <div className="row justify-content-center">
            <div className="col-md-8" data-aos="fade-up" data-aos-delay="200">
              <div className="join-form-card">
                <form onSubmit={handleSubmit} noValidate>
                  {error && (
                    <div className="alert alert-warning mb-3" role="alert">
                      {error}
                    </div>
                  )}
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
                      <option>Corporate Prayer Meetings</option>
                      <option>Prayer Weeks &amp; Fasts</option>
                      <option>Prayer Retreats &amp; Keshas</option>
                      <option>Year Group Prayer Coordinator</option>
                      <option>General Interest</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="experience" className="form-label">
                      Tell us about your prayer passion or experience (Optional)
                    </label>
                    <textarea
                      className="form-control"
                      id="experience"
                      rows={3}
                      placeholder="Share what draws you to prayer ministry..."
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : "Submit Interest"}
                  </button>
                </form>
                {showSuccess && (
                  <div className="mt-3 text-success animate-pop-in">
                    Thank you for your interest in the Prayer Ministry! We&apos;ve
                    received your submission and will get in touch with you soon.
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row mt-4 justify-content-center">
            <div
              className="col-md-4 text-center"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <Link to="/" className="btn btn-primary">
                Submit Prayer Request
              </Link>
            </div>
            <div
              className="col-md-4 text-center"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <Link to="/ministries" className="btn btn-secondary">
                View All Ministries
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="sub-ministries-section">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">
            Prayer Ministry in Action
          </h2>
          <div className="row">
            <div className="col-md-3 mb-4" data-aos="zoom-in">
              <img
                src="/assets/images/morning-prayer.jpg"
                alt="Morning Prayer"
                className="img-fluid rounded"
              />
              <p className="text-center mt-2">Morning Prayer Session</p>
            </div>
            <div
              className="col-md-3 mb-4"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <img
                src="/assets/images/kesha.jpg"
                alt="Prayer Kesha"
                className="img-fluid rounded"
              />
              <p className="text-center mt-2">Prayer Kesha</p>
            </div>
            <div
              className="col-md-3 mb-4"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <img
                src="/assets/images/prayer-service.jpg"
                alt="Prayer Service"
                className="img-fluid rounded"
              />
              <p className="text-center mt-2">Prayer Service</p>
            </div>
            <div
              className="col-md-3 mb-4"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <img
                src="/assets/images/retreat.jpg"
                alt="Prayer Retreat"
                className="img-fluid rounded"
              />
              <p className="text-center mt-2">Prayer Retreat</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrayerMinistryPage;
