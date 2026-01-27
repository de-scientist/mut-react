import { Link } from "react-router-dom";
import "../../assets/mut/css/about.css";

const WelfareCommitteePage = () => {
  return (
    <div className="welfare-committee-page">
      <section
        className="page-hero-section d-flex align-items-center text-center text-white"
        style={{ backgroundImage: "url('/assets/images/prayer1.jpg')" }}
      >
        <div className="hero-overlay" />
        <div
          className="container position-relative"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h1 className="display-3 mb-3">MUTCU Welfare Committee</h1>
          <p className="lead">Caring for Our Family in Christ</p>
        </div>
      </section>

      <section className="py-5 ministry-detail-section">
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-lg-7 mb-4 mb-lg-0"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <h2 className="section-title text-start">
                About the Welfare Committee
              </h2>
              <div>
                <h5 className="text-secondary">Mandate</h5>
                <p>
                  To demonstrate Christ&apos;s love through practical, emotional, and spiritual support to Union members.
                </p>
              </div>
              <div>
                <h5 className="text-secondary">Our Mission</h5>
                <p>
                  The Welfare Committee actively embodies the Union&apos;s commitment to community and mutual support. We are dedicated to assisting members facing various difficulties and providing tangible expressions of God&apos;s love and solidarity. The committee raises funds, identifies welfare needs, and organizes support initiatives to ensure that no member feels left behind, fostering a truly supportive family environment within MUTCU.
                </p>
              </div>
              <div>
                <h5 className="text-secondary">Our Focus Areas</h5>
                <ul>
                  <li>Identifying and assessing welfare needs of members</li>
                  <li>Financial support with tuition fees and emergencies</li>
                  <li>Emotional and pastoral care for members in need</li>
                  <li>Mentorship and guidance from counselling coordinators</li>
                  <li>Community-specific support through Ladies&apos; and Gents&apos; sub-committees</li>
                </ul>
              </div>
            </div>
            <div
              className="col-lg-5 text-center"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <img
                src="/assets/images/prayer1.jpg"
                alt="Welfare Committee"
                className="img-fluid rounded-3 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light roles-responsibilities-section">
        <div className="container">
          <h2 className="section-title text-center">
            Committee Structure &amp; Leadership
          </h2>
          <p className="text-center lead mb-5">
            The Welfare Committee comprises dedicated leaders committed to member care and support.
          </p>
          <div className="row g-4 justify-content-center">
            <div className="col-lg-6 col-md-6" data-aos="fade-up" data-aos-delay="100">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-secondary">
                    <i className="fas fa-chair me-2 text-primary" />
                    Welfare Coordinator (Chairperson)
                  </h5>
                  <p className="card-text small">
                    Oversees committee operations, fund management, coordinates welfare case identification and assessment, ensures timely support delivery.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6" data-aos="fade-up" data-aos-delay="200">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-secondary">
                    <i className="fas fa-users me-2 text-primary" />
                    Vice Chairs &amp; Officers
                  </h5>
                  <p className="card-text small">
                    1st Vice Chair (Female), 2nd Vice Chair (Male), Treasurer, Secretary/Treasurer - support chairperson in planning, organizing fundraising, record-keeping.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6" data-aos="fade-up" data-aos-delay="300">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-secondary">
                    <i className="fas fa-heart me-2 text-primary" />
                    Guidance &amp; Counselling Coordinators
                  </h5>
                  <p className="card-text small">
                    Provide pastoral care, emotional and spiritual support, coordinate mentorship, connect members with professional counselling services when needed.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6" data-aos="fade-up" data-aos-delay="400">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-secondary">
                    <i className="fas fa-people-group me-2 text-primary" />
                    Ladies&apos; &amp; Gents&apos; Sub-Committees
                  </h5>
                  <p className="card-text small">
                    Provide gender-specific support and mentorship, organize community-focused initiatives, coordinate with Anza FYT for youth welfare programs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 cta-section text-white">
        <div className="container text-center" data-aos="zoom-in">
          <h2 className="section-title text-white">
            Join Us in Caring for Our MUTCU Family
          </h2>
          <p className="lead mb-4 text-white-50">
            Whether through volunteering, fundraising, or donating, your involvement makes a tangible difference in members&apos; lives.
          </p>
          <Link to="/contact" className="btn btn-primary btn-lg me-3">
            Get Involved <i className="fas fa-hand-fist ms-2" />
          </Link>
          <Link to="/contact" className="btn btn-secondary btn-lg">
            Make a Donation <i className="fas fa-heart ms-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default WelfareCommitteePage;
