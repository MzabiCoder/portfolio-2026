import { useEffect } from 'react';
import { gsap } from '../lib/gsap.js';
import { prefersReducedMotion } from '../lib/motion.js';

/** The closing call to action assembles above the devices as you scroll. */
export default function useCtaAssembly(sectionRef) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    if (prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
      })
        .to({}, { duration: 0.4 })
        .to('.cta [data-split="chars"] .char', { yPercent: 0, ease: 'expo.out', duration: 0.3, stagger: 0.006 }, 0.4)
        .to('[data-cta-fade]', { autoAlpha: 1, y: 0, duration: 0.2, stagger: 0.05, ease: 'power2.out' }, 0.55)
        .to({}, { duration: 0.15 });
    }, section);

    return () => ctx.revert();
  }, [sectionRef]);
}
