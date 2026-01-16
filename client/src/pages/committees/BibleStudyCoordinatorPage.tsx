// src/pages/committees/BibleStudyCoordinatorPage.tsx
import { Link } from "react-router-dom";
import "../../assets/mut/css/about.css";

const BibleStudyCoordinatorPage = () => {
  return (
    <div className="bible-study-coordinator-page">
      {/* Hero Section */}
      <section
        className="page-hero-section d-flex align-items-center text-center text-white"
        style={{ backgroundImage: "url('/assets/images/CALEB.jpg')" }}
      >
        <div className="hero-overlay" />
        <div
          className="container position-relative"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h1 className="display-3 mb-3">
            Bible Study, Discipleship &amp; BEST
          </h1>
          <p className="lead">
            Deepening Faith Through God&apos;s Word
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
                  src="/assets/images/CALEB.jpg"
                  alt="Caleb Esere"
                  className="img-fluid rounded-circle mb-3 border border-3 border-orange"
                />
                <h4 className="member-name">Caleb Esere</h4>
                <p className="member-role">
                  Bible Study &amp; Discipleship Coordinator
                </p>
              </div>
            </div>

            <div
              className="col-lg-8"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <h3 className="section-title text-start">
                About the Bible Study, Discipleship &amp; BEST Ministry
              </h3>
              <p>
                The Bible Study, Discipleship &amp; BEST-P (Bible Exposition
                Self-Training Program) Ministry is dedicated to equipping MUTCU
                members with a deeper understanding of the Holy Scripture and
                empowering spiritual maturity. This ministry runs various
                programs, including small group Bible studies, nurturing classes
                for new believers, and intensive training programs.
              </p>
              <p>
                Caleb Esere, as the coordinator, leads the efforts to ensure
                members are grounded in biblical truths and encouraged to apply
                these teachings in their daily lives. The ministry aims to raise
                a family well-equipped in all aspects of life, exemplary to
                Jesus Christ.
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
            This ministry focuses on discipleship, Bible study, and structured
            training.
          </p>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <ul className="list-unstyled roles-list">
                {[
                  "Coordinating weekly Bible study groups across the university.",
                  "Organizing nurturing classes for new believers.",
                  "Facilitating BEST-P and other in-depth Bible exposition trainings.",
                  "Developing Bible study materials and guides for the fellowship.",
                  "Encouraging personal and corporate Bible reading among members.",
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
            Grow in the Word!
          </h2>
          <p className="section-subtitle">
            Join our Bible Study and Discipleship programs and deepen your walk
            with Christ.
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

export default BibleStudyCoordinatorPage;
