import { MapPin } from "lucide-react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <MapPin size={20} className="footer-logo-icon" />
              <span className="footer-logo-text">Travel Explorer</span>
            </div>
            <p className="footer-tagline">
              Discover the world, one journey at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <a href="#home" className="footer-link">Home</a>
            <a href="#explore" className="footer-link">Explore</a>
            <a href="#planner" className="footer-link">Plan a Trip</a>
          </div>

          {/* APIs */}
          <div className="footer-col">
            <h4 className="footer-col-title">Powered By</h4>
            <a
              href="https://unsplash.com"
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Unsplash
            </a>
            <a
              href="https://open-meteo.com"
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open-Meteo
            </a>
            <a
              href="https://ai.google.dev"
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Gemini
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} Travel Explorer. Built with React.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
