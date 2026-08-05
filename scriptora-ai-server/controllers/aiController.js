import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

const client = apiKey ? new OpenAI({ apiKey }) : null;

export async function chat(req, res) {
  try {
    const { prompt = "", content = "", title = "", selectedText = "" } = req.body || {};
    const shouldStream = req.query.stream === "true";

    if (!client) {
      return res.status(500).json({
        error: "OpenAI API key is missing. Add OPENAI_API_KEY to scriptora-ai-server/.env",
      });
    }

    const userInput = prompt || content || selectedText || title || "Help me continue writing.";

    const response = await client.responses.create({
      model: "gpt-5",
      input: userInput,
    });

    const answer = response.output_text || "";

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