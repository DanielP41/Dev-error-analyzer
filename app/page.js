export default function Home() {
  return (
    <main>
      <div className="grid-bg" />
      <nav>
        <span className="logo">DEA</span>
        <a href="https://github.com/DanielP41/Dev-error-analyzer" target="_blank" rel="noopener noreferrer">GitHub →</a>
      </nav>
      <section className="hero">
        <div className="badge">ChatSDK Agent · Vercel Hackathon 2026</div>
        <h1>
          <span className="line1">Dev Error</span>
          <span className="line2">Analyzer</span>
        </h1>
        <p className="subtitle">Your Slack channel just became a debugging powerhouse.<br />Drop an error. Get a fix. Zero effort.</p>
        <div className="cta-group">
          <a href="https://github.com/DanielP41/Dev-error-analyzer" className="btn-primary" target="_blank" rel="noopener noreferrer">View Source</a>
          <a href="#how" className="btn-ghost">How it works ↓</a>
        </div>
      </section>
      <section className="demo-window">
        <div className="window-bar">
          <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
          <span className="window-title"># todo-dev-error-analyzer</span>
        </div>
        <div className="messages">
          <div className="msg user">
            <div className="avatar">DG</div>
            <div className="bubble">
              <span className="name">Daniel German</span>
              <pre>{`TypeError: Cannot read properties of undefined (reading 'map')\n    at App.js:23:15\n    at processTicksAndRejections`}</pre>
            </div>
          </div>
          <div className="msg bot">
            <div className="avatar bot-avatar">DEA</div>
            <div className="bubble bot-bubble">
              <span className="name">Dev Error Analyzer <span className="app-tag">App</span></span>
              <p><strong>🔍 Causa probable:</strong> Intentás usar <code>.map()</code> sobre una variable <code>undefined</code>.</p>
              <p><strong>✅ Solución:</strong> Inicializá el array antes de mapearlo.</p>
              <pre>{`const items = data?.items ?? [];\nitems.map(item => { ... })`}</pre>
              <p className="hint">Si nadie resuelve el error, abriré un issue en GitHub automáticamente.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="features" id="how">
        <h2>How it works</h2>
        <div className="features-grid">
          <div className="feature"><span className="feat-num">01</span><h3>Detects errors automatically</h3><p>Watches every message in your dev channels for stack traces and error patterns.</p></div>
          <div className="feature"><span className="feat-num">02</span><h3>Analyzes with LLaMA 3.3</h3><p>Calls Groq's lightning-fast inference to diagnose the error and generate a fix with code examples.</p></div>
          <div className="feature"><span className="feat-num">03</span><h3>Remembers past errors</h3><p>Uses Upstash Redis to store error history. If this error appeared before, it responds instantly.</p></div>
          <div className="feature"><span className="feat-num">04</span><h3>Searches your repo</h3><p>Queries the GitHub API to find files in your codebase related to the error.</p></div>
          <div className="feature"><span className="feat-num">05</span><h3>Auto-opens GitHub issues</h3><p>If nobody resolves the error within the configured time, it automatically creates a GitHub issue.</p></div>
          <div className="feature"><span className="feat-num">06</span><h3>Zero infrastructure cost</h3><p>Runs entirely on Vercel Hobby + Upstash Free + Groq Free tier. $0/month.</p></div>
        </div>
      </section>
      <section className="stack-section">
        <h2>Stack</h2>
        <div className="stack-pills">
          <span>Next.js 14</span><span>Groq · LLaMA 3.3</span><span>Upstash Redis</span><span>Slack Events API</span><span>GitHub API</span><span>Vercel</span>
        </div>
      </section>
      <footer>
        <p>Built for the <strong>Zero to Agent</strong> hackathon · Vercel 2026</p>
        <a href="https://github.com/DanielP41/Dev-error-analyzer" target="_blank" rel="noopener noreferrer">github.com/DanielP41/Dev-error-analyzer</a>
      </footer>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=JetBrains+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{
          --bg:#040d1f;--surface:#071428;--surface2:#0a1a35;--border:#0f2444;
          --gold:#c9a84c;--gold-light:#e8c96d;--gold-dim:rgba(201,168,76,0.15);
          --blue:#1a3a6e;--text:#dce8ff;--muted:#5a7aaa;
          --mono:'JetBrains Mono',monospace;--sans:'DM Sans',sans-serif;--display:'Playfair Display',serif;
        }
        html{scroll-behavior:smooth}
        body{background:var(--bg);color:var(--text);font-family:var(--sans);min-height:100vh;overflow-x:hidden}
        .grid-bg{position:fixed;inset:0;z-index:0;pointer-events:none;background-image:linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px);background-size:60px 60px;opacity:0.5;mask-image:radial-gradient(ellipse 80% 60% at 50% 0%,black 30%,transparent 100%)}
        nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:1.25rem 2.5rem;border-bottom:1px solid var(--border);background:rgba(4,13,31,0.85);backdrop-filter:blur(12px)}
        .logo{font-family:var(--display);font-size:1.1rem;font-weight:800;letter-spacing:0.15em;color:var(--gold)}
        nav a{font-family:var(--mono);font-size:0.8rem;color:var(--muted);text-decoration:none;transition:color 0.2s}
        nav a:hover{color:var(--gold)}
        .hero{position:relative;z-index:1;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:8rem 2rem 4rem}
        .badge{font-family:var(--mono);font-size:0.72rem;letter-spacing:0.1em;color:var(--gold);border:1px solid rgba(201,168,76,0.3);padding:0.35rem 0.9rem;border-radius:2rem;margin-bottom:2rem;background:var(--gold-dim);animation:fadeUp 0.6s ease both}
        h1{font-family:var(--display);font-size:clamp(4rem,12vw,9rem);font-weight:800;line-height:0.9;letter-spacing:-0.03em;margin-bottom:2rem;animation:fadeUp 0.6s ease 0.1s both}
        .line1{display:block;color:var(--text)}
        .line2{display:block;color:var(--gold);text-shadow:0 0 60px rgba(201,168,76,0.25)}
        .subtitle{font-size:clamp(1rem,2.5vw,1.25rem);color:var(--muted);max-width:520px;line-height:1.7;margin-bottom:2.5rem;animation:fadeUp 0.6s ease 0.2s both}
        .cta-group{display:flex;gap:1rem;flex-wrap:wrap;justify-content:center;animation:fadeUp 0.6s ease 0.3s both}
        .btn-primary{font-family:var(--mono);font-size:0.85rem;background:var(--gold);color:var(--bg);padding:0.75rem 1.75rem;border-radius:4px;text-decoration:none;font-weight:500;transition:background 0.2s,transform 0.2s}
        .btn-primary:hover{background:var(--gold-light);transform:translateY(-1px)}
        .btn-ghost{font-family:var(--mono);font-size:0.85rem;color:var(--muted);padding:0.75rem 1.75rem;border:1px solid var(--border);border-radius:4px;text-decoration:none;transition:border-color 0.2s,color 0.2s}
        .btn-ghost:hover{border-color:var(--gold);color:var(--gold)}
        .demo-window{position:relative;z-index:1;max-width:720px;margin:0 auto 6rem;padding:0 1.5rem;animation:fadeUp 0.8s ease 0.4s both}
        .window-bar{display:flex;align-items:center;gap:0.5rem;background:var(--surface2);border:1px solid var(--border);border-bottom:none;padding:0.75rem 1rem;border-radius:8px 8px 0 0}
        .dot{width:12px;height:12px;border-radius:50%}
        .dot.red{background:#ff5f56}.dot.yellow{background:#ffbd2e}.dot.green{background:#27c93f}
        .window-title{font-family:var(--mono);font-size:0.78rem;color:var(--muted);margin-left:0.5rem}
        .messages{background:var(--surface);border:1px solid var(--border);border-radius:0 0 8px 8px;padding:1.5rem;display:flex;flex-direction:column;gap:1.25rem}
        .msg{display:flex;gap:0.75rem;align-items:flex-start}
        .avatar{width:36px;height:36px;border-radius:6px;background:var(--blue);display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-size:0.65rem;color:var(--muted);flex-shrink:0;font-weight:500}
        .bot-avatar{background:var(--gold-dim);color:var(--gold);border:1px solid rgba(201,168,76,0.3)}
        .bubble{flex:1}
        .name{font-family:var(--mono);font-size:0.72rem;font-weight:500;color:var(--muted);display:block;margin-bottom:0.4rem}
        .app-tag{background:var(--gold-dim);color:var(--gold);font-size:0.6rem;padding:0.1rem 0.4rem;border-radius:3px;margin-left:0.3rem}
        .bubble pre{font-family:var(--mono);font-size:0.75rem;color:#e07b5a;background:rgba(224,123,90,0.07);border-left:2px solid #e07b5a;padding:0.75rem 1rem;border-radius:0 4px 4px 0;overflow-x:auto;white-space:pre-wrap;word-break:break-all}
        .bot-bubble pre{color:var(--gold);background:var(--gold-dim);border-left:2px solid var(--gold)}
        .bot-bubble p{font-size:0.85rem;line-height:1.6;color:var(--text);margin-bottom:0.75rem}
        .bot-bubble code{font-family:var(--mono);font-size:0.8rem;background:rgba(0,0,0,0.3);padding:0.1rem 0.35rem;border-radius:3px;color:var(--gold)}
        .hint{font-size:0.75rem!important;color:var(--muted)!important;font-style:italic}
        .features{position:relative;z-index:1;max-width:1000px;margin:0 auto 6rem;padding:0 2rem}
        .features h2,.stack-section h2{font-family:var(--display);font-size:2.5rem;font-weight:800;margin-bottom:3rem;letter-spacing:-0.02em;color:var(--text)}
        .features-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5px;background:var(--border);border:1px solid var(--border);border-radius:8px;overflow:hidden}
        .feature{background:var(--surface);padding:2rem;transition:background 0.2s}
        .feature:hover{background:var(--surface2)}
        .feat-num{font-family:var(--mono);font-size:0.7rem;color:var(--gold);letter-spacing:0.1em;display:block;margin-bottom:1rem}
        .feature h3{font-family:var(--display);font-size:1.05rem;font-weight:700;margin-bottom:0.6rem;color:var(--text)}
        .feature p{font-size:0.875rem;color:var(--muted);line-height:1.65}
        .stack-section{position:relative;z-index:1;max-width:1000px;margin:0 auto 6rem;padding:0 2rem}
        .stack-pills{display:flex;flex-wrap:wrap;gap:0.75rem}
        .stack-pills span{font-family:var(--mono);font-size:0.8rem;color:var(--text);border:1px solid var(--border);padding:0.5rem 1.1rem;border-radius:3px;background:var(--surface);transition:border-color 0.2s,color 0.2s}
        .stack-pills span:hover{border-color:var(--gold);color:var(--gold)}
        footer{position:relative;z-index:1;text-align:center;padding:3rem 2rem;border-top:1px solid var(--border);color:var(--muted);font-size:0.85rem}
        footer strong{color:var(--gold)}
        footer a{display:block;margin-top:0.5rem;font-family:var(--mono);font-size:0.75rem;color:var(--muted);text-decoration:none;transition:color 0.2s}
        footer a:hover{color:var(--gold)}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:640px){nav{padding:1rem 1.25rem}.hero{padding:7rem 1.25rem 3rem}.features,.stack-section{padding:0 1.25rem}}
      `}</style>
    </main>
  );
}