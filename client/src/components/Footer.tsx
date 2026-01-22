import { Link } from "react-router-dom";
import logo from "../assets/mut/images/Full Logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer pt-5 pb-3">
      <div className="container">
        <div className="row g-4">
          {/* Brand Column */}
          <div className="col-lg-4 col-md-6">
            <div className="mb-4">
              <img
                src={logo}
                alt="MUTCU Logo"
                height={55}
                className="mb-3 logo-light"
              />
              <p className="text-light-muted small lh-lg">
                The Murang’a University of Technology Christian Union is a
                student-led non-denominational community building faith through
                fellowship and service.
              </p>
            </div>
            <div className="d-flex gap-2">
              {[
                "facebook-f",
                "instagram",
                "twitter",
                "youtube",
                "whatsapp",
              ].map((icon) => (
                <a key={icon} href="#" className="social-pill transition-all">
                  <i className={`fab fa-${icon}`} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column */}
          <div className="col-lg-2 col-md-6">
            <h6 className="footer-title">Quick Links</h6>
            <ul className="list-unstyled">
              {[
                "Home",
                "About Us",
                "Ministries",
                "Events",
                "Blog",
                "Resources",
              ].map((item) => (
                <li key={item} className="mb-2">
                  <Link
                    to={`/${item.toLowerCase().replace(" ", "")}`}
                    className="footer-link"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="col-lg-3 col-md-6">
            <h6 className="footer-title">Contact Us</h6>
            <div className="small text-light-muted">
              <div className="d-flex mb-3">
                <i className="fas fa-map-marker-alt text-teal me-3 mt-1" />
                <span>P.O Box 75-10200, Murang’a, Kenya</span>
              </div>
              <div className="d-flex mb-3">
                <i className="fas fa-phone-alt text-orange me-3" />
                <span>+254 712 345 678</span>
              </div>
              <div className="d-flex">
                <i className="fas fa-envelope text-red me-3" />
                <span>info@mutcu.ac.ke</span>
              </div>
            </div>
          </div>

          {/* Schedule Column */}
          <div className="col-lg-3 col-md-6">
            <h6 className="footer-title">Weekly Services</h6>
            <div className="schedule-card">
              <div className="d-flex justify-content-between mb-2">
                <span>Sunday Service</span>
                <span className="fw-bold text-white">08:00 AM</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Daily Prayers</span>
                <span className="fw-bold text-white">06:00 PM</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Bible Study</span>
                <span className="fw-bold text-white">Tue 05:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom mt-5 pt-4 text-center">
          <p className="small text-light-muted mb-0">
            &copy; {currentYear} Murang’a University of Technology Christian
            Union.
          </p>
          <p className="tiny-text text-secondary mt-1">
            Built by <span className="text-teal fw-bold">MUTCU Tech Team</span>
          </p>
        </div>
      </div>

      <style>{`
        .footer {
          background-color: #0A1837;
          color: #ffffff;
          border-top: 4px solid var(--brand-orange);
        }

        .footer-title {
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 1.5rem;
          color: var(--brand-teal);
          font-size: 0.9rem;
        }

        .text-light-muted { color: rgba(255,255,255,0.7); }
        
        .footer-link {
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          transition: 0.2s;
          font-size: 0.9rem;
        }
        .footer-link:hover {
          color: var(--brand-orange);
          padding-left: 5px;
        }

        .social-pill {
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          color: white;
          text-decoration: none;
        }
        .social-pill:hover {
          background: var(--brand-orange);
          transform: translateY(-3px);
        }

        .schedule-card {
          background: rgba(255,255,255,0.05);
          padding: 1rem;
          border-radius: 10px;
          border-left: 3px solid var(--brand-red);
          font-size: 0.85rem;
          color: rgba(255,255,255,0.7);
        }

        .text-teal { color: var(--brand-teal); }
        .text-orange { color: var(--brand-orange); }
        .text-red { color: var(--brand-red); }

        .logo-light {
          filter: brightness(0) invert(1);
        }

        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        
        .tiny-text { font-size: 0.7rem; }
      `}</style>
    </footer>
  );
};

export default Footer;
