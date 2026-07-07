import { useEffect, useRef, useState } from "react";
import { Button } from "../Components";
import { ArrowRight, Bot, SendHorizonal, Sparkles, UserRound } from "lucide-react";
import { askAIStream } from "../services/ai";

const toolCards = [
  {
    title: "Generate Title",
    description: "Generate 10 SEO-friendly headline suggestions and apply the best one instantly.",
    badge: "AI Writer",
  },
  {
    title: "Continue Writing",
    description: "Continue from the current cursor position with context-aware copy.",
    badge: "Co-write",
  },
  {
    title: "Rewrite Content",
    description: "Rewrite selected text in professional, casual, storytelling, or technical tone.",
    badge: "Rewrite",
  },
  {
    title: "Improve Grammar",
    description: "Fix grammar, spelling, punctuation, flow, and readability in one pass.",
    badge: "Clean-up",
  },
  {
    title: "Expand / Shorten",
    description: "Expand content from 500 → 1500 words or condense long drafts into concise posts.",
    badge: "Refine",
  },
  {
    title: "AI Summary",
    description: "Generate TL;DR, 3-point summary, one-line summary, and key takeaways.",
    badge: "Summary",
  },
  {
    title: "Smart Tags",
    description: "Create tag strings from article topic input for better SEO and organization.",
    badge: "Tags",
  },
  {
    title: "SEO Assistant",
    description: "Auto-generate SEO title, meta description, slug, OG title, keywords, and score.",
    badge: "SEO",
  },
  {
    title: "AI Image Assistant",
    description: "Generate cover prompt, thumbnail prompt, alt text and caption from your article.",
    badge: "Images",
  },
  {
    title: "Translation",
    description: "Translate articles into English, Hindi, Marathi, Spanish, French, German, and Japanese.",
    badge: "Translate",
  },
  {
    title: "Blog Idea Generator",
    description: "Generate blog ideas, trending topics, series suggestions and beginner guides.",
    badge: "Ideas",
  },
  {
    title: "FAQ Generator",
    description: "Automatically create FAQ questions and answers from your article.",
    badge: "FAQ",
  },
  {
    title: "Social & Marketing",
    description: "Generate ready-to-post LinkedIn, X, Instagram, Facebook, newsletter, and YouTube copy.",
    badge: "Social",
  },
  {
    title: "Readability Checker",
    description: "Analyze reading level, passive voice, sentence length, paragraph size, and complexity.",
    badge: "Readability",
  },
  {
    title: "Internal Link Suggestions",
    description: "Scan posts and recommend related internal links for better SEO and engagement.",
    badge: "Links",
  },
  {
    title: "Citation Generator",
    description: "Create citations in APA, MLA, Chicago, and IEEE formats.",
    badge: "Sources",
  },
  {
    title: "Text-to-Speech",
    description: "Convert articles into natural audio for listening and accessibility.",
    badge: "Audio",
  },
  {
    title: "AI Chat Assistant",
    description: "Ask AI to improve paragraphs, explain code, translate, summarize, or create examples.",
    badge: "Chat",
  },
  {
    title: "Publish Assistant",
    description: "Run a publishing readiness check with grammar, SEO, tags, images, links, and score.",
    badge: "Publish",
  },
];

const sidebarActions = [
  "Improve paragraph",
  "Rewrite professionally",
  "Generate title",
  "Continue writing",
  "Summarize",
  "Generate tags",
  "SEO check",
  "Translate",
];

