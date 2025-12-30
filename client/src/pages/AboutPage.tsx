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
  'Redemption from the guilt, penalty, dominion and pollution of sin, solely through the sacrificial death (as our representative and substitute) of the Lord Jesus Christ, the incarnate Son of God.',
  'The bodily resurrection of the Lord Jesus Christ from the dead and His ascension to the right hand of God the Father.',
  'The presence and power of the Holy Spirit in the work of regeneration.',
  'The justification of the sinner by grace alone through faith alone.',
  'The indwelling and work of the Holy Spirit in the believer.',
  'The one Holy Universal Church which is the Body of Christ and to which all true believers belong.',
  'The expectation of the personal, visible return of the Lord Jesus Christ.',
]

const benefits = [
  { icon: 'fa-hands-clapping', title: 'lively Fellowship', description: 'Experience genuine Christian fellowship and build lasting friendships in a supportive environment.', delay: 100 },
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
        style={{ backgroundImage: "url('/assets/images/church2.jpg')" }}
      >
        <div className="hero-overlay" />
        <div className="container position-relative" data-aos="fade-up" data-aos-duration="1000">
          <h1 className="display-3 mb-3">About MUTCU</h1>
          <p className="lead">Inspiring Love, Hope &amp; Godliness</p>
        </div>
      </section>

      {/* Introduction and Overview */}
      <section className="py-5 introduction-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 mb-4 mb-lg-0" data-aos="fade-right" data-aos-delay="100">
              <h2 className="section-title">Who We Are</h2>
              <p className="lead">
                The Murang&apos;a University of Technology Christian Union (MUTCU) is a lively, student-led religious organization
                operating within the university. We are a non-denominational, non-political and non-profit making society committed to
                building in spiritual growth, nurturing leadership, and impacting society with the Gospel of Jesus Christ.
              </p>
              <p>
                As a proud member of the{' '}
                <a
                  href="https://focuskenya.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none mutcu-link-orange"
                >
                  Fellowship of Christian Unions - Kenya (FOCUS-KENYA)
                </a>
                , MUTCU benefits from a national network of support and accountability. This affiliation ensures our activities are
                theologically sound, well-guided, and contribute to broader Christian initiatives. Our identity and all functions
                are meticulously guided by a comprehensive constitution and detailed operational policies for each ministry.
              </p>
            </div>
            <div className="col-lg-5 text-center" data-aos="fade-left" data-aos-delay="200">
              <img
                src="/assets/images/Full Logo.png"
                alt="MUTCU Community"
                className="img-fluid rounded-3 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Guiding Principles Section */}
      <section className="py-5 bg-light principles-section">
        <div className="container">
          <h2 className="section-title text-center">Our Guiding Principles</h2>
          <p className="text-center lead mb-5">
            Our motto, vision, and mission are interconnected, forming the bedrock of our existence.
          </p>

          <div className="row text-center">
            <div className="col-md-4 mb-4" data-aos="zoom-in" data-aos-delay="100">
              <div className="principle-card p-4 rounded-3 shadow-sm h-100">
                <i className="fas fa-bullhorn feature-icon mb-3" />
                <h3 className="card-title">Our Motto</h3>
                <p className="lead-sm">&quot;To Inspire Love, Hope, and Godliness.&quot;</p>
                <p>This motto serves as our daily call to action, reminding us of our core purpose in every interaction and activity.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4" data-aos="zoom-in" data-aos-delay="200">
              <div className="principle-card p-4 rounded-3 shadow-sm h-100">
                <i className="fas fa-eye feature-icon mb-3" />
                <h3 className="card-title">Our Vision</h3>
                <p className="lead-sm">
                  &quot;To be a model Christian Union cultivating Christ-centeredness among members in impacting the society.&quot;
                </p>
                <p>Our long-term aspiration is to be an exemplary union that develops deep spiritual growth and positive societal influence.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4" data-aos="zoom-in" data-aos-delay="300">
              <div className="principle-card p-4 rounded-3 shadow-sm h-100">
                <i className="fas fa-hands-helping feature-icon mb-3" />
                <h3 className="card-title">Our Mission</h3>
                <p className="lead-sm">
                  &quot;To raise a family well-equipped in all aspects of life, exemplary to Jesus Christ, by encouraging the existence
                  of members as one body of Christ and reaching out to non-believers within and beyond.&quot;
                </p>
                <p>Our mission focuses on equipping members holistically and extending our reach to non-believers, embodying unity in Christ.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aims of the Union Section */}
      <section className="py-5 aims-section">
        <div className="container">
          <h2 className="section-title text-center">Aims of The Union</h2>
          <p className="text-center lead mb-5">MUTCU operates with clear objectives to fulfill its mission and vision.</p>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="row">
                {aims.map((aim, index) => (
                  <div key={index} className="col-md-6 mb-4" data-aos="fade-up" data-aos-delay={aim.delay}>
                    <div className="aim-item d-flex align-items-start p-3 rounded-3 shadow-sm h-100">
                      <i className={`fas ${aim.icon} aim-icon me-3 flex-shrink-0`} />
                      <div>
                        <h4>{aim.title}</h4>
                        <p>{aim.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctrinal Basis Section */}
      <section className="py-5 doctrinal-section text-white">
        <div className="container">
          <h2 className="section-title text-center text-white">Our Doctrinal Basis</h2>
          <p className="text-center lead mb-5 text-white-50">
            Our beliefs are founded on the fundamental truths of the Holy Scripture, guiding all our activities and teachings.
          </p>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="doctrinal-content p-4 rounded-3 shadow-lg" data-aos="fade-up" data-aos-delay="100">
                <p>The Murang&apos;a University of Technology Christian Union believes in and holds to the following fundamental truths:</p>
                <ul className="list-unstyled doctrinal-list">
                  {doctrinalPoints.map((point, index) => (
                    <li key={index} data-aos="fade-right" data-aos-delay={200 + index * 100}>
                      <i className="fas fa-check-circle me-2" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organizational Structure & Leadership Section */}
      <section className="py-5 structure-section bg-light">
        <div className="container">
          <h2 className="section-title text-center">Organizational Structure &amp; Leadership</h2>
          <p className="text-center lead mb-5">
            MUTCU is a student-led organization with a robust structure ensuring effective governance and ministry.
          </p>

          <div className="row justify-content-center">
            <div className="col-lg-8" data-aos="fade-up">
              <div className="structure-overview p-4 rounded-3 shadow-lg mb-4">
                <h3 className="section-subtitle text-center mb-4">Executive Council</h3>
                <p>
                  The Executive Council is the highest governing leadership body of MUTCU, responsible for overseeing all Union
                  activities and ensuring adherence to the constitution and policies. It comprises appointed student leaders who serve
                  diligently to guide the Union&apos;s spiritual and administrative affairs.
                </p>
                <p>
                  New leaders are nominated annually through a democratic and spiritually led process managed by an Electoral Commission
                  of final-year students, involving recommendations from the general membership. A formal orientation and handing-over
                  process ensures a smooth transition of responsibilities, fostering mentorship and continuity of institutional knowledge.
                </p>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-6 mb-4" data-aos="fade-right" data-aos-delay="100">
              <div className="structure-card p-4 rounded-3 shadow-sm h-100">
                <i className="fas fa-sitemap feature-icon mb-3" />
                <h4 className="card-title">Committees</h4>
                <p>
                  The Executive Council delegates responsibilities to various committees, each focusing on specific areas of ministry such
                  as Prayer, Music, Missions &amp; Evangelism, Creative Arts, Technical, and Welfare. Each ministry is managed by its
                  respective committee Coordinator, ensuring focused and efficient operations.
                </p>
              </div>
            </div>
            <div className="col-md-6 mb-4" data-aos="fade-left" data-aos-delay="200">
              <div className="structure-card p-4 rounded-3 shadow-sm h-100">
                <i className="fas fa-users-gear feature-icon mb-3" />
                <h4 className="card-title">Operational Policies</h4>
                <p>
                  All Union functions are meticulously guided by detailed operational policies for each ministry. These policies ensure
                  accountability, transparency, and consistency in all activities, from financial procedures managed by the Treasury to
                  asset management and event organization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Committee Section */}
      <section className="py-5 executive-committee-section">
        <div className="container">
          <h2 className="section-title text-center">Meet Our Executive Committee</h2>
          <p className="text-center lead mb-5">Leading MUTCU with dedication and vision for the 2024/2025 Spiritual Year.</p>

          <div className="row justify-content-center">
            {executiveMembers.map((member, index) => (
              <div
                key={index}
                className="col-6 col-md-4 col-lg-3 mb-4"
                data-aos="zoom-in"
                data-aos-delay={100 + index * 100}
              >
                <Link
                  to={member.link}
                  className="executive-member-card d-block text-center text-decoration-none rounded-3 shadow-sm h-100"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className={`img-fluid rounded-circle mb-3 border border-3 ${member.borderColor}`}
                  />
                  <h4 className="member-name">{member.name}</h4>
                  <p className="member-role">{member.role}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join MUTCU Section */}
      <section className="py-5 join-section text-white">
        <div className="container">
          <h2 className="section-title text-center text-white">Why Join MUTCU?</h2>
          <p className="text-center lead mb-5 text-white-50">
            Become part of a thriving community dedicated to spiritual growth and impactful service.
          </p>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="row">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="col-md-4 mb-4"
                    data-aos="fade-up"
                    data-aos-delay={benefit.delay}
                  >
                    <div className="join-benefit-card text-center p-4 rounded-3 shadow-sm h-100">
                      <i className={`fas ${benefit.icon} feature-icon mb-3`} />
                      <h4 className="card-title">{benefit.title}</h4>
                      <p>{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center mt-5" data-aos="zoom-in" data-aos-delay="700">
            <Link to="/contact" className="btn btn-primary btn-lg me-3">
              Join MUTCU Today! <i className="fas fa-user-plus ms-2" />
            </Link>
            <Link to="/ministries" className="btn btn-secondary btn-lg">
              Explore Ministries <i className="fas fa-users-cog ms-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
