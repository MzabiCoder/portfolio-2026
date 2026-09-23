import Mono from '../../common/Mono.jsx';

/** Vertical "scroll" hint pinned to the right edge of the hero. */
export default function ScrollCue() {
  return (
    <Mono
      aria-hidden="true"
      data-scroll-cue
      className="max-[760px]:hidden absolute right-gutter top-1/2 [writing-mode:vertical-rl] flex items-center gap-[14px] text-muted"
    >
      <span className="relative w-px h-16 bg-line-2 overflow-hidden after:content-[''] after:absolute after:inset-0 after:bg-accent after:-translate-y-full after:animate-cue" />
      Scroll
    </Mono>
  );
}
