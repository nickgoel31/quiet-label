"use server";

export async function detectIntent(userText: string) {
  if (!userText) return null;

  try {
    // We use the specific date versioning as recommended by Wit.ai
    const response = await fetch(
      `https://api.wit.ai/message?v=20251227&q=${encodeURIComponent(userText)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.WIT_AI_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    // Extract the most likely intent
    // Wit.ai returns intents sorted by confidence
    const primaryIntent = data.intents?.[0];

    console.log("Wit.ai Response:", data);

    return {
      name: primaryIntent?.name || "general_query", // Fallback if no intent found
      confidence: primaryIntent?.confidence || 0,
      entities: data.entities, // Useful if you want to extract specific food names later
    };
  } catch (error) {
    console.error("Wit.ai Error:", error);
    return { name: "error", confidence: 0 };
  }
}