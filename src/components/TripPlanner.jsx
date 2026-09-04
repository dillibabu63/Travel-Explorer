import { useState } from "react";
import {
  Sparkles,
  Loader2,
  MapPin,
  CalendarDays,
  Wallet,
  Heart,
  Compass,
  AlertCircle,
} from "lucide-react";
import { generateItinerary } from "../services/geminiService";
import { searchCity } from "../services/locationService";
import "./TripPlanner.css";

const TRAVEL_STYLES = [
  { id: "cultural", label: "Cultural", icon: "🏛️" },
  { id: "adventure", label: "Adventure", icon: "🧗" },
  { id: "relaxation", label: "Relaxation", icon: "🧘" },
  { id: "foodie", label: "Foodie", icon: "🍜" },
  { id: "romantic", label: "Romantic", icon: "💑" },
  { id: "budget", label: "Budget", icon: "💰" },
];

function TripPlanner({ prefillDestination }) {
  const [destination, setDestination] = useState(prefillDestination || "");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [interests, setInterests] = useState("");
  const [travelStyle, setTravelStyle] = useState("cultural");
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Sync if prefillDestination changes
  useState(() => {
    if (prefillDestination) {
      setDestination(prefillDestination);
    }
  }, [prefillDestination]);

  function validateInputs() {
    const dest = destination.trim();
    const daysNum = parseInt(days, 10);

    if (!dest) {
      return "Please enter a destination.";
    }
    if (dest.length < 2 || dest.length > 100) {
      return "Destination must be between 2 and 100 characters.";
    }
    // Must contain at least some letters (not purely numbers/symbols)
    if (!/[a-zA-Z]{2,}/.test(dest)) {
      return "Please enter a valid destination name (e.g. Paris, Tokyo, Bali).";
    }
    if (!days || isNaN(daysNum)) {
      return "Please enter the number of days.";
    }
    if (daysNum < 1 || daysNum > 30) {
      return "Number of days must be between 1 and 30.";
    }
    if (!budget.trim()) {
      return "Please enter your budget (e.g. ₹50,000 or $1000).";
    }
    // Reject meaningless budget values like "0", "00", "0.0"
    const budgetDigits = budget.trim().replace(/[^0-9.]/g, "");
    if (budgetDigits && parseFloat(budgetDigits) === 0) {
      return "Budget cannot be zero. Please enter a realistic budget (e.g. ₹50,000 or $1000).";
    }
    if (!interests.trim()) {
      return "Please enter your interests (e.g. Food, History, Nature).";
    }
    if (interests.trim().length < 3) {
      return "Please describe your interests in at least a few words.";
    }
    return null;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setItinerary(null);

      // Verify the destination is a real place using geocoding
      const geoResults = await searchCity(destination.trim());
      if (!geoResults || geoResults.length === 0) {
        setError(
          `We couldn't find a real place called "${destination.trim()}". Please enter a valid city or destination (e.g. Paris, Tokyo, Bali).`
        );
        setLoading(false);
        return;
      }

      const result = await generateItinerary({
        destination: destination.trim(),
        days: parseInt(days, 10),
        budget: budget.trim(),
        interests: interests.trim(),
        travelStyle,
      });

      setItinerary(result);
    } catch (err) {
      console.error(err);
      setError(
        err.message || "Failed to generate your trip plan. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="planner" id="planner">
      <div className="planner-container">
        {/* Header */}
        <div className="planner-header">
          <span className="section-label">AI-POWERED</span>
          <h2 className="section-title">Plan Your Perfect Trip</h2>
          <p className="section-description">
            Tell us your travel preferences and our AI will craft a personalised
            day-by-day itinerary just for you.
          </p>
        </div>

        {/* Form */}
        <form className="planner-form" onSubmit={handleSubmit}>
          <div className="planner-form-grid">
            <div className="planner-field">
              <label className="planner-label" htmlFor="plan-destination">
                <MapPin size={16} />
                Destination
              </label>
              <input
                className="planner-input"
                id="plan-destination"
                type="text"
                placeholder="e.g. Paris, Tokyo, Bali"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            <div className="planner-field">
              <label className="planner-label" htmlFor="plan-days">
                <CalendarDays size={16} />
                Number of Days
              </label>
              <input
                className="planner-input"
                id="plan-days"
                type="number"
                min="1"
                max="30"
                placeholder="e.g. 5"
                value={days}
                onChange={(e) => setDays(e.target.value)}
              />
            </div>

            <div className="planner-field">
              <label className="planner-label" htmlFor="plan-budget">
                <Wallet size={16} />
                Budget
              </label>
              <input
                className="planner-input"
                id="plan-budget"
                type="text"
                placeholder="e.g. ₹50,000 or $1000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>

            <div className="planner-field">
              <label className="planner-label" htmlFor="plan-interests">
                <Heart size={16} />
                Interests
              </label>
              <input
                className="planner-input"
                id="plan-interests"
                type="text"
                placeholder="e.g. Food, History, Nature"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
              />
            </div>
          </div>

          {/* Travel style selector */}
          <div className="planner-styles">
            <span className="planner-styles-label">
              <Compass size={16} />
              Travel Style
            </span>
            <div className="planner-styles-grid">
              {TRAVEL_STYLES.map((style) => (
                <button
                  type="button"
                  key={style.id}
                  className={`planner-style-btn ${
                    travelStyle === style.id ? "planner-style-active" : ""
                  }`}
                  onClick={() => setTravelStyle(style.id)}
                >
                  <span className="planner-style-icon">{style.icon}</span>
                  <span>{style.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="planner-error" role="alert">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Submit */}
          <button
            className="planner-submit"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="planner-spinner" />
                Crafting your itinerary…
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Generate Itinerary
              </>
            )}
          </button>
        </form>

        {/* Loading skeleton */}
        {loading && (
          <div className="itinerary-loading">
            <div className="itinerary-loading-pulse" />
            <p className="itinerary-loading-text">
              Our AI is designing your perfect trip to{" "}
              <strong>{destination}</strong>…
            </p>
            <div className="itinerary-skel-grid">
              {[1, 2, 3].map((i) => (
                <div className="itinerary-skel shimmer-placeholder" key={i} />
              ))}
            </div>
          </div>
        )}

        {/* Itinerary Results — Timeline */}
        {!loading && itinerary && itinerary.length > 0 && (
          <div className="itinerary-results">
            <h3 className="itinerary-results-title">
              Your {days}-Day Trip to {destination}
            </h3>

            <div className="itinerary-timeline">
              {itinerary.map((day, index) => (
                <div className="timeline-item" key={index}>
                  <div className="timeline-marker">
                    <span className="timeline-day-num">
                      {day.day || index + 1}
                    </span>
                  </div>

                  <div className="timeline-content">
                    <h4 className="timeline-title">{day.title}</h4>

                    {day.morning && (
                      <div className="timeline-period">
                        <span className="timeline-period-label">🌅 Morning</span>
                        <p className="timeline-period-text">{day.morning}</p>
                      </div>
                    )}

                    {day.afternoon && (
                      <div className="timeline-period">
                        <span className="timeline-period-label">☀️ Afternoon</span>
                        <p className="timeline-period-text">{day.afternoon}</p>
                      </div>
                    )}

                    {day.evening && (
                      <div className="timeline-period">
                        <span className="timeline-period-label">🌙 Evening</span>
                        <p className="timeline-period-text">{day.evening}</p>
                      </div>
                    )}

                    {/* Fallback for simple activity format */}
                    {!day.morning && !day.afternoon && !day.evening && day.activity && (
                      <p className="timeline-period-text">{day.activity}</p>
                    )}

                    {day.tips && (
                      <div className="timeline-tip">
                        <span>💡</span>
                        <span>{day.tips}</span>
                      </div>
                    )}

                    {day.estimatedCost && (
                      <span className="timeline-cost">
                        Est. cost: {day.estimatedCost}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default TripPlanner;
