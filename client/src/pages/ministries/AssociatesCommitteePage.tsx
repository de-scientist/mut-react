import { Link } from "react-router-dom";

const AssociatesCommitteePage = () => {
  return (
    <div className="associates-committee-page">
      <section
        className="page-hero-section d-flex align-items-center text-center text-white"
        style={{ backgroundImage: "url('/assets/images/exec.jpg')" }}
      >
        <div className="hero-overlay" />
        <div className="container position-relative" data-aos="fade-up">
          <h1 className="display-3 mb-3">Associates Committee (Alumni)</h1>
          <p className="lead">Mentorship • Partnership • Long-term Support</p>
        </div>
      </section>

      <section className="py-5 introduction-section">
        <div className="container">
          <h2 className="section-title text-center">Why This Matters</h2>
          <p className="text-center lead mb-5">
            Alumni and associates strengthen MUTCU through mentorship,
            opportunities, resource support, and long-term partnership.
          </p>

          <div className="text-center">
            <Link to="/special-committees" className="btn btn-secondary me-3">
              Back <i className="fas fa-arrow-left ms-2" />
            </Link>
            <Link to="/contact" className="btn btn-primary">
              Become an Associate <i className="fas fa-handshake ms-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AssociatesCommitteePage;
