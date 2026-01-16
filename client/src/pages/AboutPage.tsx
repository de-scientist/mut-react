import { Link } from 'react-router-dom'

const executiveMembers = [
  { name: 'Purdri Kihika', role: 'Chairman', image: '/assets/images/EZEKIEL.jpg', link: '/committees/chairman', accent: 'var(--brand-orange)' },
  { name: 'Jesca Kinya', role: '1st Vice Chair', image: '/assets/images/JES.jpg', link: '/committees/vice-chair1', accent: 'var(--brand-navy)' },
  { name: 'Martin Gitau', role: '2nd Vice Chair', image: '/assets/images/MARTIN.jpg', link: '/committees/vice-chair2', accent: 'var(--brand-orange)' },
  { name: 'Grace Kanyiri', role: 'Secretary', image: '/assets/images/GRACE.jpg', link: '/committees/secretary', accent: 'var(--brand-navy)' },
  { name: 'Daisy Mutheu', role: 'Vice Secretary', image: '/assets/images/DAISY.jpg', link: '/committees/vice-secretary', accent: 'var(--brand-orange)' },
  { name: 'Joy Karimi', role: 'Treasurer', image: '/assets/images/JOY.jpg', link: '/committees/treasurer', accent: 'var(--brand-navy)' },
  { name: 'Purity Njeri', role: 'Bible Study Coordinator', image: '/assets/images/PURITY.jpg', link: '/committees/bible-study', accent: 'var(--brand-orange)' },
  { name: 'Roy Ndege', role: 'Prayer Coordinator', image: '/assets/images/PRAYER.jpg', link: '/committees/prayer', accent: 'var(--brand-navy)' },
  { name: 'Yusuf Muchiri', role: 'Missions Coordinator', image: '/assets/images/YUSUF.jpg', link: '/committees/missions', accent: 'var(--brand-orange)' },
  { name: 'Jabez Ayugu', role: 'Music Coordinator', image: '/assets/images/JABEZ.jpg', link: '/committees/music', accent: 'var(--brand-navy)' },
  { name: 'Joseph Mbogo', role: 'Technical Coordinator', image: '/assets/images/JOSEPH.jpg', link: '/committees/technical', accent: 'var(--brand-orange)' },
  { name: 'Brian Ingwee', role: 'Creative Ministry', image: '/assets/images/Ingwee.JPG', link: '/committees/creative', accent: 'var(--brand-navy)' },
]

const aims = [
  { icon: 'fa-book-open', title: 'Biblical Discipleship', description: "Deepening understanding of Scripture and encouraging practical application in daily life.", delay: 100 },
  { icon: 'fa-cross', title: 'Evangelism & Outreach', description: 'Reaching out to non-believers within the university and beyond with the Gospel.', delay: 200 },
  { icon: 'fa-hands-praying', title: 'Fellowship & Unity', description: 'Fostering a strong sense of community, living as one body in Christ.', delay: 300 },
  { icon: 'fa-crown', title: 'Leadership Development', description: 'Equipping student leaders with spiritual and practical skills for effective service.', delay: 400 },
  { icon: 'fa-user-graduate', title: 'Academic Excellence', description: "Excelling in academics as a testimony to God's glory and impacting society.", delay: 500 },
  { icon: 'fa-heart-pulse', title: 'Social Responsibility', description: "Reflecting Christ's compassion through community service and social justice.", delay: 600 },
]

const doctrinalPoints = [
  'Unity of the Father, Son, and Holy Spirit.',
  'Divine inspiration and authority of Holy Scripture.',
  'Universal sinfulness and guilt of all mankind.',
  'Redemption solely through the death of Jesus Christ.',
  'The bodily resurrection and ascension of Christ.',
  'Justification of the sinner by grace through faith.',
  'The indwelling and work of the Holy Spirit.',
  'The personal, visible return of our Lord Jesus.',
]

