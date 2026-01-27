import { Link } from "react-router-dom";

const InterimExecutiveCouncilPage = () => {
  return (
    <div className="interim-exco-page">
      <section
        className="page-hero-section d-flex align-items-center text-center text-white"
        style={{ backgroundImage: "url('/assets/images/church3.jpg')" }}
      >
        <div className="hero-overlay" />
        <div className="container position-relative" data-aos="fade-up">
          <h1 className="display-3 mb-3">Interim Executive Council</h1>
          <p className="lead">Continuity • Transition • Support (May–August session)</p>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="section-title text-center">Purpose</h2>
          <p className="text-center lead mb-5">
            Ensures leadership continuity and smooth transition during the
            interim session where applicable—supporting planning and execution
            of key union activities.
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

export default InterimExecutiveCouncilPage;
