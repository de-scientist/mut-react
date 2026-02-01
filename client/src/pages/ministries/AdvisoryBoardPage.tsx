import { Link } from "react-router-dom";
import "../../assets/mut/css/special-committees.css";

const AdvisoryBoardPage = () => {
  return (
    <div className="advisory-board-page">
      <section
        className="page-hero-section d-flex align-items-center text-center text-white"
        style={{ backgroundImage: "url('/assets/images/church2.jpg')" }}
      >
        <div className="hero-overlay" />
        <div className="container position-relative" data-aos="fade-up" data-aos-duration="1000">
          <h1 className="display-3 mb-3">Advisory Board</h1>
          <p className="lead">Guidance • Accountability • Spiritual Oversight</p>
        </div>
      </section>

      <section className="py-5 ministry-intro-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 mb-4 mb-lg-0" data-aos="fade-right" data-aos-delay="100">
              <h2 className="section-title text-start">About the Advisory Board</h2>
              <div className="mb-4">
                <h5 className="text-secondary mb-3">Mandate</h5>
                <p>
                  The Advisory Board provides guidance, counsel, and spiritual oversight to MUTCU leadership, ensuring alignment with doctrine, mission, and institutional requirements.
                </p>
              </div>
              <div className="mb-4">
                <h5 className="text-secondary mb-3">Our Mission</h5>
                <p className="lead">
                  To strengthen MUTCU leadership through wise counsel, accountability mechanisms, and spiritual guidance, ensuring the Union remains true to its foundational values and fulfills its God-given mandate.
                </p>
              </div>
              <div>
                <h5 className="text-secondary mb-3">Key Functions</h5>
                <ul>
                  <li>Providing strategic counsel and guidance to the Executive Council</li>
                  <li>Ensuring alignment with MUTCU's doctrinal basis and constitutional guidelines</li>
                  <li>Offering spiritual oversight and accountability mechanisms</li>
                  <li>Supporting continuity and institutional integrity</li>
                  <li>Facilitating compliance with established policies and procedures</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-5 text-center" data-aos="fade-left" data-aos-delay="200">
              <img
                src="/assets/images/church2.jpg"
                alt="Advisory Board"
                className="img-fluid rounded-3 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light roles-responsibilities-section">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">
            Key Roles &amp; Responsibilities
          </h2>
          <p className="text-center lead mb-5" data-aos="fade-up" data-aos-delay="100">
            Advisory Board members work to strengthen MUTCU's governance and leadership.
          </p>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <ul className="list-unstyled roles-list">
                <li data-aos="fade-up" data-aos-delay="100">
                  <i className="fas fa-check-circle me-3" />
                  Providing guidance on strategic decisions affecting the Union's direction
                </li>
                <li data-aos="fade-up" data-aos-delay="200">
                  <i className="fas fa-check-circle me-3" />
                  Reviewing executive decisions to ensure alignment with MUTCU's constitution and doctrinal basis
                </li>
                <li data-aos="fade-up" data-aos-delay="300">
                  <i className="fas fa-check-circle me-3" />
                  Facilitating accountability and transparency within the Union
                </li>
                <li data-aos="fade-up" data-aos-delay="400">
                  <i className="fas fa-check-circle me-3" />
                  Mentoring and supporting the Executive Council's spiritual and operational growth
                </li>
                <li data-aos="fade-up" data-aos-delay="500">
                  <i className="fas fa-check-circle me-3" />
                  Conducting periodic reviews and assessments of Union operations
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 cta-section text-white">
        <div className="container text-center" data-aos="zoom-in">
          <h2 className="section-title text-white mb-4">Learn More About Our Governance</h2>
          <p className="section-subtitle mb-5">
            The Advisory Board strengthens MUTCU's commitment to excellence and spiritual integrity.
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

export default AdvisoryBoardPage;
