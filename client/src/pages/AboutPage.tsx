import { Link } from 'react-router-dom'
import '../assets/mut/css/about.css'

const executiveMembers = [
  { name: 'Ezekiel Thaara', role: 'Chairman', image: '/assets/images/EZEKIEL.jpg', link: '/committees/chairman', borderColor: 'border-orange' },
  { name: 'Jesca Kinya', role: '1st Vice Chair', image: '/assets/images/JES.jpg', link: '/committees/vice-chair1', borderColor: 'border-navy' },
  { name: 'Martin Gitau', role: '2nd Vice Chair', image: '/assets/images/MARTIN.jpg', link: '/committees/vice-chair2', borderColor: 'border-orange' },
  { name: 'Grace Kanyiri', role: 'Secretary', image: '/assets/images/GRACE.jpg', link: '/committees/secretary', borderColor: 'border-navy' },
  { name: 'Daisy Mutheu', role: 'Vice Secretary', image: '/assets/images/DAISY.jpg', link: '/committees/vice-secretary', borderColor: 'border-orange' },
  { name: 'Joy Karimi', role: 'Treasurer', image: '/assets/images/JOY.jpg', link: '/committees/treasurer', borderColor: 'border-navy' },
  { name: 'Purity Njeri', role: 'Bible Study & Discipleship Coordinator', image: '/assets/images/PURITY.jpg', link: '/committees/bible-study', borderColor: 'border-orange' },
  { name: 'Roy Ndege', role: 'Prayer Coordinator', image: '/assets/images/PRAYER.jpg', link: '/committees/prayer', borderColor: 'border-navy' },
  { name: 'Yusuf Muchiri', role: 'Missions & Evangelism Coordinator', image: '/assets/images/YUSUF.jpg', link: '/committees/missions', borderColor: 'border-orange' },
  { name: 'Jabez Ayugu', role: 'Music Coordinator', image: '/assets/images/JABEZ.jpg', link: '/committees/music', borderColor: 'border-navy' },
  { name: 'Joseph Mbogo', role: 'Technical Coordinator', image: '/assets/images/JOSEPH.jpg', link: '/committees/technical', borderColor: 'border-orange' },
  { name: 'Brian Ingwee', role: 'Creative Ministry Coordinator', image: '/assets/images/Ingwee.JPG', link: '/committees/creative', borderColor: 'border-navy' },
]

const aims = [
  { icon: 'fa-book-bible', title: 'Biblical Discipleship', description: "To deepen members' understanding of the Bible and encourage practical application of its teachings in their daily lives.", delay: 100 },
  { icon: 'fa-user-plus', title: 'Evangelism & Outreach', description: 'To reach out to non-believers within the university and beyond, sharing the Gospel through various initiatives.', delay: 200 },
  { icon: 'fa-users-line', title: 'Fellowship & Unity', description: 'To foster a strong sense of community, encouraging members to live as one body of Christ, supporting each other.', delay: 300 },
  { icon: 'fa-handshake', title: 'Leadership Development', description: 'To identify, train, and equip student leaders with spiritual and practical skills for effective service within and outside the Union.', delay: 400 },
  { icon: 'fa-graduation-cap', title: 'Academic Excellence', description: "To encourage members to excel in their academic pursuits as a testimony to God's glory and a means of impacting society.", delay: 500 },
  { icon: 'fa-hands-holding-circle', title: 'Social Responsibility', description: 'To engage in community service and social justice initiatives, reflecting Christ\'s love and compassion.', delay: 600 },
]

