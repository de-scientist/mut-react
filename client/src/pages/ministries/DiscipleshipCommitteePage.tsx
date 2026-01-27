import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useTimedSuccess } from "../../hooks/useTimedSuccess";
import "../../assets/mut/css/about.css";

const DiscipleshipCommitteePage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [areaOfInterest, setAreaOfInterest] = useState("");
  const [joinMessage, setJoinMessage] = useState("");
  const {
    visible: showSuccess,
    trigger: showSuccessMessage,
    hide,
  } = useTimedSuccess(0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !areaOfInterest) return;

    console.log("Discipleship Committee Join Request Submitted:", {
      name: fullName,
      email,
      interest: areaOfInterest,
      message: joinMessage,
    });

    setFullName("");
    setEmail("");
    setAreaOfInterest("");
    setJoinMessage("");
    showSuccessMessage();
  };

  return (
    <div className="discipleship-committee-page">
      <section
        className="page-hero-section d-flex align-items-center text-center text-white"
        style={{ backgroundImage: "url('/assets/images/discipleship.jpg')" }}
      >
        <div className="hero-overlay" />
        <div
          className="container position-relative"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h1 className="display-3 mb-3">MUTCU Discipleship Committee</h1>
          <p className="lead">
            Guiding Members from New Believers to Mature Disciples
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-5 ministry-intro-section">
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-lg-7 mb-4 mb-lg-0"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <h2 className="section-title text-start">
                About the Discipleship Committee
              </h2>
              <div className="mb-4">
                <h5 className="text-secondary mb-3">Mandate</h5>
                <p>
                  To intentionally guide members at every stage of their faith journey, from their first decision (nurturing) to relational growth (fellowships) and personal discipleship.
                </p>
              </div>
              <div className="mb-4">
                <h5 className="text-secondary mb-3">Our Mission</h5>
                <p className="lead">
                  The Discipleship Committee facilitates comprehensive spiritual growth and maturation of Union members through structured pathways. We coordinate nurturing for new believers, foster community through years fellowships, establish accountability for personal holiness, and develop discipleship classes for deeper spiritual formation. We believe every member can grow from a new believer into a mature, accountable disciple of Christ.
                </p>
              </div>
              <div>
                <h5 className="text-secondary mb-3">Our Commitment</h5>
                <ul>
                  <li>Providing foundational teachings for new believers</li>
                  <li>Building community through year-based fellowships and peer mentorship</li>
                  <li>Establishing accountability systems for spiritual growth and holiness</li>
                  <li>Offering structured classes for deeper biblical knowledge and leadership development</li>
                  <li>Tracking member progression from new belief to mature discipleship</li>
                </ul>
              </div>
            </div>
            <div
              className="col-lg-5 text-center"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <img
                src="/assets/images/discipleship.jpg"
                alt="Discipleship Ministry"
                className="img-fluid rounded-3 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sub-Programs */}
      <section className="py-5 bg-light sub-ministries-section">
        <div className="container">
          <h2 className="section-title text-center">Our Discipleship Pathways</h2>
          <p className="text-center lead mb-5">
            Four distinct programs guiding members through every stage of spiritual maturity.
          </p>

          <div className="row">
            {/* Nurturing Program */}
            <div
              className="col-lg-6 mb-4"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="sub-ministry-card p-4 rounded-3 shadow-sm h-100">
                <div className="card-image-container mb-4">
                  <img
                    src="/assets/images/discipleship.jpg"
                    alt="Nurturing Program"
                    className="img-fluid rounded-3"
                  />
                </div>
                <div className="d-flex align-items-center mb-3">
                  <i className="fas fa-seedling choir-icon me-3" />
                  <h3 className="card-title mb-0">Nurturing Program</h3>
                </div>
                <p>
                  Foundational teaching and mentorship for new believers. Our nurturing classes help new members understand the basics of Christian faith, assurance in Christ, biblical doctrine, and smooth integration into the CU family.
                </p>
                <h6>Key Features:</h6>
                <ul>
                  <li>Introduction to Christian basics and assurance</li>
                  <li>One-on-one mentorship from mature believers</li>
                  <li>Integration into the CU community</li>
                  <li>Follow-up and pastoral care</li>
                </ul>
                <p className="mb-0 text-muted">
                  <i className="fas fa-calendar-alt me-2" />
                  <b>Led by:</b> Nurturing Coordinator
                </p>
              </div>
            </div>

            {/* Years Fellowships */}
            <div
              className="col-lg-6 mb-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="sub-ministry-card p-4 rounded-3 shadow-sm h-100">
                <div className="card-image-container mb-4">
                  <img
                    src="/assets/images/discipleship.jpg"
                    alt="Years Fellowships"
                    className="img-fluid rounded-3"
                  />
                </div>
                <div className="d-flex align-items-center mb-3">
                  <i className="fas fa-user-graduate praise-icon me-3" />
                  <h3 className="card-title mb-0">Years Fellowships</h3>
                </div>
                <p>
                  Community building and peer mentorship within each academic year (Anza FYT, Endelea One, Endelea Two, VUKA FiT). These fellowships foster spiritual support, leadership development, and meaningful relationships among members.
                </p>
                <h6>Key Features:</h6>
                <ul>
                  <li>Weekly fellowship meetings by year group</li>
                  <li>Peer mentorship and spiritual encouragement</li>
                  <li>Leadership development opportunities</li>
                  <li>Social and spiritual activities</li>
                </ul>
                <p className="mb-0 text-muted">
                  <i className="fas fa-calendar-alt me-2" />
                  <b>Led by:</b> Years Fellowship Coordinator
                </p>
              </div>
            </div>

            {/* Accountability Groups */}
            <div
              className="col-lg-6 mb-4"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="sub-ministry-card p-4 rounded-3 shadow-sm h-100">
                <div className="card-image-container mb-4">
                  <img
                    src="/assets/images/discipleship.jpg"
                    alt="Accountability Groups"
                    className="img-fluid rounded-3"
                  />
                </div>
                <div className="d-flex align-items-center mb-3">
                  <i className="fas fa-handshake band-icon me-3" />
                  <h3 className="card-title mb-0">Accountability Groups</h3>
                </div>
                <p>
                  Small circles of believers committed to personal holiness, discipline, and mutual spiritual growth. These groups provide a safe space for members to be honest about struggles, encourage one another, and grow in Christ.
                </p>
                <h6>Key Features:</h6>
                <ul>
                  <li>Small groups for honest accountability</li>
                  <li>Prayer and mutual encouragement</li>
                  <li>Focus on personal holiness and purity</li>
                  <li>Supportive environment for growth</li>
                </ul>
                <p className="mb-0 text-muted">
                  <i className="fas fa-calendar-alt me-2" />
                  <b>Led by:</b> Accountability Coordinator
                </p>
              </div>
            </div>

            {/* Discipleship Classes */}
            <div
              className="col-lg-6 mb-4"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="sub-ministry-card p-4 rounded-3 shadow-sm h-100">
                <div className="card-image-container mb-4">
                  <img
                    src="/assets/images/discipleship.jpg"
                    alt="Discipleship Classes"
                    className="img-fluid rounded-3"
                  />
                </div>
                <div className="d-flex align-items-center mb-3">
                  <i className="fas fa-book-open instrumentalists-icon me-3" />
                  <h3 className="card-title mb-0">Discipleship Classes</h3>
                </div>
                <p>
                  Structured, in-depth classes on foundational Christian doctrines, spiritual disciplines, and practical Christian living. These classes develop mature disciples and future leaders equipped to serve the kingdom effectively.
                </p>
                <h6>Key Features:</h6>
                <ul>
                  <li>Structured biblical and doctrinal teaching</li>
                  <li>Leadership and ministry training</li>
                  <li>Spiritual disciplines and Christian living</li>
                  <li>Development of servant-leaders</li>
                </ul>
                <p className="mb-0 text-muted">
                  <i className="fas fa-calendar-alt me-2" />
                  <b>Led by:</b> Discipleship Class Coordinator
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>      {/* Committee Structure */}
      <section className="py-5 bg-white roles-responsibilities-section">
        <div className="container">
          <h2 className="section-title text-center">Committee Structure &amp; Leadership</h2>
          <p className="text-center lead mb-5">
            The Discipleship Committee comprises dedicated leaders responsible for oversight of each pathway.
          </p>
          <div className="row g-4 justify-content-center">
            <div className="col-lg-6 col-md-6" data-aos="fade-up" data-aos-delay="100">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-secondary">
                    <i className="fas fa-chair me-2 text-primary" />
                    Discipleship Coordinator (Chairperson)
                  </h5>
                  <p className="card-text small">
                    Oversees all discipleship pathways and coordinates with sub-program leaders. Responsible for ensuring theological consistency, tracking member progression, and maintaining the overall health of the discipleship pipeline.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6" data-aos="fade-up" data-aos-delay="200">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-secondary">
                    <i className="fas fa-users me-2 text-primary" />
                    Secretary/Treasurer
                  </h5>
                  <p className="card-text small">
                    Maintains records of member progress and committee activities. Coordinates scheduling, manages committee finances and resources, and documents growth milestones and outcomes.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6" data-aos="fade-up" data-aos-delay="300">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-secondary">
                    <i className="fas fa-seedling me-2 text-primary" />
                    Nurturing Coordinator &amp; Assistant
                  </h5>
                  <p className="card-text small">
                    In charge of new believer nurturing classes. Chairs the Nurturing sub-committee, ensures effective follow-up of new believers with assigned mentors, and oversees baptism preparation activities.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6" data-aos="fade-up" data-aos-delay="400">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-secondary">
                    <i className="fas fa-user-graduate me-2 text-primary" />
                    Years Fellowship Coordinator &amp; Assistant
                  </h5>
                  <p className="card-text small">
                    Ensures all year fellowships run effectively and are well-coordinated. Works with year fellowship leaders to plan topics and activities, and fosters cooperation and unity among all year groups.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6" data-aos="fade-up" data-aos-delay="500">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-secondary">
                    <i className="fas fa-handshake me-2 text-primary" />
                    Accountability Coordinator &amp; Assistant
                  </h5>
                  <p className="card-text small">
                    Champions the importance of personal accountability for spiritual growth. Develops resources and systems for healthy accountability groups and provides training to group leaders.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6" data-aos="fade-up" data-aos-delay="600">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-secondary">
                    <i className="fas fa-book-open me-2 text-primary" />
                    Discipleship Class Coordinator &amp; Assistant
                  </h5>
                  <p className="card-text small">
                    Organizes and runs structured discipleship classes on Christian doctrines and spiritual disciplines. Recruits mature facilitators and ensures all classes are biblically sound and practically applied.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Leader */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="section-title text-center mb-5">Our Current Leader</h2>
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 text-center" data-aos="zoom-in">
              <div className="card border-0 shadow-lg p-4">
                <img
                  src="/assets/images/CALEB.jpg"
                  alt="Caleb Esere"
                  className="img-fluid rounded-circle mb-4"
                  style={{ maxWidth: "200px", margin: "0 auto" }}
                />
                <h4 className="card-title mb-2">Caleb Esere</h4>
                <p className="text-secondary mb-3">
                  <strong>Discipleship Coordinator</strong>
                </p>
                <p className="card-text text-muted">
                  Providing visionary leadership and spiritual oversight for the Discipleship Committee, guiding members through every stage of their faith journey from new belief to mature discipleship and servant leadership.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-5 cta-section text-white">
        <div className="container">
          <div className="text-center mb-5" data-aos="zoom-in">
            <h2 className="section-title text-white mb-3">
              Join the Discipleship Committee!
            </h2>
            <p className="lead text-white-50">
              Whether you&apos;re a new believer seeking guidance or a mature disciple ready to invest in others, there&apos;s a place for you in one of our pathways.
            </p>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8" data-aos="fade-up" data-aos-delay="200">
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label text-white">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    placeholder="Please enter your full name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-white">
                    Your Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Please enter your university email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="areaOfInterest" className="form-label text-white">
                    Which pathway interests you?
                  </label>
                  <select
                    className="form-select"
                    id="areaOfInterest"
                    required
                    value={areaOfInterest}
                    onChange={(e) => setAreaOfInterest(e.target.value)}
                  >
                    <option value="" disabled>
                      Select a pathway
                    </option>
                    <option>Nurturing Program</option>
                    <option>Years Fellowships</option>
                    <option>Accountability Groups</option>
                    <option>Discipleship Classes</option>
                    <option>General Interest</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="joinMessage" className="form-label text-white">
                    Tell us about your interests (Optional)
                  </label>
                  <textarea
                    className="form-control"
                    id="joinMessage"
                    rows={3}
                    placeholder="Share what draws you to this ministry..."
                    value={joinMessage}
                    onChange={(e) => setJoinMessage(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Submit Interest
                </button>
              </form>
              {showSuccess && (
                <div
                  className="mt-3 alert alert-success d-flex justify-content-between align-items-center"
                  role="alert"
                >
                  <span>
                    Thank you for your interest! We&apos;ll get in touch with you soon.
                  </span>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={hide}
                    aria-label="Close"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="row mt-5 justify-content-center">
            <div className="col-md-4 text-center" data-aos="fade-up" data-aos-delay="300">
              <Link to="/ministries" className="btn btn-primary btn-lg">
                View All Ministries <i className="fas fa-arrow-right ms-2" />
              </Link>
            </div>
            <div className="col-md-4 text-center" data-aos="fade-up" data-aos-delay="400">
              <Link to="/events" className="btn btn-secondary btn-lg">
                Upcoming Events <i className="fas fa-calendar ms-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DiscipleshipCommitteePage;
