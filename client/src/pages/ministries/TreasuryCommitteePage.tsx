import { Link } from "react-router-dom";

const TreasuryCommitteePage = () => {
  return (
    <div className="treasury-committee-page">
      <section
        className="page-hero-section d-flex align-items-center text-center text-white"
        style={{ backgroundImage: "url('/assets/images/treasury.jpg')" }}
      >
        <div className="hero-overlay" />
        <div className="container position-relative" data-aos="fade-up">
          <h1 className="display-3 mb-3">Treasury Committee</h1>
          <p className="lead">
            Stewardship • Accountability • Excellence in financial management
          </p>
        </div>
      </section>

      <section className="py-5 introduction-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7" data-aos="fade-right">
              <h2 className="section-title">What We Do</h2>
              <p className="lead">
                The Treasury Committee oversees MUTCU financial stewardship with
                integrity—ensuring budgeting, record keeping, reporting, and
                accountability for all union operations.
              </p>
              <p className="text-muted">
                We work closely with leadership and relevant committees to ensure
                finances support ministry, welfare, missions, and union programs
                responsibly.
              </p>
              <Link to="/contact" className="btn btn-primary me-3">
                Contact Treasury <i className="fas fa-envelope ms-2" />
              </Link>
              <Link to="/ministries" className="btn btn-secondary">
                Back to Committees <i className="fas fa-arrow-left ms-2" />
              </Link>
            </div>

            <div className="col-lg-5 mt-4 mt-lg-0" data-aos="fade-left">
              <img
                src="/assets/images/treasury2.jpg"
                alt="Treasury Committee"
                className="img-fluid rounded-3 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light roles-responsibilities-section">
        <div className="container">
          <h2 className="section-title text-center">Key Roles</h2>
          <p className="text-center lead mb-5">
            Practical systems that support ministry work with transparency.
          </p>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <ul className="list-unstyled roles-list">
                <li data-aos="fade-up" data-aos-delay="100">
                  <i className="fas fa-check-circle me-3" />
                  Budget planning and financial approvals (under leadership
                  direction).
                </li>
                <li data-aos="fade-up" data-aos-delay="200">
                  <i className="fas fa-check-circle me-3" />
                  Accurate bookkeeping, receipts, and financial documentation.
                </li>
                <li data-aos="fade-up" data-aos-delay="300">
                  <i className="fas fa-check-circle me-3" />
                  Semester and annual financial reporting for accountability.
                </li>
                <li data-aos="fade-up" data-aos-delay="400">
                  <i className="fas fa-check-circle me-3" />
                  Asset register support and basic procurement financial checks.
                </li>
                <li data-aos="fade-up" data-aos-delay="500">
                  <i className="fas fa-check-circle me-3" />
                  Financial guidance to Welfare and fundraising teams.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-units (optional) */}
      <section className="py-5 aims-section">
        <div className="container">
          <h2 className="section-title text-center">Sub-Teams</h2>
          <p className="text-center lead mb-5">
            Treasury work can be organized into these operational sub-teams.
          </p>

          <div className="row g-4 justify-content-center">
            {[
              {
                title: "Budgeting & Planning",
                icon: "fa-chart-line",
                desc: "Planning budgets for programs and monitoring allocations responsibly.",
              },
              {
                title: "Accounts & Records",
                icon: "fa-book",
                desc: "Tracking income/expenses and maintaining clear financial records.",
              },
              {
                title: "Reporting & Compliance",
                icon: "fa-file-invoice",
                desc: "Preparing reports and supporting audits and accountability processes.",
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
              Join Treasury Support <i className="fas fa-handshake ms-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TreasuryCommitteePage;
