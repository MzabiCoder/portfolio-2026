import { cn } from '../../../lib/cn.js';
import EaseDemo from './EaseDemo.jsx';
import RingDemo from './RingDemo.jsx';
import ReflowDemo from './ReflowDemo.jsx';

const DEMOS = { ease: EaseDemo, ring: RingDemo, reflow: ReflowDemo };

/** One principle: oversized numeral, copy and a live demo. */
export default function PillarCard({ num, title, copy, demo, active }) {
  const Demo = DEMOS[demo];

  return (
    <article
      data-pillar
      className={cn(
        'group relative overflow-hidden rounded-sm border border-line',
        'w-[min(78vw,980px)] min-h-[min(68vh,640px)] p-[clamp(28px,4vw,56px)] gap-8',
        'grid grid-cols-2 grid-rows-[auto_1fr]',
        'bg-[linear-gradient(160deg,#0F151C,#0B0F14_70%)]',
        "before:content-[''] before:absolute before:inset-0 before:pointer-events-none",
        'before:bg-[linear-gradient(rgba(248,250,252,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(248,250,252,.08)_1px,transparent_1px)] before:bg-[length:48px_48px]',
        'before:[mask-image:radial-gradient(80%_80%_at_100%_100%,#000,transparent)] before:[-webkit-mask-image:radial-gradient(80%_80%_at_100%_100%,#000,transparent)]',
        'max-[1024px]:grid-cols-1',
        'max-[760px]:w-full max-[760px]:min-h-0',
        active && 'is-active',
      )}
    >
      <span className="col-span-full font-display font-bold text-[clamp(5rem,11vw,11rem)] leading-[.8] tracking-[-.06em] text-stroke">
        {num}
      </span>
      <div className="relative self-end max-w-[36ch]">
        <h3 className="font-display font-bold text-[clamp(2.5rem,5vw,4.5rem)] tracking-[-.045em] leading-none mb-[18px]">
          {title}
        </h3>
        <p className="text-muted">{copy}</p>
      </div>
      <Demo active={active} />
    </article>
  );
}
