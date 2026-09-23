import Wrap from '../../layout/Wrap.jsx';
import StatItem from './StatItem.jsx';
import Marquee from './Marquee.jsx';
import { STATS } from '../../../data/stats.js';

/** Standards strip: four animated numbers above the skills marquee. */
export default function StatsSection() {
  return (
    <section
      aria-label="Standards I build to"
      className="relative pt-[clamp(64px,9vw,120px)] border-t border-line bg-bg"
    >
      <Wrap className="grid grid-cols-4 max-[1024px]:grid-cols-2 max-[1024px]:gap-y-10 max-[480px]:grid-cols-1">
        {STATS.map((stat) => (
          <StatItem key={stat.label} {...stat} />
        ))}
      </Wrap>
      <Marquee />
    </section>
  );
}
