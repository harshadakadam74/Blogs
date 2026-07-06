export async function askAI({ prompt, content = "", title = "", selectedText = "" }) {
  const response = await fetch("/api/ai/chat", {
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
