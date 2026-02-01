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
                {
                  icon: "facebook-f",
                  url: "https://www.facebook.com/people/Muranga-University-of-Technology-Christian-Union-1/100068859581695/",
                },
                {
                  icon: "instagram",
                  url: "https://www.instagram.com/muranga_university_cu/",
                },
                {
                  icon: "tiktok",
                  url: "https://www.tiktok.com/@mutcu001",
                },
                {
                  icon: "youtube",
                  url: "https://www.youtube.com/@murangauniversityCU",
                },
              ].map((social) => (
                <a
                  key={social.icon}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill transition-all"
                >
                  <i className={`fab fa-${social.icon}`} />
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
                <span>+254 707 223626/ +254 757 883073</span>
              </div>
              <div className="d-flex">
                <i className="fas fa-envelope text-red me-3" />
                <a href="mailto:mutcunion@gmail.com" className="footer-email-link">
                  mutcunion@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Schedule Column */}
          <div className="col-lg-3 col-md-6">
            <h6 className="footer-title">Weekly Services</h6>
            <div className="schedule-card">
              <div className="mb-3">
                <p className="mb-2 fw-bold text-white" style={{ fontSize: '0.9rem' }}>Sunday Services:</p>
                <div className="ms-2 small">
                  <div className="mb-1">1st Service: 7:00 AM - 9:30 AM</div>
                  <div className="mb-1">2nd Service: 9:30 AM - 12:30 PM</div>
                </div>
              </div>

              <div className="mb-3">
                <p className="mb-2 fw-bold text-white" style={{ fontSize: '0.9rem' }}>Friday Services:</p>
                <div className="ms-2 small">
                  <div>7:00 PM - 9:30 PM</div>
                </div>
              </div>

              <div className="mb-3">
                <p className="mb-2 fw-bold text-white" style={{ fontSize: '0.9rem' }}>Daily Prayers:</p>
                <div className="ms-2 small">
                  <div className="mb-1">Morning: 6:00 AM - 6:50 AM</div>
                  <div>Evening: 9:00 PM - 9:30 PM</div>
                </div>
              </div>

              <div>
                <p className="mb-2 fw-bold text-white" style={{ fontSize: '0.9rem' }}>Bible Study:</p>
                <div className="ms-2 small">
                  <div>Monday: 5:00 PM - 6:30 PM</div>
                </div>
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

        .footer-email-link {
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          transition: 0.2s;
        }
        .footer-email-link:hover {
          color: var(--brand-orange);
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
