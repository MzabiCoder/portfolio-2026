import { useEffect, useRef } from 'react';
import { usePointer } from '../../../context/PointerProvider.jsx';
import { cn } from '../../../lib/cn.js';

/** Thumbnail that trails the cursor while a service row is hovered. */
export default function ServicePreview({ src }) {
  const pointer = usePointer();
  const ref = useRef(null);

  useEffect(() => {
    const pos = { x: pointer.current.x, y: pointer.current.y };
    let raf = 0;
    const loop = () => {
      pos.x += (pointer.current.x - pos.x) * 0.12;
      pos.y += (pointer.current.y - pos.y) * 0.12;
      if (ref.current) ref.current.style.translate = `${pos.x + 24}px ${pos.y - 110}px`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [pointer]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        'fixed top-0 left-0 z-[60] w-[340px] aspect-[16/10] pointer-events-none overflow-hidden rounded-sm',
        'transition-[opacity,transform] duration-500 ease-smooth',
        src ? 'opacity-100 scale-100' : 'opacity-0 scale-[.8]',
      )}
    >
      {src && <img src={src} alt="" className="w-full h-full object-cover" />}
    </div>
  );
}