const AIStudio = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTool, setActiveTool] = useState("Generate Title");
  const [seoScore] = useState(92);
  const [seoIssues] = useState([
    "⚠ Missing Alt Text",
    "⚠ No Internal Links",
    "⚠ Keyword appears only once",
  ]);
  const [readability] = useState({
    level: "Easy",
    passive: "6%",
    paragraph: "Good",
    complex: "3%",
  });
  const [history] = useState([
    { time: "10:15", action: "Grammar fixed" },
    { time: "10:20", action: "SEO improved" },
    { time: "10:32", action: "Summary added" },
  ]);
  const [draftContent] = useState("");
  const [selectedText] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I can help you rewrite, summarize, brainstorm, and polish your writing in real time. Ask me anything.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatError, setChatError] = useState("");
  const streamControllerRef = useRef(null);
  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => () => {
    streamControllerRef.current?.abort();
  }, []);

  const handleAsk = async (promptOverride) => {
    const prompt = (promptOverride ?? inputValue).trim();
    if (!prompt || isLoading) return;

    const userMessage = { role: "user", content: prompt };
    let assistantIndex = -1;

    setMessages((prev) => {
      const nextMessages = [...prev, userMessage, { role: "assistant", content: "" }];
      assistantIndex = nextMessages.length - 1;
      return nextMessages;
    });
    setInputValue("");
    setChatError("");
    setIsLoading(true);

    streamControllerRef.current?.abort();

    let streamedText = "";
    const controller = askAIStream({
      prompt,
      content: draftContent,
      title: "",
      selectedText,
      onMessage: (chunk) => {
        streamedText += chunk;
        setMessages((prev) => {
          const nextMessages = [...prev];
          if (nextMessages[assistantIndex]) {
            nextMessages[assistantIndex] = { ...nextMessages[assistantIndex], content: streamedText };
          }
          return nextMessages;
        });
      },
      onError: (err) => {
        setChatError(err.message || "AI stream failed");
        setIsLoading(false);
      },
      onDone: () => {
        setIsLoading(false);
        streamControllerRef.current = null;
      },
    });

    streamControllerRef.current = controller;
  };

  return (
    <div className="relative min-h-screen bg-linear-to-br from-[#FCF0F7] via-white to-[#F8F5FF] py-10 px-4 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_right,rgba(251,207,232,0.35),transparent_40%)] pointer-events-none" />
      <div className="mx-auto max-w-400">
        <div className="mb-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[40px] border border-pink-100 bg-white/95 px-8 py-10 shadow-2xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-pink-600">Welcome back, Harshada 👋</p>
                <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                  Scriptora AI Workspace
                </h1>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                  Today’s writing goal: publish a strong blog post with better flow, SEO, and AI-powered polish.
                </p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5 text-sm text-slate-700 shadow-sm">
                <p className="font-semibold text-slate-900">Live SEO</p>
                <p className="mt-2 text-2xl font-black text-slate-900">{seoScore}/100</p>
                <p className="mt-2 text-sm text-slate-500">Title ✓ Meta ✓ Headings ✓</p>
                <div className="mt-3 space-y-1 text-xs text-orange-500">
                  {seoIssues.map((issue) => (
                    <p key={issue}>{issue}</p>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-8 overflow-hidden rounded-4xl border border-slate-200 bg-slate-50 px-4 py-4 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">★★★★☆</span>
                  <span>Reading Level • {readability.level}</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                  <span>Passive voice {readability.passive}</span>
                  <span>Paragraph length {readability.paragraph}</span>
                  <span>Complex words {readability.complex}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[40px] border border-pink-100 bg-white/95 px-6 py-8 shadow-2xl">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-pink-500 font-semibold">AI Chat Panel</p>
                <h2 className="mt-2 text-2xl font-black text-slate-900">Realtime assistant</h2>
              </div>
              <button
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? "Minimize" : "Open"}
              </button>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {sidebarActions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleAsk(item)}
                  className="rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:border-pink-300 hover:bg-white"
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="mt-6 rounded-[28px] border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Live chat</span>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  {isLoading ? "Thinking..." : "Online"}
                </span>
              </div>
              <div className="mt-3 flex h-72 flex-col gap-3 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                {messages.map((message, index) => (
                  <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`flex max-w-[85%] items-start gap-2 rounded-2xl px-4 py-3 ${message.role === "user" ? "bg-linear-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white" : "border border-slate-200 bg-slate-50 text-slate-700"}`}>
                      <span className={`mt-0.5 ${message.role === "user" ? "text-white" : "text-pink-500"}`}>
                        {message.role === "user" ? <UserRound className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </span>
                      <p className="whitespace-pre-wrap text-sm leading-6">{message.content || (isLoading && index === messages.length - 1 ? "Thinking..." : "")}</p>
                    </div>
                  </div>
                ))}
                <div ref={messageEndRef} />
              </div>

              <div className="mt-3 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <textarea
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      handleAsk();
                    }
                  }}
                  rows={2}
                  placeholder="Ask for a rewrite, summary, title, or idea..."
                  className="min-h-16 w-full resize-none border-none bg-transparent text-sm text-slate-900 outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleAsk()}
                  disabled={isLoading || !inputValue.trim()}
                  className="rounded-full bg-linear-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] p-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <SendHorizonal className="h-4 w-4" />
                </button>
              </div>
              {chatError ? <p className="mt-3 text-sm text-red-600">{chatError}</p> : null}
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.74fr_0.26fr]">
          <div className="space-y-6">
            <div className="rounded-[40px] border border-pink-100 bg-white/95 p-8 shadow-2xl">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-pink-500 font-semibold">AI editor</p>
                  <h2 className="mt-2 text-3xl font-black text-slate-900">Realtime AI suggestions</h2>
                </div>
                <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                  Live suggestions while typing
                </div>
              </div>
              <div className="mt-8 rounded-4xl border border-slate-200 bg-slate-50 p-6 text-sm leading-7 text-slate-700">
                <div className="flex items-center gap-2 text-slate-900">
                  <Sparkles className="h-4 w-4 text-pink-500" />
                  <p className="font-semibold">Current prompt</p>
                </div>
                <div className="mt-3 rounded-3xl bg-white p-4 text-slate-800 shadow-sm min-h-20">
                  {inputValue || "Ask Scriptora AI a question to get started."}
                </div>
                <p className="mt-6 font-semibold text-slate-900">Latest response</p>
                <div className="mt-3 rounded-3xl border border-slate-200 bg-white p-4 text-slate-700 shadow-sm min-h-30">
                  {messages[messages.length - 1]?.content ? (
                    <p>{messages[messages.length - 1].content}</p>
                  ) : (
                    <p className="text-slate-400">AI response will appear here once you ask a question.</p>
                  )}
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => handleAsk(inputValue || "Improve this paragraph")}
                    disabled={isLoading}
                    className="rounded-2xl bg-linear-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                  >
                    {isLoading ? "Working..." : "Ask again"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setInputValue("");
                      setMessages([
                        {
                          role: "assistant",
                          content:
                            "Hi! I can help you rewrite, summarize, brainstorm, and polish your writing in real time. Ask me anything.",
                        },
                      ]);
                      setChatError("");
                    }}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-[40px] border border-pink-100 bg-white/95 p-8 shadow-2xl">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-pink-500 font-semibold">AI Actions</p>
                  <h2 className="mt-2 text-3xl font-black text-slate-900">One-click tools</h2>
                </div>
                <Button className="rounded-full px-6 py-3">Start with AI</Button>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {toolCards.slice(0, 6).map((tool) => (
                  <button
                    key={tool.title}
                    type="button"
                    onClick={() => setActiveTool(tool.title)}
                    className="group rounded-[28px] border border-slate-200 bg-slate-50 p-6 text-left transition hover:-translate-y-1 hover:border-pink-200 hover:bg-white/95"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{tool.badge}</p>
                        <h3 className="mt-3 text-lg font-semibold text-slate-900">{tool.title}</h3>
                      </div>
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-3xl bg-[#FDF2F8] text-[#BE185D] shadow-sm">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate-600">{tool.description}</p>
                  </button>
                ))}
              </div>
              <div className="mt-8 rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm font-semibold text-slate-900">Action preview</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {`Current action: ${activeTool}. Click any tool to see a preview of how it helps your draft.`}
                </p>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className={`rounded-[40px] border border-pink-100 bg-white/95 p-6 shadow-2xl ${sidebarOpen ? "block" : "hidden"}`}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-pink-500 font-semibold">🤖 Scriptora AI</p>
                  <h3 className="mt-2 text-xl font-black text-slate-900">AI sidebar</h3>
                </div>
                <button
                  className="rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700"
                  onClick={() => setSidebarOpen(false)}
                >
                  Close
                </button>
              </div>
              <div className="mt-6 space-y-3">
                {sidebarActions.map((action) => (
                  <button
                    key={action}
                    type="button"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-semibold text-slate-800 transition hover:border-pink-200 hover:bg-white"
                  >
                    {action}
                  </button>
                ))}
              </div>
              <div className="mt-6 rounded-[28px] bg-slate-50 p-4 text-sm text-slate-600">
                <div className="flex items-center justify-between text-slate-700">
                  <span>AI Chat</span>
                  <span className="text-emerald-600">Online</span>
                </div>
                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-3">
                  <p className="text-sm text-slate-700">Ask AI: Improve this paragraph or generate a better title.</p>
                </div>
              </div>
            </div>

            <div className="rounded-[40px] border border-pink-100 bg-linear-to-br from-[#FCE7F7] via-white to-[#F9F0FF] p-6 shadow-2xl">
              <p className="text-sm uppercase tracking-[0.24em] text-pink-500 font-semibold">AI Timeline</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {history.map((item) => (
                  <li key={item.time} className="flex items-center justify-between rounded-3xl bg-white p-4 shadow-sm">
                    <span>{item.action}</span>
                    <span className="text-slate-500">{item.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[40px] border border-pink-100 bg-white/95 p-6 shadow-2xl">
              <p className="text-sm uppercase tracking-[0.24em] text-pink-500 font-semibold">Research</p>
              <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <input
                  type="text"
                  placeholder="Paste URL to summarize"
                  className="w-full border-none bg-transparent text-sm text-slate-900 outline-none"
                />
              </div>
              <div className="mt-4 grid gap-3">
                {[
                  "Summarize",
                  "Key points",
                  "References",
                  "Citations",
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:border-pink-200 hover:bg-white"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default AIStudio;
