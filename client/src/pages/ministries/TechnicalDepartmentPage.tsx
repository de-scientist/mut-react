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
                About the Technical Department
              </h2>
              <p className="lead">
                The Technical Ministry is responsible for all technical aspects
                of MUTCU&apos;s activities, ensuring smooth operations during
                services, events, and online engagements. The ministry includes
                Sound Ministry, Ushering Ministry, MBBC (Media Broadcasting and
                Broadcast Committee), and Digital Ministry.
              </p>
              <p>
                From sound system management to live streaming, publicity, and
                ushering, the Technical Department ensures that all Union
                activities run smoothly and professionally, supporting the
                worship experience and outreach efforts.
              </p>
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
          <h2 className="section-title text-center">Our Technical Teams</h2>
          <p className="text-center lead mb-5">
            The ministry comprises several specialized teams.
          </p>
          <div className="row">
            <div
              className="col-md-6 col-lg-3 mb-4"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="sub-ministry-card p-4 rounded-3 shadow-sm h-100 text-center">
                <i className="fas fa-volume-up feature-icon mb-3" />
                <h4 className="card-title">Sound Ministry</h4>
                <p>Manages audio equipment and sound quality for all events.</p>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-3 mb-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="sub-ministry-card p-4 rounded-3 shadow-sm h-100 text-center">
                <i className="fas fa-user-friends feature-icon mb-3" />
                <h4 className="card-title">Ushering Ministry</h4>
                <p>Welcomes attendees and maintains order during gatherings.</p>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-3 mb-4"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="sub-ministry-card p-4 rounded-3 shadow-sm h-100 text-center">
                <i className="fas fa-video feature-icon mb-3" />
                <h4 className="card-title">MBBC</h4>
                <p>
                  Handles media broadcasting, live streaming, and content
                  creation.
                </p>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-3 mb-4"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="sub-ministry-card p-4 rounded-3 shadow-sm h-100 text-center">
                <i className="fas fa-laptop-code feature-icon mb-3" />
                <h4 className="card-title">Digital Ministry</h4>
                <p>
                  Manages digital platforms, social media, and online presence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 cta-section text-white">
        <div className="container text-center" data-aos="zoom-in">
          <h2 className="section-title text-white">
            Join the Technical Department!
          </h2>
          <p className="lead mb-4 text-white-50">
            Use your technical skills to serve and support MUTCU&apos;s mission.
          </p>
          <Link to="/contact" className="btn btn-primary btn-lg">
            Get Involved <i className="fas fa-hand-fist ms-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default TechnicalDepartmentPage;
