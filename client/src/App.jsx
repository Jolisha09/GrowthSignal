
import { useState } from "react";
import "./App.css";
import { checkHealth } from "./api";
import api from "./api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
const prompts = [
  {
    number: "01",
    category: "PRODUCT STRATEGY",
    title: "Finding product-market fit",
    description: "How do great teams know when they've found it?",
  },
  {
    number: "02",
    category: "USER RETENTION",
    title: "Build habits that last",
    description: "Turn first-time users into loyal customers.",
  },
  {
    number: "03",
    category: "GROWTH",
    title: "Find your growth loop",
    description: "Discover sustainable ways to grow a product.",
  },
];

function App() {
  const [question, setQuestion] = useState("");
  const [apiStatus, setApiStatus] = useState("Not checked");
  const [answer, setAnswer] = useState("");
const [loading, setLoading] = useState(false);
const [chatError, setChatError] = useState("");
async function testBackend() {
  try {
    const data = await checkHealth();
    setApiStatus(data.status);
  } catch {
    setApiStatus("Connection failed");
  }
}

async function handleSubmit(event) {
  event.preventDefault();

  if (!question.trim() || loading) return;

  setLoading(true);
  setChatError("");
  setAnswer("");

  try {
    const response = await api.post("/api/chat", {
      question: question.trim(),
    });

    console.log("AI response:", response.data);
setAnswer(response.data.answer || "The AI returned an empty answer.");
  } catch (error) {
    setChatError(
      error.response?.data?.detail ||
      "Unable to reach the AI. Check that Ollama and FastAPI are running."
    );
  } finally {
    setLoading(false);
  }
}


  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#">
          <span className="brand-mark">g.</span>
          <span>growth<span className="brand-light">signal</span></span>
        </a>

        <div className="workspace-label">YOUR WORKSPACE</div>

        <button className="new-chat" onClick={() => setQuestion("")}>
          <span>＋</span> New conversation
        </button>

        <div className="sidebar-section">
          <span className="section-label">EXPLORE</span>
          <div className="nav-item active"><span>◈</span> Research desk</div>
          <div className="nav-item"><span>▤</span> Growth essays</div>
          <div className="nav-item"><span>⌘</span> Saved insights</div>
        </div>

        <div className="sidebar-bottom">
          <div className="status-dot" />
          <div>
            <div className="status-title">Your research companion</div>
            <div className="status-subtitle">Grounded in Lenny's content</div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">WORKSPACE <span>/</span> RESEARCH DESK</div>
          <div className="edition">THE GROWTH EDITION <span>✳</span></div>
        </header>

        <section className="hero">
          <div className="eyebrow">
            <span className="eyebrow-line" />
            A BETTER WAY TO THINK ABOUT GROWTH
          </div>

          <h1>
            Good questions<br />
            change <em>everything.</em>
          </h1>

          <p className="hero-description">
            Explore hard-won product wisdom, uncover useful ideas,
            and turn what you learn into your next big move.
          </p>

          <div className="question-box">
            <form onSubmit={handleSubmit}>
              <textarea
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="What are you trying to figure out?"
                rows={2}
                aria-label="Ask a growth question"
              />
              <div className="composer-footer">
                <span className="composer-hint">Ask. Explore. Put ideas to work.</span>
                <button className="ask-button" type="submit">
                  Ask GrowthSignal <span>↗</span>
                </button>
              </div>
            </form>
          </div>
                <div style={{ marginTop: 12, fontSize: 12 }}>
  <button type="button" onClick={testBackend}>
    Test backend connection
  </button>
  <span style={{ marginLeft: 10 }}>
    API status: {apiStatus}
  </span>
</div>
          <div className="source-note">
            <span>✳</span> Answers grounded in Lenny's Podcast and newsletter knowledge
          </div>
        </section>
        
{loading && (
  <div className="ai-result">
    <p>GROWTH SIGNAL / THINKING</p>
    <h2>Working through your question...</h2>
  </div>
)}

{chatError && (
  <div className="ai-result error">
    <p>CONNECTION ISSUE</p>
    <p>{chatError}</p>
  </div>
)}

{answer && (
  <section className="ai-result">
    <p>GROWTH SIGNAL / LOCAL AI · QWEN 2.5</p>
    <h2>Your growth insight</h2>
    <div className="markdown-answer">
  <ReactMarkdown remarkPlugins={[remarkGfm]}>
    {answer}
  </ReactMarkdown>
</div>
    <p className="grounding-note">
      AI-generated response · Transcript retrieval is not yet connected.
    </p>
  </section>
)}

        <section className="discovery">
          <div className="discovery-heading">
            <div>
              <div className="eyebrow small">YOUR NEXT BREAKTHROUGH</div>
              <h2>Where shall we begin?</h2>
            </div>
            <span className="collection-count">03 STARTING POINTS</span>
          </div>

          <div className="prompt-grid">
            {prompts.map((prompt) => (
              <button
                className="prompt-card"
                key={prompt.number}
                onClick={() => setQuestion(prompt.title + ": ")}
              >
                <div className="card-top">
                  <span>{prompt.category}</span>
                  <span className="card-number">{prompt.number}</span>
                </div>
                <h3>{prompt.title}</h3>
                <p>{prompt.description}</p>
                <div className="card-link">Explore this question <span>↗</span></div>
              </button>
            ))}
          </div>
        </section>

        <footer className="page-footer">
          <span>THOUGHTFUL QUESTIONS. BETTER PRODUCTS.</span>
          <span>MADE FOR THE CURIOUS <span className="footer-star">✳</span></span>
        </footer>
      </main>
    </div>
  );
}

export default App;
