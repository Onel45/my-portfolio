import { useEffect, useRef, useState } from 'react';

export const reduceMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Typing effect: cycles through words, typing and erasing each one
export function useTyping(words) {
  const [text, setText] = useState('');
  useEffect(() => {
    if (reduceMotion) { setText(words[0]); return undefined; }
    let w = 0, c = 0, deleting = false, timer;
    const tick = () => {
      const word = words[w];
      setText(word.slice(0, c));
      if (!deleting && c < word.length) { c++; timer = setTimeout(tick, 110); }
      else if (!deleting) { deleting = true; timer = setTimeout(tick, 1400); }
      else if (c > 0) { c--; timer = setTimeout(tick, 60); }
      else { deleting = false; w = (w + 1) % words.length; timer = setTimeout(tick, 300); }
    };
    tick();
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return text;
}

// Count up from 0 to `to` once the element scrolls into view
export function useCountUp(to) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let raf;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      if (reduceMotion) { setValue(to); return; }
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / 1400, 1);
        setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return [ref, value];
}
