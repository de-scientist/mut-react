import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useTimedSuccess } from "../../hooks/useTimedSuccess";
import "../../assets/mut/css/bible-study.css";

const BibleStudyMinistryPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [areaOfInterest, setAreaOfInterest] = useState("");
  const [experience, setExperience] = useState("");
  const { visible: showSuccess, trigger: showSuccessMessage } =
    useTimedSuccess(5000);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !areaOfInterest) return;

    console.log("Bible Study & Discipleship Join Interest:", {
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
    <div className="bible-study-ministry-page">
      {/* Hero */}
      <section
        className="page-hero-section"
        style={{
          backgroundImage: "url('/assets/images/bible-study-hero.jpg')",
        }}
        data-aos="fade-in"
      >
        <div className="hero-overlay" />
        <div className="container">
          <h1 data-aos="fade-up">
            MUTCU Bible Study &amp; Discipleship Ministry
          </h1>
          <p className="lead" data-aos="fade-up" data-aos-delay="100">
            Deepening Faith Through God&apos;s Word and Nurturing Growth
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="ministry-intro-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <h2 className="section-title" data-aos="fade-right">
                About the Bible Study &amp; Training Ministry
              </h2>
              <div data-aos="fade-right" data-aos-delay="100">
                <h5 className="text-secondary mb-3">Mandate</h5>
                <p>
                  To facilitate the systematic spiritual growth of members through the in-depth study of God&apos;s Word in small groups and structured self-training programs.
                </p>
              </div>
              <div data-aos="fade-right" data-aos-delay="200">
                <h5 className="text-secondary mb-3">Our Mission</h5>
                <p>
                  This ministry equips MUTCU members with a deeper understanding of the Holy Scripture and builds spiritual maturity through small group Bible studies, nurturing classes for new believers, and intensive training through programs like BEST-P (Bible Exposition Self Training Program).
                </p>
              </div>
              <div data-aos="fade-right" data-aos-delay="300">
                <h5 className="text-secondary mb-3">Our Focus</h5>
                <ul>
                  <li>Fostering consistent, personal Bible reading across the CU</li>
                  <li>Facilitating in-depth Bible study in small groups</li>
                  <li>Training members in Bible exposition through BEST-P</li>
                  <li>Ensuring members are grounded in biblical truths and apply them in daily life</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-5 text-center mb-4 mb-lg-0">
              <img
                src="/assets/images/CALEB.jpg"
                alt="Bible Study Coordinator"
                className="img-fluid rounded-circle"
                data-aos="zoom-in"
              />
              <h3 className="mt-3">Bible Study &amp; Training Coordinator</h3>
              <p className="text-muted">
                Provides oversight and educational leadership for the ministry
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Discipleship programs */}
      <section className="sub-ministries-section">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">
            Our Core Programs
          </h2>
          <p
            className="lead text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            The ministry offers multiple programs designed to foster comprehensive spiritual growth and biblical grounding.
          </p>
          <div className="row">
            {/* Small Bible Study Groups */}
            <div
              className="col-md-6 col-lg-4 mb-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="sub-ministry-card">
                <div className="card-body">
                  <i className="fas fa-book-open choir-icon mb-3" />
                  <h4 className="card-title">Small Bible Study Groups</h4>
                  <p className="card-text">
                    In-depth exploration of God&apos;s Word in intimate settings
                  </p>
                  <h6>Key Features</h6>
                  <ul>
                    <li>Weekly discussions using official guides</li>
                    <li>Interactive biblical exploration</li>
                    <li>Personal application of scripture</li>
                    <li>Community fellowship and prayer</li>
                  </ul>
                  <p className="text-muted small">
                    <i className="fas fa-calendar-alt me-2" /> Mondays &amp; other set days
                  </p>
                </div>
              </div>
            </div>

            {/* Nurturing Classes */}
            <div
              className="col-md-6 col-lg-4 mb-4"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="sub-ministry-card">
                <div className="card-body">
                  <i className="fas fa-seedling band-icon mb-3" />
                  <h4 className="card-title">Nurturing Classes</h4>
                  <p className="card-text">
                    Grounding new believers in fundamental Christian faith
                  </p>
                  <h6>Key Features</h6>
                  <ul>
                    <li>Teachings on basic Christian principles</li>
                    <li>Introduction to biblical foundations</li>
                    <li>Spiritual mentorship and guidance</li>
                    <li>Questions and discussions</li>
                  </ul>
                  <p className="text-muted small">
                    <i className="fas fa-calendar-alt me-2" /> Structured schedule
                  </p>
                </div>
              </div>
            </div>

            {/* BEST-P Program */}
            <div
              className="col-md-6 col-lg-4 mb-4"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="sub-ministry-card">
                <div className="card-body">
                  <i className="fas fa-graduation-cap praise-icon mb-3" />
                  <h4 className="card-title">BEST-P Program</h4>
                  <p className="card-text">
                    Bible Exposition Self Training Program for deeper scriptural understanding
                  </p>
                  <h6>Key Features</h6>
                  <ul>
                    <li>Comprehensive curriculum on scripture exposition</li>
                    <li>Practical assignments and exercises</li>
                    <li>Training for potential Bible study leaders</li>
                    <li>Graduation recognition and advancement</li>
                  </ul>
                  <p className="text-muted small">
                    <i className="fas fa-calendar-alt me-2" /> Scheduled sessions
                  </p>
                </div>
              </div>
            </div>

            {/* Consistent Bible Reading */}
            <div
              className="col-md-6 col-lg-4 mb-4"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="sub-ministry-card">
                <div className="card-body">
                  <i className="fas fa-bookmark band-icon mb-3" />
                  <h4 className="card-title">Consistent Bible Reading</h4>
                  <p className="card-text">
                    Cultivating a daily personal Bible reading habit
                  </p>
                  <h6>Key Features</h6>
                  <ul>
                    <li>Reading-plan groups</li>
                    <li>Devotional resources</li>
                    <li>Accountability partnerships</li>
                    <li>Progress tracking and encouragement</li>
                  </ul>
                  <p className="text-muted small">
                    <i className="fas fa-calendar-alt me-2" /> Daily engagement
                  </p>
                </div>
              </div>
            </div>

            {/* Bible Study Review */}
            <div
              className="col-md-6 col-lg-4 mb-4"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <div className="sub-ministry-card">
                <div className="card-body">
                  <i className="fas fa-comments choir-icon mb-3" />
                  <h4 className="card-title">Bible Study Review</h4>
                  <p className="card-text">
                    Consolidated discussion and reflection on weekly Bible studies
                  </p>
                  <h6>Key Features</h6>
                  <ul>
                    <li>Group reflection sessions</li>
                    <li>Questions and clarifications</li>
                    <li>Application discussions</li>
                    <li>Shared insights and takeaways</li>
                  </ul>
                  <p className="text-muted small">
                    <i className="fas fa-calendar-alt me-2" /> Mondays, 4:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Baptism Preparation */}
            <div
              className="col-md-6 col-lg-4 mb-4"
              data-aos="fade-up"
              data-aos-delay="700"
            >
              <div className="sub-ministry-card">
                <div className="card-body">
                  <i className="fas fa-water instrumentalists-icon mb-3" />
                  <h4 className="card-title">Baptism Preparation</h4>
                  <p className="card-text">
                    Training and celebration of new believers&apos; public faith commitment
                  </p>
                  <h6>Key Features</h6>
                  <ul>
                    <li>Pre-baptism training classes</li>
                    <li>Biblical understanding of baptism</li>
                    <li>Baptism ceremony planning</li>
                    <li>Post-baptism follow-up discipleship</li>
                  </ul>
                  <p className="text-muted small">
                    <i className="fas fa-calendar-alt me-2" /> Once per spiritual year
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="key-events-section">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">
            Committee Structure
          </h2>
          <p
            className="lead text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            The ministry is led by a dedicated committee with specialized roles to ensure effective administration and spiritual oversight.
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
                    Bible Study &amp; Training Coordinator
                  </p>
                  <small className="text-muted">Provides oversight and educational leadership</small>
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
                  <i className="fas fa-book event-icon" />
                  <h5 className="card-title">Bible Study Coordinator</h5>
                  <p className="card-text">
                    Small Groups &amp; Follow-up
                  </p>
                  <small className="text-muted">Oversees small Bible study groups</small>
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
                  <i className="fas fa-graduation-cap event-icon" />
                  <h5 className="card-title">BEST-P Coordinator</h5>
                  <p className="card-text">
                    Bible Exposition Training
                  </p>
                  <small className="text-muted">Ensures BEST-P classes are running effectively</small>
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
                  <i className="fas fa-bookmark event-icon" />
                  <h5 className="card-title">CBR Coordinator</h5>
                  <p className="card-text">
                    Consistent Bible Reading
                  </p>
                  <small className="text-muted">Promotes personal daily Bible reading</small>
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
            Our leadership is committed to these core responsibilities
          </p>
          <div className="row">
            <div className="col-md-6 mb-4" data-aos="fade-up" data-aos-delay="200">
              <div className="leadership-card">
                <h5><i className="fas fa-check-circle text-success me-2"></i>Overall Strategy</h5>
                <p>Managing the overall health and strategy of small group Bible studies</p>
              </div>
            </div>
            <div className="col-md-6 mb-4" data-aos="fade-up" data-aos-delay="300">
              <div className="leadership-card">
                <h5><i className="fas fa-check-circle text-success me-2"></i>Leader Development</h5>
                <p>Training and equipping Bible study group leaders for effectiveness</p>
              </div>
            </div>
            <div className="col-md-6 mb-4" data-aos="fade-up" data-aos-delay="400">
              <div className="leadership-card">
                <h5><i className="fas fa-check-circle text-success me-2"></i>Program Oversight</h5>
                <p>Supervising BEST-P program execution and ensuring quality delivery</p>
              </div>
            </div>
            <div className="col-md-6 mb-4" data-aos="fade-up" data-aos-delay="500">
              <div className="leadership-card">
                <h5><i className="fas fa-check-circle text-success me-2"></i>Culture of Bible Study</h5>
                <p>Championing a culture of consistent personal Bible reading and study</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="cta-section">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">
            Join Our Bible Study &amp; Training Ministry!
          </h2>
          <p
            className="lead text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            If you have a passion for God&apos;s Word and growing deeper in your faith, we invite you to join our community of Bible students.
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
                    <option>Small Bible Study Groups</option>
                    <option>Nurturing Classes</option>
                    <option>BEST-P Program</option>
                    <option>Consistent Bible Reading</option>
                    <option>General Interest</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="experience" className="form-label">
                    Tell us about your passion or interest (Optional)
                  </label>
                  <textarea
                    className="form-control"
                    id="experience"
                    rows={3}
                    placeholder="Share what draws you to this ministry..."
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
                  Thank you for your interest in the Bible Study &amp; Training Ministry! We&apos;ll get in touch with you soon.
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
                View Events
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
                src="/assets/images/bible-study-group.jpg"
                alt="Bible Study Group"
                className="img-fluid rounded"
              />
              <p className="text-center mt-2">Bible Study Group Session</p>
            </div>
            <div
              className="col-md-3 mb-4"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <img
                src="/assets/images/nurturing-class.jpg"
                alt="Nurturing Class"
                className="img-fluid rounded"
              />
              <p className="text-center mt-2">Nurturing Class</p>
            </div>
            <div
              className="col-md-3 mb-4"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <img
                src="/assets/images/best-p.jpg"
                alt="BEST-P Program"
                className="img-fluid rounded"
              />
              <p className="text-center mt-2">BEST-P Training</p>
            </div>
            <div
              className="col-md-3 mb-4"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <img
                src="/assets/images/baptism.jpg"
                alt="Baptism Ceremony"
                className="img-fluid rounded"
              />
              <p className="text-center mt-2">Baptism Ceremony</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BibleStudyMinistryPage;
