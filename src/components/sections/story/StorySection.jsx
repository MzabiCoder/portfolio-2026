import { useRef } from 'react';
import Wrap from '../../layout/Wrap.jsx';
import Eyebrow from '../../common/Eyebrow.jsx';
import SectionHeading from '../../common/SectionHeading.jsx';
import StoryMedia from './StoryMedia.jsx';
import { useParallax } from '../../../animations/useScrubbed.js';
import { REVEAL_INIT } from '../../../lib/motion.js';
import { cn } from '../../../lib/cn.js';
import { STORY_PARAGRAPHS, STORY_QUOTE } from '../../../data/story.jsx';

/** Personal story: sticky portrait beside the narrative copy. */
export default function StorySection() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  useParallax(imgRef, sectionRef);

  return (
    <section ref={sectionRef} id="about" aria-labelledby="story-title" className="py-section">
      <Wrap className="grid grid-cols-[5fr_7fr] gap-[clamp(40px,7vw,120px)] items-start max-[1024px]:grid-cols-1">
        <StoryMedia imgRef={imgRef} />

        <div>
          <Eyebrow data-reveal className={REVEAL_INIT}>(03) — Story</Eyebrow>
          <SectionHeading id="story-title" accent="to interface.">From idea{' '}</SectionHeading>

          <div className="grid gap-[1.2em] mt-12 max-w-[58ch] text-soft text-[clamp(1.05rem,1.25vw,1.25rem)] [&_em]:text-text [&_em]:font-serif [&_em]:italic [&_em]:text-[1.15em]">
            {STORY_PARAGRAPHS.map((paragraph, i) => (
              <p key={i} data-reveal className={REVEAL_INIT}>{paragraph}</p>
            ))}
          </div>

          <blockquote
            data-reveal
            className={cn(
              'font-serif italic font-normal mt-16 mb-0 mx-0 pl-7 border-l border-accent',
              'text-[clamp(1.75rem,3.2vw,3rem)] leading-[1.15] text-text max-w-[22ch]',
              REVEAL_INIT,
            )}
          >
            {STORY_QUOTE}
          </blockquote>
        </div>
      </Wrap>
    </section>
  );
}
