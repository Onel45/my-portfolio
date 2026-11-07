import { useRef, useState } from 'react';
import portrait from '../assets/portrait.jpg';
import Reveal from './Reveal.jsx';
import { reduceMotion, useCountUp } from '../hooks.js';

const tabs = [
  { id: 'dev', label: '</> Developer' },
  { id: 'ath', label: '🏀 Athlete' },
  { id: 'lrn', label: '✦ Learner' },
];

export default function About() {
  const [tab, setTab] = useState('dev');
  const [countRef, count] = useCountUp(100);
  const card = useRef(null);

  const tilt = (e) => {
    if (reduceMotion || e.pointerType === 'touch') return;
    const el = card.current, r = el.getBoundingClientRect();
    el.classList.add('tilting');
    el.style.setProperty('--ry', ((e.clientX - r.left) / r.width - 0.5) * 7 + 'deg');
    el.style.setProperty('--rx', -((e.clientY - r.top) / r.height - 0.5) * 7 + 'deg');
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
            <div className="pc-photo">
              <img src={portrait} alt="Oleyo Nelson" draggable="false" />
              <span className="pc-status mono"><i />Available for connections</span>
            </div>
            <div className="pc-info">
              <div className="pc-role mono">Creative Developer</div>
              <div className="big-code">Oleyo Nelson</div>
              <div className="pc-sub">Computer Science student</div>
            </div>
            <div className="pc-langs" aria-hidden="true">
              <span>JavaScript</span><span>Python</span><span>Java</span><span>HTML</span><span>CSS</span>
            </div>
            <div className="pc-facts">
              <div><strong>5</strong><span className="mono">Languages</span></div>
              <div><strong>3</strong><span className="mono">Projects</span></div>
              <div><strong>3</strong><span className="mono">Communities</span></div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