const doctrinalPoints = [
  'The unity of the Father, the Son and the Holy Spirit in the Godhead.',
  'The sovereignty of God in creation, revelation, redemption and final judgment.',
  'The divine inspiration and infallibility of the Holy Scripture as originally given, and its supreme authority in all matters of faith and conduct.',
  'The universal sinfulness and guilt of all men since the fall, rendering them subject to God\'s wrath and condemnation.',
  'Redemption from the guilt, penalty, dominion and pollution of sin, solely through the sacrificial death of the Lord Jesus Christ.',
  'The bodily resurrection of the Lord Jesus Christ from the dead and His ascension to the right hand of God the Father.',
  'The presence and power of the Holy Spirit in the work of regeneration.',
  'The justification of the sinner by grace alone through faith alone.',
  'The indwelling and work of the Holy Spirit in the believer.',
  'The one Holy Universal Church which is the Body of Christ.',
  'The expectation of the personal, visible return of the Lord Jesus Christ.',
]

const benefits = [
  { icon: 'fa-hands-clapping', title: 'Lively Fellowship', description: 'Experience genuine Christian fellowship and build lasting friendships in a supportive environment.', delay: 100 },
  { icon: 'fa-brain', title: 'Spiritual Growth', description: 'Deepen your faith through Bible studies, discipleship programs, and powerful worship experiences.', delay: 200 },
  { icon: 'fa-person-digging', title: 'Service Opportunities', description: 'Engage in meaningful ministry and outreach, making a tangible difference in the university and beyond.', delay: 300 },
  { icon: 'fa-user-graduate', title: 'Leadership Development', description: 'Develop essential leadership skills through various roles and mentorship opportunities.', delay: 400 },
  { icon: 'fa-hand-holding-dollar', title: 'Welfare Support', description: 'Receive and offer support through our Welfare Committee, a tangible expression of community care.', delay: 500 },
  { icon: 'fa-lightbulb', title: 'Impactful Presence', description: 'Contribute to a Christ-centered environment that impacts the entire university and wider society.', delay: 600 },
]

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Page Hero Section */}
      <section
        className="page-hero-section d-flex align-items-center text-center text-white"
        style={{ 
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/assets/images/church2.jpg')",
          height: '60vh',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container" data-aos="fade-up" data-aos-duration="1000">
          <span className="badge bg-primary px-3 py-2 mb-3 text-uppercase">Establishment & Faith</span>
          <h1 className="display-2 fw-bold mb-3">About MUTCU</h1>
          <p className="lead fs-4 opacity-75">Inspiring Love, Hope & Godliness Since Inception</p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-5 introduction-section">
        <div className="container py-lg-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-7" data-aos="fade-right">
              <div className="pe-lg-5">
                <h6 className="text-primary fw-bold text-uppercase mb-2">Our Identity</h6>
                <h2 className="display-5 fw-bold mb-4">Who We Are</h2>
                <p className="lead text-dark mb-4">
                  The Murang'a University of Technology Christian Union (MUTCU) is a vibrant, student-led community dedicated to spiritual excellence and holistic growth.
                </p>
                <p className="text-muted">
                  As a proud member of the{' '}
                  <a href="https://focuskenya.org/" target="_blank" rel="noopener noreferrer" className="fw-bold text-decoration-none text-primary">
                    Fellowship of Christian Unions - Kenya (FOCUS-KENYA)
                  </a>
                  , we operate under a national framework of support and accountability. This ensures our mission remains theologically sound and impactful.
                </p>
              </div>
            </div>
            <div className="col-lg-5 text-center" data-aos="fade-left">
              <div className="p-4 bg-white shadow-lg rounded-4">
                <img src="/assets/images/Full Logo.png" alt="MUTCU Logo" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guiding Principles Section */}
      <section className="py-5 bg-light principles-section border-top border-bottom">
        <div className="container py-lg-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">Our Guiding Principles</h2>
            <div className="mx-auto bg-primary rounded" style={{ height: '4px', width: '60px' }}></div>
          </div>

          <div className="row g-4">
            {[
              { icon: 'fa-bullhorn', color: 'bg-primary-subtle text-primary', title: 'Our Motto', text: '"To Inspire Love, Hope, and Godliness."', desc: 'A daily call to action in every interaction.' },
              { icon: 'fa-eye', color: 'bg-success-subtle text-success', title: 'Our Vision', text: '"To be a model Christian Union cultivating Christ-centeredness."', desc: 'Aspiring to be an exemplary union for societal influence.' },
              { icon: 'fa-hands-helping', color: 'bg-warning-subtle text-warning', title: 'Our Mission', text: '"To raise a family well-equipped in all aspects of life."', desc: 'Equipping members holistically and reaching out beyond.' }
            ].map((principle, idx) => (
              <div className="col-md-4" key={idx} data-aos="zoom-in" data-aos-delay={idx * 100}>
                <div className="card border-0 shadow-sm h-100 p-4 text-center rounded-4">
                  <div className={`rounded-circle ${principle.color} d-inline-flex align-items-center justify-content-center mx-auto mb-4`} style={{ width: '70px', height: '70px' }}>
                    <i className={`fas ${principle.icon} fs-3`} />
                  </div>
                  <h4 className="fw-bold">{principle.title}</h4>
                  <p className="fw-semibold text-primary mb-3 small">{principle.text}</p>
                  <p className="text-muted mb-0">{principle.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctrinal Basis Section */}
      <section className="py-5 doctrinal-section bg-dark text-white position-relative overflow-hidden">
        <div className="container position-relative z-1 py-4">
          <h2 className="display-6 fw-bold text-center mb-5">Our Doctrinal Basis</h2>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="p-5 rounded-4" style={{ backgroundColor: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
                <div className="row g-4">
                  {doctrinalPoints.map((point, index) => (
                    <div className="col-md-6" key={index} data-aos="fade-up" data-aos-delay={index * 50}>
                      <div className="d-flex align-items-start">
                        <i className="fas fa-check-circle text-primary mt-1 me-3" />
                        <p className="mb-0 opacity-75">{point}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-5 executive-committee-section">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-2">The Executive Committee</h2>
            <p className="text-muted">Leading MUTCU with dedication for the 2024/2025 Spiritual Year.</p>
          </div>

          <div className="row g-4">
            {executiveMembers.map((member, index) => (
              <div key={index} className="col-6 col-md-4 col-lg-3" data-aos="fade-up">
                <Link to={member.link} className="text-decoration-none group">
                  <div className="card border-0 text-center h-100 p-3 shadow-hover rounded-4 transition-all overflow-hidden">
                    <div className="position-relative d-inline-block mx-auto mb-3">
                       <img
                        src={member.image}
                        alt={member.name}
                        className={`img-fluid rounded-circle border border-4 ${member.borderColor}`}
                        style={{ width: '130px', height: '130px', objectFit: 'cover' }}
                      />
                    </div>
                    <h5 className="fw-bold text-dark mb-1">{member.name}</h5>
                    <p className="small text-muted text-uppercase mb-0">{member.role}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container py-4">
          <h2 className="fw-bold text-center mb-5">Why Join MUTCU?</h2>
          <div className="row g-4">
            {benefits.map((benefit, idx) => (
              <div className="col-md-4" key={idx}>
                <div className="h-100 p-4 rounded-4" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                  <i className={`fas ${benefit.icon} mb-3 fs-3 text-warning`} />
                  <h5 className="fw-bold">{benefit.title}</h5>
                  <p className="opacity-75 small mb-0">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/contact" className="btn btn-warning btn-lg px-5 py-3 rounded-pill fw-bold me-md-3 mb-3 mb-md-0 shadow">
              Join MUTCU Today! <i className="fas fa-arrow-right ms-2" />
            </Link>
            <Link to="/ministries" className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill fw-bold shadow">
              Explore Ministries
            </Link>
          </div>
        </div>
      </section>
      
      {/* ADDED STYLES FOR HOVER EFFECTS */}
      <style>{`
        .shadow-hover:hover {
          transform: translateY(-10px);
          box-shadow: 0 1rem 3rem rgba(0,0,0,0.175) !important;
        }
        .transition-all { transition: all 0.3s ease-in-out; }
        .group:hover .rounded-circle { transform: scale(1.05); transition: all 0.3s ease; }
      `}</style>
    </div>
  )
}

export default AboutPage