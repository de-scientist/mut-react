import { NavLink } from 'react-router-dom'
import { useNavbarScroll } from '../hooks/useNavbarScroll'
import logo from '../assets/mut/images/Full Logo.png'

const Navbar = () => {
  const isScrolled = useNavbarScroll(50)

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark fixed-top${isScrolled ? ' scrolled' : ''}`} aria-label="Main navigation">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img src={logo} alt="MUTCU Logo" height={60} />
        </NavLink>
        <button
          className="navbar-toggler"
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
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink end to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/ministries" className="nav-link">
                Ministries
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/events" className="nav-link">
                Events
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/resources" className="nav-link">
                Resources
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/gallery" className="nav-link">
                Gallery
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className="nav-link">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
