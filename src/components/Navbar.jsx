import { useState, useEffect } from "react";
import { MapPin, Menu, X } from "lucide-react";
import "./Navbar.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function handleNavClick(e, targetId) {
    e.preventDefault();
    if (e.currentTarget) {
      e.currentTarget.blur();
    }
    setMenuOpen(false);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <nav
      className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <a href="#home" className="navbar-logo" onClick={(e) => handleNavClick(e, "home")}>
        <MapPin className="navbar-logo-icon" size={24} />
        <span className="navbar-title">Travel Explorer</span>
      </a>

      <div className="navbar-links" role="menubar">
        <a
          className="navbar-link"
          href="#home"
          role="menuitem"
          onClick={(e) => handleNavClick(e, "home")}
        >
          Home
        </a>
        <a
          className="navbar-link"
          href="#explore"
          role="menuitem"
          onClick={(e) => handleNavClick(e, "explore")}
        >
          Explore
        </a>
        <a
          className="navbar-link"
          href="#planner"
          role="menuitem"
          onClick={(e) => handleNavClick(e, "planner")}
        >
          Plan a Trip
        </a>
      </div>

      <button
        className="navbar-menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        type="button"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu overlay */}
      <div
        className={`navbar-mobile-overlay ${menuOpen ? "navbar-mobile-open" : ""}`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={`navbar-mobile-menu ${menuOpen ? "navbar-mobile-menu-open" : ""}`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal={menuOpen}
          aria-label="Navigation menu"
        >
          <div className="navbar-mobile-header">
            <div className="navbar-logo">
              <MapPin className="navbar-logo-icon" size={22} />
              <span className="navbar-title">Travel Explorer</span>
            </div>
            <button
              className="navbar-mobile-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              type="button"
            >
              <X size={20} />
            </button>
          </div>

          <div className="navbar-mobile-links" role="menu">
            <a
              className="navbar-mobile-link"
              href="#home"
              role="menuitem"
              tabIndex={menuOpen ? 0 : -1}
              onClick={(e) => handleNavClick(e, "home")}
            >
              Home
            </a>
            <a
              className="navbar-mobile-link"
              href="#explore"
              role="menuitem"
              tabIndex={menuOpen ? 0 : -1}
              onClick={(e) => handleNavClick(e, "explore")}
            >
              Explore
            </a>
            <a
              className="navbar-mobile-link"
              href="#planner"
              role="menuitem"
              tabIndex={menuOpen ? 0 : -1}
              onClick={(e) => handleNavClick(e, "planner")}
            >
              Plan a Trip
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
