const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";

/**
 * Request user's browser geolocation
 * Returns { latitude, longitude } or throws
 */
export function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error("Location permission denied"));
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error("Location information unavailable"));
            break;
          case error.TIMEOUT:
            reject(new Error("Location request timed out"));
            break;
          default:
            reject(new Error("Unable to get location"));
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000, // Cache for 5 minutes
      }
    );
  });
}

/**
 * Search for cities by name using Open-Meteo geocoding
 */
export async function searchCity(query) {
  if (!query || query.length < 2) return [];

  const response = await fetch(
    `${GEOCODING_URL}?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
  );

  const data = await response.json();

  if (!data.results) return [];

  return data.results.map((r) => ({
    name: r.name,
    country: r.country,
    admin: r.admin1 || "",
    latitude: r.latitude,
    longitude: r.longitude,
    displayName: r.admin1
      ? `${r.name}, ${r.admin1}, ${r.country}`
      : `${r.name}, ${r.country}`,
  }));
}

/**
 * Reverse geocode coordinates to a city name
 */
export async function reverseGeocode(latitude, longitude) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&accept-language=en`
    );
    const data = await response.json();
    const city =
      data.address?.city ||
      data.address?.town ||
      data.address?.village ||
      data.address?.county ||
      "Unknown location";
    const country = data.address?.country || "";
    return { city, country, displayName: `${city}, ${country}` };
  } catch {
    return { city: "Unknown", country: "", displayName: "Unknown location" };
  }
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in kilometres
 */
export function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

function toRad(deg) {
  return (deg * Math.PI) / 180;
}

/**
 * Format distance for display
 */
export function formatDistance(km) {
  if (km < 1) return "< 1 km";
  if (km < 1000) return `${km} km`;
  return `${(km / 1000).toFixed(1)}k km`;
}
