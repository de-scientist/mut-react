import { type FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTimedSuccess } from '../../hooks/useTimedSuccess'
import '../../assets/mut/css/bible-study.css'

const BibleStudyMinistryPage = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [areaOfInterest, setAreaOfInterest] = useState('')
  const [experience, setExperience] = useState('')
  const { visible: showSuccess, trigger: showSuccessMessage } = useTimedSuccess(5000)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!fullName || !email || !areaOfInterest) return

    console.log('Bible Study & Discipleship Join Interest:', {
      fullName,
      email,
      areaOfInterest,
      experience,
    })

    setFullName('')
    setEmail('')
    setAreaOfInterest('')
    setExperience('')
    showSuccessMessage()
  }

  return (
    <div className="bible-study-ministry-page">
      {/* Hero */}
      <section
        className="page-hero-section"
        style={{ backgroundImage: "url('/assets/images/bible-study-hero.jpg')" }}
        data-aos="fade-in"
      >
        <div className="hero-overlay" />
        <div className="container">
          <h1 data-aos="fade-up">MUTCU Bible Study &amp; Discipleship Ministry</h1>
          <p className="lead" data-aos="fade-up" data-aos-delay="100">
            Deepening Faith Through God&apos;s Word and Nurturing Growth
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="ministry-intro-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 text-center mb-4 mb-lg-0">
              <img
                src="/assets/images/purity-njeri.jpg"
                alt="Purity Njeri"
                className="img-fluid rounded-circle"
                data-aos="zoom-in"
              />
              <h3 className="mt-3">Purity Njeri</h3>
              <p className="text-muted">Bible Study &amp; Discipleship Coordinator</p>
            </div>
            <div className="col-lg-7">
              <h2 className="section-title" data-aos="fade-right">
                About the Bible Study &amp; Discipleship Ministry
              </h2>
              <p data-aos="fade-right" data-aos-delay="100">
                The Bible Study, Discipleship &amp; BEST-P Ministry is dedicated to equipping MUTCU members with a deeper
                understanding of the Holy Scripture and building spiritual maturity. This ministry runs various programs,
                including small group Bible studies, nurturing classes for new believers, and intensive training like BEST-P.
              </p>
              <p data-aos="fade-right" data-aos-delay="200">
                Our aim is to deepen and strengthen the spiritual life of members through Bible study, prayer, and fellowship,
                ensuring they are grounded in biblical truths and apply them in daily lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Discipleship programs */}
      <section className="sub-ministries-section">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">
            Our Discipleship Programs
          </h2>
          <p className="lead text-center" data-aos="fade-up" data-aos-delay="100">
            The ministry offers structured programs to foster spiritual growth.
          </p>
          <div className="row">
            {/* Bible Study Groups */}
            <div className="col-md-6 col-lg-3 mb-4" data-aos="fade-up" data-aos-delay="200">
              <div className="sub-ministry-card">
                <div className="card-body text-center">
                  <i className="fas fa-book-open choir-icon mb-3" />
                  <h4 className="card-title">Bible Study Groups</h4>
                  <p className="card-text">Small groups for in-depth Bible study and application.</p>
                  <h6>Activities</h6>
                  <ul>
                    <li>Weekly discussions using official guides</li>
                    <li>Personal application of scripture</li>
                    <li>Fellowship and prayer</li>
                  </ul>
                  <p className="text-muted">
                    <i className="fas fa-clock me-2" /> Mondays, 7:00 PM - 9:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Nurturing Classes */}
            <div className="col-md-6 col-lg-3 mb-4" data-aos="fade-up" data-aos-delay="300">
              <div className="sub-ministry-card">
                <div className="card-body text-center">
                  <i className="fas fa-seedling band-icon mb-3" />
                  <h4 className="card-title">Nurturing Classes</h4>
                  <p className="card-text">Classes to ground new believers in faith foundations.</p>
                  <h6>Activities</h6>
                  <ul>
                    <li>Teachings on basic Christian principles</li>
                    <li>Discussions and Q&amp;A</li>
                    <li>Spiritual mentorship</li>
                  </ul>
                  <p className="text-muted">
                    <i className="fas fa-clock me-2" /> Thursdays, 7:00 PM - 9:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* BEST-P */}
            <div className="col-md-6 col-lg-3 mb-4" data-aos="fade-up" data-aos-delay="400">
              <div className="sub-ministry-card">
                <div className="card-body text-center">
                  <i className="fas fa-graduation-cap praise-icon mb-3" />
                  <h4 className="card-title">BEST-P Program</h4>
                  <p className="card-text">Intensive Bible exposition training for deeper understanding.</p>
                  <h6>Activities</h6>
                  <ul>
                    <li>11-week curriculum on scripture exposition</li>
                    <li>Practical assignments and discussions</li>
                    <li>Equipping for ministry</li>
                  </ul>
                  <p className="text-muted">
                    <i className="fas fa-clock me-2" /> Sundays, 2:00 PM - 4:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Baptism */}
            <div className="col-md-6 col-lg-3 mb-4" data-aos="fade-up" data-aos-delay="500">
              <div className="sub-ministry-card">
                <div className="card-body text-center">
                  <i className="fas fa-water instrumentalists-icon mb-3" />
                  <h4 className="card-title">Baptism</h4>
                  <p className="card-text">Public declaration of faith through baptism.</p>
                  <h6>Activities</h6>
                  <ul>
                    <li>Preparation classes</li>
                    <li>Baptism ceremony</li>
                    <li>Follow-up discipleship</li>
                  </ul>
                  <p className="text-muted">
                    <i className="fas fa-clock me-2" /> Once per spiritual year
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
            Featured Events
          </h2>
          <p className="lead text-center" data-aos="fade-up" data-aos-delay="100">
            The ministry hosts events to enhance biblical understanding and discipleship.
          </p>
          <div className="row">
            <div className="col-md-4 mb-4" data-aos="zoom-in" data-aos-delay="200">
              <div className="event-highlight-card">
                <div className="card-body text-center">
                  <i className="fas fa-book event-icon" />
                  <h5 className="card-title">Bible Study Exposition</h5>
                  <p className="card-text">In-depth exposition of scripture themes.</p>
                  <p className="text-muted">
                    <i className="fas fa-calendar-alt me-2" /> Next Date: 5th September
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4" data-aos="zoom-in" data-aos-delay="300">
              <div className="event-highlight-card">
                <div className="card-body text-center">
                  <i className="fas fa-user-graduate event-icon" />
                  <h5 className="card-title">Discipleship Training</h5>
                  <p className="card-text">Workshops on practical Christian living.</p>
                  <p className="text-muted">
                    <i className="fas fa-calendar-alt me-2" /> Frequency: Semesterly
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4" data-aos="zoom-in" data-aos-delay="400">
              <div className="event-highlight-card">
                <div className="card-body text-center">
                  <i className="fas fa-bible event-icon" />
                  <h5 className="card-title">The Father of Faith Exposition</h5>
                  <p className="card-text">Special series on faith from scripture.</p>
                  <p className="text-muted">
                    <i className="fas fa-calendar-alt me-2" /> Next Date: 7th December
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
          <p className="lead text-center" data-aos="fade-up" data-aos-delay="100">
            Guided by dedicated leadership, our Bible Study &amp; Discipleship Ministry thrives.
          </p>
          <div className="row justify-content-center">
            <div className="col-md-4 col-lg-3 mb-4" data-aos="zoom-in">
              <div className="executive-member-card">
                <img
                  src="/assets/images/purity-njeri.jpg"
                  alt="Purity Njeri"
                  className="img-fluid rounded-circle mb-2 border-orange"
                />
                <h5 className="member-name">Purity Njeri</h5>
                <p className="member-role">Bible Study &amp; Discipleship Coordinator</p>
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
            Join Our Bible Study &amp; Discipleship Ministry!
          </h2>
          <p className="lead text-center" data-aos="fade-up" data-aos-delay="100">
            If you have a passion for God&apos;s Word and discipling others, we invite you to join.
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
                    <option>Bible Study Groups</option>
                    <option>Nurturing Classes</option>
                    <option>BEST-P Program</option>
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
                  Thank you for your interest in the Bible Study &amp; Discipleship Ministry! We&apos;ll get in touch with you soon.
                </div>
              )}
            </div>
          </div>
          <div className="row mt-4 justify-content-center">
            <div className="col-md-4 text-center" data-aos="fade-up" data-aos-delay="300">
              <Link to="/ministries" className="btn btn-primary">
                Join a Bible Study Group
              </Link>
            </div>
            <div className="col-md-4 text-center" data-aos="fade-up" data-aos-delay="400">
              <Link to="/events" className="btn btn-secondary">
                View Discipleship Events
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
            <div className="col-md-3 mb-4" data-aos="zoom-in" data-aos-delay="100">
              <img
                src="/assets/images/nurturing-class.jpg"
                alt="Nurturing Class"
                className="img-fluid rounded"
              />
              <p className="text-center mt-2">Nurturing Class</p>
            </div>
            <div className="col-md-3 mb-4" data-aos="zoom-in" data-aos-delay="200">
              <img
                src="/assets/images/best-p.jpg"
                alt="BEST-P Program"
                className="img-fluid rounded"
              />
              <p className="text-center mt-2">BEST-P Training</p>
            </div>
            <div className="col-md-3 mb-4" data-aos="zoom-in" data-aos-delay="300">
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
  )
}

export default BibleStudyMinistryPage
