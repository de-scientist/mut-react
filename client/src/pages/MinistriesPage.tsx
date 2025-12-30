import { Link } from 'react-router-dom'
import '../assets/mut/css/ministries.css'

const ministries = [
  {
    name: 'Music Ministry',
    description: 'Leading and ministering worship through Choir, Band, Instrumentalism and Praise & Worship.',
    image: '/assets/images/music1.jpg',
    icon: 'fa-music',
    link: '/ministries/music-ministry',
    delay: 100,
  },
  {
    name: 'Bible Study & Discipleship',
    description: 'Deepening faith through small groups, nurturing classes for new believers, and intensive training programs.',
    image: '/assets/images/bs1.jpg',
    icon: 'fa-book-open',
    link: '/ministries/bible-study-discipleship',
    delay: 200,
  },
  {
    name: 'Missions & Evangelism',
    description: 'Sharing the Gospel through campus outreach, annual missions, and hope ministry visits to prisons and hospitals.',
    image: '/assets/images/mission1.jpg',
    icon: 'fa-globe',
    link: '/ministries/missions-evangelism',
    delay: 300,
  },
  {
    name: 'Creative Arts Ministry (CREAM)',
    description: 'Expressing faith through drama, dance, spoken word, and other artistic talents.',
    image: '/assets/images/dance3.jpg',
    icon: 'fa-paint-brush',
    link: '/ministries/creative-arts',
    delay: 400,
  },
  {
    name: 'Prayer Ministry',
    description: 'Cultivating a deep culture of prayer and intercession for the Union, university, and wider community.',
    image: '/assets/images/church2.jpg',
    icon: 'fa-pray',
    link: '/ministries/prayer-ministry',
    delay: 500,
  },
  {
    name: 'Welfare Committee',
    description: 'Actively raising funds and providing support to members facing financial and personal difficulties.',
    image: '/assets/images/prayer1.jpg',
    icon: 'fa-hand-holding-heart',
    link: '/ministries/welfare-committee',
    delay: 600,
  },
  {
    name: 'Hospitality Ministry',
    description: 'Ensuring a welcoming environment for all members and visitors, managing amenities and visitor care.',
    image: '/assets/images/tlp.jpg',
    icon: 'fa-handshake-angle',
    link: '/ministries/hospitality-ministry',
    delay: 700,
  },
  {
    name: 'Technical Department',
    description: 'Providing essential technical support for all Union activities, including sound, Publicity, Ushering and live streaming.',
    image: '/assets/images/mbbc1.jpg',
    icon: 'fa-laptop-code',
    link: '/ministries/technical-department',
    delay: 800,
  },
  {
    name: 'Resource Mobilisation Committee (RMC)',
    description: 'Working in conjunction with all other ministries to enhance the transformative gospel through creative and innovative ways of acquiring resources.',
    image: '/assets/images/prayer1.jpg',
    icon: 'fa-lightbulb',
    link: '/ministries/RMC',
    delay: 900,
  },
]

const MinistriesPage = () => {
  return (
    <div className="ministries-page">
      {/* Page Hero Section */}
      <section
        className="page-hero-section d-flex align-items-center text-center text-white"
        style={{ backgroundImage: "url('/assets/images/mbbc1.jpg')" }}
      >
        <div className="hero-overlay" />
        <div className="container position-relative" data-aos="fade-up" data-aos-duration="1000">
          <h1 className="display-3 mb-3">Our Ministries</h1>
          <p className="lead">Where Faith Becomes Action: Serve, Grow, Impact</p>
        </div>
      </section>

      {/* Ministries Overview Section */}
      <section className="py-5 ministries-overview-section">
        <div className="container">
          <h2 className="section-title text-center">Explore Our Diverse Ministries</h2>
          <p className="text-center lead mb-5">
            MUTCU&apos;s ministries are the heartbeat of our Union, providing avenues for spiritual growth, service, and community
            impact. Each ministry operates under a dedicated committee, ensuring focused and effective work in alignment with our motto,
            vision, and mission.
          </p>

          <div className="row justify-content-center">
            {ministries.map((ministry, index) => (
              <div
                key={index}
                className="col-md-6 col-lg-4 mb-4"
                data-aos="zoom-in"
                data-aos-delay={ministry.delay}
              >
                <Link
                  to={ministry.link}
                  className="ministry-card d-block text-center text-decoration-none rounded-3 shadow-sm h-100"
                >
                  <img src={ministry.image} alt={ministry.name} className="img-fluid rounded-top-3" />
                  <div className="card-body">
                    <i className={`fas ${ministry.icon} feature-icon mb-3`} />
                    <h4 className="card-title">{ministry.name}</h4>
                    <p className="card-text">{ministry.description}</p>
                    <span className="btn btn-sm btn-outline-primary mt-3">
                      Learn More <i className="fas fa-arrow-right ms-2" />
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-5 cta-section text-white">
        <div className="container text-center" data-aos="zoom-in">
          <h2 className="section-title text-white">Find Your Place to Serve!</h2>
          <p className="lead mb-4 text-white-50">There&apos;s a ministry for every passion and gift. Join us in making a difference.</p>
          <Link to="/contact" className="btn btn-primary btn-lg me-3">
            Get Involved <i className="fas fa-hand-fist ms-2" />
          </Link>
          <Link to="/about" className="btn btn-secondary btn-lg">
            Learn About Leadership <i className="fas fa-users-gear ms-2" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default MinistriesPage
