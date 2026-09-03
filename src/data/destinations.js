const destinations = [
  {
    id: 1,
    name: "Paris",
    country: "France",
    continent: "Europe",
    description:
      "The City of Light captivates with its timeless elegance, world-class art, and romantic atmosphere. From the grandeur of the Eiffel Tower to the cobblestone streets of Montmartre, Paris is an enduring symbol of culture, fashion, and gastronomy.",
    lat: 48.8566,
    lng: 2.3522,
    bestTimeToVisit: "Apr – Jun, Sep – Oct",
    language: "French",
    currency: "EUR (€)",
    timezone: "CET (UTC+1)",
    highlights: ["Art", "History", "Food", "Fashion", "Romance"],
    famousPlaces: [
      {
        name: "Eiffel Tower",
        description:
          "The iconic iron lattice tower standing 330 metres tall, offering breathtaking panoramic views of the city from its observation decks.",
        category: "Landmark",
      },
      {
        name: "Louvre Museum",
        description:
          "The world's largest and most visited art museum, home to thousands of masterpieces including the Mona Lisa and Venus de Milo.",
        category: "Museum",
      },
      {
        name: "Notre-Dame Cathedral",
        description:
          "A masterpiece of French Gothic architecture on the Île de la Cité, renowned for its stunning stained glass windows and flying buttresses.",
        category: "Landmark",
      },
      {
        name: "Montmartre",
        description:
          "A historic hilltop village in the heart of Paris, known for the Sacré-Cœur Basilica, charming cafés, and a vibrant artistic heritage.",
        category: "Neighborhood",
      },
      {
        name: "Palace of Versailles",
        description:
          "An opulent royal château just outside Paris featuring the legendary Hall of Mirrors and vast formal gardens spanning 800 hectares.",
        category: "Palace",
      },
    ],
  },
  {
    id: 2,
    name: "Tokyo",
    country: "Japan",
    continent: "Asia",
    description:
      "A mesmerising blend of ultramodern innovation and deep-rooted tradition. Neon-lit skyscrapers tower over ancient temples, while cutting-edge technology sits alongside centuries-old tea ceremonies in this electric metropolis.",
    lat: 35.6762,
    lng: 139.6503,
    bestTimeToVisit: "Mar – May, Sep – Nov",
    language: "Japanese",
    currency: "JPY (¥)",
    timezone: "JST (UTC+9)",
    highlights: ["Technology", "Food", "Culture", "Shopping", "Temples"],
    famousPlaces: [
      {
        name: "Senso-ji Temple",
        description:
          "Tokyo's oldest and most significant Buddhist temple in Asakusa, approached through the iconic Kaminarimon Thunder Gate and Nakamise shopping street.",
        category: "Temple",
      },
      {
        name: "Shibuya Crossing",
        description:
          "The world's busiest pedestrian intersection where up to 3,000 people cross simultaneously, a dazzling symbol of Tokyo's organised chaos.",
        category: "Landmark",
      },
      {
        name: "Meiji Shrine",
        description:
          "A serene Shinto shrine set within a lush forested park of 170,000 trees, dedicated to Emperor Meiji and Empress Shōken.",
        category: "Temple",
      },
      {
        name: "Tokyo Skytree",
        description:
          "The tallest structure in Japan at 634 metres, offering observation decks with sweeping views stretching to Mount Fuji on clear days.",
        category: "Landmark",
      },
      {
        name: "Tsukiji Outer Market",
        description:
          "A vibrant food market offering the freshest sushi, street food delicacies, and a window into Tokyo's legendary culinary culture.",
        category: "Market",
      },
    ],
  },
  {
    id: 3,
    name: "Bali",
    country: "Indonesia",
    continent: "Asia",
    description:
      "A tropical paradise where emerald rice terraces cascade down volcanic hillsides, ancient temples perch on dramatic sea cliffs, and pristine beaches stretch beneath swaying palms. Bali is a haven for spiritual seekers and adventure lovers alike.",
    lat: -8.3405,
    lng: 115.092,
    bestTimeToVisit: "Apr – Oct",
    language: "Indonesian, Balinese",
    currency: "IDR (Rp)",
    timezone: "WITA (UTC+8)",
    highlights: ["Beaches", "Temples", "Nature", "Wellness", "Surfing"],
    famousPlaces: [
      {
        name: "Tanah Lot Temple",
        description:
          "A stunning sea temple perched on a rocky outcrop, dramatically surrounded by crashing waves and offering spectacular sunset views.",
        category: "Temple",
      },
      {
        name: "Tegallalang Rice Terraces",
        description:
          "Iconic cascading rice paddies near Ubud featuring the ancient subak irrigation system, a UNESCO-recognised cultural landscape.",
        category: "Nature",
      },
      {
        name: "Uluwatu Temple",
        description:
          "A clifftop temple 70 metres above the Indian Ocean, famous for its dramatic Kecak fire dance performances at sunset.",
        category: "Temple",
      },
      {
        name: "Sacred Monkey Forest",
        description:
          "A nature reserve and temple complex in Ubud, home to over 1,260 long-tailed macaques amid ancient banyan trees and moss-covered statues.",
        category: "Nature",
      },
    ],
  },
  {
    id: 4,
    name: "Rome",
    country: "Italy",
    continent: "Europe",
    description:
      "The Eternal City is a living museum where ancient ruins, Renaissance art, and vibrant street life coexist in spectacular harmony. Every cobblestone tells a story spanning nearly three thousand years of Western civilisation.",
    lat: 41.9028,
    lng: 12.4964,
    bestTimeToVisit: "Apr – Jun, Sep – Oct",
    language: "Italian",
    currency: "EUR (€)",
    timezone: "CET (UTC+1)",
    highlights: ["History", "Architecture", "Food", "Art", "Religion"],
    famousPlaces: [
      {
        name: "Colosseum",
        description:
          "The largest ancient amphitheatre ever built, once seating 80,000 spectators for gladiatorial contests — an enduring icon of Imperial Rome.",
        category: "Landmark",
      },
      {
        name: "Vatican City",
        description:
          "The world's smallest independent state, home to St. Peter's Basilica, the Sistine Chapel, and extraordinary collections of Renaissance art.",
        category: "Religious Site",
      },
      {
        name: "Trevi Fountain",
        description:
          "A breathtaking Baroque masterpiece where visitors toss coins to ensure their return to Rome — the largest fountain in the city.",
        category: "Landmark",
      },
      {
        name: "Roman Forum",
        description:
          "The ruins of the ancient political, religious, and commercial centre of the Roman Republic, surrounded by monumental arches and temples.",
        category: "Archaeological Site",
      },
      {
        name: "Pantheon",
        description:
          "A remarkably preserved Roman temple from 125 AD featuring the world's largest unreinforced concrete dome and its famous oculus.",
        category: "Landmark",
      },
    ],
  },
  {
    id: 5,
    name: "Dubai",
    country: "United Arab Emirates",
    continent: "Asia",
    description:
      "A futuristic metropolis risen from the desert, Dubai dazzles with record-breaking architecture, luxury shopping, and experiences that push the boundaries of imagination. A place where ambition meets opulence on an unprecedented scale.",
    lat: 25.2048,
    lng: 55.2708,
    bestTimeToVisit: "Nov – Mar",
    language: "Arabic, English",
    currency: "AED (د.إ)",
    timezone: "GST (UTC+4)",
    highlights: ["Luxury", "Architecture", "Shopping", "Desert", "Adventure"],
    famousPlaces: [
      {
        name: "Burj Khalifa",
        description:
          "The tallest building in the world at 828 metres, featuring observation decks on the 124th and 148th floors with unparalleled city views.",
        category: "Landmark",
      },
      {
        name: "Palm Jumeirah",
        description:
          "A man-made archipelago shaped like a palm tree, home to luxury hotels, residences, and the iconic Atlantis resort.",
        category: "Landmark",
      },
      {
        name: "Dubai Mall",
        description:
          "One of the world's largest shopping destinations with 1,200 stores, an aquarium, ice rink, and the mesmerising Dubai Fountain.",
        category: "Shopping",
      },
      {
        name: "Dubai Desert Safari",
        description:
          "An exhilarating experience of dune bashing, camel rides, and traditional Bedouin camping under the stars in the Arabian desert.",
        category: "Adventure",
      },
    ],
  },
  {
    id: 6,
    name: "New York",
    country: "United States",
    continent: "North America",
    description:
      "The city that never sleeps pulses with an unmatched energy. From the bright lights of Times Square to the tranquillity of Central Park, New York offers a kaleidoscope of culture, cuisine, and creativity found nowhere else on Earth.",
    lat: 40.7128,
    lng: -74.006,
    bestTimeToVisit: "Apr – Jun, Sep – Nov",
    language: "English",
    currency: "USD ($)",
    timezone: "EST (UTC-5)",
    highlights: ["Culture", "Food", "Art", "Theater", "Skyline"],
    famousPlaces: [
      {
        name: "Statue of Liberty",
        description:
          "A colossal neoclassical sculpture on Liberty Island, a universal symbol of freedom and democracy gifted by France in 1886.",
        category: "Landmark",
      },
      {
        name: "Central Park",
        description:
          "An 843-acre urban oasis in the heart of Manhattan, featuring lakes, gardens, walking trails, and iconic bridges and meadows.",
        category: "Nature",
      },
      {
        name: "Times Square",
        description:
          "The dazzling commercial and entertainment hub of Midtown Manhattan, famous for its bright neon billboards and Broadway theatres.",
        category: "Entertainment",
      },
      {
        name: "Empire State Building",
        description:
          "An Art Deco skyscraper with an 86th-floor observatory offering stunning 360-degree views of the New York City skyline.",
        category: "Landmark",
      },
      {
        name: "Metropolitan Museum of Art",
        description:
          "One of the world's largest and finest art museums, housing over two million works spanning 5,000 years of culture.",
        category: "Museum",
      },
    ],
  },
  {
    id: 7,
    name: "Sydney",
    country: "Australia",
    continent: "Oceania",
    description:
      "A sun-drenched harbour city where world-famous landmarks meet golden beaches and a laid-back coastal lifestyle. Sydney combines natural beauty with cosmopolitan culture in a setting that is utterly unforgettable.",
    lat: -33.8688,
    lng: 151.2093,
    bestTimeToVisit: "Sep – Nov, Mar – May",
    language: "English",
    currency: "AUD (A$)",
    timezone: "AEST (UTC+10)",
    highlights: ["Beaches", "Architecture", "Nature", "Food", "Wildlife"],
    famousPlaces: [
      {
        name: "Sydney Opera House",
        description:
          "An architectural masterpiece and UNESCO World Heritage site with its iconic sail-shaped shells overlooking the harbour.",
        category: "Landmark",
      },
      {
        name: "Sydney Harbour Bridge",
        description:
          "Affectionately called the 'Coat Hanger', this steel arch bridge offers the BridgeClimb experience with panoramic harbour views.",
        category: "Landmark",
      },
      {
        name: "Bondi Beach",
        description:
          "Australia's most famous beach, known for its golden sand, rolling surf, and the stunning coastal walk to Coogee.",
        category: "Beach",
      },
      {
        name: "Taronga Zoo",
        description:
          "A world-class zoo set on the harbour foreshore, home to over 4,000 animals including iconic Australian wildlife.",
        category: "Nature",
      },
    ],
  },
  {
    id: 8,
    name: "London",
    country: "United Kingdom",
    continent: "Europe",
    description:
      "A grand tapestry of royal heritage, cutting-edge culture, and timeless charm. London seamlessly weaves its storied past with a dynamic present across iconic neighbourhoods, world-class museums, and vibrant markets.",
    lat: 51.5074,
    lng: -0.1278,
    bestTimeToVisit: "May – Sep",
    language: "English",
    currency: "GBP (£)",
    timezone: "GMT (UTC+0)",
    highlights: ["History", "Culture", "Theater", "Royalty", "Pubs"],
    famousPlaces: [
      {
        name: "Tower of London",
        description:
          "A historic fortress and royal palace housing the Crown Jewels, with nearly 1,000 years of history within its ancient walls.",
        category: "Landmark",
      },
      {
        name: "British Museum",
        description:
          "A world-renowned museum with a collection of over eight million artefacts spanning the entirety of human history and culture.",
        category: "Museum",
      },
      {
        name: "Buckingham Palace",
        description:
          "The official London residence of the British monarch, famous for the Changing of the Guard ceremony and its grand state rooms.",
        category: "Palace",
      },
      {
        name: "Big Ben & Houses of Parliament",
        description:
          "The iconic clock tower and Gothic Revival palace on the banks of the Thames — the heart of British democracy.",
        category: "Landmark",
      },
      {
        name: "Hyde Park",
        description:
          "One of London's eight Royal Parks spanning 350 acres, featuring the Serpentine lake, Speaker's Corner, and beautiful rose gardens.",
        category: "Nature",
      },
    ],
  },
  {
    id: 9,
    name: "Barcelona",
    country: "Spain",
    continent: "Europe",
    description:
      "A vibrant Mediterranean gem where Gaudí's fantastical architecture meets golden beaches and a legendary food scene. Barcelona pulses with creative energy, from its Gothic Quarter to its lively La Rambla boulevard.",
    lat: 41.3874,
    lng: 2.1686,
    bestTimeToVisit: "May – Jun, Sep – Oct",
    language: "Spanish, Catalan",
    currency: "EUR (€)",
    timezone: "CET (UTC+1)",
    highlights: ["Architecture", "Beach", "Food", "Art", "Nightlife"],
    famousPlaces: [
      {
        name: "Sagrada Família",
        description:
          "Gaudí's unfinished masterpiece — a breathtaking basilica under construction since 1882, with soaring towers and kaleidoscopic stained glass.",
        category: "Landmark",
      },
      {
        name: "Park Güell",
        description:
          "A whimsical public park system designed by Antoni Gaudí, featuring colourful mosaics, organic forms, and panoramic city views.",
        category: "Nature",
      },
      {
        name: "La Rambla",
        description:
          "Barcelona's most famous tree-lined pedestrian boulevard stretching 1.2 km from Plaça de Catalunya to the waterfront.",
        category: "Street",
      },
      {
        name: "Gothic Quarter",
        description:
          "A maze of medieval streets and plazas in the heart of old Barcelona, filled with hidden churches, tapas bars, and history.",
        category: "Neighborhood",
      },
    ],
  },
  {
    id: 10,
    name: "Kyoto",
    country: "Japan",
    continent: "Asia",
    description:
      "The cultural heart of Japan, where thousands of classical Buddhist temples, imperial palaces, and traditional wooden machiya houses paint a picture of old Japan. Cherry blossoms and fiery autumn leaves frame its timeless beauty.",
    lat: 35.0116,
    lng: 135.7681,
    bestTimeToVisit: "Mar – May, Oct – Nov",
    language: "Japanese",
    currency: "JPY (¥)",
    timezone: "JST (UTC+9)",
    highlights: ["Temples", "Gardens", "Tradition", "Cherry Blossoms", "Tea"],
    famousPlaces: [
      {
        name: "Fushimi Inari Shrine",
        description:
          "An iconic shrine famous for its thousands of vermillion torii gates winding through the forested slopes of Mount Inari.",
        category: "Temple",
      },
      {
        name: "Kinkaku-ji (Golden Pavilion)",
        description:
          "A stunning Zen Buddhist temple covered in gold leaf, reflected perfectly in the surrounding mirror pond and gardens.",
        category: "Temple",
      },
      {
        name: "Arashiyama Bamboo Grove",
        description:
          "An ethereal pathway through towering bamboo stalks that sway and creak in the wind, creating a natural cathedral of green.",
        category: "Nature",
      },
      {
        name: "Gion District",
        description:
          "Kyoto's most famous geisha district where traditional wooden machiya houses line atmospheric streets lit by paper lanterns.",
        category: "Neighborhood",
      },
    ],
  },
  {
    id: 11,
    name: "Cape Town",
    country: "South Africa",
    continent: "Africa",
    description:
      "A stunningly beautiful city nestled between the dramatic Table Mountain and two oceans. Cape Town enchants with its diverse cultures, world-class vineyards, pristine beaches, and breathtaking natural landscapes.",
    lat: -33.9249,
    lng: 18.4241,
    bestTimeToVisit: "Nov – Mar",
    language: "English, Afrikaans, Xhosa",
    currency: "ZAR (R)",
    timezone: "SAST (UTC+2)",
    highlights: ["Nature", "Wine", "Beaches", "Adventure", "Culture"],
    famousPlaces: [
      {
        name: "Table Mountain",
        description:
          "A flat-topped mountain and UNESCO World Heritage Site rising 1,085 metres above the city, accessible by aerial cableway.",
        category: "Nature",
      },
      {
        name: "Cape of Good Hope",
        description:
          "A dramatic rocky headland on the Atlantic coast marking the southwestern tip of the African continent.",
        category: "Nature",
      },
      {
        name: "Robben Island",
        description:
          "A UNESCO World Heritage Site where Nelson Mandela was imprisoned for 18 years, now a powerful museum of resistance.",
        category: "Museum",
      },
      {
        name: "V&A Waterfront",
        description:
          "A vibrant harbour precinct with world-class shopping, dining, and entertainment set against a stunning mountain backdrop.",
        category: "Entertainment",
      },
    ],
  },
  {
    id: 12,
    name: "Marrakech",
    country: "Morocco",
    continent: "Africa",
    description:
      "A sensory explosion of colour, scent, and sound in the heart of North Africa. Marrakech's ancient medina, ornate palaces, and bustling souks create an unforgettable tapestry of Berber, Arab, and French-colonial influences.",
    lat: 31.6295,
    lng: -7.9811,
    bestTimeToVisit: "Mar – May, Sep – Nov",
    language: "Arabic, French, Berber",
    currency: "MAD (د.م.)",
    timezone: "WET (UTC+1)",
    highlights: ["Culture", "Markets", "History", "Food", "Architecture"],
    famousPlaces: [
      {
        name: "Jemaa el-Fnaa",
        description:
          "A legendary square and marketplace at the medina's heart, alive with storytellers, musicians, snake charmers, and food stalls after dark.",
        category: "Market",
      },
      {
        name: "Bahia Palace",
        description:
          "An exquisite 19th-century palace showcasing the finest of Moroccan and Islamic architecture with stunning zellige tilework and carved cedarwood.",
        category: "Palace",
      },
      {
        name: "Majorelle Garden",
        description:
          "A lush botanical garden created by French painter Jacques Majorelle, later restored by Yves Saint Laurent with its iconic cobalt blue villa.",
        category: "Nature",
      },
      {
        name: "Koutoubia Mosque",
        description:
          "The largest mosque in Marrakech with a stunning 77-metre minaret visible across the city, a masterpiece of Almohad architecture.",
        category: "Landmark",
      },
    ],
  },
  {
    id: 13,
    name: "Rio de Janeiro",
    country: "Brazil",
    continent: "South America",
    description:
      "The Marvellous City lives up to its name with dramatic mountain peaks, golden beaches, and an infectious rhythm of samba and celebration. Rio is a place of contrasts, beauty, and irresistible energy.",
    lat: -22.9068,
    lng: -43.1729,
    bestTimeToVisit: "Dec – Mar",
    language: "Portuguese",
    currency: "BRL (R$)",
    timezone: "BRT (UTC-3)",
    highlights: ["Beaches", "Carnival", "Nature", "Nightlife", "Culture"],
    famousPlaces: [
      {
        name: "Christ the Redeemer",
        description:
          "An Art Deco statue of Jesus Christ standing 30 metres tall atop Mount Corcovado, one of the New Seven Wonders of the World.",
        category: "Landmark",
      },
      {
        name: "Sugarloaf Mountain",
        description:
          "A dramatic granite peak rising 396 metres from the harbour, reached by cable car and offering sweeping views of the city and coast.",
        category: "Nature",
      },
      {
        name: "Copacabana Beach",
        description:
          "A legendary 4 km crescent of golden sand along the Atlantic, framed by mountains and alive with beach culture and street performers.",
        category: "Beach",
      },
      {
        name: "Selaron Steps",
        description:
          "A world-famous staircase of 250 steps decorated with over 2,000 colourful tiles collected from more than 60 countries.",
        category: "Landmark",
      },
    ],
  },
  {
    id: 14,
    name: "Santorini",
    country: "Greece",
    continent: "Europe",
    description:
      "A breathtaking volcanic island in the Aegean Sea, renowned for its whitewashed clifftop villages, blue-domed churches, and the most spectacular sunsets in the Mediterranean. Santorini is pure magic from every angle.",
    lat: 36.3932,
    lng: 25.4615,
    bestTimeToVisit: "Apr – Oct",
    language: "Greek",
    currency: "EUR (€)",
    timezone: "EET (UTC+2)",
    highlights: ["Sunsets", "Architecture", "Wine", "Romance", "Beaches"],
    famousPlaces: [
      {
        name: "Oia Village",
        description:
          "A picturesque village of white-washed buildings and blue domes clinging to the caldera rim, famous for the world's most photographed sunsets.",
        category: "Village",
      },
      {
        name: "Red Beach",
        description:
          "A dramatic beach with striking red volcanic cliffs and dark sand, set beneath towering ancient rock formations.",
        category: "Beach",
      },
      {
        name: "Ancient Akrotiri",
        description:
          "A remarkably preserved Minoan Bronze Age settlement buried by a volcanic eruption around 1627 BC, often called the 'Pompeii of the Aegean'.",
        category: "Archaeological Site",
      },
      {
        name: "Fira",
        description:
          "The lively capital of Santorini perched on the caldera's edge, offering panoramic views, vibrant nightlife, and winding marble streets.",
        category: "Town",
      },
    ],
  },
  {
    id: 15,
    name: "Singapore",
    country: "Singapore",
    continent: "Asia",
    description:
      "A futuristic city-state where gleaming skyscrapers rise above lush tropical gardens, and a extraordinary food culture draws from Chinese, Malay, Indian, and Peranakan traditions. Singapore is clean, safe, and endlessly surprising.",
    lat: 1.3521,
    lng: 103.8198,
    bestTimeToVisit: "Feb – Apr",
    language: "English, Malay, Mandarin, Tamil",
    currency: "SGD (S$)",
    timezone: "SGT (UTC+8)",
    highlights: ["Food", "Architecture", "Gardens", "Shopping", "Culture"],
    famousPlaces: [
      {
        name: "Marina Bay Sands",
        description:
          "An iconic integrated resort with three 55-storey towers connected by a breathtaking SkyPark featuring an infinity pool 200 metres above the city.",
        category: "Landmark",
      },
      {
        name: "Gardens by the Bay",
        description:
          "A futuristic nature park with towering Supertree structures, the Cloud Forest dome, and the Flower Dome conservatory.",
        category: "Nature",
      },
      {
        name: "Sentosa Island",
        description:
          "A resort island featuring Universal Studios, pristine beaches, adventure parks, and the S.E.A. Aquarium.",
        category: "Entertainment",
      },
      {
        name: "Chinatown & Hawker Centres",
        description:
          "A vibrant cultural district with heritage shophouses and legendary hawker centres serving some of the world's best street food.",
        category: "Neighborhood",
      },
    ],
  },
  {
    id: 16,
    name: "Cusco",
    country: "Peru",
    continent: "South America",
    description:
      "The ancient capital of the Inca Empire, perched high in the Andes at 3,400 metres. Cusco is the gateway to Machu Picchu and a living testament to the fusion of Inca stonework and Spanish colonial architecture.",
    lat: -13.532,
    lng: -71.9675,
    bestTimeToVisit: "May – Sep",
    language: "Spanish, Quechua",
    currency: "PEN (S/.)",
    timezone: "PET (UTC-5)",
    highlights: ["History", "Hiking", "Architecture", "Culture", "Mountains"],
    famousPlaces: [
      {
        name: "Machu Picchu",
        description:
          "A 15th-century Inca citadel set high in the Andes, one of the New Seven Wonders of the World and a UNESCO World Heritage Site.",
        category: "Archaeological Site",
      },
      {
        name: "Sacsayhuamán",
        description:
          "A massive Inca fortress above Cusco built with enormous precisely-cut stones, some weighing over 100 tonnes, fitted without mortar.",
        category: "Archaeological Site",
      },
      {
        name: "Plaza de Armas",
        description:
          "The grand central square of Cusco surrounded by colonial arcades, the baroque Cathedral, and the ornate Church of the Society of Jesus.",
        category: "Landmark",
      },
      {
        name: "Rainbow Mountain",
        description:
          "Vinicunca, a strikingly colourful mountain with mineral-streaked slopes in shades of red, gold, and turquoise at 5,200 metres elevation.",
        category: "Nature",
      },
    ],
  },
];

export default destinations;
