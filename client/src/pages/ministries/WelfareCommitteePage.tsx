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
              <p className="lead">
                The Welfare Committee actively embodies the Union&apos;s
                commitment to community and mutual support. This committee is
                dedicated to assisting members facing various difficulties,
                particularly financial challenges like tuition fees. It serves
                as a tangible expression of God&apos;s love and the Union&apos;s
                solidarity.
              </p>
              <p>
                The committee actively raises funds and organizes initiatives to
                provide practical and spiritual support, ensuring that no member
                feels left behind. This ministry reflects our core value of love
                and community, fostering a truly supportive family environment
                within MUTCU.
              </p>
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
            Key Roles &amp; Activities
          </h2>
          <p className="text-center lead mb-5">
            The Welfare Committee provides practical support and care to
            members.
          </p>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <ul className="list-unstyled roles-list">
                <li data-aos="fade-up" data-aos-delay="100">
                  <i className="fas fa-check-circle me-3" />
                  Actively raising funds to assist members facing financial
                  difficulties, especially with tuition fees.
                </li>
                <li data-aos="fade-up" data-aos-delay="200">
                  <i className="fas fa-check-circle me-3" />
                  Identifying and assessing the welfare needs of Union members.
                </li>
                <li data-aos="fade-up" data-aos-delay="300">
                  <i className="fas fa-check-circle me-3" />
                  Organizing support initiatives, such as food drives, clothing
                  collections, or mentorship programs.
                </li>
                <li data-aos="fade-up" data-aos-delay="400">
                  <i className="fas fa-check-circle me-3" />
                  Providing pastoral care and emotional support to members in
                  need.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 cta-section text-white">
        <div className="container text-center" data-aos="zoom-in">
          <h2 className="section-title text-white">
            Support Our Welfare Initiatives!
          </h2>
          <p className="lead mb-4 text-white-50">
            Join us in extending practical love and support to our MUTCU family.
          </p>
          <Link to="/contact" className="btn btn-primary btn-lg me-3">
            Get Involved <i className="fas fa-hand-fist ms-2" />
          </Link>
          <Link to="/contact" className="btn btn-secondary btn-lg">
            Donate <i className="fas fa-dollar-sign ms-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default WelfareCommitteePage;
