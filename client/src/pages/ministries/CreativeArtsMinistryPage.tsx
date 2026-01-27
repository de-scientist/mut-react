import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useTimedSuccess } from "../../hooks/useTimedSuccess";
import "../../assets/mut/css/creative-arts.css";

const CreativeArtsMinistryPage = () => {
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

    console.log("Creative Arts Ministry Join Request Submitted:", {
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
    <div className="creative-arts-page">
      <section
        className="page-hero-section d-flex align-items-center text-center text-white"
        style={{ backgroundImage: "url('/assets/images/dance3.jpg')" }}
      >
        <div className="hero-overlay" />
        <div
          className="container position-relative"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h1 className="display-3 mb-3">MUTCU Creative Arts Ministry</h1>
          <p className="lead">
            Inspiring Love, Hope &amp; Godliness Through Artistic Expression
          </p>
        </div>
      </section>

      <section className="py-5 ministry-intro-section">
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-lg-7 mb-4 mb-lg-0"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <h2 className="section-title text-start">About the Creative Arts Ministry</h2>
              <div className="mb-4">
                <h5 className="text-secondary mb-3">Mandate</h5>
                <p>
                  To use diverse artistic gifts to glorify God, edify the church, and communicate the gospel in a compelling way.
                </p>
              </div>
              <div className="mb-4">
                <h5 className="text-secondary mb-3">Our Mission</h5>
                <p className="lead">
                  The Creative Arts Ministry uses drama, dance, spoken word, poetry, fine arts, and modeling to express faith and reach our community with the Gospel. We believe that artistic expression is a powerful medium for worship, evangelism, and spiritual growth.
                </p>
              </div>
              <div>
                <h5 className="text-secondary mb-3">Our Focus</h5>
                <ul>
                  <li>Excellence in all creative presentations</li>
                  <li>Biblical soundness in all messaging and content</li>
                  <li>Developing artists as worshippers and witnesses</li>
                  <li>Leading Transformation and Advocacy campaigns</li>
                  <li>Supporting social action and Christian witness</li>
                </ul>
              </div>
            </div>
            <div
              className="col-lg-5 text-center"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <img
                src="/assets/images/dance3.jpg"
                alt="Creative Arts Performance"
                className="img-fluid rounded-3 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light sub-ministries-section">
        <div className="container">
          <h2 className="section-title text-center">Our Creative Arts Sub-Ministries</h2>
          <p className="text-center lead mb-5">
            The Creative Arts Ministry comprises four sub-committees, each dedicated to a unique form of artistic expression and worship.
          </p>

          <div className="row">
            {/* Drama */}
            <div
              className="col-lg-6 mb-4"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="sub-ministry-card p-4 rounded-3 shadow-sm h-100">
                <div className="card-image-container mb-4">
                  <img
                    src="/assets/images/dance3.jpg"
                    alt="Drama Ministry"
                    className="img-fluid rounded-3"
                  />
                </div>
                <div className="d-flex align-items-center mb-3">
                  <i className="fas fa-theater-masks choir-icon me-3" />
                  <h3 className="card-title mb-0">Drama Ministry</h3>
                </div>
                <p>
                  Communicates biblical truths and Christian values through
                  powerful theatrical presentations and character-driven
                  storytelling that moves and transforms audiences.
                </p>
                <h6>Activities:</h6>
                <ul>
                  <li>Scriptwriting and directing original dramas.</li>
                  <li>Character development and acting skill training.</li>
                  <li>Performing during services, events, and special occasions.</li>
                </ul>
                <p className="mb-0 text-muted">
                  <i className="fas fa-clock me-2" />
                  <b>Meeting Times:</b> Wednesdays and Thursdays 7.00pm to 9.00pm.
                </p>
              </div>
            </div>

            {/* Dance */}
            <div
              className="col-lg-6 mb-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="sub-ministry-card p-4 rounded-3 shadow-sm h-100">
                <div className="card-image-container mb-4">
                  <img
                    src="/assets/images/dance3.jpg"
                    alt="Dance Ministry"
                    className="img-fluid rounded-3"
                  />
                </div>
                <div className="d-flex align-items-center mb-3">
                  <i className="fas fa-person-dancing praise-icon me-3" />
                  <h3 className="card-title mb-0">Dance Ministry</h3>
                </div>
                <p>
                  Uses choreographed movements and dynamic physical expression
                  to lead worship, glorify God, and minister to the congregation
                  with artistic excellence.
                </p>
                <h6>Activities:</h6>
                <ul>
                  <li>Worship dance and choreography development.</li>
                  <li>Training and mentoring of dancers.</li>
                  <li>Performing during services and special events.</li>
                </ul>
                <p className="mb-0 text-muted">
                  <i className="fas fa-clock me-2" />
                  <b>Meeting Times:</b> Wednesdays 7.00pm to 9.00pm and Saturdays 4pm to 6pm.
                </p>
              </div>
            </div>

            {/* SPARCS */}
            <div
              className="col-lg-6 mb-4"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="sub-ministry-card p-4 rounded-3 shadow-sm h-100">
                <div className="card-image-container mb-4">
                  <img
                    src="/assets/images/dance3.jpg"
                    alt="SPARCS Ministry"
                    className="img-fluid rounded-3"
                  />
                </div>
                <div className="d-flex align-items-center mb-3">
                  <i className="fas fa-microphone band-icon me-3" />
                  <h3 className="card-title mb-0">SPARCS Ministry</h3>
                </div>
                <p>
                  Spoken Word, Poetry, Arts &amp; Creative Skits - expresses faith
                  through creative writing, poetry, and fine arts presentations
                  that inspire and challenge audiences.
                </p>
                <h6>Activities:</h6>
                <ul>
                  <li>Spoken word poetry and creative writing sessions.</li>
                  <li>Fine arts presentations and exhibitions.</li>
                  <li>Creative skits and performances during events.</li>
                </ul>
                <p className="mb-0 text-muted">
                  <i className="fas fa-clock me-2" />
                  <b>Meeting Times:</b> Tuesdays 7.00pm to 9.00pm.
                </p>
              </div>
            </div>

            {/* Models */}
            <div
              className="col-lg-6 mb-4"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="sub-ministry-card p-4 rounded-3 shadow-sm h-100">
                <div className="card-image-container mb-4">
                  <img
                    src="/assets/images/dance3.jpg"
                    alt="Models Ministry"
                    className="img-fluid rounded-3"
                  />
                </div>
                <div className="d-flex align-items-center mb-3">
                  <i className="fas fa-crown instrumentalist-icon me-3" />
                  <h3 className="card-title mb-0">Models Ministry</h3>
                </div>
                <p>
                  Serves as official ambassadors for MUTCU, promoting Christian
                  character and values through fashion, modeling, and leading
                  transformation and advocacy campaigns.
                </p>
                <h6>Activities:</h6>
                <ul>
                  <li>Mr. &amp; Miss MUTCU leadership and representation.</li>
                  <li>Social action and transformation campaigns.</li>
                  <li>Community advocacy and Christian witness initiatives.</li>
                </ul>
                <p className="mb-0 text-muted">
                  <i className="fas fa-clock me-2" />
                  <b>Meeting Times:</b> Wednesdays 5.00pm to 7.00pm.
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
            Featured Events &amp; Highlights
          </h2>
          <p className="text-center lead mb-5 text-white-50">
            The Creative Arts Ministry plays a vital role in some of MUTCU&apos;s most
            anticipated events and transformation initiatives.
          </p>
          <div className="row justify-content-center">
            <div
              className="col-md-6 col-lg-4 mb-4"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <div className="event-highlight-card p-4 rounded-3 shadow-sm h-100">
                <i className="fas fa-theater-masks event-icon mb-3" />
                <h4 className="card-title">Creative Night</h4>
                <p>
                  A showcase event featuring all creative arts sub-ministries,
                  presenting drama, dance, SPARCS, and modeling performances.
                </p>
                <p className="mb-0 text-muted">
                  <i className="fas fa-calendar-alt me-2" /> Major event showcasing all talents.
                </p>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-4 mb-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="event-highlight-card p-4 rounded-3 shadow-sm h-100">
                <i className="fas fa-heart event-icon mb-3" />
                <h4 className="card-title">Transformation Campaigns</h4>
                <p>
                  Social action and advocacy initiatives led by Models Ministry,
                  using creative expression to promote Christian values and societal change.
                </p>
                <p className="mb-0 text-muted">
                  <i className="fas fa-calendar-alt me-2" /> Throughout the year.
                </p>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-4 mb-4"
              data-aos="fade-left"
              data-aos-delay="300"
            >
              <div className="event-highlight-card p-4 rounded-3 shadow-sm h-100">
                <i className="fas fa-cross event-icon mb-3" />
                <h4 className="card-title">Christmas Cantata</h4>
                <p>
                  A collaborative worship experience with the Music Ministry,
                  celebrating the birth of Jesus through creative drama and artistic expression.
                </p>
                <p className="mb-0 text-muted">
                  <i className="fas fa-calendar-alt me-2" /> December annually.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Committee Leadership */}
      <section className="py-5 roles-responsibilities-section">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">
            Committee Structure &amp; Leadership
          </h2>
          <p
            className="lead text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            The Creative Arts Ministry is structured with dedicated coordinators for each sub-ministry to ensure excellence and biblically sound presentations.
          </p>
          <div className="row">
            <div
              className="col-md-6 col-lg-3 mb-4"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <div className="leadership-card text-center p-4 rounded-3 shadow-sm h-100">
                <i className="fas fa-theater-masks leadership-icon mb-3" />
                <h5 className="card-title">Drama Coordinator</h5>
                <p className="small text-muted">
                  Directs drama productions, oversees scriptwriting, and develops acting skills
                </p>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-3 mb-4"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <div className="leadership-card text-center p-4 rounded-3 shadow-sm h-100">
                <i className="fas fa-person-dancing leadership-icon mb-3" />
                <h5 className="card-title">Dance Coordinator</h5>
                <p className="small text-muted">
                  Leads choreography, ensures theologically appropriate movements, mentors dancers
                </p>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-3 mb-4"
              data-aos="zoom-in"
              data-aos-delay="400"
            >
              <div className="leadership-card text-center p-4 rounded-3 shadow-sm h-100">
                <i className="fas fa-microphone leadership-icon mb-3" />
                <h5 className="card-title">SPARCS Coordinator</h5>
                <p className="small text-muted">
                  Coordinates spoken word, poetry, and fine arts presentations
                </p>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-3 mb-4"
              data-aos="zoom-in"
              data-aos-delay="500"
            >
              <div className="leadership-card text-center p-4 rounded-3 shadow-sm h-100">
                <i className="fas fa-crown leadership-icon mb-3" />
                <h5 className="card-title">Models Ministry</h5>
                <p className="small text-muted">
                  Mr. &amp; Miss MUTCU serve as ambassadors and transformation campaign leaders
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-5 cta-section text-white">
        <div className="container">
          <h2 className="section-title text-center text-white mb-5" data-aos="fade-up">
            Join the Creative Arts Ministry
          </h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <select
                      className="form-select form-select-lg"
                      value={areaOfInterest}
                      onChange={(e) => setAreaOfInterest(e.target.value)}
                    >
                      <option value="">Select Your Interest...</option>
                      <option value="Drama Ministry">Drama Ministry</option>
                      <option value="Dance Ministry">Dance Ministry</option>
                      <option value="SPARCS Ministry">SPARCS Ministry</option>
                      <option value="Models Ministry">Models Ministry</option>
                      <option value="General Interest">General Interest</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <textarea
                      className="form-control form-control-lg"
                      rows={1}
                      placeholder="Tell us about your interest or experience..."
                      value={joinMessage}
                      onChange={(e) => setJoinMessage(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg w-100 mb-3"
                    >
                      Submit Interest <i className="fas fa-arrow-right ms-2" />
                    </button>
                  </div>
                </div>
              </form>

              {showSuccess && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  <i className="fas fa-check-circle me-2" />
                  <strong>Thank you!</strong> We&apos;ve received your interest. The Creative Arts Ministry team will be in touch soon!
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={hide}
                  />
                </div>
              )}

              <div className="row mt-4 text-center">
                <div className="col-md-6 mb-2">
                  <Link to="/ministries" className="btn btn-outline-light btn-lg w-100">
                    View All Ministries <i className="fas fa-arrow-right ms-2" />
                  </Link>
                </div>
                <div className="col-md-6 mb-2">
                  <Link to="/events" className="btn btn-outline-light btn-lg w-100">
                    View Events <i className="fas fa-calendar ms-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreativeArtsMinistryPage;
