import Mono from '../../common/Mono.jsx';

/** One oversized caption that flies through the craft film. */
export default function CraftCaption({ num, label, accent }) {
  return (
    <p
      data-cap
      className="absolute left-0 bottom-0 whitespace-nowrap opacity-0 flex items-start gap-[18px] font-display font-bold text-[clamp(2.75rem,8vw,8.5rem)] tracking-[-.05em] leading-[.9] motion-reduce:static motion-reduce:opacity-100"
    >
      <Mono className="text-accent mt-[.8em]">{num}</Mono>
      {accent ? <span className="font-serif italic font-normal grad">{label}</span> : label}
    </p>
  );
}
