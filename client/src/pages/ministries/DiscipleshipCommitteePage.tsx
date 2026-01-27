import { Link } from "react-router-dom";

const DiscipleshipCommitteePage = () => {
  return (
    <div className="discipleship-committee-page">
      <section
        className="page-hero-section d-flex align-items-center text-center text-white"
        style={{ backgroundImage: "url('/assets/images/discipleship.jpg')" }}
      >
        <div className="hero-overlay" />
        <div className="container position-relative" data-aos="fade-up">
          <h1 className="display-3 mb-3">Discipleship Committee</h1>
          <p className="lead">
            Growth Pathway • Mentorship • Accountability • Maturity in Christ
          </p>
        </div>
      </section>

      <section className="py-5 introduction-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7" data-aos="fade-right">
              <h2 className="section-title">Our Focus</h2>
              <p className="lead">
                The Discipleship Committee helps members grow from new believers
                into mature disciples—through nurturing, accountability, and
                consistent spiritual formation.
              </p>
              <p className="text-muted">
                We coordinate growth pathways including nurturing classes, years
                fellowships, accountability groups, mentorship, and baptism
                preparation where applicable.
              </p>

              <Link to="/contact" className="btn btn-primary me-3">
                Join Discipleship <i className="fas fa-users ms-2" />
              </Link>
              <Link to="/ministries" className="btn btn-secondary">
                Back to Committees <i className="fas fa-arrow-left ms-2" />
              </Link>
            </div>

            <div className="col-lg-5 mt-4 mt-lg-0" data-aos="fade-left">
              <img
                src="/assets/images/discipleship2.jpg"
                alt="Discipleship"
                className="img-fluid rounded-3 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sub-ministries */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="section-title text-center">Sub-Ministries</h2>
          <p className="text-center lead mb-5">
            Structures that support consistent spiritual growth and pastoral care.
          </p>

          <div className="row g-4 justify-content-center">
            {[
              {
                title: "Nurturing Classes",
                icon: "fa-seedling",
                desc: "Foundations for new believers—helping members understand salvation, assurance, and basic doctrine.",
              },
              {
                title: "Years’ Fellowships",
                icon: "fa-user-graduate",
                desc: "Year-based fellowships that build community, mentorship, and spiritual support.",
              },
              {
                title: "Accountability Groups",
                icon: "fa-user-friends",
                desc: "Small accountability circles that encourage holiness, discipline, and growth in Christ.",
              },
              {
                title: "Mentorship & Growth Pathway",
                icon: "fa-route",
                desc: "Guided spiritual journey from new believer to servant-leader through consistent mentorship.",
              },
              {
                title: "Baptism & Membership Pathway",
                icon: "fa-water",
                desc: "Support for baptism preparation and integration into active fellowship and service.",
              },
            ].map((x, i) => (
              <div className="col-md-6 col-lg-4" key={i} data-aos="zoom-in">
                <div className="principle-card h-100 text-center">
                  <i className={`fas ${x.icon} feature-icon mb-3`} />
                  <h4 className="card-title">{x.title}</h4>
                  <p className="text-muted mb-0">{x.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <Link to="/contact" className="btn btn-primary">
              Talk to a Leader <i className="fas fa-envelope ms-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DiscipleshipCommitteePage;
