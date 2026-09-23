import { useEffect, useRef, useState } from 'react';
import DemoFrame from './DemoFrame.jsx';
import { gsap } from '../../../lib/gsap.js';

const CIRCUMFERENCE = 327;

/** Speed demo: a performance ring that fills once, when the pillar is active. */
export default function RingDemo({ active }) {
  const [value, setValue] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    if (!active || done.current) return undefined;
    done.current = true;
    const o = { v: 0 };
    const tween = gsap.to(o, { v: 100, duration: 1.8, ease: 'expo.out', onUpdate: () => setValue(o.v) });
    return () => tween.kill();
  }, [active]);

  return (
    <DemoFrame caption="Performance">
      <svg viewBox="0 0 120 120" className="w-[52%] -rotate-90">
        <circle cx="60" cy="60" r="52" className="fill-none stroke-line [stroke-width:6]" />
        <circle
          cx="60"
          cy="60"
          r="52"
          className="fill-none stroke-accent [stroke-width:6] [stroke-linecap:round]"
          style={{ strokeDasharray: CIRCUMFERENCE, strokeDashoffset: CIRCUMFERENCE * (1 - value / 100) }}
        />
      </svg>
      <span className="absolute font-display font-bold text-[2.5rem] tracking-[-.04em]">{Math.round(value)}</span>
    </DemoFrame>
  );
}
