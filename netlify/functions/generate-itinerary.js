import { GoogleGenerativeAI } from "@google/generative-ai";

const CANDIDATE_MODELS = [
  "gemini-3.5-flash",
  "gemini-3.7-flash",
  "gemini-flash-latest",
  "gemini-3.6-flash",
];

async function generateWithFallback(genAI, prompt) {
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
      console.warn(`[Netlify Function Fallback] ${modelName} failed, trying next...`);
      lastError = err;
    }
  }
  throw lastError || new Error("All AI models currently unavailable.");
}

export default async function handler(req) {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { destination, days, budget, interests, travelStyle } = await req.json();

    // --- Input validation ---
    if (!destination || typeof destination !== "string" || destination.trim().length < 2) {
      return new Response(
        JSON.stringify({ error: "Please provide a valid destination name." }),
        { status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }
    if (destination.trim().length > 100) {
      return new Response(
        JSON.stringify({ error: "Destination name is too long (max 100 characters)." }),
        { status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }
    if (!/[a-zA-Z]{2,}/.test(destination.trim())) {
      return new Response(
        JSON.stringify({ error: "Destination must contain a valid place name (e.g. Paris, Tokyo)." }),
        { status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }

    const daysNum = parseInt(days, 10);
    if (!days || isNaN(daysNum) || daysNum < 1 || daysNum > 30) {
      return new Response(
        JSON.stringify({ error: "Number of days must be between 1 and 30." }),
        { status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }

    if (!budget || typeof budget !== "string" || budget.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Please provide a budget (e.g. $1000 or ₹50,000)." }),
        { status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }
    if (budget.trim().length > 100) {
      return new Response(
        JSON.stringify({ error: "Budget description is too long." }),
        { status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }
    const budgetDigits = budget.trim().replace(/[^0-9.]/g, "");
    if (budgetDigits && parseFloat(budgetDigits) === 0) {
      return new Response(
        JSON.stringify({ error: "Budget cannot be zero. Please enter a realistic budget." }),
        { status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }

    if (!interests || typeof interests !== "string" || interests.trim().length < 3) {
      return new Response(
        JSON.stringify({ error: "Please describe your interests (e.g. Food, History, Nature)." }),
        { status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }
    if (interests.trim().length > 500) {
      return new Response(
        JSON.stringify({ error: "Interests description is too long (max 500 characters)." }),
        { status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "GEMINI_API_KEY is not configured on Netlify." }),
        { status: 500, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Verify destination is a real place using Open-Meteo Geocoding
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(destination.trim())}&count=1&language=en&format=json`
      );
      const geoData = await geoRes.json();
      if (!geoData.results || geoData.results.length === 0) {
        return new Response(
          JSON.stringify({ error: `We couldn't find a real place called "${destination.trim()}". Please enter a valid city or destination.` }),
          { status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
        );
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

    const text = await generateWithFallback(genAI, prompt);

    const cleaned = text
      .replace(/```json\s*/g, "")
      .replace(/```\s*/g, "")
      .trim();

    let data;
    try {
      data = JSON.parse(cleaned);
    } catch (parseError) {
      console.error("AI returned invalid JSON:", cleaned.slice(0, 200));
      return new Response(
        JSON.stringify({ error: "The AI returned an unexpected response. Please try again." }),
        { status: 502, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }

    // Validate the parsed structure has an itinerary array
    if (!data.itinerary || !Array.isArray(data.itinerary) || data.itinerary.length === 0) {
      return new Response(
        JSON.stringify({ error: "The AI returned an incomplete itinerary. Please try again." }),
        { status: 502, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Netlify itinerary error:", error);
    return new Response(JSON.stringify({ error: error.message || "Failed to generate itinerary." }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
