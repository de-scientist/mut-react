import { Link } from 'react-router-dom'
import '../../assets/mut/css/about.css'

const ChairmanPage = () => {
  return (
    <div className="chairman-page">
      <section
        className="page-hero-section d-flex align-items-center text-center text-white"
        style={{ backgroundImage: "url('/assets/images/EZEKIEL.jpg')" }}
      >
        <div className="hero-overlay" />
        <div className="container position-relative" data-aos="fade-up" data-aos-duration="1000">
          <h1 className="display-3 mb-3">The Chairman&apos;s Office</h1>
          <p className="lead">Leading MUTCU with Vision and Dedication</p>
        </div>
      </section>

      <section className="py-5 leader-profile-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-6 col-md-4 col-lg-3 mb-4" data-aos="zoom-in" data-aos-delay="100">
              <div className="executive-member-card d-block text-center text-decoration-none rounded-3 shadow-sm h-100">
                <img
                  src="/assets/images/EZEKIEL.jpg"
                  alt="Ezekiel Thaara"
                  className="img-fluid rounded-circle mb-3 border border-3 border-orange"
                />
                <h4 className="member-name">Ezekiel Thaara</h4>
                <p className="member-role">Chairman</p>
              </div>
            </div>
            <div className="col-lg-8" data-aos="fade-left" data-aos-delay="200">
              <h3 className="section-title text-start">About the Chairman&apos;s Office</h3>
              <p>
                The Chairman&apos;s office is the highest executive position within the Murang&apos;a University of Technology Christian
                Union. It is responsible for the overall leadership, strategic direction, and spiritual oversight of the Union. The
                Chairman ensures that all activities align with MUTCU&apos;s motto, vision, and mission, fostering a Christ-centered
                environment for all members.
              </p>
              <p>
                Ezekiel Thaara, as Chairman, embodies the Union&apos;s commitment to inspiring love, hope, and godliness. He presides
                over Executive Council meetings, represents MUTCU in various forums like FOCUS Regional and National Meetings, and
                works closely with all dockets and ministries to ensure the smooth and effective operation of the Union.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light roles-responsibilities-section">
        <div className="container">
          <h2 className="section-title text-center">Key Roles &amp; Responsibilities</h2>
          <p className="text-center lead mb-5">
            The Chairman&apos;s office is central to MUTCU&apos;s governance and spiritual guidance.
          </p>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <ul className="list-unstyled roles-list">
                <li data-aos="fade-up" data-aos-delay="100">
                  <i className="fas fa-check-circle me-3" />
                  Overall leadership and strategic direction of the Union.
                </li>
                <li data-aos="fade-up" data-aos-delay="200">
                  <i className="fas fa-check-circle me-3" />
                  Ensuring adherence to the MUTCU Constitution and operational policies.
                </li>
                <li data-aos="fade-up" data-aos-delay="300">
                  <i className="fas fa-check-circle me-3" />
                  Presiding over all Executive Council meetings and general Union meetings.
                </li>
                <li data-aos="fade-up" data-aos-delay="400">
                  <i className="fas fa-check-circle me-3" />
                  Representing MUTCU in external engagements and partnerships.
                </li>
                <li data-aos="fade-up" data-aos-delay="500">
                  <i className="fas fa-check-circle me-3" />
                  Fostering unity, spiritual growth, and accountability among all executive members and ministries.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 cta-section text-white">
        <div className="container text-center" data-aos="zoom-in">
          <h2 className="section-title text-white">Join Us in Our Mission!</h2>
          <p className="section-subtitle">Inspired by the leadership of our Chairman, we invite you to be part of MUTCU&apos;s journey.</p>
          <Link to="/contact" className="btn btn-primary btn-lg me-3">
            Connect with Leadership <i className="fas fa-envelope ms-2" />
          </Link>
          <Link to="/ministries" className="btn btn-secondary btn-lg">
            Explore Ministries <i className="fas fa-users-cog ms-2" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default ChairmanPage


