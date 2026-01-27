import { Link } from "react-router-dom";
import "../../assets/mut/css/creative-arts.css";

const CreativeArtsMinistryPage = () => {
  return (
    <div className="creative-arts-page">
      <section
        className="page-hero-section d-flex align-items-center text-center text-white"
        style={{ backgroundImage: "url('/assets/images/dance3.jpg')" }}
      >
        <div className="hero-overlay" />
        <div
          className="container position-relative"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h1 className="display-3 mb-3">MUTCU Creative Arts Ministry</h1>
          <p className="lead">
            Inspiring Love, Hope &amp; Godliness Through Artistic Expression
          </p>
        </div>
      </section>

      <section className="py-5 ministry-intro-section">
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-lg-7 mb-4 mb-lg-0"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <h2 className="section-title text-start">About the Creative Arts Ministry</h2>
              <div className="mb-4">
                <h5 className="text-secondary mb-3">Mandate</h5>
                <p>
                  To use diverse artistic gifts to glorify God, edify the church, and communicate the gospel in a compelling way.
                </p>
              </div>
              <div className="mb-4">
                <h5 className="text-secondary mb-3">Our Mission</h5>
                <p className="lead">
                  The Creative Arts Ministry uses drama, dance, spoken word, poetry, fine arts, and modeling to express faith and reach our community with the Gospel. We believe that artistic expression is a powerful medium for worship, evangelism, and spiritual growth.
                </p>
              </div>
              <div>
                <h5 className="text-secondary mb-3">Our Focus</h5>
                <ul>
                  <li>Excellence in all creative presentations</li>
                  <li>Biblical soundness in all messaging and content</li>
                  <li>Developing artists as worshippers and witnesses</li>
                  <li>Leading Transformation and Advocacy campaigns</li>
                  <li>Supporting social action and Christian witness</li>
                </ul>
              </div>
            </div>
            <div
              className="col-lg-5 text-center"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <img
                src="/assets/images/dance3.jpg"
                alt="Creative Arts Performance"
                className="img-fluid rounded-3 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light creative-ensembles-section">
        <div className="container">
          <h2 className="section-title text-center">Our Creative Sub-Ministries</h2>
          <p className="text-center lead mb-5">
            The Creative Arts Ministry comprises four distinct sub-committees, each dedicated to a unique form of artistic expression.
          </p>
          <div className="row">
            <div
              className="col-md-6 col-lg-3 mb-4"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="creative-card p-4 rounded-3 shadow-sm h-100">
                <i className="fas fa-theater-masks feature-icon mb-3" />
                <h3 className="card-title">Drama Ministry</h3>
                <p>
                  Communicates biblical truths and Christian values through powerful theatrical presentations and performances.
                </p>
                <h6>Includes:</h6>
                <ul className="small">
                  <li>Scriptwriting & directing</li>
                  <li>Character development</li>
                  <li>Skill mentoring</li>
                </ul>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-3 mb-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="creative-card p-4 rounded-3 shadow-sm h-100">
                <i className="fas fa-hand-spock feature-icon mb-3" />
                <h3 className="card-title">Dance Ministry</h3>
                <p>
                  Uses choreographed movements to lead worship and express faith through dynamic physical expression.
                </p>
                <h6>Includes:</h6>
                <ul className="small">
                  <li>Worship dance</li>
                  <li>Choreography</li>
                  <li>Event performances</li>
                </ul>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-3 mb-4"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="creative-card p-4 rounded-3 shadow-sm h-100">
                <i className="fas fa-microphone feature-icon mb-3" />
                <h3 className="card-title">SPARCS Ministry</h3>
                <p>
                  Spoken Word, Poetry, Arts &amp; Creative Skits - expressing faith through creative writing and performance.
                </p>
                <h6>Includes:</h6>
                <ul className="small">
                  <li>Spoken word poetry</li>
                  <li>Creative writing</li>
                  <li>Fine arts presentations</li>
                </ul>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-3 mb-4"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="creative-card p-4 rounded-3 shadow-sm h-100">
                <i className="fas fa-crown feature-icon mb-3" />
                <h3 className="card-title">Models Ministry</h3>
                <p>
                  Serving as ambassadors for MUTCU, promoting Christian character and values through fashion and advocacy.
                </p>
                <h6>Includes:</h6>
                <ul className="small">
                  <li>Mr. &amp; Miss MUTCU leadership</li>
                  <li>Social action campaigns</li>
                  <li>Community transformation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 cta-section text-white">
        <div className="container text-center" data-aos="zoom-in">
          <h2 className="section-title text-white">Join the Creative Arts Ministry!</h2>
          <p className="lead mb-4 text-white-50">
            Whether you're passionate about drama, dance, spoken word, or advocacy, we invite you to use your creative gifts to glorify God and impact our community.
          </p>
          <div className="row justify-content-center">
            <div className="col-md-8 text-center">
              <h5 className="text-white mb-4">How to Get Involved</h5>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <Link to="/contact" className="btn btn-primary btn-lg w-100">
                    Submit Interest <i className="fas fa-hand-fist ms-2" />
                  </Link>
                </div>
                <div className="col-md-6 mb-3">
                  <Link to="/events" className="btn btn-secondary btn-lg w-100">
                    View Upcoming Events <i className="fas fa-calendar ms-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreativeArtsMinistryPage;
