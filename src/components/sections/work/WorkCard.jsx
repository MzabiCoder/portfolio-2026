import Mono from '../../common/Mono.jsx';
import { CLIP_INIT } from '../../../lib/motion.js';
import { cn } from '../../../lib/cn.js';

/** Project tile: clipped media, meta row and description. */
export default function WorkCard({ num, title, meta, desc, href, img, alt, cursor, span, lift, placeholder, arrow, onClick }) {
  const external = href.startsWith('http');

  return (
    <a
      href={href}
      onClick={onClick}
      data-cursor={cursor}
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}
      className={cn('group block max-[760px]:!mt-0', span)}
    >
      <div
        data-clip
        className={cn(
          'relative overflow-hidden rounded-sm aspect-[16/10] bg-bg-2',
          "after:content-[''] after:absolute after:inset-0 after:border after:border-line after:pointer-events-none",
          placeholder && 'outline-dashed outline-1 outline-line-2 outline-offset-8',
          CLIP_INIT,
        )}
      >
        <img
            src={img}
            width="1440"
            height="900"
            alt={alt}
            loading="lazy"
            decoding="async"
            className={cn(
              'w-full h-full object-cover scale-[1.08] transition-[transform,filter] duration-[1.4s] ease-smooth group-hover:scale-[1.02]',
              lift && '[filter:brightness(1.9)_saturate(1.1)]',
            )}
        />
      </div>

      <div className="grid grid-cols-[auto_1fr_auto] items-baseline gap-y-1.5 gap-x-5 mt-[22px]">
        <Mono className="text-accent">{num}</Mono>
        <h3 className="font-display font-bold text-[clamp(1.6rem,2.6vw,2.5rem)] tracking-[-.04em] leading-[1.05]">
          {title}
        </h3>
        <span
          aria-hidden="true"
          className="row-start-1 col-start-3 text-2xl transition-[transform,color] duration-[.6s] ease-smooth group-hover:rotate-45 group-hover:text-accent"
        >
          {arrow || '↗'}
        </span>
        <Mono as="p" className="col-start-2 text-muted">{meta}</Mono>
      </div>

      <p className="mt-3.5 text-muted max-w-[52ch] pl-[calc(20px+2ch)] max-[760px]:pl-0">{desc}</p>
    </a>
  );
}
