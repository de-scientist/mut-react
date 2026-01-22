// src/pages/committees/ViceSecretaryPage.tsx
import { Link } from "react-router-dom";
import "../../assets/mut/css/about.css";

const ViceSecretaryPage = () => {
  return (
    <div className="vicesecretary-page">
      {/* Hero Section */}
      <section
        className="page-hero-section d-flex align-items-center text-center text-white"
        style={{ backgroundImage: "url('/assets/images/AMANI.jpeg')" }}
      >
        <div className="hero-overlay" />
        <div
          className="container position-relative"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h1 className="display-3 mb-3">Office of the Vice Secretary</h1>
          <p className="lead">Supporting Administrative Efficiency</p>
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
                  src="/assets/images/AMANI.jpeg"
                  alt="Natasha Amani"
                  className="img-fluid rounded-circle mb-3 border border-3 border-orange"
                />
                <h4 className="member-name">Natasha Amani</h4>
                <p className="member-role">Vice Secretary</p>
              </div>
            </div>

            <div className="col-lg-8" data-aos="fade-left" data-aos-delay="200">
              <h3 className="section-title text-start">
                About the Vice Secretary&apos;s Office
              </h3>
              <p>
                The Vice Secretary's office provides essential support to the
                Secretary in managing the administrative backbone of MUTCU. This
                role is crucial for maintaining organized records, facilitating
                internal and external communications, and ensuring that all
                administrative tasks are handled efficiently and accurately.
              </p>
              <p>
                Natasha Amani, as Vice Secretary, works diligently to uphold the
                Union's commitment to transparency and effective communication.
                She assists in preparing meeting documents, managing
                correspondence, and ensuring that the Union's administrative
                processes support its spiritual and outreach goals.
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
            The Vice Secretary supports the Secretary in all administrative
            duties.
          </p>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <ul className="list-unstyled roles-list">
                {[
                  "Assisting the Secretary in compiling and maintaining meeting minutes and records.",
                  "Supporting the management of Union correspondence and official documents.",
                  "Head of the Literature Department managing the CU library.",
                  "Facilitating internal communication within the Executive Council and various committees.",
                  "Deputizing the Secretary in their absence and handling delegated administrative tasks.",
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

export default ViceSecretaryPage;
