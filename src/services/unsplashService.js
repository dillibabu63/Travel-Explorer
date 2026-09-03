const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const PEXELS_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

// Curated Unsplash fallback images (used if search API is rate-limited)
const DESTINATION_FALLBACKS = {
  Paris: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
  Tokyo: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
  Bali: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
  Rome: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80",
  Dubai: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
  "New York": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80",
  Sydney: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80",
  London: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
  Barcelona: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80",
  Kyoto: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
  "Cape Town": "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80",
  Marrakech: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1200&q=80",
  "Rio de Janeiro": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=80",
  Santorini: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
  Singapore: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
  Cusco: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80"
};

const PLACE_FALLBACKS = {
  "Eiffel Tower": "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=800&q=80",
  "Louvre Museum": "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80",
  "Notre-Dame Cathedral": "https://images.unsplash.com/photo-1478860409698-8707f313ee8b?auto=format&fit=crop&w=800&q=80",
  "Montmartre": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
  "Palace of Versailles": "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=800&q=80",
  "Senso-ji Temple": "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
  "Shibuya Crossing": "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80",
  "Meiji Shrine": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
  "Tokyo Skytree": "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=800&q=80",
  "Tsukiji Outer Market": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
  "Tanah Lot Temple": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
  "Tegallalang Rice Terraces": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80",
  "Colosseum": "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80",
  "Vatican City": "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=800&q=80",
  "Trevi Fountain": "https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=800&q=80",
  "Burj Khalifa": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
  "Statue of Liberty": "https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?auto=format&fit=crop&w=800&q=80",
  "Central Park": "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80",
  "Sydney Opera House": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80",
  "Sagrada Família": "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=80",
  "Machu Picchu": "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80"
};

function getCached(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    if (!raw.startsWith("{")) {
      localStorage.removeItem(key);
      return null;
    }

    const { url, timestamp } = JSON.parse(raw);
    if (Date.now() - timestamp > CACHE_TTL) {
      localStorage.removeItem(key);
      return null;
    }
    return url;
  } catch {
    return null;
  }
}

function setCache(key, url) {
  try {
    localStorage.setItem(key, JSON.stringify({ url, timestamp: Date.now() }));
  } catch {
    // Storage full — silently fail
  }
}

export function clearImageCache() {
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (
      key &&
      (key.startsWith("dest-img-") ||
        key.startsWith("place-img-") ||
        key.startsWith("destination-image-"))
    ) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach((k) => localStorage.removeItem(k));
}

/* ------ Unsplash Search API ------ */
async function fetchFromUnsplash(query) {
  if (!UNSPLASH_KEY) return null;

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query
      )}&per_page=1&orientation=landscape&client_id=${UNSPLASH_KEY}`
    );

    if (!response.ok) return null;

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].urls?.regular || null;
    }
  } catch {
    // Rate limit or network error
  }

  return null;
}

/* ------ Pexels API ------ */
async function fetchFromPexels(query) {
  if (!PEXELS_KEY) return null;

  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(
        query
      )}&per_page=1&orientation=landscape`,
      {
        headers: { Authorization: PEXELS_KEY },
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    if (data.photos && data.photos.length > 0) {
      return data.photos[0].src?.large || null;
    }
  } catch {
    // Fall through
  }

  return null;
}

export async function getDestinationImage(destinationName) {
  const cacheKey = `dest-img-${destinationName}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  // 1. Try Unsplash search API
  const unsplashUrl = await fetchFromUnsplash(`${destinationName} city travel landmark`);
  if (unsplashUrl) {
    setCache(cacheKey, unsplashUrl);
    return unsplashUrl;
  }

  // 2. Try Pexels
  const pexelsUrl = await fetchFromPexels(`${destinationName} city`);
  if (pexelsUrl) {
    setCache(cacheKey, pexelsUrl);
    return pexelsUrl;
  }

  // 3. Fallback to curated Unsplash CDN URL (works when search API is rate-limited)
  const fallback = DESTINATION_FALLBACKS[destinationName] ||
    `https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80`;
  setCache(cacheKey, fallback);
  return fallback;
}

export async function getPlaceImage(placeName, cityName) {
  const cacheKey = `place-img-${placeName}-${cityName}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  // 1. Try Unsplash
  const unsplashUrl = await fetchFromUnsplash(`${placeName} ${cityName}`);
  if (unsplashUrl) {
    setCache(cacheKey, unsplashUrl);
    return unsplashUrl;
  }

  // 2. Try Pexels
  const pexelsUrl = await fetchFromPexels(`${placeName} landmark`);
  if (pexelsUrl) {
    setCache(cacheKey, pexelsUrl);
    return pexelsUrl;
  }

  // 3. Fallback to curated place or city photo
  const fallback = PLACE_FALLBACKS[placeName] || DESTINATION_FALLBACKS[cityName] ||
    `https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80`;
  setCache(cacheKey, fallback);
  return fallback;
}
