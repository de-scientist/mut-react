// src/pages/committees/SecretaryPage.tsx
import { Link } from "react-router-dom";
import "../../assets/mut/css/about.css";

const SecretaryPage = () => {
  return (
    <div className="secretary-page">
      {/* Hero Section */}
      <section
        className="page-hero-section d-flex align-items-center text-center text-white"
        style={{ backgroundImage: "url('/assets/images/GRACE.jpg')" }}
      >
        <div className="hero-overlay" />
        <div
          className="container position-relative"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h1 className="display-3 mb-3">
            The Secretary&apos;s Office
          </h1>
          <p className="lead">
            Ensuring Effective Communication and Record-Keeping
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
                  src="/assets/images/GRACE.jpg"
                  alt="Grace Kanyiri"
                  className="img-fluid rounded-circle mb-3 border border-3 border-navy"
                />
                <h4 className="member-name">Grace Kanyiri</h4>
                <p className="member-role">Secretary</p>
              </div>
            </div>

            <div
              className="col-lg-8"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <h3 className="section-title text-start">
                About the Secretary&apos;s Office
              </h3>
              <p>
                The Secretary&apos;s office is vital for the smooth
                administrative functioning of MUTCU. It is responsible for all
                official communications, meticulous record-keeping, and ensuring
                that decisions made by the Executive Council and general
                membership are accurately documented and disseminated.
              </p>
              <p>
                Grace Kanyiri, as Secretary, ensures transparency and efficiency
                in the Union&apos;s operations. Her role involves managing
                meeting minutes, maintaining official records, and facilitating
                effective communication channels within MUTCU and with external
                partners, upholding the Union&apos;s commitment to good
                governance.
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
            The Secretary&apos;s office is crucial for MUTCU&apos;s administrative
            integrity.
          </p>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <ul className="list-unstyled roles-list">
                {[
                  "Compiling, printing, and ensuring the signing of minutes from all official meetings.",
                  "Managing all official correspondence and communications of the Union.",
                  "Maintaining comprehensive records of Union members, assets, and activities.",
                  "Preparing agendas for meetings in consultation with the Chairman.",
                  "Ensuring timely dissemination of information to the Executive Council and general membership.",
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

export default SecretaryPage;
