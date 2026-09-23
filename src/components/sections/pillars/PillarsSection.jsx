import { useRef } from 'react';
import Wrap from '../../layout/Wrap.jsx';
import Eyebrow from '../../common/Eyebrow.jsx';
import SectionHeading from '../../common/SectionHeading.jsx';
import PillarCard from './PillarCard.jsx';
import usePillarsTrack from '../../../animations/usePillarsTrack.js';
import { PILLARS } from '../../../data/pillars.js';
import { REVEAL_INIT } from '../../../lib/motion.js';

/** Principles, scrolled horizontally on desktop and stacked on mobile. */
export default function PillarsSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const active = usePillarsTrack(sectionRef, trackRef, PILLARS.length);

  return (
    <section ref={sectionRef} aria-labelledby="pillars-title" className="pt-section overflow-hidden">
      <Wrap>
        <Eyebrow data-reveal className={REVEAL_INIT}>(02) — Principles</Eyebrow>
        <SectionHeading id="pillars-title" accent="every build gets.">
          Three things{' '}
        </SectionHeading>
      </Wrap>

      <div className="mt-[clamp(48px,7vw,96px)]">
        <div
          ref={trackRef}
          className="flex gap-6 w-max px-gutter pb-section max-[760px]:flex-col max-[760px]:w-full max-[760px]:pb-[clamp(64px,10vw,120px)]"
        >
          {PILLARS.map((pillar, i) => (
            <PillarCard key={pillar.num} {...pillar} active={active === i} />
          ))}
        </div>
      </div>
    </section>
  );
}
