import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap.js';
import useAnchorLink from '../../hooks/useAnchorLink.js';
import { prefersReducedMotion } from '../../lib/motion.js';
import { NAV_LINKS } from '../../data/site.js';

/** Full-screen navigation overlay for small screens. */
export default function MobileMenu({ open, onNavigate }) {
  const ref = useRef(null);
  const onClick = useAnchorLink(onNavigate);

  useEffect(() => {
    if (!open || !ref.current || prefersReducedMotion()) return;
    gsap.fromTo(
      ref.current.querySelectorAll('a'),
      { yPercent: 100, autoAlpha: 0 },
      { yPercent: 0, autoAlpha: 1, duration: 0.9, ease: 'expo.out', stagger: 0.06 },
    );
  }, [open]);

  return (
    <div
      id="menu"
      ref={ref}
      hidden={!open}
      className="fixed inset-0 z-[95] bg-bg grid content-center p-gutter [&[hidden]]:hidden"
    >
      <nav aria-label="Mobile" className="grid gap-2">
        {NAV_LINKS.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            onClick={onClick}
            className="font-display font-bold text-[clamp(2.75rem,13vw,5rem)] tracking-[-.04em] leading-[1.05]"
          >
            {label}
          </a>
        ))}
      </nav>
    </div>
  );
}
