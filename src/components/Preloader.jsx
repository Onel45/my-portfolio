import { useEffect, useState } from 'react';
import { reduceMotion } from '../hooks.js';

const C = 2 * Math.PI * 44;

// Full screen intro: percentage counter inside a progress ring, then the curtain lifts
export default function Preloader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    const total = reduceMotion ? 250 : 1800;
    const start = performance.now();
    let raf, timer;
    const step = (now) => {
      const p = Math.min((now - start) / total, 1);
      setPct(Math.round(100 * (1 - Math.pow(1 - p, 2.2))));
      if (p < 1) raf = requestAnimationFrame(step);
      else {
        setLeaving(true);
        timer = setTimeout(() => { setGone(true); document.documentElement.style.overflow = ''; onDone(); }, reduceMotion ? 50 : 750);
      }
    };
    raf = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(raf); clearTimeout(timer); document.documentElement.style.overflow = ''; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (gone) return null;
  return (
    <div className={'preloader' + (leaving ? ' leaving' : '')} role="status" aria-label="Loading">
      <svg className="pre-ring" viewBox="0 0 100 100" aria-hidden="true">
        <circle className="bg" cx="50" cy="50" r="44" />
        <circle className="fg" cx="50" cy="50" r="44" style={{ strokeDasharray: C, strokeDashoffset: C * (1 - pct / 100) }} />
      </svg>
      <div className="pre-count">{pct}<span>%</span></div>
      <div className="pre-name mono">OLEYO NELSON</div>
    </div>
  );
}
