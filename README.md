# 🌍 Travel Explorer

> A modern, design-led travel web application built with React, Vite, Express, and Google Gemini AI. Explore destinations worldwide, check live weather, discover famous landmarks, calculate real-time distances, and plan personalized itineraries with an AI travel assistant.

---

## ✨ Features

- **🎬 Dynamic Hero Experience**: Seamless looping video background with dark gradient overlay, fluid typography, and animated scroll indicator.
- **🧭 Destination Explorer**: Browse 16 hand-curated destinations across 6 continents (Asia, Europe, North America, South America, Africa, Oceania) with instant search and category filters.
- **🏛️ Famous Places Showcase**: Dedicated landmark cards for each city featuring high-definition photography, category badges, and rich descriptions.
- **📍 Location Awareness**: Browser Geolocation API integration with permission fallbacks and manual city search with debounced autocomplete. Calculates real-time distance (km) to each destination using the Haversine formula.
- **⛅ Live Weather Integration**: Real-time temperature, condition emojis, "feels like" temperature, humidity, and wind speed powered by the Open-Meteo API.
- **🖼️ High-Definition Image Pipeline**: Unsplash search API integration with local caching (24h TTL) and a curated high-resolution fallback layer for reliable rendering.
- **🤖 AI Travel Assistant (Chatbot)**: Floating conversational AI assistant powered by **Google Gemini** with active destination context awareness and suggestion chips.
- **📅 AI Itinerary Planner**: Day-by-day customized travel itineraries (Morning, Afternoon, Evening breakdown, local tips, and cost estimates) with travel style customization (Cultural, Adventure, Foodie, Relaxation, Romantic, Budget).
- **📱 Fully Responsive Design**: Mobile slide-in drawer, full-screen mobile chat mode, touch-friendly pill buttons, and responsive grid layouts.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Vanilla CSS (Design System Tokens, Glassmorphism, CSS Grid & Flexbox)
- **Icons**: Lucide React
- **Typography**: Google Fonts (Inter & Playfair Display)
- **Backend**: Node.js, Express, CORS
- **AI / LLM**: Google Generative AI SDK (`@google/generative-ai`) with multi-model fallback cascade (`gemini-3.5-flash`, `gemini-3.7-flash`, `gemini-flash-latest`)
- **APIs**:
  - [Open-Meteo](https://open-meteo.com/) (Weather & Geocoding — free, no key required)
  - [Unsplash API](https://unsplash.com/developers) (Destination Photography)
  - [Nominatim OpenStreetMap](https://nominatim.openstreetmap.org/) (Reverse Geocoding)
  - [Google Gemini API](https://aistudio.google.com/) (Generative AI)

---

## 📁 Project Structure

```text
travel-explorer/
├── public/
│   ├── favicon.svg             # Branded compass favicon
│   └── videos/
│       └── travel-video.mp4    # Hero background video
├── src/
│   ├── components/
│   │   ├── AIChatbot.jsx / .css
│   │   ├── DestinationCard.jsx / .css
│   │   ├── DestinationDetails.jsx / .css
│   │   ├── Footer.jsx / .css
│   │   ├── Hero.jsx / .css
│   │   ├── LocationBar.jsx / .css
│   │   ├── Navbar.jsx / .css
│   │   └── TripPlanner.jsx / .css
│   ├── data/
│   │   └── destinations.js     # 16 destinations with landmarks & metadata
│   ├── services/
│   │   ├── geminiService.js    # AI chat & itinerary API client
│   │   ├── locationService.js  # Geolocation & Haversine distance
│   │   ├── unsplashService.js  # Photo fetching & cache layer
│   │   └── weatherService.js   # Open-Meteo weather client
│   ├── App.jsx
│   ├── index.css               # Global theme & design system tokens
│   └── main.jsx
├── server/
│   ├── index.js                # Express API with Gemini integration
│   ├── package.json
│   └── .env.example
├── .env.example
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/travel-explorer.git
cd travel-explorer
```

### 2. Configure Environment Variables

**Frontend (`.env` in root directory):**
```env
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key
VITE_PEXELS_API_KEY=your_pexels_key_optional
VITE_API_URL=http://localhost:5000
```

**Backend (`server/.env`):**
```env
GEMINI_API_KEY=your_google_gemini_api_key
PORT=5000
```
> *Get a free Gemini API key from [Google AI Studio](https://aistudio.google.com).*

### 3. Install dependencies & Run

**Terminal 1 — Backend:**
```bash
cd server
npm install
npm start
```

**Terminal 2 — Frontend:**
```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌐 Deploying to Netlify

This project is configured for **1-click fullstack deployment on Netlify** using native **Netlify Serverless Functions** (no external backend hosting needed!).

### Deployment Steps:

1. **Push to GitHub**: Push your repository to GitHub.
2. **Import to Netlify**:
   - Log in to [Netlify](https://app.netlify.com/).
   - Click **"Add new site"** → **"Import an existing project"** → select your GitHub repository.
3. **Build Settings** (automatically detected from `netlify.toml`):
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Functions directory**: `netlify/functions`
4. **Set Environment Variables in Netlify**:
   - Go to **Site settings** → **Environment variables** → **Add variables**:
     - `GEMINI_API_KEY`: *(Your Google Gemini API Key)*
     - `VITE_UNSPLASH_ACCESS_KEY`: *(Your Unsplash Access Key)*
     - `VITE_PEXELS_API_KEY`: *(Optional Pexels Key)*
5. **Click Deploy**: Netlify will build the frontend and deploy the serverless functions automatically!

---

## 🛡️ Security
All API keys and environment files (`.env`, `server/.env`) are strictly excluded via `.gitignore` to keep credentials secure.

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
