import { Link } from "react-router-dom";

const AuditingCommitteePage = () => {
  return (
    <div className="auditing-committee-page">
      <section
        className="page-hero-section d-flex align-items-center text-center text-white"
        style={{ backgroundImage: "url('/assets/images/treasury2.jpg')" }}
      >
        <div className="hero-overlay" />
        <div className="container position-relative" data-aos="fade-up">
          <h1 className="display-3 mb-3">Auditing Committee</h1>
          <p className="lead">Transparency • Compliance • Financial Accountability</p>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="section-title text-center">What We Do</h2>
          <p className="text-center lead mb-5">
            Supports accountability through review, checks, and audit processes
            for MUTCU finances and resource usage.
          </p>

          <div className="text-center">
            <Link to="/special-committees" className="btn btn-secondary me-3">
              Back <i className="fas fa-arrow-left ms-2" />
            </Link>
            <Link to="/contact" className="btn btn-primary">
              Contact <i className="fas fa-envelope ms-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuditingCommitteePage;
