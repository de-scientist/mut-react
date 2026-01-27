import { Link } from "react-router-dom";

const BibleStudyTrainingCommitteePage = () => {
  return (
    <div className="bible-study-ministry-page">
      <section
        className="page-hero-section d-flex align-items-center text-center text-white"
        style={{ backgroundImage: "url('/assets/images/bs1.jpg')" }}
      >
        <div className="hero-overlay" />
        <div className="container position-relative" data-aos="fade-up">
          <h1 className="display-3 mb-3">Bible Study &amp; Training</h1>
          <p className="lead">
            Scripture • Teaching • Training that equips a Christ-like family
          </p>
        </div>
      </section>

      <section className="py-5 introduction-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7" data-aos="fade-right">
              <h2 className="section-title">About the Committee</h2>
              <p className="lead">
                The Bible Study &amp; Training Committee strengthens the union
                through Bible-based teaching, structured studies, and training
                programs that build strong doctrine and practical Christian
                living.
              </p>
              <p className="text-muted">
                From exposition to small groups and training initiatives like
                BEST-P, this committee helps members grow in understanding and
                application of Scripture.
              </p>

              <Link to="/contact" className="btn btn-primary me-3">
                Join Bible Study &amp; Training <i className="fas fa-users ms-2" />
              </Link>
              <Link to="/ministries" className="btn btn-secondary">
                Back to Committees <i className="fas fa-arrow-left ms-2" />
              </Link>
            </div>

            <div className="col-lg-5 mt-4 mt-lg-0" data-aos="fade-left">
              <img
                src="/assets/images/bs1.jpg"
                alt="Bible Study"
                className="img-fluid rounded-3 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sub-ministries */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="section-title text-center">Sub-Ministries</h2>
          <p className="text-center lead mb-5">
            Learning spaces and training structures that build strong believers.
          </p>

          <div className="row g-4 justify-content-center">
            {[
              {
                title: "Bible Study Groups",
                icon: "fa-users",
                desc: "Small groups focused on consistent Scripture study, discussion, and application.",
              },
              {
                title: "BEST-P Program",
                icon: "fa-graduation-cap",
                desc: "Bible Exposition Self Training Program—personal study and growth in the Word.",
              },
              {
                title: "Bible Study Exposition",
                icon: "fa-book-open",
                desc: "Structured teaching sessions that build sound doctrine and practical understanding.",
              },
              {
                title: "Training Forums",
                icon: "fa-chalkboard-teacher",
                desc: "Workshops and trainings that equip members for service, leadership, and ministry.",
              },
            ].map((x, i) => (
              <div className="col-md-6 col-lg-3" key={i} data-aos="zoom-in">
                <div className="principle-card h-100 text-center">
                  <i className={`fas ${x.icon} feature-icon mb-3`} />
                  <h4 className="card-title">{x.title}</h4>
                  <p className="text-muted mb-0">{x.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <Link to="/contact" className="btn btn-primary">
              Get Equipped <i className="fas fa-arrow-right ms-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BibleStudyTrainingCommitteePage;
