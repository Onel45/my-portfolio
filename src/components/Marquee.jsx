const items = ['INTERACTIVE WEB', 'CREATIVE DEVELOPMENT', 'REACT', 'JAVASCRIPT', 'PYTHON', 'BASKETBALL', 'KIGALI'];

// Endless scrolling ticker. Two identical groups, the track slides by exactly one group.
export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((g) => (
          <div className="marquee-group" key={g}>
            {items.map((t, i) => (
              <span key={t} className={i % 2 ? 'outline' : ''}>{t}<b>✦</b></span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
