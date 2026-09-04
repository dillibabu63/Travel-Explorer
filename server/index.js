const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use((err, req, res, next) => {
  if (err) {
    console.error("Express middleware error:", err.message);
    return res.status(400).json({ error: "Bad request or invalid JSON." });
  }
  next();
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Multi-model fallback list to guarantee 100% uptime even during Google 503 spikes
const CANDIDATE_MODELS = [
  "gemini-3.5-flash",
  "gemini-3.7-flash",
  "gemini-flash-latest",
  "gemini-3.6-flash",
];

async function generateWithFallback(prompt) {
  let lastError = null;
  for (const modelName of CANDIDATE_MODELS) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      if (text) {
        return text;
      }
    } catch (err) {
      console.warn(`[AI Fallback] ${modelName} failed (${err.status || err.message}), attempting fallback...`);
      lastError = err;
    }
  }
  throw lastError || new Error("All AI models currently unavailable. Please try again.");
}

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Travel Explorer API is running!" });
});

// ============================
// CHAT ENDPOINT
// ============================
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, destinationContext } = req.body;

    if (!messages || messages.length === 0) {
      return res.status(400).json({ error: "No messages provided." });
    }

    const conversation = messages
      .map((m) => `${m.role === "user" ? "User" : "Travel Assistant"}: ${m.content}`)
      .join("\n\n");

    const fullPrompt = `You are a friendly, knowledgeable travel assistant for Travel Explorer.
You help visitors learn about travel destinations, recommendations on what to see, when to visit,
how long to stay, local tips, budget advice, and cultural insights.
Keep responses concise, helpful, and informative (around 1-3 paragraphs).
Use a warm, enthusiastic tone.
${destinationContext ? `\nActive Destination Context:\n${destinationContext}\n` : ""}
Conversation:
${conversation}

Travel Assistant:`;

    const reply = await generateWithFallback(fullPrompt);

    res.json({ reply });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({
      error: error.message || "Failed to get AI response.",
    });
  }
});

// ============================
// ITINERARY ENDPOINT
// ============================
app.post("/api/generate-itinerary", async (req, res) => {
  try {
    const { destination, days, budget, interests, travelStyle } = req.body;

    // --- Input validation ---
    if (!destination || typeof destination !== "string" || destination.trim().length < 2) {
      return res.status(400).json({ error: "Please provide a valid destination name." });
    }
    if (destination.trim().length > 100) {
      return res.status(400).json({ error: "Destination name is too long (max 100 characters)." });
    }
    if (!/[a-zA-Z]{2,}/.test(destination.trim())) {
      return res.status(400).json({ error: "Destination must contain a valid place name (e.g. Paris, Tokyo)." });
    }

    const daysNum = parseInt(days, 10);
    if (!days || isNaN(daysNum) || daysNum < 1 || daysNum > 30) {
      return res.status(400).json({ error: "Number of days must be between 1 and 30." });
    }

    if (!budget || typeof budget !== "string" || budget.trim().length === 0) {
      return res.status(400).json({ error: "Please provide a budget (e.g. $1000 or ₹50,000)." });
    }
    if (budget.trim().length > 100) {
      return res.status(400).json({ error: "Budget description is too long." });
    }
    const budgetDigits = budget.trim().replace(/[^0-9.]/g, "");
    if (budgetDigits && parseFloat(budgetDigits) === 0) {
      return res.status(400).json({ error: "Budget cannot be zero. Please enter a realistic budget." });
    }

    if (!interests || typeof interests !== "string" || interests.trim().length < 3) {
      return res.status(400).json({ error: "Please describe your interests (e.g. Food, History, Nature)." });
    }
    if (interests.trim().length > 500) {
      return res.status(400).json({ error: "Interests description is too long (max 500 characters)." });
    }

    // Verify destination is a real place using Open-Meteo Geocoding
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(destination.trim())}&count=1&language=en&format=json`
      );
      const geoData = await geoRes.json();
      if (!geoData.results || geoData.results.length === 0) {
        return res.status(400).json({
          error: `We couldn't find a real place called "${destination.trim()}". Please enter a valid city or destination.`,
        });
      }
    } catch (geoError) {
      console.warn("Geocoding check failed, proceeding anyway:", geoError.message);
    }

    const safeDest = destination.trim().slice(0, 100);
    const safeBudget = budget.trim().slice(0, 100);
    const safeInterests = interests.trim().slice(0, 500);
    const safeStyle = (travelStyle || "cultural").slice(0, 30);

    const prompt = `Create a detailed ${daysNum}-day travel itinerary for ${safeDest}.

Budget: ${safeBudget}
Interests: ${safeInterests}
Travel style: ${safeStyle}

For each day, provide:
- A catchy title for the day
- Morning activities (1-2 sentences)
- Afternoon activities (1-2 sentences) 
- Evening activities (1-2 sentences)
- One practical tip
- Estimated cost for the day

Return ONLY valid JSON with no markdown formatting. Use this exact structure:

{
  "itinerary": [
    {
      "day": 1,
      "title": "Day title",
      "morning": "Morning activities",
      "afternoon": "Afternoon activities",
      "evening": "Evening activities",
      "tips": "Practical tip",
      "estimatedCost": "Estimated cost"
    }
  ]
}`;

    const text = await generateWithFallback(prompt);

    // Clean potential markdown code blocks
    const cleaned = text
      .replace(/```json\s*/g, "")
      .replace(/```\s*/g, "")
      .trim();

    let data;
    try {
      data = JSON.parse(cleaned);
    } catch (parseError) {
      console.error("AI returned invalid JSON:", cleaned.slice(0, 200));
      return res.status(502).json({
        error: "The AI returned an unexpected response. Please try again.",
      });
    }

    // Validate the parsed structure has an itinerary array
    if (!data.itinerary || !Array.isArray(data.itinerary) || data.itinerary.length === 0) {
      return res.status(502).json({
        error: "The AI returned an incomplete itinerary. Please try again.",
      });
    }

    res.json(data);
  } catch (error) {
    console.error("Itinerary error:", error);
    res.status(500).json({
      error: error.message || "Failed to generate itinerary.",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
