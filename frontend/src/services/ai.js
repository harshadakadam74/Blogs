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

// Streaming helper: calls server endpoint that streams partial responses.
// onMessage receives raw text chunks (already decoded and cleaned).
// Returns an AbortController that can be used to cancel the stream.
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

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          // Some servers send SSE-style "data: ...\n\n" frames. Normalize by stripping leading "data: " prefixes.
          const cleaned = chunk
            .split(/\r?\n/)
            .map((line) => line.replace(/^data:\s*/i, ""))
            .join("\n");
          if (onMessage) onMessage(cleaned);
        }
      }

      if (onDone) onDone();
    })
    .catch((err) => {
      if (err.name === "AbortError") return;
      if (onError) onError(err);
    });

  return controller;
}
