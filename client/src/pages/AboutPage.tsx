import { Link } from "react-router-dom";

const executiveMembers = [
  {
    name: "Purdri Kihika",
    role: "Chairman",
    image: "/assets/images/PADRI.jpeg",
    link: "/committees/chairman",
    accent: "var(--brand-orange)",
  },
  {
    name: "Purity Njeri",
    role: "1st Vice Chair",
    image: "/assets/images/PURITY.jpeg",
    link: "/committees/vice-chair1",
    accent: "var(--brand-navy)",
  },
  {
    name: "David Kimani",
    role: "2nd Vice Chair",
    image: "/assets/images/DAVID.jpeg",
    link: "/committees/vice-chair2",
    accent: "var(--brand-orange)",
  },
  {
    name: "Faith Wavinya",
    role: "Secretary",
    image: "/assets/images/FAITH.jpeg",
    link: "/committees/secretary",
    accent: "var(--brand-navy)",
  },
  {
    name: "Natasha Amani",
    role: "Vice Secretary",
    image: "/assets/images/AMANI.jpeg",
    link: "/committees/vice-secretary",
    accent: "var(--brand-orange)",
  },
  {
    name: "Mercy Mwaura",
    role: "Treasurer",
    image: "/assets/images/MERCY.jpeg",
    link: "/committees/treasurer",
    accent: "var(--brand-navy)",
  },
  {
    name: "Caleb Esere",
    role: "Bible Study & Training / Discipleship Chair",
    image: "/assets/images/CALEB.jpg",
    link: "/committees/bible-study",
    accent: "var(--brand-orange)",
  },
  {
    name: "Martha Thuku",
    role: "Prayer Ministry Coordinator",
    image: "/assets/images/MARTHA.jpeg",
    link: "/committees/prayer",
    accent: "var(--brand-navy)",
  },
  {
    name: "Mercy Mutuku",
    role: "Missions & Evangelism Coordinator",
    image: "/assets/images/MUTUKU.jpeg",
    link: "/committees/missions",
    accent: "var(--brand-orange)",
  },
  {
    name: "Peter Vaati",
    role: "Music Ministry Coordinator",
    image: "/assets/images/PETER.jpg",
    link: "/committees/music",
    accent: "var(--brand-navy)",
  },
  {
    name: "John Mwanthi",
    role: "Technical and Media Ministry Coordinator",
    image: "/assets/images/JOHN.jpeg",
    link: "/committees/technical",
    accent: "var(--brand-orange)",
  },
  {
    name: "Esther Karimeri",
    role: "Creative Arts Ministry Coordinator",
    image: "/assets/images/ESTHER.jpeg",
    link: "/committees/creative",
    accent: "var(--brand-navy)",
  },
];

const coreValues = [
  {
    icon: "fa-cross",
    title: "Faith",
    description:
      "Rooted in the teachings of the Bible and a personal relationship with Jesus Christ expressed through prayer, worship, and in-depth Bible study.",
  },
  {
    icon: "fa-heart",
    title: "Love",
    description:
      "Demonstrating God's unconditional love through genuine fellowship and a welcoming heart for all.",
  },
  {
    icon: "fa-lightbulb",
    title: "Hope",
    description:
      "Being a source of hope through positive words, encouraging actions, and unwavering faith in uncertain times.",
  },
  {
    icon: "fa-church",
    title: "Godliness",
    description:
      "Striving for lives that honour and glorify God in all we do—personally and collectively.",
  },
  {
    icon: "fa-user-check",
    title: "Accountability",
    description:
      "Fostering welfare, unity, and mutual responsibility—being answerable to one another in actions and decisions.",
  },
  {
    icon: "fa-hand-holding-heart",
    title: "Service",
    description:
      "Putting faith into action by serving practical needs within the university and the wider community.",
  },
];

const aims = [
  {
    icon: "fa-book-open",
    title: "Discipleship",
    description:
      "To deepen and strengthen the spiritual life of members through study of the Bible, prayer, and Christian fellowship.",
  },
  {
    icon: "fa-bullhorn",
    title: "Evangelism",
    description:
      "To faithfully proclaim the Gospel of Jesus Christ in word and deed—leading individuals into personal faith and transformed lives as disciples.",
  },
  {
    icon: "fa-globe-africa",
    title: "Mission Work",
    description:
      "To share in witnessing Christ by encouraging members toward practical involvement according to their calling, gifting, and training.",
  },
  {
    icon: "fa-chess-king",
    title: "Leadership Development & Mentorship",
    description:
      "To equip members through modelling and mentorship, fostering responsibility and stewardship—growing leaders with positive influence.",
  },
];

