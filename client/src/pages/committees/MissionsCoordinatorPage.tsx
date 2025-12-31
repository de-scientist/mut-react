// src/pages/committees/MissionsCoordinatorPage.tsx
import { Link } from "react-router-dom";
import "../../assets/mut/css/missions-evangelism.css";

const MissionsCoordinatorPage = () => {
  return (
    <div className="missions-coordinator-page">
      {/* Hero Section */}
      <section
        className="page-hero-section d-flex align-items-center text-center text-white"
        style={{ backgroundImage: "url('/assets/images/YUSUF.jpg')" }}
      >
        <div className="hero-overlay" />
        <div
          className="container position-relative"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h1 className="display-3 mb-3">
            Missions &amp; Evangelism Ministry
          </h1>
          <p className="lead">
            Sharing the Gospel and Impacting Communities
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
                  src="/assets/images/YUSUF.jpg"
                  alt="Yusuf Muchiri"
                  className="img-fluid rounded-circle mb-3 border border-3 border-orange"
                />
                <h4 className="member-name">Yusuf Muchiri</h4>
                <p className="member-role">
                  Missions &amp; Evangelism Coordinator
                </p>
              </div>
            </div>

            <div
              className="col-lg-8"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <h3 className="section-title text-start">
                About the Missions &amp; Evangelism Ministry
              </h3>
              <p>
                The Missions and Evangelism Ministry is at the forefront of
                MUTCU&apos;s outreach efforts, dedicated to sharing the Gospel of
                Jesus Christ both within the university and in wider communities.
                This ministry organizes campus outreach programs, annual
                missions, and extends its reach through the Hope Ministry,
                visiting prisons and hospitals to bring spiritual and material
                support.
              </p>
              <p>
                Yusuf Muchiri, as the coordinator, leads the strategic planning
                and execution of these initiatives, ensuring that MUTCU actively
                fulfills its mission of reaching out to non-believers. The
                ministry is also responsible for the Kairos Course, enhancing
                global understanding of God&apos;s mission.
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
            This ministry is dedicated to spreading the Gospel and serving
            others.
          </p>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <ul className="list-unstyled roles-list">
                {[
                  "Organizing and leading campus outreach programs to share the Gospel with students.",
                  "Planning and executing annual missions to various communities, including pre-visits and follow-ups.",
                  "Coordinating the Hope Ministry for visits to prisons and hospitals, providing spiritual and material support.",
                  "Developing and implementing a detailed mission checklist for effective mission planning.",
                  "Facilitating the Kairos Course annually to deepen members' understanding of God's global mission.",
                  "Partnering with relevant organizations for financial and material support for mission work.",
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
            Be a Part of Our Outreach!
          </h2>
          <p className="section-subtitle">
            Join the Missions &amp; Evangelism team and help us transform lives.
          </p>

          <Link
            to="/ministries"
            className="btn btn-primary btn-lg me-3"
          >
            Explore All Ministries <i className="fas fa-users-cog ms-2" />
          </Link>

          <Link
            to="/contact"
            className="btn btn-secondary btn-lg"
          >
            Partner With Us <i className="fas fa-handshake ms-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default MissionsCoordinatorPage;
