import { LINK_DRAW } from '../common/LinkDraw.jsx';
import useAnchorLink from '../../hooks/useAnchorLink.js';
import { NAV_LINKS } from '../../data/site.js';

/** Desktop section links. */
export default function NavLinks({ onNavigate }) {
  const onClick = useAnchorLink(onNavigate);

  return (
    <nav aria-label="Primary" className="ml-auto flex gap-8 text-[.95rem] max-[1024px]:hidden">
      {NAV_LINKS.map(({ href, label }) => (
        <a key={href} href={href} onClick={onClick} className={LINK_DRAW}>
          {label}
        </a>
      ))}
    </nav>
  );
}
