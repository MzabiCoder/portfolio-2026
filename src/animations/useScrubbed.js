import { useEffect } from 'react';
import { gsap } from '../lib/gsap.js';
import { prefersReducedMotion } from '../lib/motion.js';

/** Portrait drifts slightly slower than the page. */
export function useParallax(imgRef, sectionRef) {
  useEffect(() => {
    const img = imgRef.current;
    const section = sectionRef.current;
    if (!img || !section || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(img, { yPercent: -12 }, {
        yPercent: 0,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });

    return () => ctx.revert();
  }, [imgRef, sectionRef]);
}

/** Footer wordmark fills from outline to solid on approach. */
export function useMarkFill(fillRef, footerRef) {
  useEffect(() => {
    const fill = fillRef.current;
    const footer = footerRef.current;
    if (!fill || !footer || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      gsap.to(fill, {
        clipPath: 'inset(0 0% 0 0)',
        ease: 'none',
        scrollTrigger: { trigger: footer, start: 'top 85%', end: 'bottom bottom', scrub: true },
      });
    });

    return () => ctx.revert();
  }, [fillRef, footerRef]);
}
