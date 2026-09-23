import { useEffect, useState } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap.js';
import { prefersReducedMotion } from '../lib/motion.js';

/**
 * Pillars scroll horizontally (pinned) on desktop and stack on mobile.
 * Returns the index of the pillar currently in focus.
 */
export default function usePillarsTrack(sectionRef, trackRef, count) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || prefersReducedMotion()) return undefined;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 761px)', () => {
      const dist = () => track.scrollWidth - innerWidth;
      gsap.to(track, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${dist()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          refreshPriority: 1,
          onUpdate: (st) => setActive(Math.round(st.progress * (count - 1))),
          onEnter: () => setActive(0),
        },
      });
    });

    mm.add('(max-width: 760px)', () => {
      const pillars = track.querySelectorAll('[data-pillar]');
      pillars.forEach((p, i) =>
        ScrollTrigger.create({
          trigger: p,
          start: 'top 60%',
          end: 'bottom 40%',
          onToggle: (st) => st.isActive && setActive(i),
        }));
    });

    return () => mm.revert();
  }, [sectionRef, trackRef, count]);

  return active;
}
