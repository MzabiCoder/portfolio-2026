import { useState } from 'react';
import Wrap from '../../layout/Wrap.jsx';
import Eyebrow from '../../common/Eyebrow.jsx';
import SectionHeading from '../../common/SectionHeading.jsx';
import ServiceItem from './ServiceItem.jsx';
import ServicePreview from './ServicePreview.jsx';
import { SERVICES } from '../../../data/services.js';
import { REVEAL_INIT } from '../../../lib/motion.js';

/** What I do, as a hoverable list with a cursor-following preview. */
export default function ServicesSection({ showPreview }) {
  const [preview, setPreview] = useState(null);

  return (
    <section id="services" aria-labelledby="services-title" className="relative py-section">
      <Wrap>
        <Eyebrow data-reveal className={REVEAL_INIT}>(04) — Services</Eyebrow>
        <SectionHeading id="services-title" accent="help.">How I can{' '}</SectionHeading>

        <ul className="mt-[clamp(40px,6vw,80px)] border-t border-line">
          {SERVICES.map((service) => (
            <ServiceItem
              key={service.num}
              {...service}
              onEnter={() => setPreview(service.preview)}
              onLeave={() => setPreview(null)}
            />
          ))}
        </ul>
      </Wrap>

      {showPreview && <ServicePreview src={preview} />}
    </section>
  );
}
