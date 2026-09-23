import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap.js';
import { splitText, maskWords } from '../lib/splitText.js';
import { fixGradients } from '../lib/gradients.js';

/**
 * Scroll-in reveals for the whole page:
 * `data-reveal` fades + rises, `data-reveal-lines` slides words up out of a
 * mask, `data-clip` wipes an element open.
 */
export default function useReveals(ready) {
  useEffect(() => {
    if (!ready) return undefined;

    const ctx = gsap.context(() => {
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 88%',
        once: true,
        onEnter: (els) =>
          gsap.to(els, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', stagger: 0.08, overwrite: true }),
      });

      gsap.utils.toArray('[data-reveal-lines]').forEach((el) => {
        const words = maskWords(splitText(el, 'words'));
        gsap.set(words, { yPercent: 110 });
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => gsap.to(words, { yPercent: 0, duration: 1.3, ease: 'expo.out', stagger: 0.06 }),
        });
      });

      gsap.utils.toArray('[data-clip]').forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => gsap.to(el, { clipPath: 'inset(0% 0 0 0)', duration: 1.5, ease: 'expo.inOut' }),
        });
      });

      fixGradients();
    });

    return () => ctx.revert();
  }, [ready]);
}
