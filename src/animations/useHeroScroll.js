import { useEffect } from 'react';
import { gsap } from '../lib/gsap.js';
import { prefersReducedMotion } from '../lib/motion.js';

/** Hero copy drifts away as the camera pushes into the film. */
export default function useHeroScroll(sectionRef) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    if (prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      gsap.timeline({ scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 0.6 } })
        .to('[data-hero-title]', { yPercent: -18, scale: 0.9, autoAlpha: 0, ease: 'none', duration: 0.35 }, 0)
        .to('[data-hero-foot], [data-hero-eyebrow], [data-scroll-cue]', { y: -60, autoAlpha: 0, ease: 'none', duration: 0.22 }, 0)
        .to({}, { duration: 0.65 });
    }, section);

    return () => ctx.revert();
  }, [sectionRef]);
}
