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
            <div className="col-lg-5 text-center mb-4 mb-lg-0">
              <img
                src="/assets/images/MARTHA.jpeg"
                alt="Martha Thuku"
                className="img-fluid rounded-circle"
                data-aos="zoom-in"
              />
              <h3 className="mt-3">Martha Thuku</h3>
              <p className="text-muted">Prayer Coordinator</p>
            </div>
            <div className="col-lg-7">
              <h2 className="section-title" data-aos="fade-right">
                About the Prayer Ministry
              </h2>
              <p data-aos="fade-right" data-aos-delay="100">
                The Prayer Ministry is the spiritual engine of MUTCU, dedicated
                to cultivating a deep culture of prayer and intercession among
                members. It organizes various prayer gatherings, from daily
                sessions to special prayer keshas and retreats, ensuring that
                the Union&apos;s activities are founded on spiritual dependence
                and divine guidance.
              </p>
              <p data-aos="fade-right" data-aos-delay="200">
                As outlined in the MUTCU constitution and policies, the Prayer
                Coordinator leads in organizing prayer retreats, keshas, days,
                chains, groups, trainings, and outreaches. The ministry
                encourages consistent and fervent prayer for the Union,
                university, nation, and global needs, believing prayer is key to
                spiritual breakthroughs and fulfilling MUTCU&apos;s vision and
                mission.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prayer gatherings */}
      <section className="sub-ministries-section">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">
            Our Prayer Gatherings
          </h2>
          <p
            className="lead text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            The Prayer Ministry facilitates multiple opportunities for corporate
            and personal prayer throughout the week in the Prayer Room. Click on
            the cards to learn more!
          </p>
          <div className="row">
            <div
              className="col-md-6 col-lg-3 mb-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="sub-ministry-card">
                <div className="card-body text-center">
                  <i className="fas fa-sun choir-icon mb-3" />
                  <h4 className="card-title">Morning Prayers</h4>
                  <p className="card-text">
                    Start your day with corporate prayer, seeking God&apos;s
                    guidance and strength.
                  </p>
                  <h6>Activities</h6>
                  <ul>
                    <li>Guided prayers</li>
                    <li>Scripture reading</li>
                    <li>Intercession for the day ahead</li>
                  </ul>
                  <p className="text-muted">
                    <i className="fas fa-clock me-2" />
                    6:00 AM - 6:50 AM (Sunday - Friday)
                  </p>
                </div>
              </div>
            </div>

            <div
              className="col-md-6 col-lg-3 mb-4"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="sub-ministry-card">
                <div className="card-body text-center">
                  <i className="fas fa-utensils band-icon mb-3" />
                  <h4 className="card-title">Lunch Hour Prayers</h4>
                  <p className="card-text">
                    Midday refreshment through prayer and teachings on selected
                    days.
                  </p>
                  <h6>Activities</h6>
                  <ul>
                    <li>Prayer sessions with teachings (Mon, Wed, Fri)</li>
                    <li>Focused intercession</li>
                  </ul>
                  <p className="text-muted">
                    <i className="fas fa-clock me-2" />
                    12:00 PM - 12:50 PM (Daily)
                  </p>
                </div>
              </div>
            </div>

            <div
              className="col-md-6 col-lg-3 mb-4"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="sub-ministry-card">
                <div className="card-body text-center">
                  <i className="fas fa-moon praise-icon mb-3" />
                  <h4 className="card-title">Evening Prayers</h4>
                  <p className="card-text">
                    End the day in thanksgiving and supplication before God.
                  </p>
                  <h6>Activities</h6>
                  <ul>
                    <li>Reflective prayers</li>
                    <li>Sharing testimonies</li>
                    <li>Night intercession</li>
                  </ul>
                  <p className="text-muted">
                    <i className="fas fa-clock me-2" />
                    9:00 PM - 9:30 PM (Sunday - Friday)
                  </p>
                </div>
              </div>
            </div>

            <div
              className="col-md-6 col-lg-3 mb-4"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="sub-ministry-card">
                <div className="card-body text-center">
                  <i className="fas fa-ban instrumentalists-icon mb-3" />
                  <h4 className="card-title">Corporate Fasting</h4>
                  <p className="card-text">
                    United fasting for spiritual breakthroughs and communal
                    needs.
                  </p>
                  <h6>Activities</h6>
                  <ul>
                    <li>Guided fasting with prayer focuses</li>
                    <li>Breaking fast together</li>
                  </ul>
                  <p className="text-muted">
                    <i className="fas fa-clock me-2" />
                    Once a fortnight on Wednesdays
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
            Featured Events
          </h2>
          <p
            className="lead text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            The Prayer Ministry organizes special events to deepen the
            Union&apos;s prayer life.
          </p>
          <div className="row">
            <div
              className="col-md-4 mb-4"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <div className="event-highlight-card">
                <div className="card-body text-center">
                  <i className="fas fa-pray event-icon" />
                  <h5 className="card-title">Prayer Kesha</h5>
                  <p className="card-text">
                    All-night prayer session for intense intercession and
                    worship.
                  </p>
                  <p className="text-muted">
                    <i className="fas fa-calendar-alt me-2" />
                    Next Date: 26th September
                  </p>
                </div>
              </div>
            </div>

            <div
              className="col-md-4 mb-4"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <div className="event-highlight-card">
                <div className="card-body text-center">
                  <i className="fas fa-church event-icon" />
                  <h5 className="card-title">Prayer Service</h5>
                  <p className="card-text">
                    Dedicated service focused on prayer and spiritual renewal.
                  </p>
                  <p className="text-muted">
                    <i className="fas fa-calendar-alt me-2" />
                    Next Date: 24th October
                  </p>
                </div>
              </div>
            </div>

            <div
              className="col-md-4 mb-4"
              data-aos="zoom-in"
              data-aos-delay="400"
            >
              <div className="event-highlight-card">
                <div className="card-body text-center">
                  <i className="fas fa-mountain event-icon" />
                  <h5 className="card-title">Prayer Retreat</h5>
                  <p className="card-text">
                    Off-campus retreat for extended prayer, teaching, and
                    fellowship.
                  </p>
                  <p className="text-muted">
                    <i className="fas fa-calendar-alt me-2" />
                    Frequency: Annually, date to be announced
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
            Guided by dedicated leadership, our Prayer Ministry thrives.
          </p>
          <div className="row justify-content-center">
            <div className="col-md-4 col-lg-3 mb-4" data-aos="zoom-in">
              <div className="executive-member-card">
                <img
                  src="/assets/images/MARTHA.jpeg"
                  alt="Martha Thuku"
                  className="img-fluid rounded-circle mb-2 border-orange"
                />
                <h5 className="member-name">Martha Thuku</h5>
                <p className="member-role">Prayer Coordinator</p>
                <button className="btn btn-outline-light btn-sm" type="button">
                  View Profile
                </button>
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
            If you have a passion for intercession and spiritual warfare, we
            invite you to join the Prayer Ministry. Fill out the form below to
            express your interest!
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
                      <option>Morning Prayers</option>
                      <option>Lunch Hour Prayers</option>
                      <option>Evening Prayers</option>
                      <option>Intercession Group</option>
                      <option>General Interest</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="experience" className="form-label">
                      Tell us about your prayer experience or passion (Optional)
                    </label>
                    <textarea
                      className="form-control"
                      id="experience"
                      rows={3}
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
              <Link to="/events" className="btn btn-secondary">
                View Prayer Events
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
