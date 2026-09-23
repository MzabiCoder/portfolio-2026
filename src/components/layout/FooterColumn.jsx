import Mono from '../common/Mono.jsx';
import Pulse from '../common/Pulse.jsx';
import { LINK_DRAW } from '../common/LinkDraw.jsx';
import useClock from '../../hooks/useClock.js';
import useAnchorLink from '../../hooks/useAnchorLink.js';

/** One footer column of links, optionally followed by the local clock. */
export default function FooterColumn({ label, links, showClock }) {
  const time = useClock();
  const onAnchor = useAnchorLink();

  return (
    <div className="grid gap-2.5 content-start justify-items-start">
      <Mono as="p" className="text-muted mb-2">{label}</Mono>

      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          onClick={link.href.startsWith('#') ? onAnchor : undefined}
          {...(link.external ? { target: '_blank', rel: 'noopener' } : {})}
          className={LINK_DRAW}
        >
          {link.label}
        </a>
      ))}

      {showClock && (
        <Mono as="p" className="flex items-center gap-2.5 text-muted mt-3">
          <Pulse />
          Local time <span>{time}</span>
        </Mono>
      )}
    </div>
  );
}
