import { useRef } from 'react';
import FilmSection from '../../film/FilmSection.jsx';
import Eyebrow, { Dash } from '../../common/Eyebrow.jsx';
import Button from '../../common/Button.jsx';
import HeroTitle from './HeroTitle.jsx';
import ScrollCue from './ScrollCue.jsx';
import useHeroScroll from '../../../animations/useHeroScroll.js';
import useAnchorLink from '../../../hooks/useAnchorLink.js';

/** Opening scene: film scene 1 with the headline and primary calls to action. */
export default function HeroSection() {
  const sectionRef = useRef(null);
  const onAnchor = useAnchorLink();
  useHeroScroll(sectionRef);

  return (
    <FilmSection
      id="top"
      sectionRef={sectionRef}
      range={[0, 0.34]}
      vignette="hero"
      height="h-[280vh] max-[760px]:h-[200vh]"
      aria-labelledby="hero-title"
      description="Background film: a developer writes HTML and CSS at a night-lit workstation as the camera pushes in toward the screen."
    >
      <div className="hero absolute inset-0 flex flex-col justify-end max-w-wrap mx-auto px-gutter pt-[calc(var(--nav-h)+24px)] pb-[clamp(40px,7vh,80px)]">
        <Eyebrow data-hero-eyebrow>
          Front-end &amp; UI engineer <Dash /> Available for projects
        </Eyebrow>

        <HeroTitle />

        <div data-hero-foot className="flex flex-wrap items-end justify-between gap-y-6 gap-x-12">
          <p data-hero-fade className="max-w-[34ch] text-soft text-[clamp(1.05rem,1.35vw,1.3rem)] leading-[1.5]">
            Fast, accessible, responsive interfaces that people enjoy using and that businesses can scale.
          </p>
          <div data-hero-fade className="flex flex-wrap gap-3 [&_a]:max-[760px]:h-[52px] [&_a]:max-[760px]:px-[22px]">
            <Button href="#contact" onClick={onAnchor}>
              <span>Start a project</span>
              <i aria-hidden="true">→</i>
            </Button>
            <Button href="#work" variant="ghost" onClick={onAnchor}>
              <span>See the work</span>
            </Button>
          </div>
        </div>
      </div>

      <ScrollCue />
    </FilmSection>
  );
}
