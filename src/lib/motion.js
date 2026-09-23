/** Initial (pre-animation) states declared as Tailwind classes. */
export const REVEAL_INIT =
  'opacity-0 translate-y-10 motion-reduce:opacity-100 motion-reduce:translate-y-0';

export const CLIP_INIT =
  '[clip-path:inset(100%_0_0_0)] motion-reduce:[clip-path:none]';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
