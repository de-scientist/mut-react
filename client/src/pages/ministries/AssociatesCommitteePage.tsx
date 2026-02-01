import { Link } from "react-router-dom";
import "../../assets/mut/css/special-committees.css";

const AssociatesCommitteePage = () => {
  return (
    <div className="associates-committee-page">
      <section
        className="page-hero-section d-flex align-items-center text-center text-white"
        style={{ backgroundImage: "url('/assets/images/exec.jpg')" }}
      >
        <div className="hero-overlay" />
        <div className="container position-relative" data-aos="fade-up" data-aos-duration="1000">
          <h1 className="display-3 mb-3">Associates Committee (Alumni)</h1>
          <p className="lead">Mentorship • Partnership • Long-term Support</p>
        </div>
      </section>

      <section className="py-5 ministry-intro-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 mb-4 mb-lg-0" data-aos="fade-right" data-aos-delay="100">
              <h2 className="section-title text-start">About the Associates Committee</h2>
              <div className="mb-4">
                <h5 className="text-secondary mb-3">Mandate</h5>
                <p>
                  To strengthen MUTCU through meaningful engagement with alumni and associates, fostering mentorship, resource support, and long-term partnership that benefits both the Union and its graduates.
                </p>
              </div>
              <div className="mb-4">
                <h5 className="text-secondary mb-3">Our Mission</h5>
                <p className="lead">
                  The Associates Committee connects MUTCU with its alumni community, creating pathways for mentorship, professional networking, and resource mobilization. We celebrate the ongoing impact of graduates and facilitate their continued investment in the Union's mission.
                </p>
              </div>
              <div>
                <h5 className="text-secondary mb-3">Key Focus Areas</h5>
                <ul>
                  <li>Building and maintaining relationships with MUTCU alumni</li>
                  <li>Organizing alumni engagement events and reunions</li>
                  <li>Facilitating mentorship programs connecting alumni with current members</li>
                  <li>Mobilizing resources and support from alumni networks</li>
                  <li>Creating professional development and networking opportunities</li>
                  <li>Celebrating and documenting alumni success stories</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-5 text-center" data-aos="fade-left" data-aos-delay="200">
              <img
                src="/assets/images/exec.jpg"
                alt="Associates Committee"
                className="img-fluid rounded-3 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light roles-responsibilities-section">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">
            Key Roles &amp; Responsibilities
          </h2>
          <p className="text-center lead mb-5" data-aos="fade-up" data-aos-delay="100">
            The Associates Committee builds bridges between MUTCU and its alumni community.
          </p>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <ul className="list-unstyled roles-list">
                <li data-aos="fade-up" data-aos-delay="100">
                  <i className="fas fa-check-circle me-3" />
                  Maintaining updated alumni database and contact information
                </li>
                <li data-aos="fade-up" data-aos-delay="200">
                  <i className="fas fa-check-circle me-3" />
                  Organizing and coordinating alumni events, reunions, and networking sessions
                </li>
                <li data-aos="fade-up" data-aos-delay="300">
                  <i className="fas fa-check-circle me-3" />
                  Facilitating mentorship programs connecting alumni expertise with current members
                </li>
                <li data-aos="fade-up" data-aos-delay="400">
                  <i className="fas fa-check-circle me-3" />
                  Coordinating resource mobilization efforts and fundraising through alumni networks
                </li>
                <li data-aos="fade-up" data-aos-delay="500">
                  <i className="fas fa-check-circle me-3" />
                  Engaging alumni in strategic planning and long-term Union vision
                </li>
                <li data-aos="fade-up" data-aos-delay="600">
                  <i className="fas fa-check-circle me-3" />
                  Showcasing alumni achievements and career pathways as inspiration to current members
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 cta-section text-white">
        <div className="container text-center" data-aos="zoom-in">
          <h2 className="section-title text-white mb-4">Connect With Your MUTCU Family</h2>
          <p className="section-subtitle mb-5">
            Alumni engagement strengthens MUTCU's legacy and impact for future generations.
          </p>
          <div>
            <Link to="/special-committees" className="btn btn-outline-light btn-lg me-3">
              Back to Special Committees <i className="fas fa-arrow-left ms-2" />
            </Link>
            <Link to="/contact" className="btn btn-primary btn-lg">
              Get Involved <i className="fas fa-handshake ms-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AssociatesCommitteePage;
