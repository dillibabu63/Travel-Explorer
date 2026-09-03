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
    const { messages, destinationContext } = await req.json();

    if (!messages || messages.length === 0) {
      return new Response(JSON.stringify({ error: "No messages provided." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "GEMINI_API_KEY is not configured on Netlify." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

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

    const reply = await generateWithFallback(genAI, fullPrompt);

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Netlify chat error:", error);
    return new Response(JSON.stringify({ error: error.message || "Failed to generate response." }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
