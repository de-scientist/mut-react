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
              <h2 className="section-title">About the Discipleship Committee</h2>
              <div>
                <h5 className="text-secondary">Mandate</h5>
                <p>
                  To intentionally guide members from first decision to relational growth to personal discipleship.
                </p>
              </div>
              <div>
                <h5 className="text-secondary">Our Mission</h5>
                <p>
                  The Discipleship Committee facilitates the spiritual growth and maturation of Union members through structured pathways. We coordinate nurturing for new believers, foster community through years fellowships, establish accountability for personal holiness, and develop disciples into servant-leaders. We believe that every member can grow from a new believer into a mature, accountable disciple of Christ.
                </p>
              </div>
              <div>
                <h5 className="text-secondary">Our Focus Areas</h5>
                <ul>
                  <li>Nurturing new members in foundational Christian doctrine</li>
                  <li>Building community through year-based fellowships and mentorship</li>
                  <li>Establishing accountability groups for spiritual growth and holiness</li>
                  <li>Developing discipleship classes for deeper spiritual maturity</li>
                  <li>Preparing members for baptism and active membership participation</li>
                </ul>
              </div>
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

      {/* Committee Structure & Leadership */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="section-title text-center">Committee Structure &amp; Sub-Programs</h2>
          <p className="text-center lead mb-5">
            Four distinct pathways and coordinators for comprehensive spiritual growth.
          </p>

          <div className="row g-4 justify-content-center">
            {[
              {
                title: "Nurturing Program",
                icon: "fa-seedling",
                coordinator: "Nurturing Coordinator",
                desc: "Foundations for new believers—helping members understand salvation, assurance, basic doctrine, and integration into church community.",
              },
              {
                title: "Years Fellowships",
                icon: "fa-user-graduate",
                coordinator: "Years Fellowship Coordinator",
                desc: "Year-based fellowships that build community, peer mentorship, spiritual support, and leadership development opportunities.",
              },
              {
                title: "Accountability Groups",
                icon: "fa-handshake",
                coordinator: "Accountability Coordinator",
                desc: "Small accountability circles for holiness, discipline, personal growth in Christ, and mutual encouragement toward maturity.",
              },
              {
                title: "Discipleship Classes",
                icon: "fa-book-open",
                coordinator: "Discipleship Class Coordinator (w/ Assistants)",
                desc: "Structured classes for deeper spiritual formation, biblical knowledge, leadership training, and development of servant-leaders.",
              },
            ].map((x, i) => (
              <div className="col-md-6 col-lg-6" key={i} data-aos="zoom-in" data-aos-delay={i * 100}>
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <div className="mb-3">
                      <i className={`fas ${x.icon} text-primary`} style={{ fontSize: "2rem" }} />
                    </div>
                    <h5 className="card-title text-secondary">{x.title}</h5>
                    <p className="small text-muted mb-2">
                      <strong>Led by:</strong> {x.coordinator}
                    </p>
                    <p className="card-text small">{x.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row mt-5 justify-content-center">
            <div className="col-lg-10">
              <div className="card border-0 bg-white shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-secondary mb-3">
                    <i className="fas fa-chair me-2 text-primary" /> Overall Leadership
                  </h5>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <p className="mb-1"><strong>Discipleship Coordinator (Chair):</strong></p>
                      <p className="small text-muted">Oversees all discipleship pathways, coordinates with sub-program leaders, ensures theological consistency, tracks member progression.</p>
                    </div>
                    <div className="col-md-6 mb-3">
                      <p className="mb-1"><strong>Secretary/Treasurer:</strong></p>
                      <p className="small text-muted">Maintains records of member progress, coordinates scheduling, manages resources, documents outcomes and growth milestones.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <Link to="/contact" className="btn btn-primary me-3">
              Join Discipleship <i className="fas fa-users ms-2" />
            </Link>
            <Link to="/ministries" className="btn btn-secondary">
              Back to Committees <i className="fas fa-arrow-left ms-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DiscipleshipCommitteePage;
