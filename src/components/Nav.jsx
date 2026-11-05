import { useEffect, useRef, useState } from 'react';
import { navLinks } from '../data.js';

const BASE = import.meta.env.BASE_URL;

export default function Nav() {
  const [open, setOpen] = useState(false);
  const menuBtn = useRef(null);
  const firstLink = useRef(null);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (!open) return undefined;
    const t = setTimeout(() => firstLink.current && firstLink.current.focus(), 350);
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); menuBtn.current && menuBtn.current.focus(); } };
    window.addEventListener('keydown', onKey);
    return () => { clearTimeout(t); window.removeEventListener('keydown', onKey); document.documentElement.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <nav className="nav">
        <a className="brand" href="#home">
          <span className="brand-mark"><img src={BASE + 'martin.jpg'} alt="Oleyo Nelson" /></span> OLEYO NELSON
        </a>
        <div className="nav-links">
          {navLinks.map(([text, href]) => <a key={text} href={href}>{text}</a>)}
          <a className="nav-cta" href="#contact">LET'S CONNECT ↗</a>
          <button ref={menuBtn} className="menu-btn" type="button" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(true)}>
            <i aria-hidden="true" /> MENU
          </button>
        </div>
      </nav>

      <div className={'menu' + (open ? ' open' : '')} id="menu" role="dialog" aria-modal="true" aria-label="Menu">
        <div className="menu-inner">
          <div className="menu-top">
            <span className="brand">OLEYO NELSON</span>
            <button className="menu-btn" type="button" onClick={() => { setOpen(false); menuBtn.current && menuBtn.current.focus(); }}>CLOSE ✕</button>
          </div>
          <div className="menu-links">
            {navLinks.map(([text, href], i) => (
              <a key={text} href={href} ref={i === 0 ? firstLink : null} style={{ '--i': i }} onClick={() => setOpen(false)}>{text}</a>
            ))}
          </div>
          <div className="menu-foot">
            <a href="mailto:oleyonelson88@gmail.com">oleyonelson88@gmail.com</a>
            <a href="https://wa.me/250796696874" target="_blank" rel="noopener">WhatsApp</a>
            <a href="https://www.instagram.com/showtimeyeyo/?utm_source=ig_web_button_share_sheet" target="_blank" rel="noopener">Instagram</a>
            <a href="https://discord.com/users/1245124336944152686" target="_blank" rel="noopener">Discord</a>
          </div>
        </div>
      </div>
    </>
  );
}
