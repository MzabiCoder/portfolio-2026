const LINES = [
  { text: 'Ideas,' },
  { text: 'engineered' },
  { text: 'to feel effortless.', accent: true },
];

/** Hero headline, split into masked lines the intro timeline lifts into view. */
export default function HeroTitle() {
  return (
    <h1
      id="hero-title"
      data-hero-title
      aria-label="Ideas, engineered to feel effortless."
      className="font-display font-extrabold text-hero tracking-[-.055em] max-[760px]:tracking-[-.05em] origin-[0_100%] mt-[22px] mb-[clamp(24px,4vh,48px)]"
    >
      {LINES.map(({ text, accent }) => (
        <span key={text} className="line">
          <span
            data-split="chars"
            className={
              accent
                ? 'line__inner font-serif italic font-normal tracking-[-.03em] pr-[.06em] grad'
                : 'line__inner'
            }
          >
            {text}
          </span>
        </span>
      ))}
    </h1>
  );
}
