import Mono from '../../common/Mono.jsx';
import { CLIP_INIT } from '../../../lib/motion.js';
import { cn } from '../../../lib/cn.js';

/** Sticky portrait with a gradient veil and a parallaxing image. */
export default function StoryMedia({ imgRef }) {
  return (
    <figure
      data-clip
      className={cn(
        'm-0 relative sticky top-[calc(var(--nav-h)+24px)] overflow-hidden rounded-sm aspect-[3/4] bg-bg-2',
        "after:content-[''] after:absolute after:inset-0 after:pointer-events-none",
        'after:bg-[linear-gradient(200deg,rgba(59,130,246,.28),transparent_45%,rgba(11,15,20,.7))]',
        'max-[1024px]:static max-[1024px]:max-w-[420px]',
        CLIP_INIT,
      )}
    >
      <img
        ref={imgRef}
        src="/assets/img/portrait.jpg"
        width="900"
        height="1200"
        alt="Portrait of Nabil Fannane at a desk with code on the monitors behind"
        loading="lazy"
        decoding="async"
        className="w-full h-[118%] object-cover [filter:grayscale(.35)_contrast(1.05)_brightness(.92)]"
      />
      <Mono as="figcaption" className="absolute left-5 bottom-[18px] z-[1] text-soft">
        Nabil Fannane · Front-end & Agentic engineer
      </Mono>
    </figure>
  );
}
