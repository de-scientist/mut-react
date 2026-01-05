import { NavLink } from 'react-router-dom'
import { useNavbarScroll } from '../hooks/useNavbarScroll'
import logo from '../assets/mut/images/Full Logo.png'

const Navbar = () => {
  const isScrolled = useNavbarScroll(50)

  // Improved class logic for better visibility
  const navLinkClass = ({ isActive }: { isActive: boolean }) => 
    `nav-link px-3 fw-semibold transition-all ${isActive ? 'active-link' : 'text-nav-idle'}`

  return (
    <nav 
      className={`navbar navbar-expand-lg fixed-top transition-all ${
        isScrolled ? 'navbar-scrolled' : 'navbar-at-top'
      }`} 
      aria-label="Main navigation"
    >
      <div className="container">
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <img 
            src={logo} 
            alt="MUTCU Logo" 
            height={isScrolled ? 50 : 65} 
            className="transition-all logo-filter" 
          />
        </NavLink>

        {/* Improved Toggler for Mobile visibility */}
        <button
          className="navbar-toggler custom-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            {[
              { path: '/', label: 'Home', end: true },
              { path: '/about', label: 'About', end: false },
              { path: '/ministries', label: 'Ministries', end: false },
              { path: '/events', label: 'Events', end: false },
              { path: '/resources', label: 'Resources', end: false },
              { path: '/gallery', label: 'Gallery', end: false },
              { path: '/contact', label: 'Contact', end: false },
            ].map((link) => (
              <li className="nav-item px-1" key={link.path}>
                <NavLink 
                  end={link.end} 
                  to={link.path} 
                  className={navLinkClass}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            
            <li className="nav-item ms-lg-3 mt-3 mt-lg-0">
              <NavLink 
                to="/admin/login" 
                className="btn btn-admin px-4 py-2 rounded-pill shadow-sm fw-bold"
              >
                <i className="fas fa-user-shield me-2"></i>Admin
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <style>{`
        /* Core Transitions */
        .transition-all { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }

        /* Transparent state: Text needs a soft shadow to be visible over bright images */
        .navbar-at-top {
          background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);
          padding: 1.2rem 0;
        }

        .navbar-at-top .text-nav-idle {
          color: rgba(255, 255, 255, 0.9) !important;
          text-shadow: 0px 2px 4px rgba(0,0,0,0.5);
        }

        /* Scrolled state: Using high-contrast Navy/Dark theme */
        .navbar-scrolled {
          background: rgba(10, 25, 47, 0.95) !important;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 0.6rem 0;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .navbar-scrolled .text-nav-idle {
          color: rgba(255, 255, 255, 0.8) !important;
        }

        /* Active Link Indicator */
        .active-link {
          color: #ff9800 !important; /* Orange branding for visibility */
          text-shadow: none;
        }

        /* Admin Button Styling */
        .btn-admin {
          background-color: #ff9800;
          color: #fff !important;
          border: none;
        }
        .btn-admin:hover {
          background-color: #e68a00;
          transform: translateY(-2px);
        }

        /* Mobile Fix: Ensure the menu is legible when expanded */
        @media (max-width: 991.98px) {
          .navbar-collapse {
            background: #0a192f;
            padding: 2rem;
            border-radius: 1.5rem;
            margin-top: 1rem;
            border: 1px solid rgba(255,255,255,0.1);
            box-shadow: 0 15px 35px rgba(0,0,0,0.5);
          }
          
          .nav-item {
            margin-bottom: 0.5rem;
          }

          .nav-link::after { display: none !important; }
        }

        /* Custom Toggler Color */
        .custom-toggler .navbar-toggler-icon {
          background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3Base path fill='rgba(255, 255, 255, 0.8)' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
        }
      `}</style>
    </nav>
  )
}

export default Navbar