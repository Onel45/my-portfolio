import Reveal from './Reveal.jsx';
import { contacts } from '../data.js';
import { iconPaths } from '../icons.js';

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="wrap contact-grid">
        <Reveal>
          <h2>Have a good<br />idea? <span style={{ color: 'var(--accent)' }}>Let's talk.</span></h2>
          <p>Open to connecting with developers, creatives, basketball people, mentors, and anyone building
            something meaningful.</p>
          <div className="contact-meta"><span>OLEYO NELSON</span><span>AVAILABLE FOR CONNECTIONS</span></div>
        </Reveal>
        <Reveal>
          {contacts.map((c) => (
            <a key={c.label} className="contact-link" href={c.href} aria-label={c.aria} data-cursor="GO"
              {...(c.ext ? { target: '_blank', rel: 'noopener' } : {})}>
              <svg className={'ico' + (c.wa ? ' ico-wa' : '')} viewBox="0 0 24 24" aria-hidden="true">
                <path d={iconPaths[c.icon]} />
              </svg>
              <span>{c.label}{c.sub && <small>{c.sub}</small>}</span>
              <span className="arrow">↗</span>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
