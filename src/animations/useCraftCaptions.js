import { useEffect } from 'react';
import { gsap } from '../lib/gsap.js';
import { prefersReducedMotion } from '../lib/motion.js';

/** Captions cross-fade in sequence while the craft film plays. */
export default function useCraftCaptions(sectionRef) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    if (prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      const caps = gsap.utils.toArray('[data-cap]');
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
      });

      caps.forEach((c, i) => {
        const at = 0.08 + i * 0.22;
        tl.fromTo(c, { autoAlpha: 0, yPercent: 60 }, { autoAlpha: 1, yPercent: 0, duration: 0.07, ease: 'power2.out' }, at);
        if (i < caps.length - 1) tl.to(c, { autoAlpha: 0, yPercent: -60, duration: 0.07, ease: 'power2.in' }, at + 0.15);
      });

      tl.to({}, { duration: 0.05 }, 0.95);
    }, section);

    return () => ctx.revert();
  }, [sectionRef]);
}
