import { Link } from "react-router-dom";

const AdvisoryBoardPage = () => {
  return (
    <div className="advisory-board-page">
      <section
        className="page-hero-section d-flex align-items-center text-center text-white"
        style={{ backgroundImage: "url('/assets/images/church2.jpg')" }}
      >
        <div className="hero-overlay" />
        <div className="container position-relative" data-aos="fade-up">
          <h1 className="display-3 mb-3">Advisory Board</h1>
          <p className="lead">Guidance • Accountability • Spiritual Oversight</p>
        </div>
      </section>

      <section className="py-5 introduction-section">
        <div className="container">
          <h2 className="section-title text-center">Mandate</h2>
          <p className="text-center lead mb-4">
            The Advisory Board supports MUTCU leadership through counsel,
            oversight, accountability, and guidance—ensuring the Union stays
            aligned to doctrine, mission, and institutional requirements.
          </p>

          <div className="text-center">
            <Link to="/special-committees" className="btn btn-secondary me-3">
              Back <i className="fas fa-arrow-left ms-2" />
            </Link>
            <Link to="/contact" className="btn btn-primary">
              Reach Out <i className="fas fa-envelope ms-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdvisoryBoardPage;
