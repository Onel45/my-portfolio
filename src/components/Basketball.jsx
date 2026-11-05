import Reveal from './Reveal.jsx';

export default function Basketball({ onOpenGallery }) {
  return (
    <section className="basketball">
      <Reveal className="wrap">
        <div><h2>Think like a builder.<br />Play like a teammate.</h2></div>
        <div className="cta-row">
          <button className="cta" type="button" data-cursor="VIEW" onClick={onOpenGallery}>SEE THE PHOTOS ↗</button>
          <a className="cta" href="#contact">LET'S TALK BASKETBALL ↗</a>
        </div>
      </Reveal>
    </section>
  );
}
