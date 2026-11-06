const BASE = import.meta.env.BASE_URL;

export default function Hero() {
  return (
    <header className="hero" id="home">
      <div className="hero-bg" style={{ '--hero-img': `url(${BASE}/nice1.jpg)` }} />

      <div className="hero-content">
        <div className="eyebrow mono">Computer Science · UI/UX Design · Basketball · Big Ideas</div>
        <h1>I BUILD<br /><span className="accent">DIGITAL</span><br /><span className="outline">FUTURES.</span></h1>
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
