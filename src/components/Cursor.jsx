import { useEffect, useRef } from 'react';
import { reduceMotion } from '../hooks.js';

// Dot plus a trailing ring (mouse only). The ring grows over links and shows a label
// on anything with a data-cursor attribute. The normal cursor stays visible.
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const text = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    const d = dot.current, r = ring.current, t = text.current;
    let x = -100, y = -100, rx = -100, ry = -100, raf;

    const move = (e) => {
      x = e.clientX; y = e.clientY;
      document.documentElement.classList.add('cursor-on');
      d.style.transform = `translate3d(${x}px,${y}px,0)`;
      const target = e.target.closest ? e.target.closest('a,button,[data-cursor]') : null;
      const label = target && target.getAttribute('data-cursor');
      r.classList.toggle('hover', !!target && !label);
      r.classList.toggle('label', !!label);
      t.textContent = label || '';
    };
    const leave = () => document.documentElement.classList.remove('cursor-on');
    const down = () => r.classList.add('down');
    const up = () => r.classList.remove('down');
    const loop = () => {
      const k = reduceMotion ? 1 : 0.18;
      rx += (x - rx) * k; ry += (y - ry) * k;
      r.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dot} aria-hidden="true" />
      <div className="cursor-ring" ref={ring} aria-hidden="true"><span ref={text} /></div>
    </>
  );
}
