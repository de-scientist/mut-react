import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useTimedSuccess } from "../../hooks/useTimedSuccess";
import "../../assets/mut/css/missions-evangelism.css";

const MissionsEvangelismMinistryPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [areaOfInterest, setAreaOfInterest] = useState("");
  const [experience, setExperience] = useState("");
  const { visible: showSuccess, trigger: showSuccessMessage } =
    useTimedSuccess(5000);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !areaOfInterest) return;

    console.log("Missions & Evangelism Join Interest:", {
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
    <div className="missions-ministry-page">
      {/* Hero */}
      <section
        className="page-hero-section"
        style={{ backgroundImage: "url('/assets/images/mission1.jpg')" }}
        data-aos="fade-in"
      >
        <div className="hero-overlay" />
        <div className="container">
          <h1 data-aos="fade-up">MUTCU Missions &amp; Evangelism Ministry</h1>
          <p className="lead" data-aos="fade-up" data-aos-delay="100">
            Spreading the Gospel and Serving Communities
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="ministry-intro-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <h2 className="section-title" data-aos="fade-right">
                About the Missions &amp; Evangelism Ministry
              </h2>
              <div data-aos="fade-right" data-aos-delay="100">
                <h5 className="text-secondary mb-3">Mandate</h5>
                <p>
                  To equip and mobilize the CU to faithfully proclaim the gospel in word and deed, both on campus and beyond, ensuring that every member is engaged in the Great Commission.
                </p>
              </div>
              <div data-aos="fade-right" data-aos-delay="200">
                <h5 className="text-secondary mb-3">Our Mission</h5>
                <p>
                  The Missions &amp; Evangelism Ministry is committed to spreading the Gospel and serving communities. Through evangelism, community service, and discipleship, we seek to reach the lost, establish new believers in faith, and demonstrate Christ&apos;s love through compassionate action.
                </p>
              </div>
              <div data-aos="fade-right" data-aos-delay="300">
                <h5 className="text-secondary mb-3">Our Three Focus Areas</h5>
                <ul>
                  <li><strong>Evangelism:</strong> Campus-wide and community evangelistic efforts</li>
                  <li><strong>Hope Ministry:</strong> Compassionate outreach to vulnerable groups</li>
                  <li><strong>Integral Ministry:</strong> Strategic outreach to high schools and community service</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-5 text-center mb-4 mb-lg-0">
              <img
                src="/assets/images/MUTUKU.jpeg"
                alt="Missions & Evangelism Coordinator"
                className="img-fluid rounded-circle"
                data-aos="zoom-in"
              />
              <h3 className="mt-3">Missions &amp; Evangelism Coordinator</h3>
              <p className="text-muted">
                Provides strategic leadership and oversight
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Outreach Programs */}
      <section className="sub-ministries-section">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">
            Our Sub-Committees &amp; Programs
          </h2>
          <p
            className="lead text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            The ministry operates through three specialized sub-committees, each with a distinct focus and leadership.
          </p>
          <div className="row">
            {/* Evangelism Sub-Committee */}
            <div
              className="col-md-6 col-lg-4 mb-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="sub-ministry-card">
                <div className="card-body">
                  <i className="fas fa-church choir-icon mb-3" />
                  <h4 className="card-title">Evangelism Sub-Committee</h4>
                  <p className="card-text">
                    Spearheading on-campus and off-campus evangelistic efforts.
                  </p>
                  <h6>Focus Areas</h6>
                  <ul>
                    <li>Campus evangelism programs</li>
                    <li>Evangelistic campaigns</li>
                    <li>Year-based evangelism leaders</li>
                    <li>Training in personal evangelism</li>
                  </ul>
                  <p className="text-muted small">
                    <i className="fas fa-calendar-alt me-2" /> Regular activities
                  </p>
                </div>
              </div>
            </div>

            {/* Hope Ministry Sub-Committee */}
            <div
              className="col-md-6 col-lg-4 mb-4"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="sub-ministry-card">
                <div className="card-body">
                  <i className="fas fa-hands-helping band-icon mb-3" />
                  <h4 className="card-title">Hope Ministry Sub-Committee</h4>
                  <p className="card-text">
                    Demonstrating Christ&apos;s compassion to vulnerable groups.
                  </p>
                  <h6>Focus Areas</h6>
                  <ul>
                    <li>Hospital visitations</li>
                    <li>Prison ministry</li>
                    <li>Children&apos;s home outreach</li>
                    <li>Rescue centre support</li>
                  </ul>
                  <p className="text-muted small">
                    <i className="fas fa-calendar-alt me-2" /> Scheduled visits
                  </p>
                </div>
              </div>
            </div>

            {/* Integral Ministry Sub-Committee */}
            <div
              className="col-md-6 col-lg-4 mb-4"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="sub-ministry-card">
                <div className="card-body">
                  <i className="fas fa-globe praise-icon mb-3" />
                  <h4 className="card-title">Integral Ministry Sub-Committee</h4>
                  <p className="card-text">
                    Strategic outreach to specific groups and community service.
                  </p>
                  <h6>Focus Areas</h6>
                  <ul>
                    <li>High school Christian Union support</li>
                    <li>Sunday school programs</li>
                    <li>Community Service & Social Action</li>
                    <li>CSR street evangelism</li>
                  </ul>
                  <p className="text-muted small">
                    <i className="fas fa-calendar-alt me-2" /> Ongoing partnerships
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
            Committee Leadership &amp; Roles
          </h2>
          <p
            className="lead text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Our leadership structure ensures doctrinal soundness and effective coordination across all outreach activities.
          </p>
          <div className="row">
            <div
              className="col-md-6 col-lg-3 mb-4"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <div className="event-highlight-card">
                <div className="card-body text-center">
                  <i className="fas fa-user-tie event-icon" />
                  <h5 className="card-title">Chairperson</h5>
                  <p className="card-text">
                    M&amp;E Coordinator
                  </p>
                  <small className="text-muted">Strategic leadership &amp; oversight</small>
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
                  <i className="fas fa-users event-icon" />
                  <h5 className="card-title">Evangelism Leader</h5>
                  <p className="card-text">
                    Campus &amp; Outreach
                  </p>
                  <small className="text-muted">Leads campus-wide evangelism</small>
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
                  <i className="fas fa-heart event-icon" />
                  <h5 className="card-title">Hope Leader</h5>
                  <p className="card-text">
                    Vulnerable Groups Ministry
                  </p>
                  <small className="text-muted">Compassionate community care</small>
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
                  <i className="fas fa-globe event-icon" />
                  <h5 className="card-title">Integral Leader</h5>
                  <p className="card-text">
                    Strategic Outreach
                  </p>
                  <small className="text-muted">High schools &amp; CSR initiatives</small>
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
            Our leadership is committed to spreading the gospel with excellence and integrity.
          </p>
          <div className="row">
            <div className="col-md-6 mb-4" data-aos="fade-up" data-aos-delay="200">
              <div className="leadership-card">
                <h5><i className="fas fa-check-circle text-success me-2"></i>Strategic Planning</h5>
                <p>Developing overall outreach strategy aligned with MUTCU&apos;s vision and doctrinal basis</p>
              </div>
            </div>
            <div className="col-md-6 mb-4" data-aos="fade-up" data-aos-delay="300">
              <div className="leadership-card">
                <h5><i className="fas fa-check-circle text-success me-2"></i>Team Training</h5>
                <p>Ensuring all outreach teams are well-trained and grounded in biblical evangelism</p>
              </div>
            </div>
            <div className="col-md-6 mb-4" data-aos="fade-up" data-aos-delay="400">
              <div className="leadership-card">
                <h5><i className="fas fa-check-circle text-success me-2"></i>Resource Provision</h5>
                <p>Ensuring outreach teams are adequately resourced for effective ministry</p>
              </div>
            </div>
            <div className="col-md-6 mb-4" data-aos="fade-up" data-aos-delay="500">
              <div className="leadership-card">
                <h5><i className="fas fa-check-circle text-success me-2"></i>Doctrinal Oversight</h5>
                <p>Maintaining alignment with MUTCU&apos;s doctrinal basis in all evangelism activities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="cta-section">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">
            Join Our Missions &amp; Evangelism Ministry!
          </h2>
          <p
            className="lead text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            If you are passionate about sharing the Gospel and serving others, join us in reaching our campus and communities with the Good News of Jesus Christ.
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
                    <option>Campus Evangelism</option>
                    <option>Hope Ministry (Community Care)</option>
                    <option>Integral Ministry (High Schools &amp; CSR)</option>
                    <option>Evangelism Training</option>
                    <option>General Interest</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="experience" className="form-label">
                    Tell us about your passion or experience (Optional)
                  </label>
                  <textarea
                    className="form-control"
                    id="experience"
                    rows={3}
                    placeholder="What draws you to missions and evangelism?"
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
                  Thank you for your interest in the Missions &amp; Evangelism
                  Ministry! We&apos;ll get in touch with you soon.
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
                View All Ministries
              </Link>
            </div>
            <div
              className="col-md-4 text-center"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <Link to="/events" className="btn btn-secondary">
                View Upcoming Events
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
                src="/assets/images/crusade.jpg"
                alt="Evangelistic Crusade"
                className="img-fluid rounded"
              />
              <p className="text-center mt-2">Evangelistic Crusade</p>
            </div>
            <div
              className="col-md-3 mb-4"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <img
                src="/assets/images/missions-trip.jpg"
                alt="Missions Trip"
                className="img-fluid rounded"
              />
              <p className="text-center mt-2">Missions Trip</p>
            </div>
            <div
              className="col-md-3 mb-4"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <img
                src="/assets/images/community-outreach.jpg"
                alt="Community Outreach"
                className="img-fluid rounded"
              />
              <p className="text-center mt-2">Community Outreach</p>
            </div>
            <div
              className="col-md-3 mb-4"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <img
                src="/assets/images/discipleship-team.jpg"
                alt="Discipleship Team"
                className="img-fluid rounded"
              />
              <p className="text-center mt-2">Discipleship Team</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MissionsEvangelismMinistryPage;
