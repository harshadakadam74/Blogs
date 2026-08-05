require("dotenv").config();

const http = require("http");
const OpenAI = require("openai");

const PORT = 8787;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", async () => {

      try {

        const { prompt } = JSON.parse(body);

        // -------- STREAM --------
        if (req.url.includes("stream=true")) {

          res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
          });

          const stream = await client.responses.create({
            model: "gpt-5",
            input: prompt,
            stream: true,
          });

          for await (const event of stream) {

            if (
              event.type === "response.output_text.delta"
            ) {
              res.write(`data: ${event.delta}\n\n`);
            }

          }

          return res.end();

        }

        // -------- NORMAL --------

        const response = await client.responses.create({
          model: "gpt-5",
          input: prompt,
        });

        res.writeHead(200, {
          "Content-Type": "application/json",
        });

        res.end(JSON.stringify({
          answer: response.output_text,
        }));

      } catch (err) {

        console.error(err);

        res.writeHead(500, {
          "Content-Type": "application/json",
        });

        res.end(JSON.stringify({
          error: err.message,
        }));

      }

    });

    return;
  }

  res.writeHead(404);
  res.end();

});

server.listen(PORT, () => {
  console.log(`🚀 AI Server Running: http://localhost:${PORT}`);
});