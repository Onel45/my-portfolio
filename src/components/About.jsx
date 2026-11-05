import { useRef, useState } from 'react';
import Reveal from './Reveal.jsx';
import { reduceMotion, useCountUp, useTyping } from '../hooks.js';

const words = ['CODER', 'HOOPER', 'BUILDER', 'LEARNER', 'TEAMMATE'];

const tabs = [
  { id: 'dev', label: '</> Developer' },
  { id: 'ath', label: '🏀 Athlete' },
  { id: 'lrn', label: '✦ Learner' },
];

export default function About() {
  const [tab, setTab] = useState('dev');
  const [buckets, setBuckets] = useState(0);
  const typed = useTyping(words);
  const [countRef, count] = useCountUp(100);
  const card = useRef(null);

  const tilt = (e) => {
    if (reduceMotion || e.pointerType === 'touch') return;
    const el = card.current, r = el.getBoundingClientRect();
    el.classList.add('tilting');
    el.style.setProperty('--ry', ((e.clientX - r.left) / r.width - 0.5) * 14 + 'deg');
    el.style.setProperty('--rx', -((e.clientY - r.top) / r.height - 0.5) * 14 + 'deg');
  };
  const untilt = () => {
    const el = card.current;
    el.classList.remove('tilting');
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <section className="section about" id="about">
      <div className="wrap about-grid">
        <Reveal>
          <h2>Curiosity is<br />my <span style={{ color: 'var(--accent)' }}>superpower.</span></h2>
          <div className="about-tabs" role="tablist" aria-label="About Oleyo">
            {tabs.map((t) => (
              <button key={t.id} className={'tab' + (tab === t.id ? ' active' : '')} role="tab" id={'t-' + t.id}
                aria-selected={tab === t.id} aria-controls={'p-' + t.id} type="button" onClick={() => setTab(t.id)}>{t.label}</button>
            ))}
          </div>
          <div className="tab-panels">
            <p className={'about-copy tab-panel' + (tab === 'dev' ? ' active' : '')} role="tabpanel" id="p-dev" aria-labelledby="t-dev" hidden={tab !== 'dev'}>
              I’m <strong>Oleyo Nelson</strong>, a Computer Science student with a passion for technology and
              creativity. I enjoy building practical digital experiences and finding new ways to solve problems.</p>
            <p className={'about-copy tab-panel' + (tab === 'ath' ? ' active' : '')} role="tabpanel" id="p-ath" aria-labelledby="t-ath" hidden={tab !== 'ath'}>
              Away from the screen, <strong>basketball</strong> keeps me disciplined, competitive, and
              team focused. The court taught me to show up, trust the team, and keep improving.</p>
            <p className={'about-copy tab-panel' + (tab === 'lrn' ? ' active' : '')} role="tabpanel" id="p-lrn" aria-labelledby="t-lrn" hidden={tab !== 'lrn'}>
              I enjoy <strong>learning how things work</strong>. Every project, community and experiment is
              another step toward the next level.</p>
          </div>
          <div className="stats">
            <div className="stat"><strong>01</strong><span>Curious mindset</span></div>
            <div className="stat"><strong>24/7</strong><span>Always learning</span></div>
            <div className="stat"><strong><b ref={countRef}>{count}</b>%</strong><span>Driven by growth</span></div>
          </div>
        </Reveal>

        <Reveal className="about-visual">
          <div className="orbit" />
          <div className="chips" aria-hidden="true">
            <span className="chip c1"><em>JS</em></span>
            <span className="chip c2"><em>CSS</em></span>
            <span className="chip c3"><em>PY</em></span>
            <span className="chip c4"><em>JAVA</em></span>
          </div>
          <div className="visual-card" ref={card} onPointerMove={tilt} onPointerLeave={untilt}>
            <div className="mono" style={{ color: '#9fb2a9' }}>I'M A <span className="typed">{typed}</span><span className="caret" /></div>
            <div className="big-code">HELLO,<br />I'M <span>OLEYO</span><br /><span style={{ color: 'white' }}>NELSON.</span></div>
            <div className="card-foot"><span>CREATIVE THINKER</span><span>EST. ALWAYS</span></div>
          </div>
          <button className="ball" type="button" aria-label="Shoot a basket" data-cursor="SHOOT" onClick={() => setBuckets((b) => b + 1)}>
            <svg key={buckets} className={buckets ? 'go' : ''} viewBox="0 0 48 48" aria-hidden="true">
              <circle cx="24" cy="24" r="22" fill="#f08a24" />
              <g fill="none" stroke="#0b1512" strokeWidth="2">
                <path d="M2 24h44M24 2v44" />
                <path d="M8 8c9 6 9 26 0 32M40 8c-9 6-9 26 0 32" />
              </g>
            </svg>
            <span className="mono ball-count">TAP TO SHOOT · <b>{buckets}</b></span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}
