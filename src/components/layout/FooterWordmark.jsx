import { forwardRef } from 'react';
import { SITE } from '../../data/site.js';

/** Giant outlined wordmark that fills with gradient as the footer arrives. */
const FooterWordmark = forwardRef(function FooterWordmark(_, ref) {
  return (
    <div
      aria-hidden="true"
      className="relative mt-[clamp(64px,10vw,140px)] font-display font-extrabold text-[clamp(3.5rem,15.5vw,17rem)] leading-[.8] tracking-[-.06em] whitespace-nowrap select-none"
    >
      <span className="block text-stroke">{SITE.name}</span>
      <span
        ref={ref}
        className="block absolute inset-0 bg-grad bg-clip-text text-transparent [clip-path:inset(0_100%_0_0)]"
      >
        {SITE.name}
      </span>
    </div>
  );
});

export default FooterWordmark;
