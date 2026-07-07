const http = require('http');

const PORT = 8787;

function streamResponse(res, text) {
  // send as simple chunked data with small delays to simulate streaming
  let i = 0;
  const parts = text.match(/.{1,40}/g) || [text];
  res.writeHead(200, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  const interval = setInterval(() => {
    if (i >= parts.length) {
      clearInterval(interval);
      try { res.end(); } catch (e) {}
      return;
    }
    try { res.write(parts[i]); } catch (e) {}
    i += 1;
  }, 150);
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
        // Simulate streaming chunks of text
        const reply = `Simulated streaming answer for: ${prompt}\n\nThis is a streamed response from the local mock server. It arrives in parts to simulate real-time output.`;
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
