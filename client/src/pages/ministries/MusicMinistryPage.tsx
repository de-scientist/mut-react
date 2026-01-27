import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useTimedSuccess } from "../../hooks/useTimedSuccess";
import "../../assets/mut/css/music-ministry.css";

const MusicMinistryPage = () => {
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

    console.log("Music Ministry Join Request Submitted:", {
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
    <div className="music-ministry-page">
      {/* Hero */}
      <section
        className="page-hero-section d-flex align-items-center text-center text-white"
        style={{ backgroundImage: "url('/assets/images/music1.jpg')" }}
      >
        <div className="hero-overlay" />
        <div
          className="container position-relative"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h1 className="display-3 mb-3">MUTCU Music Ministry</h1>
          <p className="lead">
            Leading Worship and Glorifying God Through Song
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
                About the Music Ministry
              </h2>
              <div className="mb-4">
                <h5 className="text-secondary mb-3">Mandate</h5>
                <p>
                  To lead the congregation in authentic, biblical, and excellent worship through music.
                </p>
              </div>
              <div className="mb-4">
                <h5 className="text-secondary mb-3">Our Mission</h5>
                <p className="lead">
                  The Music Ministry of MUTCU is dedicated to leading the Union in vibrant and spiritually uplifting worship experiences. Through multiple music teams including the choir, band, praise and worship leaders, and instrumentalists, we create an atmosphere where members can connect with God and express their faith through song.
                </p>
              </div>
              <div>
                <h5 className="text-secondary mb-3">Our Commitment</h5>
                <ul>
                  <li>Ensuring theological depth and doctrinal soundness in all worship</li>
                  <li>Maintaining excellence in musical quality and presentation</li>
                  <li>Using music as a powerful tool for worship, evangelism, and edification</li>
                  <li>Developing musicians and worship leaders for ministry impact</li>
                </ul>
              </div>
            </div>
            <div
              className="col-lg-5 text-center"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <img
                src="/assets/images/music1.jpg"
                alt="Music Ministry Performance"
                className="img-fluid rounded-3 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Ensembles */}
      <section className="py-5 bg-light sub-ministries-section">
        <div className="container">
          <h2 className="section-title text-center">Our Music Sub-Ministries</h2>
          <p className="text-center lead mb-5">
            The Music Ministry comprises four sub-committees, each dedicated to a specific aspect of worship and musical excellence.
          </p>

          <div className="row">
            {/* Choir */}
            <div
              className="col-lg-6 mb-4"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="sub-ministry-card p-4 rounded-3 shadow-sm h-100">
                <div className="card-image-container mb-4">
                  <img
                    src="/assets/images/music1.jpg"
                    alt="MUTCU Choir"
                    className="img-fluid rounded-3"
                  />
                </div>
                <div className="d-flex align-items-center mb-3">
                  <i className="fas fa-users-line choir-icon me-3" />
                  <h3 className="card-title mb-0">Choir</h3>
                </div>
                <p>
                  The MUTCU Choir leads congregational singing and presents
                  special hymns and contemporary worship songs. They are
                  dedicated to vocal excellence and harmonious praise, enhancing
                  our services.
                </p>
                <h6>Activities:</h6>
                <ul>
                  <li>
                    Weekly rehearsals for Sunday services and special events.
                  </li>
                  <li>Learning new songs and arrangements.</li>
                  <li>
                    Performing during weekly fellowships and major Union events.
                  </li>
                </ul>
                <p className="mb-0 text-muted">
                  <i className="fas fa-clock me-2" />
                  <b>Meeting Times:</b> Sundays, 2:00 PM - 4:00 PM (Room 7) -
                  Other times confirmed weekly.
                </p>
              </div>
            </div>

            {/* Praise and Worship */}
            <div
              className="col-lg-6 mb-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="sub-ministry-card p-4 rounded-3 shadow-sm h-100">
                <div className="card-image-container mb-4">
                  <img
                    src="/assets/images/music1.jpg"
                    alt="Praise and Worship"
                    className="img-fluid rounded-3"
                  />
                </div>
                <div className="d-flex align-items-center mb-3">
                  <i className="fas fa-microphone-alt praise-icon me-3" />
                  <h3 className="card-title mb-0">Praise and Worship</h3>
                </div>
                <p>
                  The team leads the congregation in contemporary worship songs,
                  cultivating an energetic and intimate atmosphere of praise.
                </p>
                <h6>Activities:</h6>
                <ul>
                  <li>Vocal practice and harmony training sessions.</li>
                  <li>
                    Leading praise and worship during weekly fellowships and
                    Sunday services.
                  </li>
                  <li>
                    Preparing worship sets for special events like MULEWO and
                    Praise Fests.
                  </li>
                </ul>
                <p className="mb-0 text-muted">
                  <i className="fas fa-clock me-2" />
                  <b>Meeting Times:</b> Tuesday, 7:00 PM - 9:00 PM (Tuition
                  Block).
                </p>
              </div>
            </div>

            {/* Band */}
            <div
              className="col-lg-6 mb-4"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="sub-ministry-card p-4 rounded-3 shadow-sm h-100">
                <div className="card-image-container mb-4">
                  <img
                    src="/assets/images/music1.jpg"
                    alt="MUTCU Band"
                    className="img-fluid rounded-3"
                  />
                </div>
                <div className="d-flex align-items-center mb-3">
                  <i className="fas fa-drum band-icon me-3" />
                  <h3 className="card-title mb-0">Band</h3>
                </div>
                <p>
                  The Band forms the core instrumental support, providing the
                  primary rhythm and melodic foundation for corporate worship.
                </p>
                <h6>Activities:</h6>
                <ul>
                  <li>Regular practice sessions for band members.</li>
                  <li>
                    Providing instrumental backing for the Praise and Worship
                    team.
                  </li>
                  <li>
                    Performing during weekly fellowships and special events.
                  </li>
                </ul>
                <p className="mb-0 text-muted">
                  <i className="fas fa-clock me-2" />
                  <b>Meeting Times:</b> Thursday, 7:00 PM - 9:00 PM (Music
                  Room).
                </p>
              </div>
            </div>

            {/* Instrumentalists */}
            <div
              className="col-lg-6 mb-4"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="sub-ministry-card p-4 rounded-3 shadow-sm h-100">
                <div className="card-image-container mb-4">
                  <img
                    src="/assets/images/music1.jpg"
                    alt="Instrumentalists"
                    className="img-fluid rounded-3"
                  />
                </div>
                <div className="d-flex align-items-center mb-3">
                  <i className="fas fa-guitar instrumentalist-icon me-3" />
                  <h3 className="card-title mb-0">Instrumentalists</h3>
                </div>
                <p>
                  This group includes individuals who play various instruments
                  to support different ministry activities and events.
                </p>
                <h6>Activities:</h6>
                <ul>
                  <li>Providing music for fellowships or special occasions.</li>
                  <li>Collaborating with other ministries for events.</li>
                  <li>Mentoring aspiring musicians in the Union.</li>
                </ul>
                <p className="mb-0 text-muted">
                  <i className="fas fa-clock me-2" />
                  <b>Meeting Times:</b> Wednesdays, 7:00 PM - 9:00 PM (Room 15).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-5 key-events-section text-white">
        <div className="container">
          <h2 className="section-title text-center text-white">
            Featured Events
          </h2>
          <p className="text-center lead mb-5 text-white-50">
            The Music Ministry plays a vital role in some of MUTCU&apos;s most
            anticipated events.
          </p>
          <div className="row justify-content-center">
            <div
              className="col-md-6 col-lg-4 mb-4"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <div className="event-highlight-card p-4 rounded-3 shadow-sm h-100">
                <i className="fas fa-star event-icon mb-3" />
                <h4 className="card-title">Praise Fest</h4>
                <p>
                  A special service dedicated to high-energy praise and worship,
                  featuring ministrations from all Music Ministry teams.
                </p>
                <p className="mb-0 text-muted">
                  <i className="fas fa-calendar-alt me-2" /> Next Date: 7th
                  November.
                </p>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-4 mb-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="event-highlight-card p-4 rounded-3 shadow-sm h-100">
                <i className="fas fa-holly-berry event-icon mb-3" />
                <h4 className="card-title">Christmas Cantata</h4>
                <p>
                  A collaborative worship experience with the Creative Arts
                  Ministry, celebrating the birth of Jesus through a blend of
                  music and drama.
                </p>
                <p className="mb-0 text-muted">
                  <i className="fas fa-calendar-alt me-2" /> Next Date: 12th
                  December.
                </p>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-4 mb-4"
              data-aos="fade-left"
              data-aos-delay="300"
            >
              <div className="event-highlight-card p-4 rounded-3 shadow-sm h-100">
                <i className="fas fa-hand-holding-heart event-icon mb-3" />
                <h4 className="card-title">Worship Experiences</h4>
                <p>
                  Special worship services held throughout the semester,
                  providing opportunities for deep spiritual worship.
                </p>
                <p className="mb-0 text-muted">
                  <i className="fas fa-calendar-alt me-2" /> Frequency: Weekly
                  (Friday Services).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-5 leadership-spotlight-section text-white">
        <div className="container text-center" data-aos="zoom-in">
          <h2 className="section-title text-white">Key Responsibilities</h2>
          <p className="lead mb-4 text-white-50">
            The Music Coordinator provides executive oversight and spiritual direction for all music ministry activities.
          </p>
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4 mb-4">
              <div className="leadership-card bg-white text-dark rounded-3 shadow-sm p-4 h-100">
                <h5 className="card-title"><i className="fas fa-check-circle text-success me-2"></i>Spiritual Direction</h5>
                <p>Providing spiritual and artistic leadership for the entire music ministry</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-4">
              <div className="leadership-card bg-white text-dark rounded-3 shadow-sm p-4 h-100">
                <h5 className="card-title"><i className="fas fa-check-circle text-success me-2"></i>Quality Assurance</h5>
                <p>Ensuring overall quality, theological depth, and doctrinal soundness of worship</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-4">
              <div className="leadership-card bg-white text-dark rounded-3 shadow-sm p-4 h-100">
                <h5 className="card-title"><i className="fas fa-check-circle text-success me-2"></i>Team Mentoring</h5>
                <p>Mentoring and supporting music team leaders for effective ministry</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-4">
              <div className="leadership-card bg-white text-dark rounded-3 shadow-sm p-4 h-100">
                <h5 className="card-title"><i className="fas fa-check-circle text-success me-2"></i>Coordination</h5>
                <p>Coordinating the overall music schedule and serving as the link to Executive Council</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join section (inline instead of Bootstrap modal JS) */}
      <section className="py-5 cta-section text-white">
        <div className="container text-center" data-aos="zoom-in">
          <h2 className="section-title text-white">Join Our Music Ministry!</h2>
          <p className="lead mb-4 text-white-50">
            If you have a passion for worship through music and want to lead others in encountering God, we invite you to join one of our music sub-ministries.
          </p>
          <div className="row justify-content-center">
            <div className="col-md-8 text-start">
              {!showSuccess && (
                <form
                  onSubmit={handleSubmit}
                  className="needs-validation"
                  noValidate
                >
                  <div className="mb-3">
                    <label htmlFor="joinName" className="form-label">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="joinName"
                      required
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="joinEmail" className="form-label">
                      Your Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="joinEmail"
                      required
                      placeholder="Enter your university email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="joinInterest" className="form-label">
                      Sub-Ministry of Interest
                    </label>
                    <select
                      className="form-select"
                      id="joinInterest"
                      required
                      value={areaOfInterest}
                      onChange={(e) => setAreaOfInterest(e.target.value)}
                    >
                      <option value="" disabled>
                        Select an area
                      </option>
                      <option value="praise-worship">Praise &amp; Worship Ministry</option>
                      <option value="choir">Choir Ministry</option>
                      <option value="band">Band Ministry</option>
                      <option value="outreach">Outreach &amp; Production Ministry</option>
                      <option value="general">General Interest</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="joinMessage" className="form-label">
                      Tell us about your musical experience or passion (Optional)
                    </label>
                    <textarea
                      className="form-control"
                      id="joinMessage"
                      rows={3}
                      placeholder="Share your musical background and why you're interested..."
                      value={joinMessage}
                      onChange={(e) => setJoinMessage(e.target.value)}
                    />
                  </div>
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">
                      Submit Interest
                    </button>
                  </div>
                </form>
              )}
              {showSuccess && (
                <div className="mt-4 text-center">
                  <i className="fas fa-check-circle fa-4x text-teal mb-3 animate-pop-in" />
                  <p className="lead">
                    Thank you for your interest in the Music Ministry!
                    We&apos;ve received your submission and will get in touch
                    with you soon.
                  </p>
                  <button
                    type="button"
                    className="btn btn-outline-light"
                    onClick={hide}
                  >
                    Submit Another Response
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MusicMinistryPage;
