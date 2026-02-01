import { Link } from "react-router-dom";
import "../../assets/mut/css/technical-ministry.css";

const TechnicalDepartmentPage = () => {
  return (
    <div className="technical-department-page">
      <section
        className="page-hero-section d-flex align-items-center text-center text-white"
        style={{ backgroundImage: "url('/assets/images/mbbc1.jpg')" }}
      >
        <div className="hero-overlay" />
        <div
          className="container position-relative"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h1 className="display-3 mb-3">MUTCU Technical Department</h1>
          <p className="lead">
            Supporting Worship Through Technology and Service
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
              <h2 className="section-title text-start">
                About the Technical &amp; Media Ministry
              </h2>
              <div className="mb-4">
                <h5 className="text-secondary mb-3">Mandate</h5>
                <p>
                  To provide excellent and seamless technical and media support for all CU activities and to manage the Union's digital presence effectively.
                </p>
              </div>
              <div className="mb-4">
                <h5 className="text-secondary mb-3">Our Mission</h5>
                <p className="lead">
                  The Technical &amp; Media Ministry ensures that all technical aspects of MUTCU's services and events—including sound, visuals, live streaming, publicity, and digital communication—are executed with excellence, supporting the worship experience and enhancing our outreach impact.
                </p>
              </div>
              <div>
                <h5 className="text-secondary mb-3">Our Commitment</h5>
                <ul>
                  <li>Maintaining high technical quality in all productions</li>
                  <li>Ensuring consistent and positive brand identity online</li>
                  <li>Training and equipping technical volunteers</li>
                  <li>Supporting worship, events, and evangelism through excellent technical service</li>
                </ul>
              </div>
            </div>
            <div
              className="col-lg-5 text-center"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <img
                src="/assets/images/mbbc1.jpg"
                alt="Technical Department"
                className="img-fluid rounded-3 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light sub-ministries-section">
        <div className="container">
          <h2 className="section-title text-center">Our Technical Sub-Ministries</h2>
          <p className="text-center lead mb-5">
            The ministry comprises four specialized sub-committees, each with distinct technical responsibilities.
          </p>
          <div className="row">
            <div
              className="col-md-6 col-lg-3 mb-4"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="sub-ministry-card p-4 rounded-3 shadow-sm h-100">
                <i className="fas fa-volume-up feature-icon mb-3" />
                <h4 className="card-title">Sound Ministry</h4>
                <p>Manages all audio equipment, sound engineering, sermon recording, and technician training for services and events.</p>
                <h6>Responsibilities:</h6>
                <ul className="small">
                  <li>Sound system setup &amp; operation</li>
                  <li>Sermon recording &amp; archiving</li>
                  <li>Equipment maintenance</li>
                </ul>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-3 mb-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="sub-ministry-card p-4 rounded-3 shadow-sm h-100">
                <i className="fas fa-hand-holding-heart feature-icon mb-3" />
                <h4 className="card-title">Ushering Ministry</h4>
                <p>Leads the ushering team, creates a welcoming atmosphere, manages seating, and oversees offering collection during services.</p>
                <h6>Responsibilities:</h6>
                <ul className="small">
                  <li>Guest reception &amp; seating</li>
                  <li>Offering management</li>
                  <li>Service flow coordination</li>
                </ul>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-3 mb-4"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="sub-ministry-card p-4 rounded-3 shadow-sm h-100">
                <i className="fas fa-bullhorn feature-icon mb-3" />
                <h4 className="card-title">Publicity (MBBC) Ministry</h4>
                <p>Publicizes all CU events, maintains publicity assets, and ensures consistent brand communication and promotion.</p>
                <h6>Responsibilities:</h6>
                <ul className="small">
                  <li>Event promotion &amp; marketing</li>
                  <li>Publicity material creation</li>
                  <li>Brand consistency</li>
                </ul>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-3 mb-4"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="sub-ministry-card p-4 rounded-3 shadow-sm h-100">
                <i className="fas fa-globe feature-icon mb-3" />
                <h4 className="card-title">Digital Ministry</h4>
                <p>Manages website, social media platforms, live streaming operations, and digital content creation for the CU.</p>
                <h6>Responsibilities:</h6>
                <ul className="small">
                  <li>Website management</li>
                  <li>Social media &amp; livestreaming</li>
                  <li>Digital content production</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 cta-section text-white">
        <div className="container text-center" data-aos="zoom-in">
          <h2 className="section-title text-white">
            Join the Technical &amp; Media Ministry!
          </h2>
          <p className="lead mb-4 text-white-50">
            If you have technical skills or passion for supporting ministry through sound, visuals, digital media, or hospitality, we invite you to join our team.
          </p>
          <div className="row justify-content-center">
            <div className="col-md-8 text-center">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <Link to="/contact" className="btn btn-primary btn-lg w-100">
                    Submit Interest <i className="fas fa-hand-fist ms-2" />
                  </Link>
                </div>
                <div className="col-md-6 mb-3">
                  <Link to="/ministries" className="btn btn-secondary btn-lg w-100">
                    View All Ministries <i className="fas fa-church ms-2" />
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

export default TechnicalDepartmentPage;
