import Mono from '../../common/Mono.jsx';
import { REVEAL_INIT } from '../../../lib/motion.js';
import { cn } from '../../../lib/cn.js';
import { prefersReducedMotion } from '../../../lib/motion.js';

/** One headline number plus its caption. */
export default function StatItem({ count, scramble, label }) {
  const reduced = prefersReducedMotion();

  return (
    <div
      data-reveal
      className={cn(
        'grid gap-5 content-start pt-2 pr-8 pb-12 pl-7 border-l border-line first:border-l-0 first:pl-0',
        'max-[1024px]:[&:nth-child(3)]:border-l-0 max-[1024px]:[&:nth-child(3)]:pl-0',
        'max-[480px]:border-l-0 max-[480px]:pl-0 max-[480px]:pb-8 max-[480px]:border-b max-[480px]:border-b-line',
        REVEAL_INIT,
      )}
    >
      <span
        {...(count != null ? { 'data-count': count } : { 'data-scramble': scramble })}
        className="font-display font-bold text-[clamp(3.5rem,7vw,7.5rem)] tracking-[-.05em] leading-[.9] [font-variant-numeric:tabular-nums] bg-[linear-gradient(180deg,#F8FAFC_30%,#64748B)] bg-clip-text text-transparent"
      >
        {count != null ? (reduced ? count : 0) : scramble}
      </span>
      <Mono className="text-muted max-w-[26ch] normal-case tracking-[.02em] text-[.82rem]">{label}</Mono>
    </div>
  );
}
