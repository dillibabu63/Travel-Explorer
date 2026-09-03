import { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Search,
  Locate,
  Loader2,
  X,
  CloudSun,
} from "lucide-react";
import { getUserLocation, searchCity, reverseGeocode } from "../services/locationService";
import {
  getWeatherByCoords,
  getWeatherCondition,
  getWeatherIcon,
} from "../services/weatherService";
import "./LocationBar.css";

function LocationBar({ onLocationChange }) {
  const [userLocation, setUserLocation] = useState(null); // { city, country, lat, lng }
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const searchTimeout = useRef(null);
  const searchRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  async function handleDetectLocation() {
    try {
      setLoading(true);
      setPermissionDenied(false);
      const coords = await getUserLocation();
      const geo = await reverseGeocode(coords.latitude, coords.longitude);
      const loc = {
        city: geo.city,
        country: geo.country,
        lat: coords.latitude,
        lng: coords.longitude,
      };
      setUserLocation(loc);
      onLocationChange?.(loc);

      // Fetch weather
      const w = await getWeatherByCoords(coords.latitude, coords.longitude);
      setWeather(w);
    } catch (err) {
      console.error(err);
      if (err.message.includes("denied")) {
        setPermissionDenied(true);
      }
    } finally {
      setLoading(false);
    }
  }

  function handleSearchInput(e) {
    const query = e.target.value;
    setSearchQuery(query);

    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    if (query.length < 2) {
      setSearchResults([]);
      setSearchOpen(false);
      return;
    }

    setSearching(true);
    searchTimeout.current = setTimeout(async () => {
      try {
        const results = await searchCity(query);
        setSearchResults(results);
        setSearchOpen(results.length > 0);
      } catch {
        setSearchResults([]);
      } finally {
        setSearching(false);
      }
    }, 300);
  }

  async function handleSelectCity(city) {
    const loc = {
      city: city.name,
      country: city.country,
      lat: city.latitude,
      lng: city.longitude,
    };
    setUserLocation(loc);
    setSearchQuery("");
    setSearchOpen(false);
    setSearchResults([]);
    setPermissionDenied(false);
    onLocationChange?.(loc);

    try {
      const w = await getWeatherByCoords(city.latitude, city.longitude);
      setWeather(w);
    } catch {
      // Non-critical
    }
  }

  function handleClearLocation() {
    setUserLocation(null);
    setWeather(null);
    onLocationChange?.(null);
  }

  return (
    <div className="location-bar">
      <div className="location-bar-inner">
        {/* Left: location info or prompt */}
        <div className="location-bar-left">
          {userLocation ? (
            <div className="location-current">
              <MapPin size={16} className="location-pin" />
              <span className="location-name">
                {userLocation.city}, {userLocation.country}
              </span>
              {weather && (
                <span className="location-weather">
                  {getWeatherIcon(weather.weather_code, weather.is_day)}{" "}
                  {Math.round(weather.temperature_2m)}°C ·{" "}
                  {getWeatherCondition(weather.weather_code)}
                </span>
              )}
              <button
                className="location-clear"
                onClick={handleClearLocation}
                aria-label="Clear location"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <div className="location-prompt">
              <CloudSun size={16} className="location-prompt-icon" />
              <span>
                {permissionDenied
                  ? "Location access denied — search for your city instead"
                  : "Share your location for personalised weather & distances"}
              </span>
            </div>
          )}
        </div>

        {/* Right: controls */}
        <div className="location-bar-right">
          {!userLocation && (
            <button
              className="location-detect-btn"
              onClick={handleDetectLocation}
              disabled={loading}
              aria-label="Detect my location"
            >
              {loading ? (
                <Loader2 size={16} className="location-spinner" />
              ) : (
                <Locate size={16} />
              )}
              <span className="location-detect-text">
                {loading ? "Detecting…" : "Detect"}
              </span>
            </button>
          )}

          {/* Search */}
          <div className="location-search-wrap" ref={searchRef}>
            <div className="location-search-input-wrap">
              <Search size={14} className="location-search-icon" />
              <input
                className="location-search-input"
                type="text"
                placeholder="Search city…"
                value={searchQuery}
                onChange={handleSearchInput}
                onFocus={() => {
                  if (searchResults.length > 0) setSearchOpen(true);
                }}
                aria-label="Search for a city"
              />
              {searching && (
                <Loader2 size={14} className="location-search-loading" />
              )}
            </div>

            {searchOpen && (
              <div className="location-search-dropdown" role="listbox">
                {searchResults.map((city, i) => (
                  <button
                    key={i}
                    className="location-search-result"
                    onClick={() => handleSelectCity(city)}
                    role="option"
                  >
                    <MapPin size={14} />
                    <span>{city.displayName}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationBar;
