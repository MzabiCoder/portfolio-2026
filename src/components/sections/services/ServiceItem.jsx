import Mono from '../../common/Mono.jsx';
import { REVEAL_INIT } from '../../../lib/motion.js';
import { cn } from '../../../lib/cn.js';

/** One service row; hovering tints the row and nudges the title. */
export default function ServiceItem({ num, title, desc, onEnter, onLeave }) {
  return (
    <li
      data-service
      data-reveal
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      className={cn(
        'group relative grid items-center gap-6 border-b border-line py-[clamp(28px,3.5vw,48px)]',
        'grid-cols-[80px_1.2fr_1fr_48px] transition-[padding] duration-[.6s] ease-smooth',
        "before:content-[''] before:absolute before:inset-0 before:-z-10 before:origin-[50%_100%] before:scale-y-0",
        'before:bg-[linear-gradient(90deg,rgba(59,130,246,.08),transparent)] before:transition-transform before:duration-[.6s] before:ease-smooth hover:before:scale-y-100',
        'max-[1024px]:grid-cols-[56px_1fr_40px] max-[1024px]:gap-y-2.5',
        REVEAL_INIT,
      )}
    >
      <Mono className="text-muted">{num}</Mono>
      <h3 className="font-display font-bold text-[clamp(1.75rem,3.6vw,3.5rem)] tracking-[-.04em] leading-none transition-transform duration-[.6s] ease-smooth group-hover:translate-x-4">
        {title}
      </h3>
      <p className="text-muted max-w-[44ch] max-[1024px]:col-start-2 max-[1024px]:col-end-4 max-[1024px]:row-start-2">
        {desc}
      </p>
      <span
        aria-hidden="true"
        className="text-[1.75rem] justify-self-end transition-[transform,color] duration-[.6s] ease-smooth group-hover:rotate-45 group-hover:text-accent"
      >
        ↗
      </span>
    </li>
  );
}
