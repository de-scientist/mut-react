// src/pages/committees/TechnicalCoordinatorPage.tsx
import { Link } from "react-router-dom";
import "../../assets/mut/css/technical-ministry.css";

const TechnicalCoordinatorPage = () => {
  return (
    <div className="technical-coordinator-page">
      {/* Hero Section */}
      <section
        className="page-hero-section d-flex align-items-center text-center text-white"
        style={{ backgroundImage: "url('/assets/images/JOSEPH.jpg')" }}
      >
        <div className="hero-overlay" />
        <div
          className="container position-relative"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h1 className="display-3 mb-3">
            Technical Ministry
          </h1>
          <p className="lead">
            Supporting Worship and Ministry Through Technology
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
                  src="/assets/images/JOSEPH.jpg"
                  alt="Joseph Mbogo"
                  className="img-fluid rounded-circle mb-3 border border-3 border-orange"
                />
                <h4 className="member-name">Joseph Mbogo</h4>
                <p className="member-role">Technical Coordinator</p>
              </div>
            </div>

            <div
              className="col-lg-8"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <h3 className="section-title text-start">
                About the Technical Ministry
              </h3>
              <p>
                The Technical Ministry oversees all technical, media, and logistical operations within MUTCU. It ensures that services, meetings, and official events run smoothly, efficiently, and without distraction.
              </p>
              <p>
                Under the leadership of Joseph Mbogo, the ministry unites ushering, sound and audio-visual services, digital ministry, and publicity. Through disciplined stewardship of resources and skills, it supports worship, communication, and outreach in alignment with MUTCU’s mission and values.
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
            The Technical Ministry supports the Union’s activities as outlined in the constitution and policies.
          </p>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <ul className="list-unstyled roles-list">
                {[
                  "Managing sound, audio-visual, and technical equipment during all Union services and events.",
                  "Coordinating livestreaming and digital coverage of fellowships, services, and special programs.",
                  "Producing and distributing publicity materials, including posters and social media content.",
                  "Supervising ushering teams to ensure order, hospitality, and smooth flow during gatherings.",
                  "Maintaining, storing, and safeguarding all technical and media equipment.",
                  "Training and mentoring members involved in technical and media-related ministries.",
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
            Serve with Skill and Commitment
          </h2>
          <p className="section-subtitle">
            Join the Technical Ministry and support MUTCU’s ministry through service and technical excellence.
          </p>

          <Link
            to="/ministries"
            className="btn btn-primary btn-lg me-3"
          >
            Explore Ministries <i className="fas fa-users ms-2" />
          </Link>

          <Link
            to="/events"
            className="btn btn-secondary btn-lg"
          >
            View Events <i className="fas fa-calendar ms-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default TechnicalCoordinatorPage;
