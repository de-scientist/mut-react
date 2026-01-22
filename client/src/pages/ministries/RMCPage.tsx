import { Link } from "react-router-dom";
import "../../assets/mut/css/rmc.css";

const RMCPage = () => {
  return (
    <div className="rmc-page">
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
          <h1 className="display-3 mb-3">Resource Mobilization Committee</h1>
          <p className="lead">
            Strategically securing resources to fulfill our God-given mandate
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
              <h2 className="section-title text-start">About the RMC</h2>
              <p className="lead">
                The Resource Mobilization Committee (RMC) is a dedicated team
                tasked with securing the financial and material resources
                necessary for MUTCU to fulfill its vision and mission. We
                provide a proactive approach to funding our mission work,
                evangelism efforts, and leadership development programs.
              </p>
              <p>
                Our work ensures the Union is adequately equipped for all its
                activities and can sustain its impact within the university and
                the wider society.
              </p>
            </div>
            <div
              className="col-lg-5 text-center"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <img
                src="/assets/images/prayer1.jpg"
                alt="Resource Mobilization Committee"
                className="img-fluid rounded-3 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light framework-section">
        <div className="container">
          <h2 className="section-title text-center">
            Operational Framework &amp; Policies
          </h2>
          <p className="text-center lead mb-5">
            Our committee operates under clear policies to ensure transparency
            and effectiveness.
          </p>
          <div className="row justify-content-center">
            <div
              className="col-md-6 col-lg-4 mb-4"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="rmc-card p-4 rounded-3 shadow-sm h-100 text-center">
                <i className="fas fa-hand-holding-usd feature-icon mb-3" />
                <h3 className="card-title mb-2">Financial Accountability</h3>
                <p className="card-text">
                  All funds are handled by the Treasury, with all records open
                  for inspection, ensuring proper stewardship of member
                  offerings and donations.
                </p>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-4 mb-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="rmc-card p-4 rounded-3 shadow-sm h-100 text-center">
                <i className="fas fa-gavel feature-icon mb-3" />
                <h3 className="card-title mb-2">Ethical Standards</h3>
                <p className="card-text">
                  All fundraising methods must be consistent with MUTCU&apos;s
                  doctrinal basis and Christian values.
                </p>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-4 mb-4"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="rmc-card p-4 rounded-3 shadow-sm h-100 text-center">
                <i className="fas fa-chart-line feature-icon mb-3" />
                <h3 className="card-title mb-2">Reporting &amp; Authority</h3>
                <p className="card-text">
                  The RMC is directly accountable to the Executive Council and
                  must obtain prior approval for any fundraising activity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 cta-section text-white">
        <div className="container text-center" data-aos="zoom-in">
          <h2 className="section-title text-white">
            Support Resource Mobilization!
          </h2>
          <p className="lead mb-4 text-white-50">
            Help us secure resources to fulfill MUTCU&apos;s mission.
          </p>
          <Link to="/contact" className="btn btn-primary btn-lg">
            Get Involved <i className="fas fa-hand-fist ms-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default RMCPage;
