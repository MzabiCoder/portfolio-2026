import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap.js';
import { prefersReducedMotion } from '../lib/motion.js';

/** Element leans towards the pointer, then springs back on leave. */
export default function useMagnetic(enabled = true) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled || prefersReducedMotion() || !matchMedia('(pointer: fine)').matches) return undefined;

    const onMove = (e) => {
      const b = el.getBoundingClientRect();
      const x = (e.clientX - b.left - b.width / 2) * 0.35;
      const y = (e.clientY - b.top - b.height / 2) * 0.35;
      gsap.to(el, { x, y, duration: 0.6, ease: 'power3.out' });
    };
    const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, .4)' });

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      gsap.killTweensOf(el);
    };
  }, [enabled]);

  return ref;
}
