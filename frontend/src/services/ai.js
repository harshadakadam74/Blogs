const BASE_URL = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV ? 'http://localhost:8787' : '';

export async function askAI({ prompt, content = "", title = "", selectedText = "" }) {
  const response = await fetch(`${BASE_URL}/api/ai/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt, content, title, selectedText }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "AI service request failed");
  }

  return response.json();
}

export function askAIStream({ prompt, content = "", title = "", selectedText = "", onMessage, onError, onDone }) {
  const controller = new AbortController();

  fetch(`${BASE_URL}/api/ai/chat?stream=true`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, content, title, selectedText }),
    signal: controller.signal,
  })
    .then(async (res) => {
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "AI stream request failed");
      }

      if (!res.body) {
        throw new Error("Streaming response body is unavailable");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          buffer += chunk;

          const lines = buffer.split(/\r?\n/);
          buffer = lines.pop() || "";

          for (const line of lines) {
            const cleaned = line.replace(/^data:\s*/i, "").trim();
            if (cleaned) {
              if (onMessage) onMessage(cleaned);
            }
          }
        }
      }

      if (buffer.trim()) {
        const cleaned = buffer.replace(/^data:\s*/i, "").trim();
        if (cleaned && onMessage) onMessage(cleaned);
      }

      if (onDone) onDone();
    })
    .catch((err) => {
      if (err.name === "AbortError") return;
      if (onError) onError(err);
    });

  return controller;
}
