import { useRef } from 'react';
import Wrap from '../../layout/Wrap.jsx';
import Eyebrow from '../../common/Eyebrow.jsx';
import useMissionWords from '../../../animations/useMissionWords.js';
import { REVEAL_INIT } from '../../../lib/motion.js';

const Em = ({ children }) => (
  <em className="font-serif italic font-normal tracking-[-.01em]">{children}</em>
);

/** Statement of intent, lit word by word as it scrolls past. */
export default function MissionSection() {
  const textRef = useRef(null);
  useMissionWords(textRef);

  return (
    <section aria-labelledby="mission-label" className="py-section">
      <Wrap>
        <Eyebrow id="mission-label" data-reveal className={REVEAL_INIT}>
          (01) — Mission
        </Eyebrow>
        <p
          ref={textRef}
          className="grad-words mt-10 max-w-[22ch] font-display font-semibold text-mission tracking-[-.035em]"
        >
          The web should work beautifully for <Em>everyone,</Em> on <Em>every device,</Em> on every connection.
          I build the interfaces that make that <Em>true.</Em>
        </p>
      </Wrap>
    </section>
  );
}
