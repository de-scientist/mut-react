import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="footer-title">About MUTCU</h5>
            <p className="footer-text">
              Murang’a University of Technology Christian Union is a non-denominational community dedicated to inspiring love,
              hope, and godliness through faith, unity, and service.
            </p>
          </div>
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="list-unstyled footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/ministries">Ministries</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/resources">Resources</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5 className="footer-title">Connect With Us</h5>
            <p className="footer-contact"><i className="fas fa-map-marker-alt me-2" /> Murang’a University of Technology, Murang’a, Kenya</p>
            <p className="footer-contact"><i className="fas fa-phone me-2" /> +254 712 345 678</p>
            <p className="footer-contact"><i className="fas fa-envelope me-2" /> info@mutcu.ac.ke</p>
            <p className="footer-contact"><i className="fas fa-clock me-2" /> Office Hours: Mon-Fri, 8:00 AM - 5:00 PM</p>
            <div className="social-icons mt-3">
              <a href="#" className="me-3" aria-label="Facebook">
                <i className="fab fa-facebook-f fa-lg" />
              </a>
              <a href="#" className="me-3" aria-label="Instagram">
                <i className="fab fa-instagram fa-lg" />
              </a>
              <a href="#" aria-label="Twitter">
                <i className="fab fa-twitter fa-lg" />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-5 border-top pt-4">
          <p className="footer-text mb-1">&copy; 2025 Murang’a University of Technology Christian Union. All rights reserved.</p>
          <p className="footer-text">Designed by MUTCU Tech Team</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