const AboutPage = () => {
  return (
    <div className="about-page">
     {/* --- HERO SECTION --- */}
      <section className="about-hero d-flex align-items-center">
        <div className="container text-center hero-content">
          <div className="badge-pill mb-3">Since Inception</div>
          <h1 className="display-3 fw-bold mb-3 text-white">Our <span className="text-teal">Identity</span> & Faith</h1>
          <p className="lead text-white opacity-90 mx-auto col-lg-7">
            Inspiring Love, Hope, and Godliness within Murang'a University of Technology.
          </p>
        </div>
      </section>

      {/* --- WHO WE ARE --- */}
      <section className="py-5 mt-n6">
        <div className="container">
          <div className="row g-0 rounded-5 shadow-lg overflow-hidden bg-white">
            <div className="col-lg-6 p-5 d-flex flex-column justify-content-center">
              <h6 className="text-orange fw-bold text-uppercase mb-2">Our Foundation</h6>
              <h2 className="display-6 fw-bold text-navy mb-4">Who We Are</h2>
              <p className="text-muted mb-4">
                The Murang'a University of Technology Christian Union (MUTCU) is a vibrant, student-led community dedicated to spiritual excellence and holistic growth.
              </p>
              <div className="p-3 border-start border-4 border-teal bg-light rounded-end">
                <p className="mb-0 small fw-medium text-navy">
                  Proud member of the <a href="https://focuskenya.org/" className="text-teal text-decoration-none fw-bold">Fellowship of Christian Unions (FOCUS-KENYA)</a>.
                </p>
              </div>
            </div>
            <div className="col-lg-6 bg-navy d-flex align-items-center justify-content-center p-5">
              <img src="/assets/images/best logo.png" alt="MUTCU Logo" className="img-fluid logo-glow" style={{ maxHeight: '250px' }} />
            </div>
          </div>
        </div>
      </section>

      {/* --- MISSION / VISION / MOTTO --- */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4 text-center">
            {[
              { title: 'Our Motto', text: 'To Inspire Love, Hope, and Godliness.', icon: 'fa-quote-left', bg: 'var(--brand-orange)' },
              { title: 'Our Vision', text: 'To be a model Christian Union cultivating Christ-centeredness.', icon: 'fa-eye', bg: 'var(--brand-teal)' },
              { title: 'Our Mission', text: 'To raise a family well-equipped in all aspects of life.', icon: 'fa-chess-king', bg: 'var(--brand-navy)' }
            ].map((item, i) => (
              <div className="col-md-4" key={i}>
                <div className="principle-card p-5 h-100 rounded-4 shadow-sm">
                  <div className="icon-circle mb-4 mx-auto" style={{ backgroundColor: item.bg }}>
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

     {/* --- OUR AIMS --- */}
      <section className="py-5 bg-navy-gradient">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold h1 text-white">Our Core Aims</h2>
            <div className="mx-auto bg-orange rounded mt-2" style={{ height: '4px', width: '50px' }}></div>
          </div>
          <div className="row g-4">
            {aims.map((aim, idx) => (
              <div className="col-md-4" key={idx}>
                <div className="aim-card p-4 rounded-4 h-100 border border-white border-opacity-10">
                  <div className="d-flex align-items-start">
                    <i className={`fas ${aim.icon} text-teal fs-3 me-3 mt-1`}></i>
                    <div>
                      <h5 className="fw-bold text-white mb-2">{aim.title}</h5>
                      <p className="small text-white opacity-75 mb-0">{aim.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- DOCTRINAL BASIS --- */}
      <section className="py-5 bg-light">
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-lg-5 mb-4 mb-lg-0">
              <h2 className="display-5 fw-bold text-navy mb-4">Our Doctrinal Basis</h2>
              <p className="text-muted lead">The unchanging truths that form the foundation of our faith and fellowship.</p>
              <div className="bg-orange p-1 rounded w-25"></div>
            </div>
            <div className="col-lg-7">
              <div className="row g-3">
                {doctrinalPoints.map((point, i) => (
                  <div className="col-md-6" key={i}>
                    <div className="bg-white p-3 rounded-3 shadow-sm d-flex align-items-center border-start border-3 border-orange h-100">
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
                    <div className="leader-img-box mb-3" style={{ borderColor: member.accent }}>
                      <img src={member.image} alt={member.name} className="img-fluid rounded-circle" />
                    </div>
                    <h6 className="fw-bold text-navy mb-1">{member.name}</h6>
                    <p className="text-teal x-small fw-bold text-uppercase mb-0">{member.role}</p>
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
          <h2 className="display-6 fw-bold mb-4">Become a Part of the Family</h2>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link to="/contact" className="btn btn-navy-action px-5 py-3 rounded-pill fw-bold">
              Join MUTCU Now
            </Link>
            <Link to="/ministries" className="btn btn-outline-navy px-5 py-3 rounded-pill fw-bold">
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

        .mt-n5 { margin-top: -6rem !important; }

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
        .principle-card:hover { transform: translateY(-10px); box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important; }

        .icon-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bg-navy-gradient { background: linear-gradient(135deg, var(--brand-navy) 0%, #1a2a4d 100%); }

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
          .mt-n5 { margin-top: -2rem !important; }
          .about-hero { height: 350px; }
        }
      `}</style>
    </div>
  )
}

export default AboutPage