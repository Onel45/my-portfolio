import { useEffect, useState } from 'react';
import { Cookies } from '../cookies.js';

function trackVisit() {
  const visits = parseInt(Cookies.get('visit_count') || '0', 10) + 1;
  Cookies.set('visit_count', visits, 180);
  Cookies.set('last_visit', new Date().toISOString(), 180);
}

export default function CookieBanner({ ready }) {
  const [visible, setVisible] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('cookie_consent');
    if (consent === 'accepted') trackVisit();
    else if (consent === null) setVisible(true);
  }, []);

  // slide in only once the intro has finished
  useEffect(() => {
    if (!visible || !ready) return undefined;
    let a = requestAnimationFrame(() => { a = requestAnimationFrame(() => setShown(true)); });
    return () => cancelAnimationFrame(a);
  }, [visible, ready]);

  const close = () => { setShown(false); setTimeout(() => setVisible(false), 500); };
  const accept = () => { Cookies.set('cookie_consent', 'accepted', 180); trackVisit(); close(); };
  const decline = () => {
    Cookies.set('cookie_consent', 'declined', 180);
    Cookies.remove('visit_count'); Cookies.remove('last_visit');
    close();
  };

  return (
    <div className={'cookie-banner' + (shown ? ' show' : '')} role="dialog" aria-labelledby="cookieTitle" aria-live="polite" hidden={!visible}>
      <h4 id="cookieTitle">🍪 Cookies</h4>
      <p>This site uses a small cookie to remember your choice and to count your visits. Nothing is shared with
        third parties.</p>
      <div className="cookie-actions">
        <button type="button" className="accept" onClick={accept}>Accept</button>
        <button type="button" className="decline" onClick={decline}>Decline</button>
      </div>
    </div>
  );
}
