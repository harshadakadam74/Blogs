const apiKey = process.env.GEMINI_API_KEY;
const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

function getRequestBody(userInput) {
  return {
    contents: [{ parts: [{ text: userInput }] }],
  };
}

function getAnswer(data) {
  return data?.candidates?.[0]?.content?.parts
    ?.map((part) => part.text || "")
    .join("") || "";
}

async function generateAnswer(userInput) {
  const response = await fetch(`${endpoint}?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(getRequestBody(userInput)),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.message || "Gemini request failed");
  }

  return getAnswer(data);
}

export async function chat(req, res) {
  try {
    const { prompt = "", content = "", title = "", selectedText = "" } = req.body || {};
    const shouldStream = req.query.stream === "true";

    if (!apiKey) {
      return res.status(500).json({
        error: "Gemini API key is missing. Add GEMINI_API_KEY to scriptora-ai-server/.env",
      });
    }

    const userInput = prompt || content || selectedText || title || "Help me continue writing.";

    const answer = await generateAnswer(userInput);

    if (shouldStream) {
      res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
      res.setHeader("Cache-Control", "no-cache, no-transform");
      res.setHeader("Connection", "keep-alive");

      const chunks = answer.match(/.{1,120}/g) || [answer];

      chunks.forEach((chunk) => {
        res.write(`data: ${chunk}\n\n`);
      });

      res.write("data: [DONE]\n\n");
      return res.end();
    }

    return res.json({ answer });
  } catch (err) {
    console.error("AI chat error:", err);

    return res.status(500).json({
      error: err?.message || "AI request failed",
    });
  }
}