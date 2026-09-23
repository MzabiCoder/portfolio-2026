import { useRef } from 'react';
import FilmSection from '../../film/FilmSection.jsx';
import Eyebrow from '../../common/Eyebrow.jsx';
import Button from '../../common/Button.jsx';
import CtaEmailButton from './CtaEmailButton.jsx';
import useCtaAssembly from '../../../animations/useCtaAssembly.js';
import { SITE } from '../../../data/site.js';

/** Closing scene: film scene 3 with the contact call to action. */
export default function CtaSection() {
  const sectionRef = useRef(null);
  useCtaAssembly(sectionRef);

  return (
    <FilmSection
      id="contact"
      sectionRef={sectionRef}
      range={[0.67, 1]}
      vignette="cta"
      height="h-[300vh] max-[760px]:h-[220vh]"
      aria-labelledby="cta-title"
      description="Background film: the camera pulls back to reveal the finished website running on a desktop, a tablet and a phone."
    >
      <div className="cta absolute inset-0 flex flex-col items-center justify-start text-center px-gutter pt-[calc(var(--nav-h)+6vh)] max-[760px]:pt-[calc(var(--nav-h)+3vh)] pb-0">
        <Eyebrow data-cta-fade className="justify-center">(06) — Contact</Eyebrow>

        <h2
          id="cta-title"
          aria-label="Let's build something effortless."
          className="font-display font-extrabold text-[clamp(3rem,8.5vw,9.5rem)] leading-[.88] tracking-[-.055em] mt-5 mb-6"
        >
          <span className="line">
            <span className="line__inner" data-split="chars">Let&apos;s build</span>
          </span>
          <span className="line">
            <span className="line__inner font-serif italic font-normal tracking-[-.03em] pr-[.06em] grad" data-split="chars">
              something effortless.
            </span>
          </span>
        </h2>

        <p data-cta-fade className="text-soft max-w-[40ch]">
          Have an idea, a product or a site that needs to feel better? Let&apos;s talk.
        </p>

        <div data-cta-fade className="flex flex-wrap items-center justify-center gap-y-4 gap-x-8 mt-8">
          <Button href={`mailto:${SITE.email}`} large>
            <span>Start a project</span>
            <i aria-hidden="true">→</i>
          </Button>
          <CtaEmailButton />
        </div>
      </div>
    </FilmSection>
  );
}
