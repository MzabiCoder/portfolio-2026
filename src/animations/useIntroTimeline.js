import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap.js';
import { splitText } from '../lib/splitText.js';
import { fixGradients } from '../lib/gradients.js';

/**
 * Preloader hand-off: once the counter has filled and the fonts are ready,
 * wipe the loader away and lift the hero type into place.
 */
export default function useIntroTimeline({ counted, preloaderRef, onComplete }) {
  useEffect(() => {
    if (!counted) return undefined;

    const pre = preloaderRef.current;
    const ctx = gsap.context(() => {
      fixGradients();
      ScrollTrigger.refresh();

      const tl = gsap.timeline({ onComplete });
      if (pre) {
        tl.to(pre.querySelector('[data-preloader-inner]'), { autoAlpha: 0, y: -30, duration: 0.5, ease: 'power2.in' })
          .to(pre, { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'expo.inOut' }, '-=.1');
      }
      tl.to('.hero [data-split="chars"] .char', { yPercent: 0, duration: 1.3, ease: 'expo.out', stagger: 0.022 }, '-=.55')
        .to('[data-hero-eyebrow]', { autoAlpha: 1, y: 0, duration: 1, ease: 'expo.out' }, '-=1.1')
        .to('[data-hero-fade]', { autoAlpha: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.1 }, '-=.9')
        .to('[data-scroll-cue]', { autoAlpha: 1, duration: 0.8 }, '-=.6');
    });

    return () => ctx.revert();
  }, [counted, preloaderRef, onComplete]);
}

/** Split hero + CTA headlines and park every intro element off-stage. */
export function useIntroInitialState(enabled) {
  useEffect(() => {
    if (!enabled) return undefined;

    const ctx = gsap.context(() => {
      const heroChars = gsap.utils.toArray('.hero [data-split="chars"]').flatMap((el) => splitText(el, 'chars'));
      const ctaChars = gsap.utils.toArray('.cta [data-split="chars"]').flatMap((el) => splitText(el, 'chars'));
      gsap.set(heroChars, { yPercent: 115 });
      gsap.set(ctaChars, { yPercent: 115 });
      gsap.set('[data-hero-eyebrow], [data-hero-fade]', { autoAlpha: 0, y: 24 });
      gsap.set('[data-scroll-cue]', { autoAlpha: 0 });
      gsap.set('[data-cta-fade]', { autoAlpha: 0, y: 30 });
      fixGradients();
    });

    return () => ctx.revert();
  }, [enabled]);
}
