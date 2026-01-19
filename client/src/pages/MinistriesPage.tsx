import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ministriesAPI } from '../services/api'
import '../assets/mut/css/ministries.css'

/* OLD APPROACH - HARDCODED DATA (Commented out for developer reference)
 * This was the original implementation that used a static array.
 * The problem: Any ministries added through the admin panel wouldn't show up here.
 * Solution: Fetch data dynamically from the backend API instead.
 */
// const ministries = [
//   {
//     name: 'Music Ministry',
//     description: 'Leading and ministering worship through Choir, Band, Instrumentalism and Praise & Worship.',
//     image: '/assets/images/music1.jpg',
//     icon: 'fa-music',
//     link: '/ministries/music-ministry',
//     delay: 100,
//   },
//   {
//     name: 'Bible Study & Discipleship',
//     description: 'Deepening faith through small groups, nurturing classes for new believers, and intensive training programs.',
//     image: '/assets/images/bs1.jpg',
//     icon: 'fa-book-open',
//     link: '/ministries/bible-study-discipleship',
//     delay: 200,
//   },
//   ... (and so on for all ministries)
// ]

/* NEW APPROACH - DYNAMIC DATA FROM DATABASE
 * Interface matching the Ministry model from the backend database schema.
 * This ensures type safety when working with API responses.
 */
interface Ministry {
  id: string
  name: string
  description?: string
  icon?: string
  imageUrl?: string
  slug: string
  isActive: boolean
}

const MinistriesPage = () => {
  // State to store ministries fetched from API
  const [ministries, setMinistries] = useState<Ministry[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch ministries from backend on component mount
  useEffect(() => {
    const fetchMinistries = async () => {
      try {
        setLoading(true)
        // API call - only fetches active ministries (isActive: true)
        const response = await ministriesAPI.getAll({ active: 'true' })
        setMinistries(response.data || [])
      } catch (error) {
        console.error('Failed to load ministries:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMinistries()
  }, [])
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

          {/* OLD RENDERING APPROACH (Commented out for reference)
            * This used the hardcoded ministries array and mapped over it directly
            * Problem: Static data didn't reflect database changes
            */}
          {/* <div className="row justify-content-center">
            {ministries.map((ministry, index) => (
              <div key={index} className="col-md-6 col-lg-4 mb-4" data-aos="zoom-in" data-aos-delay={ministry.delay}>
                <Link to={ministry.link} className="ministry-card d-block text-center text-decoration-none rounded-3 shadow-sm h-100">
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
          </div> */}

          {/* NEW APPROACH - DYNAMIC RENDERING WITH LOADING & ERROR STATES
            * Shows loading spinner while fetching data
            * Shows empty state if no ministries found
            * Dynamically renders ministries from database
            * Uses ministry.id as key (better than index)
            * Uses ministry.slug for routing (matches backend)
            */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading ministries...</p>
            </div>
          ) : ministries.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">No ministries available at the moment.</p>
            </div>
          ) : (
            <div className="row justify-content-center">
              {ministries.map((ministry, index) => (
                <div
                  key={ministry.id}
                  className="col-md-6 col-lg-4 mb-4"
                  data-aos="zoom-in"
                  data-aos-delay={index * 100}
                >
                  <Link
                    to={`/ministries/${ministry.slug}`}
                    className="ministry-card d-block text-center text-decoration-none rounded-3 shadow-sm h-100"
                  >
                    {ministry.imageUrl && (
                      <img src={ministry.imageUrl} alt={ministry.name} className="img-fluid rounded-top-3" />
                    )}
                    <div className="card-body">
                      <h4 className="card-title">{ministry.name}</h4>
                      <p className="card-text">{ministry.description || 'Learn more about this ministry'}</p>
                      <span className="btn btn-sm btn-outline-primary mt-3">
                        Learn More
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-5 cta-section text-white">
        <div className="container text-center" data-aos="zoom-in">
          <h2 className="section-title text-white">Find Your Place to Serve!</h2>
          <p className="lead mb-4 text-white-50">There&apos;s a ministry for every passion and gift. Join us in making a difference.</p>
          <Link to="/contact" className="btn btn-primary btn-lg me-3">
            Get Involved
          </Link>
          <Link to="/about" className="btn btn-secondary btn-lg">
            Learn About Leadership
          </Link>
        </div>
      </section>
    </div>
  )
}

export default MinistriesPage
