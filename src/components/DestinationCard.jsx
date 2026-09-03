import { useEffect, useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import "./DestinationCard.css";
import { getDestinationImage, DESTINATION_FALLBACKS } from "../services/unsplashService";

function DestinationCard({ destination, onExplore, distance }) {
  const [image, setImage] = useState(destination.image || "");
  const [loading, setLoading] = useState(!destination.image);
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(true);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadImage() {
      if (destination.image) {
        setImage(destination.image);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(false);
        const imageUrl = await getDestinationImage(destination.name, destination.image);
        if (!cancelled) {
          setImage(imageUrl || "");
          if (!imageUrl) setError(true);
        }
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadImage();
    return () => { cancelled = true; };
  }, [destination.name, destination.image]);

  return (
    <article
      className={`dest-card ${visible ? "dest-card-visible" : ""}`}
      ref={cardRef}
      tabIndex={0}
      role="button"
      aria-label={`Explore ${destination.name}, ${destination.country}`}
      onClick={() => onExplore(destination)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onExplore(destination);
        }
      }}
    >
      {/* Image */}
      <div className="dest-card-image-wrap">
        {loading ? (
          <div className="dest-card-skeleton shimmer-placeholder" />
        ) : error || !image ? (
          <div className="dest-card-fallback">
            <span className="dest-card-fallback-emoji">🌍</span>
          </div>
        ) : (
          <img
            className="dest-card-img"
            src={image}
            alt={`${destination.name}, ${destination.country}`}
            loading="lazy"
            onError={() => {
              const fallback = DESTINATION_FALLBACKS[destination.name];
              if (fallback && fallback !== image) {
                setImage(fallback);
              } else {
                setError(true);
              }
            }}
          />
        )}
        <div className="dest-card-image-overlay" />
      </div>

      {/* Content */}
      <div className="dest-card-body">
        <div className="dest-card-meta">
          <span className="dest-card-continent">{destination.continent}</span>
          {distance && (
            <span className="dest-card-distance">{distance}</span>
          )}
        </div>

        <h3 className="dest-card-name">{destination.name}</h3>
        <p className="dest-card-country">{destination.country}</p>

        <div className="dest-card-highlights">
          {destination.highlights?.slice(0, 3).map((tag) => (
            <span className="dest-card-tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>

        <p className="dest-card-desc">
          {destination.description.length > 120
            ? destination.description.slice(0, 120) + "…"
            : destination.description}
        </p>

        <div className="dest-card-footer">
          <button
            className="dest-card-cta-btn"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onExplore(destination);
            }}
            aria-label={`Explore ${destination.name}`}
          >
            <span>Explore Destination</span>
            <ArrowRight size={16} className="dest-card-cta-icon" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default DestinationCard;
