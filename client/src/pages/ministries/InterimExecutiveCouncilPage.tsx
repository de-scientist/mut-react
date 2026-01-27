import { Link } from "react-router-dom";
import "../../assets/mut/css/special-committees.css";

const InterimExecutiveCouncilPage = () => {
  return (
    <div className="interim-exco-page">
      <section
        className="page-hero-section d-flex align-items-center text-center text-white"
        style={{ backgroundImage: "url('/assets/images/church3.jpg')" }}
      >
        <div className="hero-overlay" />
        <div className="container position-relative" data-aos="fade-up" data-aos-duration="1000">
          <h1 className="display-3 mb-3">Interim Executive Council</h1>
          <p className="lead">Continuity • Transition • Support (May–August Session)</p>
        </div>
      </section>

      <section className="py-5 ministry-intro-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 mb-4 mb-lg-0" data-aos="fade-right" data-aos-delay="100">
              <h2 className="section-title text-start">About the Interim Executive Council</h2>
              <div className="mb-4">
                <h5 className="text-secondary mb-3">Mandate</h5>
                <p>
                  To ensure continuity of leadership, support smooth transitions, and maintain effective Union operations during the May–August interim session where applicable, protecting institutional continuity and programmatic effectiveness.
                </p>
              </div>
              <div className="mb-4">
                <h5 className="text-secondary mb-3">Our Mission</h5>
                <p className="lead">
                  The Interim Executive Council bridges the gap between leadership transitions, ensuring that MUTCU's operations remain effective and its mission continues uninterrupted. We provide stewardship during transitional periods and support the smooth integration of newly elected leadership.
                </p>
              </div>
              <div>
                <h5 className="text-secondary mb-3">Key Responsibilities</h5>
                <ul>
                  <li>Maintaining continuity of Union operations during transition periods</li>
                  <li>Managing administrative and ministerial activities throughout the interim session</li>
                  <li>Providing oversight and support to committees and ministries</li>
                  <li>Preparing transition briefings and documentation for incoming leadership</li>
                  <li>Ensuring that key initiatives and programs continue without disruption</li>
                  <li>Serving as a bridge between outgoing and incoming leadership teams</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-5 text-center" data-aos="fade-left" data-aos-delay="200">
              <img
                src="/assets/images/church3.jpg"
                alt="Interim Executive Council"
                className="img-fluid rounded-3 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light roles-responsibilities-section">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">
            Key Functions
          </h2>
          <p className="text-center lead mb-5" data-aos="fade-up" data-aos-delay="100">
            The Interim Executive Council ensures smooth operations during leadership transitions.
          </p>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <ul className="list-unstyled roles-list">
                <li data-aos="fade-up" data-aos-delay="100">
                  <i className="fas fa-check-circle me-3" />
                  Overseeing day-to-day administrative functions and ministry coordination
                </li>
                <li data-aos="fade-up" data-aos-delay="200">
                  <i className="fas fa-check-circle me-3" />
                  Continuing implementation of planned programs and initiatives
                </li>
                <li data-aos="fade-up" data-aos-delay="300">
                  <i className="fas fa-check-circle me-3" />
                  Managing finances and ensuring proper resource utilization
                </li>
                <li data-aos="fade-up" data-aos-delay="400">
                  <i className="fas fa-check-circle me-3" />
                  Facilitating communication and coordination among all committees
                </li>
                <li data-aos="fade-up" data-aos-delay="500">
                  <i className="fas fa-check-circle me-3" />
                  Preparing comprehensive handover documents and transition guides
                </li>
                <li data-aos="fade-up" data-aos-delay="600">
                  <i className="fas fa-check-circle me-3" />
                  Supporting and orienting newly elected leadership to their roles
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 cta-section text-white">
        <div className="container text-center" data-aos="zoom-in">
          <h2 className="section-title text-white mb-4">Leadership Continuity Matters</h2>
          <p className="section-subtitle mb-5">
            The Interim Executive Council ensures MUTCU remains strong during transitions.
          </p>
          <div>
            <Link to="/special-committees" className="btn btn-outline-light btn-lg me-3">
              Back to Special Committees <i className="fas fa-arrow-left ms-2" />
            </Link>
            <Link to="/contact" className="btn btn-primary btn-lg">
              Contact Us <i className="fas fa-envelope ms-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InterimExecutiveCouncilPage;
