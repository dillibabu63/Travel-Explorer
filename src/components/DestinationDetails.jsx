import { useEffect, useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Globe,
  DollarSign,
  Calendar,
  Compass,
  Thermometer,
  Droplets,
  Wind,
} from "lucide-react";
import "./DestinationDetails.css";
import {
  getDestinationImage,
  getPlaceImage,
  DESTINATION_FALLBACKS,
  PLACE_FALLBACKS,
} from "../services/unsplashService";
import {
  getWeather,
  getWeatherByCoords,
  getWeatherCondition,
  getWeatherIcon,
} from "../services/weatherService";

function PlaceCard({ place, cityName }) {
  const [image, setImage] = useState(place.image || "");
  const [loading, setLoading] = useState(!place.image);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (place.image) {
        setImage(place.image);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const url = await getPlaceImage(place.name, cityName, place.image);
        if (!cancelled) setImage(url || "");
      } catch {
        // Silently fail
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [place.name, place.image, cityName]);

  return (
    <div className="place-card">
      <div className="place-card-image">
        {loading ? (
          <div className="place-card-skeleton shimmer-placeholder" />
        ) : image ? (
          <img
            src={image}
            alt={place.name}
            loading="lazy"
            onError={() => {
              const fallback = PLACE_FALLBACKS[place.name] || DESTINATION_FALLBACKS[cityName];
              if (fallback && fallback !== image) {
                setImage(fallback);
              } else {
                setImage("");
              }
            }}
          />
        ) : (
          <div className="place-card-img-fallback">
            <Compass size={32} />
          </div>
        )}
      </div>
      <div className="place-card-body">
        <span className="place-card-category">{place.category}</span>
        <h4 className="place-card-name">{place.name}</h4>
        <p className="place-card-desc">{place.description}</p>
      </div>
    </div>
  );
}

