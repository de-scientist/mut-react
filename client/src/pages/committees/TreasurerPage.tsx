// src/pages/committees/TreasurerPage.tsx
import { Link } from "react-router-dom";
import "../../assets/mut/css/about.css";

const TreasurerPage = () => {
  return (
    <div className="treasurer-page">
      {/* Hero Section */}
      <section
        className="page-hero-section d-flex align-items-center text-center text-white"
        style={{ backgroundImage: "url('/assets/images/MERCY.jpeg')" }}
      >
        <div className="hero-overlay" />
        <div
          className="container position-relative"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h1 className="display-3 mb-3">The Treasurer&apos;s Office</h1>
          <p className="lead">
            Ensuring Financial Stewardship and Accountability
          </p>
        </div>
      </section>

      {/* Leader Profile Section */}
      <section className="py-5 leader-profile-section">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div
              className="col-6 col-md-4 col-lg-3 mb-4"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <div className="executive-member-card d-block text-center rounded-3 shadow-sm h-100">
                <img
                  src="/assets/images/MERCY.jpeg"
                  alt="Mercy Mwaura"
                  className="img-fluid rounded-circle mb-3 border border-3 border-navy"
                />
                <h4 className="member-name">Mercy Mwaura</h4>
                <p className="member-role">Treasurer</p>
              </div>
            </div>

            <div className="col-lg-8" data-aos="fade-left" data-aos-delay="200">
              <h3 className="section-title text-start">
                About the Treasurer&apos;s Office
              </h3>
              <p>
                The Treasurer&apos;s office is central to MUTCU's financial
                integrity and sustainability. It is responsible for the diligent
                management of all Union funds, ensuring strict adherence to
                financial procedures and policies. This includes overseeing
                budgets, managing expenditures, and providing transparent
                financial reports to the Executive Council and members.
              </p>
              <p>
                Mercy Mwaura, as Treasurer, ensures the responsible stewardship
                of members' offerings and Union resources. Her role is critical
                in maintaining accountability and transparency in all financial
                matters, enabling MUTCU to effectively fund its ministries and
                outreach programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Roles & Responsibilities Section */}
      <section className="py-5 bg-light roles-responsibilities-section">
        <div className="container">
          <h2 className="section-title text-center">
            Key Roles &amp; Responsibilities
          </h2>
          <p className="text-center lead mb-5">
            The Treasurer&apos;s office manages all financial aspects of MUTCU.
          </p>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <ul className="list-unstyled roles-list">
                {[
                  "Handling all Union funds with strict adherence to established financial procedures.",
                  "Managing budgets submitted by various ministries and ensuring proper budgetary allocations.",
                  "Ensuring all expenditures are accounted for with official requisition forms and receipts.",
                  "Keeping records of all assets of the Union.",
                  "Advising the Executive Council on financial matters and resource mobilization strategies.",
                ].map((role, index) => (
                  <li
                    key={index}
                    data-aos="fade-up"
                    data-aos-delay={100 * (index + 1)}
                  >
                    <i className="fas fa-check-circle me-3" />
                    {role}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 cta-section text-white">
        <div className="container text-center" data-aos="zoom-in">
          <h2 className="section-title text-white">Explore Our Leadership!</h2>
          <p className="section-subtitle">
            Learn more about the dedicated individuals guiding MUTCU.
          </p>

          <Link to="/about" className="btn btn-primary btn-lg me-3">
            Meet the Team <i className="fas fa-users ms-2" />
          </Link>

          <Link to="/contact" className="btn btn-secondary btn-lg">
            Get in Touch <i className="fas fa-envelope ms-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default TreasurerPage;
