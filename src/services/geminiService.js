const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:5000" : "");

/**
 * Send a chat message to the AI assistant
 */
export async function chatWithAI(messages, destinationContext = null) {
  const response = await fetch(`${API_BASE}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, destinationContext }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || "Failed to get AI response");
  }

  const data = await response.json();
  return data.reply;
}

/**
 * Generate a structured trip itinerary
 */
export async function generateItinerary({
  destination,
  days,
  budget,
  interests,
  travelStyle,
}) {
  const response = await fetch(`${API_BASE}/api/generate-itinerary`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ destination, days, budget, interests, travelStyle }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || "Failed to generate itinerary");
  }

  const data = await response.json();
  return data.itinerary;
}