function DestinationDetails({ destination, onClose, onPlanTrip }) {
  const [heroImage, setHeroImage] = useState(destination.image || "");
  const [imageLoading, setImageLoading] = useState(!destination.image);
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadHeroImage() {
      if (destination.image) {
        setHeroImage(destination.image);
        setImageLoading(false);
        return;
      }

      try {
        setImageLoading(true);
        const url = await getDestinationImage(destination.name, destination.image);
        if (!cancelled) setHeroImage(url || "");
      } catch {
        // Fallback handled in render
      } finally {
        if (!cancelled) setImageLoading(false);
      }
    }

    async function loadWeather() {
      try {
        setWeatherLoading(true);
        setWeatherError(false);
        const data =
          destination.lat && destination.lng
            ? await getWeatherByCoords(destination.lat, destination.lng)
            : await getWeather(destination.name);
        if (!cancelled) setWeather(data);
      } catch {
        if (!cancelled) setWeatherError(true);
      } finally {
        if (!cancelled) setWeatherLoading(false);
      }
    }

    loadHeroImage();
    loadWeather();
    return () => { cancelled = true; };
  }, [destination]);

  const infoItems = [
    {
      icon: <Calendar size={18} />,
      label: "Best Time",
      value: destination.bestTimeToVisit,
    },
    {
      icon: <Globe size={18} />,
      label: "Language",
      value: destination.language,
    },
    {
      icon: <DollarSign size={18} />,
      label: "Currency",
      value: destination.currency,
    },
    {
      icon: <Clock size={18} />,
      label: "Timezone",
      value: destination.timezone,
    },
  ];

  return (
    <section className="detail-page" aria-label={`Details for ${destination.name}`}>
      {/* Hero banner */}
      <div className="detail-hero">
        {imageLoading ? (
          <div className="detail-hero-skeleton shimmer-placeholder" />
        ) : heroImage ? (
          <img
            className="detail-hero-img"
            src={heroImage}
            alt={destination.name}
            onError={() => {
              const fallback = DESTINATION_FALLBACKS[destination.name];
              if (fallback && fallback !== heroImage) {
                setHeroImage(fallback);
              }
            }}
          />
        ) : (
          <div className="detail-hero-fallback" />
        )}
        <div className="detail-hero-overlay" />

        <button className="detail-back-btn" onClick={onClose} aria-label="Go back">
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <div className="detail-hero-content">
          <span className="detail-continent-badge">{destination.continent}</span>
          <h1 className="detail-title">{destination.name}</h1>
          <p className="detail-country">
            <MapPin size={16} />
            {destination.country}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="detail-main">
        {/* Description */}
        <div className="detail-section">
          <p className="detail-description">{destination.description}</p>

          {/* Highlight tags */}
          <div className="detail-highlights">
            {destination.highlights?.map((tag) => (
              <span className="detail-highlight-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Info grid */}
        <div className="detail-info-grid">
          {infoItems.map((item) => (
            <div className="detail-info-card" key={item.label}>
              <div className="detail-info-icon">{item.icon}</div>
              <div>
                <span className="detail-info-label">{item.label}</span>
                <strong className="detail-info-value">{item.value}</strong>
              </div>
            </div>
          ))}
        </div>

        {/* Weather */}
        <div className="detail-section">
          <h2 className="detail-section-title">
            <span className="section-label">LIVE DATA</span>
            Current Weather
          </h2>

          {weatherLoading ? (
            <div className="weather-skeleton-grid">
              {[1, 2, 3, 4].map((i) => (
                <div className="weather-skel shimmer-placeholder" key={i} />
              ))}
            </div>
          ) : weatherError ? (
            <div className="detail-error-card">
              <p>Unable to load weather data.</p>
              <button
                className="detail-retry-btn"
                onClick={() => {
                  setWeatherError(false);
                  setWeatherLoading(true);
                  const fetchPromise =
                    destination.lat && destination.lng
                      ? getWeatherByCoords(destination.lat, destination.lng)
                      : getWeather(destination.name);
                  fetchPromise
                    .then((d) => setWeather(d))
                    .catch(() => setWeatherError(true))
                    .finally(() => setWeatherLoading(false));
                }}
              >
                Retry
              </button>
            </div>
          ) : weather ? (
            <div className="weather-grid">
              {/* Card 1: Condition */}
              <div className="weather-card">
                <div className="weather-card-header">
                  <div className="weather-card-icon-badge">
                    <span className="weather-badge-emoji">
                      {getWeatherIcon(weather.weather_code, weather.is_day)}
                    </span>
                  </div>
                  <span className="weather-card-label">Condition</span>
                </div>
                <strong className="weather-card-value weather-card-condition-text">
                  {getWeatherCondition(weather.weather_code)}
                </strong>
              </div>

              {/* Card 2: Temperature */}
              <div className="weather-card">
                <div className="weather-card-header">
                  <div className="weather-card-icon-badge">
                    <Thermometer size={18} />
                  </div>
                  <span className="weather-card-label">Temperature</span>
                </div>
                <strong className="weather-card-value">
                  {Math.round(weather.temperature_2m)}°C
                </strong>
                <span className="weather-card-subtext">
                  Feels like {Math.round(weather.apparent_temperature)}°C
                </span>
              </div>

              {/* Card 3: Humidity */}
              <div className="weather-card">
                <div className="weather-card-header">
                  <div className="weather-card-icon-badge">
                    <Droplets size={18} />
                  </div>
                  <span className="weather-card-label">Humidity</span>
                </div>
                <strong className="weather-card-value">
                  {weather.relative_humidity_2m}%
                </strong>
                <span className="weather-card-subtext">Relative moisture</span>
              </div>

              {/* Card 4: Wind Speed */}
              <div className="weather-card">
                <div className="weather-card-header">
                  <div className="weather-card-icon-badge">
                    <Wind size={18} />
                  </div>
                  <span className="weather-card-label">Wind Speed</span>
                </div>
                <strong className="weather-card-value">
                  {weather.wind_speed_10m} km/h
                </strong>
                <span className="weather-card-subtext">Current velocity</span>
              </div>
            </div>
          ) : null}
        </div>

        {/* Famous Places */}
        {destination.famousPlaces && destination.famousPlaces.length > 0 && (
          <div className="detail-section">
            <h2 className="detail-section-title">
              <span className="section-label">MUST VISIT</span>
              Famous Places
            </h2>

            <div className="places-grid">
              {destination.famousPlaces.map((place) => (
                <PlaceCard
                  key={place.name}
                  place={place}
                  cityName={destination.name}
                />
              ))}
            </div>
          </div>
        )}

        {/* Plan trip CTA */}
        <div className="detail-cta-section">
          <h3 className="detail-cta-title">
            Ready to visit {destination.name}?
          </h3>
          <p className="detail-cta-desc">
            Let our AI plan the perfect itinerary for your trip.
          </p>
          <button
            className="detail-cta-btn"
            onClick={() => onPlanTrip(destination.name)}
          >
            Plan a Trip Here →
          </button>
        </div>
      </div>
    </section>
  );
}

export default DestinationDetails;
