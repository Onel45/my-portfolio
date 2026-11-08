import { useCallback, useRef, useState } from 'react';

// Crossfading slideshow, changed by hand: arrows, dots, swipe and arrow keys.
export default function Slideshow({ slides }) {
  const [i, setI] = useState(0);
  const touch = useRef(null);
  const n = slides.length;

  const go = useCallback((d) => setI((v) => (v + d + n) % n), [n]);

  const onKey = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
  };

  return (
    <div
      className="slideshow"
      role="region"
      aria-roledescription="carousel"
      aria-label="Community photos"
      tabIndex={0}
      onKeyDown={onKey}
      onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touch.current == null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        touch.current = null;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
      }}
    >
      {slides.map((s, k) => (
        <figure className={'ss-slide' + (k === i ? ' on' : '')} key={s.src} aria-hidden={k !== i}>
          <img src={s.src} alt={s.alt} loading={k === 0 ? 'eager' : 'lazy'} draggable="false" />
          <figcaption className="mono">{s.caption}</figcaption>
        </figure>
      ))}
      <div className="ss-shade" aria-hidden="true" />
      <button type="button" className="ss-nav prev" aria-label="Previous photo" onClick={() => go(-1)}>←</button>
      <button type="button" className="ss-nav next" aria-label="Next photo" onClick={() => go(1)}>→</button>
      <div className="ss-dots" role="tablist" aria-label="Choose photo">
        {slides.map((s, k) => (
          <button type="button" key={s.src} role="tab" aria-selected={k === i} aria-label={'Photo ' + (k + 1)}
            className={k === i ? 'on' : ''} onClick={() => setI(k)} />
        ))}
      </div>
      <div className="ss-count mono" aria-hidden="true">{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</div>
    </div>
  );
}
