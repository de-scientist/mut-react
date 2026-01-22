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
              <h2 className="section-title text-start">About CREAM</h2>
              <p className="lead">
                The Creative Arts Ministry (CREAM) is a vibrant and diverse
                ministry dedicated to using artistic expression to glorify God
                and communicate the gospel. We believe that creativity is a
                divine gift, and we use various mediums like drama, dance, and
                spoken word to inspire, edify, and engage the MUTCU community
                and beyond.
              </p>
              <p>
                CREAM plays a vital role in our union&apos;s outreach and
                internal events, often collaborating with the Music Ministry to
                create powerful and memorable worship experiences. Our mission
                is to raise up a generation of creative worshippers who use
                their talents for God&apos;s kingdom.
              </p>
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
          <h2 className="section-title text-center">Our Creative Outlets</h2>
          <p className="text-center lead mb-5">
            CREAM is a home for all forms of artistic expression including
            drama, dance, spoken word, and modeling.
          </p>
          <div className="row">
            <div
              className="col-md-6 col-lg-4 mb-4"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="creative-card p-4 rounded-3 shadow-sm h-100">
                <i className="fas fa-hand-spock feature-icon mb-3" />
                <h3 className="card-title">Dance</h3>
                <p>
                  The Dance ministry uses choreographed movements to praise and
                  worship God, creating a dynamic and expressive form of prayer.
                </p>
                <p className="text-muted">
                  <i className="fas fa-clock me-2" />
                  <b>Meeting Time:</b> Wednesdays, 7:00 PM - 9:00 PM
                </p>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-4 mb-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="creative-card p-4 rounded-3 shadow-sm h-100">
                <i className="fas fa-theater-masks feature-icon mb-3" />
                <h3 className="card-title">Drama</h3>
                <p>
                  Our drama team presents powerful performances that communicate
                  biblical truths and Christian values through theatrical
                  expression.
                </p>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-4 mb-4"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="creative-card p-4 rounded-3 shadow-sm h-100">
                <i className="fas fa-microphone feature-icon mb-3" />
                <h3 className="card-title">Spoken Word</h3>
                <p>
                  Using poetry and spoken word to express faith, share
                  testimonies, and inspire the community with powerful words.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 cta-section text-white">
        <div className="container text-center" data-aos="zoom-in">
          <h2 className="section-title text-white">Join CREAM!</h2>
          <p className="lead mb-4 text-white-50">
            Express your faith through creativity and artistic talent.
          </p>
          <Link to="/contact" className="btn btn-primary btn-lg">
            Get Involved <i className="fas fa-hand-fist ms-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CreativeArtsMinistryPage;
