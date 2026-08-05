require("dotenv").config();

const http = require("http");
const OpenAI = require("openai");

const PORT = 8787;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function askGPT(prompt) {
  const response = await client.responses.create({
    model: "gpt-5",
    input: prompt,
  });

  return response.output_text;
}

const server = http.createServer((req, res) => {

  // CORS
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (
    req.method === "POST" &&
    req.url.startsWith("/api/ai/chat")
  ) {

    let body = "";

    req.on("data", chunk => body += chunk);

    req.on("end", async () => {

      try {

        const { prompt } = JSON.parse(body);

        const answer = await askGPT(prompt);

        res.writeHead(200, {
          "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
          answer
        }));

      } catch (err) {

        console.error(err);

        res.writeHead(500, {
          "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
          error: err.message
        }));

      }

    });

    return;
  }

  res.writeHead(404);
  res.end();

});

server.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});