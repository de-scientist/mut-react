// src/pages/committees/CreativeCoordinatorPage.tsx
import { Link } from "react-router-dom";
import "../../assets/mut/css/creative-arts.css";

const CreativeCoordinatorPage = () => {
  return (
    <div className="creative-coordinator-page">
      {/* Hero Section */}
      <section
        className="page-hero-section d-flex align-items-center text-center text-white"
        style={{ backgroundImage: "url('/assets/images/ESTHER.jpeg')" }}
      >
        <div className="hero-overlay" />
        <div
          className="container position-relative"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h1 className="display-3 mb-3">
            Creative Ministry (CREAM)
          </h1>
          <p className="lead">
            Expressing Faith Through Creative Arts
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
                  src="/assets/images/ESTHER.jpeg"
                  alt="Esther Karimeri"
                  className="img-fluid rounded-circle mb-3 border border-3 border-navy"
                />
                <h4 className="member-name">Esther Karimeri</h4>
                <p className="member-role">
                  Creative Ministry Coordinator
                </p>
              </div>
            </div>

            <div
              className="col-lg-8"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <h3 className="section-title text-start">
                About the Creative Ministry
              </h3>
              <p>
                The Creative Arts Ministry (CREAM) uses drama, dance, spoken word,
                film, and other artistic expressions to communicate the Gospel
                and edify the body of Christ.
              </p>
              <p>
                Under the leadership of Esther Karimeri, the team explores
                innovative, Christ-centered expressions that complement
                preaching, worship, and missions, engaging both the campus and
                wider community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Roles & Responsibilities Section */}
      <section className="py-5 bg-light roles-responsibilities-section">
        <div className="container">
          <h2 className="section-title text-center">
            Key Roles &amp; Activities
          </h2>
          <p className="text-center lead mb-5">
            CREAM brings the Gospel to life through arts and creativity.
          </p>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <ul className="list-unstyled roles-list">
                {[
                  "Coordinating drama, dance, film, and spoken word presentations for fellowships and events.",
                  "Developing creative concepts for evangelism and campus outreaches.",
                  "Collaborating with the Music, Missions, and Technical ministries for major productions.",
                  "Mentoring members in using their creative gifts for God's glory.",
                  "Organizing creative nights and productions such as themed drama and film events.",
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
            Use Your Gifts for God!
          </h2>
          <p className="section-subtitle">
            Join the Creative Ministry and express your faith through arts.
          </p>

          <Link
            to="/ministries"
            className="btn btn-primary btn-lg me-3"
          >
            Explore Ministries <i className="fas fa-users-cog ms-2" />
          </Link>

          <Link
            to="/contact"
            className="btn btn-secondary btn-lg"
          >
            Contact Us <i className="fas fa-envelope ms-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CreativeCoordinatorPage;
