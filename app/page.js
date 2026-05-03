export default function Home() {
  return (
    <main>
      <div className="noise" />
      <div className="grid-bg" />

      <nav>
        <span className="logo">DEA</span>
        <a href="https://github.com/DanielP41/Dev-error-analyzer" target="_blank" rel="noopener noreferrer">
          GitHub →
        </a>
      </nav>

      <section className="hero">
        <div className="badge">ChatSDK Agent · Vercel Hackathon 2026</div>
        <h1>
          <span className="line1">Dev Error</span>
          <span className="line2">Analyzer</span>
        </h1>
        <p className="subtitle">
          Your Slack channel just became a debugging powerhouse.<br />
          Drop an error. Get a fix. Zero effort.
        </p>
        <div className="cta-group">
          <a href="https://github.com/DanielP41/Dev-error-analyzer" className="btn-primary" target="_blank" rel="noopener noreferrer">
            View Source
          </a>
          <a href="#how" className="btn-ghost">How it works ↓</a>
        </div>
      </section>

      <section className="demo-window">
        <div className="window-bar">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
          <span className="window-title"># todo-dev-error-analyzer</span>
        </div>
        <div className="messages">
          <div className="msg user">
            <div className="avatar">DG</div>
            <div className="bubble">
              <span className="name">Daniel German</span>
              <pre>{`TypeError: Cannot read properties of undefined (reading 'map')
    at App.js:23:15
    at processTicksAndRejections`}</pre>
            </div>
          </div>
          <div className="msg bot">
            <div className="avatar bot-avatar">DEA</div>
            <div className="bubble bot-bubble">
              <span className="name">Dev Error Analyzer <span className="app-tag">App</span></span>
              <p><strong>🔍 Causa probable:</strong><br />
              Estás intentando usar <code>.map()</code> sobre una variable que es <code>undefined</code>.</p>
              <p><strong>✅ Solución:</strong><br />
              Verificá que el array esté inicializado antes de usarlo.</p>
              <pre>{`const items = data?.items ?? [];
items.map(item => { ... })`}</pre>
              <p className="hint">_Si resolviste el error, respondé en este hilo. Si nadie responde, abriré un issue en GitHub automáticamente._</p>
            </div>
          </div>
        </div>
      </section>

      <section className="features" id="how">
        <h2>How it works</h2>
        <div className="features-grid">
          <div className="feature">
            <span className="feat-num">01</span>
            <h3>Detects errors automatically</h3>
            <p>Watches every message in your dev channels for stack traces and error patterns.</p>
          </div>
          <div className="feature">
            <span className="feat-num">02</span>
            <h3>Analyzes with LLaMA 3</h3>
            <p>Calls Groq's lightning-fast inference to diagnose the error and generate a fix with code examples.</p>
          </div>
          <div className="feature">
            <span className="feat-num">03</span>
            <h3>Remembers past errors</h3>
            <p>Uses Upstash Redis to store error history. If this error appeared before, it responds instantly with the historical solution.</p>
          </div>
          <div className="feature">
            <span className="feat-num">04</span>
            <h3>Searches your repo</h3>
            <p>Queries the GitHub API to find files in your codebase related to the error.</p>
          </div>
          <div className="feature">
            <span className="feat-num">05</span>
            <h3>Auto-opens GitHub issues</h3>
            <p>If nobody resolves the error in the thread within the configured time, it automatically creates a GitHub issue.</p>
          </div>
          <div className="feature">
            <span className="feat-num">06</span>
            <h3>Zero infrastructure cost</h3>
            <p>Runs entirely on Vercel Hobby + Upstash Free + Groq Free tier. Ship a production agent for $0/month.</p>
          </div>
        </div>
      </section>

      <section className="stack-section">
        <h2>Stack</h2>
        <div className="stack-pills">
          <span>Next.js 14</span>
          <span>Groq · LLaMA 3.3</span>
          <span>Upstash Redis</span>
          <span>Slack Events API</span>
          <span>GitHub API</span>
          <span>Vercel</span>
        </div>
      </section>

      <footer>
        <p>Built for the <strong>Zero to Agent</strong> hackathon · Vercel 2026</p>
        <a href="https://github.com/DanielP41/Dev-error-analyzer" target="_blank" rel="noopener noreferrer">github.com/DanielP41/Dev-error-analyzer</a>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=JetBrains+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #080a0f;
          --surface: #0e1117;
          --border: #1e2430;
          --accent: #00e5ff;
          --accent2: #ff3d6b;
          --text: #e8ecf4;
          --muted: #6b7a99;
          --mono: 'JetBrains Mono', monospace;
          --sans: 'DM Sans', sans-serif;
          --display: 'Syne', sans-serif;
        }

        html { scroll-behavior: smooth; }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: var(--sans);
          min-height: 100vh;
          overflow-x: hidden;
        }

        .noise {
          position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px;
        }

        .grid-bg {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size: 60px 60px;
          opacity: 0.4;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%);
        }

        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.25rem 2.5rem;
          border-bottom: 1px solid var(--border);
          background: rgba(8, 10, 15, 0.8);
          backdrop-filter: blur(12px);
        }

        .logo {
          font-family: var(--display);
          font-size: 1.1rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: var(--accent);
        }

        nav a {
          font-family: var(--mono);
          font-size: 0.8rem;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s;
        }
        nav a:hover { color: var(--text); }

        .hero {
          position: relative; z-index: 1;
          min-height: 100vh;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center;
          padding: 8rem 2rem 4rem;
        }

        .badge {
          font-family: var(--mono);
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          color: var(--accent);
          border: 1px solid rgba(0, 229, 255, 0.3);
          padding: 0.35rem 0.9rem;
          border-radius: 2rem;
          margin-bottom: 2rem;
          background: rgba(0, 229, 255, 0.05);
          animation: fadeUp 0.6s ease both;
        }

        h1 {
          font-family: var(--display);
          font-size: clamp(4rem, 12vw, 9rem);
          font-weight: 800;
          line-height: 0.9;
          letter-spacing: -0.03em;
          margin-bottom: 2rem;
          animation: fadeUp 0.6s ease 0.1s both;
        }

        .line1 { display: block; color: var(--text); }
        .line2 {
          display: block;
          background: linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle {
          font-size: clamp(1rem, 2.5vw, 1.25rem);
          color: var(--muted);
          max-width: 520px;
          line-height: 1.7;
          margin-bottom: 2.5rem;
          animation: fadeUp 0.6s ease 0.2s both;
        }

        .cta-group {
          display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;
          animation: fadeUp 0.6s ease 0.3s both;
        }

        .btn-primary {
          font-family: var(--mono);
          font-size: 0.85rem;
          background: var(--accent);
          color: var(--bg);
          padding: 0.75rem 1.75rem;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 500;
          transition: opacity 0.2s, transform 0.2s;
        }
        .btn-primary:hover { opacity: 0.85; transform: translateY(-1px); }

        .btn-ghost {
          font-family: var(--mono);
          font-size: 0.85rem;
          color: var(--muted);
          padding: 0.75rem 1.75rem;
          border: 1px solid var(--border);
          border-radius: 4px;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
        }
        .btn-ghost:hover { border-color: var(--muted); color: var(--text); }

        .demo-window {
          position: relative; z-index: 1;
          max-width: 720px;
          margin: 0 auto 6rem;
          padding: 0 1.5rem;
          animation: fadeUp 0.8s ease 0.4s both;
        }

        .window-bar {
          display: flex; align-items: center; gap: 0.5rem;
          background: #13171f;
          border: 1px solid var(--border);
          border-bottom: none;
          padding: 0.75rem 1rem;
          border-radius: 8px 8px 0 0;
        }

        .dot { width: 12px; height: 12px; border-radius: 50%; }
        .dot.red { background: #ff5f56; }
        .dot.yellow { background: #ffbd2e; }
        .dot.green { background: #27c93f; }

        .window-title {
          font-family: var(--mono);
          font-size: 0.78rem;
          color: var(--muted);
          margin-left: 0.5rem;
        }

        .messages {
          background: #0d1018;
          border: 1px solid var(--border);
          border-radius: 0 0 8px 8px;
          padding: 1.5rem;
          display: flex; flex-direction: column; gap: 1.25rem;
        }

        .msg { display: flex; gap: 0.75rem; align-items: flex-start; }

        .avatar {
          width: 36px; height: 36px; border-radius: 6px;
          background: var(--border);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--mono);
          font-size: 0.65rem;
          color: var(--muted);
          flex-shrink: 0;
          font-weight: 500;
        }

        .bot-avatar {
          background: rgba(0, 229, 255, 0.1);
          color: var(--accent);
          border: 1px solid rgba(0, 229, 255, 0.2);
        }

        .bubble { flex: 1; }
        .name {
          font-family: var(--mono);
          font-size: 0.72rem;
          font-weight: 500;
          color: var(--muted);
          display: block;
          margin-bottom: 0.4rem;
        }

        .app-tag {
          background: rgba(0, 229, 255, 0.15);
          color: var(--accent);
          font-size: 0.6rem;
          padding: 0.1rem 0.4rem;
          border-radius: 3px;
          margin-left: 0.3rem;
        }

        .bubble pre {
          font-family: var(--mono);
          font-size: 0.75rem;
          color: var(--accent2);
          background: rgba(255, 61, 107, 0.05);
          border-left: 2px solid var(--accent2);
          padding: 0.75rem 1rem;
          border-radius: 0 4px 4px 0;
          overflow-x: auto;
          white-space: pre-wrap;
          word-break: break-all;
        }

        .bot-bubble pre {
          color: var(--accent);
          background: rgba(0, 229, 255, 0.04);
          border-left: 2px solid var(--accent);
        }

        .bot-bubble p {
          font-size: 0.85rem;
          line-height: 1.6;
          color: var(--text);
          margin-bottom: 0.75rem;
        }

        .bot-bubble code {
          font-family: var(--mono);
          font-size: 0.8rem;
          background: rgba(0,0,0,0.3);
          padding: 0.1rem 0.35rem;
          border-radius: 3px;
          color: var(--accent);
        }

        .hint {
          font-size: 0.75rem !important;
          color: var(--muted) !important;
          font-style: italic;
        }

        .features {
          position: relative; z-index: 1;
          max-width: 1000px;
          margin: 0 auto 6rem;
          padding: 0 2rem;
        }

        .features h2, .stack-section h2 {
          font-family: var(--display);
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 3rem;
          letter-spacing: -0.02em;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5px;
          background: var(--border);
          border: 1px solid var(--border);
          border-radius: 8px;
          overflow: hidden;
        }

        .feature {
          background: var(--surface);
          padding: 2rem;
          transition: background 0.2s;
        }
        .feature:hover { background: #111520; }

        .feat-num {
          font-family: var(--mono);
          font-size: 0.7rem;
          color: var(--accent);
          letter-spacing: 0.1em;
          display: block;
          margin-bottom: 1rem;
        }

        .feature h3 {
          font-family: var(--display);
          font-size: 1.05rem;
          font-weight: 700;
          margin-bottom: 0.6rem;
          color: var(--text);
        }

        .feature p {
          font-size: 0.875rem;
          color: var(--muted);
          line-height: 1.65;
        }

        .stack-section {
          position: relative; z-index: 1;
          max-width: 1000px;
          margin: 0 auto 6rem;
          padding: 0 2rem;
        }

        .stack-pills {
          display: flex; flex-wrap: wrap; gap: 0.75rem;
        }

        .stack-pills span {
          font-family: var(--mono);
          font-size: 0.8rem;
          color: var(--text);
          border: 1px solid var(--border);
          padding: 0.5rem 1.1rem;
          border-radius: 3px;
          background: var(--surface);
          transition: border-color 0.2s;
        }
        .stack-pills span:hover { border-color: var(--accent); }

        footer {
          position: relative; z-index: 1;
          text-align: center;
          padding: 3rem 2rem;
          border-top: 1px solid var(--border);
          color: var(--muted);
          font-size: 0.85rem;
        }

        footer strong { color: var(--text); }
        footer a {
          display: block;
          margin-top: 0.5rem;
          font-family: var(--mono);
          font-size: 0.75rem;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s;
        }
        footer a:hover { color: var(--accent); }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 640px) {
          nav { padding: 1rem 1.25rem; }
          .hero { padding: 7rem 1.25rem 3rem; }
          .features, .stack-section { padding: 0 1.25rem; }
        }
      `}</style>
    </main>
  );
}