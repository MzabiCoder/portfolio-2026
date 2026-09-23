import { useEffect } from 'react';
import { gsap } from '../lib/gsap.js';
import { prefersReducedMotion } from '../lib/motion.js';
import { splitText } from '../lib/splitText.js';
import { fixGradients } from '../lib/gradients.js';

/** Mission copy: every word lights up as the section scrolls through. */
export default function useMissionWords(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      const words = splitText(el, 'words');
      fixGradients(el.parentElement || document);
      gsap.to(words, {
        opacity: 1,
        ease: 'none',
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 45%', scrub: true },
      });
    }, el);

    return () => ctx.revert();
  }, [ref]);
}