const doctrinalPoints = [
  "The unity of the Father, Son and Holy Spirit in the Godhead.",
  "The sovereignty of God in creation, redemption and final judgment.",
  "The divine inspiration and entire trustworthiness of Holy Scripture and its supreme authority in faith and conduct.",
  "The universal sinfulness and guilt of all men since the fall, rendering them subjects to God’s wrath and condemnation.",
  "Redemption solely through the sacrificial death of the Lord Jesus Christ, the incarnate Son of God.",
  "The bodily resurrection of the Lord Jesus Christ from the dead and His ascension to the right hand of God the Father.",
  "The presence and work of the Holy Spirit in regeneration.",
  "Justification of the sinner by the grace of God through faith alone.",
  "The indwelling and work of the Holy Spirit in every believer.",
  "The one holy universal church which is the body of Christ and to which all believers belong.",
  "The expectation of the personal return of the Lord Jesus Christ.",
  "The unity of all believers in Christ.",
];

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* --- HERO SECTION --- */}
      <section className="about-hero d-flex align-items-center">
        <div className="container text-center hero-content">
          <div className="badge-pill mb-3">MUTCU • Constitution 2025</div>
          <h1 className="display-3 fw-bold mb-3 text-white">
            Our <span className="text-teal">Identity</span> & Faith
          </h1>
          <p className="lead text-white opacity-90 mx-auto col-lg-8">
            Murang&apos;a University of Technology Christian Union (MUTCU) is a
            non-denominational, non-political, and non-profit Christian society
            grounded on the authority of Scripture.
          </p>
        </div>
      </section>

      {/* --- WHO WE ARE --- */}
      <section className="py-5 mt-n6">
        <div className="container">
          <div className="row g-0 rounded-5 shadow-lg overflow-hidden bg-white">
            <div className="col-lg-6 p-5 d-flex flex-column justify-content-center">
              <h6 className="text-orange fw-bold text-uppercase mb-2">
                Our Foundation
              </h6>
              <h2 className="display-6 fw-bold text-navy mb-4">Who We Are</h2>
              <p className="text-muted mb-4">
                MUTCU is a vibrant, student-led Christian Society at Murang&apos;a
                University of Technology, committed to discipleship, evangelism,
                mission work, and leadership development — anchored in the
                supremacy of the Holy Bible.
              </p>

              <div className="p-3 border-start border-4 border-teal bg-light rounded-end">
                <p className="mb-0 small fw-medium text-navy">
                  Affiliated to{" "}
                  <a
                    href="https://focuskenya.org/"
                    className="text-teal text-decoration-none fw-bold"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Fellowship of Christian Unions (FOCUS-KENYA)
                  </a>
                  .
                </p>
              </div>
            </div>

            <div className="col-lg-6 bg-navy d-flex align-items-center justify-content-center p-5">
              <img
                src="/assets/images/best logo.png"
                alt="MUTCU Logo"
                className="img-fluid logo-glow"
                style={{ maxHeight: "250px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- MOTTO / VISION / MISSION --- */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4 text-center">
            {[
              {
                title: "Our Motto",
                text: "Inspire Love, Hope and Godliness.",
                icon: "fa-quote-left",
                bg: "var(--brand-orange)",
              },
              {
                title: "Our Vision",
                text: "To be a model Christian union that cultivates Christ-centeredness among members to positively impact the society.",
                icon: "fa-eye",
                bg: "var(--brand-teal)",
              },
              {
                title: "Our Mission",
                text: "Raising a Christ-like family, equipped in all aspects of life, by encouraging unity as one body and reaching out to non-believers within our community and beyond.",
                icon: "fa-chess-king",
                bg: "var(--brand-navy)",
              },
            ].map((item, i) => (
              <div className="col-md-4" key={i}>
                <div className="principle-card p-5 h-100 rounded-4 shadow-sm">
                  <div
                    className="icon-circle mb-4 mx-auto"
                    style={{ backgroundColor: item.bg }}
                  >
                    <i className={`fas ${item.icon} text-white fs-4`}></i>
                  </div>
                  <h4 className="fw-bold text-navy">{item.title}</h4>
                  <p className="text-muted mb-0">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CORE VALUES --- */}
      <section className="py-5 bg-navy-gradient">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold h1 text-white">Our Core Values</h2>
            <div
              className="mx-auto bg-orange rounded mt-2"
              style={{ height: "4px", width: "50px" }}
            ></div>
            <p className="text-white opacity-75 mt-3 mb-0">
              The values that shape our identity and guide our fellowship.
            </p>
          </div>

          <div className="row g-4">
            {coreValues.map((v, idx) => (
              <div className="col-md-4" key={idx}>
                <div className="aim-card p-4 rounded-4 h-100 border border-white border-opacity-10">
                  <div className="d-flex align-items-start">
                    <i className={`fas ${v.icon} text-teal fs-3 me-3 mt-1`}></i>
                    <div>
                      <h5 className="fw-bold text-white mb-2">{v.title}</h5>
                      <p className="small text-white opacity-75 mb-0">
                        {v.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- OUR AIMS --- */}
      <section className="py-5 bg-light">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-navy h1">Our Aims</h2>
            <p className="text-muted mb-0">
              What we pursue as MUTCU in obedience to Christ and His Word.
            </p>
            <div
              className="mx-auto bg-orange rounded mt-3"
              style={{ height: "4px", width: "50px" }}
            ></div>
          </div>

          <div className="row g-4">
            {aims.map((aim, idx) => (
              <div className="col-md-6 col-lg-3" key={idx}>
                <div className="principle-card p-4 h-100 rounded-4 shadow-sm">
                  <div
                    className="icon-circle mb-3"
                    style={{ backgroundColor: "var(--brand-navy)" }}
                  >
                    <i className={`fas ${aim.icon} text-white fs-5`}></i>
                  </div>
                  <h5 className="fw-bold text-navy">{aim.title}</h5>
                  <p className="text-muted small mb-0">{aim.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- DOCTRINAL BASIS --- */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-lg-5 mb-4 mb-lg-0">
              <h2 className="display-5 fw-bold text-navy mb-4">
                Our Doctrinal Basis
              </h2>
              <p className="text-muted lead">
                The fundamental truths of Christianity that unify our belief and
                guide our conduct.
              </p>
              <div className="bg-orange p-1 rounded w-25"></div>
            </div>
            <div className="col-lg-7">
              <div className="row g-3">
                {doctrinalPoints.map((point, i) => (
                  <div className="col-md-6" key={i}>
                    <div className="bg-light p-3 rounded-3 shadow-sm d-flex align-items-center border-start border-3 border-orange h-100">
                      <i className="fas fa-check-circle text-teal me-2"></i>
                      <span className="small fw-medium text-navy">{point}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- EXECUTIVE COMMITTEE --- */}
      <section className="py-5">
        <div className="container py-4 text-center">
          <h2 className="fw-bold text-navy h1 mb-5">The Executive Committee</h2>
          <div className="row g-4">
            {executiveMembers.map((member, i) => (
              <div key={i} className="col-6 col-md-4 col-lg-3">
                <Link to={member.link} className="text-decoration-none">
                  <div className="leader-card">
                    <div
                      className="leader-img-box mb-3"
                      style={{ borderColor: member.accent }}
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="img-fluid rounded-circle"
                      />
                    </div>
                    <h6 className="fw-bold text-navy mb-1">{member.name}</h6>
                    <p className="text-teal x-small fw-bold text-uppercase mb-0">
                      {member.role}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-5 bg-teal text-navy text-center">
        <div className="container py-4">
          <h2 className="display-6 fw-bold mb-4">
            Become a Part of the Family
          </h2>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link
              to="/register"
              className="btn btn-navy-action px-5 py-3 rounded-pill fw-bold"
            >
              Join MUTCU Now
            </Link>
            <Link
              to="/ministries"
              className="btn btn-outline-navy px-5 py-3 rounded-pill fw-bold"
            >
              Explore Ministries
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        :root {
          --brand-navy: #0A1837;
          --brand-orange: #FF9800;
          --brand-teal: #36D1C4;
        }

        .text-navy { color: var(--brand-navy); }
        .text-teal { color: var(--brand-teal); }
        .text-orange { color: var(--brand-orange); }
        .bg-navy { background-color: var(--brand-navy); }
        .bg-teal { background-color: var(--brand-teal); }
        .bg-orange { background-color: var(--brand-orange); }

        .about-hero {
          background: linear-gradient(rgba(10, 24, 55, 0.85), rgba(10, 24, 55, 0.85)), url('/assets/images/church2.jpg');
          background-size: cover;
          background-position: center;
          height: 450px;
        }

        .mt-n6 { margin-top: -6rem !important; }

        .badge-pill {
          background: rgba(54, 209, 196, 0.2);
          color: var(--brand-teal);
          padding: 6px 16px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.8rem;
          display: inline-block;
        }

        .principle-card {
          background: white;
          transition: 0.3s;
          border: 1px solid #f0f0f0;
        }
        .principle-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important;
        }

        .icon-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bg-navy-gradient {
          background: linear-gradient(135deg, var(--brand-navy) 0%, #1a2a4d 100%);
        }

        .aim-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: 0.3s;
        }
        .aim-card:hover { background: rgba(255, 255, 255, 0.1); }

        .leader-img-box {
          width: 130px;
          height: 130px;
          margin: 0 auto;
          border-radius: 50%;
          padding: 5px;
          border: 3px solid;
          transition: 0.3s;
        }
        .leader-card:hover .leader-img-box { transform: scale(1.08); }
        .leader-img-box img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }

        .btn-navy-action { background: var(--brand-navy); color: white; border: none; }
        .btn-navy-action:hover { background: #152C5B; color: white; }
        .btn-outline-navy { border: 2px solid var(--brand-navy); color: var(--brand-navy); }
        .btn-outline-navy:hover { background: var(--brand-navy); color: white; }

        .x-small { font-size: 0.7rem; letter-spacing: 1px; }
        .logo-glow { filter: drop-shadow(0 0 15px rgba(54, 209, 196, 0.3)); }

        @media (max-width: 991.98px) {
          .mt-n6 { margin-top: -2rem !important; }
          .about-hero { height: 350px; }
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
