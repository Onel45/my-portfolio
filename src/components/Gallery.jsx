import { useCallback, useEffect, useRef, useState } from 'react';
import Reveal from './Reveal.jsx';
import { gallery } from '../data.js';

// Vite turns every photo in src/assets/gallery into a URL (or inlines it in the single file build)
const files = import.meta.glob('../assets/gallery/*.jpg', { eager: true, import: 'default' });
const photos = gallery.map((g) => ({ ...g, src: files[`../assets/gallery/basketball-${g.file}.jpg`] }));

// Full screen basketball page. Opens with a circle that grows from the click, big type slides
// as you scroll, photos reveal one by one, and tapping a photo opens it full size.
export default function Gallery({ open, origin, onClose }) {
  const root = useRef(null);
  const closeBtn = useRef(null);
  const [everOpened, setEverOpened] = useState(false);
  const [lb, setLb] = useState(null); // index of the photo shown full size

  useEffect(() => { if (open) setEverOpened(true); }, [open]);

  // scroll lock, focus handling and keyboard
  useEffect(() => {
    if (!open) { setLb(null); return undefined; }
    document.documentElement.style.overflow = 'hidden';
    const t = setTimeout(() => closeBtn.current && closeBtn.current.focus(), 400);
    const onKey = (e) => {
      if (e.key === 'Escape') { if (lbRef.current !== null) setLb(null); else onClose(); }
      else if (lbRef.current !== null && e.key === 'ArrowRight') setLb((i) => (i + 1) % photos.length);
      else if (lbRef.current !== null && e.key === 'ArrowLeft') setLb((i) => (i - 1 + photos.length) % photos.length);
    };
    window.addEventListener('keydown', onKey);
    return () => { clearTimeout(t); window.removeEventListener('keydown', onKey); document.documentElement.style.overflow = ''; };
  }, [open, onClose]);

  const lbRef = useRef(null);
  lbRef.current = lb;

  // the two big title lines slide in opposite directions while scrolling
  const onScroll = useCallback((e) => {
    const el = root.current, top = e.currentTarget.scrollTop;
    if (el) requestAnimationFrame(() => el.style.setProperty('--p', top));
  }, []);

  const current = lb !== null ? photos[lb] : null;

  return (
    <>
      <div ref={root} className={'gallery' + (open ? ' open' : '')} role="dialog" aria-modal="true" aria-label="Basketball photos"
        aria-hidden={!open} style={{ '--ox': origin.x + 'px', '--oy': origin.y + 'px' }} onScroll={onScroll}>
        <div className="gallery-inner">
          <div className="gallery-top">
            <span className="brand">OLEYO NELSON</span>
            <button ref={closeBtn} className="menu-btn" type="button" onClick={onClose}>CLOSE ✕</button>
          </div>

          <div className="gallery-title" aria-label="On the court">
            <span className="gt-1" aria-hidden="true">ON THE</span>
            <span className="gt-2" aria-hidden="true">COURT.</span>
          </div>
          <p className="gallery-intro">Discipline, teamwork, resilience, and a constant drive to get better.
            A few moments from the game.</p>

          {everOpened && (
            <div className="gallery-grid">
              {photos.map((ph, i) => (
                <Reveal className="g-item" key={ph.file}>
                  <button className="g-btn" type="button" data-cursor="VIEW" aria-label={`${ph.caption}: view full size`} onClick={() => setLb(i)}>
                    <span className="g-frame"><img src={ph.src} alt={ph.alt} loading="lazy" /></span>
                    <span className="g-cap">{ph.caption} <i aria-hidden="true">↗</i></span>
                  </button>
                </Reveal>
              ))}
            </div>
          )}

          <Reveal className="gallery-end">
            <h2>Think like a builder.<br />Play like a teammate.</h2>
            <button className="cta" type="button" onClick={onClose}>BACK TO PORTFOLIO ↗</button>
          </Reveal>
        </div>
      </div>

      {current && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={current.caption} onClick={() => setLb(null)}>
          <button className="menu-btn lb-close" type="button" onClick={() => setLb(null)} autoFocus>CLOSE ✕</button>
          <figure className="lb-figure" onClick={(e) => e.stopPropagation()}>
            <img src={current.src} alt={current.alt} />
            <figcaption>{current.caption}</figcaption>
          </figure>
          <button className="lb-nav lb-prev" type="button" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); setLb((lb - 1 + photos.length) % photos.length); }}>←</button>
          <button className="lb-nav lb-next" type="button" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); setLb((lb + 1) % photos.length); }}>→</button>
        </div>
      )}
    </>
  );
}
