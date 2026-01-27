import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useTimedSuccess } from "../../hooks/useTimedSuccess";
import "../../assets/mut/css/about.css";

const WelfareCommitteePage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [areaOfInterest, setAreaOfInterest] = useState("");
  const [joinMessage, setJoinMessage] = useState("");
  const {
    visible: showSuccess,
    trigger: showSuccessMessage,
    hide,
  } = useTimedSuccess(0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !areaOfInterest) return;

    console.log("Welfare Committee Join Request Submitted:", {
      name: fullName,
      email,
      interest: areaOfInterest,
      message: joinMessage,
    });

    setFullName("");
    setEmail("");
    setAreaOfInterest("");
    setJoinMessage("");
    showSuccessMessage();
  };

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

      <section className="py-5 ministry-intro-section">
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
              <div className="mb-4">
                <h5 className="text-secondary mb-3">Mandate</h5>
                <p>
                  To demonstrate Christ&apos;s love by providing practical, emotional, and spiritual support to members in need.
                </p>
              </div>
              <div className="mb-4">
                <h5 className="text-secondary mb-3">Our Mission</h5>
                <p className="lead">
                  The Welfare Committee actively embodies the Union&apos;s commitment to community and mutual support. We are dedicated to assisting members facing various difficulties and providing tangible expressions of God&apos;s love and solidarity. Through fundraising, need assessment, and organized support initiatives, we ensure that no member feels left behind, fostering a truly supportive family environment within MUTCU.
                </p>
              </div>
              <div>
                <h5 className="text-secondary mb-3">Our Commitment</h5>
                <ul>
                  <li>Swift identification and compassionate response to welfare needs</li>
                  <li>Confidential handling of sensitive member situations</li>
                  <li>Holistic support—financial, emotional, and spiritual</li>
                  <li>Building a culture of mutual care and accountability</li>
                  <li>Empowering members through mentorship and counselling</li>
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

      {/* Support Programs */}
      <section className="py-5 bg-light sub-ministries-section">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">
            Our Support Programs &amp; Initiatives
          </h2>
          <p className="text-center lead mb-5" data-aos="fade-up" data-aos-delay="100">
            The Welfare Committee provides comprehensive support across multiple dimensions of member wellbeing.
          </p>

          <div className="row">
            {/* Financial Support */}
            <div
              className="col-lg-6 mb-4"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="sub-ministry-card p-4 rounded-3 shadow-sm h-100">
                <div className="d-flex align-items-center mb-3">
                  <i className="fas fa-hand-holding-heart choir-icon me-3" />
                  <h3 className="card-title mb-0">Financial Support</h3>
                </div>
                <p>
                  MUTCU mobilizes for financial support by engaging students in community fundraising initiatives to assist members facing critical financial needs. The Union provides direct support according to set policies, supplementing efforts by students to raise funds for tuition fees, emergency situations, and medical expenses.
                </p>
                <h6 className="text-secondary mb-2">Support Services:</h6>
                <ul>
                  <li>Community-driven fundraising initiatives</li>
                  <li>Student engagement in financial mobilization</li>
                  <li>Direct Union support as per organizational policies</li>
                  <li>Coordination of tuition fee and emergency financial assistance</li>
                </ul>
              </div>
            </div>

            {/* Pastoral Care */}
            <div
              className="col-lg-6 mb-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="sub-ministry-card p-4 rounded-3 shadow-sm h-100">
                <div className="d-flex align-items-center mb-3">
                  <i className="fas fa-heart praise-icon me-3" />
                  <h3 className="card-title mb-0">Pastoral &amp; Emotional Care</h3>
                </div>
                <p>
                  Offering confidential counsel, emotional support, and spiritual guidance through trained counsellors who understand the unique challenges students face.
                </p>
                <h6 className="text-secondary mb-2">Care Services:</h6>
                <ul>
                  <li>One-on-one pastoral counselling sessions</li>
                  <li>Spiritual guidance and prayer support</li>
                  <li>Crisis intervention and support</li>
                  <li>Referral to professional counselling services</li>
                </ul>
              </div>
            </div>

            {/* Mentorship */}
            <div
              className="col-lg-6 mb-4"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="sub-ministry-card p-4 rounded-3 shadow-sm h-100">
                <div className="d-flex align-items-center mb-3">
                  <i className="fas fa-people-group band-icon me-3" />
                  <h3 className="card-title mb-0">Mentorship &amp; Accountability</h3>
                </div>
                <p>
                  Pairing members with mentors for personalized support, guidance through difficult seasons, and accountability in spiritual and personal growth.
                </p>
                <h6 className="text-secondary mb-2">Mentorship Activities:</h6>
                <ul>
                  <li>Mentor-mentee matching programs</li>
                  <li>Regular mentorship meetings and check-ins</li>
                  <li>Accountability partnerships</li>
                  <li>Guidance through major life decisions</li>
                </ul>
              </div>
            </div>

            {/* Gender-Specific Support */}
            <div
              className="col-lg-6 mb-4"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="sub-ministry-card p-4 rounded-3 shadow-sm h-100">
                <div className="d-flex align-items-center mb-3">
                  <i className="fas fa-handshake instrumentalist-icon me-3" />
                  <h3 className="card-title mb-0">Ladies&apos; &amp; Gents&apos; Initiatives</h3>
                </div>
                <p>
                  Gender-specific support programs that address unique challenges and needs, with dedicated sub-committees for ladies and gents providing targeted mentorship.
                </p>
                <h6 className="text-secondary mb-2">Sub-Committee Activities:</h6>
                <ul>
                  <li>Women&apos;s health and wellbeing programs</li>
                  <li>Gents&apos; character and leadership development</li>
                  <li>Community-building events and retreats</li>
                  <li>Youth-focused initiatives with Anza FYT</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Committee Leadership */}
      <section className="py-5 roles-responsibilities-section">
        <div className="container">
          <h2 className="section-title text-center" data-aos="fade-up">
            Committee Structure &amp; Leadership Roles
          </h2>
          <p className="text-center lead mb-5" data-aos="fade-up" data-aos-delay="100">
            Our dedicated leaders ensure compassionate, efficient, and confidential member support.
          </p>
          <div className="row">
            <div className="col-md-6 col-lg-3 mb-4" data-aos="zoom-in" data-aos-delay="100">
              <div className="leadership-card text-center p-4 rounded-3 shadow-sm h-100">
                <i className="fas fa-chair leadership-icon mb-3" />
                <h5 className="card-title">Welfare Coordinator</h5>
                <p className="small text-muted">
                  Oversees all welfare operations, identifies needs, manages support delivery with utmost confidentiality
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-4" data-aos="zoom-in" data-aos-delay="200">
              <div className="leadership-card text-center p-4 rounded-3 shadow-sm h-100">
                <i className="fas fa-heart leadership-icon mb-3" />
                <h5 className="card-title">Counselling Coordinators</h5>
                <p className="small text-muted">
                  Provide pastoral care, emotional support, and guide members to professional services when needed
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-4" data-aos="zoom-in" data-aos-delay="300">
              <div className="leadership-card text-center p-4 rounded-3 shadow-sm h-100">
                <i className="fas fa-users leadership-icon mb-3" />
                <h5 className="card-title">Ladies&apos; Sub-Committee Lead</h5>
                <p className="small text-muted">
                  Coordinates women-specific support, mentorship, and community-focused initiatives
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-4" data-aos="zoom-in" data-aos-delay="400">
              <div className="leadership-card text-center p-4 rounded-3 shadow-sm h-100">
                <i className="fas fa-people-group leadership-icon mb-3" />
                <h5 className="card-title">Gents&apos; Sub-Committee Lead</h5>
                <p className="small text-muted">
                  Oversees male mentorship, character development, and brotherhood initiatives
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-5 cta-section text-white">
        <div className="container">
          <h2 className="section-title text-center text-white mb-5" data-aos="fade-up">
            Get Involved in the Welfare Ministry
          </h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <select
                      className="form-select form-select-lg"
                      value={areaOfInterest}
                      onChange={(e) => setAreaOfInterest(e.target.value)}
                    >
                      <option value="">Select Your Interest...</option>
                      <option value="Financial Support">Financial Support Programs</option>
                      <option value="Pastoral Care">Pastoral &amp; Emotional Care</option>
                      <option value="Mentorship">Mentorship &amp; Counselling</option>
                      <option value="Fundraising">Fundraising &amp; Volunteering</option>
                      <option value="General Interest">General Interest</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <textarea
                      className="form-control form-control-lg"
                      rows={1}
                      placeholder="Tell us how you'd like to help..."
                      value={joinMessage}
                      onChange={(e) => setJoinMessage(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg w-100 mb-3"
                    >
                      Submit Interest <i className="fas fa-arrow-right ms-2" />
                    </button>
                  </div>
                </div>
              </form>

              {showSuccess && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  <i className="fas fa-check-circle me-2" />
                  <strong>Thank you!</strong> We&apos;ve received your interest. The Welfare Committee will reach out soon!
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={hide}
                  />
                </div>
              )}

              <div className="row mt-4 text-center">
                <div className="col-md-6 mb-2">
                  <Link to="/ministries" className="btn btn-outline-light btn-lg w-100">
                    View All Ministries <i className="fas fa-arrow-right ms-2" />
                  </Link>
                </div>
                <div className="col-md-6 mb-2">
                  <Link to="/contact" className="btn btn-outline-light btn-lg w-100">
                    Report a Need <i className="fas fa-hand-holding-heart ms-2" />
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

export default WelfareCommitteePage;
