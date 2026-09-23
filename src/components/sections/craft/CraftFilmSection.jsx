import { useRef } from 'react';
import FilmSection from '../../film/FilmSection.jsx';
import CraftCaption from './CraftCaption.jsx';
import useCraftCaptions from '../../../animations/useCraftCaptions.js';

const CAPTIONS = [
  { num: '01', label: 'Structure.' },
  { num: '02', label: 'Typography.', accent: true },
  { num: '03', label: 'Motion.' },
  { num: '04', label: 'Every detail.', accent: true },
];

/** Film scene 2: code assembling itself into an interface. */
export default function CraftFilmSection() {
  const sectionRef = useRef(null);
  useCraftCaptions(sectionRef);

  return (
    <FilmSection
      sectionRef={sectionRef}
      range={[0.34, 0.67]}
      height="h-[320vh] max-[760px]:h-[240vh]"
      aria-label="The craft"
      description="Background film: code lifts off the screen and assembles into layouts, typography and animated interface elements."
    >
      <div className="absolute left-gutter bottom-[clamp(40px,8vh,96px)] motion-reduce:static motion-reduce:grid motion-reduce:gap-2">
        {CAPTIONS.map((caption) => (
          <CraftCaption key={caption.num} {...caption} />
        ))}
      </div>
    </FilmSection>
  );
}
