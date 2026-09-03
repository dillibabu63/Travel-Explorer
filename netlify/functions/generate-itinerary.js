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

    if (!destination || !days || !budget || !interests) {
      return new Response(
        JSON.stringify({ error: "Please provide destination, days, budget, and interests." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "GEMINI_API_KEY is not configured on Netlify." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

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

    const text = await generateWithFallback(genAI, prompt);

    const cleaned = text
      .replace(/```json\s*/g, "")
      .replace(/```\s*/g, "")
      .trim();

    const data = JSON.parse(cleaned);

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
