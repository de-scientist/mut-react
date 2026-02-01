import { Link } from "react-router-dom";
import "../../assets/mut/css/special-committees.css";

const AuditingCommitteePage = () => {
  return (
    <div className="auditing-committee-page">
      <section
        className="page-hero-section d-flex align-items-center text-center text-white"
        style={{ backgroundImage: "url('/assets/images/treasury2.jpg')" }}
      >
        <div className="hero-overlay" />
        <div className="container position-relative" data-aos="fade-up" data-aos-duration="1000">
          <h1 className="display-3 mb-3">Auditing Committee</h1>
          <p className="lead">Transparency • Compliance • Financial Accountability</p>
        </div>
      </section>

      <section className="py-5 ministry-intro-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 mb-4 mb-lg-0" data-aos="fade-right" data-aos-delay="100">
              <h2 className="section-title text-start">About the Auditing Committee</h2>
              <div className="mb-4">
                <h5 className="text-secondary mb-3">Mandate</h5>
                <p>
                  To support financial accountability and ensure transparent, compliant management of MUTCU's resources through independent reviews, audit processes, and checks.
                </p>
              </div>
              <div className="mb-4">
                <h5 className="text-secondary mb-3">Our Mission</h5>
                <p className="lead">
                  The Auditing Committee safeguards MUTCU's financial integrity through independent oversight, ensuring all financial transactions, budgets, and resource usage align with Union policies and best practices in accountability.
                </p>
              </div>
              <div>
                <h5 className="text-secondary mb-3">Core Responsibilities</h5>
                <ul>
                  <li>Independent financial and operational audits throughout the year</li>
                  <li>Verification of financial records and documentation</li>
                  <li>Monitoring compliance with Union financial policies</li>
                  <li>Reviewing budgets and expenditure patterns for appropriateness</li>
                  <li>Providing audit reports and recommendations to leadership</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-5 text-center" data-aos="fade-left" data-aos-delay="200">
              <img
                src="/assets/images/treasury2.jpg"
                alt="Auditing Committee"
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
            The Auditing Committee ensures MUTCU maintains the highest standards of financial transparency.
          </p>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <ul className="list-unstyled roles-list">
                <li data-aos="fade-up" data-aos-delay="100">
                  <i className="fas fa-check-circle me-3" />
                  Conducting independent audits of financial records and transactions
                </li>
                <li data-aos="fade-up" data-aos-delay="200">
                  <i className="fas fa-check-circle me-3" />
                  Verifying receipts, requisitions, and supporting documentation for all expenditures
                </li>
                <li data-aos="fade-up" data-aos-delay="300">
                  <i className="fas fa-check-circle me-3" />
                  Reviewing monthly financial statements and quarterly reports for accuracy
                </li>
                <li data-aos="fade-up" data-aos-delay="400">
                  <i className="fas fa-check-circle me-3" />
                  Ensuring compliance with Union financial policies and constitutional requirements
                </li>
                <li data-aos="fade-up" data-aos-delay="500">
                  <i className="fas fa-check-circle me-3" />
                  Preparing audit reports with findings and recommendations for the Executive Council
                </li>
                <li data-aos="fade-up" data-aos-delay="600">
                  <i className="fas fa-check-circle me-3" />
                  Investigating discrepancies and recommending corrective actions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 cta-section text-white">
        <div className="container text-center" data-aos="zoom-in">
          <h2 className="section-title text-white mb-4">Financial Integrity Matters</h2>
          <p className="section-subtitle mb-5">
            The Auditing Committee ensures MUTCU operates with transparency and accountability.
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

export default AuditingCommitteePage;
