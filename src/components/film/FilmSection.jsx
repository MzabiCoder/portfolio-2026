import { useRef } from 'react';
import { cn } from '../../lib/cn.js';
import useFilmView from '../../animations/useFilmView.js';
import { prefersReducedMotion } from '../../lib/motion.js';

const VIGNETTES = {
  hero:
    'bg-[linear-gradient(90deg,rgba(11,15,20,.75),rgba(11,15,20,0)_60%),linear-gradient(180deg,rgba(11,15,20,.55)_0%,rgba(11,15,20,0)_25%,rgba(11,15,20,0)_60%,rgba(11,15,20,.9)_100%)]',
  cta:
    'bg-[linear-gradient(180deg,rgba(11,15,20,.85)_0%,rgba(11,15,20,.55)_45%,rgba(11,15,20,0)_70%,rgba(11,15,20,.6)_100%)]',
  default:
    'bg-[linear-gradient(180deg,rgba(11,15,20,.55)_0%,rgba(11,15,20,0)_25%,rgba(11,15,20,0)_60%,rgba(11,15,20,.9)_100%),radial-gradient(120%_90%_at_50%_50%,transparent_55%,rgba(11,15,20,.8)_100%)]',
};

/**
 * A tall scroll track with a sticky canvas that plays its slice of the film
 * while the section passes through the viewport.
 */
export default function FilmSection({
  id, sectionRef, range, vignette = 'default', height = 'h-[280vh]', description, children, ...rest
}) {
  const canvasRef = useRef(null);
  const reduced = prefersReducedMotion();

  useFilmView({
    canvasRef,
    sectionRef,
    range,
    staticProgress: reduced ? (range[0] === 0 ? 0.15 : 0.9) : null,
  });

  return (
    <section id={id} ref={sectionRef} data-film className={cn('relative', height, 'motion-reduce:h-auto')} {...rest}>
      <div className="sticky top-0 h-screen supports-[height:100svh]:h-[100svh] overflow-hidden motion-reduce:relative">
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full" />
        <div className={cn('absolute inset-0 pointer-events-none', VIGNETTES[vignette])} />
        {description && <p className="sr-only">{description}</p>}
        {children}
      </div>
    </section>
  );
}
