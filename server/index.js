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

    if (!destination || !days || !budget || !interests) {
      return res.status(400).json({
        error: "Please provide destination, days, budget, and interests.",
      });
    }

    const prompt = `Create a detailed ${days}-day travel itinerary for ${destination}.

Budget: ${budget}
Interests: ${interests}
Travel style: ${travelStyle || "cultural"}

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

    const data = JSON.parse(cleaned);

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
