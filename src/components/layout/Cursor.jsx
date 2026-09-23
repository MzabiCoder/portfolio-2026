import { useEffect, useRef, useState } from 'react';
import { usePointer } from '../../context/PointerProvider.jsx';
import { cn } from '../../lib/cn.js';

/** Custom cursor: instant dot, trailing ring, and contextual labels. */
export default function Cursor() {
  const pointer = usePointer();
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [state, setState] = useState({ hover: false, label: '' });

  useEffect(() => {
    document.documentElement.classList.add('has-cursor');

    const ring = { x: pointer.current.x, y: pointer.current.y };
    let raf = 0;
    const loop = () => {
      const { x, y } = pointer.current;
      ring.x += (x - ring.x) * 0.16;
      ring.y += (y - ring.y) * 0.16;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${x}px,${y}px,0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ring.x}px,${ring.y}px,0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onOver = (e) => {
      const labelled = e.target.closest('[data-cursor]');
      const hovered = e.target.closest('a, button, [data-service]');
      setState({ hover: !labelled && !!hovered, label: labelled ? labelled.dataset.cursor : '' });
    };
    const onLeave = () => setState({ hover: false, label: '' });

    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerleave', onLeave);
      document.documentElement.classList.remove('has-cursor');
    };
  }, [pointer]);

  const isLabel = !!state.label;

  return (
    <div aria-hidden="true" className="fixed top-0 left-0 bottom-auto right-auto z-[150] pointer-events-none">
      <span
        ref={dotRef}
        className={cn(
          'fixed top-0 left-0 w-1.5 h-1.5 -mt-[3px] -ml-[3px] rounded-full bg-accent',
          isLabel && 'opacity-0',
        )}
      />
      <span
        ref={ringRef}
        className={cn(
          'fixed top-0 left-0 rounded-full grid place-items-center border',
          'transition-[width,height,margin,background-color,border-color] duration-500 ease-smooth',
          isLabel
            ? 'w-24 h-24 -mt-12 -ml-12 bg-text border-text'
            : state.hover
              ? 'w-16 h-16 -mt-8 -ml-8 border-accent'
              : 'w-10 h-10 -mt-5 -ml-5 border-[rgba(248,250,252,.35)]',
        )}
      >
        <span
          className={cn(
            'font-mono text-[.7rem] tracking-[.12em] uppercase text-bg transition-opacity duration-300',
            isLabel ? 'opacity-100' : 'opacity-0',
          )}
        >
          {state.label}
        </span>
      </span>
    </div>
  );
}
