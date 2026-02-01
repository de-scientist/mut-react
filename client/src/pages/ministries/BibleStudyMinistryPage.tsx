import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useTimedSuccess } from "../../hooks/useTimedSuccess";
import "../../assets/mut/css/bible-study.css";

const BibleStudyMinistryPage = () => {
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

    console.log("Bible Study & Training Ministry Join Request Submitted:", {
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
    <div className="bible-study-ministry-page">
      {/* Hero */}
      <section
        className="page-hero-section d-flex align-items-center text-center text-white"
        style={{ backgroundImage: "url('/assets/images/bible-study-hero.jpg')" }}
      >
        <div className="hero-overlay" />
        <div
          className="container position-relative"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h1 className="display-3 mb-3">MUTCU Bible Study &amp; Training Ministry</h1>
          <p className="lead">
            Grounding Believers in God&apos;s Word and Building Spiritual Maturity
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
                About the Bible Study &amp; Training Ministry
              </h2>
              <div className="mb-4">
                <h5 className="text-secondary mb-3">Mandate</h5>
                <p>
                  To facilitate the systematic spiritual growth of members through the in-depth study of God&apos;s Word in small groups and structured self-training programs.
                </p>
              </div>
              <div className="mb-4">
                <h5 className="text-secondary mb-3">Our Mission</h5>
                <p className="lead">
                  The Bible Study &amp; Training Ministry is dedicated to deepening the faith of MUTCU members through rigorous engagement with Scripture. We provide multiple pathways for spiritual growth: small group Bible studies for community learning, nurturing classes for new believers, the BEST-P program for those wanting to develop Bible exposition skills, and consistent Bible reading initiatives to foster a culture of personal devotion.
                </p>
              </div>
              <div>
                <h5 className="text-secondary mb-3">Our Commitment</h5>
                <ul>
                  <li>Providing quality Bible study guides and teaching materials</li>
                  <li>Training and mentoring effective Bible study group leaders</li>
                  <li>Promoting consistent personal Bible reading across the CU</li>
                  <li>Equipping members with skills in biblical exposition and interpretation</li>
                </ul>
              </div>
            </div>
            <div
              className="col-lg-5 text-center"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <img
                src="/assets/images/bible-study-group.jpg"
                alt="Bible Study Ministry"
                className="img-fluid rounded-3 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sub-Ministries */}
      <section className="py-5 bg-light sub-ministries-section">
        <div className="container">
          <h2 className="section-title text-center">Our Ministry Programs</h2>
          <p className="text-center lead mb-5">
            Four core programs designed for comprehensive spiritual growth through God&apos;s Word.
          </p>

          <div className="row">
            {/* Small Bible Study Groups */}
            <div
              className="col-lg-6 mb-4"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="sub-ministry-card p-4 rounded-3 shadow-sm h-100">
                <div className="card-image-container mb-4">
                  <img
                    src="/assets/images/bible-study-group.jpg"
                    alt="Small Bible Study Groups"
                    className="img-fluid rounded-3"
                  />
                </div>
                <div className="d-flex align-items-center mb-3">
                  <i className="fas fa-book-open choir-icon me-3" />
                  <h3 className="card-title mb-0">Small Bible Study Groups</h3>
                </div>
                <p>
                  Intimate settings for in-depth exploration of God&apos;s Word. Our small groups provide weekly discussions using official guides, enabling members to understand Scripture deeply and apply it to their lives.
                </p>
                <h6>Key Features:</h6>
                <ul>
                  <li>Weekly meetings in accessible locations</li>
                  <li>Interactive biblical exploration and discussion</li>
                  <li>Personal application and accountability</li>
                  <li>Community fellowship and prayer</li>
                </ul>
                <p className="mb-0 text-muted">
                  <i className="fas fa-calendar-alt me-2" />
                  <b>Meeting Times:</b> Mondays and other designated days
                </p>
              </div>
            </div>

            {/* BEST-P Program */}
            <div
              className="col-lg-6 mb-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="sub-ministry-card p-4 rounded-3 shadow-sm h-100">
                <div className="card-image-container mb-4">
                  <img
                    src="/assets/images/best-p.jpg"
                    alt="BEST-P Program"
                    className="img-fluid rounded-3"
                  />
                </div>
                <div className="d-flex align-items-center mb-3">
                  <i className="fas fa-graduation-cap praise-icon me-3" />
                  <h3 className="card-title mb-0">BEST-P Program</h3>
                </div>
                <p>
                  Bible Exposition Self Training Program for those desiring deeper skills in biblical interpretation and teaching. This structured program trains potential leaders in expositive preaching and teaching methodologies.
                </p>
                <h6>Key Features:</h6>
                <ul>
                  <li>Comprehensive curriculum on scripture exposition</li>
                  <li>Practical assignments and exercises</li>
                  <li>Leadership development and mentorship</li>
                  <li>Graduation recognition and advancement</li>
                </ul>
                <p className="mb-0 text-muted">
                  <i className="fas fa-calendar-alt me-2" />
                  <b>Duration:</b> Structured sessions throughout the year
                </p>
              </div>
            </div>

            {/* Consistent Bible Reading */}
            <div
              className="col-lg-6 mb-4"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="sub-ministry-card p-4 rounded-3 shadow-sm h-100">
                <div className="card-image-container mb-4">
                  <img
                    src="/assets/images/bible-study-group.jpg"
                    alt="Consistent Bible Reading"
                    className="img-fluid rounded-3"
                  />
                </div>
                <div className="d-flex align-items-center mb-3">
                  <i className="fas fa-bookmark band-icon me-3" />
                  <h3 className="card-title mb-0">Consistent Bible Reading</h3>
                </div>
                <p>
                  A program dedicated to fostering daily personal Bible reading habits among members. We provide structured reading plans, devotional resources, and accountability partnerships to sustain a culture of personal devotion.
                </p>
                <h6>Key Features:</h6>
                <ul>
                  <li>Curated reading-plan groups</li>
                  <li>Devotional resources and guides</li>
                  <li>Accountability partnerships for motivation</li>
                  <li>Progress tracking and encouragement</li>
                </ul>
                <p className="mb-0 text-muted">
                  <i className="fas fa-calendar-alt me-2" />
                  <b>Engagement:</b> Daily personal practice
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Committee Structure */}
      <section className="py-5 bg-white roles-responsibilities-section">
        <div className="container">
          <h2 className="section-title text-center">Committee Structure &amp; Leadership</h2>
          <p className="text-center lead mb-5">
            The Bible Study &amp; Training Committee comprises dedicated leaders responsible for oversight of each program.
          </p>
          <div className="row g-4 justify-content-center">
            <div className="col-lg-6 col-md-6" data-aos="fade-up" data-aos-delay="100">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-secondary">
                    <i className="fas fa-chair me-2 text-primary" />
                    Bible Study &amp; Training Coordinator (Chairperson)
                  </h5>
                  <p className="card-text small">
                    Provides oversight and educational leadership for the entire committee. Responsible for the overall strategy and health of small group Bible studies, oversight of BEST-P administration, and championing a culture of consistent personal Bible reading.
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
                    Handles all administrative tasks including minutes, communication, and financial management. Custodian of all committee funds, documents, and assets. Serves as financial advisor to the committee.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6" data-aos="fade-up" data-aos-delay="300">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-secondary">
                    <i className="fas fa-book me-2 text-primary" />
                    Bible Study Coordinator &amp; Assistant
                  </h5>
                  <p className="card-text small">
                    Oversees small Bible study groups, issues study guides, collects contributions, and tracks group meetings. Ensures Bible study leaders are effective and well-trained. Oversees the Monday Bible Study Review at 4:00 PM.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6" data-aos="fade-up" data-aos-delay="400">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-secondary">
                    <i className="fas fa-graduation-cap me-2 text-primary" />
                    BEST-P Coordinator &amp; Assistant
                  </h5>
                  <p className="card-text small">
                    Ensures BEST-P classes run smoothly, selects quality facilitators, manages group formations and assignments, and coordinates the annual BEST-P graduation. Oversees proper record-keeping and attendance.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6" data-aos="fade-up" data-aos-delay="500">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-secondary">
                    <i className="fas fa-bookmark me-2 text-primary" />
                    Consistent Bible Reading Coordinator &amp; Assistant
                  </h5>
                  <p className="card-text small">
                    Develops and promotes strategic plans to encourage daily personal Bible reading across the CU. Manages reading-plan groups, shares devotional resources, tracks engagement, and provides motivation.
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
                  <strong>Bible Study &amp; Training Coordinator</strong>
                </p>
                <p className="card-text text-muted">
                  Providing visionary leadership and spiritual oversight for the Bible Study &amp; Training Ministry, ensuring members are equipped with deep knowledge of God&apos;s Word and committed to consistent personal devotion.
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
              Join the Bible Study &amp; Training Ministry!
            </h2>
            <p className="lead text-white-50">
              Whether you want to deepen your knowledge of Scripture, grow spiritually through community, or develop teaching skills, there&apos;s a place for you in our ministry.
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
                    Which program interests you?
                  </label>
                  <select
                    className="form-select"
                    id="areaOfInterest"
                    required
                    value={areaOfInterest}
                    onChange={(e) => setAreaOfInterest(e.target.value)}
                  >
                    <option value="" disabled>
                      Select a program
                    </option>
                    <option>Small Bible Study Groups</option>
                    <option>BEST-P Program</option>
                    <option>Consistent Bible Reading</option>
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



      {/* Gallery */}
      <section className="py-5 sub-ministries-section">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">
            Ministry Highlights
          </h2>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3" data-aos="zoom-in">
              <img
                src="/assets/images/bible-study-group.jpg"
                alt="Small Bible Study Groups"
                className="img-fluid rounded-3 shadow-sm"
              />
              <p className="text-center mt-3 small"><strong>Small Bible Study Groups</strong></p>
            </div>
            <div className="col-md-6 col-lg-3" data-aos="zoom-in" data-aos-delay="100">
              <img
                src="/assets/images/best-p.jpg"
                alt="BEST-P Program"
                className="img-fluid rounded-3 shadow-sm"
              />
              <p className="text-center mt-3 small"><strong>BEST-P Training</strong></p>
            </div>
            <div className="col-md-6 col-lg-3" data-aos="zoom-in" data-aos-delay="200">
              <img
                src="/assets/images/bible-study-group.jpg"
                alt="Consistent Bible Reading"
                className="img-fluid rounded-3 shadow-sm"
              />
              <p className="text-center mt-3 small"><strong>Personal Reading Groups</strong></p>
            </div>
            <div className="col-md-6 col-lg-3" data-aos="zoom-in" data-aos-delay="300">
              <img
                src="/assets/images/baptism.jpg"
                alt="Baptism Celebration"
                className="img-fluid rounded-3 shadow-sm"
              />
              <p className="text-center mt-3 small"><strong>Baptism Celebration</strong></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BibleStudyMinistryPage;
