import { useEffect, useState } from 'react';
import Preloader from './components/Preloader.jsx';
import Cursor from './components/Cursor.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Basketball from './components/Basketball.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import CookieBanner from './components/CookieBanner.jsx';

export default function App() {
  const [ready, setReady] = useState(false);

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
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Basketball />
        <Contact />
      </main>
      <Footer />
      <CookieBanner ready={ready} />
    </div>
  );
}
