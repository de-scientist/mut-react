// src/pages/committees/MusicCoordinatorPage.tsx
import { Link } from "react-router-dom";
import "../../assets/mut/css/music-ministry.css";

const MusicCoordinatorPage = () => {
  return (
    <div className="music-coordinator-page">
      {/* Hero Section */}
      <section
        className="page-hero-section d-flex align-items-center text-center text-white"
        style={{ backgroundImage: "url('/assets/images/PETER.jpeg')" }}
      >
        <div className="hero-overlay" />
        <div
          className="container position-relative"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h1 className="display-3 mb-3">Music Ministry</h1>
          <p className="lead">
            Leading Worship and Glorifying God Through Song
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
                  src="/assets/images/PETER.jpeg"
                  alt="Peter Vaati"
                  className="img-fluid rounded-circle mb-3 border border-3 border-navy"
                />
                <h4 className="member-name">Peter Vaati</h4>
                <p className="member-role">Music Coordinator</p>
              </div>
            </div>

            <div
              className="col-lg-8"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <h3 className="section-title text-start">
                About the Music Ministry
              </h3>
              <p>
                The Music Ministry of MUTCU led by Peter Vaati is dedicated to leading the Union in
                vibrant and spiritually uplifting worship experiences.
                Comprising various teams including the choir, band,
                instrumentalists, and praise and worship leaders, this ministry
                plays a crucial role in creating an atmosphere where members can
                connect with God through music and song.
              </p>
              <p>
                Our goal is to foster a heart of worship and praise among the
                MUTCU family, ensuring that all musical presentations are
                excellent and align with the Union&apos;s spiritual goals. We
                believe that music is a powerful tool for evangelism,
                edification, and glorifying God.
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
            The Music Ministry leads MUTCU in worship and praise through various
            ensembles and events.
          </p>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <ul className="list-unstyled roles-list">
                {[
                  "Leading praise and worship during weekly fellowships and Sunday services.",
                  "Holding weekly rehearsals for choir, band, instrumentalists, and praise teams.",
                  "Ministering during major Union events like MULEWO, Praise Fests, and special nights.",
                  "Training and mentoring aspiring musicians in the Union.",
                  "Collaborating with other ministries for creative worship experiences.",
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
            Join Our Music Ministry!
          </h2>
          <p className="section-subtitle">
            If you have a passion for worship through music, we invite you to
            join the team.
          </p>

          <Link
            to="/ministries"
            className="btn btn-primary btn-lg me-3"
          >
            Explore Ministries <i className="fas fa-users-cog ms-2" />
          </Link>

          <Link
            to="/events"
            className="btn btn-secondary btn-lg"
          >
            View Events <i className="fas fa-calendar-alt ms-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default MusicCoordinatorPage;
