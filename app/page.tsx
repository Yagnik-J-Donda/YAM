'use client';

import { useMemo, useState } from 'react';

type Manager = { code:string; name:string; role:string; description:string; status:'Live'|'Soon'; accent:string; symbol:string; tasks?:number };

const managers: Manager[] = [
  { code:'YEM', name:'Your Email Manager', role:'Communication', description:'Sorts, drafts, prioritizes, and keeps every important conversation moving.', status:'Live', accent:'#ff6542', symbol:'↗', tasks:18 },
  { code:'YTP', name:'Your Trip Manager', role:'Travel', description:'Plans complete trips—from the first idea to the flight home—in one thoughtful itinerary.', status:'Soon', accent:'#c8ef66', symbol:'⌁' },
  { code:'YFM', name:'Your Finance Manager', role:'Money', description:'Turns transactions and budgets into clear, timely financial decisions.', status:'Soon', accent:'#b9a7ff', symbol:'$' },
  { code:'YHM', name:'Your Health Manager', role:'Wellbeing', description:'Connects routines, appointments, and progress into a healthier everyday rhythm.', status:'Soon', accent:'#7dd8ff', symbol:'+' },
];

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function Home() {
  const [query, setQuery] = useState('');
  const [notice, setNotice] = useState('');
  const filtered = useMemo(() => {
    const term = query.toLowerCase().trim();
    return term ? managers.filter((m) => `${m.code} ${m.name} ${m.role}`.toLowerCase().includes(term)) : managers;
  }, [query]);
  function announce(message:string) { setNotice(message); window.setTimeout(() => setNotice(''), 2800); }

  return <main>
    <nav className="nav shell" aria-label="Primary navigation">
      <a className="brand" href="#top" aria-label="YAM home"><span>YAM</span><i>●</i></a>
      <div className="navlinks"><a href="#managers">Managers</a><a href="#activity">Activity</a><a href="#about">About</a></div>
      <button className="profile" onClick={() => announce('Profile settings are coming next.')}><span>YD</span><b>Yagnik</b></button>
    </nav>

    <section className="hero shell" id="top">
      <div className="eyebrow"><span /> ONE HOME. A WORLD OF MANAGERS.</div>
      <h1>One letter at a time.<br /><em>Everything, managed.</em></h1>
      <div className="hero-bottom"><p>YAM—Your All Managers—is the parent portfolio for a growing family of focused products. From email to travel, every manager is its own project with one shared standard.</p><a className="round-link" href="#managers" aria-label="Explore the YAM family">↓</a></div>
    </section>

    <section className="manager-section" id="managers"><div className="shell">
      <div className="section-head"><div><p className="kicker">01 — THE PORTFOLIO</p><h2>Different projects.<br />One YAM family.</h2></div><label className="search"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find a project" aria-label="Find a project" /></label></div>
      <div className="manager-grid">{filtered.map((manager,index) => <article className={`manager-card ${manager.status === 'Live' ? 'active' : ''}`} key={manager.code} style={{'--accent':manager.accent} as React.CSSProperties}>
        <div className="card-top"><span className="index">0{index+1}</span><span className={`status ${manager.status.toLowerCase()}`}>{manager.status === 'Live' && <i />} {manager.status}</span></div>
        <div className="manager-mark"><span>{manager.symbol}</span></div><p className="role">{manager.role}</p><h3>{manager.code}</h3><h4>{manager.name}</h4><p className="description">{manager.description}</p>
        <div className="card-foot">{manager.tasks ? <span><b>01</b> live project</span> : <span>Independent project coming soon</span>}<button onClick={() => announce(manager.status === 'Live' ? 'Opening the YEM project soon.' : `${manager.code} added to your early access list.`)}>{manager.status === 'Live' ? 'Visit project ↗' : 'Notify me'}</button></div>
      </article>)}</div>{filtered.length === 0 && <div className="empty">No manager found. Try another specialty.</div>}
    </div></section>

    <section className="activity shell" id="activity"><div><p className="kicker">02 — A TO Z</p><h2>A manager for<br />every chapter.</h2><p className="series-copy">Each letter can become a distinct, purposeful product. YAM keeps the family recognizable, connected, and ready to expand.</p></div><div className="alphabet" aria-label="A to Z manager roadmap">{alphabet.map((letter) => { const code = letter === 'T' ? 'YTP' : `Y${letter}M`; const planned = ['E','F','H','T'].includes(letter); return <button key={letter} className={planned ? 'planned' : ''} onClick={() => announce(planned ? `${code} is a planned family project.` : `${code} idea space is open.`)}><span>{code}</span><small>{planned ? 'Planned' : 'Open'}</small></button> })}</div></section>

    <footer id="about"><div className="shell footer-inner"><div><span className="footer-logo">YAM.</span><p>Your All Managers<br />An A–Z family of focused products.</p></div><div className="footer-cta"><p>One parent brand.<br />Endless possibilities.</p><button onClick={() => announce('The next YAM project starts here.')}>Explore the family <span>↗</span></button></div><div className="legal"><span>© 2026 YAM</span><span>Every manager has one job.</span></div></div></footer>
    <div className={`toast ${notice ? 'show' : ''}`} role="status" aria-live="polite">{notice}</div>
  </main>;
}
