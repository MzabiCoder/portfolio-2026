import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../lib/gsap.js';
import { prefersReducedMotion } from '../lib/motion.js';

const ScrollContext = createContext(null);

export const useScroll = () => useContext(ScrollContext);

/** Owns the Lenis instance and exposes start/stop plus anchor scrolling. */
export default function ScrollProvider({ children }) {
  const lenisRef = useRef(null);
  const [, setReady] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true, syncTouch: false });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const raf = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
    setReady(true);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const value = useMemo(() => ({
    lenisRef,
    start: () => lenisRef.current?.start(),
    stop: () => lenisRef.current?.stop(),
    /** Film sections scroll to their final frame so the copy is readable. */
    scrollToHash: (hash) => {
      const target = hash === '#top' ? null : document.querySelector(hash);
      if (hash !== '#top' && !target) return;
      let y = 0;
      if (target) {
        y = target.getBoundingClientRect().top + scrollY;
        if (target.dataset.film !== undefined) y += target.offsetHeight - innerHeight;
      }
      const lenis = lenisRef.current;
      if (lenis) lenis.scrollTo(y, { duration: 1.8, easing: (t) => 1 - Math.pow(1 - t, 4) });
      else scrollTo({ top: y, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    },
  }), []);

  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>;
}
