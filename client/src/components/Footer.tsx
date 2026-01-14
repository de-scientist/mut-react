import { Link } from 'react-router-dom'
import logo from '../assets/mut/images/Full Logo.png'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer bg-dark-navy text-white pt-5 pb-3">
      <div className="container">
        <div className="row g-4">
          {/* Brand & Mission Column */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-brand mb-4">
              <img src={logo} alt="MUTCU Logo" height={50} className="mb-3 brightness-up" />
              <p className="footer-description text-white-50 small">
                The Murang’a University of Technology Christian Union is a student-led non-denominational community 
                striving to reach students for Christ and build them up in the faith through fellowship and service.
              </p>
            </div>
            <div className="social-links">
              <h6 className="text-uppercase fw-bold mb-3 small tracking-widest text-primary">Follow Our Journey</h6>
              <div className="d-flex gap-3">
                {['facebook-f', 'instagram', 'twitter', 'youtube', 'whatsapp'].map((icon) => (
                  <a key={icon} href="#" className="social-icon-box transition-all" aria-label={icon}>
                    <i className={`fab fa-${icon}`} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="col-lg-2 col-md-6">
            <h5 className="footer-heading mb-4">Quick Links</h5>
            <ul className="list-unstyled footer-nav">
              {[
                { label: 'Home', path: '/' },
                { label: 'About Us', path: '/about' },
                { label: 'Ministries', path: '/ministries' },
                { label: 'Events', path: '/events' },
                { label: 'Blog', path: '/blogs' },
                { label: 'Resources', path: '/resources' },
                { label: 'Gallery', path: '/gallery' },
              ].map((link) => (
                <li key={link.path} className="mb-2">
                  <Link to={link.path} className="footer-link text-decoration-none text-white-50">
                    <i className="fas fa-chevron-right me-2 tiny-icon" /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="col-lg-3 col-md-6">
            <h5 className="footer-heading mb-4">Contact Info</h5>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-start gap-3">
                <i className="fas fa-map-marker-alt text-primary mt-1" />
                <p className="small text-white-50 mb-0">Murang’a University of Technology, P.O Box 75-10200, Murang’a, Kenya</p>
              </div>
              <div className="d-flex align-items-center gap-3">
                <i className="fas fa-phone-alt text-primary" />
                <p className="small text-white-50 mb-0">+254 712 345 678</p>
              </div>
              <div className="d-flex align-items-center gap-3">
                <i className="fas fa-envelope text-primary" />
                <p className="small text-white-50 mb-0">info@mutcu.ac.ke</p>
              </div>
            </div>
          </div>

          {/* Office Hours / Updates */}
          <div className="col-lg-3 col-md-6">
            <h5 className="footer-heading mb-4">Service Hours</h5>
            <ul className="list-unstyled small text-white-50">
              <li className="d-flex justify-content-between border-bottom border-secondary pb-2 mb-2">
                <span>Sunday Service:</span>
                <span className="text-white">8:00 AM - 12:00 PM</span>
              </li>
              <li className="d-flex justify-content-between border-bottom border-secondary pb-2 mb-2">
                <span>Prayer Meetings:</span>
                <span className="text-white">Daily 6:00 PM</span>
              </li>
              <li className="d-flex justify-content-between pb-2">
                <span>Office Hours:</span>
                <span className="text-white">Mon - Fri</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom mt-5 pt-4 border-top border-secondary text-center">
          <p className="small text-white-50 mb-1">
            &copy; {currentYear} Murang’a University of Technology Christian Union. All rights reserved.
          </p>
          <p className="x-small text-secondary fw-light">
            Crafted with ❤️ by <span className="text-primary fw-bold">MUTCU Tech Team</span>
          </p>
        </div>
      </div>

      <style>{`
        .bg-dark-navy {
          background-color: #0a192f;
          border-top: 3px solid #ff9800; /* Orange accent top border */
        }

        .footer-heading {
          font-weight: 700;
          font-size: 1.1rem;
          color: #fff;
          position: relative;
        }

        .footer-heading::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -8px;
          height: 2px;
          width: 30px;
          background-color: #ff9800;
        }

        .footer-link {
          transition: all 0.3s ease;
          display: inline-block;
        }

        .footer-link:hover {
          color: #ff9800 !important;
          transform: translateX(5px);
        }

        .social-icon-box {
          width: 38px;
          height: 38px;
          background: rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          color: #fff;
          text-decoration: none;
        }

        .social-icon-box:hover {
          background: #ff9800;
          color: #0a192f;
          transform: translateY(-3px);
        }

        .brightness-up {
          filter: brightness(0) invert(1);
          opacity: 0.9;
        }

        .tiny-icon {
          font-size: 0.7rem;
        }

        .x-small {
          font-size: 0.75rem;
        }

        .tracking-widest {
          letter-spacing: 0.1em;
        }
      `}</style>
    </footer>
  )
}

export default Footer