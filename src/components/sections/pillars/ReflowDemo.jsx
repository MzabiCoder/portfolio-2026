import { useEffect, useState } from 'react';
import DemoFrame from './DemoFrame.jsx';
import { REFLOW_STATES } from '../../../data/pillars.js';
import { prefersReducedMotion } from '../../../lib/motion.js';
import { cn } from '../../../lib/cn.js';

/** Reach demo: the same layout reflowing desktop → tablet → phone. */
export default function ReflowDemo() {
  const [index, setIndex] = useState(0);
  const state = REFLOW_STATES[index];

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % REFLOW_STATES.length), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <DemoFrame caption={state.label}>
      <div className={cn('h-[64%] grid gap-2 transition-[width] duration-[.8s] ease-smooth', state.width, state.cols)}>
        {Array.from({ length: 4 }, (_, i) => (
          <span
            key={i}
            className="bg-[linear-gradient(160deg,rgba(59,130,246,.35),rgba(34,211,238,.12))] border border-[rgba(34,211,238,.3)] rounded-sm transition-all duration-[.8s] ease-smooth"
          />
        ))}
      </div>
    </DemoFrame>
  );
}
