import Wrap from '../../layout/Wrap.jsx';
import Eyebrow from '../../common/Eyebrow.jsx';
import SectionHeading from '../../common/SectionHeading.jsx';
import WorkCard from './WorkCard.jsx';
import useAnchorLink from '../../../hooks/useAnchorLink.js';
import { PROJECTS } from '../../../data/projects.js';
import { REVEAL_INIT } from '../../../lib/motion.js';

/** Selected work, laid out on a staggered twelve-column grid. */
export default function WorkSection() {
  const onAnchor = useAnchorLink();

  return (
    <section id="work" aria-labelledby="work-title" className="py-section">
      <Wrap>
        <div>
          <Eyebrow data-reveal className={REVEAL_INIT}>(05) — Selected work</Eyebrow>
          <SectionHeading id="work-title" accent="work.">Selected{' '}</SectionHeading>
        </div>

        <div className="mt-[clamp(48px,7vw,96px)] grid grid-cols-12 gap-y-[clamp(48px,6vw,96px)] gap-x-[clamp(16px,2.5vw,40px)] max-[760px]:grid-cols-1">
          {PROJECTS.map((project) => (
            <WorkCard
              key={project.num}
              {...project}
              onClick={project.href.startsWith('#') ? onAnchor : undefined}
            />
          ))}
        </div>
      </Wrap>
    </section>
  );
}
