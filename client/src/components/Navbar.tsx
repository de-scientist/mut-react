import { NavLink } from "react-router-dom";
import { useNavbarScroll } from "../hooks/useNavbarScroll";
import logo from "../assets/mut/images/best logo.png";

const Navbar = () => {
  const isScrolled = useNavbarScroll(50);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link px-2 fw-semibold transition-all ${isActive ? "active-link" : "text-nav-idle"}`;

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top transition-all ${
        isScrolled ? "navbar-scrolled" : "navbar-at-top"
      }`}
      aria-label="Main navigation"
    >
      <div className="container-fluid px-lg-5">
        {" "}
        {/* Using container-fluid for more horizontal room */}
        <NavLink
          className="navbar-brand d-flex align-items-center me-auto"
          to="/"
        >
          <img
            src={logo}
            alt="MUTCU Logo"
            height={isScrolled ? 40 : 50}
            className="transition-all"
          />
        </NavLink>
        <button
          className="navbar-toggler border-0 shadow-none custom-toggler"
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
              { path: "/", label: "Home", end: true },
              { path: "/about", label: "About", end: false },
              { path: "/ministries", label: "Ministries", end: false },
              { path: "/events", label: "Events", end: false },
              { path: "/blogs", label: "Blog", end: false },
              { path: "/resources", label: "Resources", end: false },
              { path: "/gallery", label: "Gallery", end: false },
              { path: "/contact", label: "Contact", end: false },
            ].map((link) => (
              <li className="nav-item" key={link.path}>
                <NavLink
                  end={link.end}
                  to={link.path}
                  className={navLinkClass}
                  style={{ fontSize: "0.92rem" }} // Slightly smaller font for better fit
                >
                  {link.label}
                </NavLink>
              </li>
            ))}

            <li className="nav-item ms-lg-2 mt-3 mt-lg-0">
              <NavLink
                to="/admin/login"
                className="btn btn-admin px-3 py-1.5 rounded-pill shadow-sm fw-bold d-inline-flex align-items-center"
                style={{ fontSize: "0.85rem" }}
              >
                <i className="fas fa-user-shield me-1"></i>
                <span>CU Portal</span>
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
        }

        .transition-all { transition: all 0.3s ease-in-out; }

        .navbar-at-top {
          background: linear-gradient(to bottom, rgba(10, 24, 55, 0.9) 0%, rgba(10, 24, 55, 0) 100%);
          padding: 0.8rem 0;
        }

        .navbar-scrolled {
          background: var(--brand-navy) !important;
          padding: 0.5rem 0;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
          border-bottom: 2px solid var(--brand-teal);
        }

        .text-nav-idle { color: #ffffff !important; opacity: 0.9; }
        .text-nav-idle:hover { color: var(--brand-teal) !important; opacity: 1; }

        .active-link { 
          color: var(--brand-orange) !important; 
          border-bottom: 2px solid var(--brand-orange);
        }

        .btn-admin {
          background: linear-gradient(45deg, var(--brand-orange), #FFA726) !important;
          color: white !important;
          border: none !important;
          white-space: nowrap;
        }

        /* Responsive spacing adjustments */
        @media (min-width: 992px) and (max-width: 1200px) {
          .nav-link {
            padding-left: 0.4rem !important;
            padding-right: 0.4rem !important;
            font-size: 0.85rem !important;
          }
        }

        @media (max-width: 991.98px) {
          .navbar-collapse {
            background: #0D1E3D;
            padding: 1.5rem;
            margin-top: 10px;
            border-radius: 12px;
          }
          .active-link { border-bottom: none; background: rgba(255,152,0,0.1); }
          .custom-toggler .navbar-toggler-icon { filter: invert(1); }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
