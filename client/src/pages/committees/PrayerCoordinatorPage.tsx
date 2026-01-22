// src/pages/committees/PrayerCoordinatorPage.tsx
import { Link } from "react-router-dom";
import "../../assets/mut/css/prayer.css";

const PrayerCoordinatorPage = () => {
  return (
    <div className="prayer-coordinator-page">
      {/* Hero Section */}
      <section
        className="page-hero-section d-flex align-items-center text-center text-white"
        style={{ backgroundImage: "url('/assets/images/MARTHA.jpeg')" }}
      >
        <div className="hero-overlay" />
        <div
          className="container position-relative"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h1 className="display-3 mb-3">Prayer Ministry</h1>
          <p className="lead">Cultivating a Deep Culture of Prayer</p>
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
                  src="/assets/images/MARTHA.jpeg"
                  alt="Martha Thuku"
                  className="img-fluid rounded-circle mb-3 border border-3 border-navy"
                />
                <h4 className="member-name">Martha Thuku</h4>
                <p className="member-role">Prayer Coordinator</p>
              </div>
            </div>

            <div className="col-lg-8" data-aos="fade-left" data-aos-delay="200">
              <h3 className="section-title text-start">
                About the Prayer Ministry
              </h3>
              <p>
                The Prayer Ministry is the spiritual backbone of MUTCU,
                dedicated to building a strong culture of intercession, worship,
                and dependence on God.
              </p>
              <p>
                Under the leadership of Martha Thuku, the ministry organizes
                prayer gatherings, keshas, chains, and special seasons of
                fasting and intercession for the Union, the university, and the
                nation.
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
            The Prayer Ministry leads and structures the prayer life of MUTCU.
          </p>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <ul className="list-unstyled roles-list">
                {[
                  "Coordinating weekly corporate prayer meetings and seasons of fasting.",
                  "Organizing prayer keshas and special nights of intercession.",
                  "Mobilizing members for focused prayer for missions, leadership, and the university.",
                  "Encouraging personal prayer disciplines among members.",
                  "Partnering with other ministries to undergird their activities in prayer.",
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
          <h2 className="section-title text-white">Stand in the Gap!</h2>
          <p className="section-subtitle">
            Join the Prayer Ministry and help cover MUTCU in intercession.
          </p>

          <Link to="/ministries" className="btn btn-primary btn-lg me-3">
            Explore Ministries <i className="fas fa-users-cog ms-2" />
          </Link>

          <Link to="/contact" className="btn btn-secondary btn-lg">
            Contact Us <i className="fas fa-envelope ms-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PrayerCoordinatorPage;
