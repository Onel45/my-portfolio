import { useRef, useState } from 'react';
import Reveal from './Reveal.jsx';
import { languages, skills } from '../data.js';

// Colourful text stickers that follow the mouse over the language pills
const stickers = {
  JavaScript: { t: 'JS', bg: '#f7df1e', fg: '#111111' },
  CSS: { t: 'CSS', bg: '#2965f1', fg: '#ffffff' },
  Python: { t: 'PY', bg: '#3776ab', fg: '#ffd43b' },
  Java: { t: 'JAVA', bg: '#e76f00', fg: '#ffffff' },
  HTML: { t: 'HTML', bg: '#e34f26', fg: '#ffffff' },
};

export default function Skills() {
  const [current, setCurrent] = useState(null);
  const sticker = useRef(null);

  const follow = (e, name) => {
    if (e.pointerType === 'touch') return;
    setCurrent(name);
    const tilt = Math.max(-12, Math.min(12, e.movementX * 1.5)) - 6;
    sticker.current.style.transform = `translate3d(${e.clientX + 18}px,${e.clientY - 78}px,0) rotate(${tilt}deg)`;
  };
  const s = current && stickers[current];

  return (
    <section className="section skills" id="skills">
      <div className="wrap">
        <Reveal className="section-head">
          <div><h2>Skills &amp;<br />interests.</h2></div>
          <p className="section-intro">A mix of technical learning and the mindset I build on the court:
            consistency, teamwork, and the courage to keep improving.</p>
        </Reveal>
        <div className="swipe-hint mono">SWIPE SIDEWAYS</div>
        <div className="skill-grid">
          {skills.map((s2) => (
            <Reveal as="article" className="skill" key={s2.title}>
              <h3>{s2.title}</h3>
              <p>{s2.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="lang-block">
          <h3>The languages I code in.</h3>
          <p>The core languages behind my projects, including the TCC ordering app.</p>
          <div className="lang-grid" onPointerLeave={() => setCurrent(null)}>
            {languages.map(([name, note]) => (
              <div className="lang" key={name} onPointerMove={(e) => follow(e, name)} onPointerEnter={(e) => follow(e, name)}>
                <i />{name} <span>{note}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
      <div ref={sticker} className={'sticker' + (s ? ' on' : '')} aria-hidden="true"
        style={s ? { background: s.bg, color: s.fg } : undefined}>{s ? s.t : ''}</div>
    </section>
  );
}
