import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTimedSuccess } from '../../hooks/useTimedSuccess'
import '../../assets/mut/css/missions-evangelism.css'

const MissionsEvangelismMinistryPage = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [areaOfInterest, setAreaOfInterest] = useState('')
  const [experience, setExperience] = useState('')
  const { visible: showSuccess, trigger: showSuccessMessage } = useTimedSuccess(5000)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!fullName || !email || !areaOfInterest) return

    console.log('Missions & Evangelism Join Interest:', {
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
    <div className="missions-ministry-page">
      {/* Hero */}
      <section
        className="page-hero-section"
        style={{ backgroundImage: "url('/assets/images/missions-evangelism-hero.jpg')" }}
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
            <div className="col-lg-5 text-center mb-4 mb-lg-0">
              <img
                src="/assets/images/john-kimani.jpg"
                alt="John Kimani"
                className="img-fluid rounded-circle"
                data-aos="zoom-in"
              />
              <h3 className="mt-3">John Kimani</h3>
              <p className="text-muted">Missions &amp; Evangelism Coordinator</p>
            </div>
            <div className="col-lg-7">
              <h2 className="section-title" data-aos="fade-right">
                About the Missions &amp; Evangelism Ministry
              </h2>
              <p data-aos="fade-right" data-aos-delay="100">
                The Missions &amp; Evangelism Ministry is committed to fulfilling the Great Commission by spreading the Gospel and
                engaging in community outreach. We organize evangelistic crusades, missions trips, and outreach programs to share
                God&apos;s love both on and off campus.
              </p>
              <p data-aos="fade-right" data-aos-delay="200">
                Aligned with MUTCU&apos;s mission, we aim to reach the lost, disciple new believers, and support community
                development through service projects, reflecting our call to love and serve as Jesus did.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Outreach Programs */}
      <section className="sub-ministries-section">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">
            Our Outreach Programs
          </h2>
          <p className="lead text-center" data-aos="fade-up" data-aos-delay="100">
            Explore the various ways we engage in missions and evangelism.
          </p>
          <div className="row">
            {/* Evangelistic Crusades */}
            <div className="col-md-6 col-lg-3 mb-4" data-aos="fade-up" data-aos-delay="200">
              <div className="sub-ministry-card">
                <div className="card-body text-center">
                  <i className="fas fa-church choir-icon mb-3" />
                  <h4 className="card-title">Evangelistic Crusades</h4>
                  <p className="card-text">Large-scale events to preach the Gospel and invite salvation.</p>
                  <h6>Activities</h6>
                  <ul>
                    <li>Open-air preaching</li>
                    <li>Music and worship</li>
                    <li>Follow-up discipleship</li>
                  </ul>
                  <p className="text-muted">
                    <i className="fas fa-clock me-2" /> Quarterly, dates vary
                  </p>
                </div>
              </div>
            </div>

            {/* Missions Trips */}
            <div className="col-md-6 col-lg-3 mb-4" data-aos="fade-up" data-aos-delay="300">
              <div className="sub-ministry-card">
                <div className="card-body text-center">
                  <i className="fas fa-globe band-icon mb-3" />
                  <h4 className="card-title">Missions Trips</h4>
                  <p className="card-text">Trips to underserved areas for evangelism and service.</p>
                  <h6>Activities</h6>
                  <ul>
                    <li>Community outreach</li>
                    <li>Building projects</li>
                    <li>Teaching and training</li>
                  </ul>
                  <p className="text-muted">
                    <i className="fas fa-clock me-2" /> Annually, during breaks
                  </p>
                </div>
              </div>
            </div>

            {/* Community Outreach */}
            <div className="col-md-6 col-lg-3 mb-4" data-aos="fade-up" data-aos-delay="400">
              <div className="sub-ministry-card">
                <div className="card-body text-center">
                  <i className="fas fa-hands-helping praise-icon mb-3" />
                  <h4 className="card-title">Community Outreach</h4>
                  <p className="card-text">Local initiatives to serve and share the Gospel.</p>
                  <h6>Activities</h6>
                  <ul>
                    <li>Food and clothing drives</li>
                    <li>Health awareness campaigns</li>
                    <li>Evangelism walks</li>
                  </ul>
                  <p className="text-muted">
                    <i className="fas fa-clock me-2" /> Monthly, weekends
                  </p>
                </div>
              </div>
            </div>

            {/* Discipleship Teams */}
            <div className="col-md-6 col-lg-3 mb-4" data-aos="fade-up" data-aos-delay="500">
              <div className="sub-ministry-card">
                <div className="card-body text-center">
                  <i className="fas fa-users instrumentalists-icon mb-3" />
                  <h4 className="card-title">Discipleship Teams</h4>
                  <p className="card-text">Teams to mentor new believers post-evangelism.</p>
                  <h6>Activities</h6>
                  <ul>
                    <li>One-on-one mentoring</li>
                    <li>Small group sessions</li>
                    <li>Spiritual growth support</li>
                  </ul>
                  <p className="text-muted">
                    <i className="fas fa-clock me-2" /> Ongoing, weekly meetings
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
          <p className="lead text-center" data-aos="fade-up" data-aos-delay="100">
            Join us for impactful missions and evangelism events.
          </p>
          <div className="row">
            <div className="col-md-4 mb-4" data-aos="zoom-in" data-aos-delay="200">
              <div className="event-highlight-card">
                <div className="card-body text-center">
                  <i className="fas fa-microphone event-icon" />
                  <h5 className="card-title">Crusade Revival</h5>
                  <p className="card-text">A powerful revival crusade to reach the community.</p>
                  <p className="text-muted">
                    <i className="fas fa-calendar-alt me-2" /> 15th September 2025
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4" data-aos="zoom-in" data-aos-delay="300">
              <div className="event-highlight-card">
                <div className="card-body text-center">
                  <i className="fas fa-plane event-icon" />
                  <h5 className="card-title">Missions Trip</h5>
                  <p className="card-text">Trip to a rural area for evangelism and service.</p>
                  <p className="text-muted">
                    <i className="fas fa-calendar-alt me-2" /> 20th-27th October 2025
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4" data-aos="zoom-in" data-aos-delay="400">
              <div className="event-highlight-card">
                <div className="card-body text-center">
                  <i className="fas fa-heart event-icon" />
                  <h5 className="card-title">Community Service Day</h5>
                  <p className="card-text">Day of service and Gospel sharing in Murang&apos;a.</p>
                  <p className="text-muted">
                    <i className="fas fa-calendar-alt me-2" /> 25th November 2025
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
            Led by passionate leaders, our ministry thrives.
          </p>
          <div className="row justify-content-center">
            <div className="col-md-4 col-lg-3 mb-4" data-aos="zoom-in">
              <div className="executive-member-card">
                <img
                  src="/assets/images/john-kimani.jpg"
                  alt="John Kimani"
                  className="img-fluid rounded-circle mb-2 border-orange"
                />
                <h5 className="member-name">John Kimani</h5>
                <p className="member-role">Missions &amp; Evangelism Coordinator</p>
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
            Join Our Missions &amp; Evangelism Ministry!
          </h2>
          <p className="lead text-center" data-aos="fade-up" data-aos-delay="100">
            If you are passionate about sharing the Gospel and serving, join us!
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
                    <option>Evangelistic Crusades</option>
                    <option>Missions Trips</option>
                    <option>Community Outreach</option>
                    <option>Discipleship Teams</option>
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
                  Thank you for your interest in the Missions &amp; Evangelism Ministry! We&apos;ll get in touch with you soon.
                </div>
              )}
            </div>
          </div>
          <div className="row mt-4 justify-content-center">
            <div className="col-md-4 text-center" data-aos="fade-up" data-aos-delay="300">
              <Link to="/" className="btn btn-primary">
                Volunteer for a Mission
              </Link>
            </div>
            <div className="col-md-4 text-center" data-aos="fade-up" data-aos-delay="400">
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
            <div className="col-md-3 mb-4" data-aos="zoom-in" data-aos-delay="100">
              <img
                src="/assets/images/missions-trip.jpg"
                alt="Missions Trip"
                className="img-fluid rounded"
              />
              <p className="text-center mt-2">Missions Trip</p>
            </div>
            <div className="col-md-3 mb-4" data-aos="zoom-in" data-aos-delay="200">
              <img
                src="/assets/images/community-outreach.jpg"
                alt="Community Outreach"
                className="img-fluid rounded"
              />
              <p className="text-center mt-2">Community Outreach</p>
            </div>
            <div className="col-md-3 mb-4" data-aos="zoom-in" data-aos-delay="300">
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
  )
}

export default MissionsEvangelismMinistryPage
