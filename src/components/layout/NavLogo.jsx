import useAnchorLink from '../../hooks/useAnchorLink.js';
import { SITE } from '../../data/site.js';

/** Monogram + wordmark that jumps back to the top. */
export default function NavLogo({ onNavigate }) {
  const onClick = useAnchorLink(onNavigate);

  return (
    <a
      href="#top"
      onClick={onClick}
      aria-label={`${SITE.name} — home`}
      className="group flex items-center gap-3 font-display font-semibold tracking-[-.01em]"
    >
      <span className="w-9 h-9 grid place-items-center border border-line-2 rounded-sm text-[.8rem] tracking-[.02em] transition-[border-color,background-color] duration-300 group-hover:border-accent group-hover:bg-[rgba(34,211,238,.08)]">
        NF
      </span>
      <span className="max-[480px]:hidden">Nabil&nbsp;Fannane</span>
    </a>
  );
}
