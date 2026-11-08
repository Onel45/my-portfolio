import Reveal from './Reveal.jsx';
import Slideshow from './Slideshow.jsx';
import { communityTags, playgroundTags, work } from '../data.js';

const shots = import.meta.glob('../assets/community/*.jpg', { eager: true, import: 'default' });
const BASE = import.meta.env.BASE_URL;
const slides = [
  { src: BASE + 'me.jpg', caption: 'Oleyo Nelson', alt: 'Oleyo Nelson' },
  { n: 1, caption: 'Community meetup', alt: 'A large group of developers posing together at an Open Source Kigali meetup' },
  { n: 2, caption: 'Talk on WikiSuite', alt: 'A speaker presenting WikiSuite at an Open Source Kigali session' },
  { n: 3, caption: 'Group photo', alt: 'Open Source Kigali community members gathered outside a building next to the community banner' },
].map((s) => (s.n ? { ...s, src: shots['../assets/community/community-' + s.n + '.jpg'] } : s));

function TagLink({ text, href, ext }) {
  return <a href={href} {...(ext ? { target: '_blank', rel: 'noopener' } : {})}>{text}</a>;
}

export default function Projects() {
  return (
    <section className="section projects" id="projects">
      <div className="wrap">
        <Reveal className="section-head">
          <div><h2>Ideas in<br />progress.</h2></div>
          <p className="section-intro">A portfolio is a work in progress. just like me. Here are the kinds of
            projects and experiences I’m building toward.</p>
        </Reveal>

        <div className="project-list">
          <Reveal as="article" className="project">
            <div className="project-image">
              <Slideshow slides={slides} />
              <span className="image-tag">COMMUNITY</span>
            </div>
            <div className="project-body">
              <div className="project-top"><h3>Communities</h3><span className="project-arrow">↗</span></div>
              <p>The communities I learn, build and grow with, surrounded by people who love technology
                and sharing what they know.</p>
              <div className="tags">{communityTags.map((t) => <TagLink key={t.text} {...t} />)}</div>
            </div>
          </Reveal>

          <Reveal as="article" className="project">
            <div className="project-image" style={{ background: '#0f1f1a', display: 'grid', placeItems: 'center', color: 'white' }}>
              <div style={{ textAlign: 'center', padding: 24 }}>
                <div style={{ fontSize: 'clamp(2.5rem,5vw,4.7rem)', fontWeight: 800, letterSpacing: '-.09em', lineHeight: 0.9 }}>
                  CODE<span style={{ color: 'var(--accent)' }}>.</span><br />CREATE<span style={{ color: 'var(--accent)' }}>.</span><br />REPEAT<span style={{ color: 'var(--accent)' }}>.</span>
                </div>
              </div>
              <span className="image-tag">IN DEVELOPMENT</span>
            </div>
            <div className="project-body">
              <div className="project-top"><h3>Developer Playground</h3><span className="project-arrow">↗</span></div>
              <p>A space for experiments, small coding projects, and the lessons learned while becoming a
                better developer.</p>
              <div className="tags">{playgroundTags.map((t) => <TagLink key={t.text} {...t} />)}</div>
            </div>
          </Reveal>
        </div>

        <Reveal className="work-block" id="my-work">
          <h3>Things I've built.</h3>
          <div className="swipe-hint mono" style={{ marginTop: 0 }}>SWIPE SIDEWAYS</div>
          <div className="work-grid">
            {work.map((w) => (
              <article className="work-card" key={w.title} data-cursor={w.link && w.link.ext ? 'OPEN' : undefined}>
                <h4>{w.title}</h4>
                <p>{w.text}</p>
                <ul>{w.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                <div className="tags">
                  {w.tags.map((t) => <span key={t}>{t}</span>)}
                  {w.link && <TagLink {...w.link} />}
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
