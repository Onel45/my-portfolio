import { useCallback, useEffect, useRef, useState } from 'react';
import Preloader from './components/Preloader.jsx';
import Cursor from './components/Cursor.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Basketball from './components/Basketball.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import CookieBanner from './components/CookieBanner.jsx';
import Gallery from './components/Gallery.jsx';

export default function App() {
  const [ready, setReady] = useState(false);
  const [gallery, setGallery] = useState({ open: false, x: 0, y: 0 });
  const trigger = useRef(null);

  // open the basketball page; the circle grows from the click (or the centre of the element for keyboard use)
  const openGallery = useCallback((e) => {
    const el = e.currentTarget, r = el.getBoundingClientRect();
    trigger.current = el;
    const fromPointer = e.clientX || e.clientY;
    setGallery({ open: true, x: fromPointer ? e.clientX : r.left + r.width / 2, y: fromPointer ? e.clientY : r.top + r.height / 2 });
  }, []);
  const closeGallery = useCallback(() => {
    setGallery((g) => ({ ...g, open: false }));
    setTimeout(() => trigger.current && trigger.current.focus && trigger.current.focus(), 50);
  }, []);

  // Light deterrents against casual copying (not real security).
  useEffect(() => {
    const menu = (e) => e.preventDefault();
    const keys = (e) => {
      const k = e.key.toLowerCase();
      if (e.key === 'F12' || (e.ctrlKey && ['u', 's'].includes(k)) || (e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(k))) e.preventDefault();
    };
    document.addEventListener('contextmenu', menu);
    document.addEventListener('keydown', keys);
    return () => { document.removeEventListener('contextmenu', menu); document.removeEventListener('keydown', keys); };
  }, []);

  return (
    <div className={'app' + (ready ? ' ready' : '')}>
      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <Nav />
      <Hero />
      <main>
        <About />
        <Skills onOpenGallery={openGallery} />
        <Projects />
        <Basketball onOpenGallery={openGallery} />
        <Contact />
      </main>
      <Footer />
      <Gallery open={gallery.open} origin={gallery} onClose={closeGallery} />
      <CookieBanner ready={ready} />
    </div>
  );
}
