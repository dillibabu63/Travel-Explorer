import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import "./Hero.css";

function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero" id="home">
      {/* Background video */}
      {!videoError && (
        <video
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
          onError={() => setVideoError(true)}
          aria-hidden="true"
        >
          <source src="./videos/travel-video.mp4" type="video/mp4" />
        </video>
      )}

      {/* Fallback animated gradient if video fails */}
      {videoError && <div className="hero-gradient-fallback" aria-hidden="true" />}

      {/* Overlay */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* Content */}
      <div className={`hero-content ${loaded ? "hero-content-visible" : ""}`}>
        <p className="hero-label">DISCOVER THE EXTRAORDINARY</p>

        <h1 className="hero-title">
          Explore the world,
          <br />
          <span className="hero-title-accent">one journey at a time.</span>
        </h1>

        <p className="hero-description">
          Discover breathtaking destinations, explore iconic landmarks, check
          live weather, and plan your perfect journey with AI-powered assistance.
        </p>

        <button
          className="hero-cta"
          onClick={() => {
            document
              .getElementById("explore")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Explore Destinations
          <span className="hero-cta-arrow">→</span>
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator" aria-hidden="true">
        <span className="hero-scroll-text">SCROLL</span>
        <ChevronDown className="hero-scroll-icon" size={18} />
      </div>
    </section>
  );
}

export default Hero;
