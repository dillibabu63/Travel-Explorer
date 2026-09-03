const UNSPLASH_KEY = import.meta.env?.VITE_UNSPLASH_ACCESS_KEY;
const PEXELS_KEY = import.meta.env?.VITE_PEXELS_API_KEY;
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

// Curated Unsplash fallback images (used if search API is rate-limited or offline)
export const DESTINATION_FALLBACKS = {
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
  Cusco: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80",
};

// Curated unique landmark images for all famous places across all 16 destinations
export const PLACE_FALLBACKS = {
  // Paris
  "Eiffel Tower": "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=800&q=80",
  "Louvre Museum": "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80",
  "Notre-Dame Cathedral": "https://images.unsplash.com/photo-1478860409698-8707f313ee8b?auto=format&fit=crop&w=800&q=80",
  "Montmartre": "https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=800&q=80",
  "Palace of Versailles": "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=800&q=80",

  // Tokyo
  "Senso-ji Temple": "https://images.unsplash.com/photo-1583083527882-4bee9aba2eea?auto=format&fit=crop&w=800&q=80",
  "Shibuya Crossing": "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80",
  "Meiji Shrine": "https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=800&q=80",
  "Tokyo Skytree": "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=800&q=80",
  "Tsukiji Outer Market": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",

  // Bali
  "Tanah Lot Temple": "https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&w=800&q=80",
  "Tegallalang Rice Terraces": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80",
  "Uluwatu Temple": "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800&q=80",
  "Sacred Monkey Forest": "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=800&q=80",

  // Rome
  "Colosseum": "https://images.unsplash.com/photo-1546412414-8035e1776c9a?auto=format&fit=crop&w=800&q=80",
  "Vatican City": "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=800&q=80",
  "Trevi Fountain": "https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=800&q=80",
  "Roman Forum": "https://images.unsplash.com/photo-1588614959060-4d144f28b207?auto=format&fit=crop&w=800&q=80",
  "Pantheon": "https://images.unsplash.com/photo-1574007557239-acf6863bc375?auto=format&fit=crop&w=800&q=80",

  // Dubai
  "Burj Khalifa": "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80",
  "Palm Jumeirah": "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=800&q=80",
  "Dubai Mall": "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80",
  "Dubai Desert Safari": "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?auto=format&fit=crop&w=800&q=80",

  // New York
  "Statue of Liberty": "https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?auto=format&fit=crop&w=800&q=80",
  "Central Park": "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80",
  "Times Square": "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=800&q=80",
  "Empire State Building": "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=800&q=80",
  "Metropolitan Museum of Art": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",

  // Sydney
  "Sydney Opera House": "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?auto=format&fit=crop&w=800&q=80",
  "Sydney Harbour Bridge": "https://images.unsplash.com/photo-1549180030-48bf079fb38a?auto=format&fit=crop&w=800&q=80",
  "Bondi Beach": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  "Taronga Zoo": "https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?auto=format&fit=crop&w=800&q=80",

  // London
  "Tower of London": "https://images.unsplash.com/photo-1520986606214-8b456906c813?auto=format&fit=crop&w=800&q=80",
  "British Museum": "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=800&q=80",
  "Buckingham Palace": "https://images.unsplash.com/photo-1587330979470-3595ac045ab0?auto=format&fit=crop&w=800&q=80",
  "Big Ben & Houses of Parliament": "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=800&q=80",
  "Hyde Park": "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=800&q=80",

  // Barcelona
  "Sagrada Família": "https://images.unsplash.com/photo-1561632669-7f55f7975606?auto=format&fit=crop&w=800&q=80",
  "Park Güell": "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=800&q=80",
  "La Rambla": "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=800&q=80",
  "Gothic Quarter": "https://images.unsplash.com/photo-1509824227185-9c5a01ceba0d?auto=format&fit=crop&w=800&q=80",

  // Kyoto
  "Fushimi Inari Shrine": "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=80",
  "Kinkaku-ji (Golden Pavilion)": "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=800&q=80",
  "Arashiyama Bamboo Grove": "https://images.unsplash.com/photo-1509023464722-18d996393ca8?auto=format&fit=crop&w=800&q=80",
  "Gion District": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",

  // Cape Town
  "Table Mountain": "https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?auto=format&fit=crop&w=800&q=80",
  "Cape of Good Hope": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
  "Robben Island": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
  "V&A Waterfront": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",

  // Marrakech
  "Jemaa el-Fnaa": "https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?auto=format&fit=crop&w=800&q=80",
  "Bahia Palace": "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&w=800&q=80",
  "Majorelle Garden": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
  "Koutoubia Mosque": "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=800&q=80",

  // Rio de Janeiro
  "Christ the Redeemer": "https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?auto=format&fit=crop&w=800&q=80",
  "Sugarloaf Mountain": "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?auto=format&fit=crop&w=800&q=80",
  "Copacabana Beach": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  "Selaron Steps": "https://images.unsplash.com/photo-1566438480900-0609be27a4be?auto=format&fit=crop&w=800&q=80",

  // Santorini
  "Oia Village": "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
  "Red Beach": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  "Ancient Akrotiri": "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80",
  "Fira": "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=800&q=80",

  // Singapore
  "Marina Bay Sands": "https://images.unsplash.com/photo-1506351421178-63b52a2d2562?auto=format&fit=crop&w=800&q=80",
  "Gardens by the Bay": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
  "Sentosa Island": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
  "Chinatown & Hawker Centres": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",

  // Cusco
  "Machu Picchu": "https://images.unsplash.com/photo-1509299349698-dd22323b5963?auto=format&fit=crop&w=800&q=80",
  "Sacsayhuamán": "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80",
  "Plaza de Armas": "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80",
  "Rainbow Mountain": "https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=800&q=80",
};

// Purge legacy unversioned caches that may contain duplicate fallback images
function purgeLegacyCaches() {
  try {
    const toRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (
        key &&
        (key.startsWith("dest-img-") || key.startsWith("place-img-")) &&
        !key.includes("-v3-")
      ) {
        toRemove.push(key);
      }
    }
    toRemove.forEach((k) => localStorage.removeItem(k));
  } catch {
    // Ignore in SSR / restricted storage environments
  }
}

purgeLegacyCaches();

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
  try {
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
  } catch {
    // Silently ignore
  }
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

export async function getDestinationImage(destinationName, defaultImage) {
  const cacheKey = `dest-img-v3-${destinationName}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  if (defaultImage) {
    setCache(cacheKey, defaultImage);
    return defaultImage;
  }

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

  // 3. Fallback to curated Unsplash URL
  const fallback =
    DESTINATION_FALLBACKS[destinationName] ||
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80";
  setCache(cacheKey, fallback);
  return fallback;
}

export async function getPlaceImage(placeName, cityName, defaultImage) {
  const cacheKey = `place-img-v3-${placeName}-${cityName}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  // If a verified unique landmark image was provided in the destination data, use it immediately
  if (defaultImage) {
    setCache(cacheKey, defaultImage);
    return defaultImage;
  }

  // If curated in PLACE_FALLBACKS, use it
  if (PLACE_FALLBACKS[placeName]) {
    setCache(cacheKey, PLACE_FALLBACKS[placeName]);
    return PLACE_FALLBACKS[placeName];
  }

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

  // 3. Fallback
  const fallback =
    DESTINATION_FALLBACKS[cityName] ||
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80";
  setCache(cacheKey, fallback);
  return fallback;
}
