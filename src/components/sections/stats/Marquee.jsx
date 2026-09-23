import { MARQUEE_ITEMS } from '../../../data/stats.js';

const Row = () => (
  <>
    {MARQUEE_ITEMS.map((item) => (
      <span
        key={item}
        className="flex items-center gap-14 px-7 font-display font-semibold text-[clamp(1.4rem,2.6vw,2.5rem)] tracking-[-.03em] text-soft after:content-['✦'] after:text-[.5em] after:text-accent"
      >
        {item}
      </span>
    ))}
  </>
);

/** Endless skills ribbon, duplicated so the loop is seamless. */
export default function Marquee() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y border-line py-[26px] mt-[clamp(40px,6vw,72px)] [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)] [-webkit-mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]"
    >
      <div className="flex w-max animate-marquee">
        <Row />
        <Row />
      </div>
    </div>
  );
}
