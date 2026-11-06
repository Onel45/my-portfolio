import { useEffect, useRef } from 'react';

const BASE = import.meta.env.BASE_URL;
// a url() inside a CSS variable resolves against the stylesheet (/assets/), so build an absolute address
const HERO_IMG = new URL(BASE + 'nice1.jpg', document.baseURI).href;

export default function Hero() {
  const ref = useRef(null);

  // slide the three title lines sideways as the page scrolls
  useEffect(() => {
    const el = ref.current;
    let raf = 0;
    const update = () => {
      raf = 0;
      el.style.setProperty('--hp', Math.min(window.scrollY, 1200));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <header className="hero" id="home" ref={ref}>
      <div className="hero-bg" style={{ '--hero-img': `url(${HERO_IMG})` }} />
      <div className="hero-content">
        <div className="eyebrow mono">Computer Science · UI/UX Design · Basketball · Big Ideas</div>
        <h1>
          <span className="hl hl-1">I BUILD</span>
          <span className="hl hl-2 accent">DIGITAL</span>
          <span className="hl hl-3 outline">FUTURES.</span>
        </h1>
        <div className="hero-bottom">
          <p className="hero-desc">I'm Oleyo Nelson. a curious mind, aspiring software developer, and basketball
            player. I turn ideas into experiences and keep pushing toward the next level.</p>
          <a className="scroll-cue mono" href="#about"><span><b>↓</b></span> SCROLL TO EXPLORE</a>
        </div>
      </div>
      <div className="hero-index mono">PORTFOLIO 2026</div>
    </header>
  );
}
