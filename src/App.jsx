import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LocationBar from "./components/LocationBar";
import DestinationCard from "./components/DestinationCard";
import DestinationDetails from "./components/DestinationDetails";
import TripPlanner from "./components/TripPlanner";
import AIChatbot from "./components/AIChatbot";
import Footer from "./components/Footer";
import destinations from "./data/destinations";
import { calculateDistance, formatDistance } from "./services/locationService";

function App() {
  const [search, setSearch] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("All");
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [prefillDestination, setPrefillDestination] = useState("");

  const continents = [
    "All",
    "Asia",
    "Europe",
    "North America",
    "South America",
    "Africa",
    "Oceania",
  ];

  const filteredDestinations = useMemo(() => {
    return destinations.filter((d) => {
      const matchesSearch =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.country.toLowerCase().includes(search.toLowerCase());
      const matchesContinent =
        selectedContinent === "All" || d.continent === selectedContinent;
      return matchesSearch && matchesContinent;
    });
  }, [search, selectedContinent]);

  function getDistance(destination) {
    if (!userLocation) return null;
    const km = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      destination.lat,
      destination.lng
    );
    return formatDistance(km);
  }

  function handlePlanTrip(destinationName) {
    setPrefillDestination(destinationName);
    setSelectedDestination(null);
    setTimeout(() => {
      document.getElementById("planner")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  if (selectedDestination) {
    return (
      <>
        <Navbar />
        <DestinationDetails
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
          onPlanTrip={handlePlanTrip}
        />
        <Footer />
        <AIChatbot activeDestination={selectedDestination} />
      </>
    );
  }

  return (
    <div className="app">
      <Navbar />
      <Hero />

      <LocationBar onLocationChange={setUserLocation} />

      <section className="destinations" id="explore">
        <div className="destinations-header">
          <span className="section-label">EXPLORE THE WORLD</span>
          <h2 className="section-title">Find your next adventure</h2>
          <p className="section-description">
            Discover incredible destinations across the globe and uncover the
            famous landmarks worth visiting.
          </p>
        </div>

        {/* Search */}
        <div className="destinations-search-container">
          <div className="destinations-search-wrapper">
            <Search size={18} className="destinations-search-icon" />
            <input
              className="destinations-search"
              type="text"
              placeholder="Search destinations or countries…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search destinations"
              id="destination-search"
            />
            {search && (
              <button
                className="destinations-search-clear"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                type="button"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Continent Filters */}
        <div className="destinations-filter" role="group" aria-label="Filter by continent">
          {continents.map((c) => (
            <button
              key={c}
              className={`filter-button ${
                selectedContinent === c ? "active-filter" : ""
              }`}
              onClick={() => setSelectedContinent(c)}
              aria-pressed={selectedContinent === c}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filteredDestinations.length > 0 ? (
          <div className="destinations-grid">
            {filteredDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                onExplore={setSelectedDestination}
                distance={getDistance(destination)}
              />
            ))}
          </div>
        ) : (
          <div className="no-destinations">
            <div className="no-destinations-icon">🔍</div>
            <h3 className="no-destinations-title">No destinations found</h3>
            <p className="no-destinations-text">
              Try a different search term or clear the filters.
            </p>
          </div>
        )}
      </section>

      <TripPlanner prefillDestination={prefillDestination} />

      <Footer />

      <AIChatbot activeDestination={null} />
    </div>
  );
}

export default App;
