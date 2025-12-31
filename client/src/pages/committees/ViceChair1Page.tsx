// src/pages/committees/ViceChair1Page.tsx
import { Link } from "react-router-dom";
import "../../assets/mut/css/about.css";

const ViceChair1Page = () => {
  return (
    <div className="vicechair1-page">
      {/* Hero Section */}
      <section
        className="page-hero-section d-flex align-items-center text-center text-white"
        style={{ backgroundImage: "url('/assets/images/JES.jpg')" }}
      >
        <div className="hero-overlay" />
        <div
          className="container position-relative"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h1 className="display-3 mb-3">
            Office of the 1st Vice Chair
          </h1>
          <p className="lead">
            Supporting Leadership and Union Initiatives
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
                  src="/assets/images/JES.jpg"
                  alt="Jesca Kinya"
                  className="img-fluid rounded-circle mb-3 border border-3 border-navy"
                />
                <h4 className="member-name">Jesca Kinya</h4>
                <p className="member-role">1st Vice Chair</p>
              </div>
            </div>

            <div
              className="col-lg-8"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <h3 className="section-title text-start">
                About the 1st Vice Chair&apos;s Office
              </h3>
              <p>
                The 1st Vice Chair's office plays a crucial supportive role to the Chairman, assisting in the overall leadership and administration of MUTCU.
              </p>
              <p>
                Jesca Kinya, as 1st Vice Chair, is dedicated to upholding the Union's values and actively contributes to the strategic planning and implementation of activities that build spiritual growth among members. She is also in charge of the Hospitality ministry and Ladies committee, overseeing the nurturing and development of ladies in the Union.
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
            The 1st Vice Chair supports the Chairman and oversees key Union functions.
          </p>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <ul className="list-unstyled roles-list">
                {[
                  "Deputizing the Chairman in their absence and assisting in their duties.",
                  "Overseeing specific projects or initiatives as delegated by the Chairman.",
                  "Leading the Ladies ministry.",
                  "Managing the Hospitality ministry.",
                  "Ensuring the general welfare and spiritual health of the Union leaders.",
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
          <h2 className="section-title text-white">
            Explore Our Leadership!
          </h2>
          <p className="section-subtitle">
            Learn more about the dedicated individuals guiding MUTCU.
          </p>

          <Link
            to="/about"
            className="btn btn-primary btn-lg me-3"
          >
            Meet the Team <i className="fas fa-users ms-2" />
          </Link>

          <Link
            to="/contact"
            className="btn btn-secondary btn-lg"
          >
            Get in Touch <i className="fas fa-envelope ms-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ViceChair1Page;
