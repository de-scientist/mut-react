import { Link } from "react-router-dom";
import "../../assets/mut/css/special-committees.css";

const specialCommittees = [
  {
    title: "Advisory Board",
    desc: "Provides guidance, accountability, and spiritual oversight to support MUTCU leadership.",
    icon: "fa-user-tie",
    link: "/special-committees/advisory-board",
  },
  {
    title: "Auditing Committee",
    desc: "Supports financial accountability through checks, compliance, and auditing processes.",
    icon: "fa-clipboard-check",
    link: "/special-committees/auditing",
  },
  {
    title: "Resource Mobilization Committee (RMC)",
    desc: "Coordinates fundraising, partnerships, and resource support for union programs.",
    icon: "fa-hand-holding-usd",
    link: "/special-committees/rmc",
  },
  {
    title: "Associates Committee (Alumni)",
    desc: "Connects MUTCU with alumni support, mentorship, and long-term partnership.",
    icon: "fa-users",
    link: "/special-committees/associates",
  },
  {
    title: "Interim Executive Council",
    desc: "Supports transition and continuity of leadership during the May–August session (where applicable).",
    icon: "fa-people-arrows",
    link: "/special-committees/interim-exco",
  },
];

const SpecialCommitteesPage = () => {
  return (
    <div className="special-committees-page">
      <section
        className="page-hero-section d-flex align-items-center text-center text-white"
        style={{ backgroundImage: "url('/assets/images/special.jpg')" }}
      >
        <div className="hero-overlay" />
        <div className="container position-relative" data-aos="fade-up">
          <h1 className="display-3 mb-3">Special Committees</h1>
          <p className="lead">
            Accountability • Support • Partnerships • Continuity
          </p>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="section-title text-center">Explore Special Committees</h2>
          <p className="text-center lead mb-5">
            These committees strengthen MUTCU governance, accountability, and
            long-term impact.
          </p>

          <div className="row g-4 justify-content-center">
            {specialCommittees.map((x, i) => (
              <div className="col-md-6 col-lg-4" key={i} data-aos="zoom-in">
                <Link
                  to={x.link}
                  className="ministry-card d-block text-center text-decoration-none rounded-3 shadow-sm h-100"
                >
                  <div
                    className="d-flex align-items-center justify-content-center bg-primary-dark text-white rounded-top-3"
                    style={{ height: 200 }}
                  >
                    <i className={`fas ${x.icon}`} style={{ fontSize: 46 }} />
                  </div>
                  <div className="card-body">
                    <h4 className="card-title">{x.title}</h4>
                    <p className="card-text">{x.desc}</p>
                    <span className="btn btn-sm btn-outline-primary mt-3">
                      Learn More <i className="fas fa-arrow-right ms-2" />
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <Link to="/ministries" className="btn btn-secondary">
              Back to Main Committees <i className="fas fa-arrow-left ms-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SpecialCommitteesPage;
