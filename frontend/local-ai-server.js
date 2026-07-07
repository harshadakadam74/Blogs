const http = require('http');

const PORT = 8787;

function streamResponse(res, text) {
  const parts = text.match(/.{1,40}/g) || [text];
  res.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  let i = 0;
  const interval = setInterval(() => {
    if (i >= parts.length) {
      clearInterval(interval);
      try { res.end(); } catch (e) {}
      return;
    }

    try {
      const chunk = parts[i];
      res.write(`data: ${chunk}\n\n`);
    } catch (e) {}
    i += 1;
  }, 120);
}

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url.startsWith('/api/ai/chat')) {
    let body = '';
    req.on('data', (chunk) => { body += chunk.toString(); });
    req.on('end', () => {
      let payload = {};
      try { payload = JSON.parse(body || '{}'); } catch (e) { payload = {}; }
      const prompt = payload.prompt || 'Hello from mock AI';

      if (req.url.includes('stream=true')) {
        const reply = `This is a real-time reply for: ${prompt}\n\nI can help you improve your writing, summarize content, suggest titles, and keep the conversation flowing like a modern chat assistant.`;
        streamResponse(res, reply);
      } else {
        const reply = { answer: `Mock reply: ${prompt}` };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(reply));
      }
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Local AI mock server listening on http://localhost:${PORT}`);
});
