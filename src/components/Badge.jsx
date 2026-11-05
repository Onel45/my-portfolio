import { useId } from 'react';

// Circular text that slowly rotates around a centre arrow
export default function Badge({ text, href, arrow = '↓', label, cursor }) {
  const id = 'badge' + useId().replace(/[^a-zA-Z0-9]/g, '');
  return (
    <a className="badge" href={href} aria-label={label || text} data-cursor={cursor}>
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <path id={id} d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <text>
          <textPath href={'#' + id} textLength="288" lengthAdjust="spacing">{text}</textPath>
        </text>
      </svg>
      <span className="badge-arrow" aria-hidden="true">{arrow}</span>
    </a>
  );
}
