import { NavLink } from 'react-router-dom'
import { useNavbarScroll } from '../hooks/useNavbarScroll'
import logo from '../assets/mut/images/Full Logo.png'

const Navbar = () => {
  const isScrolled = useNavbarScroll(50)

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
            height={isScrolled ? 45 : 55} 
            className="transition-all" 
            style={{ filter: isScrolled ? 'none' : 'brightness(1.2)' }}
          />
        </NavLink>

        <button
          className="navbar-toggler border-0 shadow-none"
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
              { path: '/blogs', label: 'Blog', end: false },
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
        :root {
          --brand-navy: #0A1837;
          --brand-orange: #FF9800;
          --brand-teal: #36D1C4;
          --brand-red: #F42F3F;
        }

        .transition-all { transition: all 0.3s ease-in-out; }

        /* Transparent State */
        .navbar-at-top {
          background: linear-gradient(to bottom, rgba(10, 24, 55, 0.8) 0%, rgba(10, 24, 55, 0) 100%);
          padding: 1.2rem 0;
        }
        .navbar-at-top .text-nav-idle { color: #ffffff !important; text-shadow: 1px 1px 3px rgba(0,0,0,0.4); }

        /* Scrolled State */
        .navbar-scrolled {
          background: rgba(10, 24, 55, 0.95) !important;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          padding: 0.7rem 0;
          box-shadow: 0 4px 25px rgba(0,0,0,0.2);
          border-bottom: 2px solid var(--brand-teal);
        }
        .navbar-scrolled .text-nav-idle { color: rgba(255, 255, 255, 0.85) !important; }

        /* Hover & Active States */
        .nav-link:hover { color: var(--brand-teal) !important; }
        
        .active-link {
          color: var(--brand-orange) !important;
          position: relative;
        }
        .active-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 1rem;
          right: 1rem;
          height: 3px;
          background: var(--brand-orange);
          border-radius: 2px;
        }

        .btn-admin {
          background: linear-gradient(45deg, var(--brand-orange), #ffb74d);
          color: white !important;
          border: none;
          transition: transform 0.2s;
        }
        .btn-admin:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 152, 0, 0.4);
        }

        @media (max-width: 991.98px) {
          .navbar-collapse {
            background: var(--brand-navy);
            padding: 2rem;
            margin-top: 1rem;
            border-radius: 1rem;
            border: 1px solid rgba(255,255,255,0.1);
          }
          .active-link::after { display: none; }
          .active-link { background: rgba(255, 152, 0, 0.1); border-radius: 8px; }
        }
      `}</style>
    </nav>
  )
}

export default Navbar