import { forwardRef, useEffect, useRef, useState } from 'react';
import { gsap } from '../../lib/gsap.js';
import Mono from '../common/Mono.jsx';
import { SITE } from '../../data/site.js';

/**
 * Loading curtain: counts 000 → 100 while the fonts settle, then reports
 * back so the intro timeline can wipe it away.
 */
const Preloader = forwardRef(function Preloader({ onCounted }, ref) {
  const [count, setCount] = useState(0);
  const barRef = useRef(null);
  const onCountedRef = useRef(onCounted);
  onCountedRef.current = onCounted;

  useEffect(() => {
    scrollTo(0, 0);
    const value = { v: 0 };
    const counting = gsap.to(value, {
      v: 100,
      duration: 1.6,
      ease: 'power2.inOut',
      onUpdate: () => {
        setCount(Math.round(value.v));
        if (barRef.current) barRef.current.style.transform = `scaleX(${value.v / 100})`;
      },
    });

    const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
    let cancelled = false;
    Promise.all([fonts, counting.then()]).then(() => { if (!cancelled) onCountedRef.current(); });

    return () => { cancelled = true; counting.kill(); };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="fixed inset-0 z-[180] bg-bg block">
      <div
        data-preloader-inner
        className="absolute inset-x-gutter bottom-gutter top-auto grid grid-cols-[1fr_auto] items-end gap-4"
      >
        <Mono className="text-muted">{SITE.name}</Mono>
        <span className="font-display font-bold text-[clamp(5rem,18vw,16rem)] leading-[.8] tracking-[-.06em] [font-variant-numeric:tabular-nums]">
          {String(count).padStart(3, '0')}
        </span>
        <div className="col-span-full h-px bg-line">
          <span ref={barRef} className="block h-full bg-grad origin-[0_50%] scale-x-0" />
        </div>
      </div>
    </div>
  );
});

export default Preloader;
