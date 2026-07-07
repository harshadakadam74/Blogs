async function run() {
  const res = await fetch('http://localhost:8787/api/ai/chat?stream=true', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: 'Explain React hooks briefly' }),
  });

  if (!res.ok) {
    console.error('Server returned', res.status);
    console.error(await res.text());
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let done = false;
  console.log('Streaming response:');
  while (!done) {
    const { value, done: d } = await reader.read();
    done = d;
    if (value) {
      process.stdout.write(decoder.decode(value));
    }
  }
  console.log('\n--- stream ended ---');
}

run().catch(console.error);
